import {
  FC,
  useState,
  useEffect,
  useMemo,
  useRef,
  PointerEvent as ReactPointerEvent,
  WheelEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import classNames from "clsx";
import { MediaItem, CropTransform, createDefaultTransform } from "./types";

interface MediaEditorProps {
  media: MediaItem | null;
  onSave: (media: MediaItem) => void;
  onClose: () => void;
}

type EditorTab = "crop" | "alt" | "warning";
type AspectPreset = "original" | "wide" | "square";

interface CropState {
  // Оригинальные пиксели изображения
  naturalW: number;
  naturalH: number;

  // Геометрия виджета (CSS px)
  viewportW: number;
  viewportH: number;

  // Текущий кадр (в CSS px внутри viewport)
  cropW: number;
  cropH: number;
  aspect: number; // cropW / cropH

  // Трансформация изображения под кадром
  zoom: number; // масштаб относительно fit-to-crop
  translateX: number; // сдвиг изображения под кадром, px
  translateY: number;

  // Текущий пресет
  preset: AspectPreset;

  // Вспомогательное
  minZoom: number;
  maxZoom: number;
}

const ALT_LIMIT = 1000;
const PADDING = 16;
const MAX_ZOOM_FACTOR = 8;

const WARNING_OPTIONS = [
  { id: "nudity", label: "Nudity", description: "Includes partial or full nudity." },
  { id: "violence", label: "Violence", description: "Graphic or physical violence present." },
  { id: "sensitive", label: "Sensitive", description: "Potentially distressing or triggering content." },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const fitRectIntoBoxKeepingAspect = (
  boxW: number,
  boxH: number,
  aspect: number,
  padding: number
): { cropW: number; cropH: number } => {
  const availW = boxW - padding * 2;
  const availH = boxH - padding * 2;

  let cropW = availW;
  let cropH = cropW / aspect;

  if (cropH > availH) {
    cropH = availH;
    cropW = cropH * aspect;
  }

  return { cropW, cropH };
};

const isTransformEqual = (a: CropTransform, b: CropTransform) => {
  const epsilon = 0.0001;
  return (
    Math.abs(a.scale - b.scale) < epsilon &&
    Math.abs(a.translateX - b.translateX) < epsilon &&
    Math.abs(a.translateY - b.translateY) < epsilon &&
    Math.abs(a.angle - b.angle) < epsilon &&
    Math.abs(a.straighten - b.straighten) < epsilon &&
    a.aspectRatio === b.aspectRatio &&
    a.fitMode === b.fitMode &&
    a.flipH === b.flipH &&
    a.flipV === b.flipV &&
    a.grid === b.grid
  );
};

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((item, index) => item === sortedB[index]);
};

export const MediaEditor: FC<MediaEditorProps> = ({ media, onSave, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>("crop");
  const [altText, setAltText] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [transform, setTransform] = useState<CropTransform>(createDefaultTransform());
  const [cropState, setCropState] = useState<CropState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [changesTracker, setChangesTracker] = useState({ crop: false, alt: false, warning: false });
  const [showAltHelp, setShowAltHelp] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const initialStateRef = useRef<{ transform: CropTransform; alt: string; warnings: string[] } | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (media && modalRef.current) {
      modalRef.current.focus();
    }
  }, [media]);

  // Initialize image and state
  useEffect(() => {
    if (!media) return;

    const savedTransform = media.transform || createDefaultTransform();
    setTransform(savedTransform);
    setAltText(media.alt || "");
    setWarnings(media.sensitiveTags || []);

    initialStateRef.current = {
      transform: savedTransform,
      alt: media.alt || "",
      warnings: media.sensitiveTags || [],
    };

    // For non-images, skip crop state initialization
    if (media.type !== "image") {
      return;
    }

    // Load image to get natural dimensions
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS for canvas export

    const initCropState = (naturalW: number, naturalH: number) => {
      const initState = () => {
        if (!containerRef.current) {
          console.warn("Container not ready, retrying...");
          setTimeout(initState, 100);
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const viewportW = rect.width || 800; // fallback width
        const viewportH = rect.height || 420; // fallback height

        if (viewportW === 0 || viewportH === 0) {
          console.warn("Container has zero dimensions, using fallback:", rect);
        }

        const preset: AspectPreset = "original";
        const newState = applyPreset(
          {
            naturalW,
            naturalH,
            viewportW,
            viewportH,
            cropW: 0,
            cropH: 0,
            aspect: 1,
            zoom: 1,
            translateX: 0,
            translateY: 0,
            preset,
            minZoom: 1,
            maxZoom: MAX_ZOOM_FACTOR,
          },
          preset
        );

        console.log("CropState initialized:", newState);
        setCropState(newState);
      };

      // Give the modal time to render
      setTimeout(initState, 50);
    };

    img.onload = () => {
      console.log("Image loaded:", img.naturalWidth, "x", img.naturalHeight);
      initCropState(img.naturalWidth, img.naturalHeight);
    };

    img.onerror = (error) => {
      console.error("Failed to load image:", error, media.url);
      // Set a default state even on error so UI isn't stuck
      setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setCropState({
            naturalW: 1000,
            naturalH: 1000,
            viewportW: rect.width || 800,
            viewportH: rect.height || 420,
            cropW: 400,
            cropH: 400,
            aspect: 1,
            zoom: 1,
            translateX: 0,
            translateY: 0,
            preset: "original",
            minZoom: 1,
            maxZoom: MAX_ZOOM_FACTOR,
          });
        }
      }, 100);
    };

    // Set src AFTER setting up event handlers
    img.src = media.url;

    // Handle case where image is already cached/loaded
    if (img.complete && img.naturalWidth > 0) {
      console.log("Image was already loaded from cache");
      initCropState(img.naturalWidth, img.naturalHeight);
    }
  }, [media]);

  // Update viewport size on resize
  useEffect(() => {
    if (!cropState || !containerRef.current) return;

    const handleResize = () => {
      if (!containerRef.current || !cropState) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newState = applyPreset(
        { ...cropState, viewportW: rect.width, viewportH: rect.height },
        cropState.preset
      );
      setCropState(newState);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [cropState]);

  const applyPreset = (state: CropState, preset: AspectPreset): CropState => {
    const aspect =
      preset === "original"
        ? state.naturalW / state.naturalH
        : preset === "wide"
          ? 16 / 9
          : 1 / 1;

    const { cropW, cropH } = fitRectIntoBoxKeepingAspect(state.viewportW, state.viewportH, aspect, PADDING);

    const coverScale = Math.max(cropW / state.naturalW, cropH / state.naturalH);
    const maxZoom = Math.max(4, MAX_ZOOM_FACTOR);

    const zoom = clamp(state.zoom, 1, maxZoom);

    const scaledW = state.naturalW * coverScale * zoom;
    const scaledH = state.naturalH * coverScale * zoom;
    const maxOffsetX = Math.max(0, (scaledW - cropW) / 2);
    const maxOffsetY = Math.max(0, (scaledH - cropH) / 2);

    return {
      ...state,
      preset,
      aspect,
      cropW,
      cropH,
      minZoom: 1,
      maxZoom,
      zoom,
      translateX: clamp(state.translateX, -maxOffsetX, maxOffsetX),
      translateY: clamp(state.translateY, -maxOffsetY, maxOffsetY),
    };
  };

  const handlePresetChange = (preset: AspectPreset) => {
    if (!cropState) return;
    const newState = applyPreset(cropState, preset);
    setCropState(newState);
    setChangesTracker((prev) => ({ ...prev, crop: true }));
  };

  const handleZoomChange = (newZoom: number) => {
    if (!cropState) return;

    const zoom = clamp(newZoom, cropState.minZoom, cropState.maxZoom);
    const coverScale = Math.max(cropState.cropW / cropState.naturalW, cropState.cropH / cropState.naturalH);

    const scaledW = cropState.naturalW * coverScale * zoom;
    const scaledH = cropState.naturalH * coverScale * zoom;
    const maxOffsetX = Math.max(0, (scaledW - cropState.cropW) / 2);
    const maxOffsetY = Math.max(0, (scaledH - cropState.cropH) / 2);

    setCropState({
      ...cropState,
      zoom,
      translateX: clamp(cropState.translateX, -maxOffsetX, maxOffsetX),
      translateY: clamp(cropState.translateY, -maxOffsetY, maxOffsetY),
    });
    setChangesTracker((prev) => ({ ...prev, crop: true }));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cropState) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      tx: cropState.translateX,
      ty: cropState.translateY,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || !cropState) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const dx = event.clientX - dragStartRef.current!.x;
      const dy = event.clientY - dragStartRef.current!.y;

      const coverScale = Math.max(cropState.cropW / cropState.naturalW, cropState.cropH / cropState.naturalH);
      const scaledW = cropState.naturalW * coverScale * cropState.zoom;
      const scaledH = cropState.naturalH * coverScale * cropState.zoom;
      const maxOffsetX = Math.max(0, (scaledW - cropState.cropW) / 2);
      const maxOffsetY = Math.max(0, (scaledH - cropState.cropH) / 2);

      setCropState({
        ...cropState,
        translateX: clamp(dragStartRef.current!.tx + dx, -maxOffsetX, maxOffsetX),
        translateY: clamp(dragStartRef.current!.ty + dy, -maxOffsetY, maxOffsetY),
      });
      setChangesTracker((prev) => ({ ...prev, crop: true }));
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!cropState) return;
    event.preventDefault();

    const delta = -event.deltaY * 0.001;
    const newZoom = cropState.zoom * (1 + delta);
    handleZoomChange(newZoom);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (activeTab !== "crop" || !cropState) return;
    if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) return;

    const step = event.shiftKey ? 1 : 10;

    switch (event.key.toLowerCase()) {
      case "arrowup":
        event.preventDefault();
        setCropState({ ...cropState, translateY: cropState.translateY + step });
        break;
      case "arrowdown":
        event.preventDefault();
        setCropState({ ...cropState, translateY: cropState.translateY - step });
        break;
      case "arrowleft":
        event.preventDefault();
        setCropState({ ...cropState, translateX: cropState.translateX + step });
        break;
      case "arrowright":
        event.preventDefault();
        setCropState({ ...cropState, translateX: cropState.translateX - step });
        break;
      case "+":
      case "=":
        event.preventDefault();
        handleZoomChange(cropState.zoom * 1.05);
        break;
      case "-":
        event.preventDefault();
        handleZoomChange(cropState.zoom * 0.95);
        break;
      case "1":
        event.preventDefault();
        handlePresetChange("square");
        break;
      case "2":
        event.preventDefault();
        handlePresetChange("wide");
        break;
      case "3":
        event.preventDefault();
        handlePresetChange("original");
        break;
      case "g":
        event.preventDefault();
        setShowGrid(!showGrid);
        break;
    }
  };

  const hasChanges = useMemo(() => {
    if (!initialStateRef.current) return false;
    return (
      !isTransformEqual(transform, initialStateRef.current.transform) ||
      altText !== initialStateRef.current.alt ||
      !arraysEqual(warnings, initialStateRef.current.warnings)
    );
  }, [transform, altText, warnings]);

  const handleSave = () => {
    if (!media) return;

    let updatedTransform = transform;

    // Calculate cropRect in original image pixels (as per X/Twitter spec §8.1) only if we have cropState
    if (cropState && isImage) {
      const coverScale = Math.max(cropState.cropW / cropState.naturalW, cropState.cropH / cropState.naturalH);
      const S = coverScale * cropState.zoom;

      const cropRectW = cropState.cropW / S;
      const cropRectH = cropState.cropH / S;

      const cropRectX = cropState.naturalW / 2 - cropRectW / 2 - cropState.translateX / S;
      const cropRectY = cropState.naturalH / 2 - cropRectH / 2 - cropState.translateY / S;

      // Round and clamp to image bounds
      const cropRect = {
        x: Math.max(0, Math.min(Math.round(cropRectX), cropState.naturalW - Math.round(cropRectW))),
        y: Math.max(0, Math.min(Math.round(cropRectY), cropState.naturalH - Math.round(cropRectH))),
        w: Math.round(cropRectW),
        h: Math.round(cropRectH),
      };

      updatedTransform = {
        ...transform,
        scale: cropState.zoom,
        translateX: cropState.translateX,
        translateY: cropState.translateY,
        aspectRatio: cropState.preset === "original" ? "original" : cropState.preset === "wide" ? "16:9" : "1:1",
        cropRect,
      };
    }

    onSave({
      ...media,
      transform: updatedTransform,
      alt: altText,
      sensitiveTags: warnings,
    });
  };

  const closeWithConfirmation = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!mounted || !media) return null;

  const isImage = media.type === "image";
  const altChars = altText.length;

  const coverScale = cropState ? Math.max(cropState.cropW / cropState.naturalW, cropState.cropH / cropState.naturalH) : 1;
  const realScale = cropState ? coverScale * cropState.zoom : 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[2200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeWithConfirmation();
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-[920px] overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[100px] outline-none"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between border-b border-[#181B22] px-6 py-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWithConfirmation();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#E7E9EA] transition-colors hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <button
              className={classNames(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === "crop"
                  ? "bg-[#1D9BF0]/20 text-[#1D9BF0]"
                  : "text-[#E7E9EA] hover:bg-white/10"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("crop");
              }}
              disabled={!isImage}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 3V17C6 18.1046 6.89543 19 8 19H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 6H17C18.1046 6 19 6.89543 19 8V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Crop
            </button>

            <button
              className={classNames(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === "alt"
                  ? "bg-[#1D9BF0]/20 text-[#1D9BF0]"
                  : "text-[#E7E9EA] hover:bg-white/10"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("alt");
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7V17M4 17H8M4 17L12 7M12 17V7M12 17H20M12 7H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ALT
            </button>

            <button
              className={classNames(
                "flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === "warning"
                  ? "bg-[#F97316]/20 text-[#F97316]"
                  : "text-[#E7E9EA] hover:bg-white/10"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("warning");
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                <path d="M3 2h18.61l-3.5 7 3.5 7H5v6H3V2zm2 12h13.38l-2.5-5 2.5-5H5v10z" />
              </svg>
            </button>
          </div>

          <div className="w-9" />
        </div>

        {activeTab === "crop" && (
          <div className="space-y-6 p-6">
            {!isImage ? (
              <div className="rounded-2xl border border-[#181B22] bg-white/5 px-4 py-6 text-center text-sm text-[#808283]">
                Cropping is available for images only.
              </div>
            ) : !cropState ? (
              <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border-2 border-[#1D9BF0] bg-black">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <svg className="h-8 w-8 animate-spin text-[#1D9BF0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div className="text-sm text-[#E7E9EA]">Loading image...</div>
                </div>
              </div>
            ) : (
              <>
                <div
                  ref={containerRef}
                  className={classNames(
                    "relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-[#1D9BF0] bg-black",
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  )}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onWheel={handleWheel}
                >
                  <div
                    className="absolute"
                    style={{
                      width: `${cropState.cropW}px`,
                      height: `${cropState.cropH}px`,
                      left: `${(cropState.viewportW - cropState.cropW) / 2}px`,
                      top: `${(cropState.viewportH - cropState.cropH) / 2}px`,
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={media.url}
                      alt="Crop preview"
                      draggable={false}
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                      style={{
                        width: `${cropState.naturalW * realScale}px`,
                        height: `${cropState.naturalH * realScale}px`,
                        transform: `translate(-50%, -50%) translate(${cropState.translateX}px, ${cropState.translateY}px)`,
                      }}
                    />
                  </div>

                  {showGrid && (
                    <div
                      className="pointer-events-none absolute grid grid-cols-3 grid-rows-3 opacity-40"
                      style={{
                        width: `${cropState.cropW}px`,
                        height: `${cropState.cropH}px`,
                        left: `${(cropState.viewportW - cropState.cropW) / 2}px`,
                        top: `${(cropState.viewportH - cropState.cropH) / 2}px`,
                      }}
                    >
                      {Array.from({ length: 9 }).map((_, idx) => (
                        <div key={idx} className="border border-white/10" />
                      ))}
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-black/60" style={{
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${(cropState.viewportW - cropState.cropW) / 2}px ${(cropState.viewportH - cropState.cropH) / 2}px, ${(cropState.viewportW - cropState.cropW) / 2}px ${(cropState.viewportH + cropState.cropH) / 2}px, ${(cropState.viewportW + cropState.cropW) / 2}px ${(cropState.viewportH + cropState.cropH) / 2}px, ${(cropState.viewportW + cropState.cropW) / 2}px ${(cropState.viewportH - cropState.cropH) / 2}px, ${(cropState.viewportW - cropState.cropW) / 2}px ${(cropState.viewportH - cropState.cropH) / 2}px)`
                  }} />
                </div>

                {cropState && (
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Original"
                        title="Original"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePresetChange("original");
                        }}
                        className={classNames(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:bg-[rgba(255,255,255,0.18)] hover:backdrop-blur-sm focus-visible:outline-none",
                          cropState.preset === "original" ? "text-[#1D9BF0]" : "text-[#71767B] hover:text-white"
                        )}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                          <path d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Wide"
                        title="Wide"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePresetChange("wide");
                        }}
                        className={classNames(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:bg-[rgba(255,255,255,0.18)] hover:backdrop-blur-sm focus-visible:outline-none",
                          cropState.preset === "wide" ? "text-[#1D9BF0]" : "text-[#71767B] hover:text-white"
                        )}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                          <path d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Square"
                        title="Square"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePresetChange("square");
                        }}
                        className={classNames(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:bg-[rgba(255,255,255,0.18)] hover:backdrop-blur-sm focus-visible:outline-none",
                          cropState.preset === "square" ? "text-[#1D9BF0]" : "text-[#71767B] hover:text-white"
                        )}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                          <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z" />
                        </svg>
                      </button>
                    </div>

                    <div className="h-6 w-px bg-[#2F3336]" />

                    <div className="flex flex-1 items-center gap-3">
                      <button
                        type="button"
                        aria-label="Zoom out"
                        onClick={() => handleZoomChange(cropState.zoom * 0.9)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-[#71767B] transition-all duration-200 hover:bg-[rgba(255,255,255,0.18)] hover:text-white hover:backdrop-blur-sm focus-visible:outline-none"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                          <path d="M11 4c-3.87 0-7 3.13-7 7s3.13 7 7 7c1.93 0 3.68-.78 4.95-2.05C17.21 14.68 18 12.93 18 11c0-3.87-3.14-7-7-7zm-9 7c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.12-.74 4.08-1.97 5.62l3.68 3.67-1.42 1.42-3.67-3.68C15.08 19.26 13.12 20 11 20c-4.97 0-9-4.03-9-9zm12.5 1h-7v-2h7v2z" />
                        </svg>
                      </button>

                      <input
                        type="range"
                        min={cropState.minZoom}
                        max={cropState.maxZoom}
                        step={0.01}
                        value={cropState.zoom}
                        onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                        aria-label="Zoom slider"
                        className="h-1 flex-1 cursor-pointer accent-[#1D9BF0]"
                      />

                      <button
                        type="button"
                        aria-label="Zoom in"
                        onClick={() => handleZoomChange(cropState.zoom * 1.1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-[#71767B] transition-all duration-200 hover:bg-[rgba(255,255,255,0.18)] hover:text-white hover:backdrop-blur-sm focus-visible:outline-none"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                          <path d="M11 4c-3.87 0-7 3.13-7 7s3.13 7 7 7c1.93 0 3.68-.78 4.95-2.05C17.21 14.68 18 12.93 18 11c0-3.87-3.14-7-7-7zm-9 7c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.12-.74 4.08-1.97 5.62l3.68 3.67-1.42 1.42-3.67-3.68C15.08 19.26 13.12 20 11 20c-4.97 0-9-4.03-9-9zm8-1V7.5h2V10h2.5v2H12v2.5h-2V12H7.5v-2H10z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "alt" && (
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#E7E9EA]" htmlFor="alt-editor">
                Description (ALT text)
              </label>
              <button
                type="button"
                className="text-xs font-semibold text-[#A06AFF] underline-offset-4 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAltHelp((prev) => !prev);
                }}
              >
                What is alt text?
              </button>
            </div>

            {showAltHelp && (
              <div className="rounded-2xl border border-[#181B22] bg-white/5 p-4 text-xs text-[#E7E9EA]">
                Describe who or what is important in the image, the setting, and any visible text. Write naturally
                without starting with "Image of…". Include relevant context so everyone understands what's shown.
              </div>
            )}

            <textarea
              id="alt-editor"
              value={altText}
              onChange={(e) => {
                setAltText(e.target.value);
                setChangesTracker((prev) => ({ ...prev, alt: true }));
              }}
              maxLength={ALT_LIMIT}
              placeholder="Describe this image for people who can't see it"
              className="h-32 w-full resize-none rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 text-sm text-[#E7E9EA] placeholder:text-[#808283] outline-none backdrop-blur-[50px] transition-colors focus:border-[#A06AFF] scrollbar"
            />

            <div className={classNames("text-xs", altChars >= ALT_LIMIT ? "text-[#EF454A]" : "text-[#808283]")}>
              {altChars} / {ALT_LIMIT}
            </div>
          </div>
        )}

        {activeTab === "warning" && (
          <div className="space-y-4 p-6">
            <p className="text-sm text-[#E7E9EA]">
              Helps people avoid content they don't want to see. Select all that apply.
            </p>

            <div className="space-y-3">
              {WARNING_OPTIONS.map((option) => {
                const checked = warnings.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className="flex items-start gap-3 rounded-2xl border border-[#181B22] bg-white/5 p-4 hover:bg-white/10"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-[#181B22] bg-[#0C1014] text-[#A06AFF] focus:ring-[#A06AFF]"
                      checked={checked}
                      onChange={(event) => {
                        event.stopPropagation();
                        setWarnings((prev) => {
                          if (event.target.checked) {
                            return [...prev, option.id];
                          }
                          return prev.filter((item) => item !== option.id);
                        });
                        setChangesTracker((prev) => ({ ...prev, warning: true }));
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">{option.label}</div>
                      <div className="text-xs text-[#808283]">{option.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-[#181B22] px-6 py-4">
          <button
            onClick={closeWithConfirmation}
            className="rounded-full border border-[#181B22] bg-transparent px-5 py-2 text-sm font-semibold text-[#E7E9EA] transition-all hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

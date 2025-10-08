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

const ASPECT_RATIOS: {
  id: CropTransform["aspectRatio"];
  label: string;
  value?: number;
}[] = [
  { id: "original", label: "Original" },
  { id: "1:1", label: "Square", value: 1 },
  { id: "4:5", label: "Portrait", value: 4 / 5 },
  { id: "16:9", label: "Landscape", value: 16 / 9 },
];

const GRID_SEQUENCE: CropTransform["grid"][] = ["thirds", "golden", "center", "off"];
const MAX_SCALE_MULTIPLIER = 8;
const ALT_LIMIT = 1000;

const WARNING_OPTIONS = [
  { id: "nudity", label: "Nudity", description: "Includes partial or full nudity." },
  { id: "violence", label: "Violence", description: "Graphic or physical violence present." },
  { id: "sensitive", label: "Sensitive", description: "Potentially distressing or triggering content." },
];

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
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [changesTracker, setChangesTracker] = useState({ crop: false, alt: false, warning: false });
  const [showAltHelp, setShowAltHelp] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const lastTransformRef = useRef<CropTransform | null>(null);
  const initialStateRef = useRef<{ transform: CropTransform; alt: string; warnings: string[] } | null>(null);
  const initializedRef = useRef(false);

  const angleRadians = useMemo(() => ((transform.angle + transform.straighten) * Math.PI) / 180, [transform.angle, transform.straighten]);
  const currentGrid = transform.grid;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (media && modalRef.current) {
      modalRef.current.focus();
    }
  }, [media]);

  useEffect(() => {
    if (!media) return;

    initializedRef.current = false;
    setAltText(media.alt ?? "");
    setWarnings(media.sensitiveTags ?? []);
    setTransform(media.transform ? { ...media.transform } : createDefaultTransform());
    setActiveTab(media.type === "image" ? "crop" : "alt");

    const image = new Image();
    image.src = media.url;
    image.onload = () => {
      setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    };
  }, [media]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry?.contentRect) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const aspectRatioValue = useMemo(() => {
    if (!imageSize) return null;
    const ratioEntry = ASPECT_RATIOS.find((option) => option.id === transform.aspectRatio);

    if (!ratioEntry) return null;
    if (ratioEntry.id === "original") {
      return imageSize.width / imageSize.height;
    }
    if (ratioEntry.id === "free") {
      return null;
    }
    return ratioEntry.value ?? null;
  }, [transform.aspectRatio, imageSize]);

  const frameSize = useMemo(() => {
    const { width: cw, height: ch } = containerSize;
    if (!cw || !ch) return { width: 0, height: 0 };

    if (!aspectRatioValue) {
      return { width: cw, height: ch };
    }

    let width = cw;
    let height = width / aspectRatioValue;

    if (height > ch) {
      height = ch;
      width = height * aspectRatioValue;
    }

    return { width, height };
  }, [aspectRatioValue, containerSize]);

  const rotatedBounds = useMemo(() => {
    if (!imageSize) return { width: 0, height: 0 };
    const cos = Math.abs(Math.cos(angleRadians));
    const sin = Math.abs(Math.sin(angleRadians));
    const width = imageSize.width * cos + imageSize.height * sin;
    const height = imageSize.width * sin + imageSize.height * cos;
    return { width, height };
  }, [imageSize, angleRadians]);

  const minScale = useMemo(() => {
    if (!imageSize || !frameSize.width || !frameSize.height) return 1;
    const baseWidth = rotatedBounds.width;
    const baseHeight = rotatedBounds.height;
    return Math.max(frameSize.width / baseWidth, frameSize.height / baseHeight);
  }, [imageSize, rotatedBounds, frameSize]);

  const maxScale = minScale * MAX_SCALE_MULTIPLIER;

  useEffect(() => {
    if (!media) return;

    const initial = initialStateRef.current;
    if (!initial) return;

    setChangesTracker({
      crop: !isTransformEqual(initial.transform, transform),
      alt: (altText ?? "").trim() !== (initial.alt ?? "").trim(),
      warning: !arraysEqual(warnings, initial.warnings),
    });
  }, [transform, altText, warnings, media]);

  const clampTransform = (next: CropTransform): CropTransform => {
    if (!imageSize || !frameSize.width || !frameSize.height) {
      return next;
    }

    const scale = Math.min(Math.max(next.scale, minScale), maxScale);

    const cos = Math.abs(Math.cos(angleRadians));
    const sin = Math.abs(Math.sin(angleRadians));
    const scaledWidth = (imageSize.width * cos + imageSize.height * sin) * scale;
    const scaledHeight = (imageSize.width * sin + imageSize.height * cos) * scale;

    const maxOffsetX = Math.max(0, (scaledWidth - frameSize.width) / 2);
    const maxOffsetY = Math.max(0, (scaledHeight - frameSize.height) / 2);

    return {
      ...next,
      scale,
      translateX: Math.min(Math.max(next.translateX, -maxOffsetX), maxOffsetX),
      translateY: Math.min(Math.max(next.translateY, -maxOffsetY), maxOffsetY),
    };
  };

  const updateTransform = (updater: (prev: CropTransform) => CropTransform) => {
    setTransform((prev) => {
      const updated = clampTransform(updater(prev));
      lastTransformRef.current = updated;
      return updated;
    });
  };

  useEffect(() => {
    if (!media || !imageSize || !frameSize.width || !frameSize.height) return;

    if (!initializedRef.current) {
      const base = clampTransform(
        media.transform ? { ...media.transform } : { ...createDefaultTransform(), scale: minScale },
      );
      setTransform(base);
      initialStateRef.current = {
        transform: base,
        alt: media.alt ?? "",
        warnings: media.sensitiveTags ?? [],
      };
      initializedRef.current = true;
    } else {
      setTransform((prev) => {
        const clamped = clampTransform(prev);
        return isTransformEqual(clamped, prev) ? prev : clamped;
      });
    }
  }, [media, imageSize, frameSize.width, frameSize.height, minScale, maxScale, angleRadians]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (!containerRef.current) return;

    event.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      tx: transform.translateX,
      ty: transform.translateY,
    };

    containerRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;

    const { x, y, tx, ty } = dragStartRef.current;
    const deltaX = event.clientX - x;
    const deltaY = event.clientY - y;

    updateTransform((prev) => ({
      ...prev,
      translateX: tx + deltaX,
      translateY: ty + deltaY,
    }));
  };

  const handlePointerUp = (event?: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (event && containerRef.current && containerRef.current.hasPointerCapture(event.pointerId)) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
    dragStartRef.current = null;
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handlePointerUp(event);
  };

  const applyZoom = (nextScale: number, focalPoint?: { x: number; y: number }) => {
    if (!imageSize || !frameSize.width || !frameSize.height) return;

    const clampedScale = Math.min(Math.max(nextScale, minScale), maxScale);

    updateTransform((prev) => {
      if (!focalPoint) {
        return { ...prev, scale: clampedScale };
      }

      const scaleRatio = clampedScale / prev.scale;
      const newTranslateX = prev.translateX - (focalPoint.x - frameSize.width / 2) * (scaleRatio - 1);
      const newTranslateY = prev.translateY - (focalPoint.y - frameSize.height / 2) * (scaleRatio - 1);

      return {
        ...prev,
        scale: clampedScale,
        translateX: newTranslateX,
        translateY: newTranslateY,
      };
    });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (activeTab !== "crop") return;
    event.preventDefault();

    const zoomDirection = event.deltaY > 0 ? -1 : 1;
    const factor = 1 + zoomDirection * 0.08;
    const nextScale = transform.scale * factor;

    const rect = event.currentTarget.getBoundingClientRect();
    const focalPoint = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    applyZoom(nextScale, focalPoint);
  };

  const handleDoubleClick = () => {
    if (activeTab !== "crop") return;

    updateTransform((prev) => {
      if (prev.fitMode === "fit") {
        const nextScale = Math.min(Math.max(prev.scale * 1.2, minScale * 1.2), maxScale);
        return { ...prev, scale: nextScale, fitMode: "fill" };
      }
      return { ...prev, scale: minScale, translateX: 0, translateY: 0, fitMode: "fit" };
    });
  };

  const toggleFlip = (axis: "flipH" | "flipV") => {
    updateTransform((prev) => ({
      ...prev,
      [axis]: !prev[axis],
    }));
  };

  const cycleGrid = () => {
    const currentIndex = GRID_SEQUENCE.indexOf(currentGrid);
    const nextIndex = (currentIndex + 1) % GRID_SEQUENCE.length;
    updateTransform((prev) => ({ ...prev, grid: GRID_SEQUENCE[nextIndex] }));
  };

  const resetTransform = () => {
    updateTransform(() => ({
      ...createDefaultTransform(),
      scale: minScale,
      grid: currentGrid,
    }));
  };

  const handleAspectRatioChange = (ratio: CropTransform["aspectRatio"]) => {
    updateTransform((prev) => ({
      ...prev,
      aspectRatio: ratio,
      translateX: 0,
      translateY: 0,
    }));
  };

  const handleFitModeChange = (mode: CropTransform["fitMode"]) => {
    updateTransform((prev) => ({
      ...prev,
      fitMode: mode,
      scale: mode === "fit" ? minScale : Math.min(Math.max(prev.scale * 1.2, minScale * 1.2), maxScale),
      translateX: 0,
      translateY: 0,
    }));
  };

  const handleRotate = (direction: "cw" | "ccw") => {
    updateTransform((prev) => ({
      ...prev,
      angle: direction === "cw" ? prev.angle + 90 : prev.angle - 90,
    }));
  };

  const handleStraightenChange = (value: number) => {
    updateTransform((prev) => ({
      ...prev,
      straighten: value,
    }));
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (activeTab !== "crop") return;
    if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) return;

    switch (event.key.toLowerCase()) {
      case "r":
        event.preventDefault();
        if (event.shiftKey) {
          handleRotate("ccw");
        } else {
          handleRotate("cw");
        }
        break;
      case "h":
        event.preventDefault();
        toggleFlip("flipH");
        break;
      case "v":
        event.preventDefault();
        toggleFlip("flipV");
        break;
      case "0":
        event.preventDefault();
        resetTransform();
        break;
      case "g":
        event.preventDefault();
        cycleGrid();
        break;
      case "arrowup":
        event.preventDefault();
        updateTransform((prev) => ({ ...prev, translateY: prev.translateY + (event.shiftKey ? 50 : 10) }));
        break;
      case "arrowdown":
        event.preventDefault();
        updateTransform((prev) => ({ ...prev, translateY: prev.translateY - (event.shiftKey ? 50 : 10) }));
        break;
      case "arrowleft":
        event.preventDefault();
        updateTransform((prev) => ({ ...prev, translateX: prev.translateX + (event.shiftKey ? 50 : 10) }));
        break;
      case "arrowright":
        event.preventDefault();
        updateTransform((prev) => ({ ...prev, translateX: prev.translateX - (event.shiftKey ? 50 : 10) }));
        break;
      case " ":
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const canSave = useMemo(() => {
    const altValid = altText.trim().length <= ALT_LIMIT;
    return altValid && (changesTracker.crop || changesTracker.alt || changesTracker.warning);
  }, [changesTracker, altText]);

  const currentTitle = useMemo(() => {
    switch (activeTab) {
      case "crop":
        return "Crop media";
      case "alt":
        return "ALT";
      case "warning":
        return "Content warning";
      default:
        return "Edit media";
    }
  }, [activeTab]);

  const closeWithConfirmation = () => {
    if (changesTracker.crop || changesTracker.alt || changesTracker.warning) {
      const shouldDiscard = window.confirm("Discard your changes?");
      if (!shouldDiscard) return;
    }
    onClose();
  };

  const handleSave = () => {
    if (!media) return;

    const updated: MediaItem = {
      ...media,
      alt: altText.trim() ? altText.trim() : undefined,
      sensitiveTags: warnings,
      transform,
    };

    onSave(updated);
    onClose();
  };

  const renderGridOverlay = () => {
    if (currentGrid === "off") return null;

    return (
      <div className="pointer-events-none absolute inset-0">
        {currentGrid === "thirds" && (
          <>
            <div className="absolute inset-0 flex">
              <div className="flex-1 border-l border-r border-white/20" />
              <div className="flex-1 border-r border-white/20" />
            </div>
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 border-t border-b border-white/20" />
              <div className="flex-1 border-b border-white/20" />
            </div>
          </>
        )}
        {currentGrid === "golden" && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 border border-white/20" />
            <div className="absolute inset-y-0 left-[38.2%] border-l border-white/20" />
            <div className="absolute inset-y-0 right-[38.2%] border-r border-white/20" />
            <div className="absolute inset-x-0 top-[38.2%] border-t border-white/20" />
            <div className="absolute inset-x-0 bottom-[38.2%] border-b border-white/20" />
          </div>
        )}
        {currentGrid === "center" && (
          <>
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/30" />
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30" />
          </>
        )}
      </div>
    );
  };

  if (!mounted || !media) return null;

  const isImage = media.type === "image";
  const altChars = altText.length;

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
            className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-[#E7E9EA] transition-colors hover:bg-white/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <h2 className="text-base font-semibold text-white">{currentTitle}</h2>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={!canSave}
            className={classNames(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all",
              canSave
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
                : "cursor-not-allowed bg-[#A06AFF]/20 text-white/40",
            )}
          >
            Save
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-[#181B22] px-6 py-3">
          <button
            className={classNames(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              activeTab === "crop"
                ? "bg-[#A06AFF]/20 text-[#A06AFF]"
                : "text-[#808283] hover:bg-white/5",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("crop");
            }}
            disabled={!isImage}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="5" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 9H15" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5V15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Crop
          </button>

          <button
            className={classNames(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              activeTab === "alt"
                ? "bg-[#A06AFF]/20 text-[#A06AFF]"
                : "text-[#808283] hover:bg-white/5",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("alt");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4H20M9.5 20L14.5 4"
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
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              activeTab === "warning"
                ? "bg-[#A06AFF]/20 text-[#A06AFF]"
                : "text-[#808283] hover:bg-white/5",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("warning");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.29 3.85998L2.82002 16C2.64931 16.3083 2.55882 16.6563 2.55767 17.0096C2.55651 17.3628 2.64471 17.7115 2.81329 18.0209C2.98186 18.3303 3.22493 18.5892 3.51737 18.7733C3.80981 18.9573 4.14164 19.0603 4.48202 19.073L19.518 19.073C19.8584 19.0603 20.1902 18.9573 20.4827 18.7733C20.7751 18.5892 21.0181 18.3303 21.1867 18.0209C21.3553 17.7115 21.4435 17.3628 21.4423 17.0096C21.4412 16.6563 21.3507 16.3083 21.18 16L13.71 3.85998C13.532 3.56536 13.2802 3.32529 12.9782 3.16455C12.6762 3.00381 12.3354 2.9292 11.992 2.94979C11.6487 2.97038 11.3184 3.08532 11.0387 3.28137C10.7589 3.47742 10.5429 3.74606 10.412 4.05699L10.29 3.85998Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Content warning
          </button>
        </div>

        {activeTab === "crop" && (
          <div className="space-y-5 px-6 py-5">
            {!isImage ? (
              <div className="rounded-2xl border border-[#181B22] bg-white/5 px-4 py-6 text-center text-sm text-[#808283]">
                Cropping is available for images only.
              </div>
            ) : (
              <>
                <div
                  ref={containerRef}
                  className={classNames(
                    "relative w-full overflow-hidden rounded-2xl border-2 border-[#1D9BF0] bg-black",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                  )}
                  style={{ height: 420 }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerLeave}
                  onPointerCancel={handlePointerUp}
                  onDoubleClick={handleDoubleClick}
                  onWheel={handleWheel}
                >
                  <div className="relative h-full w-full flex items-center justify-center">
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: frameSize.width || "100%",
                        height: frameSize.height || "100%",
                      }}
                    >
                      <img
                        src={media.url}
                        alt=""
                        draggable={false}
                        className={classNames(
                          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none object-cover",
                          transform.flipH ? "-scale-x-100" : "",
                          transform.flipV ? "-scale-y-100" : "",
                        )}
                        style={{
                          width: imageSize ? imageSize.width : "auto",
                          height: imageSize ? imageSize.height : "auto",
                          transform: `translate(-50%, -50%) translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale}) rotate(${transform.angle + transform.straighten}deg)`,
                          transformOrigin: "center",
                        }}
                      />
                      {renderGridOverlay()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {ASPECT_RATIOS.map((preset) => (
                      <button
                        type="button"
                        key={preset.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleAspectRatioChange(preset.id);
                        }}
                        className={classNames(
                          "flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-all",
                          transform.aspectRatio === preset.id
                            ? "border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0]"
                            : "border-[#2F3336] bg-transparent text-[#E7E9EA] hover:bg-white/5",
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="h-6 w-px bg-[#2F3336]" />

                  <div className="flex flex-1 items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#E7E9EA]">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                      type="range"
                      min={minScale}
                      max={maxScale}
                      step={Math.max((maxScale - minScale) / 200, 0.01)}
                      value={transform.scale}
                      onChange={(event) => {
                        event.stopPropagation();
                        applyZoom(parseFloat(event.target.value));
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-1 flex-1 cursor-pointer accent-[#1D9BF0]"
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#E7E9EA]">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "alt" && (
          <div className="space-y-4 px-6 py-6">
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
                Describe who or what is important in the image, the setting, and any visible text. Write naturally without starting with “Image of…”. Include relevant context so everyone understands what’s shown.
              </div>
            )}

            <textarea
              id="alt-editor"
              value={altText}
              onChange={(event) => {
                event.stopPropagation();
                setAltText(event.target.value.slice(0, ALT_LIMIT));
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="Add a description for accessibility"
              className="h-40 w-full resize-none rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 text-sm text-[#E7E9EA] placeholder:text-[#808283] outline-none backdrop-blur-[50px] focus:border-[#A06AFF] scrollbar"
            />

            <div className={classNames("text-xs", altChars >= ALT_LIMIT ? "text-[#EF454A]" : "text-[#808283]")}>
              {altChars} / {ALT_LIMIT}
            </div>
          </div>
        )}

        {activeTab === "warning" && (
          <div className="space-y-4 px-6 py-6">
            <p className="text-sm text-[#E7E9EA]">
              Helps people avoid content they don’t want to see. Select all that apply.
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
      </div>
    </div>,
    document.body,
  );
};

import { FC, useState } from "react";
import { MediaItem } from "./types";

interface MediaGridProps {
  media: MediaItem[];
  onRemove: (mediaId: string) => void;
  onEdit: (media: MediaItem) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  readOnly?: boolean;
}

export const MediaGrid: FC<MediaGridProps> = ({
  media,
  onRemove,
  onEdit,
  onReorder,
  readOnly = false,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const gridClass = media.length === 1 ? "grid-cols-1" : "grid-cols-2";
  const heightClass = media.length === 1 ? "max-h-[400px]" : "max-h-[280px]";
  const isInteractive = !readOnly;

  return (
    <div className={`mt-3 grid gap-3 ${gridClass}`}>
      {media.map((item, index) => (
        <div
          key={item.id}
          draggable={isInteractive}
          onDragStart={isInteractive ? () => setDraggedIndex(index) : undefined}
          onDragEnd={isInteractive ? () => setDraggedIndex(null) : undefined}
          onDragOver={
            isInteractive ? (event) => event.preventDefault() : undefined
          }
          onDrop={
            isInteractive
              ? () => {
                  if (draggedIndex !== null && draggedIndex !== index) {
                    onReorder(draggedIndex, index);
                  }
                  setDraggedIndex(null);
                }
              : undefined
          }
          className={`group relative overflow-hidden rounded-2xl border backdrop-blur-[50px] transition-all ${heightClass} ${
            isInteractive ? "cursor-move" : "cursor-default"
          } ${
            isInteractive && draggedIndex === index
              ? "opacity-50 scale-95 border-[#A06AFF]"
              : isInteractive && draggedIndex !== null
                ? "border-[#A06AFF]/50 bg-[rgba(12,16,20,0.5)]"
                : "border-[#181B22] bg-[rgba(12,16,20,0.5)]"
          }`}
        >
          {item.type === "video" ? (
            <video
              src={item.url}
              className="h-full w-full object-cover"
              style={{ aspectRatio: media.length === 1 ? "auto" : "16/9" }}
            />
          ) : (
            <img
              src={item.url}
              alt={item.alt || `Media ${index + 1}`}
              className="h-full w-full object-cover"
              style={{ aspectRatio: media.length === 1 ? "auto" : "16/9" }}
            />
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30 pointer-events-none" />

          {item.sensitiveTags && item.sensitiveTags.length > 0 && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-center text-xs font-semibold uppercase tracking-wide text-[#E7E9EA] backdrop-blur-[6px]">
              <span>Sensitive content</span>
              <span className="text-[10px] text-[#A06AFF]">
                {item.sensitiveTags.join(" • ")}
              </span>
            </div>
          )}

          <div
            className={`absolute top-3 right-3 flex gap-2 transition-opacity ${isInteractive ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
          >
            <button
              type="button"
              onClick={isInteractive ? () => onEdit(item) : undefined}
              disabled={!isInteractive}
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.72)] text-white/90 backdrop-blur-sm transition-colors duration-200 ${
                isInteractive
                  ? "hover:bg-[rgba(255,255,255,0.18)]"
                  : "opacity-60 cursor-default"
              }`}
              title="Edit"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={isInteractive ? () => onRemove(item.id) : undefined}
              disabled={!isInteractive}
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.72)] text-white/90 backdrop-blur-sm transition-colors duration-200 ${
                isInteractive
                  ? "hover:bg-[rgba(255,255,255,0.18)]"
                  : "opacity-60 cursor-default"
              }`}
              title="Remove"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
            {item.alt && (
              <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                ALT
              </span>
            )}
            {item.sensitiveTags && item.sensitiveTags.length > 0 && (
              <span className="rounded-full bg-[#A06AFF]/20 px-3 py-1 text-xs font-semibold text-[#A06AFF]">
                Warning
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

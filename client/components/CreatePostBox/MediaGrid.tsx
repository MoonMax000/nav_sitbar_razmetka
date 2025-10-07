import { FC, useState } from "react";
import { MediaItem } from "./types";

interface MediaGridProps {
  media: MediaItem[];
  onRemove: (mediaId: string) => void;
  onEdit: (media: MediaItem) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const MediaGrid: FC<MediaGridProps> = ({ media, onRemove, onEdit }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const gridClass = media.length === 1 ? "grid-cols-1" : "grid-cols-2";

  return (
    <div className={`mt-3 grid gap-3 ${gridClass}`}>
      {media.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => setDraggedIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggedIndex !== null && draggedIndex !== index) {
              onRemove(item.id);
            }
            setDraggedIndex(null);
          }}
          className="group relative overflow-hidden rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] cursor-move"
        >
          {item.type === "video" ? (
            <video src={item.url} className="h-full w-full object-cover" />
          ) : (
            <img src={item.url} alt={item.alt || `Media ${index + 1}`} className="h-full w-full object-cover" />
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />

          <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onEdit(item)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm hover:bg-black/90"
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
              onClick={() => onRemove(item.id)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm hover:bg-black/90"
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

          {item.alt && (
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                ALT
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

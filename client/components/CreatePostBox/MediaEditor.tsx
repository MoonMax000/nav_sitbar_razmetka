import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MediaItem } from "./types";

interface MediaEditorProps {
  media: MediaItem | null;
  onSave: (media: MediaItem) => void;
  onClose: () => void;
}

export const MediaEditor: FC<MediaEditorProps> = ({ media, onSave, onClose }) => {
  const [alt, setAlt] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (media) {
      setAlt(media.alt || "");
    }
  }, [media]);

  const handleSave = () => {
    if (media) {
      onSave({ ...media, alt });
      onClose();
    }
  };

  if (!mounted || !media) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-2xl backdrop-blur-[100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#181B22] px-5 py-4">
          <h2 className="text-lg font-bold text-white">Edit media</h2>
          <button
            onClick={onClose}
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
        </div>

        <div className="p-5">
          <div className="mb-5 overflow-hidden rounded-2xl border border-[#181B22]">
            {media.type === "video" ? (
              <video src={media.url} className="w-full" controls />
            ) : (
              <img src={media.url} alt={alt} className="w-full" />
            )}
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#E7E9EA]">
                Description (ALT text)
              </span>
              <textarea
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Add a description for accessibility"
                className="w-full resize-none rounded-xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-3 text-sm text-[#E7E9EA] placeholder:text-[#808283] outline-none backdrop-blur-[50px] focus:border-[#A06AFF] scrollbar"
                rows={3}
                maxLength={1000}
              />
              <span className="mt-1 block text-xs text-[#808283]">
                {alt.length} / 1000
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#181B22] px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-full border border-[#181B22] px-5 py-2 text-sm font-semibold text-[#E7E9EA] transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

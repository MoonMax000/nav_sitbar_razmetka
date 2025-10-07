import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ComposerDraft } from "./types";

interface DraftsListProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (draft: ComposerDraft) => void;
  onDelete: (draftId: string) => void;
}

export const DraftsList: FC<DraftsListProps> = ({ isOpen, onClose, onOpen, onDelete }) => {
  const [drafts, setDrafts] = useState<ComposerDraft[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const savedDrafts = localStorage.getItem("composer-drafts");
      if (savedDrafts) {
        setDrafts(JSON.parse(savedDrafts));
      }
    }
  }, [isOpen]);

  const handleDelete = (draftId: string) => {
    const updated = drafts.filter((d) => d.id !== draftId);
    setDrafts(updated);
    localStorage.setItem("composer-drafts", JSON.stringify(updated));
    onDelete(draftId);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/5 bg-[#050708]/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 className="text-lg font-bold text-white">Drafts</h2>
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

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {drafts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#8B98A5]">No drafts saved</p>
            </div>
          ) : (
            <div className="space-y-3">
              {drafts.map((draft) => {
                const firstBlock = draft.blocks[0];
                const preview = firstBlock?.text || "Empty draft";
                const isThread = draft.blocks.length > 1;

                return (
                  <div
                    key={draft.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="flex-1 text-sm text-[#E7E9EA] line-clamp-2">{preview}</p>
                      {isThread && (
                        <span className="rounded-full bg-[#1D9BF0]/20 px-2 py-0.5 text-xs font-semibold text-[#1D9BF0]">
                          Thread ({draft.blocks.length})
                        </span>
                      )}
                    </div>
                    <div className="mb-3 text-xs text-[#8B98A5]">
                      {new Date(draft.updatedAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onOpen(draft);
                          onClose();
                        }}
                        className="rounded-full bg-[#1D9BF0] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1A8CD8]"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => handleDelete(draft.id)}
                        className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-[#EF454A] transition-colors hover:bg-[#EF454A]/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

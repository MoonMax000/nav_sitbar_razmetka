import { FC, useEffect, useMemo, useRef, useState, useCallback, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { TweetBlock } from "./TweetBlock";
import { MediaEditor } from "./MediaEditor";
import { EmojiPicker } from "./EmojiPicker";
import { DraftsList } from "./DraftsList";
import { CodeBlockModal } from "./CodeBlockModal";
import {
  MediaItem,
  TweetBlockPayload,
  ReplyPolicy,
  ComposerDraft,
  CHAR_LIMIT,
  MAX_PHOTOS,
  MAX_THREAD_BLOCKS,
  createDefaultTransform,
} from "./types";
import { Video, BarChart3, Image as ImageIcon, CalendarClock, MapPin, Smile } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: (blocks?: BlockState[]) => void;
  initialBlocks?: BlockState[];
  initialReplySetting?: ReplyPolicy;
  initialSentiment?: "bullish" | "bearish" | null;
  onBlocksChange?: (blocks: BlockState[]) => void;
}

interface CodeBlock {
  id: string;
  code: string;
  language: string;
}

interface BlockState {
  id: string;
  text: string;
  media: MediaItem[];
  codeBlocks: CodeBlock[];
}

const replyOptions: { id: ReplyPolicy; label: string; description: string }[] = [
  { id: "everyone", label: "Everyone", description: "Anyone mentioned can always reply." },
  { id: "following", label: "Accounts you follow", description: "Only people you follow can reply." },
  { id: "verified", label: "Verified accounts", description: "Only verified users can reply." },
  { id: "mentioned", label: "Only accounts you mention", description: "Only people you mention can reply." },
];

const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose, initialBlocks, initialReplySetting, initialSentiment, onBlocksChange }) => {
  const [blocks, setBlocks] = useState<BlockState[]>(initialBlocks ?? [{ id: "1", text: "", media: [], codeBlocks: [] }]);
  const [replySetting, setReplySetting] = useState<ReplyPolicy>(initialReplySetting ?? "everyone");
  const [isReplyMenuOpen, setIsReplyMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | null>(initialSentiment ?? "bullish");
  const [mounted, setMounted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const replyMenuRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);
  const toolbarFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    // Only initialize/reset when modal open state changes to avoid update loops
    if (!isOpen) {
      setTimeout(() => {
        setBlocks(initialBlocks ?? [{ id: "1", text: "", media: [], codeBlocks: [] }]);
        setReplySetting(initialReplySetting ?? "everyone");
        setSentiment(initialSentiment ?? "bullish");
        setIsEmojiPickerOpen(false);
        setIsReplyMenuOpen(false);
        setIsCodeBlockOpen(false);
      }, 200);
    } else {
      // when opening, initialize from incoming props
      setBlocks(initialBlocks ?? [{ id: "1", text: "", media: [], codeBlocks: [] }]);
      setReplySetting(initialReplySetting ?? "everyone");
      setSentiment(initialSentiment ?? "bullish");
    }
  }, [isOpen]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isReplyMenuOpen && replyMenuRef.current && !replyMenuRef.current.contains(e.target as Node)) {
        setIsReplyMenuOpen(false);
      }
      if (isEmojiPickerOpen && emojiMenuRef.current && !emojiMenuRef.current.contains(e.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isReplyMenuOpen, isEmojiPickerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handlePost();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, blocks, replySetting, sentiment]);

  useEffect(() => {
    if (!isOpen) return;

    const autoSave = setInterval(() => {
      const hasContent = blocks.some((b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0);
      if (hasContent) {
        saveDraft();
      }
    }, 10000);

    return () => clearInterval(autoSave);
  }, [isOpen, blocks, replySetting]);

  const totalChars = useMemo(() => {
    return blocks.reduce((sum, block) => sum + block.text.length, 0);
  }, [blocks]);

  const charRatio = useMemo(() => {
    const avgLimit = CHAR_LIMIT * blocks.length;
    return Math.min(totalChars / avgLimit, 1);
  }, [totalChars, blocks.length]);

  const remainingChars = useMemo(() => {
    const avgLimit = CHAR_LIMIT * blocks.length;
    return avgLimit - totalChars;
  }, [totalChars, blocks.length]);

  const isNearLimit = remainingChars <= 20;
  const isOverLimit = remainingChars < 0;

  const canPost = useMemo(() => {
    const hasContent = blocks.some((b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0);
    const noOverflow = blocks.every((b) => b.text.length <= CHAR_LIMIT);
    return hasContent && noOverflow && !isPosting;
  }, [blocks, isPosting]);

  const hasTypedText = useMemo(() => blocks.some((b) => b.text.trim().length > 0), [blocks]);

  // propagate blocks changes to parent if requested (live sync)
  const onBlocksChangeRef = useRef<typeof onBlocksChange | null>(null);

  useEffect(() => {
    onBlocksChangeRef.current = onBlocksChange ?? null;
  }, [onBlocksChange]);

  useEffect(() => {
    if (!isOpen) return; // only sync while modal is open

    let mounted = true;
    const handle = setTimeout(() => {
      if (!mounted) return;
      if (onBlocksChangeRef.current) {
        try {
          onBlocksChangeRef.current(blocks);
        } catch (e) {
          console.error("onBlocksChange handler failed:", e);
        }
      }
    }, 120);

    return () => {
      mounted = false;
      clearTimeout(handle);
    };
    // intentionally only watch blocks and isOpen to debounce updates
  }, [blocks, isOpen]);

  const isThread = blocks.length > 1;

  const handleBlockTextChange = useCallback((blockId: string, text: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, text } : b)));
  }, []);

  const handleMediaAdd = useCallback((blockId: string, files: FileList) => {
    const newMedia: MediaItem[] = [];

    Array.from(files).forEach((file) => {
      const type = file.type.startsWith("video/") ? "video" : "image";
      const id = `${Date.now()}-${Math.random()}`;
      const url = URL.createObjectURL(file);

      newMedia.push({
        id,
        url,
        type,
        file,
        transform: createDefaultTransform(),
        alt: undefined,
        sensitiveTags: [],
      });
    });

    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          const combined = [...b.media, ...newMedia].slice(0, MAX_PHOTOS);
          return { ...b, media: combined };
        }
        return b;
      })
    );
  }, []);

  const handleMediaRemove = useCallback((blockId: string, mediaId: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          return { ...b, media: b.media.filter((m) => m.id !== mediaId) };
        }
        return b;
      })
    );
  }, []);

  const handleMediaEdit = useCallback((blockId: string, media: MediaItem) => {
    setActiveBlockId(blockId);
    setEditingMedia(media);
  }, []);

  const handleMediaSave = useCallback((updatedMedia: MediaItem) => {
    if (!activeBlockId) return;

    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === activeBlockId) {
          return {
            ...b,
            media: b.media.map((m) => (m.id === updatedMedia.id ? updatedMedia : m)),
          };
        }
        return b;
      })
    );

    setEditingMedia(null);
    setActiveBlockId(null);
  }, [activeBlockId]);

  const handleMediaReorder = useCallback((blockId: string, fromIndex: number, toIndex: number) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          const newMedia = [...b.media];
          const [moved] = newMedia.splice(fromIndex, 1);
          newMedia.splice(toIndex, 0, moved);
          return { ...b, media: newMedia };
        }
        return b;
      })
    );
  }, []);

  const ensureActiveBlock = useCallback((): string | null => {
    if (activeBlockId) {
      return activeBlockId;
    }
    const fallback = blocks[0]?.id ?? null;
    if (fallback) {
      setActiveBlockId(fallback);
    }
    return fallback;
  }, [activeBlockId, blocks]);

  const openToolbarFilePicker = useCallback(() => {
    const targetId = ensureActiveBlock();
    if (!targetId) return;
    toolbarFileInputRef.current?.click();
  }, [ensureActiveBlock]);

  const handleToolbarMediaPick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }

      const targetId = ensureActiveBlock();
      if (!targetId) {
        event.target.value = "";
        return;
      }

      handleMediaAdd(targetId, files);
      event.target.value = "";
    },
    [ensureActiveBlock, handleMediaAdd],
  );

  const handleToolbarEmojiToggle = useCallback(() => {
    const targetId = ensureActiveBlock();
    if (!targetId) return;
    setIsEmojiPickerOpen((prev) => !prev);
  }, [ensureActiveBlock]);

  const handleCodeBlockInsert = useCallback((code: string, language: string) => {
    if (!activeBlockId) return;

    const codeBlock: CodeBlock = {
      id: `code-${Date.now()}`,
      code,
      language,
    };

    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === activeBlockId) {
          return { ...b, codeBlocks: [...b.codeBlocks, codeBlock] };
        }
        return b;
      })
    );

    setIsCodeBlockOpen(false);
  }, [activeBlockId]);

  const handleCodeBlockRemove = useCallback((blockId: string, codeBlockId: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          return { ...b, codeBlocks: b.codeBlocks.filter((cb) => cb.id !== codeBlockId) };
        }
        return b;
      })
    );
  }, []);

  const handleBlockDelete = useCallback((blockId: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
  }, []);

  const handleAddBlock = useCallback(() => {
    if (blocks.length >= MAX_THREAD_BLOCKS) return;
    const newId = `${Date.now()}`;
    setBlocks((prev) => [...prev, { id: newId, text: "", media: [], codeBlocks: [] }]);
  }, [blocks.length]);

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      if (!activeBlockId) return;

      setBlocks((prev) =>
        prev.map((b) => {
          if (b.id === activeBlockId && b.text.length + emoji.length <= CHAR_LIMIT) {
            return { ...b, text: b.text + emoji };
          }
          return b;
        })
      );

      setIsEmojiPickerOpen(false);
    },
    [activeBlockId]
  );

  const handleEmojiClick = useCallback((blockId: string) => {
    setActiveBlockId(blockId);
    setIsEmojiPickerOpen((prev) => !prev);
  }, []);

  const handleCodeBlockClick = useCallback((blockId: string) => {
    setActiveBlockId(blockId);
    setIsCodeBlockOpen(true);
  }, []);

  const saveDraft = useCallback(() => {
    const draft: ComposerDraft = {
      id: `draft-${Date.now()}`,
      blocks: blocks.map((b) => ({
        id: b.id,
        text: b.text,
        mediaIds: b.media.map((m) => m.id),
        media: b.media.map((m) => ({
          id: m.id,
          transform: m.transform,
          alt: m.alt,
          sensitiveTags: m.sensitiveTags,
        })),
        codeBlocks: b.codeBlocks,
      })),
      replyPolicy: replySetting,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = localStorage.getItem("composer-drafts");
    const drafts: ComposerDraft[] = saved ? JSON.parse(saved) : [];
    drafts.unshift(draft);
    localStorage.setItem("composer-drafts", JSON.stringify(drafts.slice(0, 10)));
  }, [blocks, replySetting]);

  const handleOpenDraft = useCallback((draft: ComposerDraft) => {
    const hasMedia = draft.blocks.some((b) => b.mediaIds && b.mediaIds.length > 0);

    if (hasMedia) {
      const confirmed = window.confirm(
        "This draft contains media that cannot be restored. The text and code blocks will be restored, but you'll need to re-add any media. Continue?"
      );
      if (!confirmed) return;
    }

    setBlocks(
      draft.blocks.map((b) => ({
        id: b.id,
        text: b.text,
        media: [],
        codeBlocks: b.codeBlocks || [],
      }))
    );
    setReplySetting(draft.replyPolicy);
    setIsDraftsOpen(false);
  }, []);

  const handlePost = useCallback(async () => {
    if (!canPost) return;

    setIsPosting(true);

    try {
      const payload = {
        blocks: blocks.map((b) => ({
          text: b.text,
          mediaIds: b.media.map((m) => m.id),
          media: b.media.map((m) => ({
            id: m.id,
            transform: m.transform,
            alt: m.alt,
            sensitiveTags: m.sensitiveTags,
          })),
          codeBlocks: b.codeBlocks,
        })),
        replyPolicy: replySetting,
        sentiment,
      };

      console.log("Posting:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleClose();
    } catch (error) {
      console.error("Post failed:", error);
    } finally {
      setIsPosting(false);
    }
  }, [blocks, replySetting, sentiment, canPost]);

  const handleClose = useCallback(() => {
    const hasContent = blocks.some((b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0);

    if (hasContent) {
      const shouldSave = window.confirm(
        "You have unsaved changes. Would you like to save this as a draft?\n\nNote: Media files will not be saved in drafts."
      );
      if (shouldSave) {
        saveDraft();
      }
    }

    onClose(blocks);
  }, [blocks, onClose, saveDraft]);

  const gradientStroke = useMemo(() => {
    const circumference = 88;
    return `${charRatio * circumference} ${circumference}`;
  }, [charRatio]);

  if (!mounted || !isOpen) return null;

  const selectedReply = replyOptions.find((opt) => opt.id === replySetting) || replyOptions[0];

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[720px] max-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] backdrop-blur-[100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#181B22] px-5 py-4">
          <button
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#E7E9EA] transition-colors hover:bg-white/10"
            disabled={isPosting}
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

          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#808283]">Draft</span>

          <button
            onClick={() => setIsDraftsOpen(true)}
            className="text-sm font-semibold text-[#A06AFF] transition-colors hover:text-[#E3D8FF]"
            disabled={isPosting}
          >
            Drafts
          </button>
        </div>

        <div className="max-h-[calc(100vh-340px)] overflow-y-auto px-5 py-5 space-y-6 scrollbar">
          {blocks.map((block, index) => (
            <TweetBlock
              key={block.id}
              id={block.id}
              text={block.text}
              media={block.media}
              codeBlocks={block.codeBlocks}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              canDelete={blocks.length > 1}
              onChange={(text) => handleBlockTextChange(block.id, text)}
              onMediaAdd={(files) => handleMediaAdd(block.id, files)}
              onMediaRemove={(mediaId) => handleMediaRemove(block.id, mediaId)}
              onMediaEdit={(media) => handleMediaEdit(block.id, media)}
              onMediaReorder={(from, to) => handleMediaReorder(block.id, from, to)}
              onDelete={() => handleBlockDelete(block.id)}
              onEmojiClick={() => handleEmojiClick(block.id)}
              onCodeBlockClick={() => handleCodeBlockClick(block.id)}
              onCodeBlockRemove={(codeBlockId) => handleCodeBlockRemove(block.id, codeBlockId)}
            />
          ))}

       </div>

        <div className="relative border-t border-[#181B22] px-5 py-3">
          <button
            onClick={() => setIsReplyMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-[#A06AFF]/10 px-3 py-1.5 text-sm font-semibold text-[#A06AFF] transition-colors hover:bg-[#A06AFF]/20"
            disabled={isPosting}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5C21 7.08172 17.4183 3.5 13 3.5C8.58172 3.5 5 7.08172 5 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 8.5C18 5.73858 15.7614 3.5 13 3.5C10.2386 3.5 8 5.73858 8 8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M12 13L9 16H11V20H13V16H15L12 13Z" fill="currentColor" />
            </svg>
            {selectedReply.label}
          </button>

          {isReplyMenuOpen && (
            <div
              ref={replyMenuRef}
              className="absolute left-5 bottom-full z-[2100] mb-3 w-72 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-3 shadow-2xl backdrop-blur-[100px]"
            >
              <h3 className="mb-2 text-sm font-bold text-white">Who can reply?</h3>
              <p className="mb-3 text-xs text-[#808283]">
                Choose who can reply to this post.
              </p>
              <div className="space-y-2">
                {replyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setReplySetting(opt.id);
                      setIsReplyMenuOpen(false);
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition-colors ${
                      opt.id === replySetting
                        ? "border-[#A06AFF] bg-[#A06AFF]/10 text-white"
                        : "border-transparent bg-white/5 text-[#E7E9EA] hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm font-semibold">{opt.label}</div>
                    <div className="text-xs text-[#808283]">{opt.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#181B22] px-5 py-4">
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="#2F3336" strokeWidth="4" />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={isOverLimit ? "#EF454A" : isNearLimit ? "#FFD400" : "#A06AFF"}
                strokeWidth="4"
                strokeDasharray={gradientStroke}
                strokeLinecap="round"
                className="transition-all"
              />
            </svg>
            {(isNearLimit || isOverLimit) && (
              <span className={`text-sm font-semibold ${isOverLimit ? "text-[#EF454A]" : "text-[#FFD400]"}`}>
                {remainingChars}
              </span>
            )}
          </div>

          {hasTypedText && (
            <>
              <div className="h-8 w-px bg-white/15" />
              <button
                type="button"
                onClick={handleAddBlock}
                aria-label="Add another post"
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 text-[#1D9BF0] transition-colors hover:bg-white/15 hover:border-white/30"
                disabled={blocks.length >= MAX_THREAD_BLOCKS}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M5 12h14" stroke="#1D9BF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSentiment("bullish")}
            className={`rounded inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold transition-colors ${
              sentiment === "bullish"
                ? "bg-[#1C3430] text-white"
                : "bg-white/5 text-white/40 hover:text-white"
            }`}
            disabled={isPosting}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M13.3333 8.66659V5.33325H10"
                stroke="#2EBD85"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 5.33325L10.0001 8.66659C9.41168 9.25499 9.11755 9.54912 8.75648 9.58165C8.69675 9.58705 8.63675 9.58705 8.57702 9.58165C8.21595 9.54912 7.92181 9.25499 7.33341 8.66659C6.74501 8.07819 6.45085 7.78405 6.08979 7.75152C6.03011 7.74612 5.97005 7.74612 5.91037 7.75152C5.54931 7.78405 5.25512 8.07819 4.66675 8.66659L2.66675 10.6666"
                stroke="#2EBD85"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Bullish
          </button>

          <button
            onClick={() => setSentiment("bearish")}
            className={`rounded inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold transition-colors ${
              sentiment === "bearish"
                ? "bg-[#3A2127] text-white"
                : "bg-white/5 text-white/40 hover:text-white"
            }`}
            disabled={isPosting}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M13.3333 7.3335V10.6668H10"
                stroke="#EF454A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 10.6668L10.0001 7.3335C9.41168 6.7451 9.11755 6.45093 8.75648 6.41841C8.69675 6.41303 8.63675 6.41303 8.57702 6.41841C8.21595 6.45093 7.92181 6.7451 7.33341 7.3335C6.74501 7.9219 6.45085 8.21603 6.08979 8.24856C6.03011 8.25396 5.97005 8.25396 5.91037 8.24856C5.54931 8.21603 5.25512 7.9219 4.66675 7.3335L2.66675 5.3335"
                stroke="#EF454A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Bearish
          </button>

          <button
            onClick={handlePost}
            disabled={!canPost}
            className={cn(
              "inline-flex h-10 min-w-[100px] items-center justify-center rounded-full px-6 text-sm font-semibold transition-all",
              canPost
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
                : "cursor-not-allowed bg-[#A06AFF]/20 text-white/40",
            )}
          >
            {isPosting ? "Posting..." : "Post all"}
          </button>
        </div>
        </div>

        {isEmojiPickerOpen && (
          <div
            ref={emojiMenuRef}
            className="absolute bottom-24 left-12 z-[2100] h-96 w-96 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-4 shadow-2xl backdrop-blur-[100px]"
          >
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </div>

      <MediaEditor
        media={editingMedia}
        onSave={handleMediaSave}
        onClose={() => {
          setEditingMedia(null);
          setActiveBlockId(null);
        }}
      />

      <CodeBlockModal
        isOpen={isCodeBlockOpen}
        onClose={() => setIsCodeBlockOpen(false)}
        onInsert={handleCodeBlockInsert}
      />

      <DraftsList
        isOpen={isDraftsOpen}
        onClose={() => setIsDraftsOpen(false)}
        onOpen={handleOpenDraft}
        onDelete={() => {}}
      />
    </div>,
    document.body
  );
};

export default CreatePostModal;

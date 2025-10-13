import {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { TweetBlock } from "./TweetBlock";
import { MediaEditor } from "./MediaEditor";
import { EmojiPicker } from "./EmojiPicker";
import { DraftsList } from "./DraftsList";
import { CodeBlockModal } from "./CodeBlockModal";
import {
  MediaItem,
  ReplyPolicy,
  ComposerDraft,
  CHAR_LIMIT,
  MAX_PHOTOS,
  MAX_THREAD_BLOCKS,
  MAX_DRAFTS,
  createDefaultTransform,
  REPLY_SUMMARY_TEXT,
} from "./types";

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

const replyOptions: { id: ReplyPolicy; label: string; description: string }[] =
  [
    {
      id: "everyone",
      label: "Everyone",
      description: "Anyone mentioned can always reply.",
    },
    {
      id: "following",
      label: "Accounts you follow",
      description: "Only people you follow can reply.",
    },
    {
      id: "verified",
      label: "Verified accounts",
      description: "Only verified users can reply.",
    },
    {
      id: "mentioned",
      label: "Only accounts you mention",
      description: "Only people you mention can reply.",
    },
  ];

const CreatePostModal: FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  initialBlocks,
  initialReplySetting,
  initialSentiment,
  onBlocksChange,
}) => {
  const [blocks, setBlocks] = useState<BlockState[]>(
    initialBlocks ?? [{ id: "1", text: "", media: [], codeBlocks: [] }],
  );
  const [replySetting, setReplySetting] = useState<ReplyPolicy>(
    initialReplySetting ?? "everyone",
  );
  const [isReplyMenuOpen, setIsReplyMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | null>(
    initialSentiment ?? "bullish",
  );
  const [mounted, setMounted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [replyMenuPosition, setReplyMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [emojiMenuPosition, setEmojiMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const replyMenuRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);
  const toolbarFileInputRef = useRef<HTMLInputElement>(null);
  const replyButtonRef = useRef<HTMLButtonElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

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
        setBlocks(
          initialBlocks ?? [{ id: "1", text: "", media: [], codeBlocks: [] }],
        );
        setReplySetting(initialReplySetting ?? "everyone");
        setSentiment(initialSentiment ?? "bullish");
        setIsEmojiPickerOpen(false);
        setIsReplyMenuOpen(false);
        setIsCodeBlockOpen(false);
      }, 200);
    } else {
      // when opening, initialize from incoming props
      const initialBlocksData = initialBlocks ?? [
        { id: "1", text: "", media: [], codeBlocks: [] },
      ];
      setBlocks(initialBlocksData);
      setReplySetting(initialReplySetting ?? "everyone");
      setSentiment(initialSentiment ?? "bullish");
      // Set first block as active
      if (initialBlocksData.length > 0) {
        setActiveBlockId(initialBlocksData[0].id);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isReplyMenuOpen &&
        replyMenuRef.current &&
        !replyMenuRef.current.contains(e.target as Node)
      ) {
        setIsReplyMenuOpen(false);
      }
      if (
        isEmojiPickerOpen &&
        emojiMenuRef.current &&
        !emojiMenuRef.current.contains(e.target as Node)
      ) {
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
      const hasContent = blocks.some(
        (b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0,
      );
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
    const hasContent = blocks.some(
      (b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0,
    );
    const noOverflow = blocks.every((b) => b.text.length <= CHAR_LIMIT);
    return hasContent && noOverflow && !isPosting;
  }, [blocks, isPosting]);

  const hasTypedText = useMemo(
    () => blocks.some((b) => b.text.trim().length > 0),
    [blocks],
  );

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
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, text } : b)),
    );
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
      }),
    );
  }, []);

  const handleMediaRemove = useCallback((blockId: string, mediaId: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          return { ...b, media: b.media.filter((m) => m.id !== mediaId) };
        }
        return b;
      }),
    );
  }, []);

  const handleMediaEdit = useCallback((blockId: string, media: MediaItem) => {
    setActiveBlockId(blockId);
    setEditingMedia(media);
  }, []);

  const handleMediaSave = useCallback(
    (updatedMedia: MediaItem) => {
      if (!activeBlockId) return;

      setBlocks((prev) =>
        prev.map((b) => {
          if (b.id === activeBlockId) {
            return {
              ...b,
              media: b.media.map((m) =>
                m.id === updatedMedia.id ? updatedMedia : m,
              ),
            };
          }
          return b;
        }),
      );

      setEditingMedia(null);
      setActiveBlockId(null);
    },
    [activeBlockId],
  );

  const handleMediaReorder = useCallback(
    (blockId: string, fromIndex: number, toIndex: number) => {
      setBlocks((prev) =>
        prev.map((b) => {
          if (b.id === blockId) {
            const newMedia = [...b.media];
            const [moved] = newMedia.splice(fromIndex, 1);
            newMedia.splice(toIndex, 0, moved);
            return { ...b, media: newMedia };
          }
          return b;
        }),
      );
    },
    [],
  );

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

  const handleCodeBlockInsert = useCallback(
    (code: string, language: string) => {
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
        }),
      );

      setIsCodeBlockOpen(false);
    },
    [activeBlockId],
  );

  const handleCodeBlockRemove = useCallback(
    (blockId: string, codeBlockId: string) => {
      setBlocks((prev) =>
        prev.map((b) => {
          if (b.id === blockId) {
            return {
              ...b,
              codeBlocks: b.codeBlocks.filter((cb) => cb.id !== codeBlockId),
            };
          }
          return b;
        }),
      );
    },
    [],
  );

  const handleBlockDelete = useCallback((blockId: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
  }, []);

  const handleAddBlock = useCallback(() => {
    if (blocks.length >= MAX_THREAD_BLOCKS) return;
    const newId = `${Date.now()}`;
    setBlocks((prev) => [
      ...prev,
      { id: newId, text: "", media: [], codeBlocks: [] },
    ]);
    setActiveBlockId(newId);
  }, [blocks.length]);

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      if (!activeBlockId) return;

      setBlocks((prev) =>
        prev.map((b) => {
          if (
            b.id === activeBlockId &&
            b.text.length + emoji.length <= CHAR_LIMIT
          ) {
            return { ...b, text: b.text + emoji };
          }
          return b;
        }),
      );

      setIsEmojiPickerOpen(false);
    },
    [activeBlockId],
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
    localStorage.setItem(
      "composer-drafts",
      JSON.stringify(drafts.slice(0, MAX_DRAFTS)),
    );
  }, [blocks, replySetting]);

  const handleOpenDraft = useCallback((draft: ComposerDraft) => {
    const hasMedia = draft.blocks.some(
      (b) => b.mediaIds && b.mediaIds.length > 0,
    );

    if (hasMedia) {
      const confirmed = window.confirm(
        "This draft contains media that cannot be restored. The text and code blocks will be restored, but you'll need to re-add any media. Continue?",
      );
      if (!confirmed) return;
    }

    setBlocks(
      draft.blocks.map((b) => ({
        id: b.id,
        text: b.text,
        media: [],
        codeBlocks: b.codeBlocks || [],
      })),
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
    const hasContent = blocks.some(
      (b) => b.text.trim() || b.media.length > 0 || b.codeBlocks.length > 0,
    );

    if (hasContent) {
      const shouldSave = window.confirm(
        "You have unsaved changes. Would you like to save this as a draft?\n\nNote: Media files will not be saved in drafts.",
      );
      if (shouldSave) {
        saveDraft();
      }
    }

    onClose(blocks);
  }, [blocks, onClose, saveDraft]);

  const circumference = 88;
  const dashOffset = circumference - charRatio * circumference;
  const canAddBlock = blocks.length < MAX_THREAD_BLOCKS;

  if (!mounted || !isOpen) return null;

  const replySummary = REPLY_SUMMARY_TEXT[replySetting];

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

          <button
            onClick={() => setIsDraftsOpen(true)}
            className="text-sm font-semibold text-[#A06AFF] transition-colors hover:text-[#E3D8FF]"
            disabled={isPosting}
          >
            Drafts
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scrollbar">
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
              isActive={
                activeBlockId === block.id ||
                (activeBlockId === null && index === 0)
              }
              onClick={() => setActiveBlockId(block.id)}
              onChange={(text) => handleBlockTextChange(block.id, text)}
              onMediaAdd={(files) => handleMediaAdd(block.id, files)}
              onMediaRemove={(mediaId) => handleMediaRemove(block.id, mediaId)}
              onMediaEdit={(media) => handleMediaEdit(block.id, media)}
              onMediaReorder={(from, to) =>
                handleMediaReorder(block.id, from, to)
              }
              onDelete={() => handleBlockDelete(block.id)}
              onEmojiClick={() => handleEmojiClick(block.id)}
              onCodeBlockClick={() => handleCodeBlockClick(block.id)}
              onCodeBlockRemove={(codeBlockId) =>
                handleCodeBlockRemove(block.id, codeBlockId)
              }
            />
          ))}
        </div>

        <div className="border-t border-[#181B22] px-5 py-3">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(5, auto) 1fr auto",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#482090]/10"
              title="Видео или GIF"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23 7l-7 5 7 5V7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="1"
                  y="5"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#482090]/10"
              title="Опрос"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12h4v7H3zM10 7h4v12h-4zM17 3h4v16h-4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={openToolbarFilePicker}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#482090]/10 disabled:text-white/30 disabled:hover:bg-transparent"
              title="Доб��вить медиа"
              disabled={blocks.length === 0}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.08301 10C2.08301 6.26809 2.08301 4.40212 3.24237 3.24274C4.40175 2.08337 6.26772 2.08337 9.99967 2.08337C13.7316 2.08337 15.5976 2.08337 16.757 3.24274C17.9163 4.40212 17.9163 6.26809 17.9163 10C17.9163 13.732 17.9163 15.598 16.757 16.7574C15.5976 17.9167 13.7316 17.9167 9.99967 17.9167C6.26772 17.9167 4.40175 17.9167 3.24237 16.7574C2.08301 15.598 2.08301 13.732 2.08301 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M4.16699 17.5C7.81071 13.1458 11.8954 7.40334 17.9149 11.2853"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <input
              ref={toolbarFileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleToolbarMediaPick}
            />
            <button
              type="button"
              onClick={handleToolbarEmojiToggle}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#482090]/10 disabled:text-white/30 disabled:hover:bg-transparent"
              title="Добавить эмодзи"
              disabled={blocks.length === 0}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66699 12.5C7.42709 13.512 8.63724 14.1667 10.0003 14.1667C11.3634 14.1667 12.5736 13.512 13.3337 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.67447 7.5H6.66699M13.3337 7.5H13.3262"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                handleCodeBlockClick(activeBlockId || blocks[0]?.id)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#482090]/10 disabled:text-white/30 disabled:hover:bg-transparent"
              title="Блок кода"
              disabled={blocks.length === 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 7L3 12L8 17M16 7L21 12L16 17M14 3L10 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div></div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setSentiment("bullish")}
                className={`rounded inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold transition-colors ${sentiment === "bullish" ? "bg-[#1C3430] text-white" : "bg-white/5 text-white/40 hover:text-white"}`}
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
                className={`rounded inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold transition-colors ${sentiment === "bearish" ? "bg-[#3A2127] text-white" : "bg-white/5 text-white/40 hover:text-white"}`}
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
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#181B22] px-5 py-4">
          <button
            ref={replyButtonRef}
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setReplyMenuPosition({ top: rect.top - 10, left: rect.left });
              setIsReplyMenuOpen((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold text-[#1D9BF0] transition-colors hover:bg-white/10"
            disabled={isPosting}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 2v1.5M12 20.5V22M4.5 12H2M22 12h-2.5M7.05 4.05l1.06 1.06M15.89 17.95l1.06 1.06M5.56 18.44l1.06-1.06M17.38 6.62l1.06-1.06"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.75 17.5 8 14l-1-3-2.2-1.27"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m17 14-.5-3-1-3 2.5-1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{replySummary}</span>
          </button>

          {isReplyMenuOpen &&
            replyMenuPosition &&
            createPortal(
              <div
                className="fixed z-[2300] w-80 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-2xl backdrop-blur-[100px] p-4"
                style={{
                  top: `${replyMenuPosition.top - 280}px`,
                  left: `${replyMenuPosition.left}px`,
                }}
              >
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Who can reply?
                </h3>
                <div className="space-y-2">
                  {replyOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setReplySetting(opt.id);
                        setIsReplyMenuOpen(false);
                      }}
                      className="flex w-full items-start gap-3 rounded-2xl bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill={replySetting === opt.id ? "#1D9BF0" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        {replySetting === opt.id && (
                          <circle cx="12" cy="12" r="4" fill="#1D9BF0" />
                        )}
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">
                          {opt.label}
                        </div>
                        <div className="text-xs text-[#808283]">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>,
              document.body,
            )}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#2F3336"
                  strokeWidth="4"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke={
                    isOverLimit
                      ? "#EF454A"
                      : isNearLimit
                        ? "#FFD400"
                        : "#A06AFF"
                  }
                  strokeWidth="4"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span
                className={cn(
                  "text-sm font-medium tabular-nums",
                  isOverLimit
                    ? "text-[#EF454A]"
                    : isNearLimit
                      ? "text-[#FFD400]"
                      : "text-[#808283]",
                )}
              >
                {remainingChars < 20 && remainingChars}
              </span>
            </div>

            {canAddBlock && (
              <button
                type="button"
                onClick={handleAddBlock}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#A06AFF] text-[#A06AFF] transition-all hover:bg-[#A06AFF]/10"
                disabled={isPosting}
                title="Add another post"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

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
              {isPosting
                ? "Posting..."
                : blocks.length > 1
                  ? "Post all"
                  : "Post"}
            </button>
          </div>
        </div>

        {isEmojiPickerOpen &&
          createPortal(
            <div
              ref={emojiMenuRef}
              className="fixed bottom-24 left-6 z-[2300] h-96 w-96 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-4 shadow-2xl backdrop-blur-[100px]"
            >
              <EmojiPicker onSelect={handleEmojiSelect} />
            </div>,
            document.body,
          )}
      </div>

      {editingMedia && (
        <MediaEditor
          media={editingMedia}
          onSave={handleMediaSave}
          onClose={() => {
            setEditingMedia(null);
            setActiveBlockId(null);
          }}
        />
      )}

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
    document.body,
  );
};

export default CreatePostModal;

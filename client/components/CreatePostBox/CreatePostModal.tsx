import type { ChangeEvent } from "react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const replyOptions = [
  { id: "everyone", label: "Everyone", description: "Anyone mentioned can always reply." },
  { id: "following", label: "Accounts you follow", description: "Only people you follow can reply." },
  { id: "verified", label: "Verified accounts", description: "Only verified users can reply." },
  { id: "mentioned", label: "Only accounts you mention", description: "Only people you mention can reply." },
];

const emojiGroups: { name: string; emoji: string[] }[] = [
  {
    name: "Smileys & people",
    emoji: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😗",
      "☺️",
      "😚",
      "😙",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🫡",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😶‍🌫️",
      "😏",
      "😒",
      "🙄",
      "😬",
      "😮‍💨",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🤧",
      "🥵",
      "🥶",
      "🥴",
      "😵",
      "🥳",
      "😎",
      "🤓",
      "🧐",
      "😕",
      "🫥",
      "😟",
      "🙁",
      "☹️",
      "😮",
      "😯",
      "😲",
      "🥺",
    ],
  },
];

const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | null>("bullish");
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [replySetting, setReplySetting] = useState(replyOptions[0]);
  const [isReplyMenuOpen, setIsReplyMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replyMenuRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);
  const maxLength = 280;

  const remainingChars = maxLength - text.length;
  const charRatio = Math.min(text.length / maxLength, 1);
  const canPost = text.trim().length > 0 || images.length > 0;
  const isNearLimit = remainingChars <= 20;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, images.length, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setText("");
      setImages([]);
      setSentiment("bullish");
      setIsEmojiPickerOpen(false);
      setIsReplyMenuOpen(false);
      setReplySetting(replyOptions[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isReplyMenuOpen &&
        replyMenuRef.current &&
        !replyMenuRef.current.contains(event.target as Node)
      ) {
        setIsReplyMenuOpen(false);
      }

      if (
        isEmojiPickerOpen &&
        emojiMenuRef.current &&
        !emojiMenuRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isReplyMenuOpen, isEmojiPickerOpen]);

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

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((imagesPayload) => {
      setImages((previous) => [...previous, ...imagesPayload]);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((previous) => previous.filter((_, idx) => idx !== index));
  };

  const [emojiQuery, setEmojiQuery] = useState("");

  const filteredEmojiGroups = useMemo(() => {
    if (!emojiQuery.trim()) return emojiGroups;
    const query = emojiQuery.toLowerCase();
    return emojiGroups
      .map((group) => ({
        ...group,
        emoji: group.emoji.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((group) => group.emoji.length > 0);
  }, [emojiQuery]);

  const handleEmojiSelect = (emoji: string) => {
    setText((previous) => {
      if (previous.length + emoji.length > maxLength) {
        return previous;
      }
      return `${previous}${emoji}`;
    });
    setIsEmojiPickerOpen(false);
    textareaRef.current?.focus();
  };

  const handlePost = () => {
    if (!canPost) return;

    console.log("Post drafted", {
      text,
      sentiment,
      images,
      reply: replySetting.id,
    });

    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const gradientStroke = useMemo(() => {
    const circumference = 88;
    return `${charRatio * circumference} ${circumference}`;
  }, [charRatio]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={handleClose}>
      <div
        className="relative w-full max-w-[720px] max-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-white/5 bg-[#050708]/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#E7E9EA] transition-colors hover:bg-[#1D9BF0]/10"
            aria-label="Close composer"
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

          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B98A5]">
            Draft
          </span>

          <button className="text-sm font-semibold text-[#1D9BF0] hover:underline">
            Drafts
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-5 pb-5">
          <div className="flex items-start gap-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88"
              alt="Current user avatar"
              className="h-11 w-11 rounded-full"
            />

            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Что происходит?"
                className="w-full resize-none bg-transparent text-lg text-[#E7E9EA] placeholder:text-[#71767B] outline-none"
                autoFocus
              />

              <div className="mt-3 space-y-3">
                {images.length > 0 && (
                  <div className={`grid gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                    {images.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F12]"
                      >
                        <img src={image} alt={`Attachment ${index + 1}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Remove attachment"
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
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-[#1D9BF0]">
                  <button className="font-semibold hover:underline" type="button">
                    Tag people
                  </button>
                  <span className="h-1 w-1 rounded-full bg-[#1D9BF0]/60" />
                  <button className="font-semibold hover:underline" type="button">
                    Add description
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply permissions */}
        <div className="flex items-center gap-2 border-y border-white/5 px-5 py-3 text-sm text-[#1D9BF0]">
          <button
            type="button"
            onClick={() => setIsReplyMenuOpen((previous) => !previous)}
            className="relative inline-flex items-center gap-2 rounded-full bg-[#1D9BF0]/10 px-3 py-1 font-semibold text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/20"
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
              <path
                d="M12 13L9 16H11V20H13V16H15L12 13Z"
                fill="currentColor"
              />
            </svg>
            {replySetting.label}
          </button>

          <span className="text-xs text-[#8B98A5]">Choose who can reply</span>

          {isReplyMenuOpen && (
            <div
              ref={replyMenuRef}
              className="absolute left-0 top-full z-[2100] mt-3 w-72 rounded-2xl border border-white/15 bg-[#0B0F12]/95 p-3 shadow-2xl backdrop-blur"
            >
              <h3 className="mb-2 text-sm font-bold text-white">Who can reply?</h3>
              <p className="mb-3 text-xs text-[#8B98A5]">
                Choose who can reply to this post. Anyone mentioned can always reply.
              </p>
              <div className="space-y-2">
                {replyOptions.map((option) => {
                  const isActive = option.id === replySetting.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setReplySetting(option);
                        setIsReplyMenuOpen(false);
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-left transition-colors ${
                        isActive
                          ? "border-[#1D9BF0] bg-[#1D9BF0]/10 text-white"
                          : "border-transparent bg-white/5 text-[#E7E9EA] hover:bg-white/10"
                      }`}
                    >
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div className="text-xs text-[#8B98A5]">{option.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add photos"
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

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add GIF"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.55523 16.25H6.66634V17.5C6.66634 17.9603 6.29324 18.3334 5.83301 18.3334H4.16634C3.70611 18.3334 3.33301 17.9603 3.33301 17.5V14.1667C3.33301 13.7065 3.70611 13.3334 4.16634 13.3334H5.83301C6.29324 13.3334 6.66634 13.7065 6.66634 14.1667M9.16634 13.3334H10.4163M10.4163 13.3334H11.6663M10.4163 13.3334V18.3334M10.4163 18.3334H9.16634M10.4163 18.3334H11.6663M16.6663 13.3334H14.9997C14.5394 13.3334 14.1663 13.7065 14.1663 14.1667V15.8334M14.1663 15.8334V18.3334M14.1663 15.8334H16.2497"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6663 10.8333V8.88071C16.6663 8.19942 16.6663 7.85879 16.5395 7.55251C16.4126 7.24623 16.1718 7.00537 15.69 6.52365L11.7429 2.57653C11.3272 2.16079 11.1193 1.95292 10.8618 1.82975C10.8082 1.80413 10.7533 1.78139 10.6973 1.76163C10.4281 1.66663 10.1342 1.66663 9.54617 1.66663C6.84202 1.66663 5.48993 1.66663 4.57412 2.40502C4.3891 2.55419 4.22057 2.72272 4.0714 2.90773C3.33301 3.82355 3.33301 5.17564 3.33301 7.87983V10.8333M10.833 2.08329V2.49996C10.833 4.85698 10.833 6.03549 11.5653 6.76773C12.2975 7.49996 13.476 7.49996 15.833 7.49996H16.2497"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsEmojiPickerOpen((previous) => !previous)}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isEmojiPickerOpen
                    ? "bg-[#1D9BF0]/20 text-[#1D9BF0]"
                    : "text-[#1D9BF0] hover:bg-[#1D9BF0]/10"
                }`}
                title="Add emoji"
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
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Schedule"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.83301 2.5V5M14.1663 2.5V5M2.5 7.5H17.5M4.16634 4.16667H15.833C16.7535 4.16667 17.5 4.9131 17.5 5.83367V15.8337C17.5 16.7542 16.7535 17.5007 15.833 17.5007H4.16634C3.24577 17.5007 2.49934 16.7542 2.49934 15.8337V5.83367C2.49934 4.9131 3.24577 4.16667 4.16634 4.16667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.334 10.8333H10.834M10.834 10.8333H8.33398M10.834 10.8333V13.3333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Location"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 5.83317C8.39169 5.83317 7.08335 7.1415 7.08335 8.74984C7.08335 10.3582 8.39169 11.6665 10 11.6665C11.6084 11.6665 12.9167 10.3582 12.9167 8.74984C12.9167 7.1415 11.6084 5.83317 10 5.83317ZM10 9.99984C9.31085 9.99984 8.75002 9.439 8.75002 8.74984C8.75002 8.06067 9.31085 7.49984 10 7.49984C10.6892 7.49984 11.25 8.06067 11.25 8.74984C11.25 9.439 10.6892 9.99984 10 9.99984Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 1.6665C6.09419 1.6665 2.91669 4.844 2.91669 8.74984C2.91669 13.7223 9.26752 18.0132 9.53752 18.1932L10 18.5015L10.4625 18.1932C10.7325 18.0132 17.0834 13.7223 17.0834 8.74984C17.0834 4.844 13.9059 1.6665 10 1.6665ZM10 16.4748C8.61252 15.4407 4.58335 12.1448 4.58335 8.74984C4.58335 5.76317 7.01335 3.33317 10 3.33317C12.9867 3.33317 15.4167 5.76317 15.4167 8.74984C15.4167 12.144 11.3875 15.4398 10 16.4748Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {isEmojiPickerOpen && (
                <div
                  ref={emojiMenuRef}
                  className="absolute bottom-[160px] left-12 z-[2100] h-80 w-80 rounded-3xl border border-white/15 bg-[#0B0F12]/95 p-4 shadow-2xl backdrop-blur"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Emoji</h3>
                    <input
                      type="text"
                      placeholder="Search emojis"
                      className="h-9 w-40 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-[#E7E9EA] placeholder:text-[#768089] focus:outline-none"
                      readOnly
                    />
                  </div>
                  <div className="space-y-3 overflow-y-auto pr-1 text-lg">
                    {emojiGroups.map((group) => (
                      <div key={group.name} className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wide text-[#768089]">
                          {group.name}
                        </div>
                        <div className="grid grid-cols-8 gap-2 text-center">
                          {group.emoji.map((item) => (
                            <button
                              key={item}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xl hover:bg-white/10"
                              onClick={() => handleEmojiSelect(item)}
                              type="button"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="14" fill="none" stroke="#2F3336" strokeWidth="4" />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke={isNearLimit ? "#EF454A" : "#1D9BF0"}
                    strokeWidth="4"
                    strokeDasharray={gradientStroke}
                    strokeLinecap="round"
                    className="transition-all"
                  />
                </svg>
                {isNearLimit && (
                  <span className="text-sm font-semibold text-[#EF454A]">{remainingChars}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSentiment("bullish")}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  sentiment === "bullish"
                    ? "bg-[#2EBD85] text-black"
                    : "bg-white/5 text-[#2EBD85] hover:bg-white/10"
                }`}
              >
                Bullish
              </button>

              <button
                type="button"
                onClick={() => setSentiment("bearish")}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  sentiment === "bearish"
                    ? "bg-[#EF454A] text-white"
                    : "bg-white/5 text-[#EF454A] hover:bg-white/10"
                }`}
              >
                Bearish
              </button>

              <button
                type="button"
                onClick={handlePost}
                disabled={!canPost}
                className={`inline-flex h-10 min-w-[86px] items-center justify-center rounded-full px-5 text-sm font-semibold transition-all ${
                  canPost
                    ? "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]"
                    : "cursor-not-allowed bg-[#1D9BF0]/40 text-white/60"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CreatePostModal;

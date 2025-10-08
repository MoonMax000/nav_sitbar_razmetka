import { FC, useRef, useEffect, ChangeEvent } from "react";
import { MediaItem, CHAR_LIMIT } from "./types";
import { MediaGrid } from "./MediaGrid";

interface CodeBlock {
  id: string;
  code: string;
  language: string;
}

interface TweetBlockProps {
  id: string;
  text: string;
  media: MediaItem[];
  codeBlocks?: CodeBlock[];
  isFirst: boolean;
  isLast: boolean;
  canDelete: boolean;
  onChange: (text: string) => void;
  onMediaAdd: (files: FileList) => void;
  onMediaRemove: (mediaId: string) => void;
  onMediaEdit: (media: MediaItem) => void;
  onMediaReorder: (fromIndex: number, toIndex: number) => void;
  onDelete: () => void;
  onEmojiClick: () => void;
  onCodeBlockClick: () => void;
  onCodeBlockRemove?: (codeBlockId: string) => void;
  readOnly?: boolean;
}

export const TweetBlock: FC<TweetBlockProps> = ({
  id,
  text,
  media,
  codeBlocks = [],
  isFirst,
  isLast,
  canDelete,
  onChange,
  onMediaAdd,
  onMediaRemove,
  onMediaEdit,
  onMediaReorder,
  onDelete,
  onEmojiClick,
  onCodeBlockClick,
  onCodeBlockRemove,
  readOnly = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const value = event.target.value;
    if (value.length <= CHAR_LIMIT) {
      onChange(value);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    if (event.target.files) {
      onMediaAdd(event.target.files);
    }
  };

  const handleEmojiClick = () => {
    if (readOnly) return;
    onEmojiClick();
  };

  const handleCodeBlockClick = () => {
    if (readOnly) return;
    onCodeBlockClick();
  };

  const handleDelete = () => {
    if (readOnly) return;
    onDelete();
  };

  const handleMediaEdit = (item: MediaItem) => {
    if (readOnly) return;
    onMediaEdit(item);
  };

  const handleMediaRemove = (mediaId: string) => {
    if (readOnly) return;
    onMediaRemove(mediaId);
  };

  const handleMediaReorder = (fromIndex: number, toIndex: number) => {
    if (readOnly) return;
    onMediaReorder(fromIndex, toIndex);
  };

  const handleCodeBlockRemove = (codeBlockId: string) => {
    if (readOnly) return;
    onCodeBlockRemove?.(codeBlockId);
  };

  return (
    <div className="relative flex gap-4">
      {!isFirst && (
        <div className="absolute left-[22px] -top-4 h-4 w-0.5 bg-[#2F3336]" />
      )}

      <div className="flex flex-col items-center gap-2">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88"
          alt="User avatar"
          className="h-11 w-11 rounded-full"
        />
        {!isLast && <div className="flex-1 w-0.5 bg-[#2F3336]" />}
      </div>

      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder={isFirst ? "What is happening?" : "Add another post"}
          className={`w-full resize-none bg-transparent text-lg text-[#E7E9EA] placeholder:text-[#808283] outline-none ${
            readOnly ? "cursor-default" : ""
          }`}
          rows={1}
          readOnly={readOnly}
        />

        {media.length > 0 && (
          <MediaGrid
            media={media}
            onRemove={handleMediaRemove}
            onEdit={handleMediaEdit}
            onReorder={handleMediaReorder}
            readOnly={readOnly}
          />
        )}

        {codeBlocks.length > 0 && (
          <div className="mt-3 space-y-3">
            {codeBlocks.map((block) => (
              <div
                key={block.id}
                className="group relative overflow-hidden rounded-2xl border border-[#2F3336] bg-[#0A0E14] shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-[#2F3336] bg-[#0D1117] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#6AA5FF]">
                      <path
                        d="M8 7L3 12L8 17M16 7L21 12L16 17M14 3L10 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6AA5FF]">
                      {block.language}
                    </span>
                  </div>
                  {!readOnly && onCodeBlockRemove && (
                    <button
                      onClick={() => handleCodeBlockRemove(block.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-[#808283] opacity-0 transition-all hover:bg-[#EF454A]/10 hover:text-[#EF454A] group-hover:opacity-100"
                      title="Remove code block"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <pre className="overflow-x-auto bg-[#0A0E14] p-5 text-sm leading-relaxed scrollbar">
                  <code className="font-mono text-[#C5D4DD]" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace" }}>{block.code}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={readOnly}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={readOnly}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors ${
              readOnly ? "opacity-50 cursor-default" : "hover:bg-[#A06AFF]/10"
            }`}
            title="Add media"
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
            onClick={handleEmojiClick}
            disabled={readOnly}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors ${
              readOnly ? "opacity-50 cursor-default" : "hover:bg-[#A06AFF]/10"
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
            onClick={handleCodeBlockClick}
            disabled={readOnly}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors ${
              readOnly ? "opacity-50 cursor-default" : "hover:bg-[#A06AFF]/10"
            }`}
            title="Add code block"
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

          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={readOnly}
              className={`ml-auto flex h-9 w-9 items-center justify-center rounded-full text-[#EF454A] transition-colors ${
                readOnly ? "opacity-50 cursor-default" : "hover:bg-[#EF454A]/10"
              }`}
              title="Remove post"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

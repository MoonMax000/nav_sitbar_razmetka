import { FC, ReactNode } from "react";
import { TweetBlock } from "../components/CreatePostBox/TweetBlock";
import { EmojiPicker } from "../components/CreatePostBox/EmojiPicker";
import {
  CHAR_LIMIT,
  MediaItem,
  ReplyPolicy,
  createDefaultTransform,
} from "../components/CreatePostBox/types";

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

type StaticCodeBlock = {
  id: string;
  code: string;
  language: string;
};

type StaticBlock = {
  id: string;
  text: string;
  media: MediaItem[];
  codeBlocks?: StaticCodeBlock[];
};

interface StaticComposerWindowProps {
  blocks: StaticBlock[];
  replyPolicy: ReplyPolicy;
  sentiment: "bullish" | "bearish" | null;
  showAddAnother?: boolean;
  showEmojiPicker?: boolean;
  headline?: string;
  subheadline?: string;
}

interface ShowcaseCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface MediaEditorPreviewProps {
  variant: "crop" | "alt" | "warning";
}

type StaticDraft = {
  id: string;
  text: string;
  updatedAt: string;
  blocksCount: number;
};

const noop = () => {};
const noopText = (_text: string) => {};
const noopFile = (_files: FileList) => {};
const noopId = (_id: string) => {};
const noopMedia = (_media: MediaItem) => {};
const noopReorder = (_from: number, _to: number) => {};
const noopCodeRemove = (_codeBlockId: string) => {};

const sampleMediaPrimary: MediaItem = {
  id: "media-primary",
  url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&auto=format&fit=crop",
  type: "image",
  alt: "Morning workspace setup",
  transform: createDefaultTransform(),
  sensitiveTags: [],
};

const sampleMediaCharts: MediaItem = {
  id: "media-charts",
  url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop",
  type: "image",
  alt: "Stock market dashboard",
  transform: createDefaultTransform(),
  sensitiveTags: [],
};

const sampleMediaPortrait: MediaItem = {
  id: "media-portrait",
  url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=750&auto=format&fit=crop",
  type: "image",
  alt: "City skyline at dusk",
  transform: createDefaultTransform(),
  sensitiveTags: [],
};

const sampleMediaWarning: MediaItem = {
  id: "media-warning",
  url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop",
  type: "image",
  alt: "Abstract art with strong contrasts",
  transform: createDefaultTransform(),
  sensitiveTags: ["graphic"],
};

const codeSample: StaticCodeBlock = {
  id: "code-1",
  language: "TypeScript",
  code: `type MarketTrend = "bullish" | "bearish" | "sideways";\n\nconst describeTrend = (trend: MarketTrend) => {\n  switch (trend) {\n    case "bullish":\n      return "Buyers are in control.";\n    case "bearish":\n      return "Sellers dominate the market.";\n    default:\n      return "Price action is consolidating.";\n  }\n};`,
};

const threadBlocks: StaticBlock[] = [
  {
    id: "thread-1",
    text: "Three signals that helped me avoid last week's fake breakout:",
    media: [sampleMediaPrimary],
    codeBlocks: [],
  },
  {
    id: "thread-2",
    text: "1) Higher timeframe confluence\n2) Volume confirmation\n3) Waiting for retest before entering",
    media: [],
    codeBlocks: [],
  },
  {
    id: "thread-3",
    text: "Bonus snippet: here's the helper I use to mark retests automatically 👇",
    media: [],
    codeBlocks: [codeSample],
  },
];

const draftsPreview: StaticDraft[] = [
  {
    id: "draft-01",
    text: "Weekly macro update: bonds, commodities and tech earnings to watch",
    updatedAt: "11 Oct 2025, 14:27",
    blocksCount: 1,
  },
  {
    id: "draft-02",
    text: "Thread: 5 lessons I learned from trading options in September",
    updatedAt: "10 Oct 2025, 19:04",
    blocksCount: 3,
  },
  {
    id: "draft-03",
    text: "Morning sentiment poll for the community — bullish or bearish today?",
    updatedAt: "09 Oct 2025, 08:11",
    blocksCount: 1,
  },
];

const ShowcaseCard: FC<ShowcaseCardProps> = ({
  title,
  description,
  children,
}) => (
  <div className="rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.45)] p-6 backdrop-blur-[60px]">
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-[#808283]">{description}</p>
    </div>
    <div className="overflow-hidden rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.35)] p-4">
      {children}
    </div>
  </div>
);

const StaticComposerWindow: FC<StaticComposerWindowProps> = ({
  blocks,
  replyPolicy,
  sentiment,
  showAddAnother = false,
  showEmojiPicker = false,
  headline = "Create post",
  subheadline = "Share your thoughts with followers",
}) => {
  const blockCount = blocks.length || 1;
  const totalChars = blocks.reduce((sum, block) => sum + block.text.length, 0);
  const avgLimit = CHAR_LIMIT * blockCount;
  const charRatio = Math.min(totalChars / (avgLimit || CHAR_LIMIT), 1);
  const remainingChars = avgLimit - totalChars;
  const isNearLimit = remainingChars <= 20;
  const isOverLimit = remainingChars < 0;
  const circumference = 88;
  const gradientStroke = `${charRatio * circumference} ${circumference}`;
  const selectedReply =
    replyOptions.find((opt) => opt.id === replyPolicy) ?? replyOptions[0];
  const isThread = blocks.length > 1;

  return (
    <div className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[110px]">
      <div className="flex items-center justify-between border-b border-[#181B22] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#A06AFF] to-[#482090]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7H4M20 12H10M20 17H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{headline}</h2>
            <p className="text-xs text-[#808283]">{subheadline}</p>
          </div>
        </div>
        <button
          type="button"
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

      <div className="max-h-[560px] space-y-6 overflow-y-auto px-5 py-5 scrollbar">
        {blocks.map((block, index) => (
          <TweetBlock
            key={block.id}
            id={block.id}
            text={block.text}
            media={block.media}
            codeBlocks={block.codeBlocks ?? []}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
            canDelete={blocks.length > 1}
            onChange={noopText}
            onMediaAdd={noopFile}
            onMediaRemove={noopId}
            onMediaEdit={noopMedia}
            onMediaReorder={noopReorder}
            onDelete={noop}
            onEmojiClick={noop}
            onCodeBlockClick={noop}
            onCodeBlockRemove={noopCodeRemove}
            readOnly
          />
        ))}

        {showAddAnother && (
          <div className="flex items-center gap-3 text-[#A06AFF]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-[#A06AFF]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold">Add another post</span>
          </div>
        )}
      </div>

      <div className="relative border-t border-[#181B22] px-5 py-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#A06AFF]/10 px-3 py-1.5 text-sm font-semibold text-[#A06AFF]"
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
      </div>

      <div className="flex items-center justify-between border-t border-[#181B22] px-5 py-4">
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
                  isOverLimit ? "#EF454A" : isNearLimit ? "#FFD400" : "#A06AFF"
                }
                strokeWidth="4"
                strokeDasharray={gradientStroke}
                strokeLinecap="round"
              />
            </svg>
            {(isNearLimit || isOverLimit) && (
              <span
                className={`text-sm font-semibold ${isOverLimit ? "text-[#EF454A]" : "text-[#FFD400]"}`}
              >
                {remainingChars}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              sentiment === "bullish"
                ? "bg-[#2EBD85] text-black"
                : "bg-white/5 text-[#2EBD85]"
            }`}
          >
            Bullish
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              sentiment === "bearish"
                ? "bg-[#EF454A] text-white"
                : "bg-white/5 text-[#EF454A]"
            }`}
          >
            Bearish
          </button>
          <button
            type="button"
            className={`inline-flex h-10 min-w-[100px] items-center justify-center rounded-full px-6 text-sm font-semibold transition-all ${
              totalChars > 0 ||
              blocks.some(
                (block) =>
                  block.media.length > 0 || (block.codeBlocks?.length ?? 0) > 0,
              )
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white"
                : "bg-[#A06AFF]/20 text-white/40"
            }`}
          >
            {isThread ? "Post all" : "Post"}
          </button>
        </div>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-24 left-12 z-10 h-96 w-96 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[100px]">
          <EmojiPicker onSelect={noop} />
        </div>
      )}
    </div>
  );
};

const MediaEditorPreview: FC<MediaEditorPreviewProps> = ({ variant }) => {
  const isCrop = variant === "crop";
  const isAlt = variant === "alt";
  const isWarning = variant === "warning";

  return (
    <div className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[110px]">
      <div className="flex items-center justify-between border-b border-[#181B22] px-6 py-4">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-[#E7E9EA] opacity-60"
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
        <span className="text-sm font-semibold text-[#808283]">
          Media editor
        </span>
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-5 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 border-b border-[#181B22] px-6 py-3">
        <button
          type="button"
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            isCrop
              ? "bg-[#1D9BF0]/20 text-[#1D9BF0]"
              : "text-[#E7E9EA] hover:bg-white/10"
          }`}
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
          type="button"
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            isAlt
              ? "bg-[#A06AFF]/20 text-[#A06AFF]"
              : "text-[#E7E9EA] hover:bg-white/10"
          }`}
        >
          ALT
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            isWarning
              ? "bg-[#F97316]/20 text-[#F97316]"
              : "text-[#E7E9EA] hover:bg-white/10"
          }`}
        >
          Content warning
        </button>
      </div>

      <div className="space-y-6 p-6">
        {isCrop && (
          <>
            <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-[#1D9BF0] bg-black">
              <img
                src={sampleMediaPortrait.url}
                alt="Crop preview"
                className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] scale-105"
              />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-40">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div key={idx} className="border border-white/10" />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="flex h-10 items-center justify-center rounded-lg border border-[#2F3336] px-4 text-sm font-semibold text-[#1D9BF0]">
                  Square
                </span>
                <span className="flex h-10 items-center justify-center rounded-lg border border-[#2F3336] px-4 text-sm text-[#E7E9EA]">
                  Portrait
                </span>
                <span className="flex h-10 items-center justify-center rounded-lg border border-[#2F3336] px-4 text-sm text-[#E7E9EA]">
                  Landscape
                </span>
              </div>
              <div className="h-6 w-px bg-[#2F3336]" />
              <div className="flex flex-1 items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#E7E9EA]"
                >
                  <path
                    d="M12 5V4M5 12H4M12 20V19M20 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={70}
                  readOnly
                  className="h-1 flex-1 cursor-default accent-[#1D9BF0]"
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#E7E9EA]"
                >
                  <path
                    d="M12 5V4M5 12H4M12 20V19M20 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#E7E9EA]">
              <span className="rounded-full border border-[#2F3336] px-3 py-1">
                Fit
              </span>
              <span className="rounded-full border border-[#2F3336] px-3 py-1 text-[#808283]">
                Fill
              </span>
              <span className="rounded-full border border-[#2F3336] px-3 py-1 text-[#808283]">
                Rotate 90°
              </span>
              <span className="rounded-full border border-[#2F3336] px-3 py-1 text-[#808283]">
                Flip H
              </span>
              <span className="rounded-full border border-[#2F3336] px-3 py-1 text-[#808283]">
                Grid • Thirds
              </span>
            </div>
          </>
        )}

        {isAlt && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#181B22] bg-[#0C1014] p-4 text-sm text-[#B0B0B0]">
              Adding a clear image description improves accessibility for people
              using screen readers.
            </div>
            <textarea
              className="h-48 w-full resize-none rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 text-sm text-[#E7E9EA] outline-none"
              defaultValue="Wide shot of a modern trading desk with multi-screen setup, ambient neon lighting and analytics dashboards."
              readOnly
            />
            <div className="flex items-center justify-between text-xs text-[#808283]">
              <span>0 warnings</span>
              <span>136 / 1000</span>
            </div>
          </div>
        )}

        {isWarning && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#181B22] bg-[#0C1014] p-4 text-sm text-[#E7E9EA]">
              Let people know what to expect before they view this media.
            </div>
            <div className="space-y-3">
              {[
                { id: "violence", label: "Violence" },
                { id: "graphic", label: "Graphic content" },
                { id: "sensitive", label: "Other sensitive" },
              ].map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 rounded-2xl border border-[#181B22] bg-[#0C1014] p-4 text-sm ${
                    option.id === "graphic" ? "border-[#A06AFF]" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[#181B22] text-[#A06AFF]"
                    defaultChecked={option.id === "graphic"}
                    disabled
                  />
                  <span className="text-[#E7E9EA]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CodeBlockModalPreview: FC = () => (
  <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[110px]">
    <div className="flex items-center justify-between border-b border-[#181B22] px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#A06AFF] to-[#482090]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 7L3 12L8 17M16 7L21 12L16 17M14 3L10 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Insert Code Block</h2>
      </div>
      <button
        type="button"
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

    <div className="space-y-4 p-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#E7E9EA]">
          Language
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-3 pr-10 text-sm text-white outline-none"
            defaultValue="typescript"
            disabled
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="#A06AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#E7E9EA]">
          Code
        </label>
        <textarea
          className="h-64 w-full resize-none rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 font-mono text-sm text-[#E7E9EA] outline-none"
          defaultValue={codeSample.code}
          readOnly
        />
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 border-t border-[#181B22] px-6 py-4">
      <button
        type="button"
        className="rounded-full border border-[#181B22] px-5 py-2 text-sm font-semibold text-[#E7E9EA]"
      >
        Cancel
      </button>
      <button
        type="button"
        className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-5 py-2 text-sm font-semibold text-white"
      >
        Insert Code
      </button>
    </div>
  </div>
);

const DraftsListPreview: FC = () => (
  <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[110px]">
    <div className="flex items-center justify-between border-b border-[#181B22] px-5 py-4">
      <h2 className="text-lg font-bold text-white">Drafts</h2>
      <button
        type="button"
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

    <div className="max-h-[60vh] space-y-3 overflow-y-auto p-5 scrollbar">
      {draftsPreview.map((draft) => (
        <div
          key={draft.id}
          className="rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 backdrop-blur-[60px]"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <p className="flex-1 text-sm text-[#E7E9EA] line-clamp-2">
              {draft.text}
            </p>
            {draft.blocksCount > 1 && (
              <span className="rounded-full bg-[#A06AFF]/20 px-2 py-0.5 text-xs font-semibold text-[#A06AFF]">
                Thread ({draft.blocksCount})
              </span>
            )}
          </div>
          <div className="mb-3 text-xs text-[#808283]">{draft.updatedAt}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-1.5 text-xs font-semibold text-white"
            >
              Open
            </button>
            <button
              type="button"
              className="rounded-full border border-[#181B22] px-4 py-1.5 text-xs font-semibold text-[#EF454A]"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComposerShowcase: FC = () => {
  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="rounded-3xl border border-[#A06AFF]/30 bg-gradient-to-br from-[#A06AFF]/10 to-transparent p-8 backdrop-blur-[70px]">
          <h1 className="text-4xl font-bold text-white">
            Post Composer <span className="text-gradient-purple">Showcase</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#808283]">
            На этой странице уже раскрыты все окна конструктора постов.
            Используйте режим Design и инструмент "Select elements", чтобы
            настраивать внешний вид и состояния без дополнительных кликов.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[#E7E9EA]">
            <li>
              • Компоненты ниже рендерятся как отдельные состояния — можно
              редактировать любые элементы.
            </li>
            <li>
              • Страница доступна по адресу{" "}
              <code className="rounded bg-[#2F3336] px-2 py-1 text-[#A06AFF]">
                /composer-showcase
              </code>
              .
            </li>
            <li>
              • Карточки сгруппированы по типу окна: основной композер, редактор
              медиа и вспомогательные модалки.
            </li>
          </ul>
        </div>

        <section className="space-y-6">
          <header>
            <h2 className="text-2xl font-semibold text-white">
              Основное окно композера
            </h2>
            <p className="text-sm text-[#808283]">
              Вариации с текстом, медиа, код-блоками и тредами, доступные для
              точечной стилизации.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ShowcaseCard
              title="Empty state"
              description="Пустое окно по умолчанию."
            >
              <StaticComposerWindow
                blocks={[{ id: "empty", text: "", media: [], codeBlocks: [] }]}
                replyPolicy="everyone"
                sentiment={null}
                showAddAnother
              />
            </ShowcaseCard>

            <ShowcaseCard
              title="Text + media"
              description="Пост с текстом и одним вложением."
            >
              <StaticComposerWindow
                blocks={[
                  {
                    id: "media",
                    text: "Launching our new analytics dashboard today — here is a first look!",
                    media: [sampleMediaPrimary],
                    codeBlocks: [],
                  },
                ]}
                replyPolicy="following"
                sentiment="bullish"
              />
            </ShowcaseCard>

            <ShowcaseCard
              title="Gallery"
              description="Несколько изображений и ALT подписи."
            >
              <StaticComposerWindow
                blocks={[
                  {
                    id: "gallery",
                    text: "Four charts I monitor before the U.S. open. Which one do you watch?",
                    media: [
                      sampleMediaPrimary,
                      sampleMediaCharts,
                      sampleMediaPortrait,
                      sampleMediaWarning,
                    ],
                    codeBlocks: [],
                  },
                ]}
                replyPolicy="everyone"
                sentiment="bearish"
                showEmojiPicker
              />
            </ShowcaseCard>

            <ShowcaseCard
              title="Thread + code"
              description="Тред из нескольких блоков и вставкой кода."
            >
              <StaticComposerWindow
                blocks={threadBlocks}
                replyPolicy="verified"
                sentiment="bullish"
                showAddAnother
              />
            </ShowcaseCard>
          </div>
        </section>

        <section className="space-y-6">
          <header>
            <h2 className="text-2xl font-semibold text-white">
              Редактор медиа
            </h2>
            <p className="text-sm text-[#808283]">
              Статичные экземпляры вкладок Crop, ALT и Content warning.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6">
            <ShowcaseCard
              title="Crop"
              description="Вкладка обрезки с активными пресетами."
            >
              <MediaEditorPreview variant="crop" />
            </ShowcaseCard>
            <ShowcaseCard
              title="ALT"
              description="Редактирование ALT-текста для доступности."
            >
              <MediaEditorPreview variant="alt" />
            </ShowcaseCard>
            <ShowcaseCard
              title="Content warning"
              description="Список предупреждений по контенту."
            >
              <MediaEditorPreview variant="warning" />
            </ShowcaseCard>
          </div>
        </section>

        <section className="space-y-6">
          <header>
            <h2 className="text-2xl font-semibold text-white">
              Вспомогательные окна
            </h2>
            <p className="text-sm text-[#808283]">
              Окна выбора эмодзи, вставки кода и управления черновиками.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Emoji picker"
              description="Категории эмодзи с поиском."
            >
              <div className="mx-auto h-96 w-96 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-4 backdrop-blur-[100px]">
                <EmojiPicker onSelect={noop} />
              </div>
            </ShowcaseCard>
            <ShowcaseCard
              title="Code block modal"
              description="Форма добавления блока с кодом."
            >
              <CodeBlockModalPreview />
            </ShowcaseCard>
            <ShowcaseCard
              title="Drafts list"
              description="Список сохранённых черновиков."
            >
              <DraftsListPreview />
            </ShowcaseCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComposerShowcase;

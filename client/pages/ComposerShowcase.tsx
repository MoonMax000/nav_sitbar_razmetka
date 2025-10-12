import { FC, ReactNode, useState } from "react";
import { TweetBlock } from "../components/CreatePostBox/TweetBlock";
import { EmojiPicker } from "../components/CreatePostBox/EmojiPicker";
import CreatePostVariants from "../components/CreatePostBox/CreatePostVariants";
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
    text: "Bonus snippet: here's the helper I use to mark retests automatically ��",
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

import CreatePostModal from "@/components/CreatePostBox/CreatePostModal";

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
        {/* Left: close icon */}
        <div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#E7E9EA] transition-colors hover:bg-white/10"
            aria-label="Close"
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

        {/* Right: Drafts label */}
        <div className="text-sm font-semibold text-[#A06AFF]">Drafts</div>
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={noopFile}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#A06AFF]/10`}
            title="Add media"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.08301 10C2.08301 6.26809 2.08301 4.40212 3.24237 3.24274C4.40175 2.08337 6.26772 2.08337 9.99967 2.08337C13.7316 2.08337 15.5976 2.08337 16.757 3.24274C17.9163 4.40212 17.9163 6.26809 17.9163 10C17.9163 13.732 17.9163 15.598 16.757 16.7574C15.5976 17.9167 13.7316 17.9167 9.99967 17.9167C6.26772 17.9167 4.40175 17.9167 3.24237 16.7574C2.08301 15.598 2.08301 13.732 2.08301 10Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4.16699 17.5C7.81071 13.1458 11.8954 7.40334 17.9149 11.2853" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          <button
            type="button"
            onClick={noop}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#A06AFF]/10`}
            title="Add emoji"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66699 12.5C7.42709 13.512 8.63724 14.1667 10.0003 14.1667C11.3634 14.1667 12.5736 13.512 13.3337 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.67447 7.5H6.66699M13.3337 7.5H13.3262" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            type="button"
            onClick={noop}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[#A06AFF] transition-colors hover:bg-[#A06AFF]/10`}
            title="Add code block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 7L3 12L8 17M16 7L21 12L16 17M14 3L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
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
                />
              </svg>

              {(isNearLimit || isOverLimit) && (
                <span className={`text-sm font-semibold ${isOverLimit ? "text-[#EF454A]" : "text-[#FFD400]"}`}>
                  {remainingChars}
                </span>
              )}
            </div>

            {totalChars > 0 && (
              <>
                <div className="h-6 w-px bg-white/15" />
                <button
                  type="button"
                  onClick={noop}
                  aria-label="Add post"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#1D9BF0] transition-colors hover:bg-white/15 hover:border-white/30"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 5v14M5 12h14" stroke="#1D9BF0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`rounded inline-flex items-center gap-1 px-1 py-0.5 text-xs font-bold transition-colors ${
              sentiment === "bullish"
                ? "bg-[#1C3430] text-white"
                : "bg-white/5 text-white/40"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 8.66659V5.33325H10" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3334 5.33325L10.0001 8.66659C9.41168 9.25499 9.11755 9.54912 8.75648 9.58165C8.69675 9.58705 8.63675 9.58705 8.57702 9.58165C8.21595 9.54912 7.92181 9.25499 7.33341 8.66659C6.74501 8.07819 6.45085 7.78405 6.08979 7.75152C6.03011 7.74612 5.97005 7.74612 5.91037 7.75152C5.54931 7.78405 5.25512 8.07819 4.66675 8.66659L2.66675 10.6666" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Bullish
          </button>
          <button
            type="button"
            className={`rounded inline-flex items-center gap-1 px-1 py-0.5 text-xs font-bold transition-colors ${
              sentiment === "bearish"
                ? "bg-[#3A2127] text-white"
                : "bg-white/5 text-white/40"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 7.3335V10.6668H10" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3334 10.6668L10.0001 7.3335C9.41168 6.7451 9.11755 6.45093 8.75648 6.41841C8.69675 6.41303 8.63675 6.41303 8.57702 6.41841C8.21595 6.45093 7.92181 6.7451 7.33341 7.3335C6.74501 7.9219 6.45085 8.21603 6.08979 8.24856C6.03011 8.25396 5.97005 8.25396 5.91037 8.24856C5.54931 8.21603 5.25512 7.9219 4.66675 7.3335L2.66675 5.3335" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
            Post all
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [topMenuActive, setTopMenuActive] = useState<"foryou" | "following">("foryou");

  // Shared composer state between page empty state and modal
  const [sharedBlocks, setSharedBlocks] = useState<StaticBlock[]>([
    { id: "empty", text: "", media: [], codeBlocks: [] },
  ]);
  const [sharedReply, setSharedReply] = useState<ReplyPolicy>("everyone");
  const [sharedSentiment, setSharedSentiment] = useState<"bullish" | "bearish" | null>(null);

  return (
    <div className="min-h-screen py-12 px-6">
      <CreatePostModal
        isOpen={isModalOpen}
        initialBlocks={sharedBlocks.map((b) => ({ ...b }))}
        initialReplySetting={sharedReply}
        initialSentiment={sharedSentiment}
        onBlocksChange={(newBlocks) => {
          setSharedBlocks(newBlocks.map((b) => ({ id: b.id, text: b.text, media: b.media, codeBlocks: b.codeBlocks })));
        }}
        onClose={(newBlocks) => {
          // update shared state when modal closes (newBlocks may be undefined)
          if (newBlocks) {
            setSharedBlocks(newBlocks.map((b) => ({ id: b.id, text: b.text, media: b.media, codeBlocks: b.codeBlocks })));
          }
          setIsModalOpen(false);
        }}
      />
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Top social-style menu (moved from /social/home) */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-1">
            {(["foryou", "following"] as const).map((value) => {
              const isActive = topMenuActive === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTopMenuActive(value)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white"
                      : "text-[#B0B0B0] hover:text-white"
                  }`}
                >
                  <span>{value === "foryou" ? "For you" : "Following"}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-[720px]">
          <CreatePostVariants />
        </div>


        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <header>
              <h2 className="text-2xl font-semibold text-white">
                Основное окно композера
              </h2>
              <p className="text-sm text-[#808283]">
                Вариации с т��кстом, медиа, код-блоками и тредами, доступные для
                точечной стилизации.
              </p>
            </header>

            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.6)] px-3 py-2 text-sm font-semibold text-white hover:bg-[rgba(160,106,255,0.12)] transition"
              >
                {isModalOpen ? "Close Composer" : "Open Composer"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ShowcaseCard
              title="Empty state"
              description="Пустое окно по умолчанию."
            >
              <StaticComposerWindow
                blocks={sharedBlocks}
                replyPolicy={sharedReply}
                sentiment={sharedSentiment}
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
              description="Не��колько изображений и ALT подписи."
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
              description="Р��дактирование ALT-текста для доступности."
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
              Окна выбора эмодзи, ��ста��ки кода и управления черновиками.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6">
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
              description="Фор��а добавления блока с кодом."
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

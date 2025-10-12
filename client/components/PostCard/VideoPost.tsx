import { FC, MouseEvent, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface VideoPostData {
  author: {
    name: string;
    avatar: string;
    handle?: string;
    verified?: boolean;
  };
  timestamp: string;
  title: string;
  content?: string;
  videoUrl: string;
  sentiment: "bullish" | "bearish";
  likes: number;
  comments: number;
  isFollowing?: boolean;
  hashtags?: string[];
}

interface VideoPostProps extends VideoPostData {
  truncate?: boolean;
  onOpen?: () => void;
  className?: string;
}

const VideoPost: FC<VideoPostProps> = ({
  author,
  timestamp,
  title,
  content,
  videoUrl,
  sentiment,
  likes,
  comments,
  isFollowing,
  hashtags,
  truncate = false,
  onOpen,
  className,
}) => {
  const [expanded, setExpanded] = useState(!truncate);

  const formattedContent = useMemo(() => content ?? "", [content]);
  const shouldShowToggle = truncate && formattedContent.length > 260;

  const displayedContent = expanded || !truncate
    ? formattedContent
    : `${formattedContent.slice(0, 240)}${formattedContent.length > 240 ? "…" : ""}`;

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const handleFollowClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={onOpen}
      className={cn(
        "mx-auto flex w-full max-w-[680px] flex-col items-center gap-6 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-4 backdrop-blur-[50px]",
        onOpen && "cursor-pointer transition-colors duration-200 hover:border-[#A06AFF]/50",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full">
              <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <div className="flex items-center gap-1 text-[15px] font-bold leading-normal text-white">
                {author.name}
                {author.verified && (
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2L12.118 4.23223L15.1962 4.47214L15.4721 7.55192L17.7044 9.66987L15.4721 11.7878L15.1962 14.8676L12.118 15.1075L10 17.3397L7.88197 15.1075L4.80384 14.8676L4.52793 11.7878L2.29577 9.66987L4.52793 7.55192L4.80384 4.47214L7.88197 4.23223L10 2Z"
                      stroke="#A06AFF"
                      strokeWidth="1.5"
                    />
                    <path d="M7.5 10L9.16667 11.6667L12.5 8.33337" stroke="#A06AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-[#FF6BD4] px-2 py-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.33301 7.33366C1.33301 5.13377 1.33301 4.03383 2.01643 3.35041C2.69984 2.66699 3.79979 2.66699 5.99967 2.66699H6.66634C8.86621 2.66699 9.96614 2.66699 10.6496 3.35041C11.333 4.03383 11.333 5.13377 11.333 7.33366V8.66699C11.333 10.8669 11.333 11.9668 10.6496 12.6503C9.96614 13.3337 8.86621 13.3337 6.66634 13.3337H5.99967C3.79979 13.3337 2.69984 13.3337 2.01643 12.6503C1.33301 11.9668 1.33301 10.8669 1.33301 8.66699V7.33366Z"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.333 5.93691L11.4169 5.86765C12.8275 4.70383 13.5327 4.12192 14.0995 4.40289C14.6663 4.68386 14.6663 5.61538 14.6663 7.47841V8.52094C14.6663 10.384 14.6663 11.3155 14.0995 11.5965C13.5327 11.8774 12.8275 11.2955 11.4169 10.1317L11.333 10.0624"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path d="M7.66699 7.33301C8.21928 7.33301 8.66699 6.88529 8.66699 6.33301C8.66699 5.78072 8.21928 5.33301 7.66699 5.33301C7.11471 5.33301 6.66699 5.78072 6.66699 6.33301C6.66699 6.88529 7.11471 7.33301 7.66699 7.33301Z" stroke="white" strokeWidth="1.5" />
                  </svg>
                  <div className="text-xs font-bold leading-normal text-white">Video</div>
                </div>
                <div className="flex-1 text-xs font-bold leading-normal text-[#B0B0B0]">
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2" onClick={handleMenuClick}>
            <button
              onClick={handleFollowClick}
              className={cn(
                "flex h-[26px] items-center justify-center gap-2.5 rounded-lg px-2.5",
                isFollowing
                  ? "border border-[#181B22] bg-[rgba(12,16,20,0.50)] backdrop-blur-[50px] text-[#B0B0B0]"
                  : "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white",
              )}
            >
              <span className="text-xs font-bold">{isFollowing ? "Unfollow" : "Follow"}</span>
            </button>
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-rotate-90 text-[#B0B0B0]"
              >
                <path
                  d="M8.00004 8.66675C8.17685 8.66675 8.34642 8.59651 8.47145 8.47149C8.59647 8.34646 8.66671 8.17689 8.66671 8.00008C8.66671 7.82327 8.59647 7.6537 8.47145 7.52868C8.34642 7.40365 8.17685 7.33341 8.00004 7.33341C7.82323 7.33341 7.65366 7.40365 7.52864 7.52868C7.40361 7.6537 7.33337 7.82327 7.33337 8.00008C7.33337 8.17689 7.40361 8.34646 7.52864 8.47149C7.65366 8.59651 7.82323 8.66675 8.00004 8.66675Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6667 8.66675C12.8435 8.66675 13.013 8.59651 13.1381 8.47149C13.2631 8.34646 13.3333 8.17689 13.3333 8.00008C13.3333 7.82327 13.2631 7.6537 13.1381 7.52868C13.013 7.40365 12.8435 7.33341 12.6667 7.33341C12.4899 7.33341 12.3203 7.40365 12.1953 7.52868C12.0702 7.6537 12 7.82327 12 8.00008C12 8.17689 12.0702 8.34646 12.1953 8.47149C12.3203 8.59651 12.4899 8.66675 12.6667 8.66675Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33329 8.66675C3.5101 8.66675 3.67967 8.59651 3.8047 8.47149C3.92972 8.34646 3.99996 8.17689 3.99996 8.00008C3.99996 7.82327 3.92972 7.6537 3.8047 7.52868C3.67967 7.40365 3.5101 7.33341 3.33329 7.33341C3.15648 7.33341 2.98691 7.40365 2.86189 7.52868C2.73686 7.6537 2.66663 7.82327 2.66663 8.00008C2.66663 8.17689 2.73686 8.34646 2.86189 8.47149C2.98691 8.59651 3.15648 8.66675 3.33329 8.66675Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-4">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="text-2xl font-bold leading-normal text-white">{title}</div>
          {displayedContent && (
            <div className="text-[15px] font-normal leading-normal text-white whitespace-pre-line">
              {displayedContent}
            </div>
          )}
          {shouldShowToggle && (
            <button
              onClick={handleToggle}
              className="text-left text-[15px] font-bold leading-normal text-[#A06AFF] underline"
            >
              {expanded ? "Show less" : "Learn more"}
            </button>
          )}
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl border border-[#181B22]">
          <img src={videoUrl} alt="" className="aspect-[1043/585] w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-[0_12px_24px_0_rgba(0,0,0,0.48)]">
              <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.5 12.5004V8.94038C4.5 4.52038 7.63 2.71039 11.46 4.92039L14.55 6.70039L17.64 8.48039C21.47 10.6904 21.47 14.3104 17.64 16.5204L14.55 18.3004L11.46 20.0804C7.63 22.2904 4.5 20.4804 4.5 16.0604V12.5004Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-[#1C3430] px-1 py-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 8.66659V5.33325H10" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M13.3334 5.33325L10 8.66659C9.41162 9.25499 9.11749 9.54912 8.75642 9.58165C8.69669 9.58705 8.63669 9.58705 8.57695 9.58165C8.21589 9.54912 7.92175 9.25499 7.33335 8.66659C6.74495 8.07819 6.45079 7.78405 6.08973 7.75152C6.03005 7.74612 5.96999 7.74612 5.91031 7.75152C5.54925 7.78405 5.25506 8.07819 4.66669 8.66659L2.66669 10.6666"
                  stroke="#2EBD85"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-center text-xs font-bold leading-normal text-white">
                {sentiment === "bullish" ? "Bullish" : "Bearish"}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_video_post_card)">
                  <path
                    d="M18.3337 9.63875C18.3337 14.0414 14.6022 17.611 10.0003 17.611C9.45924 17.6118 8.91966 17.5617 8.38816 17.4619C8.0056 17.39 7.81431 17.3541 7.68077 17.3745C7.54722 17.3949 7.35798 17.4955 6.97948 17.6968C5.90878 18.2663 4.66028 18.4673 3.45958 18.244C3.91594 17.6827 4.22762 17.0092 4.36514 16.2872C4.44848 15.8455 4.24199 15.4165 3.93273 15.1024C2.5281 13.6761 1.66699 11.7541 1.66699 9.63875C1.66699 5.23615 5.39848 1.6665 10.0003 1.6665C14.6022 1.6665 18.3337 5.23615 18.3337 9.63875Z"
                    stroke="#B0B0B0"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99658 10H10.0041M13.3262 10H13.3337M6.66699 10H6.67447"
                    stroke="#B0B0B0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_video_post_card">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#B0B0B0]">{comments}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.2192 3.32846C13.9844 1.95769 12.034 2.51009 10.8623 3.39001C10.3818 3.7508 10.1417 3.93119 10.0003 3.93119C9.85899 3.93119 9.61882 3.7508 9.13832 3.39001C7.96667 2.51009 6.01623 1.95769 3.78152 3.32846C0.848716 5.12745 0.185092 11.0624 6.94993 16.0695C8.23842 17.0232 8.88266 17.5 10.0003 17.5C11.118 17.5 11.7622 17.0232 13.0507 16.0695C19.8156 11.0624 19.1519 5.12745 16.2192 3.32846Z"
                  fill="url(#paint0_linear_video_post_card)"
                />
                <defs>
                  <linearGradient id="paint0_linear_video_post_card" x1="18.3337" y1="10" x2="1.66699" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A06AFF" />
                    <stop offset="1" stopColor="#482090" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#A06AFF]">
                {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#B0B0B0]"
              >
                <path
                  d="M3.33301 14.9843V8.08993C3.33301 5.06213 3.33301 3.54823 4.30932 2.60761C5.28563 1.66699 6.85697 1.66699 9.99967 1.66699C13.1423 1.66699 14.7138 1.66699 15.69 2.60761C16.6663 3.54823 16.6663 5.06213 16.6663 8.08993V14.9843C16.6663 16.9059 16.6663 17.8667 16.0223 18.2106C14.7751 18.8765 12.4357 16.6547 11.3247 15.9857C10.6803 15.5977 10.3582 15.4037 9.99967 15.4037C9.64117 15.4037 9.31901 15.5977 8.67467 15.9857C7.56367 16.6547 5.22423 18.8765 3.97705 18.2106C3.33301 17.8667 3.33301 16.9059 3.33301 14.9843Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); console.log('share'); }}
              aria-label="Share"
              className="flex h-[26px] w-[26px] items-center justify-center rounded-lg text-[#B0B0B0] hover:bg-[#482090]/10 hover:text-white transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
                <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {hashtags && hashtags.length > 0 && (
        <div className="flex w-full flex-wrap gap-3">
          {hashtags.map((tag) => (
            <span key={tag} className="text-sm font-semibold text-[#A06AFF]">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPost;

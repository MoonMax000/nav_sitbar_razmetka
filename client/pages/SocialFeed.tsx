import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard/PostCard";

type TabType = "popular" | "editors" | "foryou" | "following";
type FilterType = "all" | "video";

interface VideoPostProps {
  author?: {
    name: string;
    avatar: string;
  };
  timestamp?: string;
  title?: string;
  content?: string;
  videoUrl?: string;
  sentiment?: "bullish" | "bearish";
  likes?: number;
  comments?: number;
  isFollowing?: boolean;
}

const VideoPost: FC<VideoPostProps> = ({
  author = { name: "John Smith", avatar: "/placeholder.svg" },
  timestamp = "January 31, 5:10 PM",
  title = "New Tools for Crypto Analytics",
  content,
  videoUrl = "https://api.builder.io/api/v1/image/assets/TEMP/e4b8b038e464896411fd0b568f4594d8cfdf3453?width=2086",
  sentiment = "bullish",
  likes = 1500,
  comments = 563,
  isFollowing = false,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-4 backdrop-blur-[50px]">
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <div className="text-[15px] font-bold leading-normal text-white">
                {author.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-[#FF6BD4] px-2 py-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                    <path
                      d="M7.66699 7.33301C8.21928 7.33301 8.66699 6.88529 8.66699 6.33301C8.66699 5.78072 8.21928 5.33301 7.66699 5.33301C7.11471 5.33301 6.66699 5.78072 6.66699 6.33301C6.66699 6.88529 7.11471 7.33301 7.66699 7.33301Z"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div className="text-xs font-bold leading-normal text-white">
                    Video
                  </div>
                </div>
                <div className="flex-1 text-xs font-bold leading-normal text-[#B0B0B0]">
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`flex h-[26px] items-center justify-center gap-2.5 rounded-lg px-2.5 ${
                isFollowing
                  ? "border border-[#181B22] bg-[rgba(12,16,20,0.50)] backdrop-blur-[50px]"
                  : "bg-gradient-to-r from-[#A06AFF] to-[#482090]"
              }`}
            >
              <span className={`text-xs font-bold ${isFollowing ? "text-[#B0B0B0]" : "text-white"}`}>
                {isFollowing ? "Unfollow" : "Follow"}
              </span>
            </button>
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-rotate-90"
              >
                <path
                  d="M8.00004 8.66675C8.17685 8.66675 8.34642 8.59651 8.47145 8.47149C8.59647 8.34646 8.66671 8.17689 8.66671 8.00008C8.66671 7.82327 8.59647 7.6537 8.47145 7.52868C8.34642 7.40365 8.17685 7.33341 8.00004 7.33341C7.82323 7.33341 7.65366 7.40365 7.52864 7.52868C7.40361 7.6537 7.33337 7.82327 7.33337 8.00008C7.33337 8.17689 7.40361 8.34646 7.52864 8.47149C7.65366 8.59651 7.82323 8.66675 8.00004 8.66675Z"
                  fill="#B0B0B0"
                  stroke="#B0B0B0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6667 8.66675C12.8435 8.66675 13.013 8.59651 13.1381 8.47149C13.2631 8.34646 13.3333 8.17689 13.3333 8.00008C13.3333 7.82327 13.2631 7.6537 13.1381 7.52868C13.013 7.40365 12.8435 7.33341 12.6667 7.33341C12.4899 7.33341 12.3203 7.40365 12.1953 7.52868C12.0702 7.6537 12 7.82327 12 8.00008C12 8.17689 12.0702 8.34646 12.1953 8.47149C12.3203 8.59651 12.4899 8.66675 12.6667 8.66675Z"
                  fill="#B0B0B0"
                  stroke="#B0B0B0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33329 8.66675C3.5101 8.66675 3.67967 8.59651 3.8047 8.47149C3.92972 8.34646 3.99996 8.17689 3.99996 8.00008C3.99996 7.82327 3.92972 7.6537 3.8047 7.52868C3.67967 7.40365 3.5101 7.33341 3.33329 7.33341C3.15648 7.33341 2.98691 7.40365 2.86189 7.52868C2.73686 7.6537 2.66663 7.82327 2.66663 8.00008C2.66663 8.17689 2.73686 8.34646 2.86189 8.47149C2.98691 8.59651 3.15648 8.66675 3.33329 8.66675Z"
                  fill="#B0B0B0"
                  stroke="#B0B0B0"
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
        {content && (
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-2xl font-bold leading-normal text-white">
              {title}
            </div>
            <div className="text-[15px] font-normal leading-normal text-white">
              {showFullContent ? content : content.slice(0, 200) + (content.length > 200 ? "..." : "")}
            </div>
            {content.length > 200 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-[15px] font-bold leading-normal text-[#A06AFF] underline"
              >
                {showFullContent ? "Show less" : "Learn more"}
              </button>
            )}
          </div>
        )}
        {!content && (
          <div className="flex w-full items-center">
            <div className="text-2xl font-bold leading-normal text-white">
              {title}
            </div>
          </div>
        )}
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg md:h-[400px] lg:h-[585px]">
          <img
            src={videoUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] shadow-[0_12px_24px_0_rgba(0,0,0,0.48)] transition-transform hover:scale-110">
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 12.5004V8.94038C4.5 4.52038 7.63 2.71039 11.46 4.92039L14.55 6.70039L17.64 8.48039C21.47 10.6904 21.47 14.3104 17.64 16.5204L14.55 18.3004L11.46 20.0804C7.63 22.2904 4.5 20.4804 4.5 16.0604V12.5004Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-[#1C3430] px-1 py-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 8.66659V5.33325H10"
                  stroke="#2EBD85"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2192 3.32846C13.9844 1.95769 12.034 2.51009 10.8623 3.39001C10.3818 3.7508 10.1417 3.93119 10.0003 3.93119C9.85899 3.93119 9.61882 3.7508 9.13832 3.39001C7.96667 2.51009 6.01623 1.95769 3.78152 3.32846C0.848716 5.12745 0.185092 11.0624 6.94993 16.0695C8.23842 17.0232 8.88266 17.5 10.0003 17.5C11.118 17.5 11.7622 17.0232 13.0507 16.0695C19.8156 11.0624 19.1519 5.12745 16.2192 3.32846Z"
                  fill="url(#paint0_linear_video)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_video"
                    x1="18.3337"
                    y1="10"
                    x2="1.66699"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A06AFF" />
                    <stop offset="1" stopColor="#482090" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#A06AFF]">
                {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_video)">
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
                  <clipPath id="clip0_video">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#B0B0B0]">
                {comments}
              </div>
            </div>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33301 14.9843V8.08993C3.33301 5.06213 3.33301 3.54823 4.30932 2.60761C5.28563 1.66699 6.85697 1.66699 9.99967 1.66699C13.1423 1.66699 14.7138 1.66699 15.69 2.60761C16.6663 3.54823 16.6663 5.06213 16.6663 8.08993V14.9843C16.6663 16.9059 16.6663 17.8667 16.0223 18.2106C14.7751 18.8765 12.4357 16.6547 11.3247 15.9857C10.6803 15.5977 10.3582 15.4037 9.99967 15.4037C9.64117 15.4037 9.31901 15.5977 8.67467 15.9857C7.56367 16.6547 5.22423 18.8765 3.97705 18.2106C3.33301 17.8667 3.33301 16.9059 3.33301 14.9843Z"
              stroke="#B0B0B0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const SocialFeed: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const [filter, setFilter] = useState<FilterType>("all");

  const tabs: { id: TabType; label: string }[] = [
    { id: "popular", label: "Popular" },
    { id: "editors", label: "Editor's picks" },
    { id: "foryou", label: "For you" },
    { id: "following", label: "Following" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 pb-12">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-3 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-1 backdrop-blur-[50px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 rounded-[32px] px-4 py-3 transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090]"
                : "border border-[#181B22] bg-[rgba(12,16,20,0.50)] backdrop-blur-[58px]"
            }`}
          >
            <span
              className={`text-[15px] font-bold leading-normal ${
                activeTab === tab.id ? "text-white" : "text-[#B0B0B0]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`flex h-8 items-center justify-center gap-2 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 backdrop-blur-[58px] ${
              filter === "all" ? "ring-2 ring-[#A06AFF]" : ""
            }`}
          >
            <span className="text-[15px] font-bold leading-normal text-[#B0B0B0]">
              All Posts
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#B0B0B0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`flex h-[26px] items-center justify-center gap-2 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 backdrop-blur-[50px] ${
              filter === "video" ? "ring-2 ring-[#A06AFF]" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66626 9.16707C1.66626 6.41722 1.66626 5.04228 2.52053 4.18802C3.3748 3.33374 4.74973 3.33374 7.49959 3.33374H8.33293C11.0828 3.33374 12.4577 3.33374 13.312 4.18802C14.1663 5.04228 14.1663 6.41722 14.1663 9.16707V10.8337C14.1663 13.5836 14.1663 14.9585 13.312 15.8128C12.4577 16.6671 11.0828 16.6671 8.33293 16.6671H7.49959C4.74973 16.6671 3.3748 16.6671 2.52053 15.8128C1.66626 14.9585 1.66626 13.5836 1.66626 10.8337V9.16707Z"
                stroke="#B0B0B0"
                strokeWidth="1.5"
              />
              <path
                d="M14.1663 7.42114L14.2712 7.33456C16.0343 5.87979 16.9159 5.15239 17.6244 5.50361C18.3329 5.85483 18.3329 7.01922 18.3329 9.34801V10.6512C18.3329 12.98 18.3329 14.1443 17.6244 14.4956C16.9159 14.8468 16.0343 14.1194 14.2712 12.6646L14.1663 12.578"
                stroke="#B0B0B0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.58374 9.16626C10.2741 9.16626 10.8337 8.60662 10.8337 7.91626C10.8337 7.2259 10.2741 6.66626 9.58374 6.66626C8.89338 6.66626 8.33374 7.2259 8.33374 7.91626C8.33374 8.60662 8.89338 9.16626 9.58374 9.16626Z"
                stroke="#B0B0B0"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-[15px] font-bold leading-normal text-[#B0B0B0]">
              Videos Only
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-1 backdrop-blur-[50px]">
          <button className="flex h-[26px] w-[26px] items-center justify-center rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_time)">
                <path
                  d="M3.36536 5.73776L1.69193 5.63588C2.89145 2.46989 6.33537 0.666652 9.69311 1.5632C13.2694 2.51812 15.3936 6.17409 14.4377 9.72904C13.4818 13.284 9.80777 15.3918 6.23151 14.4369C3.57617 13.7278 1.72132 11.5298 1.33337 8.98964"
                  stroke="#B0B0B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5.33337V8.00004L9.33333 9.33337"
                  stroke="#B0B0B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_time">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button className="flex h-[26px] w-[26px] items-center justify-center rounded bg-gradient-to-r from-[#A06AFF] to-[#482090]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.23744 14.6667C17.3856 12.6667 12.8226 4.66671 7.28184 1.33337C6.63024 3.66671 5.65229 4.33337 3.69669 6.66671C1.10752 9.75597 2.39304 13.3334 5.97817 14.6667C5.43497 14 4.0331 12.6006 5.00004 10.6667C5.33338 10 6.00004 9.33337 5.66671 8.00004C6.31856 8.33337 7.66671 8.66671 8.00004 10.3334C8.54324 9.66671 9.10697 8.26671 8.58557 6.66671C12.6667 9.66671 11 12.6667 9.23744 14.6667Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6">
        <VideoPost
          author={{
            name: "John Smith",
            avatar: "/placeholder.svg",
          }}
          timestamp="January 31, 5:10 PM"
          title="New Tools for Crypto Analytics"
          videoUrl="https://api.builder.io/api/v1/image/assets/TEMP/e4b8b038e464896411fd0b568f4594d8cfdf3453?width=2086"
          sentiment="bullish"
          likes={1500}
          comments={563}
          isFollowing={false}
        />

        <VideoPost
          author={{
            name: "John Smith",
            avatar: "/placeholder.svg",
          }}
          timestamp="January 31, 5:10 PM"
          title="New Tools for Crypto Analytics"
          content="On the other hand, the continued development of various activities significantly drives the creation of new strategic directions. In this context, introducing a new organizational model serves as a valuable experiment in testing growth frameworks. High-level strategic thinking, along with the strengthening and evolution of internal structures, plays a key role in shaping effective training systems that address current workforce needs. Our broad and diverse experience — supported by ongoing communication and outreach — helps lay the groundwork for inclusive, large-scale participation. At the same time, it's important to recognize that effective training enables a wider range of professionals to actively shape their roles and responsibilities in meeting organizational goals."
          videoUrl="https://api.builder.io/api/v1/image/assets/TEMP/e4b8b038e464896411fd0b568f4594d8cfdf3453?width=2086"
          sentiment="bullish"
          likes={1500}
          comments={563}
          isFollowing={true}
        />

        <PostCard
          author={{
            name: "John Smith",
            avatar: "/placeholder.svg",
          }}
          category="Idea"
          timestamp="January 31, 5:10 PM"
          title="AI Constructs Threaten Emerging Economies"
          content="In recent years, artificial intelligence (AI) has become an integral part of the global economy. However, its impact on emerging economies raises serious concerns."
          image="https://api.builder.io/api/v1/image/assets/TEMP/23fc35ab171b1cddbf955c164017b8e4c372f935?width=1198"
          sentiment="bearish"
          likes={1200}
          comments={340}
        />
      </div>
    </div>
  );
};

export default SocialFeed;

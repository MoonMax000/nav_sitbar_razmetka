import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostCard from "@/components/PostCard/PostCard";
import VideoPost from "@/components/PostCard/VideoPost";

type TabType = "popular" | "editors" | "foryou" | "following";
type FilterType = "all" | "video";

type SentimentType = "bullish" | "bearish";

type SocialPostType = "video" | "article";

type SocialAuthor = {
  name: string;
  avatar: string;
  handle?: string;
  verified?: boolean;
};

type SocialPost = {
  id: string;
  type: SocialPostType;
  author: SocialAuthor;
  timestamp: string;
  title: string;
  category?: string;
  preview?: string;
  body?: string;
  videoUrl?: string;
  mediaUrl?: string;
  sentiment: SentimentType;
  likes: number;
  comments: number;
  isFollowing?: boolean;
  hashtags?: string[];
  views?: number;
};

const POSTS: SocialPost[] = [
  {
    id: "crypto-video",
    type: "video",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg",
      handle: "@johncrypto",
      verified: true,
    },
    timestamp: "January 31, 5:10 PM",
    title: "New Tools for Crypto Analytics",
    preview: "Short teaser about our upcoming analytics dashboard launch.",
    videoUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/e4b8b038e464896411fd0b568f4594d8cfdf3453?width=2086",
    sentiment: "bullish",
    likes: 1500,
    comments: 563,
    isFollowing: false,
    hashtags: ["MacroInvesting", "SmartTrading", "HedgeFundTactics"],
  },
  {
    id: "crypto-video-long",
    type: "video",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg",
      handle: "@johncrypto",
    },
    timestamp: "January 31, 5:10 PM",
    title: "New Tools for Crypto Analytics",
    preview:
      "On the other hand, the continued development of various activities significantly drives the creation of new strategic directions.",
    body:
      "On the other hand, the continued development of various activities significantly drives the creation of new strategic directions. In this context, introducing a new organizational model serves as a valuable experiment in testing growth frameworks. High-level strategic thinking, along with the strengthening and evolution of internal structures, plays a key role in shaping effective training systems that address current workforce needs.\n\nOur broad and diverse experience — supported by ongoing communication and outreach — helps lay the groundwork for inclusive, large-scale participation. At the same time, it’s important to recognize that effective training enables a wider range of professionals to actively shape their roles and responsibilities in meeting organizational goals.",
    videoUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/e4b8b038e464896411fd0b568f4594d8cfdf3453?width=2086",
    sentiment: "bullish",
    likes: 1500,
    comments: 563,
    isFollowing: true,
    hashtags: ["MacroInvesting", "SmartTrading", "HedgeFundTactics"],
  },
  {
    id: "ai-article",
    type: "article",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg",
    },
    category: "Idea",
    timestamp: "January 31, 5:10 PM",
    title: "AI Constructs Threaten Emerging Economies",
    preview:
      "In recent years, artificial intelligence (AI) has become an integral part of the global economy. However, its impact on emerging economies raises serious concerns.",
    body:
      "Do This To Win Like Hedge Funds\n\nHedge funds don’t just beat the market by luck, they use proven strategies. Here’s how you can apply their tactics:\n\n• Focus on asymmetric risk/reward — Only take trades where potential upside >> downside. Hedge funds target 3:1 or better.\n• Be contrarian — The biggest profits come when you go against the crowd. Buy fear, sell greed.\n• Use leverage wisely — Hedge funds amplify gains with controlled risk. Never over-leverage.\n• Stay disciplined — Stick to your strategy. Emotional trading kills returns.\n• Diversify beyond stocks — Explore options, futures, arbitrage, and macro trends.\n\nMost traders fail because they chase hype. Winners think like institutions. Write in the comments what investment strategy you follow.\n\n#MacroInvesting #SmartTrading #HedgeFundTactics",
    mediaUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/23fc35ab171b1cddbf955c164017b8e4c372f935?width=1198",
    sentiment: "bearish",
    likes: 1200,
    comments: 340,
    hashtags: ["MacroInvesting", "SmartTrading", "HedgeFundTactics"],
    views: 5,
  },
];

const SocialFeed: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredPosts = useMemo(() => {
    if (filter === "video") {
      return POSTS.filter((post) => post.type === "video");
    }
    return POSTS;
  }, [filter]);

  const handleOpenPost = (post: SocialPost) => {
    navigate(`/social/post/${post.id}`, { state: post });
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "popular", label: "Popular" },
    { id: "editors", label: "Editor's picks" },
    { id: "foryou", label: "For you" },
    { id: "following", label: "Following" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 pb-12">
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate("/social/create")}
          className="flex items-center gap-2 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 py-2 text-sm font-semibold text-[#B0B0B0] transition-colors duration-200 hover:border-[#A06AFF] hover:text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path d="M11.6667 5L6.66675 10L11.6667 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to creator
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-1 backdrop-blur-[50px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 rounded-[32px] px-4 py-3 transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white"
                : "border border-[#181B22] bg-[rgba(12,16,20,0.50)] text-[#B0B0B0] backdrop-blur-[58px]"
            }`}
          >
            <span className="text-[15px] font-bold leading-normal">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`flex h-8 items-center justify-center gap-2 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 backdrop-blur-[58px] ${
              filter === "all" ? "ring-2 ring-[#A06AFF]" : ""
            }`}
          >
            <span className="text-[15px] font-bold leading-normal text-[#B0B0B0]">All Posts</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
            >
              <path d="M6 9L12 15L18 9" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`flex h-[26px] items-center justify-center gap-2 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 backdrop-blur-[50px] ${
              filter === "video" ? "ring-2 ring-[#A06AFF]" : ""
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-[15px] font-bold leading-normal text-[#B0B0B0]">Videos Only</span>
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-1 backdrop-blur-[50px]">
          <button className="flex h-[26px] w-[26px] items-center justify-center rounded">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      <div className="flex flex-col gap-6">
        {filteredPosts.map((post) => {
          if (post.type === "video" && post.videoUrl) {
            return (
              <VideoPost
                key={post.id}
                author={post.author}
                timestamp={post.timestamp}
                title={post.title}
                content={post.body ?? post.preview}
                videoUrl={post.videoUrl}
                sentiment={post.sentiment}
                likes={post.likes}
                comments={post.comments}
                isFollowing={post.isFollowing}
                hashtags={post.hashtags}
                truncate
                onOpen={() => handleOpenPost(post)}
              />
            );
          }

          return (
            <PostCard
              key={post.id}
              author={{ name: post.author.name, avatar: post.author.avatar }}
              category={post.category}
              timestamp={post.timestamp}
              title={post.title}
              content={post.preview}
              image={post.mediaUrl}
              sentiment={post.sentiment}
              likes={post.likes}
              comments={post.comments}
              onOpen={() => handleOpenPost(post)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SocialFeed;

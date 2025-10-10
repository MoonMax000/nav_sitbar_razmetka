import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostCard from "@/components/PostCard/PostCard";
import VideoPost from "@/components/PostCard/VideoPost";
import SuggestedProfilesWidget, { SuggestedProfile } from "@/components/SocialFeedWidgets/SuggestedProfilesWidget";
import TrendingTopicsWidget, { TrendingTopic } from "@/components/SocialFeedWidgets/TrendingTopicsWidget";
import {
  FilterType,
  SocialPost,
  TabType,
  socialPosts,
} from "@/data/socialPosts";

const POSTS: SocialPost[] = socialPosts;

const SUGGESTED_PROFILES: SuggestedProfile[] = [
  {
    id: "lark-davis",
    name: "Lark Davis",
    handle: "@TheCryptoLark",
    avatar: "https://i.pravatar.cc/120?img=12",
    verified: true,
  },
  {
    id: "xbox",
    name: "Xbox",
    handle: "@Xbox",
    avatar: "https://i.pravatar.cc/120?img=25",
    verified: true,
  },
  {
    id: "si-paling-masker",
    name: "Si Paling Masker",
    handle: "@TipeDarah",
    avatar: "https://i.pravatar.cc/120?img=47",
    verified: true,
  },
];

const TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: "axios-show",
    category: "Live",
    headline: "The Axios Show",
    meta: "Now streaming · Axios",
  },
  {
    id: "bear-trend",
    category: "Trending in Vietnam",
    headline: "Bear",
    meta: "121K posts",
  },
  {
    id: "quiet-trend",
    category: "Trending in Vietnam",
    headline: "Quiet",
    meta: "163K posts",
  },
  {
    id: "thanh-trend",
    category: "Trending in Vietnam",
    headline: "Thành",
    meta: "32.1K posts",
  },
  {
    id: "purple-pepe",
    category: "Trending in Vietnam",
    headline: "Purple Pepe",
    meta: "18.5K posts",
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
    <div className="flex w-full justify-center pb-12">
      <div className="grid w-full max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,320px)]">
        <section className="flex min-h-screen w-full max-w-[720px] flex-col gap-6 justify-self-center lg:justify-self-start">
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
        </section>
        <aside className="hidden w-full max-w-[320px] flex-col gap-5 lg:flex">
          <div className="sticky top-28 flex flex-col gap-5">
            <div className="relative">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7080]"
                aria-hidden
              >
                <path
                  d="M16.6663 16.6663L14.1663 14.1663M14.9997 9.16634C14.9997 12.1089 12.6083 14.4997 9.66634 14.4997C6.72374 14.4997 4.33301 12.1089 4.33301 9.16634C4.33301 6.22374 6.72374 3.83301 9.66634 3.83301C12.6089 3.83301 14.9997 6.22374 14.9997 9.16634Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.8)] py-3 pl-11 pr-4 text-sm font-medium text-white placeholder:text-[#6C7080] shadow-[0_14px_30px_rgba(10,12,16,0.35)] transition focus:border-[#A06AFF] focus:outline-none focus:ring-2 focus:ring-[#A06AFF]/40"
              />
            </div>
            <SuggestedProfilesWidget profiles={SUGGESTED_PROFILES} />
            <TrendingTopicsWidget topics={TRENDING_TOPICS} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SocialFeed;

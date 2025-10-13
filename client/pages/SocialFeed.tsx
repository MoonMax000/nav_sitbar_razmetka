import type { FC } from "react";
import { type FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostVariants from "@/components/CreatePostBox/CreatePostVariants";
import FeedPost from "@/components/PostCard/VideoPost";
import SocialRightSidebar from "@/components/SocialFeedWidgets/SocialRightSidebar";
import {
  DEFAULT_SUGGESTED_PROFILES,
  DEFAULT_TRENDING_TOPICS,
} from "@/components/SocialFeedWidgets/sidebarData";
import {
  type FilterType,
  type SocialPost,
  type TabType,
  socialPosts,
} from "@/data/socialPosts";

interface TabDefinition {
  id: TabType;
  label: string;
  description: string;
}

const POSTS: SocialPost[] = socialPosts;

const FEED_TABS: TabDefinition[] = [
  {
    id: "popular",
    label: "В тренде",
    description: "Самые обсуждаемые идеи сообщества",
  },
  {
    id: "editors",
    label: "Выбор редакции",
    description: "Подборка от экспертов Tyrian",
  },
  {
    id: "foryou",
    label: "Для вас",
    description: "Персональные рекомендации по интересам",
  },
  {
    id: "following",
    label: "Подписки",
    description: "Авторы и команды, за которыми вы следите",
  },
];

const SocialFeed: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const [filter, setFilter] = useState<FilterType>("all");

  const postsForTab = useMemo(() => {
    switch (activeTab) {
      case "popular":
        return [...POSTS].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
      case "editors": {
        const curated = POSTS.filter(
          (post) => (post.views ?? 0) > 0 || post.category,
        );
        return curated.length > 0 ? curated : [...POSTS];
      }
      case "foryou":
        return [...POSTS].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      case "following":
        return POSTS.filter((post) => post.isFollowing);
      default:
        return POSTS;
    }
  }, [activeTab]);

  const postsToDisplay = useMemo(() => {
    if (filter === "video") {
      return postsForTab.filter((post) => post.type === "video");
    }

    return postsForTab;
  }, [filter, postsForTab]);

  const filterCounts = useMemo(
    () => ({
      all: postsForTab.length,
      video: postsForTab.filter((post) => post.type === "video").length,
    }),
    [postsForTab],
  );

  const openExplore = useCallback(() => {
    navigate("/social/explore");
  }, [navigate]);

  const handleOpenPost = useCallback(
    (post: SocialPost) => {
      navigate(`/social/post/${post.id}`, { state: post });
    },
    [navigate],
  );

  const handleResetFilters = useCallback(() => {
    setFilter("all");
  }, []);

  const isFollowingTab = activeTab === "following";
  const isVideoFilterEmpty = filter === "video" && filterCounts.video === 0;

  const emptyTitle = isFollowingTab
    ? "Здесь появятся идеи людей, на которых вы подписаны"
    : isVideoFilterEmpty
      ? "В��део пока н�� найдены"
      : "Записей пока нет";

  const emptyDescription = isFollowingTab
    ? "Подписывайтесь на трейдеров и команды в разделе «Исследовать», чтобы видеть их обновления."
    : isVideoFilterEmpty
      ? "Попробуйте показать все публикации или загляните позже — авторы уже готовят новые видео."
      : "Здесь появятся свежие аналитические материалы и треды сообщества.";

  const emptyActionLabel = isFollowingTab
    ? "Найти авто��ов"
    : isVideoFilterEmpty
      ? "Показать все посты"
      : undefined;

  const emptyAction = isFollowingTab
    ? openExplore
    : isVideoFilterEmpty
      ? handleResetFilters
      : undefined;

  return (
    <div className="flex w-full justify-center pb-12">
      <div className="grid w-full max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,320px)]">
        <section className="flex min-h-screen w-full max-w-[720px] flex-col gap-6 justify-self-center lg:justify-self-start">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-1">
              {(["foryou", "following"] as const).map((value) => {
                const isActive = activeTab === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveTab(value)}
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

            <CreatePostVariants />

            <FilterControls
              activeFilter={filter}
              counts={filterCounts}
              onFilterChange={setFilter}
              onOpenExplore={openExplore}
            />
          </div>

          {postsToDisplay.length > 0 ? (
            <div className="flex flex-col gap-6">
              {postsToDisplay.map((post) => (
                <VideoPost
                  key={post.id}
                  author={{
                    name: post.author.name,
                    avatar: post.author.avatar,
                    handle: post.author.handle,
                    verified: post.author.verified,
                  }}
                  timestamp={post.timestamp}
                  title={post.title}
                  content={post.body ?? post.preview}
                  videoUrl={post.videoUrl ?? post.mediaUrl ?? post.image ?? ""}
                  sentiment={post.sentiment}
                  likes={post.likes ?? 0}
                  comments={post.comments ?? 0}
                  isFollowing={post.isFollowing}
                  hashtags={post.hashtags}
                  truncate
                  onOpen={() => handleOpenPost(post)}
                />
              ))}
            </div>
          ) : (
            <EmptyTimeline
              title={emptyTitle}
              description={emptyDescription}
              actionLabel={emptyActionLabel}
              onAction={emptyAction}
            />
          )}
        </section>

        <SocialRightSidebar
          profiles={DEFAULT_SUGGESTED_PROFILES}
          topics={DEFAULT_TRENDING_TOPICS}
        />
      </div>
    </div>
  );
};

interface FeedTabsProps {
  tabs: TabDefinition[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const FeedTabs: FC<FeedTabsProps> = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex flex-col gap-2 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-3">
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-pressed={isActive}
            className={`flex flex-1 min-w-[140px] flex-col items-start gap-1 rounded-[32px] px-4 py-3 transition-all ${
              isActive
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
                : "border border-[#181B22] bg-[rgba(12,16,20,0.65)] text-[#B0B0B0] backdrop-blur-[58px] hover:border-[#A06AFF]/40 hover:text-white"
            }`}
          >
            <span className="text-[15px] font-semibold leading-tight">
              {tab.label}
            </span>
            <span className="text-[11px] font-medium leading-tight text-white/60">
              {tab.description}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

interface FilterControlsProps {
  activeFilter: FilterType;
  counts: Record<FilterType, number>;
  onFilterChange: (filter: FilterType) => void;
  onOpenExplore: () => void;
}

const FilterControls: FC<FilterControlsProps> = ({
  activeFilter,
  counts,
  onFilterChange,
  onOpenExplore,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="inline-flex items-center gap-3 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-1">
      {(["all", "video"] as const).map((value) => {
        const isActive = activeFilter === value;
        const isDisabled = value === "video" && counts.video === 0;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            disabled={isDisabled}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white"
                : "text-[#B0B0B0] hover:text-white"
            } ${isDisabled ? "opacity-60" : ""}`}
          >
            <span>{value === "all" ? "Все посты" : "Только видео"}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>

    <button
      type="button"
      onClick={onOpenExplore}
      className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#A06AFF]/10 px-4 py-2 text-sm font-semibold text-[#E3D8FF] transition hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white"
    >
      Открыть «Исследовать»
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          d="M10.7402 15.53L14.2602 12L10.7402 8.46997"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

interface EmptyTimelineProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyTimeline: FC<EmptyTimelineProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#181B22] bg-[rgba(12,16,20,0.4)] p-10 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A06AFF]/20 text-[#A06AFF]">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 11V7C7 5.11438 7 4.17157 7.58579 3.58579C8.17157 3 9.11438 3 11 3H13C14.8856 3 15.8284 3 16.4142 3.58579C17 4.17157 17 5.11438 17 7V11M5 9H19V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="max-w-[360px] text-sm text-[#B0B0B0]">{description}</p>
    {actionLabel && onAction ? (
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
      >
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default SocialFeed;

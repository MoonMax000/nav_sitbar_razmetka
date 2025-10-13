import { useState } from "react";
import { socialPosts } from "@/data/socialPosts";
import type { SocialPost } from "@/data/socialPosts";

const CURRENT_USER_PROFILE: SocialPost["author"] = {
  name: "Devid Capital",
  avatar: "https://i.pravatar.cc/120?img=12",
  handle: "@devidcapital",
  verified: true,
  bio: "Founder of Devid Capital. Macro strategist distilling market edge into daily desk notes.",
  followers: 405800,
  following: 253,
  isCurrentUser: true,
};

const PERSONAL_POST_BODY = [
  "Мы завершили квартальный аудит нашего портфеля и усилили долю в макро-технологических идеях. Это решение родилось после нескольких недель тестов на деске: показатели риска/доходности по новым позициям на основе ликвидности и хеджей остаются в верхних 10%.",
  "На выходных мы провели сессию с командой по стресс-тестам, чтобы убедиться, что портфель выдерживает волатильность сырьевых рынков. Делюсь ключевыми выводами: мы оставляем смещённую дельту на длинные позиции в AI-инфраструктуре, добавляем тактические опционы на защиту и обнуляем старые контртрендовые позиции, что даёт нам возможность маневра, если ликвидность сузится.",
  "Запускаем небольшой AMA вечером, отвечу на вопросы по risk management и обновлённой модели входов. Пишите то, что хотите разобрать в первую очередь.",
].join("\n\n");
import TweetForm from "@/components/socialComposer/TweetForm";
import Timeline from "@/components/socialComposer/Timeline";
import SocialRightSidebar from "@/components/SocialFeedWidgets/SocialRightSidebar";
import {
  DEFAULT_SUGGESTED_PROFILES,
  DEFAULT_NEWS_ITEMS,
} from "@/components/SocialFeedWidgets/sidebarData";

export default function HomePage() {
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const personalPost: SocialPost = {
      id: "personal-highlight",
      type: "article",
      author: { ...CURRENT_USER_PROFILE },
      timestamp: new Date().toLocaleString(),
      title: "Почему мы усилили макро-технологии в портфеле",
      preview: PERSONAL_POST_BODY,
      body: PERSONAL_POST_BODY,
      sentiment: "bullish",
      likes: 256,
      comments: 74,
      hashtags: ["MacroStrategy", "DeskNotes", "RiskManagement"],
      views: 4058,
      category: "Insight",
    };

    return [personalPost, ...socialPosts];
  });

  const handleCreatePost = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      type: "article",
      author: { ...CURRENT_USER_PROFILE },
      timestamp: new Date().toLocaleString(),
      title: trimmed.substring(0, 70) + (trimmed.length > 70 ? "..." : ""),
      preview: trimmed,
      body: trimmed,
      sentiment: "bullish",
      likes: 0,
      comments: 0,
      hashtags: [],
      views: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="flex w-full gap-8">
      <div className="flex-1 max-w-[720px]">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80">
          <div className="px-4 py-3">
            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>

          {/* Tabs */}
          <div className="flex">
            <button className="flex-1 py-4 text-white font-semibold border-b-4 border-[#A06AFF] hover:bg-[#482090]/10 transition-colors">
              For you
            </button>
            <button className="flex-1 py-4 text-muted-foreground font-semibold hover:bg-[#482090]/10 transition-colors">
              Following
            </button>
          </div>
        </div>

        {/* Create Tweet */}
        <div className="px-4 py-3">
          <TweetForm
            submitText="Post"
            onSubmit={handleCreatePost}
            placeholder="What's happening?"
            collapsedOnMount={false}
            minHeight={80}
            userAvatar={CURRENT_USER_PROFILE.avatar}
            userName={CURRENT_USER_PROFILE.name}
          />
        </div>

        {/* Timeline */}
        <Timeline posts={posts} className="mt-6" />
      </div>

      <SocialRightSidebar
        profiles={DEFAULT_SUGGESTED_PROFILES}
        newsItems={DEFAULT_NEWS_ITEMS}
      />
    </div>
  );
}

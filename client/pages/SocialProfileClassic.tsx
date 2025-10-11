import { type FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileDetails from "@/components/socialProfile/ProfileDetails";
import ProfileHero from "@/components/socialProfile/ProfileHero";
import ProfileTabs, { type ProfileTab } from "@/components/socialProfile/ProfileTabs";
import ProfileTimeline from "@/components/socialProfile/ProfileTimeline";
import { defaultProfile, getProfileTimeline } from "@/data/socialProfile";
import type { SocialPost } from "@/data/socialPosts";

const tabs: ProfileTab[] = [
  { id: "tweets", label: "Посты" },
  { id: "replies", label: "Ответы" },
  { id: "media", label: "Медиа" },
  { id: "likes", label: "Понравилось" },
];

const SocialProfileClassic: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("tweets");

  const timeline = useMemo(() => getProfileTimeline(defaultProfile), []);

  const handleOpenPost = useCallback(
    (post: SocialPost) => {
      navigate(`/social/post/${post.id}`, { state: post });
    },
    [navigate],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1150px] flex-col gap-6 pb-12">
      <ProfileHero profile={defaultProfile} />
      <ProfileDetails profile={defaultProfile} />
      <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileTimeline
        posts={timeline}
        activeTab={activeTab}
        highlightedPostId={defaultProfile.highlightedPostId}
        onOpenPost={handleOpenPost}
      />
    </div>
  );
};

export default SocialProfileClassic;

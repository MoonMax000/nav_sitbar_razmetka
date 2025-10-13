"use client";

import { useState, useEffect } from "react";
import { defaultProfile, getProfileTimeline } from "@/data/socialProfile";
import type { SocialProfileData } from "@/data/socialProfile";
import type { SocialPost } from "@/data/socialPosts";
import ProfileHero from "@/components/socialProfile/ProfileHero";
import ProfileDetails from "@/components/socialProfile/ProfileDetails";
import ProfileTabs from "@/components/socialProfile/ProfileTabs";
import ProfileTimeline from "@/components/socialProfile/ProfileTimeline";

interface ProfilePageProps {
  userId?: string;
}

const profileTabs = [
  { id: "posts", label: "Посты" },
  { id: "replies", label: "Ответы" },
  { id: "media", label: "Медиа" },
  { id: "likes", label: "Лайки" },
];

export default function ProfilePage({ userId }: ProfilePageProps) {
  const [profile, setProfile] = useState<SocialProfileData | null>(null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // For now, always use defaultProfile
      // In real app, fetch profile by userId
      setProfile(defaultProfile);
      setPosts(getProfileTimeline(defaultProfile));

      setIsLoading(false);
    };

    loadProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-4">
      <ProfileHero profile={profile} />
      <ProfileDetails profile={profile} />
      <ProfileTabs tabs={profileTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileTimeline posts={posts} />
    </div>
  );
}

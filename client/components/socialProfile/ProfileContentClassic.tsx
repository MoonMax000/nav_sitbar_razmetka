import { type CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultProfile, getProfileTimeline } from "@/data/socialProfile";
import type { SocialProfileData } from "@/data/socialProfile";
import type { SocialPost } from "@/data/socialPosts";
import ProfileHero from "./ProfileHero";
import ProfileBioClassic from "./ProfileBioClassic";
import TabListClassic from "./TabListClassic";
import ProfileTweetsClassic from "./ProfileTweetsClassic";

export default function ProfileContentClassic() {
  const [profile, setProfile] = useState<SocialProfileData | null>(null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user_id } = useParams();

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // For now, always use defaultProfile
      // In real app, fetch profile by user_id
      setProfile(defaultProfile);
      setPosts(getProfileTimeline(defaultProfile));
      
      setIsLoading(false);
    };

    loadProfile();
  }, [user_id]);

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

  const tweetsCount = posts.length;

  return (
    <div className="min-h-screen" style={{ "--profile-image-size": "120px" } as CSSProperties}>
      <ProfileHero profile={profile} />
      <main className="mt-6">
        <div className="px-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-[#888] mt-1">@{profile.username}</p>
            <p className="text-white mt-3">{profile.bio}</p>
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <span className="font-bold text-white">{profile.stats.following}</span>
                <span className="text-[#888] ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">{profile.stats.followers}</span>
                <span className="text-[#888] ml-1">Followers</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <TabListClassic />
          </div>
        </div>
        <ProfileTweetsClassic posts={posts} />
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { defaultProfile, getProfileTimeline } from "@/data/socialProfile";
import type { SocialProfileData } from "@/data/socialProfile";
import type { SocialPost } from "@/data/socialPosts";
import ProfileHeaderClassic from "./ProfileHeaderClassic";
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
    <div className="min-h-screen" style={{ "--profile-image-size": "120px" } as React.CSSProperties}>
      <ProfileHeaderClassic profile={profile} tweetsCount={tweetsCount} />
      <main>
        <ProfileBioClassic profile={profile} isOwnProfile={false} />
        <div className="mt-8">
          <TabListClassic />
        </div>
        <ProfileTweetsClassic posts={posts} />
      </main>
    </div>
  );
}

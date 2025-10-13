import ProfileContentClassic from "@/components/socialProfile/ProfileContentClassic";
import SocialRightSidebar from "@/components/SocialFeedWidgets/SocialRightSidebar";
import {
  DEFAULT_SUGGESTED_PROFILES,
  DEFAULT_NEWS_ITEMS,
} from "@/components/SocialFeedWidgets/sidebarData";

export default function ProfilePage() {
  return (
    <div className="flex w-full gap-8">
      <div className="flex-1 max-w-[720px]">
        <ProfileContentClassic />
      </div>
      <SocialRightSidebar
        profiles={DEFAULT_SUGGESTED_PROFILES}
        topics={DEFAULT_TRENDING_TOPICS}
      />
    </div>
  );
}

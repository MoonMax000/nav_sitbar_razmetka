import ProfileContentClassic from "@/components/socialProfile/ProfileContentClassic";
import SocialRightSidebar from "@/components/SocialFeedWidgets/SocialRightSidebar";
import {
  DEFAULT_SUGGESTED_PROFILES,
  DEFAULT_TRENDING_TOPICS,
} from "@/components/SocialFeedWidgets/sidebarData";

export default function ProfilePage() {
  return (
    <div className="flex w-full justify-center pb-12">
      <div className="grid w-full max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,320px)]">
        <section className="flex w-full max-w-[720px] flex-col gap-6">
          <ProfileContentClassic />
        </section>
        <SocialRightSidebar
          profiles={DEFAULT_SUGGESTED_PROFILES}
          topics={DEFAULT_TRENDING_TOPICS}
        />
      </div>
    </div>
  );
}

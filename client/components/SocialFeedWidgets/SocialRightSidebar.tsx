import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SuggestedProfilesWidget, {
  type SuggestedProfile,
} from "./SuggestedProfilesWidget";
import TrendingTopicsWidget, { type TrendingTopic } from "./TrendingTopicsWidget";
import {
  DEFAULT_SUGGESTED_PROFILES,
  DEFAULT_TRENDING_TOPICS,
} from "./sidebarData";

interface SocialRightSidebarProps {
  profiles?: SuggestedProfile[];
  topics?: TrendingTopic[];
  showSearch?: boolean;
  className?: string;
}

const SocialRightSidebar: React.FC<SocialRightSidebarProps> = ({
  profiles = DEFAULT_SUGGESTED_PROFILES,
  topics = DEFAULT_TRENDING_TOPICS,
  showSearch = true,
  className,
}) => {
  return (
    <aside className={cn("hidden w-full max-w-[320px] flex-col gap-5 lg:flex", className)}>
      <div className="sticky top-28 flex flex-col gap-5">
        {showSearch ? (
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7080] z-10"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Поиск по авторам и темам"
              className="w-full rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.8)] py-3 pl-11 pr-4 text-sm font-medium text-white placeholder:text-[#6C7080] shadow-[0_14px_30px_rgba(10,12,16,0.35)] transition focus:border-[#A06AFF] focus:outline-none focus:ring-2 focus:ring-[#A06AFF]/40"
            />
          </div>
        ) : null}
        <SuggestedProfilesWidget profiles={profiles} />
        <TrendingTopicsWidget topics={topics} />
      </div>
    </aside>
  );
};

export default SocialRightSidebar;

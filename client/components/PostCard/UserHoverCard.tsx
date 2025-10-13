import { type FC, type MouseEvent, type ReactNode } from "react";

import UserAvatar from "@/components/ui/Avatar/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

import type { FeedPostProps } from "./VideoPost";
import VerifiedBadge from "./VerifiedBadge";

interface UserHoverCardProps {
  author: FeedPostProps["author"];
  isFollowing: boolean;
  onFollowClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const formatCount = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return value.toLocaleString();
};

const UserHoverCard: FC<UserHoverCardProps> = ({ author, isFollowing, onFollowClick, children }) => {
  const followers = typeof author.followers === "number" ? author.followers : undefined;
  const following = typeof author.following === "number" ? author.following : undefined;

  const followersLabel = typeof followers === "number" ? formatCount(followers) : null;
  const followingLabel = typeof following === "number" ? formatCount(following) : null;

  const followButtonClasses = isFollowing
    ? "border border-[#f44] bg-transparent text-[#f44] hover:bg-[rgba(244,68,68,0.12)]"
    : "bg-white text-black hover:bg-[#E9E9E9]";

  return (
    <HoverCard openDelay={150} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        align="start"
        sideOffset={16}
        className="w-[320px] rounded-[28px] border border-[#1B1F2A] bg-[rgba(10,12,18,0.95)] p-5 shadow-[0_24px_56px_rgba(2,6,18,0.58)] backdrop-blur-[28px]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={author.avatar}
              alt={author.name}
              size={52}
              containerClassName="shadow-[0_18px_42px_-22px_rgba(160,106,255,0.75)]"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-base font-semibold leading-tight text-white">
                <span>{author.name}</span>
                {author.verified ? <VerifiedBadge size={16} /> : null}
              </div>
              {author.handle ? <span className="text-sm font-medium text-[#8E92A0]">{author.handle}</span> : null}
            </div>
          </div>
          <button
            type="button"
            className={cn(
              "flex h-9 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors duration-200",
              followButtonClasses,
            )}
            aria-pressed={isFollowing}
            onClick={(event) => {
              event.stopPropagation();
              onFollowClick(event);
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {author.bio ? (
          <p className="mt-3 text-sm leading-relaxed text-white/80">{author.bio}</p>
        ) : null}

        {(followersLabel || followingLabel) ? (
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#8E92A0]">
            {followingLabel ? (
              <span>
                <span className="font-semibold text-white">{followingLabel}</span> Following
              </span>
            ) : null}
            {followersLabel ? (
              <span>
                <span className="font-semibold text-white">{followersLabel}</span> Followers
              </span>
            ) : null}
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;

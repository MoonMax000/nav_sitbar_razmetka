import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { SocialProfileData } from "@/data/socialProfile";

interface ProfileHeroProps {
  profile: SocialProfileData;
  onEdit?: () => void;
  tweetsCount?: number;
  isOwnProfile?: boolean;
}

const ProfileHero: FC<ProfileHeroProps> = ({ profile, onEdit, tweetsCount = 0, isOwnProfile = true }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const iconButtonClass =
    "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-[#F7F9F9] shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 before:absolute before:inset-x-3 before:-top-1 before:h-1 before:rounded-full before:bg-white/40 before:opacity-0 before:transition-opacity before:duration-200 group-hover:before:opacity-70";

  const primaryActionButtonClass =
    "group relative flex items-center justify-center overflow-hidden rounded-full border border-black/30 bg-[rgba(25,25,25,0.65)] px-6 py-2.5 text-[15px] font-semibold text-[#F7F9F9] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A06AFF]/40 hover:bg-[rgba(32,32,32,0.75)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_36px_rgba(0,0,0,0.5)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black before:absolute before:inset-x-4 before:-top-1 before:h-1 before:rounded-full before:bg-white/50 before:opacity-0 before:transition-opacity before:duration-200 group-hover:before:opacity-100";

  return (
    <section className="relative mb-6">
      {/* Header bar with back button - Sticky with glass effect */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80">
        <div className="flex items-center gap-9 px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-5 w-5 items-center justify-center rounded-full text-[#F7F9F9] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.19006 11.46L10.3926 16.5L9.21423 17.92L3.00006 10.46L9.21423 3L10.3926 4.42L6.19006 9.46H17.5117V11.46H6.19006Z"
              fill="#F7F9F9"
            />
          </svg>
        </button>
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold leading-6 text-[#F7F9F9]">
              {profile.name}
            </h2>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.9999 10.5C18.9837 9.9156 18.8054 9.34658 18.4843 8.85717C18.1641 8.36867 17.7135 7.97786 17.1834 7.72999C17.3852 7.18087 17.4277 6.58653 17.3101 6.01389C17.1916 5.44035 16.9147 4.91204 16.5122 4.48776C16.087 4.0852 15.5596 3.80928 14.986 3.68987C14.4134 3.57226 13.8191 3.61478 13.2699 3.81652C13.023 3.28549 12.6331 2.83408 12.1437 2.51384C11.6543 2.19359 11.0852 2.01447 10.4999 2C9.91554 2.01538 9.34833 2.19269 8.85983 2.51384C8.37132 2.83498 7.98323 3.2864 7.73807 3.81652C7.18805 3.61478 6.59189 3.57046 6.01745 3.68987C5.443 3.80747 4.91379 4.08429 4.4886 4.48776C4.08604 4.91294 3.81103 5.44216 3.69433 6.01479C3.57673 6.58743 3.62196 7.18178 3.8246 7.72999C3.29357 7.97786 2.84125 8.36776 2.5192 8.85627C2.19715 9.34477 2.01713 9.9147 1.99994 10.5C2.01803 11.0853 2.19715 11.6543 2.5192 12.1437C2.84125 12.6322 3.29357 13.023 3.8246 13.27C3.62196 13.8182 3.57673 14.4126 3.69433 14.9852C3.81193 15.5587 4.08604 16.0871 4.4877 16.5122C4.91288 16.913 5.44119 17.188 6.01383 17.3065C6.58646 17.4259 7.18081 17.3825 7.72993 17.1835C7.9778 17.7136 8.3677 18.1641 8.85711 18.4853C9.34562 18.8055 9.91554 18.9837 10.4999 19C11.0852 18.9855 11.6543 18.8073 12.1437 18.4871C12.6331 18.1668 13.023 17.7145 13.2699 17.1844C13.8164 17.4006 14.4152 17.4522 14.9915 17.3327C15.5668 17.2133 16.0951 16.9284 16.5113 16.5122C16.9274 16.0961 17.2133 15.5678 17.3327 14.9915C17.4521 14.4153 17.4005 13.8164 17.1834 13.27C17.7135 13.0221 18.1641 12.6322 18.4852 12.1428C18.8054 11.6543 18.9837 11.0853 18.9999 10.5018V10.5Z"
                fill="#A06AFF"
              />
            </svg>
          </div>
          <p className="text-[13px] font-normal leading-4 text-[#8B98A5]">
            {tweetsCount} post
          </p>
        </div>
        </div>
      </div>

      {/* Cover/Banner image */}
      <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#141923] to-[#0B0E13]">
        {profile.cover ? (
          <img src={profile.cover} alt={`${profile.name} cover`} className="h-[200px] w-full object-cover" />
        ) : (
          <div className="h-[200px] w-full" />
        )}
      </div>

      <div className="px-6 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="relative -mt-16 h-[132px] w-[132px] overflow-hidden rounded-full border-4 border-[#0B0E13] bg-[#121720]">
            <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="button" className={iconButtonClass}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2.5 10.0002C2.5 9.0835 3.25 8.3335 4.16667 8.3335C5.08333 8.3335 5.83333 9.0835 5.83333 10.0002C5.83333 10.9168 5.08333 11.6668 4.16667 11.6668C3.25 11.6668 2.5 10.9168 2.5 10.0002ZM10 11.6668C10.9167 11.6668 11.6667 10.9168 11.6667 10.0002C11.6667 9.0835 10.9167 8.3335 10 8.3335C9.08333 8.3335 8.33333 9.0835 8.33333 10.0002C8.33333 10.9168 9.08333 11.6668 10 11.6668ZM15.8333 11.6668C16.75 11.6668 17.5 10.9168 17.5 10.0002C17.5 9.0835 16.75 8.3335 15.8333 8.3335C14.9167 8.3335 14.1667 9.0835 14.1667 10.0002C14.1667 10.9168 14.9167 11.6668 15.8333 11.6668Z"
                  fill="#F7F9F9"
                />
              </svg>
            </button>

            <button type="button" className={iconButtonClass}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1.66501 4.58333C1.66501 3.4325 2.59751 2.5 3.74834 2.5H16.2483C17.3992 2.5 18.3317 3.4325 18.3317 4.58333V15.4167C18.3317 16.5675 17.3992 17.5 16.2483 17.5H3.74834C2.59751 17.5 1.66501 16.5675 1.66501 15.4167V4.58333ZM3.74834 4.16667C3.51834 4.16667 3.33168 4.35333 3.33168 4.58333V6.88667L9.99834 9.91833L16.665 6.88833V4.58333C16.665 4.35333 16.4783 4.16667 16.2483 4.16667H3.74834ZM16.665 8.71917L9.99834 11.7492L3.33168 8.7175V15.4167C3.33168 15.6467 3.51834 15.8333 3.74834 15.8333H16.2483C16.4783 15.8333 16.665 15.6467 16.665 15.4167V8.71917Z"
                  fill="#F7F9F9"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={isOwnProfile ? onEdit : handleFollowClick}
              className={primaryActionButtonClass}
            >
              <span className="relative z-10 text-center font-semibold leading-5">
                {isOwnProfile ? "Edit profile" : (isFollowing ? "Unfollow" : "Follow")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;

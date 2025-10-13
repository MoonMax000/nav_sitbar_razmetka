import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import type { SocialProfileData } from "@/data/socialProfile";
import { cn } from "@/lib/utils";

interface ProfileHeroProps {
  profile: SocialProfileData;
  onEdit?: () => void;
  tweetsCount?: number;
}

const ProfileHero: FC<ProfileHeroProps> = ({ profile, onEdit, tweetsCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <section className="relative mb-6">
      {/* Header bar with back button */}
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
          <div className="relative -mt-16 h-[132px] w-[132px] overflow-hidden rounded-full border-4 border-[#0B0E13] bg-[#121720] shadow-[0_18px_40px_-28px_rgba(160,106,255,0.8)]">
            <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="rounded-full border border-[#1F242B] px-4 py-2 text-sm font-semibold text-[#E0E3EB] transition hover:border-[#A06AFF]/50 hover:text-white"
            >
              Сообщение
            </button>
            <button
              type="button"
              onClick={onEdit}
              className={cn(
                "rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.9)] transition",
                onEdit ? "hover:brightness-110" : "cursor-default"
              )}
            >
              Редактировать профиль
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;

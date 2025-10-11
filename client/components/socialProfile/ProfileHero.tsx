import type { FC } from "react";

import type { SocialProfileData } from "@/data/socialProfile";
import { cn } from "@/lib/utils";

interface ProfileHeroProps {
  profile: SocialProfileData;
  onEdit?: () => void;
}

const ProfileHero: FC<ProfileHeroProps> = ({ profile, onEdit }) => {
  return (
    <section className="relative mb-20 rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.75)]">
      <div className="aspect-[3.5/1] w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#141923] to-[#0B0E13]">
        {profile.cover ? (
          <img src={profile.cover} alt={`${profile.name} cover`} className="h-full w-full object-cover" />
        ) : null}
      </div>

      <div className="px-6 pb-6 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="relative -mt-16 h-[124px] w-[124px] overflow-hidden rounded-full border-4 border-[#0B0E13] bg-[#121720] shadow-[0_18px_40px_-28px_rgba(160,106,255,0.8)]">
            <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-3">
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

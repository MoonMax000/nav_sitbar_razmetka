import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface SuggestedProfile {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  verified?: boolean;
}

interface SuggestedProfilesWidgetProps {
  title?: string;
  profiles: SuggestedProfile[];
}

const SuggestedProfilesWidget: FC<SuggestedProfilesWidgetProps> = ({
  title = 'You might like',
  profiles,
}) => {
  return (
    <section className="rounded-[24px] border border-[#181B22] bg-[rgba(12,16,20,0.72)] p-5 shadow-[0_24px_48px_rgba(10,12,16,0.45)] backdrop-blur-[40px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="rounded-full bg-[rgba(160,106,255,0.15)] px-3 py-1 text-[13px] font-medium text-[#C5A6FF]">For you</span>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {profiles.map((profile) => (
          <li key={profile.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-[#31294A] bg-[rgba(25,27,34,0.9)]">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                ) : null}
                <AvatarFallback className="text-sm font-semibold text-white">
                  {profile.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .slice(0, 2)
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[15px] font-semibold leading-tight text-white">
                  <span>{profile.name}</span>
                  {profile.verified && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                      className="text-[#A06AFF]"
                    >
                      <path
                        d="M8.33366 2.5H11.667L13.0553 4.44434L15.8337 5.00002L15.278 7.77779L17.2223 9.16601L15.278 11.1103L15.8337 13.8898L13.0553 14.4441L11.667 16.3884H8.33366L6.94544 14.4441L4.167 13.8898L4.72278 11.1103L2.77844 9.16601L4.72278 7.77779L4.167 5.00002L6.94544 4.44434L8.33366 2.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M8.88916 10L9.99994 11.1108L12.2222 8.88852" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-[#8E8E94]">{profile.handle}</span>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(160,106,255,0.4)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-3 text-sm font-semibold text-[#A06AFF] transition-colors duration-200 hover:text-white"
      >
        Show more
      </button>
    </section>
  );
};

export default SuggestedProfilesWidget;

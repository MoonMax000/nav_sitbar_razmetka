import { FC } from "react";

const UserInfoCards: FC = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Compact stats row on mobile, cards on desktop */}
      <div className="flex flex-col gap-2 md:gap-3">
        {/* Individual Investor badge - full width on mobile */}
        <div className="flex items-center gap-2 rounded-xl border border-[#2F3336] bg-[#16181C] px-3 py-2.5 md:px-4 md:py-3">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
            <path
              d="M16.6663 18.3335V14.1668C16.6663 12.5955 16.6663 11.8098 16.1782 11.3217C15.69 10.8335 14.9043 10.8335 13.333 10.8335L9.99967 18.3335L6.66634 10.8335C5.09499 10.8335 4.30932 10.8335 3.82117 11.3217C3.33301 11.8098 3.33301 12.5955 3.33301 14.1668V18.3335"
              stroke="#8B98A5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.0003 12.5L9.58366 15.8333L10.0003 17.0833L10.417 15.8333L10.0003 12.5ZM10.0003 12.5L9.16699 10.8333H10.8337L10.0003 12.5Z"
              stroke="#8B98A5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.9163 5.41675V4.58342C12.9163 2.97259 11.6105 1.66675 9.99967 1.66675C8.38884 1.66675 7.08301 2.97259 7.08301 4.58342V5.41675C7.08301 7.02758 8.38884 8.3334 9.99967 8.3334C11.6105 8.3334 12.9163 7.02758 12.9163 5.41675Z"
              stroke="#8B98A5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium text-[#F7F9F9] md:text-[15px]">
            Individual Investor
          </span>
        </div>

        {/* Compact stats grid */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {/* Followers */}
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#2F3336] bg-[#16181C] px-3 py-3 md:px-4 md:py-4">
            <span className="text-xs font-medium uppercase text-[#8B98A5]">
              Followers
            </span>
            <span className="text-lg font-bold text-[#F7F9F9] md:text-xl">85</span>
          </div>

          {/* Trading Days */}
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#2F3336] bg-[#16181C] px-3 py-3 md:px-4 md:py-4">
            <span className="text-xs font-medium uppercase text-[#8B98A5]">
              Trading Days
            </span>
            <span className="text-lg font-bold text-[#F7F9F9] md:text-xl">438</span>
          </div>

          {/* Markets - spans full width on mobile, single column on desktop */}
          <div className="col-span-2 flex items-center gap-2 rounded-xl border border-[#2F3336] bg-[#16181C] px-3 py-2.5 md:col-span-1 md:flex-col md:items-center md:justify-center md:gap-1 md:px-4 md:py-4">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 md:hidden">
              <g clipPath="url(#clip0_markets)">
                <path
                  d="M10.0003 18.3334V5.00002C10.0003 3.42867 10.0003 2.643 9.51216 2.15485C9.02399 1.66669 8.23834 1.66669 6.66699 1.66669H5.00033C3.42898 1.66669 2.6433 1.66669 2.15515 2.15485C1.66699 2.643 1.66699 3.42867 1.66699 5.00002V15C1.66699 16.5714 1.66699 17.357 2.15515 17.8452C2.6433 18.3334 3.42898 18.3334 5.00033 18.3334H10.0003Z"
                  stroke="#8B98A5"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 18.3334H15C16.5713 18.3334 17.357 18.3334 17.8452 17.8452C18.3333 17.357 18.3333 16.5714 18.3333 15V10C18.3333 8.42869 18.3333 7.643 17.8452 7.15485C17.357 6.66669 16.5713 6.66669 15 6.66669H10"
                  stroke="#8B98A5"
                  strokeWidth="1.5"
                />
                <path
                  d="M15.417 13.3333H12.917M15.417 10H12.917"
                  stroke="#8B98A5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7.08301 11.6667H4.58301M7.08301 8.33333H4.58301M7.08301 5H4.58301"
                  stroke="#8B98A5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_markets">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs font-medium uppercase text-[#8B98A5] md:block hidden">
              Markets
            </span>
            <span className="text-sm font-medium text-[#F7F9F9] md:text-center md:text-xs">
              Stock, Crypto, Forex
            </span>
          </div>
        </div>
      </div>

      {/* Bio section - more compact */}
      <div className="rounded-xl border border-[#2F3336] bg-[#16181C] px-3 py-3 md:px-4 md:py-4">
        <p className="text-sm leading-relaxed text-[#F7F9F9] md:text-[15px]">
          Hi, I'm Jane Doe. I'm a self-taught investor exploring markets with
          curiosity and discipline. I focus on long-term value, smart
          risk-taking, and staying calm when the market isn't. Always learning,
          always adapting.
        </p>
      </div>
    </div>
  );
};

export default UserInfoCards;

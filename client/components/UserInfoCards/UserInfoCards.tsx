import { FC } from 'react';

const UserInfoCards: FC = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 backdrop-blur-[50px]">
      {/* First row: Individual Investor, Followers, Trading Days */}
      <div className="flex w-full flex-col items-start gap-2 sm:flex-row">
        <div className="flex w-full items-center gap-2 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-[18px] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px] sm:w-auto sm:min-w-[320px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16.6663 18.3335V14.1668C16.6663 12.5955 16.6663 11.8098 16.1782 11.3217C15.69 10.8335 14.9043 10.8335 13.333 10.8335L9.99967 18.3335L6.66634 10.8335C5.09499 10.8335 4.30932 10.8335 3.82117 11.3217C3.33301 11.8098 3.33301 12.5955 3.33301 14.1668V18.3335" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0003 12.5L9.58366 15.8333L10.0003 17.0833L10.417 15.8333L10.0003 12.5ZM10.0003 12.5L9.16699 10.8333H10.8337L10.0003 12.5Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.9163 5.41675V4.58342C12.9163 2.97259 11.6105 1.66675 9.99967 1.66675C8.38884 1.66675 7.08301 2.97259 7.08301 4.58342V5.41675C7.08301 7.02758 8.38884 8.3334 9.99967 8.3334C11.6105 8.3334 12.9163 7.02758 12.9163 5.41675Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[15px] font-bold text-white">Individual Investor</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-2 py-2 shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
          <span className="text-xs font-bold uppercase text-[#B0B0B0]">Followers</span>
          <span className="text-[15px] font-bold text-white">85</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-2 py-2 shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
          <span className="text-xs font-bold uppercase text-[#B0B0B0]">Trading Days</span>
          <span className="text-[15px] font-bold text-white">438</span>
        </div>
      </div>

      {/* Second row: Markets */}
      <div className="flex w-full items-center gap-2 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-[18px] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip0_markets)">
            <path d="M10.0003 18.3334V5.00002C10.0003 3.42867 10.0003 2.643 9.51216 2.15485C9.02399 1.66669 8.23834 1.66669 6.66699 1.66669H5.00033C3.42898 1.66669 2.6433 1.66669 2.15515 2.15485C1.66699 2.643 1.66699 3.42867 1.66699 5.00002V15C1.66699 16.5714 1.66699 17.357 2.15515 17.8452C2.6433 18.3334 3.42898 18.3334 5.00033 18.3334H10.0003Z" stroke="#B0B0B0" strokeWidth="1.5"/>
            <path d="M10 18.3334H15C16.5713 18.3334 17.357 18.3334 17.8452 17.8452C18.3333 17.357 18.3333 16.5714 18.3333 15V10C18.3333 8.42869 18.3333 7.643 17.8452 7.15485C17.357 6.66669 16.5713 6.66669 15 6.66669H10" stroke="#B0B0B0" strokeWidth="1.5"/>
            <path d="M15.417 13.3333H12.917M15.417 10H12.917" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.08301 11.6667H4.58301M7.08301 8.33333H4.58301M7.08301 5H4.58301" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <defs>
            <clipPath id="clip0_markets">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span className="text-[15px] font-bold text-white">Stock Market; Crypto; Forex</span>
      </div>

      {/* Third row: Bio */}
      <div className="flex w-full items-center gap-2 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
        <p className="flex-1 text-[15px] font-normal leading-normal text-white">
          Hi, I'm Jane Doe. I'm a self-taught investor exploring markets with curiosity and discipline. I focus on long-term value, smart risk-taking, and staying calm when the market isn't. Always learning, always adapting.
        </p>
      </div>
    </div>
  );
};

export default UserInfoCards;

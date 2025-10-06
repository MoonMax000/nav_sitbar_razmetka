import { FC } from 'react';

const UserInfoCards: FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <div className="flex items-center gap-2 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-[18px] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px] sm:min-w-[240px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16.6666 18.3335V14.1668C16.6666 12.5955 16.6666 11.8098 16.1784 11.3217C15.6903 10.8335 14.9046 10.8335 13.3333 10.8335L9.99992 18.3335L6.66659 10.8335C5.09524 10.8335 4.30956 10.8335 3.82141 11.3217C3.33325 11.8098 3.33325 12.5955 3.33325 14.1668V18.3335" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.0001 12.5L9.58341 15.8333L10.0001 17.0833L10.4167 15.8333L10.0001 12.5ZM10.0001 12.5L9.16675 10.8333H10.8334L10.0001 12.5Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.9166 5.41675V4.58342C12.9166 2.97259 11.6108 1.66675 9.99992 1.66675C8.38909 1.66675 7.08325 2.97259 7.08325 4.58342V5.41675C7.08325 7.02758 8.38909 8.3334 9.99992 8.3334C11.6108 8.3334 12.9166 7.02758 12.9166 5.41675Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="whitespace-nowrap text-[15px] font-bold text-white">Individual Investor</span>
      </div>

      <div className="flex flex-1 min-w-[140px] flex-col items-center justify-center gap-1 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-2 py-2 text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
        <span className="text-xs font-bold uppercase text-webGray">Followers</span>
        <span className="text-[15px] font-bold text-white">85</span>
      </div>

      <div className="flex flex-1 min-w-[140px] flex-col items-center justify-center gap-1 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-2 py-2 text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
        <span className="text-xs font-bold uppercase text-webGray">Trading Days</span>
        <span className="text-[15px] font-bold text-white">438</span>
      </div>
    </div>
  );
};

export default UserInfoCards;

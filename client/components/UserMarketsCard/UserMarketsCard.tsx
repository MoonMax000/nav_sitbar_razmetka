import { FC } from 'react';

const UserMarketsCard: FC = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-[18px] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0)">
          <path d="M10.0001 18.3334V5.00002C10.0001 3.42867 10.0001 2.643 9.51191 2.15485C9.02375 1.66669 8.2381 1.66669 6.66675 1.66669H5.00008C3.42873 1.66669 2.64306 1.66669 2.15491 2.15485C1.66675 2.643 1.66675 3.42867 1.66675 5.00002V15C1.66675 16.5714 1.66675 17.357 2.15491 17.8452C2.64306 18.3334 3.42873 18.3334 5.00008 18.3334H10.0001Z" stroke="#B0B0B0" strokeWidth="1.5"/>
          <path d="M10 18.3334H15C16.5713 18.3334 17.357 18.3334 17.8452 17.8452C18.3333 17.357 18.3333 16.5714 18.3333 15V10C18.3333 8.42869 18.3333 7.643 17.8452 7.15485C17.357 6.66669 16.5713 6.66669 15 6.66669H10" stroke="#B0B0B0" strokeWidth="1.5"/>
          <path d="M15.4167 13.3333H12.9167M15.4167 10H12.9167" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7.08325 11.6667H4.58325M7.08325 8.33333H4.58325M7.08325 5H4.58325" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span className="text-[15px] font-bold text-white">Stock Market; Crypto; Forex</span>
    </div>
  );
};

export default UserMarketsCard;

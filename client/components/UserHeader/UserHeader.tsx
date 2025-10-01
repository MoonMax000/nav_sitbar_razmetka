import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  isOwn?: boolean;
  className?: string;
}

const UserHeader: FC<Props> = ({ isOwn = true, className }) => {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Background with blur effect */}
      <div className="absolute inset-0 -z-10 h-48 overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F7ee0e08331ad4de59dd7fa404556ca59%2F64ebe2e51c6d46bcab38ebc9e0f78a15?format=webp&width=3840"
          alt=""
          className="w-full h-full object-cover"
          style={{ backdropFilter: 'blur(17.4px)' }}
        />
        <div className="absolute inset-0 bg-black/[0.01]" style={{ backdropFilter: 'blur(6.65px)' }} />
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-6 pt-4 pb-6">
        {/* Left section: Avatar + Info + Stats */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Avatar */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F7ee0e08331ad4de59dd7fa404556ca59%2F18a068f999d64b54b143e3afad1942e8?format=webp&width=320"
            alt="Profile"
            className="w-40 h-40 rounded-2xl border border-[#181B22] shadow-[0_6.711px_11.409px_-1.342px_rgba(0,0,0,0.28)] flex-shrink-0"
          />

          {/* User info + Stats + Logo */}
          <div className="flex flex-col justify-between h-40 gap-2">
            {/* Username and badges */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0">
                <div className="flex items-center gap-1">
                  <h1 className="text-2xl font-bold text-white">beautydoe</h1>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="flex-shrink-0">
                    <path d="M11.5143 2.59327C11.8265 2.46891 12.1735 2.46891 12.4857 2.59327C13.4921 2.99406 13.6887 4.53744 14.8762 4.62336C15.7124 4.68386 16.533 3.98677 17.3721 4.19574C17.7105 4.28003 18.0028 4.49579 18.186 4.79657C18.7472 5.71824 18.0229 7.07292 18.9383 7.83768C19.5743 8.36877 20.6251 8.30004 21.178 8.9511C21.4108 9.22534 21.5252 9.58303 21.4953 9.9437C21.4068 11.0166 20.0389 11.6876 20.3395 12.8439C20.5475 13.6443 21.4253 14.207 21.4953 15.0563C21.5252 15.417 21.4108 15.7747 21.178 16.0489C20.4832 16.8669 18.9808 16.5975 18.5476 17.7062C18.2434 18.4844 18.634 19.4677 18.186 20.2034C18.0028 20.5042 17.7105 20.72 17.3721 20.8043C16.3302 21.0637 15.2727 19.9445 14.2701 20.5758C13.5543 21.0264 13.2978 22.0835 12.4857 22.4067C12.1735 22.5311 11.8265 22.5311 11.5143 22.4067C10.7022 22.0835 10.4457 21.0264 9.72989 20.5758C8.73971 19.9524 7.65213 21.0593 6.62791 20.8043C6.28947 20.72 5.9972 20.5042 5.81405 20.2034C5.25286 19.2818 5.97704 17.927 5.0617 17.1623C4.42582 16.6312 3.37494 16.7 2.82204 16.0489C2.58921 15.7747 2.47484 15.417 2.50465 15.0563C2.57485 14.207 3.4524 13.6443 3.6605 12.8439C3.95808 11.6997 2.59204 11.0009 2.50465 9.9437C2.47484 9.58303 2.58921 9.22534 2.82204 8.9511C3.51676 8.13284 5.01899 8.40253 5.45238 7.29383C5.75662 6.5156 5.36608 5.53227 5.81405 4.79657C5.9972 4.49579 6.28947 4.28003 6.62791 4.19574C7.46705 3.98677 8.28757 4.68387 9.12378 4.62336C10.3113 4.53746 10.5079 2.99406 11.5143 2.59327Z" fill="url(#paint0_linear_verified)" />
                    <path d="M9 13.8333C9 13.8333 9.875 13.8333 10.75 15.5C10.75 15.5 13.5294 11.3333 16 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="paint0_linear_verified" x1="21.5" y1="12.5" x2="2.5" y2="12.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A06AFF" />
                        <stop offset="1" stopColor="#482090" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#1C3430] self-start mt-1">
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                    <g clipPath="url(#clip0_kyc)">
                      <path d="M8.5 2.16891C7.76455 1.74349 6.9107 1.5 6 1.5C3.23857 1.5 1 3.73857 1 6.5C1 9.2614 3.23857 11.5 6 11.5C8.7614 11.5 11 9.2614 11 6.5C11 6.15755 10.9655 5.8231 10.9 5.5" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 6.75C4 6.75 4.75 6.75 5.75 8.5C5.75 8.5 8.5294 3.91667 11 3" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_kyc">
                        <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-xs font-bold text-[#2EBD85]">KYC Verified</span>
                </div>
              </div>
            </div>

            {/* Stats card with progress bar */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Followers</span>
                  <span className="text-[15px] font-bold text-white">3020</span>
                </div>
                <div className="w-px h-[37px] bg-[#523A83]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Following</span>
                  <span className="text-[15px] font-bold text-white">678</span>
                </div>
                <div className="w-px h-[37px] bg-[#523A83]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Posts</span>
                  <span className="text-[15px] font-bold text-white">23</span>
                </div>
                <div className="w-px h-[37px] bg-[#523A83]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Products</span>
                  <span className="text-[15px] font-bold text-white">4</span>
                </div>
                <div className="w-px h-[37px] bg-[#523A83]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Orders</span>
                  <span className="text-[15px] font-bold text-white">5</span>
                </div>
                <div className="w-px h-[37px] bg-[#523A83]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase text-white whitespace-nowrap">Consultations</span>
                  <span className="text-[15px] font-bold text-white">3</span>
                </div>
              </div>
              <div className="h-1 w-full rounded-lg bg-gradient-to-r from-[#FAD1FF] to-[#482090]" />
            </div>

            {/* Since date with logo */}
            <div className="flex items-center gap-2.5">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 9.99405L0.000809188 10.0552C1.93095 9.65939 3.87139 9.24601 5.8154 8.83182L5.81898 18.6573L12.3592 20C12.3592 17.8424 12.339 11.7641 12.3603 9.60702L7.78392 8.66756L7.17484 8.54259C10.5969 7.81537 14.0251 7.09773 17.4225 6.47986L17.4214 0C11.6755 1.17922 5.76419 2.5731 0 3.57557L0 9.99405Z" fill="url(#paint0_linear_logo)" />
                <defs>
                  <linearGradient id="paint0_linear_logo" x1="4.23118" y1="21.5" x2="11.7564" y2="1.27175" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#181A20" />
                    <stop offset="1" stopColor="#A06AFF" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[15px] font-bold text-white whitespace-nowrap">since Feb 10, 2024</span>
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        {isOwn && (
          <div className="flex flex-wrap items-start gap-4 w-full lg:w-auto lg:max-w-[376px]">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] text-white font-bold text-[15px] hover:bg-[rgba(12,16,20,0.7)] transition-colors w-[180px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.6791 4.985L13.8472 3.81686C14.4923 3.17172 15.5383 3.17172 16.1835 3.81686C16.8286 4.46201 16.8286 5.50799 16.1835 6.15313L15.0153 7.32126M12.6791 4.985L5.81751 11.8466C4.94643 12.7177 4.51087 13.1532 4.21429 13.6839C3.91771 14.2147 3.61932 15.4679 3.33398 16.6663C4.53239 16.381 5.78564 16.0826 6.31639 15.786C6.84714 15.4894 7.28268 15.0539 8.15378 14.1828L15.0153 7.32126M12.6791 4.985L15.0153 7.32126" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              New Post
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] text-white font-bold text-[15px] hover:bg-[rgba(12,16,20,0.7)] transition-colors w-[180px]">
              <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M10.5 3.33301V16.6663" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.83398 10H17.1673" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Trade
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#A06AFF] to-[#482090] backdrop-blur-[50px] text-white font-bold text-[15px] hover:opacity-90 transition-opacity w-[180px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_stream)">
                  <path d="M9.97594 18.3337C14.5783 18.3337 18.3093 14.6027 18.3093 10.0003C18.3093 5.39795 14.5783 1.66699 9.97594 1.66699C5.37354 1.66699 1.64258 5.39795 1.64258 10.0003C1.64258 14.6027 5.37354 18.3337 9.97594 18.3337Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.99959 13.5246C11.9464 13.5246 13.5246 11.9464 13.5246 9.99959C13.5246 8.05281 11.9464 6.47461 9.99959 6.47461C8.05281 6.47461 6.47461 8.05281 6.47461 9.99959C6.47461 11.9464 8.05281 13.5246 9.99959 13.5246Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_stream">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Start Stream
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] text-white font-bold text-[15px] hover:bg-[rgba(12,16,20,0.7)] transition-colors w-[180px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3.33301V16.6663" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.33398 10H16.6673" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;

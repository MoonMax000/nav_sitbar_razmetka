import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  isOwn?: boolean;
  className?: string;
}

const UserHeader: FC<Props> = ({ isOwn = true, className }) => {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Hero section with cover image */}
      <div className="relative w-full h-48 overflow-hidden rounded-3xl">
        {/* Cover image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c246284386eea63955b14b07c828e0c320177523?width=2118"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/[0.04] backdrop-blur-[2px]" />

        {/* Settings icon */}
        <button className="absolute right-4 top-4 flex h-[26px] w-[26px] items-center justify-center rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.3337 8.00002C10.3337 9.28869 9.28899 10.3334 8.00033 10.3334C6.71166 10.3334 5.66699 9.28869 5.66699 8.00002C5.66699 6.71135 6.71166 5.66669 8.00033 5.66669C9.28899 5.66669 10.3337 6.71135 10.3337 8.00002Z" stroke="#B0B0B0" strokeWidth="1.5"/>
            <path d="M14.007 9.39769C14.3549 9.30389 14.5289 9.25696 14.5976 9.16722C14.6663 9.07756 14.6663 8.93322 14.6663 8.64462V7.35549C14.6663 7.06689 14.6663 6.92256 14.5976 6.83289C14.5289 6.74316 14.3549 6.69622 14.007 6.60241C12.7067 6.25175 11.8929 4.89236 12.2285 3.6006C12.3208 3.24535 12.3669 3.06773 12.3229 2.96355C12.2788 2.85937 12.1524 2.78758 11.8995 2.644L10.7497 1.99118C10.5015 1.85028 10.3775 1.77984 10.2661 1.79484C10.1547 1.80984 10.0291 1.93518 9.77781 2.18584C8.80501 3.15634 7.19541 3.1563 6.22257 2.18578C5.97129 1.93511 5.84566 1.80978 5.73429 1.79477C5.62293 1.77977 5.49885 1.85022 5.25069 1.99111L4.1009 2.64394C3.84803 2.78751 3.72159 2.8593 3.67753 2.96346C3.63346 3.06762 3.67959 3.24527 3.77184 3.60056C4.10725 4.89236 3.29282 6.25178 1.99235 6.60242C1.64442 6.69622 1.47045 6.74316 1.40173 6.83282C1.33301 6.92256 1.33301 7.06689 1.33301 7.35549V8.64462C1.33301 8.93322 1.33301 9.07756 1.40173 9.16722C1.47044 9.25696 1.64441 9.30389 1.99235 9.39769C3.29261 9.74836 4.10639 11.1078 3.77082 12.3995C3.67853 12.7548 3.63239 12.9324 3.67645 13.0366C3.72051 13.1408 3.84695 13.2126 4.09984 13.3561L5.24964 14.009C5.49781 14.1498 5.6219 14.2203 5.73327 14.2053C5.84465 14.1903 5.97026 14.0649 6.22148 13.8142C7.19481 12.843 8.80554 12.8429 9.77894 13.8142C10.0301 14.0649 10.1557 14.1902 10.2671 14.2052C10.3785 14.2202 10.5026 14.1498 10.7507 14.0089L11.9005 13.356C12.1535 13.2125 12.2799 13.1407 12.3239 13.0365C12.368 12.9323 12.3219 12.7547 12.2295 12.3994C11.8938 11.1078 12.7069 9.74842 14.007 9.39769Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Profile picture and user info */}
        <div className="absolute left-4 top-4 flex items-start gap-4">
          {/* Profile picture */}
          <img
            src="https://api.builder.io/api/v1/image/assets%2F7ee0e08331ad4de59dd7fa404556ca59%2F18a068f999d64b54b143e3afad1942e8?format=webp&width=320"
            alt="Profile"
            className="h-40 w-40 flex-shrink-0 rounded-2xl border-[3px] border-[#523A83] shadow-[0_6.711px_11.409px_-1.342px_rgba(0,0,0,0.28)]"
          />

          {/* User info */}
          <div className="flex flex-col gap-2 pt-0">
            {/* Name and username */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h1 className="text-2xl font-bold text-white">Jane Doe</h1>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M11.5143 2.59327C11.8265 2.46891 12.1735 2.46891 12.4857 2.59327C13.4921 2.99406 13.6887 4.53744 14.8762 4.62336C15.7124 4.68386 16.533 3.98677 17.3721 4.19574C17.7105 4.28003 18.0028 4.49579 18.186 4.79657C18.7472 5.71824 18.0229 7.07292 18.9383 7.83768C19.5743 8.36877 20.6251 8.30004 21.178 8.9511C21.4108 9.22534 21.5252 9.58303 21.4953 9.9437C21.4068 11.0166 20.0389 11.6876 20.3395 12.8439C20.5475 13.6443 21.4253 14.207 21.4953 15.0563C21.5252 15.417 21.4108 15.7747 21.178 16.0489C20.4832 16.8669 18.9808 16.5975 18.5476 17.7062C18.2434 18.4844 18.634 19.4677 18.186 20.2034C18.0028 20.5042 17.7105 20.72 17.3721 20.8043C16.3302 21.0637 15.2727 19.9445 14.2701 20.5758C13.5543 21.0264 13.2978 22.0835 12.4857 22.4067C12.1735 22.5311 11.8265 22.5311 11.5143 22.4067C10.7022 22.0835 10.4457 21.0264 9.72989 20.5758C8.73971 19.9524 7.65213 21.0593 6.62791 20.8043C6.28947 20.72 5.9972 20.5042 5.81405 20.2034C5.25286 19.2818 5.97704 17.927 5.0617 17.1623C4.42582 16.6312 3.37494 16.7 2.82204 16.0489C2.58921 15.7747 2.47484 15.417 2.50465 15.0563C2.57485 14.207 3.4524 13.6443 3.6605 12.8439C3.95808 11.6997 2.59204 11.0009 2.50465 9.9437C2.47484 9.58303 2.58921 9.22534 2.82204 8.9511C3.51676 8.13284 5.01899 8.40253 5.45238 7.29383C5.75662 6.5156 5.36608 5.53227 5.81405 4.79657C5.9972 4.49579 6.28947 4.28003 6.62791 4.19574C7.46705 3.98677 8.28757 4.68387 9.12378 4.62336C10.3113 4.53746 10.5079 2.99406 11.5143 2.59327Z" fill="url(#paint0_linear_verified)"/>
                  <path d="M9 13.8333C9 13.8333 9.875 13.8333 10.75 15.5C10.75 15.5 13.5294 11.3333 16 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_verified" x1="21.5" y1="12.5" x2="2.5" y2="12.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A06AFF"/>
                      <stop offset="1" stopColor="#482090"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-[15px] font-normal text-white">@beautydoe</span>
            </div>

            {/* Tier badge */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold uppercase text-white">Tier</span>
              <div className="relative h-5 w-[18px]">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M18 9.1833V6.28029C18 4.64029 18 3.82028 17.5959 3.28529C17.1918 2.75029 16.2781 2.49056 14.4507 1.9711C13.2022 1.6162 12.1016 1.18863 11.2223 0.79829C10.0234 0.2661 9.424 0 9 0C8.576 0 7.9766 0.2661 6.77771 0.79829C5.89839 1.18863 4.79784 1.61619 3.54933 1.9711C1.72193 2.49056 0.80822 2.75029 0.40411 3.28529C-5.96046e-08 3.82028 0 4.64029 0 6.28029V9.1833C0 14.8085 5.06277 18.1835 7.594 19.5194C8.2011 19.8398 8.5046 20 9 20C9.4954 20 9.7989 19.8398 10.406 19.5194C12.9372 18.1835 18 14.8085 18 9.1833Z" fill="url(#paint0_linear_shield)"/>
                  <defs>
                    <linearGradient id="paint0_linear_shield" x1="18" y1="10" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A06AFF"/>
                      <stop offset="1" stopColor="#482090"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute left-[5px] top-[2px] text-xs font-bold uppercase text-white">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserHeader;

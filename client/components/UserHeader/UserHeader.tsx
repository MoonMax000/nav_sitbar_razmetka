import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  isOwn?: boolean;
  className?: string;
}

const UserHeader: FC<Props> = ({ isOwn = true, className }) => {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Cover image section */}
      <div className="relative w-full h-48 overflow-hidden rounded-3xl">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/df14e9248350a32d57d5b54a31308a2e855bb11e?width=2118"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.04] backdrop-blur-[2px]" />
      </div>

      {/* Content section below banner with 3 columns */}
      <div className="relative -mt-16 sm:-mt-20 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Column 1: Avatar + Name + Username */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            {/* Avatar */}
            <div className="relative z-10">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8dcd522167ed749bb95dadfd1a39f43e695d33a0?width=320"
                alt="Profile"
                className="w-40 h-40 rounded-2xl border-2 border-[#181B22] object-cover"
              />
            </div>

            {/* Name and Username */}
            <div className="flex flex-col gap-2 pb-2 pr-6">
              <div className="flex items-center gap-1">
                <h1 className="text-2xl font-bold text-white leading-none">Jane Doe</h1>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M11.5143 2.59327C11.8265 2.46891 12.1735 2.46891 12.4857 2.59327C13.4921 2.99406 13.6887 4.53744 14.8762 4.62336C15.7124 4.68386 16.533 3.98677 17.3721 4.19574C17.7105 4.28003 18.0028 4.49579 18.186 4.79657C18.7472 5.71824 18.0229 7.07292 18.9383 7.83768C19.5743 8.36877 20.6251 8.30004 21.178 8.9511C21.4108 9.22534 21.5252 9.58303 21.4953 9.9437C21.4068 11.0166 20.0389 11.6876 20.3395 12.8439C20.5475 13.6443 21.4253 14.207 21.4953 15.0563C21.5252 15.417 21.4108 15.7747 21.178 16.0489C20.4832 16.8669 18.9808 16.5975 18.5476 17.7062C18.2434 18.4844 18.634 19.4677 18.186 20.2034C18.0028 20.5042 17.7105 20.72 17.3721 20.8043C16.3302 21.0637 15.2727 19.9445 14.2701 20.5758C13.5543 21.0264 13.2978 22.0835 12.4857 22.4067C12.1735 22.5311 11.8265 22.5311 11.5143 22.4067C10.7022 22.0835 10.4457 21.0264 9.72989 20.5758C8.73971 19.9524 7.65213 21.0593 6.62791 20.8043C6.28947 20.72 5.9972 20.5042 5.81405 20.2034C5.25286 19.2818 5.97704 17.927 5.0617 17.1623C4.42582 16.6312 3.37494 16.7 2.82204 16.0489C2.58921 15.7747 2.47484 15.417 2.50465 15.0563C2.57485 14.207 3.4524 13.6443 3.6605 12.8439C3.95808 11.6997 2.59204 11.0009 2.50465 9.9437C2.47484 9.58303 2.58921 9.22534 2.82204 8.9511C3.51676 8.13284 5.01899 8.40253 5.45238 7.29383C5.75662 6.5156 5.36608 5.53227 5.81405 4.79657C5.9972 4.49579 6.28947 4.28003 6.62791 4.19574C7.46705 3.98677 8.28757 4.68387 9.12378 4.62336C10.3113 4.53746 10.5079 2.99406 11.5143 2.59327Z" fill="url(#paint0_linear_6_1703)"/>
                  <path d="M9 13.8333C9 13.8333 9.875 13.8333 10.75 15.5C10.75 15.5 13.5294 11.3333 16 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_6_1703" x1="21.5" y1="12.5" x2="2.5" y2="12.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A06AFF"/>
                      <stop offset="1" stopColor="#482090"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-[15px] font-normal text-white">@beautydoe</span>
            </div>
          </div>

          {/* Column 2: Tier and Analyst badges */}
          <div className="flex items-center gap-4 pb-2">
            {/* Tier badge */}
            <div className="inline-flex items-center justify-center gap-1">
              <span className="text-xs font-bold uppercase text-white">Tier</span>
              <div className="relative w-[18px] h-5">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M18 9.1833V6.28029C18 4.64029 18 3.82028 17.5959 3.28529C17.1918 2.75029 16.2781 2.49056 14.4507 1.9711C13.2022 1.6162 12.1016 1.18863 11.2223 0.79829C10.0234 0.2661 9.424 0 9 0C8.576 0 7.9766 0.2661 6.77771 0.79829C5.89839 1.18863 4.79784 1.61619 3.54933 1.9711C1.72193 2.49056 0.80822 2.75029 0.40411 3.28529C-5.96046e-08 3.82028 0 4.64029 0 6.28029V9.1833C0 14.8085 5.06277 18.1835 7.594 19.5194C8.2011 19.8398 8.5046 20 9 20C9.4954 20 9.7989 19.8398 10.406 19.5194C12.9372 18.1835 18 14.8085 18 9.1833Z" fill="url(#paint0_linear_6_1710)"/>
                  <defs>
                    <linearGradient id="paint0_linear_6_1710" x1="18" y1="10" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A06AFF"/>
                      <stop offset="1" stopColor="#482090"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute left-[5px] top-[2px] text-xs font-bold uppercase text-white">4</span>
              </div>
            </div>

            {/* Analyst badge */}
            <div className="inline-flex items-center justify-center gap-1">
              <span className="text-xs font-bold uppercase text-white">Analyst</span>
              <div className="relative w-[18px] h-5">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M18 9.1833V6.28029C18 4.64029 18 3.82028 17.5959 3.28529C17.1918 2.75029 16.2781 2.49056 14.4507 1.9711C13.2022 1.6162 12.1016 1.18863 11.2223 0.79829C10.0234 0.2661 9.424 0 9 0C8.576 0 7.9766 0.2661 6.77771 0.79829C5.89839 1.18863 4.79784 1.61619 3.54933 1.9711C1.72193 2.49056 0.80822 2.75029 0.40411 3.28529C-5.96046e-08 3.82028 0 4.64029 0 6.28029V9.1833C0 14.8085 5.06277 18.1835 7.594 19.5194C8.2011 19.8398 8.5046 20 9 20C9.4954 20 9.7989 19.8398 10.406 19.5194C12.9372 18.1835 18 14.8085 18 9.1833Z" fill="url(#paint0_linear_6_1730)"/>
                  <defs>
                    <linearGradient id="paint0_linear_6_1730" x1="18" y1="10" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A06AFF"/>
                      <stop offset="1" stopColor="#482090"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute left-[5px] top-[2px] text-xs font-bold uppercase text-white">4</span>
              </div>
            </div>
          </div>

          {/* Column 3: Edit profile button */}
          {isOwn && (
            <div className="pb-2">
              <button className="inline-flex items-center justify-center gap-2 px-3 py-3 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58px] hover:bg-[rgba(12,16,20,0.7)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10.3332 8.00001C10.3332 9.28867 9.2885 10.3333 7.99984 10.3333C6.71117 10.3333 5.6665 9.28867 5.6665 8.00001C5.6665 6.71134 6.71117 5.66667 7.99984 5.66667C9.2885 5.66667 10.3332 6.71134 10.3332 8.00001Z" stroke="#B0B0B0" strokeWidth="1.5"/>
                  <path d="M14.0075 9.39766C14.3554 9.30386 14.5294 9.25693 14.5981 9.16719C14.6668 9.07753 14.6668 8.93319 14.6668 8.64459V7.35546C14.6668 7.06686 14.6668 6.92253 14.5981 6.83286C14.5294 6.74313 14.3554 6.69619 14.0075 6.60238C12.7072 6.25172 11.8934 4.89233 12.229 3.60057C12.3213 3.24532 12.3674 3.0677 12.3234 2.96352C12.2793 2.85934 12.1529 2.78755 11.9 2.64397L10.7502 1.99115C10.502 1.85025 10.378 1.77981 10.2666 1.79481C10.1552 1.80981 10.0296 1.93515 9.7783 2.18581C8.8055 3.15631 7.1959 3.15627 6.22306 2.18575C5.97178 1.93508 5.84615 1.80975 5.73478 1.79474C5.62342 1.77974 5.49934 1.85019 5.25118 1.99108L4.10139 2.64391C3.84852 2.78748 3.72208 2.85927 3.67802 2.96343C3.63395 3.06759 3.68008 3.24524 3.77233 3.60053C4.10774 4.89233 3.29331 6.25175 1.99284 6.60239C1.64491 6.69619 1.47094 6.74313 1.40222 6.83279C1.3335 6.92253 1.3335 7.06686 1.3335 7.35546V8.64459C1.3335 8.93319 1.3335 9.07753 1.40222 9.16719C1.47093 9.25693 1.6449 9.30386 1.99284 9.39766C3.2931 9.74833 4.10688 11.1077 3.77131 12.3995C3.67902 12.7547 3.63288 12.9323 3.67694 13.0365C3.721 13.1407 3.84744 13.2125 4.10033 13.3561L5.25013 14.0089C5.4983 14.1498 5.62239 14.2203 5.73376 14.2053C5.84514 14.1903 5.97075 14.0649 6.22197 13.8142C7.1953 12.8429 8.80603 12.8429 9.77943 13.8141C10.0306 14.0649 10.1562 14.1902 10.2676 14.2052C10.379 14.2202 10.5031 14.1497 10.7512 14.0089L11.901 13.356C12.154 13.2125 12.2804 13.1407 12.3244 13.0365C12.3685 12.9323 12.3224 12.7547 12.23 12.3994C11.8943 11.1077 12.7074 9.74839 14.0075 9.39766Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[15px] font-bold text-[#B0B0B0]">Edit profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

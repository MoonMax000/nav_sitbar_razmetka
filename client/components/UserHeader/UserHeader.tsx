import { FC } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  isOwn?: boolean;
  className?: string;
}

const UserHeader: FC<Props> = ({ isOwn = true, className }) => {
  const navigate = useNavigate();

  const iconButtonClass =
    "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-[#F7F9F9] shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 before:absolute before:inset-x-3 before:-top-1 before:h-1 before:rounded-full before:bg-white/40 before:opacity-0 before:transition-opacity before:duration-200 group-hover:before:opacity-70";

  const primaryActionButtonClass =
    "group relative flex items-center justify-center overflow-hidden rounded-full border border-black/30 bg-[rgba(25,25,25,0.65)] px-6 py-2.5 text-[15px] font-semibold text-[#F7F9F9] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A06AFF]/40 hover:bg-[rgba(32,32,32,0.75)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_36px_rgba(0,0,0,0.5)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black before:absolute before:inset-x-4 before:-top-1 before:h-1 before:rounded-full before:bg-white/50 before:opacity-0 before:transition-opacity before:duration-200 group-hover:before:opacity-100";

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Header bar with back button */}
      <div className="flex items-center gap-9 px-4 py-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-5 h-5 text-[#F7F9F9] hover:bg-white/10 rounded-full transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.19006 11.46L10.3926 16.5L9.21423 17.92L3.00006 10.46L9.21423 3L10.3926 4.42L6.19006 9.46H17.5117V11.46H6.19006Z"
              fill="#F7F9F9"
            />
          </svg>
        </button>
        <div className="flex flex-col flex-1 gap-0.5">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold text-[#F7F9F9] leading-6">
              Jane Doe
            </h2>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.9999 10.5C18.9837 9.9156 18.8054 9.34658 18.4843 8.85717C18.1641 8.36867 17.7135 7.97786 17.1834 7.72999C17.3852 7.18087 17.4277 6.58653 17.3101 6.01389C17.1916 5.44035 16.9147 4.91204 16.5122 4.48776C16.087 4.0852 15.5596 3.80928 14.986 3.68987C14.4134 3.57226 13.8191 3.61478 13.2699 3.81652C13.023 3.28549 12.6331 2.83408 12.1437 2.51384C11.6543 2.19359 11.0852 2.01447 10.4999 2C9.91554 2.01538 9.34833 2.19269 8.85983 2.51384C8.37132 2.83498 7.98323 3.2864 7.73807 3.81652C7.18805 3.61478 6.59189 3.57046 6.01745 3.68987C5.443 3.80747 4.91379 4.08429 4.4886 4.48776C4.08604 4.91294 3.81103 5.44216 3.69433 6.01479C3.57673 6.58743 3.62196 7.18178 3.8246 7.72999C3.29357 7.97786 2.84125 8.36776 2.5192 8.85627C2.19715 9.34477 2.01713 9.9147 1.99994 10.5C2.01803 11.0853 2.19715 11.6543 2.5192 12.1437C2.84125 12.6322 3.29357 13.023 3.8246 13.27C3.62196 13.8182 3.57673 14.4126 3.69433 14.9852C3.81193 15.5587 4.08604 16.0871 4.4877 16.5122C4.91288 16.913 5.44119 17.188 6.01383 17.3065C6.58646 17.4259 7.18081 17.3825 7.72993 17.1835C7.9778 17.7136 8.3677 18.1641 8.85711 18.4853C9.34562 18.8055 9.91554 18.9837 10.4999 19C11.0852 18.9855 11.6543 18.8073 12.1437 18.4871C12.6331 18.1668 13.023 17.7145 13.2699 17.1844C13.8164 17.4006 14.4152 17.4522 14.9915 17.3327C15.5668 17.2133 16.0951 16.9284 16.5113 16.5122C16.9274 16.0961 17.2133 15.5678 17.3327 14.9915C17.4521 14.4153 17.4005 13.8164 17.1834 13.27C17.7135 13.0221 18.1641 12.6322 18.4852 12.1428C18.8054 11.6543 18.9837 11.0844 18.9999 10.5ZM9.28953 13.9829L6.18752 10.8818L7.35722 9.70392L9.23163 11.5783L13.2121 7.24149L14.4306 8.36867L9.28953 13.9829Z"
                fill="#A06AFF"
              />
            </svg>
          </div>
          <p className="text-[13px] font-normal text-[#8B98A5] leading-4">
            23 post
          </p>
        </div>
      </div>

      {/* Cover/Banner image */}
      <div className="relative w-full h-[200px] bg-[#16181C]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/df14e9248350a32d57d5b54a31308a2e855bb11e?width=2118"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Avatar and action buttons container */}
      <div className="relative px-4">
        {/* Avatar positioned to overlap banner */}
        <div className="absolute -top-16 left-4 w-[132px] h-[132px] rounded-full border-4 border-black overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8dcd522167ed749bb95dadfd1a39f43e695d33a0?width=320"
            alt="Profile"
            className="h-full w-full rounded-full object-cover object-center scale-[1.08]"
          />
        </div>

        {/* Action buttons panel */}
        <div className="flex justify-end items-start gap-3 py-3">
          <button className={iconButtonClass}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2.5 10.0002C2.5 9.0835 3.25 8.3335 4.16667 8.3335C5.08333 8.3335 5.83333 9.0835 5.83333 10.0002C5.83333 10.9168 5.08333 11.6668 4.16667 11.6668C3.25 11.6668 2.5 10.9168 2.5 10.0002ZM10 11.6668C10.9167 11.6668 11.6667 10.9168 11.6667 10.0002C11.6667 9.0835 10.9167 8.3335 10 8.3335C9.08333 8.3335 8.33333 9.0835 8.33333 10.0002C8.33333 10.9168 9.08333 11.6668 10 11.6668ZM15.8333 11.6668C16.75 11.6668 17.5 10.9168 17.5 10.0002C17.5 9.0835 16.75 8.3335 15.8333 8.3335C14.9167 8.3335 14.1667 9.0835 14.1667 10.0002C14.1667 10.9168 14.9167 11.6668 15.8333 11.6668Z"
                fill="#F7F9F9"
              />
            </svg>
          </button>

          <button className={iconButtonClass}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M1.66501 4.58333C1.66501 3.4325 2.59751 2.5 3.74834 2.5H16.2483C17.3992 2.5 18.3317 3.4325 18.3317 4.58333V15.4167C18.3317 16.5675 17.3992 17.5 16.2483 17.5H3.74834C2.59751 17.5 1.66501 16.5675 1.66501 15.4167V4.58333ZM3.74834 4.16667C3.51834 4.16667 3.33168 4.35333 3.33168 4.58333V6.88667L9.99834 9.91833L16.665 6.88833V4.58333C16.665 4.35333 16.4783 4.16667 16.2483 4.16667H3.74834ZM16.665 8.71917L9.99834 11.7492L3.33168 8.7175V15.4167C3.33168 15.6467 3.51834 15.8333 3.74834 15.8333H16.2483C16.4783 15.8333 16.665 15.6467 16.665 15.4167V8.71917Z"
                fill="#F7F9F9"
              />
            </svg>
          </button>

          {isOwn ? (
            <button className={primaryActionButtonClass}>
              <span className="relative z-10 text-center font-semibold leading-5">
                Edit profile
              </span>
            </button>
          ) : (
            <button className={primaryActionButtonClass}>
              <span className="relative z-10 text-center font-semibold leading-5">
                Follow
              </span>
            </button>
          )}
        </div>
      </div>

      {/* User info section */}
      <div className="flex flex-col px-4 gap-3 pt-4 pb-4">
        {/* Name and username */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-[#F7F9F9] leading-6">
              Jane Doe
            </h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.9999 10.5C18.9837 9.9156 18.8054 9.34658 18.4843 8.85717C18.1641 8.36867 17.7135 7.97786 17.1834 7.72999C17.3852 7.18087 17.4277 6.58653 17.3101 6.01389C17.1916 5.44035 16.9147 4.91204 16.5122 4.48776C16.087 4.0852 15.5596 3.80928 14.986 3.68987C14.4134 3.57226 13.8191 3.61478 13.2699 3.81652C13.023 3.28549 12.6331 2.83408 12.1437 2.51384C11.6543 2.19359 11.0852 2.01447 10.4999 2C9.91554 2.01538 9.34833 2.19269 8.85983 2.51384C8.37132 2.83498 7.98323 3.2864 7.73807 3.81652C7.18805 3.61478 6.59189 3.57046 6.01745 3.68987C5.443 3.80747 4.91379 4.08429 4.4886 4.48776C4.08604 4.91294 3.81103 5.44216 3.69433 6.01479C3.57673 6.58743 3.62196 7.18178 3.8246 7.72999C3.29357 7.97786 2.84125 8.36776 2.5192 8.85627C2.19715 9.34477 2.01713 9.9147 1.99994 10.5C2.01803 11.0853 2.19715 11.6543 2.5192 12.1437C2.84125 12.6322 3.29357 13.023 3.8246 13.27C3.62196 13.8182 3.57673 14.4126 3.69433 14.9852C3.81193 15.5587 4.08604 16.0871 4.4877 16.5122C4.91288 16.913 5.44119 17.188 6.01383 17.3065C6.58646 17.4259 7.18081 17.3825 7.72993 17.1835C7.9778 17.7136 8.3677 18.1641 8.85711 18.4853C9.34562 18.8055 9.91554 18.9837 10.4999 19C11.0852 18.9855 11.6543 18.8073 12.1437 18.4871C12.6331 18.1668 13.023 17.7145 13.2699 17.1844C13.8164 17.4006 14.4152 17.4522 14.9915 17.3327C15.5668 17.2133 16.0951 16.9284 16.5113 16.5122C16.9274 16.0961 17.2133 15.5678 17.3327 14.9915C17.4521 14.4153 17.4005 13.8164 17.1834 13.27C17.7135 13.0221 18.1641 12.6322 18.4852 12.1428C18.8054 11.6543 18.9837 11.0844 18.9999 10.5ZM9.28953 13.9829L6.18752 10.8818L7.35722 9.70392L9.23163 11.5783L13.2121 7.24149L14.4306 8.36867L9.28953 13.9829Z"
                fill="#A06AFF"
              />
            </svg>
          </div>
          <p className="text-[13px] font-normal text-[#8B98A5] leading-4">
            @beautydoe
          </p>
        </div>

        {/* Bio/Description */}
        <p className="text-[15px] font-normal text-[#F7F9F9] leading-5">
          Designing Products that Users Love
        </p>

        {/* User metadata with icons */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Tier badge */}
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 18 20" fill="none">
              <path
                d="M18 9.1833V6.28029C18 4.64029 18 3.82028 17.5959 3.28529C17.1918 2.75029 16.2781 2.49056 14.4507 1.9711C13.2022 1.6162 12.1016 1.18863 11.2223 0.79829C10.0234 0.2661 9.424 0 9 0C8.576 0 7.9766 0.2661 6.77771 0.79829C5.89839 1.18863 4.79784 1.61619 3.54933 1.9711C1.72193 2.49056 0.80822 2.75029 0.40411 3.28529C-5.96046e-08 3.82028 0 4.64029 0 6.28029V9.1833C0 14.8085 5.06277 18.1835 7.594 19.5194C8.2011 19.8398 8.5046 20 9 20C9.4954 20 9.7989 19.8398 10.406 19.5194C12.9372 18.1835 18 14.8085 18 9.1833Z"
                fill="#8B98A5"
              />
            </svg>
            <span className="text-[15px] font-normal text-[#8B98A5] leading-5">
              Tier 4
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 5.83317C8.39169 5.83317 7.08335 7.1415 7.08335 8.74984C7.08335 10.3582 8.39169 11.6665 10 11.6665C11.6084 11.6665 12.9167 10.3582 12.9167 8.74984C12.9167 7.1415 11.6084 5.83317 10 5.83317ZM10 9.99984C9.31085 9.99984 8.75002 9.439 8.75002 8.74984C8.75002 8.06067 9.31085 7.49984 10 7.49984C10.6892 7.49984 11.25 8.06067 11.25 8.74984C11.25 9.439 10.6892 9.99984 10 9.99984ZM10 1.6665C6.09419 1.6665 2.91669 4.844 2.91669 8.74984C2.91669 13.7223 9.26752 18.0132 9.53752 18.1932L10 18.5015L10.4625 18.1932C10.7325 18.0132 17.0834 13.7223 17.0834 8.74984C17.0834 4.844 13.9059 1.6665 10 1.6665ZM10 16.4748C8.61252 15.4407 4.58335 12.1448 4.58335 8.74984C4.58335 5.76317 7.01335 3.33317 10 3.33317C12.9867 3.33317 15.4167 5.76317 15.4167 8.74984C15.4167 12.144 11.3875 15.4398 10 16.4748Z"
                fill="#8B98A5"
              />
            </svg>
            <span className="text-[15px] font-normal text-[#8B98A5] leading-5">
              United States
            </span>
          </div>

          {/* Website link */}
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.3 4.70013C13.675 3.0668 11.0417 3.0668 9.40834 4.70013L8.23334 5.87513L7.05001 4.70013L8.23334 3.5168C10.5083 1.2418 14.2 1.2418 16.4833 3.5168C18.7583 5.80013 18.7583 9.4918 16.4833 11.7668L15.3 12.9501L14.125 11.7668L15.3 10.5918C16.9333 8.95846 16.9333 6.32513 15.3 4.70013ZM13.5333 7.6418L7.64168 13.5335L6.46668 12.3585L12.3583 6.4668L13.5333 7.6418ZM3.51667 8.23346L4.70001 7.05013L5.87501 8.23346L4.70001 9.40846C3.06668 11.0418 3.06668 13.6751 4.70001 15.3001C6.32501 16.9335 8.95834 16.9335 10.5917 15.3001L11.7667 14.1251L12.95 15.3001L11.7667 16.4835C9.49168 18.7585 5.80001 18.7585 3.51667 16.4835C1.24167 14.2001 1.24167 10.5085 3.51667 8.23346Z"
                fill="#8B98A5"
              />
            </svg>
            <a
              href="https://beautydoe.com"
              className="text-[15px] font-normal text-[#A06AFF] leading-5 hover:underline"
            >
              beautydoe.com
            </a>
          </div>

          {/* Join date */}
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5.83333 3.33333V2.5H7.5V3.33333H12.5V2.5H14.1667V3.33333H15.4167C16.575 3.33333 17.5 4.26667 17.5 5.41667V15.4167C17.5 16.5667 16.575 17.5 15.4167 17.5H4.58333C3.43333 17.5 2.5 16.5667 2.5 15.4167V5.41667C2.5 4.26667 3.43333 3.33333 4.58333 3.33333H5.83333ZM5.83333 5H4.58333C4.35833 5 4.16667 5.18333 4.16667 5.41667V15.4167C4.16667 15.65 4.35833 15.8333 4.58333 15.8333H15.4167C15.65 15.8333 15.8333 15.65 15.8333 15.4167V5.41667C15.8333 5.18333 15.65 5 15.4167 5H14.1667V5.83333H12.5V5H7.5V5.83333H5.83333V5ZM5.83333 10H7.5V8.33333H5.83333V10ZM5.83333 13.3333H7.5V11.6667H5.83333V13.3333ZM9.16667 10H10.8333V8.33333H9.16667V10ZM9.16667 13.3333H10.8333V11.6667H9.16667V13.3333ZM12.5 10H14.1667V8.33333H12.5V10Z"
                fill="#8B98A5"
              />
            </svg>
            <span className="text-[15px] font-normal text-[#8B98A5] leading-5">
              Joined November 2010
            </span>
          </div>
        </div>

        {/* Following/Followers counts */}
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-bold text-[#F7F9F9] leading-5">
              143
            </span>
            <span className="text-[15px] font-normal text-[#8B98A5] leading-5">
              Following
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-bold text-[#F7F9F9] leading-5">
              149
            </span>
            <span className="text-[15px] font-normal text-[#8B98A5] leading-5">
              Followers
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserHeader;

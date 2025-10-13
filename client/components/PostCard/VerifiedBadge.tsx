import { type FC } from "react";

import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
}

const VerifiedBadge: FC<VerifiedBadgeProps> = ({ className, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className={cn("text-[#A06AFF]", className)}
  >
    <path
      d="M10 2L12.118 4.23223L15.1962 4.47214L15.4721 7.55192L17.7044 9.66987L15.4721 11.7878L15.1962 14.8676L12.118 15.1075L10 17.3397L7.88197 15.1075L4.80384 14.8676L4.52793 11.7878L2.29577 9.66987L4.52793 7.55192L4.80384 4.47214L7.88197 4.23223L10 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7.5 10L9.16667 11.6667L12.5 8.33337"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VerifiedBadge;

import { FC, MouseEvent } from "react";

import { cn } from "@/lib/utils";

export interface PostCardProps {
  author?: {
    name: string;
    avatar: string;
  };
  category?: string;
  timestamp?: string;
  title?: string;
  content?: string;
  image?: string;
  sentiment?: "bullish" | "bearish";
  likes?: number;
  comments?: number;
  onOpen?: () => void;
}

const PostCard: FC<PostCardProps> = ({
  author = { name: "John Smith", avatar: "/placeholder.svg" },
  category = "Idea",
  timestamp = "January 31, 5:10 PM",
  title = "AI Constructs Threaten Emerging Economies: A New Wave of Unemployment and Inequality",
  content = "In recent years, artificial intelligence (AI) has become an integral part of the global economy. However, its impact on emerging economies raises serious concerns. Automated systems and algorithms, designed to improve efficiency, are beginning to replace traditional jobs—leaving millions without a source of income. In regions already struggling with economic instability, the rise of AI only deepens existing issues of inequality and poverty.",
  image = "https://api.builder.io/api/v1/image/assets/TEMP/23fc35ab171b1cddbf955c164017b8e4c372f935?width=1198",
  sentiment = "bullish",
  likes = 1500,
  comments = 563,
  onOpen,
}) => {
  const handleLearnMoreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      onClick={onOpen}
      className={cn(
        "inline-flex w-full flex-col items-center gap-6 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-4 backdrop-blur-[50px]",
        onOpen && "cursor-pointer transition-colors duration-200 hover:border-[#A06AFF]/50",
      )}
    >
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <div className="text-[15px] font-bold leading-normal text-white">
                {author.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-[#4FC3F7] px-2 py-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.667 6.41383C12.667 8.13331 11.8205 9.45684 10.5325 10.3278C10.2325 10.5307 10.0825 10.6322 10.0085 10.7475C9.93446 10.8628 9.90919 11.0143 9.85873 11.3172L9.81946 11.5526C9.73079 12.0847 9.68646 12.3507 9.49993 12.5087C9.31346 12.6667 9.04373 12.6667 8.50426 12.6667H6.76326C6.22385 12.6667 5.95412 12.6667 5.76763 12.5087C5.58113 12.3507 5.53679 12.0847 5.4481 11.5526L5.40887 11.3172C5.35855 11.0153 5.3334 10.8644 5.26011 10.7496C5.18683 10.6348 5.03651 10.532 4.73587 10.3265C3.46159 9.45551 2.66699 8.13244 2.66699 6.41383C2.66699 3.60797 4.90557 1.33337 7.66699 1.33337C8.00946 1.33337 8.34386 1.36836 8.66699 1.435"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.0003 1.33337L11.1723 1.79806C11.3977 2.40739 11.5105 2.71205 11.7327 2.9343C11.955 3.15655 12.2597 3.26929 12.869 3.49476L13.3337 3.66671L12.869 3.83865C12.2597 4.06413 11.955 4.17687 11.7327 4.39911C11.5105 4.62136 11.3977 4.92603 11.1723 5.53535L11.0003 6.00004L10.8284 5.53535C10.6029 4.92603 10.4902 4.62136 10.2679 4.39911C10.0457 4.17687 9.74099 4.06413 9.13166 3.83865L8.66699 3.66671L9.13166 3.49476C9.74099 3.26929 10.0457 3.15655 10.2679 2.9343C10.4902 2.71205 10.6029 2.40739 10.8284 1.79806L11.0003 1.33337Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.99967 12.6666V13.3333C8.99967 13.9618 8.99967 14.2761 8.80441 14.4714C8.60914 14.6666 8.29487 14.6666 7.66634 14.6666C7.03781 14.6666 6.72354 14.6666 6.52827 14.4714C6.33301 14.2761 6.33301 13.9618 6.33301 13.3333V12.6666"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-xs font-bold leading-normal text-white">
                    {category}
                  </div>
                </div>
                <div className="flex-1 text-xs font-bold leading-normal text-[#808283]">
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-rotate-90"
            >
              <path
                d="M12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13Z"
                fill="#808283"
                stroke="#808283"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 13C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11C18.7348 11 18.4804 11.1054 18.2929 11.2929C18.1054 11.4804 18 11.7348 18 12C18 12.2652 18.1054 12.5196 18.2929 12.7071C18.4804 12.8946 18.7348 13 19 13Z"
                fill="#808283"
                stroke="#808283"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 13C5.26522 13 5.51957 12.8946 5.70711 12.7071C5.89464 12.5196 6 12.2652 6 12C6 11.7348 5.89464 11.4804 5.70711 11.2929C5.51957 11.1054 5.26522 11 5 11C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13Z"
                fill="#808283"
                stroke="#808283"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-4">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="text-2xl font-bold leading-normal text-white">
            {title}
          </div>
          <div className="text-[15px] font-normal leading-normal text-white">
            {content}
          </div>
          <a
            href="#"
            onClick={handleLearnMoreClick}
            className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-[#A06AFF]/10 px-3 py-1.5 text-[15px] font-semibold leading-normal text-[#E3D8FF] transition-all duration-200 hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Learn more
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#A06AFF]/60 to-[#482090]/60 text-white transition-all duration-200 group-hover:from-[#A06AFF] group-hover:to-[#482090]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M10.7402 15.53L14.2602 12L10.7402 8.46997"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
        <img
          src={image}
          alt=""
          className="h-auto w-full rounded-lg object-cover"
          style={{ aspectRatio: "599/336" }}
        />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-[#1C3430] px-1 py-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 8.66671V5.33337H10"
                  stroke="#2EBD85"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3337 5.33337L10.0003 8.66671C9.41193 9.25511 9.11779 9.54924 8.75673 9.58177C8.69699 9.58717 8.63699 9.58717 8.57726 9.58177C8.21619 9.54924 7.92206 9.25511 7.33366 8.66671C6.74526 8.07831 6.45109 7.78417 6.09004 7.75164C6.03035 7.74624 5.9703 7.74624 5.91061 7.75164C5.54956 7.78417 5.25537 8.07831 4.66699 8.66671L2.66699 10.6667"
                  stroke="#2EBD85"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-center text-xs font-bold leading-normal text-white">
                {sentiment === "bullish" ? "Bullish" : "Bearish"}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2192 3.32846C13.9844 1.95769 12.034 2.51009 10.8623 3.39001C10.3818 3.7508 10.1417 3.93119 10.0003 3.93119C9.85899 3.93119 9.61882 3.7508 9.13832 3.39001C7.96667 2.51009 6.01623 1.95769 3.78152 3.32846C0.848716 5.12745 0.185092 11.0624 6.94993 16.0695C8.23842 17.0232 8.88266 17.5 10.0003 17.5C11.118 17.5 11.7622 17.0232 13.0507 16.0695C19.8156 11.0624 19.1519 5.12745 16.2192 3.32846Z"
                  fill="url(#paint0_linear_1_21158)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1_21158"
                    x1="18.3337"
                    y1="10"
                    x2="1.66699"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A06AFF" />
                    <stop offset="1" stopColor="#482090" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#A06AFF]">
                {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_21162)">
                  <path
                    d="M18.3337 9.63875C18.3337 14.0414 14.6022 17.611 10.0003 17.611C9.45924 17.6118 8.91966 17.5617 8.38816 17.4619C8.0056 17.39 7.81431 17.3541 7.68077 17.3745C7.54722 17.3949 7.35798 17.4955 6.97948 17.6968C5.90878 18.2663 4.66028 18.4673 3.45958 18.244C3.91594 17.6827 4.22762 17.0092 4.36514 16.2872C4.44848 15.8455 4.24199 15.4165 3.93273 15.1024C2.5281 13.6761 1.66699 11.7541 1.66699 9.63875C1.66699 5.23615 5.39848 1.6665 10.0003 1.6665C14.6022 1.6665 18.3337 5.23615 18.3337 9.63875Z"
                    stroke="#808283"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99658 10H10.0041M13.3262 10H13.3337M6.66699 10H6.67447"
                    stroke="#808283"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_21162">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-xs font-bold leading-normal text-[#808283]">
                {comments}
              </div>
            </div>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33301 14.9838V8.08945C3.33301 5.06164 3.33301 3.54774 4.30932 2.60712C5.28563 1.6665 6.85697 1.6665 9.99967 1.6665C13.1423 1.6665 14.7138 1.6665 15.69 2.60712C16.6663 3.54774 16.6663 5.06164 16.6663 8.08945V14.9838C16.6663 16.9054 16.6663 17.8662 16.0223 18.2101C14.7751 18.876 12.4357 16.6542 11.3247 15.9852C10.6803 15.5972 10.3582 15.4032 9.99967 15.4032C9.64117 15.4032 9.31901 15.5972 8.67467 15.9852C7.56367 16.6542 5.22423 18.876 3.97705 18.2101C3.33301 17.8662 3.33301 16.9054 3.33301 14.9838Z"
              stroke="#808283"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

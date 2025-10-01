import { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import RightBarButton from "../RightBar/RightBarButton";
import { AnimatedLogo } from "../AnimatedLogo/AnimatedLogo";
import { AvatarDropdown } from "../AvatarDropdown/AvatarDropdown";

interface HeaderProps {
  rightMenuOpen?: boolean;
  setRightMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({
  rightMenuOpen = false,
  setRightMenuOpen,
}) => {
  return (
    <header className="pb-1 pt-3 w-full pl-[30px] pr-[24px] flex justify-between bg-background items-center gap-2 mb-6">
      {/* Brand */}
      <div className="min-w-[230px]">
        <AnimatedLogo />
      </div>

      {/* Center: Search + Assistant (desktop) */}
      <div className="hidden md:flex items-center gap-4 w-full max-w-[800px]">
        <div className="flex items-center gap-2 h-10 px-4 rounded-3xl border border-[#A06AFFCC] backdrop-blur-[50px] w-full max-w-[256px]">
          <svg
            className="w-6 h-6 flex-shrink-0"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
              stroke="#C2C2C2"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.5 22L20.5 20"
              stroke="#C2C2C2"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="bg-transparent text-[#C2C2C2] text-[15px] font-bold placeholder:text-[#C2C2C2] outline-none w-full"
            placeholder="Search (Ctrl + K)"
          />
        </div>
        <a
          href={"https://aihelp.tyriantrade.com/"}
          target="_blank"
          rel="noreferrer"
          className="flex gap-[6px] items-center"
          aria-label="Open AI Assistant"
        >
          <div className="p-[0.5px] rounded-[4px] bg-gradient-to-r from-[#A06AFF] via-[#A06AFF] to-transparent size-[32px] flex items-center justify-center">
            <div className="p-[2px] bg-black rounded-[4px] size-[29px]">
              <div className="size-[26px] rounded-[4px] bg-background p-[5px] text-white flex items-center justify-center">
                AI
              </div>
            </div>
          </div>
          <span className="font-medium text-[15px] text-white">Assistant</span>
        </a>
      </div>

      {/* Right actions */}
      <div className="flex items-center justify-end max-w-[350px] gap-4">
        <AvatarDropdown />
        {setRightMenuOpen && (
          <RightBarButton
            isCollapsed={rightMenuOpen}
            setIsCollapsed={setRightMenuOpen}
          />
        )}
      </div>
    </header>
  );
};

import { FC, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import LoginModal from "@/components/auth/LoginModal";

interface MenuItem {
  id: string;
  label: string;
  to?: string;
  onClick?: () => void;
  icon: JSX.Element;
}

export const AvatarDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      id: "login",
      label: "Login",
      onClick: () => setIsLoginModalOpen(true),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6.25 6.25L2.5 10M2.5 10L6.25 13.75M2.5 10H12.5M12.5 17.5H14.1667C15.5474 17.5 16.25 16.7974 16.25 15.4167V4.58333C16.25 3.20262 15.5474 2.5 14.1667 2.5H12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      to: "/profile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M17.5 17.5C17.5 14.0482 14.1421 11.25 10 11.25C5.85786 11.25 2.5 14.0482 2.5 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "billing",
      label: "Billing",
      to: "/billing",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2.5 7.5H17.5M2.5 10H17.5M6.25 13.75H8.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3.75 16.25H16.25C16.9404 16.25 17.5 15.6904 17.5 15V5C17.5 4.30964 16.9404 3.75 16.25 3.75H3.75C3.05964 3.75 2.5 4.30964 2.5 5V15C2.5 15.6904 3.05964 16.25 3.75 16.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      id: "pricing",
      label: "Pricing",
      to: "/pricing",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5V17.5M10 2.5C8.61929 2.5 7.5 3.61929 7.5 5C7.5 6.38071 8.61929 7.5 10 7.5M10 2.5C11.3807 2.5 12.5 3.61929 12.5 5C12.5 6.38071 11.3807 7.5 10 7.5M10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5M10 7.5C11.3807 7.5 12.5 8.61929 12.5 10C12.5 11.3807 11.3807 12.5 10 12.5M10 12.5C8.61929 12.5 7.5 13.6193 7.5 15C7.5 16.3807 8.61929 17.5 10 17.5M10 12.5C11.3807 12.5 12.5 13.6193 12.5 15C12.5 16.3807 11.3807 17.5 10 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      id: "logout",
      label: "Logout",
      onClick: () => {
        console.log("Logout clicked");
        // Add logout logic here
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M13.75 13.75L17.5 10M17.5 10L13.75 6.25M17.5 10H7.5M7.5 2.5H5.83333C4.45262 2.5 3.75 3.20262 3.75 4.58333V15.4167C3.75 16.7974 4.45262 17.5 5.83333 17.5H7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-10 rounded-full bg-moonlessNight hover:ring-2 hover:ring-primary/50 transition-all duration-300"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/50 to-moonlessNight flex items-center justify-center text-white font-bold">
          U
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0C101480] backdrop-blur-[100px] border border-[#181B22] rounded-2xl shadow-2xl shadow-black/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {menuItems.map((item) => {
            const content = (
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#181B20] transition-colors duration-200 cursor-pointer group">
                <div className="text-webGray group-hover:text-primary transition-colors duration-200">
                  {item.icon}
                </div>
                <span className="text-white text-[15px] font-semibold group-hover:text-primary transition-colors duration-200">
                  {item.label}
                </span>
              </div>
            );

            if (item.to) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {content}
              </div>
            );
          })}
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

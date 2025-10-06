import { FC } from 'react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked = true }) => (
  <div className="relative w-[18px] h-[18px] flex-shrink-0">
    <div className={`w-[18px] h-[18px] rounded-[3px] ${checked ? 'bg-primary' : 'border border-[#2E2744]'}`} />
    {checked && (
      <svg className="absolute left-1 top-[6px]" width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 2.5L5 6.5L10.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

const NotificationsSettings: FC = () => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1059px] mx-auto">
      {/* Notifications Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Notifications</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">Enable notification sound</span>
            <Checkbox checked={true} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">Show desktop notifications</span>
            <Checkbox checked={true} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">Emails about suspicious login attempts to your account</span>
            <Checkbox checked={true} />
          </div>
        </div>
      </div>

      {/* Your Profile Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white flex-1">Your Profile</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone follows you</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray">Email</span>
                <Checkbox checked={false} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone mentions you in idea comments</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <Checkbox checked={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When you're mentioned in chat while offline</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Ideas Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Your Ideas</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone comments on your idea</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone liked your idea</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authors You Follow Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Authors You Follow</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When they publish a new idea</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When they post a new post</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas You Follow Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Ideas You Follow</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When there's an update</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products You've Favorited or Rated Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Products You've Favorited or Rated</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When there's an update</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opinions Section */}
      <div className="flex flex-col gap-6 p-4 w-full rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <div className="flex pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Opinions</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone mentions you in an opinion</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Email</span>
                <Checkbox checked={true} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-webGray sm:hidden">Web</span>
                <Checkbox checked={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-sm md:text-[15px] font-bold text-white flex-1">When someone mentions you in a comment on an opinion</span>
            <div className="flex items-center gap-6 sm:gap-[76px]">
              <div className="flex flex-col items-center gap-1">
                <Checkbox checked={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2 mb-4">
        <button className="w-full sm:w-[180px] h-[42px] px-4 flex items-center justify-center rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px] text-white text-sm font-bold hover:bg-[rgba(12,16,20,0.7)] transition-all">
          Unsubscribe from all
        </button>
        <button className="w-full sm:w-[180px] h-[42px] px-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#482090] text-white text-sm font-bold hover:opacity-90 transition-opacity">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettings;

import { FC, useState } from 'react';

const CreatePostBox: FC = () => {
  const [sentiment, setSentiment] = useState<'bullish' | 'bearish' | null>('bullish');

  return (
    <div className="flex flex-col items-end gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
      {/* Input area */}
      <div className="flex items-start gap-2 w-full">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88" 
          alt=""
          className="w-11 h-11 rounded-full flex-shrink-0"
        />
        <div className="flex items-center flex-1 px-4 py-3 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
          <input
            type="text"
            placeholder="How do you feel about markets today? Share your ideas here!"
            className="flex-1 bg-transparent text-[15px] font-normal text-webGray placeholder:text-webGray outline-none"
          />
        </div>
        <button className="p-2.5 flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3.51256 9.48744C4.02513 10 4.85008 10 6.5 10C8.14992 10 8.97487 10 9.48744 9.48744C10 8.97487 10 8.14992 10 6.5C10 4.85008 10 4.02513 9.48744 3.51256C8.97487 3 8.14992 3 6.5 3C4.85008 3 4.02513 3 3.51256 3.51256C3 4.02513 3 4.85008 3 6.5C3 8.14992 3 8.97487 3.51256 9.48744Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.51256 20.4874C4.02513 21 4.85008 21 6.5 21C8.14992 21 8.97487 21 9.48744 20.4874C10 19.9749 10 19.1499 10 17.5C10 15.8501 10 15.0251 9.48744 14.5126C8.97487 14 8.14992 14 6.5 14C4.85008 14 4.02513 14 3.51256 14.5126C3 15.0251 3 15.8501 3 17.5C3 19.1499 3 19.9749 3.51256 20.4874Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 4H21" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 15H21" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9H21" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 20H21" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center w-full">
        {/* Sentiment buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSentiment('bullish')}
              className={`flex items-center gap-2 h-[26px] px-2 py-1.5 rounded-lg transition-all ${
                sentiment === 'bullish'
                  ? 'bg-gradient-to-r from-primary to-[#482090]'
                  : 'bg-transparent'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3333 8.66671V5.33337H10" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3334 5.33337L10.0001 8.66671C9.41168 9.25511 9.11755 9.54924 8.75648 9.58177C8.69675 9.58717 8.63675 9.58717 8.57702 9.58177C8.21595 9.54924 7.92181 9.25511 7.33341 8.66671C6.74501 8.07831 6.45085 7.78417 6.08979 7.75164C6.03011 7.74624 5.97005 7.74624 5.91037 7.75164C5.54931 7.78417 5.25512 8.07831 4.66675 8.66671L2.66675 10.6667" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-bold text-white">Bullish</span>
            </button>
            
            <div className="w-px h-5 bg-[#181B22]" />
            
            <button
              onClick={() => setSentiment('bearish')}
              className={`flex items-center gap-2 h-[26px] px-2 py-1.5 rounded-lg transition-all ${
                sentiment === 'bearish'
                  ? 'bg-gradient-to-r from-primary to-[#482090]'
                  : 'bg-transparent'
              }`}
            >
              <span className="text-xs font-bold text-white">Bearish</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3333 7.33337V10.6667H10" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3334 10.6667L10.0001 7.33337C9.41168 6.74497 9.11755 6.45081 8.75648 6.41829C8.69675 6.41291 8.63675 6.41291 8.57702 6.41829C8.21595 6.45081 7.92181 6.74497 7.33341 7.33337C6.74501 7.92177 6.45085 8.21591 6.08979 8.24844C6.03011 8.25384 5.97005 8.25384 5.91037 8.24844C5.54931 8.21591 5.25512 7.92177 4.66675 7.33337L2.66675 5.33337" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Media buttons */}
          <div className="flex items-center gap-2 ml-2">
            <button className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.08325 10C2.08325 6.26809 2.08325 4.40212 3.24262 3.24274C4.40199 2.08337 6.26797 2.08337 9.99992 2.08337C13.7318 2.08337 15.5978 2.08337 16.7573 3.24274C17.9166 4.40212 17.9166 6.26809 17.9166 10C17.9166 13.732 17.9166 15.598 16.7573 16.7574C15.5978 17.9167 13.7318 17.9167 9.99992 17.9167C6.26797 17.9167 4.40199 17.9167 3.24262 16.7574C2.08325 15.598 2.08325 13.732 2.08325 10Z" stroke="#B0B0B0" strokeWidth="1.5"/>
                <path d="M4.16675 17.5C7.81046 13.1458 11.8952 7.40334 17.9147 11.2853" stroke="#B0B0B0" strokeWidth="1.5"/>
              </svg>
            </button>
            <button className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0)">
                  <path d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66675 12.5C7.42685 13.512 8.637 14.1667 10.0001 14.1667C11.3632 14.1667 12.5733 13.512 13.3334 12.5" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.67422 7.5H6.66675M13.3334 7.5H13.3259" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.55548 16.25H6.66659V17.5C6.66659 17.9603 6.29349 18.3334 5.83325 18.3334H4.16659C3.70635 18.3334 3.33325 17.9603 3.33325 17.5V14.1667C3.33325 13.7065 3.70635 13.3334 4.16659 13.3334H5.83325C6.29349 13.3334 6.66659 13.7065 6.66659 14.1667M9.16659 13.3334H10.4166M10.4166 13.3334H11.6666M10.4166 13.3334V18.3334M10.4166 18.3334H9.16659M10.4166 18.3334H11.6666M16.6666 13.3334H14.9999C14.5397 13.3334 14.1666 13.7065 14.1666 14.1667V15.8334M14.1666 15.8334V18.3334M14.1666 15.8334H16.2499" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.6666 10.8333V8.88071C16.6666 8.19942 16.6666 7.85879 16.5398 7.55251C16.4128 7.24623 16.172 7.00537 15.6903 6.52365L11.7432 2.57653C11.3274 2.16079 11.1196 1.95292 10.862 1.82975C10.8084 1.80413 10.7536 1.78139 10.6976 1.76163C10.4283 1.66663 10.1344 1.66663 9.54642 1.66663C6.84227 1.66663 5.49018 1.66663 4.57436 2.40502C4.38934 2.55419 4.22082 2.72272 4.07164 2.90773C3.33325 3.82355 3.33325 5.17564 3.33325 7.87983V10.8333M10.8333 2.08329V2.49996C10.8333 4.85698 10.8333 6.03549 11.5655 6.76773C12.2978 7.49996 13.4763 7.49996 15.8333 7.49996H16.2499" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Post button */}
        <button className="flex items-center justify-center h-[26px] px-2 py-1.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] hover:opacity-90 transition-opacity">
          <span className="text-xs font-bold text-white">Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostBox;

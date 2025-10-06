import { FC, useState, useRef, useEffect } from 'react';

const CreatePostBox: FC = () => {
  const [sentiment, setSentiment] = useState<'bullish' | 'bearish' | null>('bullish');
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 50;

  return (
    <div className="flex flex-col items-end gap-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-4 backdrop-blur-[50px]">
      {/* Input area */}
      <div className="flex w-full items-start gap-2">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88" 
          alt=""
          className="h-11 w-11 flex-shrink-0 rounded-full"
        />
        <div className="relative flex flex-1 flex-col items-center rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] px-4 py-3 shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] backdrop-blur-[50px]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="How do you feel about markets today? Share your ideas here!"
            className="w-full resize-none bg-transparent text-[15px] font-normal text-white placeholder:text-[#B0B0B0] outline-none overflow-hidden min-h-[24px]"
            rows={1}
          />
          {text.length > 0 && (
            <div className="absolute bottom-2 right-3 flex items-center gap-1">
              <span className={`text-xs font-medium transition-colors ${
                isNearLimit ? 'text-[#EF454A]' : 'text-[#B0B0B0]'
              }`}>
                {remainingChars}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Open filters"
          className="group inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-transparent bg-[#A06AFF]/10 text-[#E3D8FF] transition-all duration-200 hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF]/50 focus-visible:ring-offset-0"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 group-hover:scale-105"
          >
            <path d="M3.51256 9.48744C4.02513 10 4.85008 10 6.5 10C8.14992 10 8.97487 10 9.48744 9.48744C10 8.97487 10 8.14992 10 6.5C10 4.85008 10 4.02513 9.48744 3.51256C8.97487 3 8.14992 3 6.5 3C4.85008 3 4.02513 3 3.51256 3.51256C3 4.02513 3 4.85008 3 6.5C3 8.14992 3 8.97487 3.51256 9.48744Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.51256 20.4874C4.02513 21 4.85008 21 6.5 21C8.14992 21 8.97487 21 9.48744 20.4874C10 19.9749 10 19.1499 10 17.5C10 15.8501 10 15.0251 9.48744 14.5126C8.97487 14 8.14992 14 6.5 14C4.85008 14 4.02513 14 3.51256 14.5126C3 15.0251 3 15.8501 3 17.5C3 19.1499 3 19.9749 3.51256 20.4874Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 4H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 20H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex w-full items-center justify-between">
        {/* Left side: Sentiment and Media buttons */}
        <div className="flex items-center gap-2">
          {/* Sentiment buttons */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSentiment('bullish')}
              aria-pressed={sentiment === 'bullish'}
              className={`group inline-flex h-9 items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF]/50 ${
                sentiment === 'bullish'
                  ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]'
                  : 'bg-[#A06AFF]/10 text-[#E3D8FF] hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white'
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <path d="M13.3333 8.66671V5.33337H10" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.3337 5.33337L10.0003 8.66671C9.41193 9.25511 9.11779 9.54924 8.75673 9.58177C8.69699 9.58717 8.63699 9.58717 8.57726 9.58177C8.21619 9.54924 7.92206 9.25511 7.33366 8.66671C6.74526 8.07831 6.45109 7.78417 6.09004 7.75164C6.03035 7.74624 5.9703 7.74624 5.91061 7.75164C5.54956 7.78417 5.25537 8.07831 4.66699 8.66671L2.66699 10.6667" stroke="#2EBD85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-center text-xs font-semibold leading-normal">Bullish</span>
            </button>

            <div className="h-6 w-px bg-[#2F3240]" />

            <button
              type="button"
              onClick={() => setSentiment('bearish')}
              aria-pressed={sentiment === 'bearish'}
              className={`group inline-flex h-9 items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF]/50 ${
                sentiment === 'bearish'
                  ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]'
                  : 'bg-[#A06AFF]/10 text-[#E3D8FF] hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white'
              }`}
            >
              <span className="text-center text-xs font-semibold leading-normal">Bearish</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                <path d="M13.3333 7.33337V10.6667H10" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.3337 10.6667L10.0003 7.33337C9.41193 6.74497 9.11779 6.45081 8.75673 6.41829C8.69699 6.41291 8.63699 6.41291 8.57726 6.41829C8.21619 6.45081 7.92206 6.74497 7.33366 7.33337C6.74526 7.92177 6.45109 8.21591 6.09004 8.24844C6.03035 8.25384 5.9703 8.25384 5.91061 8.24844C5.54956 8.21591 5.25537 7.92177 4.66699 7.33337L2.66699 5.33337" stroke="#EF454A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Media buttons */}
          <div className="flex items-center gap-2">
            <button className="flex h-5 w-5 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.08301 10C2.08301 6.26809 2.08301 4.40212 3.24237 3.24274C4.40175 2.08337 6.26772 2.08337 9.99967 2.08337C13.7316 2.08337 15.5976 2.08337 16.757 3.24274C17.9163 4.40212 17.9163 6.26809 17.9163 10C17.9163 13.732 17.9163 15.598 16.757 16.7574C15.5976 17.9167 13.7316 17.9167 9.99967 17.9167C6.26772 17.9167 4.40175 17.9167 3.24237 16.7574C2.08301 15.598 2.08301 13.732 2.08301 10Z" stroke="#B0B0B0" strokeWidth="1.5"/>
                <path d="M4.16699 17.5C7.81071 13.1458 11.8954 7.40334 17.9149 11.2853" stroke="#B0B0B0" strokeWidth="1.5"/>
              </svg>
            </button>
            <button className="flex h-5 w-5 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_emoji)">
                  <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66699 12.5C7.42709 13.512 8.63724 14.1667 10.0003 14.1667C11.3634 14.1667 12.5736 13.512 13.3337 12.5" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.67447 7.5H6.66699M13.3337 7.5H13.3262" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_emoji">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className="flex h-5 w-5 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.55523 16.25H6.66634V17.5C6.66634 17.9603 6.29324 18.3334 5.83301 18.3334H4.16634C3.70611 18.3334 3.33301 17.9603 3.33301 17.5V14.1667C3.33301 13.7065 3.70611 13.3334 4.16634 13.3334H5.83301C6.29324 13.3334 6.66634 13.7065 6.66634 14.1667M9.16634 13.3334H10.4163M10.4163 13.3334H11.6663M10.4163 13.3334V18.3334M10.4163 18.3334H9.16634M10.4163 18.3334H11.6663M16.6663 13.3334H14.9997C14.5394 13.3334 14.1663 13.7065 14.1663 14.1667V15.8334M14.1663 15.8334V18.3334M14.1663 15.8334H16.2497" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.6663 10.8333V8.88071C16.6663 8.19942 16.6663 7.85879 16.5395 7.55251C16.4126 7.24623 16.1718 7.00537 15.69 6.52365L11.7429 2.57653C11.3272 2.16079 11.1193 1.95292 10.8618 1.82975C10.8082 1.80413 10.7533 1.78139 10.6973 1.76163C10.4281 1.66663 10.1342 1.66663 9.54617 1.66663C6.84202 1.66663 5.48993 1.66663 4.57412 2.40502C4.3891 2.55419 4.22057 2.72272 4.0714 2.90773C3.33301 3.82355 3.33301 5.17564 3.33301 7.87983V10.8333M10.833 2.08329V2.49996C10.833 4.85698 10.833 6.03549 11.5653 6.76773C12.2975 7.49996 13.476 7.49996 15.833 7.49996H16.2497" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Post button */}
        <button className="flex h-[26px] w-[70px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#A06AFF] to-[#482090] px-2 py-1.5 hover:opacity-90 transition-opacity">
          <span className="text-center text-xs font-bold leading-normal text-white">Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostBox;

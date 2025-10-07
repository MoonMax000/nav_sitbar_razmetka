import { FC, useState, useRef, useEffect } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | null>("bullish");
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 500;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (text.trim() || images.length > 0) {
      console.log("Posting:", { text, sentiment, images });
      setText("");
      setImages([]);
      setSentiment("bullish");
      onClose();
    }
  };

  const handleClose = () => {
    setText("");
    setImages([]);
    setSentiment("bullish");
    onClose();
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 50;
  const canPost = text.trim().length > 0 || images.length > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[600px] rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.96)] backdrop-blur-[100px] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#181B22] px-4 py-3">
          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white">Create Post</h2>
          <div className="w-9" />
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto px-4 py-4">
          {/* User info */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88"
              alt="User avatar"
              className="h-12 w-12 flex-shrink-0 rounded-full"
            />
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="How do you feel about markets today? Share your ideas here!"
                className="w-full resize-none bg-transparent text-[17px] font-normal text-white placeholder:text-[#71767B] outline-none min-h-[120px]"
                autoFocus
              />
            </div>
          </div>

          {/* Image preview */}
          {images.length > 0 && (
            <div className={`grid gap-2 mb-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {images.map((image, index) => (
                <div key={index} className="relative group rounded-2xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sentiment selector */}
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSentiment("bullish")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                sentiment === "bullish"
                  ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-lg shadow-[#A06AFF]/30"
                  : "bg-[#A06AFF]/10 text-[#E3D8FF] hover:bg-[#A06AFF]/20"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
              Bullish
            </button>

            <button
              type="button"
              onClick={() => setSentiment("bearish")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                sentiment === "bearish"
                  ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-lg shadow-[#A06AFF]/30"
                  : "bg-[#A06AFF]/10 text-[#E3D8FF] hover:bg-[#A06AFF]/20"
              }`}
            >
              Bearish
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.3333 7.33337V10.6667H10"
                  stroke="#EF454A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3337 10.6667L10.0003 7.33337C9.41193 6.74497 9.11779 6.45081 8.75673 6.41829C8.69699 6.41291 8.63699 6.41291 8.57726 6.41829C8.21619 6.45081 7.92206 6.74497 7.33366 7.33337C6.74526 7.92177 6.45109 8.21591 6.09004 8.24844C6.03035 8.25384 5.9703 8.25384 5.91061 8.24844C5.54956 8.21591 5.25537 7.92177 4.66699 7.33337L2.66699 5.33337"
                  stroke="#EF454A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#181B22] px-4 py-3 rounded-b-2xl bg-[rgba(12,16,20,0.9)]">
          <div className="flex items-center justify-between">
            {/* Media actions */}
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add photos"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.08301 10C2.08301 6.26809 2.08301 4.40212 3.24237 3.24274C4.40175 2.08337 6.26772 2.08337 9.99967 2.08337C13.7316 2.08337 15.5976 2.08337 16.757 3.24274C17.9163 4.40212 17.9163 6.26809 17.9163 10C17.9163 13.732 17.9163 15.598 16.757 16.7574C15.5976 17.9167 13.7316 17.9167 9.99967 17.9167C6.26772 17.9167 4.40175 17.9167 3.24237 16.7574C2.08301 15.598 2.08301 13.732 2.08301 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4.16699 17.5C7.81071 13.1458 11.8954 7.40334 17.9149 11.2853"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add emoji"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66699 12.5C7.42709 13.512 8.63724 14.1667 10.0003 14.1667C11.3634 14.1667 12.5736 13.512 13.3337 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.67447 7.5H6.66699M13.3337 7.5H13.3262"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add GIF"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.55523 16.25H6.66634V17.5C6.66634 17.9603 6.29324 18.3334 5.83301 18.3334H4.16634C3.70611 18.3334 3.33301 17.9603 3.33301 17.5V14.1667C3.33301 13.7065 3.70611 13.3334 4.16634 13.3334H5.83301C6.29324 13.3334 6.66634 13.7065 6.66634 14.1667M9.16634 13.3334H10.4163M10.4163 13.3334H11.6663M10.4163 13.3334V18.3334M10.4163 18.3334H9.16634M10.4163 18.3334H11.6663M16.6663 13.3334H14.9997C14.5394 13.3334 14.1663 13.7065 14.1663 14.1667V15.8334M14.1663 15.8334V18.3334M14.1663 15.8334H16.2497"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6663 10.8333V8.88071C16.6663 8.19942 16.6663 7.85879 16.5395 7.55251C16.4126 7.24623 16.1718 7.00537 15.69 6.52365L11.7429 2.57653C11.3272 2.16079 11.1193 1.95292 10.8618 1.82975C10.8082 1.80413 10.7533 1.78139 10.6973 1.76163C10.4281 1.66663 10.1342 1.66663 9.54617 1.66663C6.84202 1.66663 5.48993 1.66663 4.57412 2.40502C4.3891 2.55419 4.22057 2.72272 4.0714 2.90773C3.33301 3.82355 3.33301 5.17564 3.33301 7.87983V10.8333M10.833 2.08329V2.49996C10.833 4.85698 10.833 6.03549 11.5653 6.76773C12.2975 7.49996 13.476 7.49996 15.833 7.49996H16.2497"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D9BF0] transition-colors hover:bg-[#1D9BF0]/10"
                title="Add location"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 5.83317C8.39169 5.83317 7.08335 7.1415 7.08335 8.74984C7.08335 10.3582 8.39169 11.6665 10 11.6665C11.6084 11.6665 12.9167 10.3582 12.9167 8.74984C12.9167 7.1415 11.6084 5.83317 10 5.83317ZM10 9.99984C9.31085 9.99984 8.75002 9.439 8.75002 8.74984C8.75002 8.06067 9.31085 7.49984 10 7.49984C10.6892 7.49984 11.25 8.06067 11.25 8.74984C11.25 9.439 10.6892 9.99984 10 9.99984ZM10 1.6665C6.09419 1.6665 2.91669 4.844 2.91669 8.74984C2.91669 13.7223 9.26752 18.0132 9.53752 18.1932L10 18.5015L10.4625 18.1932C10.7325 18.0132 17.0834 13.7223 17.0834 8.74984C17.0834 4.844 13.9059 1.6665 10 1.6665ZM10 16.4748C8.61252 15.4407 4.58335 12.1448 4.58335 8.74984C4.58335 5.76317 7.01335 3.33317 10 3.33317C12.9867 3.33317 15.4167 5.76317 15.4167 8.74984C15.4167 12.144 11.3875 15.4398 10 16.4748Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Character count and Post button */}
            <div className="flex items-center gap-3">
              {text.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#2F3336"
                      strokeWidth="4"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke={isNearLimit ? "#EF454A" : "#1D9BF0"}
                      strokeWidth="4"
                      strokeDasharray={`${(text.length / maxLength) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {isNearLimit && (
                    <span className="text-sm font-medium text-[#EF454A]">
                      {remainingChars}
                    </span>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={handlePost}
                disabled={!canPost}
                className={`inline-flex h-10 min-w-[80px] items-center justify-center rounded-full px-6 text-[15px] font-bold transition-all ${
                  canPost
                    ? "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]"
                    : "bg-[#1D9BF0]/50 text-white/50 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

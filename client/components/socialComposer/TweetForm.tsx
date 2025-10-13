"use client";

import { useState, useRef, useEffect } from "react";
import { Image, Video, BarChart3, Smile, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TweetFormProps {
  submitText?: string;
  onSubmit: (text: string) => Promise<void>;
  className?: string;
  placeholder?: string;
  collapsedOnMount?: boolean;
  minHeight?: number;
  shouldFocus?: boolean;
  replyingTo?: string | null;
  userAvatar?: string;
  userName?: string;
}

const MAX_CHARS = 280;

const actions = [
  { id: "image", Icon: Image, alt: "Image", color: "#A06AFF" },
  { id: "video", Icon: Video, alt: "Video", color: "#A06AFF" },
  { id: "poll", Icon: BarChart3, alt: "Poll", color: "#A06AFF" },
  { id: "emoji", Icon: Smile, alt: "Emoji", color: "#A06AFF" },
  { id: "schedule", Icon: Calendar, alt: "Schedule", color: "#A06AFF" },
  { id: "location", Icon: MapPin, alt: "Location", color: "#A06AFF", disabled: true },
];

export default function TweetForm({
  submitText = "Post",
  onSubmit,
  className,
  placeholder = "What's happening?",
  collapsedOnMount = false,
  minHeight = 120,
  shouldFocus = false,
  replyingTo = null,
  userAvatar = "https://i.pravatar.cc/120?img=12",
  userName = "Current User",
}: TweetFormProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [expanded, setExpanded] = useState(!collapsedOnMount);
  const [text, setText] = useState("");

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const percentage = text.length >= MAX_CHARS ? 100 : (text.length / MAX_CHARS) * 100;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (exceededMax) {
      alert("Post cannot exceed " + MAX_CHARS + " characters");
      return;
    }

    await onSubmit(text);
    setText("");
  };

  const onClick = () => {
    setExpanded(true);
  };

  const isInputEmpty = !Boolean(text);
  const charsLeft = MAX_CHARS - text.length;
  const maxAlmostReached = charsLeft <= 20;
  const exceededMax = charsLeft < 0;
  const isReplying = Boolean(replyingTo);

  return (
    <div className={cn("w-full", className)}>
      {isReplying && expanded && (
        <span className="ml-14 mb-2.5 flex text-sm text-muted-foreground">
          Replying to <span className="ml-1 text-[#1D9BF0]">@{replyingTo}</span>
        </span>
      )}
      <form
        onSubmit={submit}
        className={cn("w-full flex", expanded ? "items-start" : "items-center")}
        style={{ minHeight: expanded ? `${minHeight}px` : "40px" }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </div>

        <div className={cn("flex-1 flex", expanded ? "flex-col" : "flex-row items-center")}>
          <textarea
            ref={inputRef}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            value={text}
            onClick={onClick}
            className="w-full bg-transparent border-none pt-2.5 pb-0 text-lg resize-none outline-none text-white placeholder:text-[#4E5A66] flex-1"
            style={{ minHeight: expanded ? `${minHeight - 50}px` : "40px" }}
          />

          <div
            className={cn(
              "flex h-12 items-center",
              expanded ? "mt-auto" : "mt-0"
            )}
          >
            {expanded &&
              actions.map((action) => (
                <button
                  type="button"
                  disabled={action.disabled}
                  key={action.id}
                  className="disabled:opacity-50 hover:bg-white/10 p-2 rounded-full transition-colors"
                  title={action.alt}
                >
                  <action.Icon size={19} color={action.color} />
                </button>
              ))}

            <div className="flex items-center ml-auto">
              {!isInputEmpty && (
                <div className="relative">
                  <svg
                    className="-rotate-90"
                    width={maxAlmostReached ? "38" : "28"}
                    height={maxAlmostReached ? "38" : "28"}
                  >
                    <circle
                      cx={maxAlmostReached ? "19" : "14"}
                      cy={maxAlmostReached ? "19" : "14"}
                      r={maxAlmostReached ? "17" : "12"}
                      fill="none"
                      stroke="rgba(113, 118, 123, 0.3)"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx={maxAlmostReached ? "19" : "14"}
                      cy={maxAlmostReached ? "19" : "14"}
                      r={maxAlmostReached ? "17" : "12"}
                      fill="none"
                      stroke={
                        exceededMax
                          ? "red"
                          : maxAlmostReached
                          ? "#ffd400"
                          : "#1D9BF0"
                      }
                      strokeWidth="2.2"
                      strokeDasharray={`${percentage * (maxAlmostReached ? 106.8 : 75.4) / 100} ${
                        maxAlmostReached ? 106.8 : 75.4
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {maxAlmostReached && (
                    <span
                      className={cn(
                        "absolute top-0 bottom-0 left-0 right-0 m-auto h-max w-max text-sm",
                        exceededMax ? "text-red-500" : "text-muted-foreground"
                      )}
                    >
                      {charsLeft}
                    </span>
                  )}
                </div>
              )}
              {!isInputEmpty && <hr className="h-7 w-0.5 border-none bg-[#444] mx-4" />}
              <button
                type="submit"
                className="bg-[#1D9BF0] px-5 py-2.5 text-white rounded-full font-bold text-base disabled:opacity-60 hover:bg-[#1A8CD8] transition-colors"
                disabled={isInputEmpty}
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

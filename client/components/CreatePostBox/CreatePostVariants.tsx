import React, { useState, ChangeEvent } from "react";
import { toast } from "@/hooks/use-toast";

const CHAR_LIMIT = 280;

function usePostState(initial = "") {
  const [text, setText] = useState(initial);
  const [files, setFiles] = useState<File[]>([]);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files;
    if (!f) return;
    setFiles((prev) => [...prev, ...Array.from(f)]);
  }

  function clear() {
    setText("");
    setFiles([]);
  }

  return { text, setText, files, setFiles, onFileChange, clear };
}

const Avatar = ({ size = 44 }: { size?: number }) => (
  <img
    src="https://api.builder.io/api/v1/image/assets/TEMP/928e0a03eef447eade18cba6b182af59d4bd42b9?width=88"
    alt="avatar"
    className={`h-${size} w-${size} rounded-full object-cover flex-shrink-0`}
    style={{ width: size, height: size }}
  />
);

const VariantCompact: React.FC = () => {
  const { text, setText, files, onFileChange, clear } = usePostState("");

  const canPost = text.trim().length > 0 || files.length > 0;

  function handlePost() {
    if (!canPost) return;
    toast({ title: "Опубликовано", description: "Пост успешно создан" });
    console.log("Post (compact)", { text, files });
    clear();
  }

  return (
    <div className="rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-3">
      <div className="flex items-center gap-3">
        <Avatar size={40} />
        <button
          className="flex-1 text-left text-[#B0B0B0]"
          onClick={() => {
            // focus behavior handled by underlying input
          }}
          aria-label="Start a post"
        >
          What's happening?
        </button>
        <div className="flex items-center gap-2">
          <label className="cursor-pointer text-[#3BA2FF]">
            <input type="file" multiple className="hidden" onChange={onFileChange} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
              <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 8L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          <button
            onClick={handlePost}
            disabled={!canPost}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${canPost ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white' : 'bg-white/5 text-[#9AA0A8] cursor-not-allowed'}`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const VariantInline: React.FC = () => {
  const { text, setText, files, onFileChange, clear } = usePostState("");
  const remaining = CHAR_LIMIT - text.length;
  const canPost = text.trim().length > 0 || files.length > 0;

  function handlePost() {
    if (!canPost) return;
    toast({ title: "Опубликовано", description: "Пост успешно создан" });
    console.log("Post (inline)", { text, files });
    clear();
  }

  return (
    <div className="rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-4">
      <div className="flex items-start gap-3">
        <Avatar size={48} />
        <div className="flex-1">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={CHAR_LIMIT}
            placeholder="What's happening?"
            className="w-full bg-transparent text-white placeholder:text-[#8B98A5] outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#3BA2FF]">
              <label className="cursor-pointer">
                <input type="file" multiple className="hidden" onChange={onFileChange} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
              <button className="text-[#9AA0A8]">GIF</button>
              <button className="text-[#9AA0A8]">Emoji</button>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${remaining < 20 ? 'text-[#FF7A7A]' : 'text-[#9AA0A8]'}`}>{remaining}</span>
              <button
                onClick={handlePost}
                disabled={!canPost}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${canPost ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white' : 'bg-white/5 text-[#9AA0A8] cursor-not-allowed'}`}
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

const VariantExpanded: React.FC = () => {
  const { text, setText, files, onFileChange, clear } = usePostState("");
  const remaining = CHAR_LIMIT - text.length;
  const canPost = text.trim().length > 0 || files.length > 0;

  function handlePost() {
    if (!canPost) return;
    toast({ title: "Опубликовано", description: "Пост успешно создан" });
    console.log("Post (expanded)", { text, files });
    clear();
  }

  return (
    <div className="rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-4">
      <div className="flex items-start gap-4">
        <Avatar size={56} />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            rows={4}
            maxLength={CHAR_LIMIT}
            className="w-full resize-none bg-transparent text-white placeholder:text-[#8B98A5] outline-none"
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#3BA2FF]">
              <label className="cursor-pointer">
                <input type="file" multiple className="hidden" onChange={onFileChange} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
              <button className="text-[#9AA0A8]">GIF</button>
              <button className="text-[#9AA0A8]">Emoji</button>
              <button className="text-[#9AA0A8]">Poll</button>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-sm ${remaining < 20 ? 'text-[#FF7A7A]' : 'text-[#9AA0A8]'}`}>{remaining}</span>
              <button
                onClick={handlePost}
                disabled={!canPost}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${canPost ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white' : 'bg-white/5 text-[#9AA0A8] cursor-not-allowed'}`}
              >
                Post
              </button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {files.map((f, idx) => (
                <div key={idx} className="h-24 w-full overflow-hidden rounded-md bg-[#0C0C0C]">
                  <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreatePostVariants: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <VariantCompact />
      <VariantInline />
      <VariantExpanded />
    </div>
  );
};

export default CreatePostVariants;

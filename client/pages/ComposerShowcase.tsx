import { FC, useState } from "react";
import CreatePostModal from "../components/CreatePostBox/CreatePostModal";
import { MediaEditor } from "../components/CreatePostBox/MediaEditor";
import { EmojiPicker } from "../components/CreatePostBox/EmojiPicker";
import { DraftsList } from "../components/CreatePostBox/DraftsList";
import { CodeBlockModal } from "../components/CreatePostBox/CodeBlockModal";
import { MediaItem, createDefaultTransform } from "../components/CreatePostBox/types";

type ShowcaseState = 
  | "empty"
  | "with-text"
  | "with-media"
  | "with-multiple-media"
  | "with-code"
  | "with-thread"
  | "media-editor-crop"
  | "media-editor-alt"
  | "media-editor-warning"
  | "emoji-picker"
  | "code-modal"
  | "drafts-list";

const ComposerShowcase: FC = () => {
  const [activeState, setActiveState] = useState<ShowcaseState | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  const sampleMedia: MediaItem = {
    id: "sample-1",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    type: "image",
    alt: "Sample image",
    transform: createDefaultTransform(),
    sensitiveTags: [],
  };

  const sampleMediaWithWarning: MediaItem = {
    id: "sample-2",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
    type: "image",
    alt: "Image with content warning",
    transform: createDefaultTransform(),
    sensitiveTags: ["nudity", "violence"],
  };

  const states: { id: ShowcaseState; label: string; description: string }[] = [
    { id: "empty", label: "Empty Modal", description: "Базовое пустое окно" },
    { id: "with-text", label: "With Text", description: "С текстом" },
    { id: "with-media", label: "Single Media", description: "С одним фото" },
    { id: "with-multiple-media", label: "Multiple Media", description: "С несколькими фото" },
    { id: "with-code", label: "With Code Block", description: "С код-блоком" },
    { id: "with-thread", label: "Thread", description: "Тред из нескольких постов" },
    { id: "media-editor-crop", label: "Media Editor - Crop", description: "Редактор медиа (кроп)" },
    { id: "media-editor-alt", label: "Media Editor - ALT", description: "Редактор медиа (ALT текст)" },
    { id: "media-editor-warning", label: "Media Editor - Warning", description: "Редактор медиа (предупреждение)" },
    { id: "emoji-picker", label: "Emoji Picker", description: "Выбор эмодзи" },
    { id: "code-modal", label: "Code Block Modal", description: "Окно добавления кода" },
    { id: "drafts-list", label: "Drafts List", description: "Список черновиков" },
  ];

  const handleOpenState = (state: ShowcaseState) => {
    setActiveState(state);
    
    // Special handling for specific states
    switch (state) {
      case "media-editor-crop":
      case "media-editor-alt":
      case "media-editor-warning":
        setEditingMedia(sampleMedia);
        break;
      case "emoji-picker":
        setShowEmojiPicker(true);
        break;
      case "code-modal":
        setShowCodeModal(true);
        break;
      case "drafts-list":
        setShowDrafts(true);
        break;
    }
  };

  const handleCloseAll = () => {
    setActiveState(null);
    setEditingMedia(null);
    setShowEmojiPicker(false);
    setShowCodeModal(false);
    setShowDrafts(false);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Post Composer <span className="text-gradient-purple">Showcase</span>
            </h1>
            <p className="text-[#808283] text-lg">
              Все состояния окна создания поста для ��естирования и настройки
            </p>
          </div>

          <div className="rounded-2xl border border-[#A06AFF]/30 bg-gradient-to-br from-[#A06AFF]/10 to-transparent p-6 backdrop-blur-[50px]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A06AFF]/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#A06AFF]">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Как использовать эту страницу
                </h3>
                <ul className="space-y-2 text-sm text-[#E7E9EA]">
                  <li>• Нажмите на любую карточку для открытия нужного состояния</li>
                  <li>• Тестируйте функционал и дизайн в реальном времени</li>
                  <li>• Используйте горячие клавиши для быстрой навигации</li>
                  <li>• Страница доступна по адресу: <code className="px-2 py-1 bg-[#2F3336] rounded text-[#A06AFF]">/composer-showcase</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => handleOpenState(state.id)}
              className="group relative overflow-hidden rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-6 text-left transition-all hover:border-[#A06AFF] hover:bg-[rgba(12,16,20,0.8)] backdrop-blur-[50px]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {state.label}
                  </h3>
                  <p className="text-sm text-[#808283]">
                    {state.description}
                  </p>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#A06AFF] transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-6 backdrop-blur-[50px]">
          <h2 className="text-xl font-semibold text-white mb-4">
            Горячие клавиши
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#A06AFF] mb-2">Общие</h3>
              <ul className="space-y-2 text-sm text-[#E7E9EA]">
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">Esc</kbd> — Закрыть</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">Cmd+Enter</kbd> — Опубликовать</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#A06AFF] mb-2">Media Editor</h3>
              <ul className="space-y-2 text-sm text-[#E7E9EA]">
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">R</kbd> — Rotate</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">H</kbd> — Flip Horizontal</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">V</kbd> — Flip Vertical</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">G</kbd> — Toggle Grid</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">↑/↓/←/→</kbd> — Move</li>
                <li><kbd className="px-2 py-1 bg-[#2F3336] rounded">+/-</kbd> — Zoom</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-6 backdrop-blur-[50px]">
          <h2 className="text-xl font-semibold text-white mb-4">
            Текущие ограничения
          </h2>
          <ul className="space-y-2 text-sm text-[#E7E9EA]">
            <li>• Максимум символов на пост: <span className="text-[#A06AFF]">280</span></li>
            <li>• Максимум медиа: <span className="text-[#A06AFF]">4</span></li>
            <li>• Максимум постов в треде: <span className="text-[#A06AFF]">25</span></li>
            <li>• Максимум символов в ALT: <span className="text-[#A06AFF]">1000</span></li>
          </ul>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={activeState !== null && !["media-editor-crop", "media-editor-alt", "media-editor-warning", "emoji-picker", "code-modal", "drafts-list"].includes(activeState)}
        onClose={handleCloseAll}
      />

      <MediaEditor
        media={editingMedia}
        onSave={(updated) => {
          console.log("Media updated:", updated);
          handleCloseAll();
        }}
        onClose={handleCloseAll}
      />

      {showEmojiPicker && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={handleCloseAll}
              className="absolute -top-12 right-0 text-white hover:text-[#A06AFF]"
            >
              Закрыть
            </button>
            <div className="h-96 w-96 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.95)] p-4 backdrop-blur-[100px]">
              <EmojiPicker onSelect={(emoji) => console.log("Selected:", emoji)} />
            </div>
          </div>
        </div>
      )}

      <CodeBlockModal
        isOpen={showCodeModal}
        onClose={handleCloseAll}
        onInsert={(code, lang) => {
          console.log("Code inserted:", { code, lang });
          handleCloseAll();
        }}
      />

      <DraftsList
        isOpen={showDrafts}
        onClose={handleCloseAll}
        onOpen={(draft) => {
          console.log("Draft opened:", draft);
          handleCloseAll();
        }}
        onDelete={(id) => console.log("Draft deleted:", id)}
      />
    </div>
  );
};

export default ComposerShowcase;

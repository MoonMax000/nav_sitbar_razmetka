import type { FC } from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostModal from "@/components/CreatePostBox/CreatePostModal";
import { toast } from "@/hooks/use-toast";
import type { SocialPost } from "@/data/socialPosts";

interface ComposerBlock {
  id: string;
  text: string;
}

const MAX_BLOCKS = 6;
const CHAR_LIMIT = 280;

const audienceOptions = [
  { id: "everyone", label: "Все", description: "Сообщение увидят все пользователи" },
  { id: "followers", label: "Подписчики", description: "Только те, кто подписан на вас" },
  { id: "verified", label: "Верифицированные", description: "Только подтвержденные аккаунты" },
];

const quickPrompts = [
  {
    id: "macro",
    title: "Разбор макропоказателей",
    description: "Разберите CPI, PMI и реакцию рынков на последнюю публикацию",
  },
  {
    id: "alpha",
    title: "Сигнал дня",
    description: "Опишите трейд с четким входом, стопом и целью для подписчиков",
  },
  {
    id: "thread",
    title: "Тред по AI",
    description: "Поделитесь, как вы используете модели LLM в анализе рынков",
  },
];

const publishingTips = [
  "Используйте первые 120 символов, чтобы зацепить внимание",
  "Заканчивайте пост вопросом — это повышает вовлеченность",
  "Дополняйте пост быстрым TL;DR для читателей мобильной версии",
  "Фиксируйте ключевые уровни цен и указывайте источник данных",
];

const trendingTags = [
  "#MacroOutlook",
  "#AITrading",
  "#Commodities",
  "#QuantInsights",
  "#CryptoFlows",
];

const SocialCompose: FC = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<ComposerBlock[]>([{ id: "block-1", text: "" }]);
  const [audience, setAudience] = useState<string>("everyone");
  const [isAdvancedComposerOpen, setIsAdvancedComposerOpen] = useState(false);

  const totalCharacters = useMemo(
    () => blocks.reduce((sum, block) => sum + block.text.length, 0),
    [blocks],
  );

  const canPost = useMemo(
    () => blocks.some((block) => block.text.trim().length > 0) && blocks.every((block) => block.text.length <= CHAR_LIMIT),
    [blocks],
  );

  const handleBlockChange = (id: string, value: string) => {
    if (value.length > CHAR_LIMIT) return;
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, text: value } : block)));
  };

  const handleAddBlock = () => {
    if (blocks.length >= MAX_BLOCKS) return;
    const nextId = `block-${Date.now()}`;
    setBlocks((prev) => [...prev, { id: nextId, text: "" }]);
  };

  const handleRemoveBlock = (id: string) => {
    if (blocks.length === 1) return;
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const applyPrompt = (prompt: typeof quickPrompts[number]) => {
    if (blocks.length === 1 && !blocks[0].text) {
      setBlocks([{ id: "block-1", text: `${prompt.title}: ` }]);
      return;
    }

    const nextId = `block-${Date.now()}`;
    setBlocks((prev) => [...prev, { id: nextId, text: `${prompt.title}: ` }]);
  };

  const handleReset = () => {
    setBlocks([{ id: "block-1", text: "" }]);
  };

  const handlePost = () => {
    if (!canPost) return;

    const trimmedBlocks = blocks.map((block) => block.text.trim()).filter((content) => content.length > 0);
    const primaryBlock = trimmedBlocks[0] ?? "";
    const [headlineCandidate, ...restHeadline] = primaryBlock.split("\n");
    const headline = headlineCandidate.trim();

    const bodySections = primaryBlock.length > 0 ? [primaryBlock, ...trimmedBlocks.slice(1)] : trimmedBlocks.slice(1);
    const body = bodySections.join("\n\n").trim();
    const previewSource = [headline, ...restHeadline, ...trimmedBlocks.slice(1)].filter((section) => section.length > 0).join(" ");
    const preview = previewSource.length > 220 ? `${previewSource.slice(0, 217)}…` : previewSource;

    const now = new Date();
    const formattedTimestamp = new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(now);

    const newPost: SocialPost = {
      id: `draft-${now.getTime()}`,
      type: "article",
      author: {
        name: "Tyrian Creator",
        avatar: "/placeholder.svg",
        handle: "@tyrian_creator",
        verified: true,
      },
      timestamp: formattedTimestamp,
      title: headline || "Новая публикация",
      category: audience === "everyone" ? "Публично" : audience === "followers" ? "Подписчики" : "Верифицированные",
      preview: preview || undefined,
      body: body.length > 0 ? body : undefined,
      sentiment: "bullish",
      likes: 0,
      comments: 0,
      views: 0,
      hashtags: [],
    };

    toast({
      title: "Пост опубликован",
      description: "Мы подготовили предварительный просмотр. Теперь можно подключать бэкенд.",
    });

    console.info("Composer payload", { audience, blocks: trimmedBlocks, post: newPost });
    navigate("/social/post/preview", { state: { post: newPost } });
    handleReset();
  };

  return (
    <div className="flex w-full justify-center pb-12">
      <div className="grid w-full max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,320px)]">
        <section className="flex min-h-screen flex-col gap-6">
          <header className="rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.65)] p-6 shadow-[0_18px_45px_-30px_rgba(160,106,255,0.8)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white">Создать пост</h1>
                <p className="text-sm text-[#808283]">
                  Сформируйте тред или одиночный пост, настройте аудиторию и сохраните шаблоны для команды.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdvancedComposerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
              >
                Открыть расширенный режим
              </button>
            </div>
          </header>

          <div className="flex flex-col gap-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6C7080]">Аудитория</span>
              <div className="flex flex-wrap gap-2">
                {audienceOptions.map((option) => {
                  const isActive = audience === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAudience(option.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white"
                          : "border-[#181B22] bg-white/5 text-[#C7C9D1] hover:border-[#A06AFF]/40 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              {blocks.map((block, index) => {
                const remaining = CHAR_LIMIT - block.text.length;
                const isNearLimit = remaining <= 40;

                return (
                  <article
                    key={block.id}
                    className="flex flex-col gap-3 rounded-2xl border border-[#181B22] bg-[rgba(12,16,20,0.55)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#6C7080]">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#181B22] text-xs font-semibold text-white/70">
                          {index + 1}
                        </span>
                        <span>{index === 0 ? "Основной пост" : "Дополнительный блок"}</span>
                      </div>
                      {blocks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBlock(block.id)}
                          className="text-xs font-semibold text-[#A06AFF] transition hover:text-white"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                    <textarea
                      value={block.text}
                      onChange={(event) => handleBlockChange(block.id, event.target.value)}
                      placeholder={index === 0 ? "Расскажите, что происходит на рынках…" : "Продолжение треда"}
                      className="min-h-[140px] resize-y rounded-2xl border border-transparent bg-black/30 p-4 text-[15px] text-white placeholder:text-[#6C7080] focus:border-[#A06AFF] focus:outline-none focus:ring-2 focus:ring-[#A06AFF]/40"
                    />
                    <div className="flex items-center justify-between text-xs text-[#6C7080]">
                      <span>Символов: {block.text.length} / {CHAR_LIMIT}</span>
                      {isNearLimit && (
                        <span className={remaining < 0 ? "text-[#EF454A]" : "text-[#FFD400]"}>
                          Осталось: {remaining}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleAddBlock}
                  disabled={blocks.length >= MAX_BLOCKS}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#A06AFF] px-4 py-2 text-sm font-semibold text-[#A06AFF] transition hover:border-solid hover:bg-[#A06AFF]/10 disabled:cursor-not-allowed disabled:border-[#2F3336] disabled:text-[#2F3336]"
                >
                  Добавить блок
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border border-[#181B22] px-4 py-2 text-sm font-semibold text-[#6C7080] transition hover:border-[#A06AFF]/40 hover:text-white"
                >
                  Очистить
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6C7080]">
                <span>Всего символов: {totalCharacters}</span>
                <span>Блоков: {blocks.length}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePost}
                disabled={!canPost}
                className={`inline-flex h-11 min-w-[120px] items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                  canPost
                    ? "bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white hover:shadow-[0_12px_30px_-18px_rgba(160,106,255,0.8)]"
                    : "cursor-not-allowed bg-[#A06AFF]/20 text-white/40"
                }`}
              >
                Опубликовать
              </button>
              <button
                type="button"
                onClick={() => setIsAdvancedComposerOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-[#181B22] px-4 py-2 text-sm font-semibold text-[#E3D8FF] transition hover:border-[#A06AFF]/40 hover:text-white"
              >
                Сохранить как черновик
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => applyPrompt(prompt)}
                className="flex h-full flex-col items-start gap-3 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5 text-left transition hover:border-[#A06AFF]/40 hover:shadow-[0_18px_45px_-35px_rgba(160,106,255,0.8)]"
              >
                <span className="rounded-full bg-[#A06AFF]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#E3D8FF]">
                  Шаблон
                </span>
                <span className="text-lg font-semibold text-white">{prompt.title}</span>
                <span className="text-sm text-[#B0B0B0]">{prompt.description}</span>
                <span className="text-sm font-semibold text-[#A06AFF]">Добавить в композер →</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="hidden w-full max-w-[320px] flex-col gap-5 lg:flex">
          <div className="flex flex-col gap-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5">
            <h2 className="text-lg font-semibold text-white">Советы по публикации</h2>
            <ul className="space-y-3 text-sm text-[#B0B0B0]">
              {publishingTips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#A06AFF]" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5">
            <h3 className="text-lg font-semibold text-white">Хэштеги дня</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {trendingTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#181B22] px-3 py-1 text-[#A06AFF]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#6C7080]">
              Собрали темы, которые сейчас приносят наибольшую вовлеченность в сообществе.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5">
            <h3 className="text-lg font-semibold text-white">Регламент команды</h3>
            <div className="flex flex-col gap-2 text-sm text-[#B0B0B0]">
              <span>• Публикуем не менее 2 аналитических постов в день</span>
              <span>• Каждую пятницу — тред с итогами недели</span>
              <span>• Указываем источники данных и ссылку на наш сайт</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAdvancedComposerOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-[#4FC3F7] to-[#8057FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:shadow-[0_12px_30px_-18px_rgba(79,195,247,0.6)]"
            >
              Открыть черновики
            </button>
          </div>
        </aside>
      </div>

      <CreatePostModal isOpen={isAdvancedComposerOpen} onClose={() => setIsAdvancedComposerOpen(false)} />
    </div>
  );
};

export default SocialCompose;

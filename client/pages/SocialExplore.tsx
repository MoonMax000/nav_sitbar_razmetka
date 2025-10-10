import type { FC } from "react";

import SuggestedProfilesWidget, {
  SuggestedProfile,
} from "@/components/SocialFeedWidgets/SuggestedProfilesWidget";
import TrendingTopicsWidget, {
  TrendingTopic,
} from "@/components/SocialFeedWidgets/TrendingTopicsWidget";

interface ExploreCollection {
  id: string;
  title: string;
  description: string;
  accent: string;
}

interface ExploreStory {
  id: string;
  category: string;
  title: string;
  summary: string;
  author: string;
  readTime: string;
}

const categories = [
  "Все",
  "Криптовалюты",
  "Рынки",
  "AI",
  "IPO",
  "NFT",
  "Фьючерсы",
  "Мировые новости",
];

const exploreCollections: ExploreCollection[] = [
  {
    id: "macro-playbook",
    title: "Макростратегии 2025",
    description: "14 подборок аналитики по макроэкономике и валютам",
    accent: "from-[#A06AFF] to-[#482090]",
  },
  {
    id: "ai-alpha",
    title: "AI Alpha Insider",
    description: "Лучшие трейды на пересечении технологий и рынков",
    accent: "from-[#4FC3F7] to-[#8057FF]",
  },
  {
    id: "pro-traders",
    title: "Профессиональные трейдеры",
    description: "Сигналы, живые сессии и менторские комнаты",
    accent: "from-[#2EBD85] to-[#0F6D40]",
  },
  {
    id: "weekends",
    title: "Выходные с трейдерами",
    description: "Топовые разборы графиков и математики опционов",
    accent: "from-[#FF8A65] to-[#C96BFF]",
  },
];

const featuredStories: ExploreStory[] = [
  {
    id: "hedge-funds",
    category: "Trending",
    title: "Фонды страхуют риск через опционы на золото — что это значит",
    summary:
      "Опционы на золото снова в фокусе: фонды страхуют портфели от волатильности д��ходностей. Разбираем уровни, сценарии и влияние на валюты.",
    author: "@macroclub",
    readTime: "6 мин",
  },
  {
    id: "ai-trading",
    category: "AI",
    title: "Как применить GPT-индикаторы в дейтрейдинге без переобучения",
    summary:
      "Команда AI Alpha делится готовым пайплайном: от чистки данных до стратегии выхода. Плюс — cheat sheet с командами.",
    author: "@quantum",
    readTime: "8 мин",
  },
  {
    id: "crypto-infra",
    category: "Крипто",
    title: "Инфраструктурные токены: кто выживет после халвинга",
    summary:
      "Проекты, решающие задачи L2 и дата-доставки, держатся лучше рынка. Три идеи с низкой корреляцией к BTC.",
    author: "@chainpulse",
    readTime: "5 мин",
  },
];

const recommendedProfiles: SuggestedProfile[] = [
  {
    id: "market-maria",
    name: "Мария Власова",
    handle: "@optionsmaria",
    avatar: "https://i.pravatar.cc/120?img=18",
    verified: true,
  },
  {
    id: "crypto-scout",
    name: "Crypto Scout",
    handle: "@scout_io",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: "macro-sensei",
    name: "Macro Sensei",
    handle: "@macroSensei",
    avatar: "https://i.pravatar.cc/120?img=41",
    verified: true,
  },
];

const exploreTopics: TrendingTopic[] = [
  {
    id: "eth-staking",
    category: "В тренде",
    headline: "ETH staking",
    meta: "212K постов",
  },
  {
    id: "ai-traders",
    category: "Сейчас обсуждают",
    headline: "AI traders",
    meta: "176K постов",
  },
  {
    id: "usd-jpy",
    category: "Рынки",
    headline: "USD/JPY",
    meta: "41K постов",
  },
  {
    id: "oil-range",
    category: "Энергорынок",
    headline: "Brent 95$",
    meta: "28K постов",
  },
  {
    id: "gamestop",
    category: "Мем-акции",
    headline: "$GME",
    meta: "19K постов",
  },
];

const SocialExplore: FC = () => {
  return (
    <div className="flex w-full justify-center pb-12">
      <div className="grid w-full max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,320px)]">
        <section className="flex min-h-screen flex-col gap-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Поиск тем, людей и списков"
              className="w-full rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.8)] py-3 pl-12 pr-4 text-sm font-medium text-white placeholder:text-[#6C7080] shadow-[0_14px_30px_rgba(10,12,16,0.35)] transition focus:border-[#A06AFF] focus:outline-none focus:ring-2 focus:ring-[#A06AFF]/40"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C7080]"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M15 15L18 18" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] p-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-transparent bg-[rgba(160,106,255,0.1)] px-4 py-2 text-sm font-semibold text-[#E3D8FF] transition hover:border-[#A06AFF] hover:bg-[#A06AFF]/20 hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)]">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#482090]/90 via-[#0F172A]/70 to-transparent" />
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F7ee0e08331ad4de59dd7fa404556ca59%2Fd0b32e8bde594d2bbb1c4b0c038e29ee?format=webp&width=1200"
                alt="Macro board"
                className="h-64 w-full object-cover"
              />
              <div className="relative flex flex-col gap-3 px-6 pb-6 pt-8 text-white sm:max-w-[420px]">
                <span className="inline-flex w-max items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                  Spotlight
                </span>
                <h2 className="text-2xl font-bold leading-tight">
                  "Три сигнала, что риск-сентимент меняется и как успеть"
                </h2>
                <p className="text-sm text-white/80">
                  Дайджест ключевых индикаторов, тепловые карты волатильности и разбор сделок институционалов за последние 48 часов.
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/70">
                  <span>Собрано Tyrian Research</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>Обновлено 15 минут назад</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {exploreCollections.map((collection) => (
              <article
                key={collection.id}
                className="flex h-full flex-col justify-between rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5 shadow-[0_14px_30px_rgba(10,12,16,0.35)]"
              >
                <div className="flex flex-col gap-3">
                  <span className={`inline-flex w-max items-center gap-2 rounded-full bg-gradient-to-r ${collection.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90`}>
                    Плейлист
                  </span>
                  <h3 className="text-lg font-bold text-white">{collection.title}</h3>
                  <p className="text-sm text-[#B0B0B0]">{collection.description}</p>
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-transparent bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/20"
                >
                  Открыть подборку
                </button>
              </article>
            ))}
          </div>

          <div className="rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5">
            <h3 className="text-lg font-semibold text-white">Что в фокусе</h3>
            <div className="mt-4 flex flex-col divide-y divide-white/5">
              {exploreTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  type="button"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 text-left transition hover:bg-white/5"
                >
                  <span className="text-sm font-medium text-white/40">{index + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">{topic.category}</span>
                    <span className="text-sm font-semibold text-white">{topic.headline}</span>
                    <span className="text-xs text-white/50">{topic.meta}</span>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">
                    Следить
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {featuredStories.map((story) => (
              <article
                key={story.id}
                className="rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-6 transition hover:border-[#A06AFF]/50"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#6C7080]">
                  <span>{story.category}</span>
                  <span className="h-[2px] w-8 rounded-full bg-[#6C7080]/50" />
                  <span>{story.readTime}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{story.title}</h3>
                <p className="mt-2 text-sm text-[#B0B0B0]">{story.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#6C7080]">
                  <img
                    src="https://i.pravatar.cc/64?img=52"
                    alt={story.author}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{story.author}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden w-full max-w-[320px] flex-col gap-5 lg:flex">
          <SuggestedProfilesWidget profiles={recommendedProfiles} title="Кого читать" />
          <TrendingTopicsWidget topics={exploreTopics} title="Актуальные темы" />
          <div className="rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.6)] p-5">
            <h3 className="text-lg font-semibold text-white">Профессиональные списки</h3>
            <p className="mt-2 text-sm text-[#B0B0B0]">
              Сохраните curated-листы, чтобы следить за инсайтами фондов, крипто-аналитиков и частных трейдеров.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-[#A06AFF] to-[#482090] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:shadow-[0_12px_30px_-20px_rgba(160,106,255,0.9)]"
            >
              Создать список
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SocialExplore;

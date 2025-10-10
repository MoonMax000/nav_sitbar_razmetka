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
  "Все", "Криптовалюты", "Рынки", "AI", "IPO", "NFT", "Фьючерсы", "Мировые новости",
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
    description: "Лучшие сделки на пересечении технологий и рынков",
    accent: "from-[#4FC3F7] to-[#8057FF]",
  },
  {
    id: "pro-traders",
    title: "Профессиональные трейдеры",
    description: "Сигналы, живые сессии и менторские комнаты",
    accent: "from-[#2EBD85] to-[#0F6D40]",
  },
];

const featuredStories: ExploreStory[] = [
  {
    id: "hedge-funds",
    category: "Trending",
    title: "Фонды хеджируют риск через опционы на золото — что это значит",
    summary:
      "Опционы на золото снова в фокусе, поскольку фонды страхуют портфели от волатильности доходностей. Разбираем ключевые уровни и сценарии.",
    author: "@macro",
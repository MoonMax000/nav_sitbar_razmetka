import type { SuggestedProfile } from "./SuggestedProfilesWidget";
import type { NewsItem } from "./TrendingTopicsWidget";

export const DEFAULT_SUGGESTED_PROFILES: SuggestedProfile[] = [
  {
    id: "lark-davis",
    name: "Lark Davis",
    handle: "@TheCryptoLark",
    avatar: "https://i.pravatar.cc/120?img=12",
    verified: true,
  },
  {
    id: "xbox",
    name: "Xbox",
    handle: "@Xbox",
    avatar: "https://i.pravatar.cc/120?img=25",
    verified: true,
  },
  {
    id: "si-paling-masker",
    name: "Si Paling Masker",
    handle: "@TipeDarah",
    avatar: "https://i.pravatar.cc/120?img=47",
    verified: true,
  },
];

export const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: "alpha-drive",
    title: "ALPHA DRIVE ONE Unveils Official Member Profiles and Debut Behind-the-Scenes…",
    category: "Entertainment",
    publishedAgo: "1 day ago",
    engagement: "186.9K posts",
  },
  {
    id: "crypto-market",
    title: "Crypto Market Wipes Out $19 Billion in Liquidations; BNB Holds Steady",
    category: "News",
    publishedAgo: "22 hours ago",
    engagement: "8,746 posts",
    avatars: [
      "https://i.pravatar.cc/120?img=32",
      "https://i.pravatar.cc/120?img=44",
      "https://i.pravatar.cc/120?img=52",
    ],
  },
  {
    id: "zara-larsson",
    title: "Zara Larsson's Strictly Come Dancing Medley Goes Viral on X",
    category: "Entertainment",
    publishedAgo: "2 days ago",
    engagement: "13.7K posts",
    avatars: [
      "https://i.pravatar.cc/120?img=14",
      "https://i.pravatar.cc/120?img=35",
    ],
  },
];

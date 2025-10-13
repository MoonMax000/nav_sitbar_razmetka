import type { SuggestedProfile } from "./SuggestedProfilesWidget";
import type { TrendingTopic } from "./TrendingTopicsWidget";

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

export const DEFAULT_TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: "axios-show",
    category: "Live",
    headline: "The Axios Show",
    meta: "Now streaming · Axios",
  },
  {
    id: "bear-trend",
    category: "Trending in Vietnam",
    headline: "Bear",
    meta: "121K posts",
  },
  {
    id: "quiet-trend",
    category: "Trending in Vietnam",
    headline: "Quiet",
    meta: "163K posts",
  },
  {
    id: "thanh-trend",
    category: "Trending in Vietnam",
    headline: "Thành",
    meta: "32.1K posts",
  },
  {
    id: "purple-pepe",
    category: "Trending in Vietnam",
    headline: "Purple Pepe",
    meta: "18.5K posts",
  },
];

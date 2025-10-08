export type TweetBlockPayload = {
  id: string;
  text: string;
  entities?: {
    mentions: { start: number; end: number; userId: string }[];
    hashtags: { start: number; end: number; tag: string }[];
    urls: { start: number; end: number; expandedUrl: string }[];
  };
  mediaIds?: string[];
  media?: {
    id: string;
    transform?: CropTransform;
    alt?: string;
    sensitiveTags?: string[];
  }[];
  poll?: { options: string[]; durationHours: number };
};

export type ReplyPolicy = "everyone" | "following" | "verified" | "mentioned";

export type ComposerDraft = {
  id: string;
  blocks: TweetBlockPayload[];
  replyPolicy: ReplyPolicy;
  createdAt: string;
  updatedAt: string;
};

export type CropTransform = {
  scale: number;
  translateX: number;
  translateY: number;
  angle: number;
  aspectRatio:
    | "original"
    | "free"
    | "1:1"
    | "4:5"
    | "3:2"
    | "2:3"
    | "4:3"
    | "3:4"
    | "16:9"
    | "9:16";
  fitMode: "fit" | "fill";
  flipH: boolean;
  flipV: boolean;
  straighten: number;
  grid: "thirds" | "golden" | "center" | "off";
};

export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video" | "gif";
  alt?: string;
  transform?: CropTransform;
  sensitiveTags?: string[];
  file?: File;
};

export const CHAR_LIMIT = 280;
export const MAX_PHOTOS = 4;
export const MAX_VIDEO = 1;
export const MAX_GIF = 1;
export const MAX_THREAD_BLOCKS = 25;

export const createDefaultTransform = (): CropTransform => ({
  scale: 1,
  translateX: 0,
  translateY: 0,
  angle: 0,
  straighten: 0,
  aspectRatio: "original",
  fitMode: "fit",
  flipH: false,
  flipV: false,
  grid: "thirds",
});

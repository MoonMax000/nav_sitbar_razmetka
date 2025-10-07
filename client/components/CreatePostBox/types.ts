export type TweetBlockPayload = {
  id: string;
  text: string;
  entities?: {
    mentions: { start: number; end: number; userId: string }[];
    hashtags: { start: number; end: number; tag: string }[];
    urls: { start: number; end: number; expandedUrl: string }[];
  };
  mediaIds?: string[];
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

export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video" | "gif";
  alt?: string;
  file?: File;
};

export const CHAR_LIMIT = 280;
export const MAX_PHOTOS = 4;
export const MAX_VIDEO = 1;
export const MAX_GIF = 1;
export const MAX_THREAD_BLOCKS = 25;

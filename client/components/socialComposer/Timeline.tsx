"use client";

import PostCard from "@/components/PostCard/PostCard";
import VideoPost from "@/components/PostCard/VideoPost";
import type { SocialPost } from "@/data/socialPosts";

interface TimelineProps {
  posts: SocialPost[];
  className?: string;
}

export default function Timeline({ posts, className }: TimelineProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg">No posts yet</p>
        <p className="text-sm mt-2">Be the first to post something!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {posts.map((post) => {
        if (post.type === "video") {
          return <VideoPost key={post.id} post={post} />;
        }
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}

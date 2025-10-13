import { useState } from "react";
import { socialPosts } from "@/data/socialPosts";
import type { SocialPost } from "@/data/socialPosts";
import TweetForm from "@/components/socialComposer/TweetForm";
import Timeline from "@/components/socialComposer/Timeline";

export default function HomePage() {
  const [posts, setPosts] = useState<SocialPost[]>(socialPosts);

  const handleCreatePost = async (text: string) => {
    // Create new post
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      type: "article",
      author: {
        name: "Current User",
        avatar: "https://i.pravatar.cc/120?img=12",
        handle: "@current_user",
        verified: false,
      },
      timestamp: new Date().toLocaleString(),
      title: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
      preview: text,
      body: text,
      sentiment: "bullish",
      likes: 0,
      comments: 0,
      hashtags: [],
      views: 0,
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-[#2F3336]">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-white">Home</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[#2F3336]">
          <button className="flex-1 py-4 text-white font-semibold border-b-4 border-[#1D9BF0] hover:bg-white/10 transition-colors">
            For you
          </button>
          <button className="flex-1 py-4 text-muted-foreground font-semibold hover:bg-white/10 transition-colors">
            Following
          </button>
        </div>
      </div>

      {/* Create Tweet */}
      <div className="border-b border-[#2F3336] px-4 py-3">
        <TweetForm
          submitText="Post"
          onSubmit={handleCreatePost}
          placeholder="What's happening?"
          collapsedOnMount={false}
          minHeight={80}
          userAvatar="https://i.pravatar.cc/120?img=12"
          userName="Current User"
        />
      </div>

      {/* Timeline */}
      <Timeline posts={posts} />
    </div>
  );
}

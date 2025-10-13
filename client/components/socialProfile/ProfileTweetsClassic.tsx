import type { SocialPost } from "@/data/socialPosts";
import PostCard from "@/components/PostCard/PostCard";
import VideoPost from "@/components/PostCard/VideoPost";

interface ProfileTweetsClassicProps {
  posts: SocialPost[];
}

export default function ProfileTweetsClassic({ posts }: ProfileTweetsClassicProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#888]">
        <p className="text-lg">No tweets yet</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#2F3336]">
      {posts.map((post) => {
        if (post.type === "video") {
          return (
            <VideoPost
              key={post.id}
              author={post.author}
              timestamp={post.timestamp}
              title={post.title}
              content={post.body || post.preview}
              videoUrl={post.videoUrl || ""}
              sentiment={post.sentiment}
              likes={post.likes}
              comments={post.comments}
              isFollowing={post.isFollowing}
              hashtags={post.hashtags}
            />
          );
        }
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}

import { FC, useMemo } from "react";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PostDetailView from "@/components/PostCard/PostDetailView";
import { getSocialPostById, type SocialPost } from "@/data/socialPosts";

const SocialPostDetail: FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();

  const postFromState = location.state as SocialPost | undefined;
  const post = useMemo(() => {
    if (postFromState) {
      return postFromState;
    }
    if (postId) {
      return getSocialPostById(postId);
    }
    return undefined;
  }, [postFromState, postId]);

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/social/home");
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center text-white">
        <div className="text-3xl font-semibold">Post not found</div>
        <button
          type="button"
          onClick={() => navigate("/social/home")}
          className="rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to feed
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 pb-12">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.50)] px-4 py-2 text-sm font-semibold text-[#B0B0B0] transition-colors duration-200 hover:border-[#A06AFF] hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path d="M11.6667 5L6.66675 10L11.6667 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      <PostDetailView post={post} />
    </div>
  );
};

export default SocialPostDetail;

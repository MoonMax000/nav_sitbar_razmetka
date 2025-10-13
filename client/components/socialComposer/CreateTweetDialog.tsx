"use client";

import { toast } from "@/hooks/use-toast";
import Modal from "./Modal";
import TweetForm from "./TweetForm";

interface CreateTweetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar?: string;
  userName?: string;
  onTweetCreated?: (text: string) => void;
}

export default function CreateTweetDialog({
  isOpen,
  onClose,
  userAvatar = "https://i.pravatar.cc/120?img=12",
  userName = "Current User",
  onTweetCreated,
}: CreateTweetDialogProps) {
  const handleSubmit = async (text: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });

      onTweetCreated?.(text);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TweetForm
        submitText="Post"
        onSubmit={handleSubmit}
        placeholder="What's happening?"
        minHeight={120}
        shouldFocus={true}
        userAvatar={userAvatar}
        userName={userName}
      />
    </Modal>
  );
}

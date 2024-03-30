import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { CreatorPost } from "~~/types/CreatorPost";
import { createSupClient } from "~~/utils/supabase";

export const usePostManage = (post?: CreatorPost) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createSupClient();
  const account = useAccount();
  const [creatorPost, setCreatorPost] = useState<CreatorPost>(
    post ?? { title: "", userAddress: account.address, description: "", imageURL: "" },
  );

  const handleChange =
    (fieldName: keyof CreatorPost) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setCreatorPost({ ...creatorPost, [fieldName]: value });
    };
  const handleSubmit = async (onSuccess?: () => any) => {
    setIsLoading(true);
    try {
      await supabase.from("posts").upsert({ ...creatorPost, userAddress: account.address });
      toast.success(post?.title ? "Post updated" : "Post created");
      if (onSuccess) onSuccess();
      if (location) location.reload();
    } catch {
      toast.error("Failed to update post");
    }
    setIsLoading(false);
  };

  return { isLoading, handleChange, handleSubmit, creatorPost };
};

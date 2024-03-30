import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CreatorPost } from "~~/types/CreatorPost";
import { createSupClient } from "~~/utils/supabase";

export const usePostsGet = () => {
  const [posts, setPosts] = useState<CreatorPost[]>();
  const params = useParams<{ address: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createSupClient();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data: fetchedPosts } = await supabase.from("posts").select("*").eq("userAddress", params.address);
        console.log(fetchedPosts);
        setPosts(fetchedPosts as CreatorPost[]);
      } catch {
        setPosts([]);
      }
      setIsLoading(false);
    })();
  }, []);

  return { isLoading, posts };
};

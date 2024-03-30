import React from "react";
import { PostCard } from "./postCard";
import { usePostsGet } from "~~/hooks/post/usePostsGet";

export const CreatorPosts = () => {
    const { isLoading, posts } = usePostsGet();
    if (isLoading)
        return (
            <div className="text-center mt-52">
                <span className="loading loading-spinner text-center  h-32 w-32 text-primary"></span>
            </div>
        );
    return (
        <div className="flex flex-col gap-4">
            {posts?.map((post, i) => (
                <PostCard post={post} key={i} />
            ))}
        </div>
    );
};

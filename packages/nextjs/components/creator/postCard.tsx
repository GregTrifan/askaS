import React from "react";
import { CreatorPost } from "~~/types/CreatorPost";

export const PostCard = ({ post }: { post: CreatorPost }) => {
    return (
        <div className="card card-bordered max-w-lg bg-black/50 border-primary/30 p-4 mx-auto w-full">
            <h5 className="text-2xl font-bold text-secondary/80">{post.title}</h5>
            <p className="opacity-70">{post.description}</p>
        </div>
    );
};

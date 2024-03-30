import React from "react";
import { useParams } from "next/navigation";
import { BlockieAvatar } from "../scaffold-eth";
import { useAccount } from "wagmi";
import { userStore } from "~~/store/userStore";
import { CreatorPost } from "~~/types/CreatorPost";

export const PostCard = ({ post }: { post: CreatorPost }) => {
    const account = useAccount();
    const params = useParams<{ address: string }>();
    const { userInfo } = userStore();
    return (
        <div className="card card-bordered max-w-lg bg-black/50 border-primary/30 p-4 mx-auto w-full">
            {userInfo?.username && userInfo.fullName && (
                <div className="flex gap-2 mb-4">
                    <BlockieAvatar address={params?.address ?? account.address} size={50} />
                    <div className="my-auto">
                        <span className="text-primary/80">{userInfo.fullName}</span>
                        <br />
                        <span className="text-white/60">@{userInfo.username}</span>
                    </div>
                </div>
            )}
            <h5 className="text-2xl font-bold text-secondary/80">{post.title}</h5>
            <p className="opacity-70">{post.description}</p>
        </div>
    );
};

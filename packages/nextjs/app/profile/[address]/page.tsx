"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { CreatorPosts } from "~~/components/creator/CreatorPosts";
import { AddPost } from "~~/components/creator/addPost";
import { SubscriptionContent } from "~~/components/creator/subscriptionContent";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { BecomeCreator } from "~~/components/user/becomeCreator";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useCurrentUser } from "~~/hooks/user/useCurrentUser";

function ProfilePage() {
    const { isLoading, user, userAddress } = useCurrentUser();
    const account = useAccount();
    const params = useParams<{ address: string }>();
    const { data: isCreator } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "isCreator",
        args: [userAddress],
    });

    if (isLoading)
        return (
            <div className="text-center mt-52">
                <span className="loading loading-spinner text-center  h-32 w-32 text-primary"></span>
            </div>
        );
    if (user?.fullName)
        return (
            <div className="flex flex-col gap-4 justify-center mt-14 ">
                <div className="mx-auto">
                    <BlockieAvatar address={params?.address} size={140} />
                </div>
                <div>
                    <h1 className="text-4xl text-primary text-center">{user?.fullName}</h1>
                    <h3 className="text-xl opacity-75 text-center">@{user?.username}</h3>
                </div>
                {account.address === userAddress && (
                    <a href="/profile/edit" className="btn btn-secondary mx-auto px-8 btn-sm">
                        Edit Profile
                    </a>
                )}

                {!isCreator && account.address === userAddress && (
                    <div className="mx-auto">
                        <BecomeCreator />
                    </div>
                )}

                {isCreator && account.address === userAddress && (
                    <div className="flex flex-col gap-4 mx-5 text-left">
                        <div className="flex flex-col gap-4 max-w-lg text-left mx-auto w-full mb-4">
                            <h4 className="text-left text-2xl">{userAddress === account.address ? "Your " : "Creator's "}content</h4>
                            {userAddress == account.address && <AddPost />}
                        </div>
                        <CreatorPosts />
                    </div>
                )}
                {isCreator && account.address !== userAddress && <SubscriptionContent />}
            </div>
        );
    return (
        <div className="text-center mt-52">
            <h1 className="text-4xl text-error">404 - Profile not found</h1>
        </div>
    );
}

export default ProfilePage;

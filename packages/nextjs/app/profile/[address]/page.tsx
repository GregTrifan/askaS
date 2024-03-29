"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
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
            <div className="flex flex-col gap-4 justify-center mt-14 text-center">
                <div className="mx-auto">
                    <BlockieAvatar address={params?.address} size={140} />
                </div>
                <div>
                    <h1 className="text-4xl text-primary">{user?.fullName}</h1>
                    <h3 className="text-xl opacity-75">@{user?.username}</h3>
                </div>
                <a href="/profile/edit" className="btn btn-secondary mx-auto px-8 btn-sm">
                    Edit Profile
                </a>

                {!isCreator && <BecomeCreator />}

                {isCreator && (
                    <div className="flex flex-col gap-4 justify-center mx-5">
                        <h4 className="text-left text-2xl">{userAddress === account.address ? "Your " : "Creator's "}content</h4>
                        {userAddress == account.address && <button className="btn btn-info mr-auto px-4 btn-sm">Add a post</button>}
                        <div className="card card-bordered max-w-lg bg-black/50 border-primary/30">
                            <p>Creator Content</p>
                            <div></div>
                        </div>
                    </div>
                )}
            </div>
        );
    return (
        <div className="text-center mt-52">
            <h1 className="text-4xl text-error">404 - Profile not found</h1>
        </div>
    );
}

export default ProfilePage;

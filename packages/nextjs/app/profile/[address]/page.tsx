"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useCurrentUser } from "~~/hooks/user/useCurrentUser";

function ProfilePage() {
    const { isLoading, user } = useCurrentUser();
    const params = useParams<{ address: string }>();

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

                <button className="btn btn-info mx-auto mt-24 px-4 rounded-lg uppercase">Become a creator</button>
            </div>
        );
    return (
        <div className="text-center mt-52">
            <h1 className="text-4xl text-error">404 - Profile not found</h1>
        </div>
    );
}

export default ProfilePage;

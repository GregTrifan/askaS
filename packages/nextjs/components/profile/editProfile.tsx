"use client";

import React from "react";
import { useAccount } from "wagmi";
import { CustomWalletButton } from "~~/components/auth/CustomWalletButton";
import { useUserManage } from "~~/hooks/user/useUserManage";
import { UserInfo } from "~~/types/ProfileTypes";

export const EditProfile = ({ user, header }: { user?: UserInfo; header: string }) => {
    const account = useAccount();
    const { userInfo, handleChange, handleSubmit, isLoading } = useUserManage(user);
    if (account.address)
        return (
            <div className="mt-12 mx-8">
                <h1 className="text-4xl text-center mb-12">{header}</h1>
                <div className="rounded-md bg-base-300 bg-opacity-75 backdrop-blur-lg max-w-md mx-auto border border-base-100 p-4 flex flex-col gap-3">
                    <h4 className="text-2xl">Full name</h4>
                    <input
                        value={userInfo.fullName}
                        onChange={handleChange("fullName")}
                        className="input w-full bg-opacity-50 border-primary border-opacity-30"
                        placeholder="Full name"
                    />
                    <h4 className="text-xl">username</h4>
                    <input
                        value={userInfo.username}
                        onChange={handleChange("username")}
                        className="input w-full bg-opacity-50 border-primary border-opacity-30"
                        placeholder="username"
                    />
                    <h4 className="text-xl">Bio</h4>
                    <textarea
                        value={userInfo.bio}
                        onChange={handleChange("bio")}
                        className="textarea w-full bg-opacity-25 rounded-md border border-primary border-opacity-30"
                        rows={4}
                        placeholder="Bio"
                    />
                    <button
                        disabled={isLoading}
                        onClick={() => handleSubmit()}
                        className="btn btn-primary shadow-lg shadow-primary"
                    >
                        {isLoading && <span className="loading loading-spinner"></span>}
                        Submit profile
                    </button>
                </div>
            </div>
        );
    return (
        <div className="mt-12 mx-8">
            <h1 className="text-4xl text-center mb-12">Authetication required</h1>
            <div className="rounded-md bg-base-300 bg-opacity-25 backdrop-blur-lg max-w-md mx-auto border border-base-100 p-4 flex flex-col gap-3">
                <CustomWalletButton />
            </div>
        </div>
    );
};

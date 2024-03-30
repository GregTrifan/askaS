import React from "react";
import { CustomWalletButton } from "../auth/CustomWalletButton";
import { CreatorPosts } from "./CreatorPosts";
import { useAccount } from "wagmi";
import { useSubscriptionUtils } from "~~/hooks/subscription/useSubscriptionUtils";

export const SubscriptionContent = () => {
    const account = useAccount();
    const { isSubscribed, handleSubscribe, isSubsLoading, isSusbscribeLoading, creatorMonthlyRate } =
        useSubscriptionUtils();

    if (isSubsLoading) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner text-center  h-32 w-32 text-primary"></span>
            </div>
        );
    }
    if (isSubscribed)
        return (
            <div className="flex flex-col gap-4 mx-5 text-left">
                <div className="flex flex-col gap-4 max-w-lg text-left mx-auto w-full mb-4">
                    <h4 className="text-left text-2xl">{"Creator's content"}</h4>
                </div>
                <CreatorPosts />
            </div>
        );
    if (!account.address)
        return (
            <div className="mx-auto max-w-lg flex flex-col gap-4">
                <h3>Connect wallet to subscribe to creator/access content</h3>
                <div className="max-w-md mx-auto">
                    <CustomWalletButton />
                </div>
            </div>
        );
    return (
        <div className="mx-auto max-w-lg flex flex-col gap-4">
            <h3>Connect wallet to subscribe to creator/access content</h3>
            <div className="max-w-md mx-auto">
                <button className="btn btn-secondary" disabled={isSusbscribeLoading} onClick={handleSubscribe}>
                    {isSusbscribeLoading && <span className="loading loading-spinner"></span>}
                    Subscribe to creator - {Number(creatorMonthlyRate) / 10 ** 18} ETH/month
                </button>
            </div>
        </div>
    );
};

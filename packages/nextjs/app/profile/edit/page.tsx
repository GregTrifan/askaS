"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CustomWalletButton } from "~~/components/auth/CustomWalletButton";
import { EditProfile } from "~~/components/profile/editProfile";
import { useUserManage } from "~~/hooks/user/useUserManage";
import { UserInfo } from "~~/types/ProfileTypes";
import { createSupClient } from "~~/utils/supabase";

function EditProfilePage() {
    const account = useAccount();
    const supabase = createSupClient();
    const [initialUserInfo, setInitialUserInfo] = useState<UserInfo>();
    useEffect(() => {
        if (account.address)
            (async () => {
                try {
                    const { data: users } = await supabase.from("userDetails").select().eq("userAddress", account.address);
                    setInitialUserInfo(users![0]);
                } catch {
                    setInitialUserInfo({ bio: "", fullName: "", username: "" });
                }
            })();
    }, [account.address]);
    if (initialUserInfo?.username) return <EditProfile header="Update your profile" user={initialUserInfo} />;
    return (
        <div className="text-center mt-52">
            <span className="loading loading-spinner text-center  h-32 w-32 text-primary"></span>
        </div>
    );
}

export default EditProfilePage;

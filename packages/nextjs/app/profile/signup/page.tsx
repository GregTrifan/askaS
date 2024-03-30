"use client";

import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { EditProfile } from "~~/components/profile/editProfile";
import { createSupClient } from "~~/utils/supabase";

function SignupArtist() {
    const account = useAccount();
    const supabase = createSupClient();
    useEffect(() => {
        if (account.address) {
            (async () => {
                const { data: existentProfile } = await supabase
                    .from("userDetails")
                    .select()
                    .eq("userAddress", account.address);
                if (existentProfile?.length) window.location.href = "/profile/" + account.address;
            })();
        }
    }, [account.address]);

    return <EditProfile header="Create your profile" />;
}

export default SignupArtist;

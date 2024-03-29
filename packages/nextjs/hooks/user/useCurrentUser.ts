import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { UserInfo } from "~~/types/ProfileTypes";
import { createSupClient } from "~~/utils/supabase";

export const useCurrentUser = () => {
  const account = useAccount();
  const params = useParams<{ address: string }>();
  const [user, setUser] = useState<UserInfo>();
  const supabase = createSupClient();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data: users } = await supabase
          .from("userDetails")
          .select()
          .eq("userAddress", params.address ?? account.address);
        setUser(users![0]);
      } catch {
        setUser({ bio: "", fullName: "", username: "" });
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address]);

  return { user, isLoading, userAddress: params.address ?? account.address };
};

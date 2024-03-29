import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { UserInfo } from "~~/types/ProfileTypes";
import { createSupClient } from "~~/utils/supabase";

export const useUserManage = (user?: UserInfo) => {
  const account = useAccount();
  const [userInfo, setUserInfo] = useState<UserInfo>(user ?? { bio: "", fullName: "", username: "" });
  const router = useRouter();
  const supabase = createSupClient();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange =
    (fieldName: keyof UserInfo) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setUserInfo({ ...userInfo, [fieldName]: value });
    };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data: existingProfiles } = await supabase.from("userDetails").select().eq("userAddress", account.address);
      if (existingProfiles?.length) {
        await supabase
          .from("userDetails")
          .update({ ...userInfo, userAddress: account.address })
          .eq("userAddress", account.address ?? "");
      } else await supabase.from("userDetails").upsert({ ...userInfo, userAddress: account.address });
      toast.success(user?.fullName ? "Profile updated" : "Profile created");
      router.push(`/profile/${account.address}`);
    } catch {
      toast.error("Failed to update profile");
    }
    setIsLoading(false);
  };
  return { userInfo, setUserInfo, handleChange, handleSubmit, isLoading };
};

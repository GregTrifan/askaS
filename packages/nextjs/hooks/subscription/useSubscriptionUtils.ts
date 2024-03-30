import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useScaffoldContractRead, useScaffoldContractWrite } from "../scaffold-eth";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { createSupClient } from "~~/utils/supabase";

export const useSubscriptionUtils = () => {
  const account = useAccount();
  const params = useParams<{ address: string }>();
  const supabase = createSupClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSusbscribeLoading, setSubscribeLoading] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "mint",
    args: [account.address, params.address],
    value: parseEther("0.1"),
  });
  const { data: creatorMonthlyRate } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "creatorMonthlyRate",
    args: [params.address],
  });
  const { data: currentTokenId, refetch: refetchTokenId } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getCurrentTokenId",
  });
  useEffect(() => {
    if (account.address && params.address) {
      setIsLoading(true);
      (async () => {
        const { data: fetchedSubscriptions } = await supabase
          .from("nftHolders")
          .select("*")
          .eq("creatorAddress", params.address)
          .eq("userAddress", account.address);
        if ((fetchedSubscriptions?.length ?? 0) > 0) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      })();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address, params.address]);

  const handleSubscribe = async () => {
    setSubscribeLoading(true);
    try {
      await writeAsync({ value: creatorMonthlyRate });
      await refetchTokenId();
      await supabase.from("nftHolders").insert({
        userAddress: account.address,
        creatorAddress: params.address,
        tokenId: Number(currentTokenId?.toString()),
      });
      if (location) location.reload();
    } catch {
      toast.error("Failed to subscribe");
    }
    setSubscribeLoading(false);
  };
  return { isSubscribed, handleSubscribe, isSubsLoading: isLoading, isSusbscribeLoading, creatorMonthlyRate };
};

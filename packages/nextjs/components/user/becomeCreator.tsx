import React, { useState } from "react";
import { EtherInput } from "../scaffold-eth";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const BecomeCreator = () => {
    const [showModal, setShowModal] = useState(false);
    const [ethAmount, setEthAmount] = useState<string>("");
    const account = useAccount();
    const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "addCreator",
        args: [account.address, parseEther("0.01")],
    });

    const handleExec = async () => {
        const totalWei = parseEther("0.01");
        await writeAsync({ args: [account.address, totalWei] });
        setShowModal(false);
        if (location) location.reload();
    };

    return (
        <div>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
                className="btn btn-info mx-auto mt-24 px-4 rounded-lg uppercase"
            >
                Become a creator
            </button>

            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Become a creator</h3>
                        <div>
                            <h4 className="text-left text-md">Subscription rate (per month)</h4>
                            <EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button disabled={isLoading || isMining} className="btn btn-secondary" onClick={() => handleExec()}>
                                    {isLoading || (isMining && <span className="loading loading-spinner "></span>)}
                                    Start now
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

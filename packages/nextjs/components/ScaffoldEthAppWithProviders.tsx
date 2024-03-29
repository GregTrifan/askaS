"use client";

import { useEffect } from "react";
import Image from "next/image";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
//  import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
    const price = useNativeCurrencyPrice();
    const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

    useEffect(() => {
        if (price > 0) {
            setNativeCurrencyPrice(price);
        }
    }, [setNativeCurrencyPrice, price]);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-base-300 overflow-x-hidden">
                <Header />
                <div className="flex fixed overflow-hidden" style={{ height: "100vh", width: "100vw" }}>
                    <Image alt="" className="cursor-pointer blur-lg  rotate-90" fill src="/logo-transparent.png" />
                </div>
                <div className="flex fixed overflow-hidden rotate-270" style={{ height: "100vh", width: "100vw" }}>
                    <Image alt="" className="cursor-pointer blur-2xl" fill src="/logo-transparent.png" />
                </div>
                <main className="relative flex flex-col flex-1">{children}</main>
            </div>
            <Toaster />
        </>
    );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <ProgressBar />
            <RainbowKitProvider
                chains={appChains.chains}
                avatar={BlockieAvatar}
                theme={midnightTheme({
                    accentColor: "#38FF26",
                    accentColorForeground: "black",
                    overlayBlur: "small",
                    borderRadius: "medium",
                })}
            >
                <ScaffoldEthApp>{children}</ScaffoldEthApp>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

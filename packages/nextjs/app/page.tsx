"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:gap-32 mx-5 mt-12 lg:mt-52 mb-4 md:justify-center">
                <div>
                    <h1 className="text-left">
                        <span className="block text-4xl mb-2">Welcome to</span>
                        <span className="block text-6xl font-bold">AskaS v0.1</span>
                    </h1>
                </div>

                <a className="my-auto btn btn-secondary" href="/creators/signup">
                    Get Started
                </a>
            </div>
            <div className="flex items-center flex-col flex-grow pt-10"></div>
        </>
    );
};

export default Home;

import React from "react";
import data from "../../json/AppIntro.json";

export const AppIntro = () => (
    <div
        className="flex flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-16 bg-[var(--primary)]"
    >
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-center text-[var(--accent)]">
            Our App : CountBuddy
        </h2>
        <div className="w-full mx-auto text-center text-lg flex items-center justify-center">
            <div className="sm:w-4/5 flex flex-col lg:flex-row justify-between">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-between sm:w-[25vw] h-[250px] mx-8 p-2 sm:my-20"
                    >
                        <div className="relative items-center justify-center sm:w-80vw lg:w-40vw h-auto p-4 rounded-lg  bg-[var(--base-100)]">
                            <img
                                src={item.img}
                                alt="app"
                                className="sm:w-[50vw] lg:w-[25vw] h-[180px]"
                            />

                            {/* 疊上的方塊 */}
                            <div className="absolute inset-0 bg-[var(--darker-tertiary)] rounded-lg flex items-center justify-center text-white text-2xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <div className="flex flex-col items-center justify-center mx-4">
                                    <span className="text-lg text-center m-2 font-bold text-[var(--secondary)]">{item.name}</span>
                                    <span className="text-sm text-center text-[var(--secondary)]">{item.func}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

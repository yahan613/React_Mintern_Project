import React from "react";
import data from "../../json/AppIntro.json";

export const AppIntro = () => (
    <div
        className="flex flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-16 bg-[var(--primary)]"
    >
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl text-center text-[var(--accent)]">
            Our APP
        </h2>
        <div className="w-full mx-auto text-center text-lg flex flex-col items-center justify-center">
            <div className="flex lg:flex-row flex-col justify-between">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-between w-[30vw] h-[300px] m-8 p-4 text-[var(--secondary)]"
                    >
                        <div className="relative items-center justify-center sm:w-80vw lg:w-40vw h-[250px] p-4 border border-solid rounded-lg shadow-[0px_3px_20px_rgba(0,0,0,0.5)] bg-[var(--base-200)]">
                            <img
                                src={item.img}
                                alt="app"
                                className="sm:w-[50vw] lg:w-[25vw] h-[180px]"
                            />

                            {/* 疊上的方塊 */}
                            <div className="absolute inset-0 bg-[var(--darker-tertiary)] rounded-lg flex items-center justify-center text-white text-2xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <div className="flex flex-col items-center justify-center mx-4">
                                    <span className="text-lg text-center m-2 font-bold">{item.name}</span>
                                    <span className="text-sm text-center">{item.func}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

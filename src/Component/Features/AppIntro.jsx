import React from "react";
import data from "../../json/AppIntro.json";

export const AppIntro = () => (
    <div
        className="flex flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-16 bg-[var(--primary)]"
    >
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl text-center text-[var(--accent)]">
            Our APP
        </h2>
        <div className="w-auto mx-auto text-center text-lg md:text-xl flex flex-col gap-4">
            <div className="flex justify-between">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-center w-full h-20 bg-[var(--base-200)] rounded-md shadow-lg m-8 p-4  text-[var(--secondary)] "
                    >
                        <img src={item.icon} alt={item.img} className="w-10 h-10" />
                        <span className="text-lg text-center">{item.name}</span>
                        <span className="text-sm text-center">{item.func}</span>
                    </div>
                ))}
            </div>
            <div>
                查看訂閱項目
            </div>
        </div>
    </div>
);

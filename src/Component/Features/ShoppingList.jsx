import React, { useState } from "react";
import data from "../../json/Shoplist.json";
import { Button } from "@/components/ui/button";
import DialogDemo from "@/components/shopDemo";

export default function ShoppingList() {

    return (
        <div
            className="flex flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-16 bg-[var(--primary)]"
        >
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl text-center text-[var(--accent)]">
                "Train Smart. Live Strong. Choose Yours."
            </h2>
            <div className="w-full mx-auto text-center text-lg md:text-xl flex gap-4 items-center justify-center">
                <div className="flex lg:flex-row flex-col justify-between">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center w-[25vw] h-[400px] m-8 p-4 text-[var(--secondary)]"
                        >
                            <div className="sm:w-[30vw] lg:w-[1vw] h-[250px] p-4 rounded-lg shadow-[0px_3px_20px_rgba(0,0,0,0.5)] bg-[var(--base-100)]">
                                <img
                                    src={item.img}
                                    alt="app"
                                    className="sm:w-[50vw] lg:w-[25vw] h-[180px]"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center h-[50px] my-8">
                                <span className="text-lg text-center m-2 font-bold">{item.name}</span>
                                <span className="text-sm text-center w-[20vw]">{item.func}</span>
                            </div>
                            <DialogDemo item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


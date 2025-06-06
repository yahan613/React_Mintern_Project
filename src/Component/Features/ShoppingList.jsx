import React, { useState, useEffect } from "react";
import data from "../../json/Shoplist.json";
import { Button } from "@/components/ui/button";
import DialogDemo from "@/components/shopDemo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Storage } from "@/firebase/storage";
import { app } from "@/firebase/config";

const db = getFirestore(app)

export default function ShoppingList() {
    const [popularityMap, setPopularityMap] = useState({});
    const [sortType, setSortType] = useState("default");

    useEffect(() => {
        const fetchPopularity = async () => {
            const querySnapshot = await getDocs(collection(db, "popularProduct"));

            // 先整理成 array
            const popArray = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                popArray.push({
                    id: doc.id,
                    popularity: data.popularity || 0,
                });
            });

            // 排序：由高到低
            popArray.sort((a, b) => b.popularity - a.popularity);

            // 你可以選擇要存 array（有順序）或 object（無順序）
            // 如果要用 object，可以重新 build 有順序的 map
            const sortedMap = {};
            popArray.forEach((item) => {
                sortedMap[item.id] = item.popularity;
            });

            setPopularityMap(sortedMap); // 或者 setPopularityArray(popArray) 也可以

        };

        fetchPopularity();
    }, []);

    // 取得排序後的 array
    const sortedArray = Object.entries(popularityMap)
        .sort((a, b) => b[1] - a[1]); // 依人氣由高到低排序

    sortedArray.slice(0, 3).forEach((item, idx) => {
        if (item) console.log(`Sorted popularity ${idx}:`, item[0]);
    });

    const sortedData = [...data].sort((a, b) => {
        const popA = popularityMap[a.id] || 0;
        const popB = popularityMap[b.id] || 0;
        return popB - popA;
    });

    console.log("Popularity Map喔:", sortedData);
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-16 bg-[var(--primary)]">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight md:text-5xl text-center text-[var(--accent)]">
                "Train Smart. Live Strong. Choose Yours."
            </h2>
            <div className="text-lg sm:text-xl text-center mt-2">
                <select
                    className="p-2 border rounded bg-[var(--base-100)] text-[var(--secondary)]"
                    value={sortType}
                    onChange={e => setSortType(e.target.value)}
                >
                    <option value="default">預設排序</option>
                    <option value="popularity">按人氣排序</option>
                </select>
            </div>
            <div className="w-full mx-auto text-center text-base md:text-xl flex gap-10 items-center justify-center">
                <div className="flex flex-col lg:flex-row justify-between sm:w-4/5 items-center">
                    {sortType === "default" ? (
                        data.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center sm:w-1/3 h-auto m-4 sm:m-8 p-4 text-[var(--secondary)]"
                            >
                                <div className="sm:w-[30vw] lg:w-[1vw] h-[200px] sm:h-[250px] p-4 rounded-lg shadow-[0px_3px_20px_rgba(0,0,0,0.5)] bg-[var(--base-100)]">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="sm:w-[50vw] lg:w-[25vw] h-[180px] p-2"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center sm:h-[50px] my-8">
                                    <span className="text-lg text-center m-2 font-bold">{item.name}</span>
                                    <span className="text-base text-center w-auto sm:w-4/5 break-normal">{item.func}</span>
                                    <span className="text-lg mt-2 text-gray-500">
                                        此商品有 {popularityMap[item.id-1] || 0} 人購買
                                    </span>
                                </div>
                                <DialogDemo item={item} />
                            </div>
                        ))
                    ) : (
                        sortedArray.map(([id, popularity]) => {
                            const product = data.find(d => String(d.id-1) === String(id));
                            if (!product) return null;
                            return (
                                <div
                                    key={id}
                                    className="flex flex-col items-center sm:w-1/3 h-auto m-4 sm:m-8 p-4 text-[var(--secondary)]"
                                >
                                    <div className="sm:w-[30vw] lg:w-[1vw] h-[200px] sm:h-[250px] p-4 rounded-lg shadow-[0px_3px_20px_rgba(0,0,0,0.5)] bg-[var(--base-100)]">
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="sm:w-[50vw] lg:w-[25vw] h-[180px] p-2"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-center sm:h-[50px] my-8">
                                        <span className="text-lg text-center m-2 font-bold">{product.name}</span>
                                        <span className="text-base text-center w-auto sm:w-4/5 break-normal">{product.func}</span>
                                        <span className="text-lg mt-2 text-gray-500">
                                            此商品有 {popularity} 人購買
                                        </span>
                                    </div>
                                    <DialogDemo item={product} />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}


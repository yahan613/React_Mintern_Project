import { useState } from "react";
import data from "../../json/WatchIntro.json";

const WatchIntro = () => {
    const [openId, setOpenId] = useState(null);
    const toggleintro = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="home-container flex items-center justify-around w-screen h-auto bg-[var(--secondary)] py-20 px-40 flex-wrap gap-10 sm:flex-row flex-col">

            <div className="lg:w-1/4 sm:w-1/2 pt-4 shadow-[inset_0px_5px_20px_rgba(0,0,0,0.5)] rounded-lg bg-[var(--base-200)] flex">
                <img
                    src="/Watch2.png"
                    alt="Watch"
                    className="w-full"
                />
            </div>

            <div className="bg-[var(--secondary)] rounded-2xl p-8 pt-8  lg:w-1/2 sm:w-2/3">
                <div className="space-y-6">
                    {data.map((intro) => (
                        <div
                            key={intro.id}
                            className="rounded-xl overflow-hidden transition-all duration-300 ease-in-out bg-[#78624D]"
                            style={{ width: '500px', margin: '0 auto' }}
                        >
                            <div className="flex justify-between items-center w-full">
                                <button
                                    onClick={() => toggleintro(intro.id)}
                                    className="hover:border-0 w-100 px-6 py-8 flex justify-between items-center transition-colors"
                                >

                                    <span className={`transform transition-transform duration-300 ${openId === intro.id ? 'rotate-90' : ''}`}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#E9A751"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>

                                    <h3 className="text-3xl text-[#ECD086] text-left pl-4 w-full">
                                        {intro.question}
                                    </h3>
                                </button>

                            </div>


                            {openId === intro.id && (
                                <div className="bg-[var(--secondary)] border-t border-[#E9A751]/20 transition-all duration-500">
                                    <p className="w-full p-4 text-white/80 leading-relaxed border-b border-l border-r border-[#594939] rounded-sm">
                                        {intro.answer}
                                    </p>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchIntro;

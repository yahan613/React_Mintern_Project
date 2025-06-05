import { useState } from "react";
import data from "../../json/WatchIntro.json";
import "animate.css";


const WatchIntro = () => {
    const [openId, setOpenId] = useState(null);
    const toggleintro = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const [animate, setAnimate] = useState(false);

    const handleAnimation = () => {
        // 先移除動畫類名
        setAnimate(false);
        
        // 使用 setTimeout 確保在下一幀添加動畫類名
        setTimeout(() => {
            setAnimate(true);
        }, 10);

        // 在動畫結束後移除類名，讓動畫可以再次觸發
        setTimeout(() => {
            setAnimate(false);
        }, 1000); // 動畫持續時間（與 animate.css 的動畫時間一致）
    };

    return (
        <div className="home-container flex flex-col lg:flex-row items-center justify-around w-screen h-auto bg-[var(--secondary)] pb-20 px-4 lg:px-4 flex-wrap gap-10 pt-10">
            {/* 手錶圖片容器 */}
            <div className="w-full lg:w-2/5 pt-4 mt-8 flex justify-center">
                <div className="w-auto h-auto animate__fadeIn animate__animated">
                    <img
                        src="/Watch2.png"
                        alt="Watch"
                        className={`w-50vw ${animate ? "animate__jello animate__animated" : ""}`}
                        onClick={handleAnimation}
                    />
                </div>
            </div>

            {/* 問答框容器 */}
            <div className="w-full lg:w-2/5 flex justify-center items-center rounded-2xl">
                <div className="space-y-3 flex flex-col justify-center w-full">
                    {data.map((intro) => (
                        <div
                            key={intro.id}
                            className="w-full rounded-xl transition-all duration-300 ease-in-out bg-[var(--secondary)] shadow-2xl"
                        >
                            <div className="flex justify-between items-center w-full shadow-xl mb-2 rounded-t-xl">
                                <button
                                    onClick={() => toggleintro(intro.id)}
                                    className="hover:border-0 w-full px-6 py-8 flex justify-between items-center transition-colors"
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

                                    <h3 className="text-2xl lg:text-3xl text-[#ECD086] text-left flex-1 ml-4">
                                        {intro.question}
                                    </h3>
                                </button>
                            </div>

                            {openId === intro.id && (
                                <div className="bg-[var(--base-200)] transition-all duration-500 mt-[-10px] mb-4 rounded-b-xl shadow-2xl">
                                    <p className="w-full p-4 text-white/80 leading-relaxed text-start">
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

import React, { useState } from "react";
import "animate.css";



export default function MainIntro() {
  const [animate, setAnimate] = useState(false);

  const handleAnimation = () => {
    // 觸發動畫
    setAnimate(true);

    // 在動畫結束後移除類名，讓動畫可以再次觸發
    setTimeout(() => {
      setAnimate(false);
    }, 1000); // 動畫持續時間（與 animate.css 的動畫時間一致）
  };

  return (
    <div
      className="flex items-center justify-around w-full sm:w-3/4 h-auto bg-[var(--secondary)] text-white p-16 rounded-lg mb-56 animate__fadeIn animate__animated"
    >
      {/* 左側文字區塊 */}
      <div className="flex flex-col text-start p-4">
        <h1 className="text-7xl font-bold pb-8 text-[#ECD086]">Welcome to Mintern</h1>
        <p className="max-w-md text-md text-[var(--warning)]">
          Mintern is a platform that connects students with internships and job
          opportunities. We believe that everyone deserves a chance to gain
          practical experience and build their professional network.
        </p>
      </div>

      {/* 右側圖片區塊 */}
      <div
        className="lg:w-2/5 sm:w-2/3 ml-4 p-16 shadow-[inset_0px_5px_20px_rgba(0,0,0,0.5)] rounded-lg bg-[var(--base-200)] flex items-center justify-center"
        onClick={handleAnimation}
      >
        <img
          src="/Watch.png"
          alt="Watch"
          className={`rounded-lg ${
            animate ? "animate__rubberBand animate__animated" : ""
          }`}
        />
      </div>
    </div>
    
  );
}

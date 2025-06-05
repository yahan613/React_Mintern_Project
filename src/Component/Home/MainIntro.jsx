import React, { useState, useEffect, useRef } from "react";
import "animate.css";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

export default function MainIntro() {
  const [animateImg, setAnimateImg] = useState(false);
  const titleRef = useRef(null);
  const chineseRef = useRef(null);

  const chineseText =
    "肌胸肉寶寶是一款創新的健身應用，透過智慧手環來精準紀錄你的運動數據，並且將運動過程遊戲化，讓每一次的訓練都變得更有趣、更具挑戰性。你將能養成一個專屬的「肌胸肉寶寶」，隨著你的運動成果逐漸成長，並不斷進化。";

  useEffect(() => {
    // 避免 SSR 問題：確保只在 client 執行
    if (typeof window === "undefined") return;

    const animateText = () => {
      if (titleRef.current) {
        titleRef.current.style.visibility = "visible";
        const { words } = splitText(titleRef.current);
        animate(
          words,
          { opacity: [0, 1], y: [10, 0] },
          {
            type: "spring",
            duration: 1,
            bounce: 0,
            delay: stagger(0.05),
          }
        );
      }

      if (chineseRef.current) {
        const spans = chineseRef.current.querySelectorAll("span");
        animate(
          spans,
          { opacity: [0, 1], y: [10, 0] },
          {
            type: "spring",
            duration: 1,
            bounce: 0.2,
            delay: stagger(0.01),
          }
        );
      }
    };

    // 等字型載入完成後再觸發動畫
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(animateText));
    } else {
      // fallback for安全
      setTimeout(() => requestAnimationFrame(animateText), 300);
    }
  }, []);

  const handleAnimation = () => {
    setAnimateImg(true);
    setTimeout(() => setAnimateImg(false), 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around w-full sm:w-3/4 h-auto bg-[var(--secondary)] text-white p-8 sm:p-12 sm:rounded-lg mb-56 animate__fadeIn animate__animated pt-20 sm:mt-20">
      {/* 左側文字區塊 */}
      <div className="flex flex-col text-start p-4 order-2 lg:order-1">
        <h1
          className="text-center sm:text-left text-3xl sm:text-5xl lg:text-7xl font-bold pb-8 text-[#ECD086] break-normal whitespace-normal leading-relaxed"
          ref={titleRef}
          style={{ visibility: "hidden" }}
        >
          Welcome to COUNTBUDDY
        </h1>

        {/* 中文逐字動畫區塊 */}
        <p
          className="w-full text-center text-sm sm:text-base sm:text-left md:max-w-md text-[var(--warning)] mb-4 lg-mb-0 leading-relaxed break-normal "
          ref={chineseRef}
        >
          {chineseText.split("").map((char, idx) => (
            <span key={idx} style={{ display: "inline-block", opacity: 0 }}>
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* 右側圖片區塊 */}
      <div
        className="w-full lg:w-3/5 ml-4 p-10 sm:p-16 flex items-center justify-center order-1 lg:order-2"
        onClick={handleAnimation}
      >
        <img
          src="/Watch.png"
          alt="Watch"
          className={`rounded-lg ${animateImg ? "animate__rubberBand animate__animated" : ""}`}
        />
      </div>
    </div>
  );
}

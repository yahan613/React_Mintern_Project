import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Footer from "@/Component/Footer";

// 添加媒體查詢樣式
const responsiveStyles = `
  @media (max-width: 640px) {
    .faq-container {
      max-width: 250px !important;
    }
  }
`;

const Faq = () => {
  const [openId, setOpenId] = useState(null);
  
  const faqData = [
    {
      id: 1,
      question: "互動角色的設計有什麼實際功能？只是裝飾嗎？",
      answer: "我們的互動角色結合養成系統，會根據使用者的運動表現成長、互動，藉此提升運動的持續動力與趣味性，讓使用者更願意長期使用。"
    },
    {
      id: 2,
      question: "系統如何做到個人化的訓練推薦？",
      answer: "我們會根據使用者的運動數據（如近期訓練紀錄、運動時間）、體能變化進行分析，產出對應的訓練建議，例如今日建議做手臂相關訓練或設定進階挑戰目標。"
    },
    {
      id: 3,
      question: "App 和裝置功能如果有更新，用戶要怎麼知道？",
      answer: "我們會在App中設置「版本更新專區」，每次更新都會說明新功能、優化項目，並提供簡易的影片介紹或互動教學，幫助用戶快速理解變動內容，維持良好使用體驗。"
    },
  ];

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3DC9F]">
      {/* 添加媒體查詢樣式 */}
      <style>{responsiveStyles}</style>
      
      <main className="flex-grow bg-[#F3DC9F] px-4 pt-20 pb-12 md:px-8 lg:px-16">
        {/* FAQ 內容區塊和標題的容器 */}
        <div className="max-w-[800px] mx-auto relative mt-24">
          {/* FAQ 大標題 */}
          <h1 className="text-6xl sm:text-9xl font-black font-stretch-normal text-center text-[#78624D] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ fontFamily: "var(--font-passion-one)" }}>
            FAQ
          </h1>
          
          {/* FAQ 內容區塊 */}
          <div className="bg-[#ACCAB2] rounded-2xl p-4 md:p-8 pt-12 md:pt-16">
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div 
                  key={faq.id}
                  className="rounded-xl overflow-hidden transition-all duration-300 ease-in-out bg-[#78624D] w-full mx-auto faq-container"
                  style={{ 
                    maxWidth: '650px',
                    width: '100%',
                    margin: '0 auto' 
                  }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-3 md:px-6 py-4 md:py-8 flex justify-between items-center transition-colors"
                  >
                    <h3 className="text-xl md:text-3xl font-semibold text-[#ECD086] text-left pl-2 md:pl-4">
                      Q{faq.id}
                    </h3>
                    <h4 className="font-semibold text-white mb-3 text-sm md:text-base px-2">{faq.question}</h4>
                    <span className={`transform transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : ''}`}>
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
                  </button>
                  
                  {openId === faq.id && (
                    <div className="px-3 md:px-6 pb-4 md:pb-6 bg-[#78624D] border-t border-[#E9A751]/20">
                      <div className="text-white mt-4 mb-6">
                        
                        <p className="text-white/80 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 聯繫我們區塊 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#78624D]">
            More questions?
          </h2>
          <p className="text-gray-600 mb-4 ">
            If you have other questions, you can contact us.
          </p>
          <Link to="/contact" className="bg-[#78624D] text-white px-6 py-2 rounded-lg hover:bg-[#6a5643] transition-colors duration-300">
            Contact us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
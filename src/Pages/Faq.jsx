import { useState } from 'react';
import { Link, useLocation} from "react-router-dom";
import Footer from "@/Component/Footer";

const Faq = () => {
  const [openId, setOpenId] = useState(null);
  
  const faqData = [
    {
      id: 1,
      question: "這款運動手環的電池續航力如何？",
      answer: "續航力會根據使用方式有所不同。例如，在開啟 GPS 和心率監測的情況下，電池可能只能維持 1-2 天，而一般使用模式下可達 5-14 天。"
    },
    {
      id: 2,
      question: "這款運動手錶是否防水？可以游泳時佩戴嗎？",
      answer: "多數運動手錶具備防水功能，通常達到 5ATM（50 公尺防水）或更高，可以用於游泳和日常防水，但不建議用於深潛或熱水環境（如桑拿）。"
    },
    {
      id: 3,
      question: "這款運動手錶能夠追蹤哪些運動類型？",
      answer: "多數運動手錶支援跑步、健走、騎行、游泳等基本運動模式，高階款式可能還支援登山、瑜伽、力量訓練等多種運動模式。請確認是否符合您的運動需求。"
    },
  ];

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3DC9F]">
      <main className="flex-grow bg-[#F3DC9F] px-4 pt-20 pb-12 md:px-8 lg:px-16">
        {/* FAQ 內容區塊和標題的容器 */}
        <div className="max-w-[800px] mx-auto relative mt-24">
          {/* FAQ 大標題 */}
          <h1 className="text-9xl font-black font-stretch-normal text-center text-[#78624D] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ fontFamily: "var(--font-passion-one)" }}>
            FAQ
          </h1>
          
          {/* FAQ 內容區塊 */}
          <div className="bg-[#ACCAB2] rounded-2xl p-8 pt-16">
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div 
                  key={faq.id}
                  className="rounded-xl overflow-hidden transition-all duration-300 ease-in-out bg-[#78624D]"
                  style={{ width: '650px', margin: '0 auto' }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-8 flex justify-between items-center transition-colors"
                  >
                    <h3 className="text-3xl font-semibold text-[#ECD086] text-left pl-4">
                      Q{faq.id}
                    </h3>
                    <h4 className="font-semibold text-white mb-3">{faq.question}</h4>
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
                    <div className="px-6 pb-6 bg-[#78624D] border-t border-[#E9A751]/20">
                      <div className="text-white mt-4 mb-6">
                        
                        <p className="text-white/80 leading-relaxed">
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
          <h2 className="text-2xl font-semibold mb-4 text-[#78624D]">
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
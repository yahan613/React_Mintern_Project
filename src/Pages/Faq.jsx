import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Footer from "@/Component/Footer";
import faqData from "../json/FaqData.json";
import {
  Command,
  CommandInput,
} from "@/components/ui/command";
import { Search } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaq, setFilteredFaq] = useState(faqData);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // 處理搜索邏輯
  const handleSearch = (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredFaq(faqData);
      return;
    }

    const searchTerm = value.toLowerCase();
    const results = faqData.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
    );

    setFilteredFaq(results);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3DC9F] pt-20">
      {/* 添加媒體查詢樣式 */}
      <style>{responsiveStyles}</style>

      <main className="flex-grow bg-[#F3DC9F] px-4 pt-20 pb-12 md:px-8 lg:px-16">
        {/* FAQ 內容區塊和標題的容器 */}
        <div className="max-w-[800px] mx-auto relative ">
          {/* 標題和搜索框並排顯示 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between -mb-5 gap-4">
            {/* FAQ 大標題 */}
            <div className="relative ml-16">
              <h1 className="text-6xl sm:text-9xl font-black font-stretch-normal text-[#78624D]" style={{ fontFamily: "var(--font-passion-one)" }}>
                FAQ
              </h1>
            </div>
            
            {/*搜尋欄*/}
            <div className="z-20 md:w-[400px] mr-16">
              <Command className="rounded-lg  shadow-md bg-[var(--secondary)]">
                <div className="flex items-center px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-90 text-[var(--tertiary)]" />
                  <input
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm text-[var(--tertiary)] outline-none placeholder:text-[var(--tertiary)] disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="搜尋常見問題..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => handleSearch("")}
                      className="text-[var(--tertiary)] hover:text-slate-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </Command>
            </div>
          </div>
          {/* FAQ 內容區塊 */}
          <div className="bg-[var(--primary)] rounded-2xl p-4 md:p-8 pt-12 md:pt-16">
            <div className="space-y-6">
              {filteredFaq.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[var(--secondary)] font-medium">查無相關問題</p>
                </div>
              ) : (
                filteredFaq.map((faq) => (
                  <div
                    id={`faq-${faq.id}`}
                    key={faq.id}
                    className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out bg-[var(--secondary)] w-full mx-auto faq-container"
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
                      <div className="px-4 md:px-8  bg-[#78624D] border-t border-[#E9A751]/20">
                        <div className="text-white mt-4 mb-6 flex flex-row items-center">

                          <p className="text-white/80 leading-relaxed text-sm md:text-base ">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 聯繫我們區塊 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#78624D]">
            More questions?
          </h2>
          <p className="text-gray-600 mb-6 ">
            If you have other questions, you can contact us.
          </p>
          <Link to="/contact" className="bg-[#78624D] text-white px-6 py-3 rounded-2xl hover:bg-[#6a5643] transition-colors duration-300">
            Contact us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
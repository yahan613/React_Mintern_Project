import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/Component/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    message: '',
    name: '',
    phone: '',
    email: '',
    file: null
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 電話號碼欄位只能輸入數字
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // 這裡可以添加表單驗證和提交邏輯
    setSubmitted(true);
    
    // 重置表單
    setTimeout(() => {
      setFormData({
        message: '',
        name: '',
        phone: '',
        email: '',
        file: null
      });
      setFileName('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="h-auto flex flex-col bg-[var(--primary)]">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-2">
            "We're Here To Help—Reach Out Anytime!"
          </h1>
        </div>
        
        <div className="w-full max-w-2xl bg-white bg-opacity-50 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 主要訊息輸入區 */}
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Your Message Here..."
                className="w-full h-40 p-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>
            
            {/* 名字和電話號碼（兩欄並排） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full h-14 px-4 py-0 bg-white rounded-2xl border border-gray-200"
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full h-14 px-4 py-0 bg-white rounded-2xl border border-gray-200"
                  required
                  pattern="\d*"
                  inputMode="numeric"
                />
              </div>
            </div>
            
            {/* 電子郵件和檔案上傳（兩欄並排） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-14 px-4 py-0 bg-white rounded-2xl border border-gray-200"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex items-center h-14 px-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 w-full"
                >
                  <Upload size={20} className="mr-2 text-gray-500" />
                  <span className="truncate text-gray-500">
                    {fileName || "Upload File"}
                  </span>
                </label>
              </div>
            </div>
            
            {/* 提交按鈕 */}
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="px-10 py-6 bg-[var(--tertiary)] hover:bg-[#e0c475] text-[#78624D] font-medium rounded-xl text-lg"
              >
                Submit
              </Button>
            </div>
            
            {/* 提交成功訊息 */}
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 
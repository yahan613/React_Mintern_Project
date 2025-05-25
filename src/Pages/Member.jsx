import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/Component/Footer';
import  Failed  from '@/Component/Member/Failed';
import  Success from '@/Component/Member/Success';
import { useSelector } from 'react-redux';

const MemberCenter = () => {
  const userInfo = useSelector((state) => state.login);
  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--primary)] items-center">
      <h1 className="text-4xl font-bold mb-4 text-[var(--secondary)] self-center-start">Member Center</h1>
      { userInfo.isLoggedIn ? <Success /> : <Failed /> }
      <div className="flex-1" /> {/* 這行可選，讓內容撐開 */}
      <Footer className="mt-auto w-full" />
    </div>
  );
};

export default MemberCenter;




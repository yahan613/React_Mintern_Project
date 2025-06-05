import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/Component/Footer';
import Failed from '@/Component/Member/Failed';
import Success from '@/Component/Member/Success';
import { useSelector } from 'react-redux';

const MemberCenter = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  console.log('MemberCenter isLoggedIn:', isLoggedIn);
  return (
    <div className="w-full flex flex-col items-end bg-[var(--primary)] justify-center items-center pt-10">
      <h1 className="text-4xl font-bold text-[var(--secondary)] self-center ">Member Center</h1>
      {isLoggedIn ? <Success /> : <Failed />}
      <Footer className="mt-auto w-full" />
    </div>
  );
};

export default MemberCenter;




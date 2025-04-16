import React from 'react';
import { Link } from 'react-router-dom';

const MemberCenter = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">會員中心</h1>
      <p className="mb-4">尚未登入</p>
      <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        登入
      </Link>
    </div>
  );
};

export default MemberCenter;

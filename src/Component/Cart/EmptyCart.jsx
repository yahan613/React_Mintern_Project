import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center py-8 bg-white rounded-lg">
      <p className="text-gray-500">The cart is empty</p>
      <Link to="/product" className="mt-4 inline-block bg-[var(--primary)] text-white px-4 py-2 rounded">
        Go shopping~😎
      </Link>
    </div>
  );
};

export default EmptyCart; 
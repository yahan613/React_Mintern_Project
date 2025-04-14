import React from 'react';

const QuantityAdjuster = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center">
      <button
        className="px-2 sm:px-3 py-1 bg-[var(--primary)] text-white rounded-l-lg border-none shadow-none overflow-hidden"
        style={{ boxShadow: 'none', borderRadius: '0.5rem 0 0 0.5rem' }}
        onClick={onDecrease}
      >
        -
      </button>
      <span className="px-3 sm:px-4 py-1 bg-[var(--secondary)] text-white border-x border-[var(--primary)]">{quantity}</span>
      <button
        className="px-2 sm:px-3 py-1 bg-[var(--primary)] text-white rounded-r-lg border-none shadow-none overflow-hidden"
        style={{ boxShadow: 'none', borderRadius: '0 0.5rem 0.5rem 0' }}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster; 
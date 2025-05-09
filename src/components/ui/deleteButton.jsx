import React from 'react';

const DeleteButton = ({ onClick }) => {
  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={onClick}
        className="text-[var(--secondary)] hover:text-red-500 transition-colors bg-transparent border-none shadow-none"
        style={{ boxShadow: 'none' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default DeleteButton; 
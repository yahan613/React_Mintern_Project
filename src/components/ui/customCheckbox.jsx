import React from 'react';

const CustomCheckbox = ({ isChecked, onChange }) => {
  return (
    <div className="flex-shrink-0">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only" // 隱藏原始 checkbox
        />
        <div
          onClick={onChange}
          className="w-5 sm:w-6 h-5 sm:h-6 rounded bg-[var(--secondary)] cursor-pointer flex items-center justify-center"
        >
          {isChecked && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox; 
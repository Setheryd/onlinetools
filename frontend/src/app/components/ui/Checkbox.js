import React, { useId } from 'react';

const Checkbox = ({ label, checked, onChange, description, className = '', id }) => {
  const reactId = useId();
  const checkboxId = id || reactId;
  return (
    <label htmlFor={checkboxId} className={`inline-flex items-start gap-3 cursor-pointer select-none ${className}`}>
      <span className="relative inline-flex items-center justify-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="w-5 h-5 rounded-md border border-gray-300 bg-white shadow-sm peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors"
        />
        <svg
          className="pointer-events-none absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="text-sm text-gray-800 font-medium">{label}</span>
        {description && (
          <span className="block text-xs text-gray-500 mt-0.5">{description}</span>
        )}
      </span>
    </label>
  );
};

export default Checkbox;



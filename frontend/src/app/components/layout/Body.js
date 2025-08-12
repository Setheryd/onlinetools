import React from 'react';

const Body = ({ children, className = '' }) => {
  return (
    <main className={`min-h-screen bg-gray-50 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
};

export default Body;

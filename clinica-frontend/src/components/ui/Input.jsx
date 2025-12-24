import React, { useState } from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-2 text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-700 placeholder-gray-400`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default Input;

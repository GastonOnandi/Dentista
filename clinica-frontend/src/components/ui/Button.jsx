import React, { useState } from 'react';

const Button = ({ children, onClick, variant = "primary", disabled = false }) => {
  const baseStyles = "w-full py-3 rounded-lg font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 active:scale-98 disabled:bg-gray-400 disabled:cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};
export default Button;
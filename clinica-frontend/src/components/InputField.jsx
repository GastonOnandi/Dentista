import React from 'react';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  fullWidth = false 
}) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
    />
  </div>
);

export default InputField;
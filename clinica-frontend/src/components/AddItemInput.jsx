import React from 'react';
import { Plus } from 'lucide-react';

const AddItemInput = ({ 
  placeholder, 
  value, 
  onChange, 
  onAdd, 
  buttonText = "Add" 
}) => (
  <div className="flex gap-2">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === 'Enter' && onAdd()}
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
    />
    <button
      onClick={onAdd}
      className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
    >
      <Plus size={18} />
      {buttonText}
    </button>
  </div>
);

export default AddItemInput;
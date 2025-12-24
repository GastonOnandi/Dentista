import React from 'react';
import { X } from "lucide-react";

const ModalBase = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-6 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalBase;

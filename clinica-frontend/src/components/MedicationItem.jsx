import React from 'react';
import { Trash2, Pill } from 'lucide-react';

const MedicationItem = ({ medication, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center gap-3">
      <Pill className="w-5 h-5 text-gray-500" />
      <span className="text-gray-800 font-medium">{medication}</span>
    </div>
    <button
      onClick={onRemove}
      className="text-gray-400 hover:text-red-500 transition-colors"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

export default MedicationItem;
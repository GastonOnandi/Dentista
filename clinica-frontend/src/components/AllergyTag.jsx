import React from 'react';
import { X } from 'lucide-react';

const AllergyTag = ({ allergy, onRemove }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium">
    {allergy}
    <button
      onClick={onRemove}
      className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
    >
      <X size={14} />
    </button>
  </span>
);

export default AllergyTag;
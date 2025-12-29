import React from 'react';
import { ChevronDown } from 'lucide-react';

const TreatmentTypeSelect = ({ value, onChange, treatments }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Treatment Type
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
        >
          <option value="">Select treatment</option>
          {treatments.map((treatment) => (
            <option key={treatment.id} value={treatment.id}>
              {treatment.nombre}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default TreatmentTypeSelect;
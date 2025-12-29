import React from 'react';
import { Clock } from 'lucide-react';

const TimeInput = ({ label, value, onChange }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
    </div>
  );
};

export default TimeInput;
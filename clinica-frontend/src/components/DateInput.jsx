import React from 'react';
import { Calendar } from 'lucide-react';

const DateInput = ({ value, onChange, slotsAvailable }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fecha
      </label>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        {slotsAvailable > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-cyan-50 rounded-lg">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-sm text-cyan-700 font-medium">
              {slotsAvailable} Slots Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateInput;
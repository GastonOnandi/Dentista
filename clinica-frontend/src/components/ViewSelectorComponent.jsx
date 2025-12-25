
import React, { useState } from 'react';
import { Calendar, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const ViewSelector = ({ activeView, onViewChange }) => {
  const views = ['Today', 'Day', 'Week', 'Month'];
  
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeView === view
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};
export default ViewSelector;
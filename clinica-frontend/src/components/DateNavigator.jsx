import React, { useState } from 'react';
import { Calendar, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const DateNavigator = ({ dateRange, onPrevious, onNext }) => {
  return (
    <div className="flex items-center gap-4">
      <button onClick={onPrevious} className="p-2 hover:bg-gray-100 rounded-lg">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-xl font-semibold min-w-[200px] text-center">
        {dateRange}
      </span>
      <button onClick={onNext} className="p-2 hover:bg-gray-100 rounded-lg">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
export default DateNavigator;
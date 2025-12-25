import React, { useState } from 'react';
import { Calendar, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const StaffFilter = ({ selectedStaff, onStaffChange }) => {
  const staff = ['Dr. Smith', 'Dr. Jones', 'All Staff'];
  
  return (
    <div className="flex gap-3">
      {staff.map(person => (
        <button
          key={person}
          onClick={() => onStaffChange(person)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedStaff === person
              ? 'bg-cyan-100 text-cyan-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {person} <span className="ml-1">▼</span>
        </button>
      ))}
    </div>
  );
};
export default StaffFilter;
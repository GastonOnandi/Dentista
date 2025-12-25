
import React, { useState } from 'react';
import { Calendar, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const AppointmentCard = ({ patient, type, color }) => {
  const colorClasses = {
    purple: 'bg-purple-200 text-purple-800',
    blue: 'bg-blue-200 text-blue-800',
    green: 'bg-green-200 text-green-800',
    orange: 'bg-orange-200 text-orange-800',
    red: 'bg-red-200 text-red-800'
  };

  return (
    <div className={`p-3 rounded-lg ${colorClasses[color]} mb-2`}>
      <div className="font-semibold">{patient}</div>
      <div className="text-sm">{type}</div>
    </div>
  );
};
export default AppointmentCard;
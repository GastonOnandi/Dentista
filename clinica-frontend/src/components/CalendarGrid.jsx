import React, { useState } from 'react';
import { Calendar, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const CalendarGrid = ({ appointments }) => {
  const days = [
    { name: 'Mon', date: 23 },
    { name: 'Tue', date: 24 },
    { name: 'Wed', date: 25, isToday: true },
    { name: 'Thu', date: 26 },
    { name: 'Fri', date: 27 },
    { name: 'Sat', date: 28 },
    { name: 'Sun', date: 29 }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Calendar Header */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-4"></div>
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-4 text-center ${
              day.isToday ? 'bg-cyan-400 text-white' : ''
            }`}
          >
            <div className="text-sm font-medium">{day.name}</div>
            <div className="text-2xl font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-8">
        {/* Time Column */}
        <div className="border-r">
          {timeSlots.map((time, index) => (
            <div key={index} className="p-4 text-sm text-gray-600 border-b h-24">
              {time}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="border-r">
            {timeSlots.map((time, timeIndex) => {
              const appointment = appointments[`${day.date}-${time}`];
              return (
                <div key={timeIndex} className="p-2 border-b h-24">
                  {appointment && (
                    <AppointmentCard {...appointment} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CalendarGrid;
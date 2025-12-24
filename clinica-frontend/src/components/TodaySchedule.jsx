import React from 'react';
import { CheckCircle2, Droplet, Activity } from 'lucide-react';

const TodaySchedule = () => {
  const todaySchedule = [
    { name: "John Doe", type: "Check-up", time: "9:00 AM - 9:30 AM", icon: CheckCircle2, iconColor: "text-cyan-500", bgColor: "bg-cyan-50" },
    { name: "Jane Smith", type: "Cleaning", time: "10:00 AM - 10:45 AM", icon: Droplet, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
    { name: "Peter Pan", type: "Filling", time: "11:00 AM - 12:00 PM", icon: Activity, iconColor: "text-cyan-500", bgColor: "bg-cyan-50" },
    { name: "Mary Poppins", type: "Consultation", time: "12:00 PM - 12:30 PM", icon: Activity, iconColor: "text-cyan-500", bgColor: "bg-cyan-50" }
  ];

  return (
    <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Schedule</h2>
      <div className="space-y-4">
        {todaySchedule.map((appointment, index) => {
          const Icon = appointment.icon;
          return (
            <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`${appointment.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-5 h-5 ${appointment.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appointment.name} - {appointment.type}</h3>
                <p className="text-sm text-gray-500">{appointment.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TodaySchedule;
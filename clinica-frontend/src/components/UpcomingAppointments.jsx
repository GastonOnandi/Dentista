import React from 'react';

const UpcomingAppointments = () => {
  const upcomingAppointments = [
    { 
      day: "Tomorrow",
      patients: [
        { name: "Alice Johnson", time: "9:00 AM", type: "Routine Check", avatar: "AJ" }
      ]
    },
    {
      day: "Wednesday, Oct 28",
      patients: [
        { name: "Bob Williams", time: "10:30 AM", type: "Teeth Whitening", avatar: "BW" },
        { name: "Charlie Brown", time: "2:00 PM", type: "Crown Fitting", avatar: "CB" }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming</h2>
      <div className="space-y-6">
        {upcomingAppointments.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{section.day}</h3>
            <div className="space-y-3">
              {section.patients.map((patient, patientIndex) => (
                <div key={patientIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {patient.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{patient.name}</h4>
                    <p className="text-xs text-gray-500">{patient.time} - {patient.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
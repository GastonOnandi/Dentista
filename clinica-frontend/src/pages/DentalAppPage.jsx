import React, { useState } from 'react';
import ViewSelector from '../components/ViewSelectorComponent';
import StaffFilter from '../components/StaffFilter';
import DateNavigator from '../components/DateNavigator';
import CalendarGrid from '../components/CalendarGrid';

const DentalAppPage = () => {
  const [activeView, setActiveView] = useState('Today');
  const [selectedStaff, setSelectedStaff] = useState('Dr. Smith');
  const [dateRange, setDateRange] = useState('October 23 - 29, 2023');

  // Datos de ejemplo de citas
  const appointments = {
    '23-10:00 AM': { patient: 'J. Doe', type: 'Check-up', color: 'purple' },
    '24-11:00 AM': { patient: 'S. Rogers', type: 'Cleaning', color: 'blue' },
    '25-9:00 AM': { patient: 'T. Stark', type: 'Consultation', color: 'green' },
    '25-12:00 PM': { patient: 'B. Banner', type: 'Root Canal', color: 'orange' },
    '26-10:00 AM': { patient: 'P. Parker', type: 'Cleaning', color: 'blue' },
    '27-9:00 AM': { patient: 'N. Romanoff', type: 'Check-up', color: 'purple' },
    '23-2:00 PM': { patient: 'M. Kyle', type: 'Cancelled', color: 'red' }
  };

  const handlePrevious = () => {
    console.log('Previous week');
  };

  const handleNext = () => {
    console.log('Next week');
  };

  return (
    <main className="max-w-[1600px] mx-auto p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Appointments</h1>
        <p className="text-gray-600">
          Manage your daily, weekly, and monthly schedule.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-6">
        <DateNavigator
          dateRange={dateRange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <ViewSelector
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      {/* Staff Filter */}
      <div className="mb-6">
        <StaffFilter
          selectedStaff={selectedStaff}
          onStaffChange={setSelectedStaff}
        />
      </div>

      {/* Calendar */}
      <CalendarGrid appointments={appointments} />
    </main>
  );
};

export default DentalAppPage;

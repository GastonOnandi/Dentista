import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import TodaySchedule from '../components/TodaySchedule';
import UpcomingAppointments from '../components/UpcomingAppointments';

const DashboardPage = () => {
  const stats = [
    { title: "Today's Appointments", value: "12", change: "+2%", isPositive: true },
    { title: "New Patients", value: "5", change: "+5%", isPositive: true },
    { title: "Pending Invoices", value: "3", change: "-1%", isPositive: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. Smile!</h1>
              <p className="text-gray-500 mt-1">Monday, October 26, 2023</p>
            </div>
            <Link to="/patients/register">
              <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
                Add New Patient
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <TodaySchedule />
            <UpcomingAppointments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

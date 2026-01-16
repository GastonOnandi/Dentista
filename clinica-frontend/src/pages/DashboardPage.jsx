import React from 'react';
import { Link } from 'react-router-dom';
import TodaySchedule from '../components/TodaySchedule';
import UpcomingAppointments from '../components/UpcomingAppointments';

const DashboardPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenido, Dr. Hernandez!
          </h1>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString('es-UY', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <Link to="/patients/register">
          <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
            Añadir nuevo paciente
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <TodaySchedule />
        <UpcomingAppointments />
      </div>
    </div>
  );
};

export default DashboardPage;
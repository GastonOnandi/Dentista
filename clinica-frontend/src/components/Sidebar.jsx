import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, BarChart3, LayoutDashboard, Shield } from 'lucide-react';

// ==========================================
// COMPONENTE: Sidebar
// src/components/Sidebar.jsx
// ==========================================
const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Shield className="w-8 h-8 text-cyan-500" />
        <span className="text-xl font-bold text-gray-900">SmileCare</span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <Link 
          to="/" 
          className="w-full flex items-center gap-3 px-4 py-3 text-cyan-600 bg-cyan-50 rounded-lg font-medium"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        
        <Link 
          to="/calendario"
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <Calendar className="w-5 h-5" />
          Calendar
        </Link>
        
        <Link 
          to="/patients"
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <Users className="w-5 h-5" />
          Patients
        </Link>
        
        <Link 
          to="/reports"
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
          Reports
        </Link>

        {/* 👇 ELIMINADO Settings */}
        {/* <Link ...> */}
      </nav>

      {/* BOTTOM BUTTON */}
      <div className="p-4">
        <Link 
          to="/appointments/register"
          className="w-full block bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 text-center transition-colors"
        >
          New Appointment
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

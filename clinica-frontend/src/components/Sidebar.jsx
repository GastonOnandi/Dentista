import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, BarChart3, Settings, LayoutDashboard, Shield } from 'lucide-react';

// ==========================================
// COMPONENTE: Sidebar
// Para crear archivo separado: src/components/Sidebar.jsx
// ==========================================
const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Shield className="w-8 h-8 text-cyan-500" />
        <span className="text-xl font-bold text-gray-900">SmileCare</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-cyan-600 bg-cyan-50 rounded-lg font-medium">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
          <Calendar className="w-5 h-5" />
          Calendar
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
          <Users className="w-5 h-5" />
          Patients
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
          <BarChart3 className="w-5 h-5" />
          Reports
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>

      <div className="p-4">
        <button className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
          New Appointment
        </button>
      </div>
    </div>
  );
};
export default Sidebar;

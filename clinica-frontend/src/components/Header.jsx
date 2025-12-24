import React, { useState } from 'react';
import { Search, Plus, ChevronRight, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Plus className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">DentalCare</h1>
        </div>
        
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">Appointments</a>
          <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">Reports</a>
          <a href="#" className="text-gray-700 hover:text-blue-500 font-medium">Settings</a>
        </nav>
        
        <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
          <User className="text-white" size={24} />
        </div>
      </div>
    </header>
  );
};
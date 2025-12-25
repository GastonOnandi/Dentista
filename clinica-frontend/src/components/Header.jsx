import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Plus className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            DentalCare
          </h1>
        </div>

        {/* Navegación */}
        <nav className="flex items-center gap-8">
          <NavItem to="/appointments" label="Appointments" />
          <NavItem to="/reports" label="Reports" />
          <NavItem to="/settings" label="Settings" />
        </nav>

        {/* Usuario */}
        <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
          <User className="text-white" size={24} />
        </div>

      </div>
    </header>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `font-medium transition-colors ${
        isActive
          ? 'text-blue-500'
          : 'text-gray-700 hover:text-blue-500'
      }`
    }
  >
    {label}
  </NavLink>
);

export default Header;

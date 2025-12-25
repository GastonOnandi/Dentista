import React, { useState } from 'react';
import { Search, Plus, ChevronRight, User } from 'lucide-react';

const PatientCard = ({ patient, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
        isActive ? 'bg-blue-100' : 'hover:bg-gray-50'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
        patient.avatar ? '' : 'bg-gray-300'
      }`}>
        {patient.avatar ? (
          <img src={patient.avatar} alt={patient.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <User className="text-gray-600" size={28} />
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
        <p className="text-sm text-gray-500">ID: {patient.id}</p>
      </div>
      
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  );
};
export default PatientCard;
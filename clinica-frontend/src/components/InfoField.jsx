import React, { useState } from 'react';
import { Search, Plus, ChevronRight, User } from 'lucide-react';

const InfoField = ({ label, value }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
      <p className="text-gray-800 text-lg">{value}</p>
    </div>
  );
};
export default InfoField;
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
    </div>
  );
};
export default StatCard;
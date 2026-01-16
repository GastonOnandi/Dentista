import React from 'react';

const InfoAlert = ({ message }) => (
  <div className="flex gap-3 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
    <div className="flex-shrink-0">
      <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
        i
      </div>
    </div>
    <p className="text-sm text-gray-700">{message}</p>
  </div>
);

export default InfoAlert;
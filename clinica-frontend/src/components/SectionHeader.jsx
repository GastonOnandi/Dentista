import React from 'react';

const SectionHeader = ({ icon: Icon, title, iconColor = "text-cyan-500" }) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className={`w-6 h-6 ${iconColor}`} />
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
  </div>
);

export default SectionHeader;
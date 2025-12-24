import React from 'react';
import { Download, Printer } from 'lucide-react';
import FilterSection from '../components/FilterSection';
import ReportsTable from '../components/ReportsTable';

const ReportsPage = () => {
  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // Aquí puedes hacer la llamada a la API con los filtros
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Filter and view various reports.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              <Download className="w-4 h-4" />
              Export to CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <FilterSection onFilterChange={handleFilterChange} />

        {/* Table */}
        <ReportsTable />
      </div>
    </div>
  );
};

export default ReportsPage;

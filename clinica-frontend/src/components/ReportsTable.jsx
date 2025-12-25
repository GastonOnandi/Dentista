import React, { useState } from 'react';
import { Edit, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';

const ReportsTable = ({ onPaymentClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const reports = [
    { id: 1, patientName: "John Doe", treatment: "Routine Cleaning", date: "2023-10-27", status: "paid" },
    { id: 2, patientName: "Jane Smith", treatment: "Filling", date: "2023-10-26", status: "unpaid" },
    { id: 3, patientName: "Peter Jones", treatment: "Crown", date: "2023-10-25", status: "pending" },
    { id: 4, patientName: "Emily Davis", treatment: "Implant Consultation", date: "2023-10-24", status: "paid" },
    { id: 5, patientName: "Michael Brown", treatment: "Routine Cleaning", date: "2023-10-23", status: "paid" }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      unpaid: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Treatment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{report.patientName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.treatment}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    {/* 👇 AHORA FUNCIONA */}
                    <button
                      onClick={() => onPaymentClick(report)}
                      className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                    >
                      <CreditCard className="w-4 h-4" />
                      Payment
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to 5 of 20 results
        </p>
      </div>
    </div>
  );
};

export default ReportsTable;

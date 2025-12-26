import React, { useState, useEffect } from 'react';
import { Edit, CreditCard } from 'lucide-react';

const ReportsTable = ({ onPaymentClick }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/clientetratamiento/deudas/pendientes")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA BACKEND:", data);
        setReports(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      PAID: "bg-green-100 text-green-700",
      UNPAID: "bg-red-100 text-red-700",
      PENDING: "bg-yellow-100 text-yellow-700",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
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
                <td className="px-6 py-4 text-sm text-gray-900">{report.clienteNombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.tratamientoNombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.fecha}</td>
                <td className="px-6 py-4">{getStatusBadge(report.estadoPago)}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

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

      {/* Fake Pagination for now */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {reports.length} results
        </p>
      </div>
    </div>
  );
};

export default ReportsTable;

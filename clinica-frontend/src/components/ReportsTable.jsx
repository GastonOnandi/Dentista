import React from 'react';
import { Edit, CreditCard } from 'lucide-react';

const ReportsTable = ({ data, loading, onPaymentClick }) => {

  // Calcular el estado de pago basado en pago/total
  const calculatePaymentStatus = (pago, total) => {
    if (!total || total === 0) return 'PENDING';
    if (pago >= total) return 'PAID';
    if (pago > 0) return 'PENDING';
    return 'UNPAID';
  };

  const getStatusBadge = (pago, total) => {
    const status = calculatePaymentStatus(pago, total);
    
    const styles = {
      PAID: "bg-green-100 text-green-700",
      UNPAID: "bg-red-100 text-red-700",
      PENDING: "bg-yellow-100 text-yellow-700",
    };

    const labels = {
      PAID: "Pagado",
      UNPAID: "Sin Pagar",
      PENDING: "Pendiente",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre Paciente
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tratamiento
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pagado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Deuda
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : !data || data.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              data.map((report, index) => (
                <tr 
                  key={`${report.nombrePaciente}-${report.nombreTratamiento}-${report.fecha}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {report.nombrePaciente}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.nombreTratamiento}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.fecha}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ${report.total?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">
                    ${report.pago?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">
                    ${report.deuda?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(report.pago, report.total)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium hover:underline"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>

                      <button
                        onClick={() => onPaymentClick(report)}
                        className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium hover:underline"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pago
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {data?.length || 0} resultado{data?.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default ReportsTable;
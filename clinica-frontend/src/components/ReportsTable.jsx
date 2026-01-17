import React from "react";
import { Edit, CreditCard } from "lucide-react";

const ReportsTable = ({ data, loading, onPaymentClick }) => {

  // 🛡️ Blindaje total
  const safeData = Array.isArray(data) ? data : [];

  const calculatePaymentStatus = (pago, total) => {
    if (!total || total === 0) return "PENDING";
    if (pago >= total) return "PAID";
    if (pago > 0) return "PENDING";
    return "UNPAID";
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
      UNPAID: "Sin pagar",
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
              <th className="px-6 py-4 text-left text-xs font-semibold">Paciente</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Tratamiento</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Fecha</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Pagado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Deuda</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center">
                  Cargando...
                </td>
              </tr>
            ) : safeData.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center">
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              safeData.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{report.nombrePaciente}</td>
                  <td className="px-6 py-4">{report.nombreTratamiento}</td>
                  <td className="px-6 py-4">{report.fecha}</td>
                  <td className="px-6 py-4 font-semibold">
                    ${report.total ?? 0}
                  </td>
                  <td className="px-6 py-4 text-green-600">
                    ${report.pago ?? 0}
                  </td>
                  <td className="px-6 py-4 text-red-600">
                    ${report.deuda ?? 0}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(report.pago, report.total)}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="flex items-center gap-1 text-cyan-600">
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => onPaymentClick(report)}
                      className="flex items-center gap-1 text-cyan-600"
                    >
                      <CreditCard size={16} /> Pago
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t text-sm text-gray-600">
        Mostrando {safeData.length} resultado{safeData.length !== 1 && "s"}
      </div>
    </div>
  );
};

export default ReportsTable;

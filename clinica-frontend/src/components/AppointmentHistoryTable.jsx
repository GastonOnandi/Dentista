import { useState } from "react";
import { Eye } from "lucide-react"; // opcional, usa cualquier icono

const ITEMS_PER_PAGE = 4;

const AppointmentHistoryTable = ({ appointments }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const paginated = appointments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Appointment History</h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase tracking-wide border-b">
            <th className="px-6 py-3">Date & Time</th>
            <th className="px-6 py-3">Treatment / Reason</th>
            <th className="px-6 py-3 w-12"></th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((appt) => (
            <tr
              key={appt.id}
              className="text-sm text-gray-700 border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="font-medium">{appt.date}</div>
                <div className="text-gray-500 text-sm">{appt.time}</div>
              </td>

              <td className="px-6 py-4">
                <div className="font-medium">{appt.treatment}</div>
                <div className="text-gray-500 text-sm">{appt.notes}</div>
              </td>

              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {1 + (page - 1) * ITEMS_PER_PAGE} to{" "}
          {Math.min(page * ITEMS_PER_PAGE, appointments.length)} of{" "}
          {appointments.length} results
        </span>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistoryTable;

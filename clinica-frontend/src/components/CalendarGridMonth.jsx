import React from "react";
import moment from "moment";
import "moment/locale/es";

// 🔧 Aseguramos que la semana empiece en lunes
moment.updateLocale("es", { week: { dow: 1 } });

const CalendarGridMonth = ({ baseDate }) => {
  // 📌 baseDate es moment(), por ejemplo
  const start = moment(baseDate).startOf("month").startOf("week"); // ahora es lunes

  // 6 filas x 7 días → 42 celdas
  const days = Array.from({ length: 42 }).map((_, i) =>
    moment(start).add(i, "days")
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      {/* Header de nombres de días */}
      <div className="grid grid-cols-7 text-center font-bold border-b pb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Días */}
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`h-24 border p-2 ${
              // días fuera del mes → grises
              day.month() !== baseDate.month()
                ? "bg-gray-100 text-gray-400"
                : ""
            } ${
              // día actual → resaltado
              day.isSame(moment(), "day") ? "bg-cyan-200 font-bold" : ""
            }`}
          >
            <div>{day.format("D")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGridMonth;

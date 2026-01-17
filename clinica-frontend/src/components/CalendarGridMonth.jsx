import React from "react";
import { format, startOfMonth, startOfWeek, addDays, getMonth, isToday } from "date-fns";
import { es } from "date-fns/locale";

const CalendarGridMonth = ({ baseDate }) => {
  const monthStart = startOfMonth(baseDate);
  // Empezar en el lunes de la semana del primer día del mes
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });

  const days = Array.from({ length: 42 }).map((_, i) =>
    addDays(gridStart, i)
  );

  // Nombres de los días en español
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="grid grid-cols-7 text-center font-bold border-b pb-3 mb-1">
        {dayNames.map((day) => (
          <div key={day} className="text-gray-600 text-sm uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t">
        {days.map((day) => {
          const isCurrentMonth = getMonth(day) === getMonth(monthStart);
          const isTodayDate = isToday(day);
          
          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`h-28 border-r border-b p-2 ${
                !isCurrentMonth ? "bg-gray-50 text-gray-300" : "bg-white"
              } ${isTodayDate ? "bg-cyan-50" : ""}`}
            >
              <div className={`text-right text-xs ${isTodayDate ? "font-bold text-cyan-600" : ""}`}>
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGridMonth;
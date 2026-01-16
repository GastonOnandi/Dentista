import React from "react";
import moment from "moment";
import "moment/locale/es";

const CalendarGridMonth = ({ baseDate }) => {
  moment.locale("es");

  const startOfMonth = moment(baseDate).startOf("month");
  // Empezar en el lunes de la semana del primer día del mes
  const startOfGrid = moment(startOfMonth).startOf("isoWeek");

  const days = Array.from({ length: 42 }).map((_, i) =>
    moment(startOfGrid).add(i, "days")
  );

  // Forzamos nombres manuales si el locale sigue fallando en tu entorno
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
          const isCurrentMonth = day.month() === startOfMonth.month();
          const isToday = day.isSame(moment(), "day");
          
          return (
            <div
              key={day.format("YYYY-MM-DD")}
              className={`h-28 border-r border-b p-2 ${
                !isCurrentMonth ? "bg-gray-50 text-gray-300" : "bg-white"
              } ${isToday ? "bg-cyan-50" : ""}`}
            >
              <div className={`text-right text-xs ${isToday ? "font-bold text-cyan-600" : ""}`}>
                {day.format("D")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGridMonth;
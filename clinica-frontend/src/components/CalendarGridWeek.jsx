import React, { useEffect, useState } from "react";
import moment from "moment";
import AppointmentCard from "./AppointmentCard";

const CalendarGridWeek = ({ appointments = {}, baseDate }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const startOfWeek = moment(baseDate).startOf("week").add(1, "day");

    const nuevosDias = Array.from({ length: 7 }).map((_, i) => {
      const fecha = moment(startOfWeek).add(i, "days");
      return {
        name: fecha.format("ddd"),
        date: fecha.format("D"),
        keyDate: fecha.format("YYYY-MM-DD"),
        isToday: fecha.isSame(moment(), "day"),
      };
    });

    setDays(nuevosDias);
  }, [baseDate]);

  const timeSlots = [
    "08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">

      {/* Header de días */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-4"></div>
        {days.map((day,i)=>(
          <div key={i} className={`p-4 text-center ${day.isToday ? "bg-cyan-400 text-white" : ""}`}>
            <div className="text-sm font-medium">{day.name}</div>
            <div className="text-2xl font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Celdas */}
      <div className="grid grid-cols-8">
        <div className="border-r">
          {timeSlots.map((time,i)=>(
            <div key={i} className="p-4 text-sm text-gray-600 border-b h-24">{time}</div>
          ))}
        </div>

        {days.map((day,di)=>(
          <div key={di} className="border-r">
            {timeSlots.map((time,ti)=>{
              const appointment = appointments[`${day.keyDate}-${time}`];
              return (
                <div key={ti} className="p-2 border-b h-24">
                  {appointment && <AppointmentCard {...appointment} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGridWeek;

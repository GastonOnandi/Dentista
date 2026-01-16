import moment from "moment";
import "moment/locale/es"; // Asegurar locale
import AppointmentCard from "./AppointmentCard";

const CalendarGridDay = ({ baseDate, appointments }) => {
  const dateKey = baseDate.format("YYYY-MM-DD");
  const timeSlots = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {baseDate.format("dddd DD [de] MMMM YYYY")}
      </h2>

      {timeSlots.map(time => {
        const turno = appointments[`${dateKey}-${time}`];
        return (
          <div key={time} className="border-b h-20 flex items-center px-2">
            <div className="w-24 text-gray-500">{time} hs</div>
            {turno && <AppointmentCard {...turno} />}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGridDay;
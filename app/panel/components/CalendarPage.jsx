// components/YearCalendar.tsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment-jalaali';
import 'react-calendar/dist/Calendar.css'; // basic calendar CSS

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateClick = (date) => {
    const formattedDate = moment(date).format('jYYYY/jMM/jDD');
    const eventTitle = prompt('عنوان رویداد را وارد کنید:');
    if (eventTitle) {
      setEvents((prevEvents) => {
        const newEvents = { ...prevEvents };
        if (!newEvents[formattedDate]) {
          newEvents[formattedDate] = [];
        }
        newEvents[formattedDate].push(eventTitle);
        return newEvents;
      });
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('jYYYY/jMM/jDD');
      const dayEvents = events[formattedDate];
      return dayEvents ? (
        <ul className="mt-1 space-y-1">
          {dayEvents.map((event, idx) => (
            <li
              key={idx}
              className="bg-yellow-100 text-yellow-800 text-xs px-1 rounded"
            >
              {event}
            </li>
          ))}
        </ul>
      ) : null;
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col place-items-center ">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        سال جاری
      </h1>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        value={date}
        locale="fa-IR"
        className="w-full border-none text-gray-700 [&_.react-calendar__tile]:rounded-lg [&_.react-calendar__tile]:transition hover:[&_.react-calendar__tile]:bg-blue-50 [&_.react-calendar__tile--now]:bg-blue-200 [&_.react-calendar__tile--active]:bg-blue-400 [&_.react-calendar__tile--active]:text-white"
      />
    </div>
  );
};

export default CalendarPage;

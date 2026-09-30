"use client";

import trLocale from "@fullcalendar/core/locales/tr";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import "../../styles/calendar.css";

const HEADER_TOOLBAR = {
  left: "title",
  center: "",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek today prev,next",
};

const BUTTON_TEXT = {
  today: "Bugün",
  dayGridMonth: "Ay",
  timeGridWeek: "Hafta",
  timeGridDay: "Gün",
  listWeek: "Ajanda",
};

export default function CalendarBoard({ events, onSelect }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
      locale={trLocale}
      initialView="dayGridMonth"
      events={events}
      height="auto"
      fixedWeekCount={false}
      dayMaxEvents={3}
      eventClick={(info) => {
        info.jsEvent.preventDefault();
        onSelect({ id: info.event.id, title: info.event.title, ...info.event.extendedProps });
      }}
      eventContent={(eventInfo) => (
        <div className="w-full overflow-hidden px-1">
          <div className="truncate font-semibold">{eventInfo.event.title}</div>
          {eventInfo.event.extendedProps.description && (
            <div className="truncate text-xs opacity-70">
              {eventInfo.event.extendedProps.description}
            </div>
          )}
        </div>
      )}
      headerToolbar={HEADER_TOOLBAR}
      buttonText={BUTTON_TEXT}
    />
  );
}

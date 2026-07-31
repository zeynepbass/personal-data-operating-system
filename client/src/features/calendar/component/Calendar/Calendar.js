"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import trLocale from "@fullcalendar/core/locales/tr";
import "./calendar.css";
import events from "@/shared/mocks/event.json";
import { PageHeader } from "@/shared/components/molecules";
export const Calendar=()=>{
    return(
        <div className="space-y-6">
        <PageHeader title="Takvim" />
  
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            locale={trLocale}
            initialView="dayGridMonth"
            initialDate="2024-06-01"
            events={events}
            height="auto"
            fixedWeekCount={false}
            headerToolbar={{
              left: "title",
              center: "",
              right:
                "dayGridMonth,timeGridWeek,timeGridDay,listWeek today prev,next",
            }}
            buttonText={{
              today: "Bugün",
              dayGridMonth: "Ay",
              timeGridWeek: "Hafta",
              timeGridDay: "Gün",
              listWeek: "Ajanda",
            }}
          />
        </div>
      </div>
    )
}
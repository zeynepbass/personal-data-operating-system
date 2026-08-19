"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import trLocale from "@fullcalendar/core/locales/tr";

import "../../styles/calendar.css";
import { PageHeader } from "@/shared/components/molecules";
import { Button, Heading } from "@/shared/components/atoms";

export default function Calendar({ data = [] }) {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Takvim" className="py-6"/>

      <div className="rounded-3xl bg-white dark:bg-[#1a1a22] p-6 shadow-sm">
        <div className="h-[calc(100vh-260px)] min-h-[500px]">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          locale={trLocale}
          initialView="dayGridMonth"
          initialDate="2026-08-15"
          events={data}
          height="100%"
          scrollTime="07:00:00"
          fixedWeekCount={false}
          editable={true}
          selectable={true}
          dayMaxEvents={3}
          eventClick={(info) => {
            setSelectedTask({
              id: info.event.id,
              title: info.event.title,
              start: info.event.start,
              ...info.event.extendedProps,
            });
          }}
          eventContent={(eventInfo) => (
            <div className="w-full overflow-hidden px-1">
              <div className="font-semibold truncate">
                {eventInfo.event.title}
              </div>
        
              {eventInfo.event.extendedProps.description && (
                <div className="truncate text-xs opacity-70">
                  {eventInfo.event.extendedProps.description}
                </div>
              )}
            </div>
          )}
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

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1a1a22] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Heading title="Task Detayı" />
              <Button
                type="button"
                variant="ghost"
                text="x"
                onClick={() => setSelectedTask(null)}
                className="text-xl text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Başlık</p>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {selectedTask.title}
                </p>
              </div>

              {selectedTask.description && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Açıklama</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedTask.description}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Başlangıç-Bitiş tarihi</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedTask.start}- {selectedTask.end}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Öncelik</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedTask.priority || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Durum</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedTask.completed ? "Tamamlandı" : "Devam ediyor"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { PageHeader } from "@/shared/components/molecules";
import { Modal } from "@/shared/components/organisms/Modal";

const CalendarBoard = dynamic(() => import("./CalendarBoard"), {
  ssr: false,
  loading: () => <div role="status" className="h-[600px] animate-pulse rounded-2xl bg-gray-100" />,
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" });

/** @param {string | undefined} value */
const formatDay = (value) => (value ? dateFormatter.format(new Date(value)) : "-");

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-700">{children}</dd>
    </div>
  );
}

export default function Calendar({ data = [] }) {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Takvim" className="py-6" />

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <CalendarBoard events={data} onSelect={setSelectedTask} />
      </div>

      <Modal
        open={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title ?? "Görev"}
      >
        {selectedTask && (
          <dl className="space-y-4">
            {selectedTask.description && (
              <Detail label="Açıklama">{selectedTask.description}</Detail>
            )}
            <Detail label="Başlangıç – bitiş">
              {formatDay(selectedTask.start)} – {formatDay(selectedTask.end)}
            </Detail>
            <Detail label="Öncelik">{selectedTask.priority || "-"}</Detail>
            <Detail label="Atanan">{selectedTask.assignee?.fullName ?? "-"}</Detail>
            <Detail label="Durum">{selectedTask.completed ? "Tamamlandı" : "Devam ediyor"}</Detail>
          </dl>
        )}
      </Modal>
    </div>
  );
}

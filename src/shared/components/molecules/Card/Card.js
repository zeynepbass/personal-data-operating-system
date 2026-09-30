"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Calendar, GripVertical, User } from "lucide-react";

const PRIORITY_LABELS = { low: "Düşük", medium: "Orta", high: "Yüksek", critical: "Kritik" };

export function Card({ task, index }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          aria-label={`${task.title}, sürüklemek için boşluk tuşuna basın`}
          className={`cursor-grab rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#555A8A] active:cursor-grabbing ${
            snapshot.isDragging ? "ring-2 ring-[#555A8A]" : ""
          }`}
        >
          <GripVertical size={18} aria-hidden="true" className="mb-3 text-gray-500" />

          <h4 className="font-bold text-gray-900">{task.title}</h4>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{task.description}</p>
          )}

          <span className="mt-4 inline-flex rounded-lg bg-indigo-100 px-3 py-1 text-xs text-indigo-800">
            {PRIORITY_LABELS[task.priority] ?? task.priority}
          </span>

          <p className="mt-5 flex items-center justify-end gap-2 text-sm text-gray-500">
            <User size={15} aria-hidden="true" />
            {task.assignee?.fullName ?? "-"}
          </p>
          {task.date && (
            <p className="mt-2 flex items-center justify-end gap-2 text-sm text-gray-500">
              <Calendar size={15} aria-hidden="true" />
              {task.date}
            </p>
          )}
        </article>
      )}
    </Draggable>
  );
}

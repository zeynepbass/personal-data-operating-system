"use client";
import { Draggable } from "@hello-pangea/dnd";

import { Calendar, GripVertical } from "lucide-react";

export function Card({ task, index }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="
                    bg-white dark:bg-[#1a1a22]
                    rounded-xl
                    p-4
                    shadow-sm
                    border border-transparent dark:border-white/10
                    cursor-grab
                    active:cursor-grabbing
                    hover:shadow-md
                    transition
                "
        >
          <GripVertical size={18} className="text-gray-500 dark:text-gray-400 mb-3" />

          <h4 className="font-bold text-gray-900 dark:text-gray-100">{task?.description}</h4>

          <span
            className="
                        inline-flex
                        mt-4
                        rounded-lg
                        bg-indigo-100 dark:bg-indigo-500/15
                       text-red-600 dark:text-red-400
                        px-3
                        py-1
                        text-xs
                    "
          >
            {task.priority}
          </span>

          <div className="flex items-center justify-end gap-2 mt-5 text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={15} />

           Görev tarihi: {task.date}
          </div>
        </article>
      )}
    </Draggable>
  );
};

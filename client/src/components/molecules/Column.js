"use client";

import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "@/components/molecules";

const colorClasses = {
  purple: {
    badge: "bg-purple-50",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
  orange: {
    badge: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  green: {
    badge: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
  },
};

export const Column = ({ column }) => {
  const color = colorClasses[column.color] ?? colorClasses.green;

  return (
    <>

    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            ${color.badge}
            rounded-2xl
            p-4
            min-h-175
            border
            border-gray-200
          `}
        >
          <div className="flex items-center justify-between mb-5">
            <h3
              className={`font-semibold text-lg flex items-center gap-2 ${color.text}`}
            >
              <span className={`w-2 h-2 rounded-full ${color.dot}`} />
              {column.title}
            </h3>

            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-semibold">
              {column.tasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>    </>
  );
};

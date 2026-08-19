"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Card } from "@/shared/components/molecules";
import { stageColorClasses } from "@/features/task/utils/stageColors";

export function Column  ({ column })  {
  const color = stageColorClasses[column.color] ?? stageColorClasses.green;

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
            border-gray-200 dark:border-white/10
          `}
        >
          <div className="flex items-center justify-between mb-5">
            <h3
              className={`font-semibold text-lg flex items-center gap-2 ${color.text}`}
            >
              <span className={`w-2 h-2 rounded-full ${color.dot}`} />
              {column.name}
            </h3>

            <span className="w-8 h-8 rounded-full bg-white dark:bg-white/10 text-gray-900 dark:text-gray-100 flex items-center justify-center text-sm font-semibold">
              {column.tasks?.length}
            </span>
          </div>

          <div className="space-y-4">
            {column.tasks?.map((task, index) => (
              <Card key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>    </>
  );
};

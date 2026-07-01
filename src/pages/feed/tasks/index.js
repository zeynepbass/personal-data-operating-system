"use client";

import { useState } from "react";
import data from "@/mocks/data.json";
import { Board } from "@/components/organisms";

export default function Page() {
  const [columns, setColumns] = useState(data);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceColumn = columns.find(
      (column) => column.id === source.droppableId
    );

    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    const sourceTasks = [...sourceColumn.tasks];

    const destinationTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destinationColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, removed);

    setColumns(
      columns.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: sourceTasks,
          };
        }

        if (column.id === destinationColumn.id) {
          return {
            ...column,
            tasks: destinationTasks,
          };
        }

        return column;
      })
    );
  };

  return (
    <Board
      columns={columns}
      onDragEnd={onDragEnd}
    />
  );
}
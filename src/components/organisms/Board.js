"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";

import { Button } from "@/components/atoms";
import {
  Column,
  FeedHeader,
  ListView,
  MenuNavigation,
  TableView,
} from "@/components/molecules";

export const Board = ({ columns, onDragEnd }) => {
  const [view, setView] = useState("list");
  const [data, setData] = useState(columns);
  const [openMenuId, setOpenMenuId] = useState(null);

  const rows = useMemo(() => {
    return data.flatMap((column) =>
      column.tasks.map((task) => ({
        ...task,
        status: column.title,
        statusColor: column.color,
        columnId: column.id,
      }))
    );
  }, [data]);
  const handleToggle = (taskId) => {
    setData((prev) =>
      prev.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: !task.completed,
              }
            : task
        ),
      }))
    );
  };

  const handleMenuClick = (taskId) => {
    setOpenMenuId((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <FeedHeader title="Görevler" description="" />
        <Button text="+ Yeni Görev" />
      </div>

      <MenuNavigation
        view={view}
        setView={setView}
        openMenuId={openMenuId}
        data={data}
      />

      <div className="mt-6">
        {view === "list" && (
          <ListView
            tasks={rows}
            onToggle={handleToggle}
            onMenuClick={handleMenuClick}
            openMenuId={openMenuId}
          />
        )}

        {view === "kanban" && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-6">
              {data.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                />
              ))}
            </div>
          </DragDropContext>
        )}

        {view === "table" && (
          <TableView
            rows={rows}
   
            onMenuClick={handleMenuClick}
            openMenuId={openMenuId}
          />
        )}
      </div>
    </>
  );
};
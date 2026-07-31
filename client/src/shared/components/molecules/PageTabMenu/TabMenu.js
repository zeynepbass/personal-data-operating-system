"use client";


import { DragDropContext } from "@hello-pangea/dnd";
import {
  ListView,
  TableView,
  Column,
  Modal,
} from "./board.dynamic";
import Button from "@/shared/components/atoms/Button"
import { FeedHeader, MenuNavigation } from "@/shared/components/molecules";

export const Board = ({
  view,
  setView,
  data,
  rows,
  form,
  open,
  setOpen,
  handleChange,
  onSubmit,
  onClose,
  onDragEnd,
  openMenuId,
  handleToggle,
  handleMenuClick,
}) => {
  return (
    <section className="flex flex-col gap-6">

      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FeedHeader
          title="Görevler"
          description="Bugün seni neler bekliyor."
        />

        <Button
          text="+ Yeni Görev"
          onClick={() => setOpen(true)}
          className="w-full md:w-auto    hover:text-white"
        />
      </header>

  
      <Modal
        open={open}
        setOpen={setOpen}
        form={form}
        handleChange={handleChange}
        onSubmit={onSubmit}
        onClose={onClose}
      />


      <MenuNavigation
        view={view}
        setView={setView}
        data={data}
        openMenuId={openMenuId}
      />


      <section className="min-h-[60vh]">
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <TableView
              rows={rows}
              onMenuClick={handleMenuClick}
              openMenuId={openMenuId}
            />
          </div>
        )}
      </section>
    </section>
  );
};
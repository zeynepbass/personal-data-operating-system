"use client"
import { Task } from "@/components/organisms";
import { useBoard } from "@/features/notes/hooks/useNotes";

export default function Tasks() {
  const {
    view,
    setView,
    data,
    rows,
    open,
    setOpen,
    onDragEnd,
    openMenuId,
    handleToggle,
    handleMenuClick,
    handleChange,
    form,
    onSubmit,
    onClose
  } = useBoard();

  return (
    <Task
      view={view}
      setView={setView}
      data={data}
      rows={rows}
      open={open}
      setOpen={setOpen}
      onDragEnd={onDragEnd}
      openMenuId={openMenuId}
      handleToggle={handleToggle}
      handleMenuClick={handleMenuClick}
      handleChange={handleChange}
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

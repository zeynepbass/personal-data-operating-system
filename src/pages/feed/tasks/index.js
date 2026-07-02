"use client";
import { Board } from "@/components/organisms";
import { useBoard } from "@/features/hooks/feed/useBoard";

export default function Page() {
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
    onClose,
  } = useBoard();

  return (
    <Board
      view={view}
      form={form}
      handleChange={handleChange}
      onSubmit={onSubmit}
      setView={setView}
      data={data}
      open={open}
      onClose={onClose}
      setOpen={setOpen}
      rows={rows}
      openMenuId={openMenuId}
      handleToggle={handleToggle}
      handleMenuClick={handleMenuClick}
      onDragEnd={onDragEnd}
    />
  );
}

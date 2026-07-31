"use client";
import { Board } from "@/shared/components/molecules";


export const Task=({  view,
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
  onClose})=> {


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

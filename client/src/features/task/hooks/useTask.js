import { getTask } from "../repositories/task.repository";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [openMenuId, setOpenMenuId] = useState(null);

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: getTask,
  });

  return {
    ...query,
    view,
    setView,
    open,
    setOpen,
    openMenuId,
    setOpenMenuId,
  };
}
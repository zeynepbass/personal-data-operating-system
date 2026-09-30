"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  changeTaskStatusAction,
  createMeetingAction,
  deleteTaskAction,
  toggleTaskCompletionAction,
  updateTaskAction,
} from "../actions/task.actions";

export const BOARD_QUERY_KEY = ["tasks"];

async function fetchBoard() {
  const response = await fetch("/api/tasks", { cache: "no-store" });
  if (response.status === 401) {
    window.location.assign("/login");
    return [];
  }
  if (!response.ok) throw new Error("Görevler yüklenemedi.");
  return response.json();
}

/**
 * @template T
 * @param {Promise<{ ok: boolean, data?: T, error?: string }>} promise
 * @returns {Promise<T>}
 */
async function unwrap(promise) {
  const result = await promise;
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

/**
 * @param {any[]} board
 * @param {string} taskId
 * @param {(task: any) => any} update
 */
function patchTask(board, taskId, update) {
  return board.map((meeting) => ({
    ...meeting,
    tasks: meeting.tasks.map((task) => (task.id === taskId ? update(task) : task)),
  }));
}

/**
 * @param {{ initialData?: any[] }} [options]
 */
export function useBoard({ initialData } = {}) {
  return useQuery({
    queryKey: BOARD_QUERY_KEY,
    queryFn: fetchBoard,
    initialData,
    staleTime: 15_000,
    refetchInterval: 60_000,
  });
}

function useOptimisticTaskMutation(mutationFn, applyUpdate, errorMessage) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: BOARD_QUERY_KEY });
      const previous = queryClient.getQueryData(BOARD_QUERY_KEY);
      queryClient.setQueryData(BOARD_QUERY_KEY, (board = []) =>
        patchTask(board, variables.id, (task) => applyUpdate(task, variables)),
      );
      return { previous };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(BOARD_QUERY_KEY, context?.previous);
      toast.error(error.message || errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useTasks({ initialData } = {}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [openMenuId, setOpenMenuId] = useState(null);

  const queryClient = useQueryClient();
  const router = useRouter();
  const query = useBoard({ initialData });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload) => unwrap(createMeetingAction(payload)),
    onSuccess: () => {
      toast.success("Görev oluşturuldu.");
      setOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => unwrap(updateTaskAction(id, data)),
    onSuccess: () => {
      toast.success("Görev güncellendi.");
      invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => unwrap(deleteTaskAction(id)),
    onSuccess: () => {
      toast.success("Görev silindi.");
      invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const statusMutation = useOptimisticTaskMutation(
    ({ id, status }) => unwrap(changeTaskStatusAction(id, status)),
    (task, { status }) => ({ ...task, status, completed: status === "done" }),
    "Görev durumu güncellenemedi.",
  );

  const toggleMutation = useOptimisticTaskMutation(
    ({ id }) => unwrap(toggleTaskCompletionAction(id)),
    (task) => {
      const status = task.status === "done" ? "todo" : "done";
      return { ...task, status, completed: status === "done" };
    },
    "Görev güncellenemedi.",
  );

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    statusMutation.mutate({ id: draggableId, status: destination.droppableId });
  };

  return {
    ...query,
    view,
    setView,
    open,
    setOpen,
    openMenuId,
    setOpenMenuId,
    router,
    handleDragEnd,
    onToggle: (task) => toggleMutation.mutate({ id: task.id }),
    createTask: Object.assign((payload) => createMutation.mutate(payload), {
      isPending: createMutation.isPending,
    }),
    updateTask: updateMutation.mutate,
    updateTaskPending: updateMutation.isPending,
    deletedTask: deleteMutation.mutate,
    updateTaskStatus: statusMutation.mutate,
  };
}

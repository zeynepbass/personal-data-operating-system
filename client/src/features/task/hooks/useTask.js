"use client";

import {
  getTask,
  createTask,
  updateTask,
  deletedTask,
  updateTaskStatus,
  updateTaskCompleted,
  getUsers,
  getBell
} from "../repositories/task.repository";

import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useTasks() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [openMenuId, setOpenMenuId] = useState(null);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: getTask,
  });

  const usersQuery = useQuery({
    queryKey: ["meeting-users"],
    queryFn: getUsers,
  });
const bellQuery=useQuery({
  queryKey:["bell"],
  queryFn:getBell,
});
  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Task başarıyla oluşturuldu."
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setOpen(false);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Task oluşturulamadı."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      updateTask(id, data),

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Task başarıyla güncellendi."
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setOpen(false);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Task güncellenemedi."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) =>
      deletedTask(id),

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Task başarıyla silindi."
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setOpen(false);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Task silinemedi."
      );
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      updateTaskStatus(id, status),

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Task durumu güncellendi."
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Task durumu güncellenemedi."
      );
    },
  });

  const handleDragEnd = (result) => {
    const {
      destination,
      source,
      draggableId,
    } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    statusMutation.mutate({
      id: draggableId,
      status: destination.droppableId,
    });
  };

  const onToggle = async (task) => {
    try {
      await updateTaskCompleted(task.id);
  
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    } catch (error) {
      console.error("Task güncellenemedi:", error);
    }
  };
  return {
    ...query,

    notifications:bellQuery.data ?? [],
    users: usersQuery.data ?? [],
    usersLoading: usersQuery.isLoading,
    usersError: usersQuery.error,

    view,
    setView,

    open,
    setOpen,

    onToggle,

    openMenuId,
    setOpenMenuId,

    handleDragEnd,

    createTask: createMutation.mutate,
    isCreating: createMutation.isPending,

    updateTask: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deletedTask: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    updateTaskStatus: statusMutation.mutate,
    isUpdatingStatus: statusMutation.isPending,
  };
}
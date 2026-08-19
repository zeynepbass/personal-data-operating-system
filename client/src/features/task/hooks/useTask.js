"use client"
import {
  getTask,
  createTask,
  updateTask,
  updateEventDetails,
  deletedTask,
  updateTaskStatus,
  updateTaskCompleted
} from "../repositories/task.repository";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { emptyTaskFilters } from "../utils/taskFilters";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useTasks() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filters, setFilters] = useState(emptyTaskFilters);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: getTask,
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

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }) =>
      updateEventDetails(id, data),

    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Etkinlik başarıyla güncellendi."
      );

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setEditingEvent(null);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Etkinlik güncellenemedi."
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
    mutationFn: ({ id, status }) => {

      return updateTaskStatus(id, status);
    },
  
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
  
    if (!destination) {

      return;
    }
  
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
  const onToggle = async (task, completed) => {
    try {
      await updateTaskCompleted(task.id, {
        completed,
        name: completed ? "done" : task.name,
      });
    } catch (error) {
      console.error("Task güncellenemedi:", error);
    }
  };
  return {
    ...query,

    view,
    setView,
    open,
    setOpen,onToggle,

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

    editingEvent,
    setEditingEvent,
    updateEvent: updateEventMutation.mutate,
    isUpdatingEvent: updateEventMutation.isPending,

    filters,
    setFilters,
  };
}
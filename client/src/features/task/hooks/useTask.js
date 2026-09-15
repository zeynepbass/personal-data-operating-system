"use client";

import * as taskRepository from "../repositories/task.repository";

import { useRouter } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: taskRepository.getTask,
  });

  const usersQuery = useQuery({
    queryKey: ["meeting-users"],
    queryFn: taskRepository.getUsers,
  });

  const bellQuery = useQuery({
    queryKey: ["bell"],
    queryFn: taskRepository.getBell,
  });

  const createMutation = useMutation({
    mutationFn: taskRepository.createTask,

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
      taskRepository.updateTask(id, data),

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
      taskRepository.deletedTask(id),

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
      taskRepository.updateTaskStatus(id, status),

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
      await taskRepository.updateTaskCompleted(task.id);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    } catch (error) {
      console.error("Task güncellenemedi:", error);
    }
  };

  return {
    ...query,

    notifications: bellQuery.data ?? [],

    users: usersQuery.data ?? [],
    usersLoading: usersQuery.isLoading,
    usersError: usersQuery.error,

    isOpen,
    setIsOpen,

    search,
    setSearch,

    view,
    setView,

    open,
    setOpen,

    onToggle,

    openMenuId,
    setOpenMenuId,

    showNotifications,
    setShowNotifications,

    router,

    handleDragEnd,

    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deletedTask: deleteMutation.mutate,
    updateTaskStatus: statusMutation.mutate,
  };
}
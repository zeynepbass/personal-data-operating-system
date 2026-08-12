import {
  getTask,
  createTask,
  updateTask,
  deletedTask,
  updateTaskStatus,
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
    mutationFn: ({ id, status }) => {
      console.log("1️⃣ mutationFn");
      console.log("id:", id);
      console.log("status:", status);
  
      return updateTaskStatus(id, status);
    },
  
    onSuccess: (response) => {
      console.log("2️⃣ status update success");
      console.log("response:", response);
  
      toast.success(
        response.data?.message ||
          "Task durumu güncellendi."
      );
  
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  
    onError: (error) => {
      console.log("❌ status update error");
      console.log("error:", error);
      console.log("response:", error.response?.data);
  
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Task durumu güncellenemedi."
      );
    },
  });

  const handleDragEnd = (result) => {
    console.log("3️⃣ DRAG END");
    console.log("result:", result);
  
    const {
      destination,
      source,
      draggableId,
    } = result;
  
    console.log("draggableId:", draggableId);
    console.log("source:", source);
    console.log("destination:", destination);
  
    if (!destination) {
      console.log("❌ destination yok");
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("ℹ️ Aynı yerde bırakıldı");
      return;
    }
  
    console.log("4️⃣ STATUS DEĞİŞİYOR");
    console.log("task id:", draggableId);
    console.log(
      "yeni status:",
      destination.droppableId
    );
  
    statusMutation.mutate({
      id: draggableId,
      status: destination.droppableId,
    });
  };
const onToggle=()=>{
  
}
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
  };
}
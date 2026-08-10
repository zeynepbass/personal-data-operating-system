import {
  getTask,
  createTask
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
      toast.success(response.data?.message ||
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

  return {
    ...query,

    view,
    setView,

    open,
    setOpen,

    openMenuId,
    setOpenMenuId,

    createTask: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
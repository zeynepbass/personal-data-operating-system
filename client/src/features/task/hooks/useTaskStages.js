import { getAll, postTaskStage, deletedTaskStage } from "../repositories/taskStage.repository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useTaskStages() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["taskStages"], queryFn: getAll });

  const createMutation = useMutation({
    mutationFn: (data) => postTaskStage(data),
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["taskStages"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Aşama oluşturulurken hata oluştu."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletedTaskStage(id),
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["taskStages"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Aşama silinirken hata oluştu."
      );
    },
  });

  return {
    ...query,
    createTaskStage: createMutation.mutate,
    deleteTaskStage: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

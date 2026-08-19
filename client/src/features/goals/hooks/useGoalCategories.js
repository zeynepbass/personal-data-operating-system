import { getAll, postGoalCategory, deletedGoalCategory } from "../repositories/goalCategory.repository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useGoalCategories() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["goalCategories"], queryFn: getAll });

  const createMutation = useMutation({
    mutationFn: (data) => postGoalCategory(data),
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["goalCategories"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Kategori oluşturulurken hata oluştu."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletedGoalCategory(id),
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["goalCategories"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Kategori silinirken hata oluştu."
      );
    },
  });

  return {
    ...query,
    createGoalCategory: createMutation.mutate,
    deleteGoalCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

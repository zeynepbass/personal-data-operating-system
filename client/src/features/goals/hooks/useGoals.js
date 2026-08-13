import { getAll, postGoals,deletedGoals } from "../repositories/goal.repository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export function useGoals() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["goals"], queryFn: getAll });
  const createMutation = useMutation({
    mutationFn: (formData) => postGoals(formData),
    onSuccess: (response) => {
      toast.success(response.message);
  
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Goal oluşturulurken hata oluştu."
      );
    },
  });
  const deleteMutation=useMutation({
    mutationFn:(id)=>deletedGoals(id),
    onSuccess: (response) => {
      toast.success(response.message);
  
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Goal oluşturulurken hata oluştu."
      );
    },
  })
  return {
    ...query,
    createGoals: createMutation.mutate,
    deletedGoals:deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}

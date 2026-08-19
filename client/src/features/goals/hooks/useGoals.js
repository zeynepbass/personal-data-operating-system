import { getAll, postGoals,deletedGoals,updateGoals } from "../repositories/goal.repository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
export function useGoals() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["goals"], queryFn: getAll });
  const createMutation = useMutation({
    mutationFn: (formData) => postGoals(formData),
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Başarıyla oluşturuldu."
      );
  
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hedef oluşturulurken hata oluştu."
      );
    },
  });
  const deleteMutation=useMutation({
    mutationFn:(id)=>deletedGoals(id),
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Başarıyla silindi."
      );
  
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hedef oluşturulurken hata oluştu."
      );
    },
  })

  const [selectedValue, setSelectedValue] = useState(null);

  const updateMutation = useMutation({
    mutationFn: ({id, data }) => {
      

      if (!id) {
        throw new Error("Goal ID bulunamadı.");
      }
  
      return updateGoals(id, data);
    },
  
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Başarıyla güncellendi."
      );

  
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
  
      setSelectedValue(null);
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Hedef oluşturulurken hata oluştu."
      );
    },
  });
  const [openMenu, setOpenMenu] = useState(false);


  return {
    ...query,
    setSelectedValue,
    selectedValue,
    openMenu, setOpenMenu,

    createGoals: createMutation.mutate,
    deletedGoals:deleteMutation.mutate,
    updateGoals:updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    isCreating: createMutation.isPending,
  };
}

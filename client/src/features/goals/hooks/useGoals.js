import * as goalRepository from "../repositories/goal.repository";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useGoals() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const query = useQuery({
    queryKey: ["goals"],
    queryFn: goalRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (formData) => goalRepository.postGoals(formData),

    onSuccess: (response) => {
      toast.success(
        response.data?.message || "Başarıyla oluşturuldu."
      );

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Hedef oluşturulurken hata oluştu."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => goalRepository.deletedGoals(id),

    onSuccess: (response) => {
      toast.success(
        response.data?.message || "Başarıyla silindi."
      );

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Hedef silinirken hata oluştu."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      if (!id) {
        throw new Error("Goal ID bulunamadı.");
      }

      return goalRepository.updateGoals(id, data);
    },

    onSuccess: (response) => {
      toast.success(
        response.data?.message || "Başarıyla güncellendi."
      );

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      setSelectedValue(null);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Hedef güncellenirken hata oluştu."
      );
    },
  });

  return {
    ...query,

    selectedValue,
    setSelectedValue,

    openMenu,
    setOpenMenu,

    router,

    createGoals: createMutation.mutate,
    deletedGoals: deleteMutation.mutate,
    updateGoals: updateMutation.mutate,
  };
}
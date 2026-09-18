"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import * as notesRepository from "../repositories/notes.repository";
import { getErrorMessage } from "@/shared/helpers/error.helper";

export default function useNotes() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notes"],
    queryFn: notesRepository.getNotes,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => notesRepository.deletedNotes(id),

    onSuccess: (response) => {
      toast.success(
        response.data?.message || "Başarıyla silindi."
      );

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Not silinirken hata oluştu."));
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => notesRepository.createdNotes(data),

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Not başarıyla oluşturuldu."
      );

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Not oluşturulurken hata oluştu."));
    },
  });

  return {
    ...query,

    deletedNotes: deleteMutation.mutate,
    createNotes: createMutation.mutate,
  };
}
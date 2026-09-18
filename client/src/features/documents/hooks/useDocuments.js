
import * as documentRepository from "../repositories/document.repository";

import { toast } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";
import { getErrorMessage } from "@/shared/helpers/error.helper";

export function useDocuments() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("new");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["documents"],
    queryFn: documentRepository.getAll,
  });
  const createMutation = useMutation({
    mutationFn: (formData) => documentRepository.createDocument(formData),
  
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Döküman başarıyla oluşturuldu."
      );
  
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Döküman oluşturulurken hata oluştu.")
      );
    },
  });
  const deleteMutation = useMutation({
    mutationFn: documentRepository.deleteDocument,

    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Başarıyla silindi."
      );

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Döküman silinirken hata oluştu.")
      );
    },
  });
  return {
    ...query,
    search,
    setSearch,
    open, setOpen,
    filter,
    setFilter,
    createDocument: createMutation.mutate,

    deleteDocument: deleteMutation.mutate,
  };
}
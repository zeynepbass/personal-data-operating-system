import {
  getAll,
  createDocument,
  deleteDocument
} from "../repositories/document.repository";
import { toast } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

export function useDocuments() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("new");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["documents"],
    queryFn: getAll,
  });
  const createMutation = useMutation({
    mutationFn: (formData) => createDocument(formData),
  
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
        error.response?.data?.message || "Döküman oluşturulurken hata oluştu."
      );
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteDocument,

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

        error.response?.data?.message || "Döküman oluşturulurken hata oluştu."
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
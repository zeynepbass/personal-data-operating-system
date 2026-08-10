import {
  getAll,
  createDocument,
} from "../repository/document.repository";
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
    mutationFn: createDocument,
  
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  
    onError: (error) => {
      toast.error(error.message);
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
    isCreating: createMutation.isPending,
  };
}
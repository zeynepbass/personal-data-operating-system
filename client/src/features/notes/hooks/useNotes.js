"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getNotes
} from "../repositories/notes.repository";

export default function useNotes() {
  const queryClient = useQueryClient();

  // const [view, setView] = useState("list");
  // const [open, setOpen] = useState(false);
  // const [openMenuId, setOpenMenuId] = useState(null);

  // // GET

  // // POST
  // const createMutation = useMutation({
  //   mutationFn: postNote,

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["notes"],
  //     });

  //     setOpen(false);
  //   },
  // });

  const query = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
  // const onClose = () => {
  //   setOpen(false);
  // };

  // const handleMenuClick = (noteId) => {
  //   setOpenMenuId((prev) =>
  //     prev === noteId ? null : noteId
  //   );
  // };
  return {
 ...query
  };
}
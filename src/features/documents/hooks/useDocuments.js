"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import { deleteDocumentAction } from "../actions/document.actions";

async function uploadDocument(formData) {
  const response = await fetch("/api/documents", { method: "POST", body: formData });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error ?? "Belge yüklenemedi.");
  return body;
}

export function useDocuments() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("new");
  const [isPending, startTransition] = useTransition();

  const createDocument = (formData) =>
    startTransition(async () => {
      try {
        await uploadDocument(formData);
        toast.success("Belge yüklendi.");
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error(error.message);
      }
    });

  const deleteDocument = (id) =>
    startTransition(async () => {
      const result = await deleteDocumentAction(id);
      if (result.ok) toast.success("Belge silindi.");
      else toast.error(result.error);
    });

  return {
    search,
    setSearch,
    open,
    setOpen,
    filter,
    setFilter,
    isPending,
    createDocument,
    deleteDocument,
  };
}

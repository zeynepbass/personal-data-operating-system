"use client";

import { useCurrentUser } from "@/features/auth/context/AuthProvider";

import DocumentsHome from "../components/DocumentsHome";
import { useDocuments } from "../hooks/useDocuments";
import filteredData from "../utils/filtered.search";

export default function DocumentsPage({ documents = [] }) {
  const user = useCurrentUser();
  const isAdmin = user?.role === "admin";
  const {
    search,
    setSearch,
    filter,
    setFilter,
    open,
    setOpen,
    isPending,
    createDocument,
    deleteDocument,
  } = useDocuments();

  return (
    <DocumentsHome
      data={filteredData(documents, search, filter)}
      isAdmin={isAdmin}
      createDocument={createDocument}
      isCreating={isPending}
      open={open}
      setOpen={setOpen}
      filteredData={filteredData}
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      handleDelete={deleteDocument}
    />
  );
}

"use client";
import DocumentsHome from "../components/DocumentsHome";
import { useDocuments } from "../hooks/useDocuments";
import filteredData from "../utils/filtered.search";
import {useAuthStore} from "@/shared/store/auth.store"
export default function DocumentsPage() {
  const user=useAuthStore();
  const isAdmin=user?.role==="admin"
  const {
    data,
    isLoading,
    isError,
    error,
    search,
    deleteDocument,
    setSearch,
    filter,
    open, setOpen,
    setFilter,
    createDocument,
    isCreating
  } = useDocuments();
  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (isError) {
    return <div>Bir hata oluştu: {error.message}</div>;
  }

const filteredDocuments=filteredData(data,search,filter)
const handleDelete = (id) => {
  deleteDocument(id);
};


  return (
    <DocumentsHome
    data={filteredDocuments}
    isAdmin={isAdmin}
    createDocument={createDocument}
    isCreating={isCreating}
    open={open}
    setOpen={setOpen}
    filteredData={filteredData}
    search={search}
    setSearch={setSearch}
filter={filter}
setFilter={setFilter}
handleDelete={handleDelete}
    />
  );
}

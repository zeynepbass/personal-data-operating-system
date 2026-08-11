"use client";
import DocumentsHome from "../components/DocumentsHome";
import { useDocuments } from "../hooks/useDocuments";
import filteredData from "../utils/filtered.search";
export default function DocumentsPage() {
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
  console.log("data",data)
const filteredDocuments=filteredData(data,search,filter)
const handleDelete = (id) => {
  deleteDocument(id);
};


  return (
    <DocumentsHome
    data={filteredDocuments}
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

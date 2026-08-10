"use client";
import DocumentsHome from "../components/DocumentsHome";
import { useDocuments } from "../hooks/useDocuments";
import filteredData from "../utils/filtered.search";
export default function DocumentsPage() {
  const {data, isLoading,isError,error,search,setSearch,filter,setFilter } =
  useDocuments();
  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (isError) {
    return <div>Bir hata oluştu: {error.message}</div>;
  }
const filteredDocuments=filteredData(data,search,filter)

  return (
    <DocumentsHome
    data={filteredDocuments}
    filteredData={filteredData}
    search={search}
    setSearch={setSearch}
filter={filter}
setFilter={setFilter}
    />
  );
}

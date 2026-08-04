"use client";
import DocumentsHome from "../components/DocumentsHome";
import { useFeed } from "@/features/dashboard/hooks/useDocument";
export default function DocumentsPage() {
  const { documents, open, setOpen, form, handleChange, onSubmit, onClose } =
    useFeed();
  return (
    <DocumentsHome
      data={documents}
      open={open}
      setOpen={setOpen}
      form={form}
      handleChange={handleChange}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

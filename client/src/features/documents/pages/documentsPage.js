"use client";
import Document from "../components/Document";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function Documents() {
  const { documents, open, setOpen, form, handleChange, onSubmit, onClose } =
    useFeed();
  return (
    <Document
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

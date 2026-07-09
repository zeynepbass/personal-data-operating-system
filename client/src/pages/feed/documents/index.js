"use client";
import { Field } from "@/components/organisms";
import { useFeed } from "@/features/hooks/feed/useFeed";
export default function Documents() {
  const { documents, open, setOpen, form, handleChange, onSubmit, onClose } =
    useFeed();
  return (
    <Field
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

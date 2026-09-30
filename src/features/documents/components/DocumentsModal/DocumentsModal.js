"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Select } from "@/shared/components/atoms";
import { Modal } from "@/shared/components/organisms";
import { DOCUMENT_MAX_BYTES, documentMetaSchema } from "@/shared/schemas/document";

const COLORS = [
  { value: "red", label: "Kırmızı" },
  { value: "blue", label: "Mavi" },
  { value: "green", label: "Yeşil" },
  { value: "orange", label: "Turuncu" },
  { value: "purple", label: "Mor" },
  { value: "gray", label: "Gri" },
];

const documentFormSchema = documentMetaSchema.extend({
  pdf: z
    .custom((files) => files?.length === 1, "Lütfen bir PDF dosyası seçin.")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Sadece PDF dosyası yükleyebilirsiniz.",
    )
    .refine((files) => files?.[0]?.size <= DOCUMENT_MAX_BYTES, "Dosya en fazla 10 MB olabilir."),
});

function DocumentForm({ isAdmin, isCreating, onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(documentFormSchema),
    defaultValues: { name: "", type: "pdf", color: "", shared: "false" },
  });
  const { register, formState, control } = form;
  const { errors } = formState;
  const selectedFile = useWatch({ control, name: "pdf" })?.[0];

  const submit = form.handleSubmit((values) => {
    const data = new FormData();
    data.set("name", values.name);
    data.set("type", values.type);
    data.set("color", values.color);
    data.set("shared", String(values.shared));
    data.set("pdf", values.pdf[0]);
    onSubmit(data);
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <Input
        text="Belge adı"
        required
        placeholder="Örn. System Design"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select
          text="Belge türü"
          options={[{ value: "pdf", label: "PDF" }]}
          error={errors.type?.message}
          {...register("type")}
        />
        <Select text="Renk" placeholder="Renk seçin" options={COLORS} {...register("color")} />
      </div>

      {isAdmin && (
        <Select
          text="Paylaşım"
          options={[
            { value: "false", label: "Özel" },
            { value: "true", label: "Herkesle paylaş" },
          ]}
          {...register("shared")}
        />
      )}

      <div>
        <Input
          text="PDF dosyası"
          type="file"
          accept="application/pdf,.pdf"
          required
          error={errors.pdf?.message}
          className="w-full rounded-xl border border-dashed border-gray-300 p-4 text-gray-500"
          {...register("pdf")}
        />
        {selectedFile && (
          <p className="mt-3 text-sm text-gray-500">
            Seçilen dosya: <span className="font-medium text-gray-700">{selectedFile.name}</span>
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
        <Button
          type="button"
          text="İptal"
          variant="outline"
          onClick={onCancel}
          disabled={isCreating}
          className="rounded-xl px-6 py-3"
        />
        <Button
          type="submit"
          disabled={isCreating}
          text={isCreating ? "Yükleniyor..." : "Belgeyi yükle"}
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>
  );
}

export default function DocumentsModal({ open, setOpen, isCreating, isAdmin, onSubmit }) {
  const close = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={close}
      busy={isCreating}
      size="lg"
      title="Yeni belge"
      description="PDF belgenizi güvenli şekilde yükleyin."
    >
      <DocumentForm
        isAdmin={isAdmin}
        isCreating={isCreating}
        onSubmit={onSubmit}
        onCancel={close}
      />
    </Modal>
  );
}

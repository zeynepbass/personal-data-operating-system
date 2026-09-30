"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button, Input, Textarea } from "@/shared/components/atoms";
import { Modal } from "@/shared/components/organisms";
import {
  emptyNoteSection,
  noteFormSchema,
  toNoteFormValues,
  toNotePayload,
} from "@/shared/schemas/note";

import NoteSectionFields from "./NoteSectionFields";

function NoteForm({ note, onSubmit, onCancel, isSaving }) {
  const form = useForm({
    resolver: zodResolver(noteFormSchema),
    defaultValues: toNoteFormValues(note),
  });
  const { control, register, formState } = form;
  const { errors } = formState;
  const sections = useFieldArray({ control, name: "sections", keyName: "fieldKey" });

  const submit = form.handleSubmit((values) => onSubmit(toNotePayload(values), form));

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <fieldset className="space-y-5 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <legend className="px-1 font-semibold text-gray-800">Not bilgileri</legend>

        <Input
          text="Başlık"
          required
          placeholder="Örn. useMemo Nedir?"
          error={errors.title?.message}
          {...register("title")}
        />

        <Textarea
          label="Açıklama"
          name="description"
          required
          placeholder="Örn. React'te performans optimizasyonu için kullanılan Hook."
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            text="Kategori"
            required
            placeholder="Örn. React"
            error={errors.category?.message}
            {...register("category")}
          />
          <Input
            text="Alt kategori"
            required
            placeholder="Örn. Performance"
            error={errors.subCategory?.message}
            {...register("subCategory")}
          />
        </div>
      </fieldset>

      <section
        aria-labelledby="note-sections-title"
        className="rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <h3 id="note-sections-title" className="font-semibold text-gray-800">
            Bölümler
          </h3>
          <Button
            type="button"
            text="+ Bölüm ekle"
            onClick={() => sections.append(emptyNoteSection())}
            className="rounded-xl px-4 py-2 text-sm"
          />
        </div>

        <div className="mt-5 space-y-6">
          {sections.fields.length === 0 && (
            <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              Henüz bölüm eklenmedi.
            </p>
          )}

          {sections.fields.map((field, index) => (
            <NoteSectionFields
              key={field.fieldKey}
              control={control}
              register={register}
              index={index}
              errors={errors}
              onRemove={() => sections.remove(index)}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
        <Button
          type="button"
          text="İptal"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={isSaving}
          text={isSaving ? "Kaydediliyor..." : note ? "Değişiklikleri kaydet" : "Notu oluştur"}
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>
  );
}

export default function NotesModal({ open, onClose, note = null, onSubmit, isSaving }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      busy={isSaving}
      size="xl"
      title={note ? "Notu düzenle" : "Yeni not oluştur"}
      description={
        note ? "Not içeriğini güncelleyin." : "Yeni bir not ve içerik bölümleri oluşturun."
      }
    >
      <NoteForm
        key={note?.id ?? "new"}
        note={note}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSaving={isSaving}
      />
    </Modal>
  );
}

"use client";

import { useFieldArray, useWatch } from "react-hook-form";

import { Input, Select, Textarea } from "@/shared/components/atoms";

const SECTION_TYPES = [
  { value: "text", label: "Metin" },
  { value: "code", label: "Kod" },
  { value: "list", label: "Liste" },
  { value: "quote", label: "Alıntı" },
];

function ListItems({ control, register, index, errors }) {
  const { fields, append, remove } = useFieldArray({ control, name: `sections.${index}.items` });

  return (
    <fieldset className="space-y-3">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-medium text-gray-700">Liste maddeleri</legend>
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          + Madde ekle
        </button>
      </div>

      {fields.map((field, itemIndex) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <Input
              aria-label={`Madde ${itemIndex + 1}`}
              placeholder="Liste maddesi"
              error={errors?.items?.[itemIndex]?.value?.message}
              {...register(`sections.${index}.items.${itemIndex}.value`)}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(itemIndex)}
            aria-label={`Madde ${itemIndex + 1} sil`}
            className="mt-1 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50"
          >
            ✕
          </button>
        </div>
      ))}
    </fieldset>
  );
}

export default function NoteSectionFields({ control, register, index, errors, onRemove }) {
  const type = useWatch({ control, name: `sections.${index}.type` });
  const sectionErrors = errors?.sections?.[index];

  return (
    <fieldset className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5 flex items-center justify-between">
        <legend className="font-semibold text-gray-800">Bölüm {index + 1}</legend>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Bölüm ${index + 1} sil`}
          className="rounded-lg px-3 py-1 text-sm text-red-500 hover:bg-red-50"
        >
          Sil
        </button>
      </div>

      <div className="space-y-5">
        <Input
          text="Bölüm başlığı"
          placeholder="Örn. Neden useMemo Kullanılır?"
          error={sectionErrors?.title?.message}
          {...register(`sections.${index}.title`)}
        />

        <Select text="Bölüm tipi" options={SECTION_TYPES} {...register(`sections.${index}.type`)} />

        {type === "code" && (
          <Input
            text="Programlama dili"
            placeholder="Örn. javascript"
            {...register(`sections.${index}.language`)}
          />
        )}

        {type === "list" ? (
          <ListItems control={control} register={register} index={index} errors={sectionErrors} />
        ) : (
          <Textarea
            label={type === "code" ? "Kod" : "İçerik"}
            name={`sections.${index}.content`}
            placeholder={
              type === "code" ? "const value = useMemo(...)" : "Bölüm içeriğini yazın..."
            }
            error={sectionErrors?.content?.message}
            {...register(`sections.${index}.content`)}
          />
        )}
      </div>
    </fieldset>
  );
}

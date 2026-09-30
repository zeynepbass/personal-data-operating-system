import { Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { Button, Input } from "@/shared/components/atoms";

export function GoalFormItems({ form }) {
  const { control, register, formState } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const errors = formState.errors.items;

  return (
    <fieldset className="p-4">
      <legend className="sr-only">Hedef adımları</legend>
      <div className="mb-4 flex items-center justify-between">
        <p aria-hidden="true" className="text-sm font-semibold text-gray-700">
          Hedef adımları
        </p>
        <Button
          type="button"
          text="+ Ekle"
          variant="secondary"
          onClick={() => append({ title: "", value: 0 })}
          className="rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {errors?.root?.message && (
        <p role="alert" className="mb-3 text-xs text-red-500">
          {errors.root.message}
        </p>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 rounded-xl border border-gray-200 p-3">
            <div className="w-full">
              <Input
                aria-label={`Adım ${index + 1}`}
                placeholder="Hedef adımı"
                error={errors?.[index]?.title?.message}
                {...register(`items.${index}.title`)}
              />
            </div>
            <Input
              type="number"
              min="0"
              max="100"
              aria-label={`Adım ${index + 1} değeri`}
              placeholder="Değer"
              className="w-28"
              error={errors?.[index]?.value?.message}
              {...register(`items.${index}.value`, { valueAsNumber: true })}
            />
            <button
              type="button"
              aria-label={`Adım ${index + 1} sil`}
              onClick={() => remove(index)}
              className="flex items-center rounded-lg px-2 hover:bg-gray-100"
            >
              <Trash width="20" height="20" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

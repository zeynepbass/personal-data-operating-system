import { Input, Select } from "@/shared/components/atoms";

export const GOAL_CATEGORIES = [
  { value: "2026-goals", label: "2026 Hedefleri" },
  { value: "personal-goals", label: "Kişisel Hedefler" },
  { value: "2027-goals", label: "2027 Hedefleri" },
  { value: "work-goals", label: "İş Hedefleri" },
];

export function GoalFormBasic({ form }) {
  const { register, formState } = form;

  return (
    <fieldset className="p-4">
      <legend className="mb-4 text-sm font-semibold text-gray-700">Hedef bilgileri</legend>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Başlık"
          placeholder="Başlık"
          required
          error={formState.errors.title?.message}
          {...register("title")}
        />
        <Select
          label="Kategori"
          placeholder="Kategori seç"
          required
          options={GOAL_CATEGORIES}
          error={formState.errors.category?.message}
          {...register("category")}
        />
      </div>
    </fieldset>
  );
}

import { Input, Select, Textarea } from "@/shared/components/atoms";

const PRIORITY_OPTIONS = [
  { value: "low", label: "Düşük" },
  { value: "medium", label: "Orta" },
  { value: "high", label: "Yüksek" },
  { value: "critical", label: "Kritik" },
];

export default function TaskFields({ register, errors, users }) {
  return (
    <fieldset className="space-y-5 rounded-xl border border-gray-200 p-6">
      <legend className="px-1 font-semibold text-gray-800">Görev</legend>

      <Input
        text="Görev başlığı"
        required
        placeholder="Örn. Authentication ekranı tasarlanacak"
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        label="Görev açıklaması"
        name="description"
        placeholder="Örn. Login ve Register sayfalarının UI geliştirmesi."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select
          text="Atanacak kullanıcı"
          required
          placeholder="Kullanıcı seçin"
          options={users.map((user) => ({
            value: user.email,
            label: `${user.fullName} (${user.email})`,
          }))}
          error={errors.assignee?.message}
          {...register("assignee")}
        />
        <Select
          text="Öncelik"
          options={PRIORITY_OPTIONS}
          error={errors.priority?.message}
          {...register("priority")}
        />
        <Input text="Etiket" placeholder="Örn. Frontend" {...register("label")} />
        <Input text="Görev tarihi" type="date" error={errors.date?.message} {...register("date")} />
        <Input
          text="Başlangıç tarihi"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />
        <Input
          text="Son teslim tarihi"
          type="date"
          error={errors.dueDate?.message}
          {...register("dueDate")}
        />
        <Input
          text="Tahmini süre (saat)"
          type="number"
          min="0"
          placeholder="Örn. 8"
          error={errors.estimatedHours?.message}
          {...register("estimatedHours")}
        />
        <Input
          text="Story point"
          type="number"
          min="0"
          placeholder="Örn. 5"
          error={errors.storyPoints?.message}
          {...register("storyPoints")}
        />
      </div>
    </fieldset>
  );
}

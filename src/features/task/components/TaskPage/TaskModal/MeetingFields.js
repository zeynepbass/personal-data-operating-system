import { Input, Select, Textarea } from "@/shared/components/atoms";

const STATUS_OPTIONS = [
  { value: "todo", label: "Yapılacak" },
  { value: "in-progress", label: "Devam ediyor" },
  { value: "done", label: "Tamamlandı" },
];

export default function MeetingFields({ register, errors }) {
  return (
    <fieldset className="space-y-5 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <legend className="px-1 font-semibold text-gray-800">Toplantı bilgileri</legend>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          text="Toplantı başlığı"
          required
          placeholder="Örn. Sprint planlama"
          error={errors.meetingTitle?.message}
          {...register("meetingTitle")}
        />
        <Select
          text="Başlangıç durumu"
          options={STATUS_OPTIONS}
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          text="Toplantı saati"
          type="time"
          error={errors.meeting?.message}
          {...register("meeting")}
        />
        <Input
          text="Toplantı tarihi"
          type="date"
          error={errors.meetingCalendar?.message}
          {...register("meetingCalendar")}
        />
      </div>

      <Textarea
        label="Toplantı detayı"
        name="meetingDetails"
        placeholder="Örn. Team Lead daily"
        error={errors.meetingDetails?.message}
        {...register("meetingDetails")}
      />
    </fieldset>
  );
}

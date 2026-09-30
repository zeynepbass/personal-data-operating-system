import { z } from "zod";

export const TASK_STATUSES = ["todo", "in-progress", "done"];
export const TASK_PRIORITIES = ["low", "medium", "high", "critical"];

const optionalText = (max) => z.string().trim().max(max).optional().default("");

const optionalDate = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.coerce.date({ error: "Geçerli bir tarih girin." }).nullable(),
);

const nonNegativeNumber = (label) =>
  z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? 0 : value),
    z.coerce
      .number({ error: `${label} sayı olmalıdır.` })
      .min(0, `${label} negatif olamaz.`)
      .max(10_000, `${label} çok büyük.`),
  );

export const taskFieldsSchema = z.object({
  title: z
    .string({ error: "Görev başlığı gereklidir." })
    .trim()
    .min(1, "Görev başlığı gereklidir.")
    .max(200, "Görev başlığı en fazla 200 karakter olabilir."),
  description: optionalText(5_000),
  label: optionalText(60),
  priority: z.preprocess(
    (value) => (value === "" || value == null ? "medium" : String(value).toLowerCase()),
    z.enum(TASK_PRIORITIES, { error: "Geçersiz öncelik." }),
  ),
  date: optionalDate,
  startDate: optionalDate,
  dueDate: optionalDate,
  estimatedHours: nonNegativeNumber("Tahmini süre"),
  storyPoints: nonNegativeNumber("Story point"),
});

const withDateOrder = (schema) =>
  schema.refine((data) => !data.startDate || !data.dueDate || data.startDate <= data.dueDate, {
    message: "Bitiş tarihi başlangıç tarihinden önce olamaz.",
    path: ["dueDate"],
  });

export const taskStatusSchema = z.enum(TASK_STATUSES, { error: "Geçersiz görev durumu." });

export const createMeetingSchema = z.object({
  title: z
    .string({ error: "Toplantı başlığı gereklidir." })
    .trim()
    .min(1, "Toplantı başlığı gereklidir.")
    .max(200),
  name: taskStatusSchema.default("todo"),
  meeting: optionalText(500),
  meetingDetails: optionalText(5_000),
  meetingCalendar: optionalDate,
  tasks: z
    .array(
      withDateOrder(
        taskFieldsSchema.extend({
          assignee: z
            .string({ error: "Her görev için kullanıcı seçilmelidir." })
            .trim()
            .pipe(z.email("Her görev için kullanıcı seçilmelidir.")),
        }),
      ),
    )
    .min(1, "En az bir görev oluşturmalısınız.")
    .max(20),
});

export const meetingFormSchema = withDateOrder(
  taskFieldsSchema.extend({
    meetingTitle: createMeetingSchema.shape.title,
    name: createMeetingSchema.shape.name,
    meeting: createMeetingSchema.shape.meeting,
    meetingCalendar: createMeetingSchema.shape.meetingCalendar,
    meetingDetails: createMeetingSchema.shape.meetingDetails,
    assignee: z
      .string({ error: "Kullanıcı seçmelisiniz." })
      .trim()
      .pipe(z.email("Kullanıcı seçmelisiniz.")),
  }),
);

export const MEETING_FORM_DEFAULTS = {
  meetingTitle: "",
  name: "todo",
  meeting: "",
  meetingCalendar: "",
  meetingDetails: "",
  title: "",
  description: "",
  assignee: "",
  label: "",
  priority: "medium",
  date: "",
  startDate: "",
  dueDate: "",
  estimatedHours: "",
  storyPoints: "",
};

/**
 * @param {z.output<typeof meetingFormSchema>} values
 */
export function toMeetingPayload(values) {
  const { meetingTitle, name, meeting, meetingCalendar, meetingDetails, ...task } = values;
  return { title: meetingTitle, name, meeting, meetingCalendar, meetingDetails, tasks: [task] };
}

export const updateTaskSchema = withDateOrder(
  taskFieldsSchema.extend({
    spentHours: nonNegativeNumber("Harcanan süre"),
    progress: z.preprocess(
      (value) => (value === "" || value == null ? 0 : value),
      z.coerce.number().min(0).max(100),
    ),
  }),
);

export const analyticsRangeSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((range) => range.from <= range.to, { message: "Geçersiz tarih aralığı.", path: ["to"] });

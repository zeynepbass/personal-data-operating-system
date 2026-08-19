
"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Heading,
  Select,
  Textarea,
} from "@/shared/components/atoms";
import { useTaskStages } from "../../../hooks/useTaskStages";

const initialForm = {
  type: "task",
  status: "",

  meeting: "",
  meetingCalendar: "",
  meetingDetails: "",

  taskTitle: "",
  description: "",
  label: "",
  priority: "",
  date: "",
  startDate: "",
  dueDate: "",
  estimatedHours: "",
  storyPoints: "",
};

export default function TaskModal({
  open,
  setOpen,
  onSubmit,
  isCreating,
}) {
  const [form, setForm] = useState(initialForm);
  const { data: stages = [] } = useTaskStages();

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCreating) return;

    const selectedStage = stages.find(
      (stage) => stage.name === form.status
    );

    const isEvent = form.type === "event";

    const payload = {
      name: selectedStage?.name,
      title: selectedStage?.title,
      color: selectedStage?.color ?? "purple",

      meeting: isEvent ? form.meeting.trim() : "",
      meetingCalendar: isEvent
        ? form.meetingCalendar || null
        : null,
      meetingDetails: isEvent
        ? form.meetingDetails.trim()
        : "",

      tasks: isEvent
        ? []
        : [
            {
              title: form.taskTitle.trim(),
              description: form.description.trim(),
              label: form.label.trim(),
              priority: form.priority,
              date: form.date || null,
              startDate: form.startDate || null,
              dueDate: form.dueDate || null,
              estimatedHours: Number(form.estimatedHours) || 0,
              storyPoints: Number(form.storyPoints) || 0,
            },
          ],
    };

    onSubmit(payload);
  };

  const handleClose = () => {
    if (isCreating) return;

    setForm(initialForm);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a22] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Yeni Görev
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Yeni bir görev veya etkinlik oluşturun.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>


        <div className="scrollbar-thin max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6">
              <Heading title="Görev Tipi ve Durum" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                    Görev Tipi
                  </label>

                  <div className="flex w-full rounded-xl bg-gray-100 dark:bg-white/5 p-1 gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, type: "task" }))
                      }
                      text="Görev"
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                        form.type === "task"
                          ? "bg-white dark:bg-[#2a2a38] text-[#555A8A] dark:text-[#a5a1e8] shadow-sm"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, type: "event" }))
                      }
                      text="Etkinlik"
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                        form.type === "event"
                          ? "bg-white dark:bg-[#2a2a38] text-[#555A8A] dark:text-[#a5a1e8] shadow-sm"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </div>
                </div>

                <Select
                  text="Durum"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  placeholder="Durum seçin"
                  required
                  options={stages.map((stage) => ({
                    value: stage.name,
                    label: stage.title,
                  }))}
                />
              </div>
            </div>

            {form.type === "event" ? (
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                <Heading title="Meeting Bilgileri" />

                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Input
                      text="Meeting Saati"
                      name="meeting"
                      type="time"
                      value={form.meeting}
                      onChange={handleChange}
                      placeholder="Örn. 10:00"
                      required
                    />

                    <Input
                      text="Meeting Tarihi"
                      name="meetingCalendar"
                      type="date"
                      value={form.meetingCalendar}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Textarea
                    label="Meeting Detayı"
                    name="meetingDetails"
                    value={form.meetingDetails}
                    onChange={handleChange}
                    placeholder="Örn. Team Lead daily"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                <Heading title="Görev Bilgileri" />

                <div className="mt-5 space-y-5">
                  <Input
                    text="Görev Başlığı"
                    name="taskTitle"
                    value={form.taskTitle}
                    onChange={handleChange}
                    type="text"
                    placeholder="Örn. Authentication ekranı tasarlanacak"
                    required
                  />

                  <Textarea
                    label="Görev Açıklaması"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Örn. Login ve Register sayfalarının UI geliştirmesi."
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                    <Input
                      text="Etiket"
                      type="text"
                      name="label"
                      value={form.label}
                      onChange={handleChange}
                      placeholder="Örn. Frontend"
                    />

                    <Select
                      text="Öncelik"
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      placeholder="Görev önceliğini seçin"
                      options={[
                        {
                          value: "Low",
                          label: "🟢 Low",
                        },
                        {
                          value: "Medium",
                          label: "🟡 Medium",
                        },
                        {
                          value: "High",
                          label: "🔴 High",
                        },
                      ]}
                    />

                    <Input
                      text="Görev Tarihi"
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />

                    <Input
                      text="Başlangıç Tarihi"
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                    />

                    <Input
                      text="Son Teslim Tarihi"
                      type="date"
                      name="dueDate"
                      value={form.dueDate}
                      onChange={handleChange}
                    />

                    <Input
                      text="Tahmini Süre (Saat)"
                      type="number"
                      name="estimatedHours"
                      value={form.estimatedHours}
                      onChange={handleChange}
                      placeholder="Örn. 8"
                      min="0"
                    />

                    <Input
                      text="Story Point"
                      type="number"
                      name="storyPoints"
                      value={form.storyPoints}
                      onChange={handleChange}
                      placeholder="Örn. 5"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}


            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                text="İptal"
                onClick={handleClose}
                disabled={isCreating}
                className="rounded-xl px-6 py-3 hover:border-[rgb(125,120,206)] disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Button
                type="submit"
                disabled={
                  isCreating ||
                  !form.status ||
                  (form.type === "event"
                    ? !form.meeting || !form.meetingCalendar
                    : !form.taskTitle.trim())
                }
                text={
                  isCreating
                    ? "Oluşturuluyor..."
                    : "Görevi Oluştur"
                }
                className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

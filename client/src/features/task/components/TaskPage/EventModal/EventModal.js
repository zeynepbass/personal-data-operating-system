"use client";

import { useState } from "react";
import { Button, Input, Heading, Textarea } from "@/shared/components/atoms";
import { isPastDateTime } from "@/shared/helpers/format.helper";

export default function EventModal({ event, onClose, onSubmit, isUpdating }) {
  const [form, setForm] = useState({
    meeting: event?.meeting || "",
    meetingCalendar: event?.meetingCalendar || "",
    meetingDetails: event?.meetingDetails || "",
    meetingNotes: event?.meetingNotes || "",
  });

  if (!event) return null;

  const isPast = isPastDateTime(form.meetingCalendar, form.meeting);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdating) return;

    onSubmit(
      {
        id: event.id,
        data: {
          meeting: form.meeting,
          meetingCalendar: form.meetingCalendar || null,
          meetingDetails: form.meetingDetails.trim(),
          meetingNotes: form.meetingNotes.trim(),
        },
      }
    );
  };

  const handleClose = () => {
    if (isUpdating) return;

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a22] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Etkinliği Düzenle
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Etkinlik bilgilerini güncelleyin.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUpdating}
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        <div className="scrollbar-thin max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6">
              <Heading title="Meeting Bilgileri" />

              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    text="Meeting Saati"
                    name="meeting"
                    type="time"
                    value={form.meeting}
                    onChange={handleChange}
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

            {isPast && (
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                <Heading title="Toplantı Notları" />

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Bu toplantının zamanı geçti. Toplantıda konuşulanları not alabilirsiniz.
                </p>

                <div className="mt-5">
                  <Textarea
                    name="meetingNotes"
                    value={form.meetingNotes}
                    onChange={handleChange}
                    placeholder="Toplantı notlarınızı buraya yazın..."
                    rows={6}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                text="Vazgeç"
                onClick={handleClose}
                disabled={isUpdating}
                className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Button
                type="submit"
                disabled={isUpdating}
                text={isUpdating ? "Kaydediliyor..." : "Kaydet"}
                className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

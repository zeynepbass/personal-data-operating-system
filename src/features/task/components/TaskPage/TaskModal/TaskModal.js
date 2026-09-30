"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/atoms";
import { Modal } from "@/shared/components/organisms/Modal";
import { MEETING_FORM_DEFAULTS, meetingFormSchema, toMeetingPayload } from "@/shared/schemas/task";

import MeetingFields from "./MeetingFields";
import TaskFields from "./TaskFields";

function MeetingForm({ users, onSubmit, onCancel, isCreating }) {
  const form = useForm({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: MEETING_FORM_DEFAULTS,
  });
  const { errors } = form.formState;

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit((values) => onSubmit(toMeetingPayload(values), form))}
    >
      <MeetingFields register={form.register} errors={errors} />
      <TaskFields register={form.register} errors={errors} users={users} />

      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
        <Button
          type="button"
          text="İptal"
          variant="outline"
          onClick={onCancel}
          disabled={isCreating}
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={isCreating}
          text={isCreating ? "Oluşturuluyor..." : "Toplantı ve görevi oluştur"}
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>
  );
}

export default function TaskModal({ open, setOpen, onSubmit, isCreating, users = [] }) {
  const close = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={close}
      busy={isCreating}
      size="lg"
      title="Yeni görev"
      description="Bir toplantı oluşturun ve ilk görevi bir kullanıcıya atayın."
    >
      <MeetingForm users={users} onSubmit={onSubmit} onCancel={close} isCreating={isCreating} />
    </Modal>
  );
}

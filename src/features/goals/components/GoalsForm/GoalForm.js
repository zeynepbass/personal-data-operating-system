"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/atoms";
import { goalSchema } from "@/shared/schemas/goal";

import { GoalFormBasic } from "./GoalFormBasic";
import { GoalFormItems } from "./GoalFormItems";

export function GoalForm({ onSubmit, isCreating }) {
  const form = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: { title: "", category: "", items: [] },
  });

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white">
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
        noValidate
        className="space-y-4 p-5"
      >
        <GoalFormBasic form={form} />
        <GoalFormItems form={form} />

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={isCreating}
            text={isCreating ? "Oluşturuluyor..." : "Hedef Oluştur"}
            className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </form>
    </div>
  );
}

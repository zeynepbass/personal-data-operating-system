"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/shared/components/atoms";


export function TaskDetailHeader({ task,router }) {

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-sm"
          text={
            <>
              <ArrowLeft width={16} height={16} />
              Geri dön
            </>
          }
        />

        <h1 className="text-2xl font-semibold text-gray-900">Task Detayı</h1>

        <p className="mt-1 text-sm text-gray-500">
          Task bilgilerini görüntüle ve düzenle.
        </p>
      </div>

      <Button
        type="button"
        onClick={() => router.push(`/tasks/edit/${task.id}`)}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
        text={
          <>
            <Pencil width={16} height={16} /> Düzenle
          </>
        }
      />
    </div>
  );
}

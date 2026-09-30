"use client";

import { useEffect } from "react";

import { Button } from "@/shared/components/atoms";

export default function AppError({ error, reset }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm"
    >
      <h1 className="text-xl font-semibold text-gray-900">Bir şeyler ters gitti</h1>
      <p className="mt-2 text-sm text-gray-500">
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar deneyebilirsiniz.
      </p>
      {error?.digest && <p className="mt-2 font-mono text-xs text-gray-400">Kod: {error.digest}</p>}
      <Button className="mt-6 px-6" text="Tekrar dene" onClick={() => reset()} />
    </div>
  );
}

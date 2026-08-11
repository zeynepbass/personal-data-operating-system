"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Heading,
} from "@/shared/components/atoms";

export function NotFound({
  title,
  description,
  linkText,
  buttonText,
  route,
}) {
  const router = useRouter();

  return (
    <div className="py-10 text-center">
      <p className="text-2xl font-medium text-slate-400">
        {title}!
      </p>

      <Heading
        title={description}
        className="mt-2 text-3xl font-semibold text-gray-600"
      />

      <p className="mt-2 text-sm text-slate-500">
        {linkText}
      </p>

      <div className="mt-5">
        <Button
          type="button"
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-white transition"
          onClick={() => router.push(route)}
          text={buttonText}
        />
      </div>
    </div>
  );
}
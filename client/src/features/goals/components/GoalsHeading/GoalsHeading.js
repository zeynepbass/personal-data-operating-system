"use client";
import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";

export default function TaskHeading({router}) {

  return (
    <header  className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
        <PageHeader title="Hedefler" description="Kariyer hedeflerinizi yönetin" />

      <Button
        text="+ Yeni Hedef"
        onClick={() => router.push("/goals/add")}
        className="w-full md:w-auto hover:text-white text-gray-50"
      />{" "}
    </header>
  );
}

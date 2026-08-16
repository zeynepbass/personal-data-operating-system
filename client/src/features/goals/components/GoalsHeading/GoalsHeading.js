"use client";
import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
import { useRouter } from "next/navigation";
export default function TaskHeading() {
  const router = useRouter();
  return (
    <header  className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
        <PageHeader title="Kariyer" description="Kariyer hedeflerinizi yönetin" />

      <Button
        text="+ Yeni Hedef"
        onClick={() => router.push("/goals/add")}
        className="w-full md:w-auto hover:text-white text-gray-50"
      />{" "}
    </header>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
import { useRouter } from "next/navigation";
import GoalCategoriesModal from "../GoalCategoriesModal";

export default function TaskHeading() {
  const router = useRouter();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header  className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
        <PageHeader title="Hedefler" description="Kariyer hedeflerinizi yönetin" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          text="Hedef Kategorileri"
          onClick={() => setCategoriesOpen(true)}
          className="w-full sm:w-auto"
        />

        <Button
          text="+ Yeni Hedef"
          onClick={() => router.push("/goals/add")}
          className="w-full sm:w-auto hover:text-white text-gray-50"
        />
      </div>

      <GoalCategoriesModal open={categoriesOpen} setOpen={setCategoriesOpen} />
    </header>
  );
}

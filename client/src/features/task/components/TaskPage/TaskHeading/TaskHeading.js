"use client";

import { useState } from "react";
import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
import TaskStagesModal from "../TaskStagesModal";

export default function TaskHeading({ title, description, setOpen }) {
  const [stagesOpen, setStagesOpen] = useState(false);

  return (
    <header className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
      <PageHeader title={title} description={description} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          text="Görev Aşamaları"
          onClick={() => setStagesOpen(true)}
          className="w-full sm:w-auto"
        />

        <Button
          text="+ Yeni Görev"
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto hover:text-white text-gray-50"
        />
      </div>

      <TaskStagesModal open={stagesOpen} setOpen={setStagesOpen} />
    </header>
  );
}

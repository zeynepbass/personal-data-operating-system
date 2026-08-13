"use client";

import { useMemo, useState } from "react";
import GoalsCard from "../GoalsCard";
import GoalsHeading from "../GoalsHeading";
import { Button } from "@/shared/components/atoms";
import { useGoals } from "../../hooks/useGoals";
const tabs = [
  {
    text: "Tümü",
    value: "all",
  },
  {
    text: "Aktif",
    value: "active",
  },
  {
    text: "Tamamlanan",
    value: "completed",
  },
];
export default function GoalsHome() {
  const { data = [], error, isLoading, isError } = useGoals();

  const [selectedTab, setSelectedTab] = useState("all");

  const filteredGoals = useMemo(() => {
    if (selectedTab === "all") {
      return data;
    }
    return data.filter((item) => item.status === selectedTab);
  }, [data, selectedTab]);



    if (isLoading) {
      return <div>Yükleniyor...</div>;
    }

    if (isError) {
      return <div>Bir hata oluştu: {error.message}</div>;
    }
  

  return (
    <div className="space-y-6">
      <GoalsHeading />

      <div className="flex w-fit rounded-xl  p-1 gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`rounded-lg px-6  py-2 text-sm font-medium transition-all ${
              selectedTab === tab.value ? "bg-white shadow-sm" : "text-gray-50 "
            }`}
            text={tab.text}
          />
        ))}
      </div>

      {filteredGoals.map((goal) => (
        <GoalsCard key={goal.id} {...goal} />
      ))}
    </div>
  );
}

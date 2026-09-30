"use client";

import { useMemo, useState } from "react";

import { Button } from "@/shared/components/atoms";

import { useGoals } from "../../hooks/useGoals";
import GoalsCard from "../GoalsCard";
import GoalsHeading from "../GoalsHeading";
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
export default function GoalsHome({ goals = [] }) {
  const {
    router,
    isPending,
    deletedGoals,
    updateGoals,
    selectedValue,
    setSelectedValue,
    openMenu,
    setOpenMenu,
  } = useGoals();

  const [selectedTab, setSelectedTab] = useState("all");

  const filteredGoals = useMemo(() => {
    if (selectedTab === "all") {
      return goals;
    }
    return goals.filter((item) => item.status === selectedTab);
  }, [goals, selectedTab]);

  return (
    <div className="space-y-6">
      <GoalsHeading router={router} />

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
        <GoalsCard
          key={goal.id}
          {...goal}
          deletedGoals={deletedGoals}
          isUpdating={isPending}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          updateGoals={updateGoals}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      ))}
    </div>
  );
}

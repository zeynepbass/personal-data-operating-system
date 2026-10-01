"use client";

import { useMemo, useState } from "react";

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

      <div role="group" aria-label="Hedef filtresi" className="flex w-fit gap-2 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={selectedTab === tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
              selectedTab === tab.value
                ? "bg-[#555A8A] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <p className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Bu filtrede hedef bulunmuyor.
        </p>
      )}

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

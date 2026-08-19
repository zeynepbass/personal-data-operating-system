"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import GoalsCard from "../GoalsCard";
import GoalsHeading from "../GoalsHeading";
import GoalsFilter, { emptyGoalFilters } from "../GoalsFilter";
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

const badgeClass =
  "flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-700 dark:text-violet-300";

export default function GoalsHome() {
  const { data = [], error, isLoading, isError ,deletedGoals,isUpdating,updateGoals,selectedValue, setSelectedValue,  openMenu, setOpenMenu,
} = useGoals();

  const [selectedTab, setSelectedTab] = useState("all");
  const [filters, setFilters] = useState(emptyGoalFilters);

  const filteredGoals = useMemo(() => {
    let result = data;

    if (selectedTab !== "all") {
      result = result.filter((item) => item.status === selectedTab);
    }

    if (filters.categories.length > 0) {
      result = result.filter((item) =>
        filters.categories.includes(item.category)
      );
    }

    if (filters.categoryTitle.trim()) {
      const query = filters.categoryTitle.trim().toLocaleLowerCase("tr");
      result = result.filter((item) =>
        item.category?.toLocaleLowerCase("tr").includes(query)
      );
    }

    if (filters.goalTitle.trim()) {
      const query = filters.goalTitle.trim().toLocaleLowerCase("tr");
      result = result.filter((item) => {
        const titleMatch = item.title
          ?.toLocaleLowerCase("tr")
          .includes(query);

        const itemMatch = item.items?.some((subItem) =>
          subItem.title?.toLocaleLowerCase("tr").includes(query)
        );

        return titleMatch || itemMatch;
      });
    }

    return result;
  }, [data, selectedTab, filters]);

  const removeCategory = (name) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category !== name),
    }));
  };

  const clearCategoryTitle = () =>
    setFilters((prev) => ({ ...prev, categoryTitle: "" }));

  const clearGoalTitle = () =>
    setFilters((prev) => ({ ...prev, goalTitle: "" }));


    if (isLoading) {
      return <div>Yükleniyor...</div>;
    }

    if (isError) {
      return <div>Bir hata oluştu: {error.message}</div>;
    }

  return (
    <div className="space-y-6">
      <GoalsHeading />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex w-fit rounded-xl bg-gray-100 dark:bg-white/5 p-1 gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant="ghost"
              onClick={() => setSelectedTab(tab.value)}
              className={`rounded-lg px-6  py-2 text-sm font-medium transition-all ${
                selectedTab === tab.value
                  ? "bg-white dark:bg-[#2a2a38] text-[#555A8A] dark:text-[#a5a1e8] shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              text={tab.text}
            />
          ))}
        </div>

        <GoalsFilter filters={filters} setFilters={setFilters} />

        {filters.categories.map((category) => (
          <span key={category} className={badgeClass}>
            {category}
            <button
              type="button"
              onClick={() => removeCategory(category)}
              aria-label={`${category} filtresini kaldır`}
              className="hover:text-red-500"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {filters.categoryTitle && (
          <span className={badgeClass}>
            Kategori: {filters.categoryTitle}
            <button
              type="button"
              onClick={clearCategoryTitle}
              aria-label="Kategori başlığı filtresini kaldır"
              className="hover:text-red-500"
            >
              <X size={12} />
            </button>
          </span>
        )}

        {filters.goalTitle && (
          <span className={badgeClass}>
            Başlık: {filters.goalTitle}
            <button
              type="button"
              onClick={clearGoalTitle}
              aria-label="Hedef başlığı filtresini kaldır"
              className="hover:text-red-500"
            >
              <X size={12} />
            </button>
          </span>
        )}
      </div>

      {filteredGoals.map((goal) => (
        <GoalsCard key={goal.id} {...goal} deletedGoals={deletedGoals} isUpdating={isUpdating}
         selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          updateGoals={updateGoals}
          openMenu={openMenu} setOpenMenu={setOpenMenu}

        />
      ))}
    </div>
  );
}

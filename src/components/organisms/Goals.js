"use client";

import { useMemo, useState } from "react";

import { GoalCard, FeedHeader } from "@/components/molecules";
import { Button } from "@/components/atoms";


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
export const Goals=({item})=>{
    const [selectedTab, setSelectedTab] = useState("all");

    const filteredGoals = useMemo(() => {
      if (selectedTab === "all") return item;
  
      return item.filter((item) => item.status === selectedTab);
    }, [selectedTab]);
  
    return(
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FeedHeader title="Hedeflerim" />

        <Button
          text="+ Yeni hedef"
          className="w-full md:w-auto hover:text-white"
        />
      </div>

      <div className="flex w-fit rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
            <Button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
              selectedTab === tab.value
                ? "bg-white hover:text-white shadow-sm"
                : "text-gray-500 hover:text-white"
            }`}
            text={ tab.text}
            />
   
      
 
        ))}
      </div>

      {filteredGoals.map((goal) => (
        <GoalCard key={goal.id} {...goal} />
      ))}
    </div>
    )
}
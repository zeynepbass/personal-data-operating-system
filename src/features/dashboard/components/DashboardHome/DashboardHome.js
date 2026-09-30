"use client";

import { useState } from "react";

import { useCurrentUser } from "@/features/auth/context/AuthProvider";

import DashboardDuration from "../DashboardDuration";
import DashboardFocus from "../DashboardFocus";
import DashboardHeading from "../DashboardHeading";
import DashboardListCheck from "../DashboardListCheck";
import TodayMeetings from "../TodayMeetings";

const CARD =
  "relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md";

export default function DashboardHome({ filteredData = [], filteredMeeting = [], recentNotes }) {
  const user = useCurrentUser();
  const firstName = user?.fullName?.split(" ")[0] ?? "";
  const [duration, setDuration] = useState("day");
  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <DashboardHeading
        title={`Merhaba${firstName ? `, ${firstName}` : ""}! 👋`}
        description="Bugün harika işler seni bekliyor."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section aria-label="Bugünkü görevler" className={`${CARD} h-[32vh]`}>
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Bugünkü Görevler" />
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#555A8A]">
              Bugün
            </span>
          </div>
          <div className="h-[calc(30vh-110px)] overflow-y-auto pr-2">
            <DashboardListCheck filteredData={filteredData} />
          </div>
        </section>

        <section aria-label="Bugünkü toplantılar" className={`${CARD} h-[32vh]`}>
          <div className="mb-5">
            <DashboardHeading title="Takvim" />
            <p className="mt-1 text-sm text-slate-500">{today}</p>
          </div>
          <div className="h-[calc(30vh-110px)] overflow-y-auto pr-2">
            <TodayMeetings meetings={filteredMeeting} />
          </div>
        </section>

        <section aria-label="İstatistikler" className={CARD}>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <DashboardHeading title="İstatistikler" />
            <DashboardDuration value={duration} onChange={setDuration} />
          </div>
          <DashboardFocus duration={duration} />
        </section>

        <section aria-label="Son notlar" className={`${CARD} h-[40vh]`}>
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Son Notlar" />
            <span className="text-xs font-medium text-slate-500">Son 3 not</span>
          </div>
          <div className="h-[calc(40vh-110px)] overflow-y-auto pr-2">{recentNotes}</div>
        </section>
      </div>
    </div>
  );
}

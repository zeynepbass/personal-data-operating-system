"use client";
import { useState } from "react";
import DashboardList from "../DashboardList";
import DashboardDuration from "../DashboardDuration";
import DashboardHeading from "../DashboardHeading";
import DashboardListCheck from "../DashboardListCheck";
import DashboardFocus from "../DashboardFocus";
import useNotes from "@/features/notes/hooks/useNotes";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/atoms";
export default function DashboardHome({
  filteredData = [],
  filteredMeeting = [],
}) {
  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const { data, isLoading, isError, error } = useNotes();
  const [duration, setDuration] = useState("day");
  const router = useRouter();
  console.log(duration);
  return (
    <div className="space-y-6">
      <DashboardHeading
        title="Günaydın, Zeynep! 👋"
        description="Bugün harika işler seni bekliyor."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="relative h-[32vh] rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Bugünkü Görevler" />

            <span className="rounded-full bg-indigo-50 dark:bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-[#555A8A] dark:text-[#a5a1e8]">
              Bugün
            </span>
          </div>

          <div className="scrollbar-thin h-[calc(30vh-110px)] overflow-y-auto pr-2">
            <DashboardListCheck filteredData={filteredData} error={error} />
          </div>
        </section>

        <section className="relative h-[32vh] rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <DashboardHeading title="Takvim" />

              <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{today}</p>
            </div>
          </div>

          <div className="scrollbar-thin h-[calc(30vh-110px)] overflow-y-auto pr-2">
            {filteredMeeting.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-[#1a1a22] shadow-sm">
                  📭
                </div>

                <p className="font-medium text-slate-700 dark:text-slate-300">
                  Bugün için toplantı yok
                </p>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  Takviminde planlanmış bir toplantı bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMeeting.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="group flex overflow-hidden rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 transition hover:border-indigo-100 dark:hover:border-indigo-400/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm"
                  >
                    <div className="flex min-w-20 items-center justify-center bg-purple-300 dark:bg-purple-400/80 px-3 text-sm font-bold text-white">
                      {item.meeting}
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-700 dark:text-slate-200">
                          {item.meetingDetails}
                        </p>

                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          Bugünkü toplantı
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-green-100 dark:bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                        Tamamlandı
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative h-auto rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <DashboardHeading title="İstatistikler" />

            <DashboardDuration value={duration} onChange={setDuration} />
          </div>

          <DashboardFocus duration={duration} />
        </section>

        <section className="relative h-[40vh] rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Son Notlar" />

            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Son 3 not
            </span>
          </div>

          <div className="scrollbar-thin h-[calc(40vh-110px)] overflow-y-auto pr-2">
            {isLoading ? (
              <p>Belgeler yükleniyor...</p>
            ) : isError ? (
              <p>Hata: {error.message}</p>
            ) : !data?.length ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Henüz not bulunmuyor.
                  </p>
                  <Button
                    text="İlk notunu oluşturarak başlayabilirsin."
                    onClick={() => router.push("/notes")}
                    variant="ghost"
                    className="text-xs text-slate-400 dark:text-slate-500 underline"
                  />
                </div>
              </div>
            ) : (
              <DashboardList documents={data.slice(-3).reverse()} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

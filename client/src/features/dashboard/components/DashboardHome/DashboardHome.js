
import DashboardList from "../DashboardList";
import DashboardDuration from "../DashboardDuration";
import DashboardHeading from "../DashboardHeading";
import DashboardListCheck from "../DashboardListCheck";
import useNotes from "@/features/notes/hooks/useNotes";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/atoms";
export default function DashboardHome({
  filteredData = [],
  filteredMeeting = []
}) {
  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const { data, isLoading, isError, error } = useNotes();
const router=useRouter();
  return (
    <div className="space-y-6">
      <DashboardHeading
        title="Günaydın, Zeynep! 👋"
        description="Bugün harika işler seni bekliyor."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="relative h-[32vh] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Bugünkü Görevler" />

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#555A8A]">
              Bugün
            </span>
          </div>

          <div className="h-[calc(30vh-110px)] overflow-y-auto pr-2">
            <DashboardListCheck
              filteredData={filteredData}


              error={error}
            />
          </div>
        </section>

        <section className="relative h-[32vh] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <DashboardHeading title="Takvim" />

              <p className="mt-1 text-sm text-slate-400">{today}</p>
            </div>
          </div>

          <div className="h-[calc(30vh-110px)] overflow-y-auto pr-2">
            {filteredMeeting.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  📭
                </div>

                <p className="font-medium text-slate-700">
                  Bugün için toplantı yok
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Takviminde planlanmış bir toplantı bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMeeting.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="group flex overflow-hidden rounded-xl border border-slate-100 bg-slate-50 transition hover:border-indigo-100 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex min-w-20 items-center justify-center bg-[#555A8A] px-3 text-sm font-bold text-white">
                      {item.meeting}
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-700">
                          {item.meetingDetails}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Bugünkü toplantı
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Tamamlandı
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative h-[40vh] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <DashboardHeading title="İstatistikler" />

            <DashboardDuration />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-center">
              <p className="text-2xl font-bold text-[#555A8A]">25</p>

              <p className="mt-1 text-xs font-medium text-slate-500">Görev</p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">4</p>

              <p className="mt-1 text-xs font-medium text-slate-500">Hedef</p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">12</p>

              <p className="mt-1 text-xs font-medium text-slate-500">Saat</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Haftalık Aktivite
              </p>

              <span className="text-xs text-slate-400">Son 7 gün</span>
            </div>

            <div className="overflow-x-auto">
              <div className="flex min-w-105 items-end justify-between gap-5 px-2 pt-4">
                {[
                  ["Pzt", "h-12"],
                  ["Sal", "h-20"],
                  ["Çar", "h-10"],
                  ["Per", "h-16"],
                  ["Cum", "h-8"],
                  ["Cmt", "h-14"],
                  ["Paz", "h-24"],
                ].map(([day, height]) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-7 rounded-t-lg bg-[#555A8A] transition-all hover:opacity-80 ${height}`}
                    />

                    <span className="text-xs font-medium text-slate-400">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative h-[40vh] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <DashboardHeading title="Son Notlar" />

            <span className="text-xs font-medium text-slate-400">
              Son 3 not
            </span>
          </div>

          <div className="h-[calc(40vh-110px)] overflow-y-auto pr-2">
            {isLoading ? (
              <p>Belgeler yükleniyor...</p>
            ) : isError ? (
              <p>Hata: {error.message}</p>
            ) : !data?.length ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-medium text-slate-600">
                  Henüz not bulunmuyor.
                </p>
                <Button
                
                text="İlk notunu oluşturarak başlayabilirsin."
                onClick={() => router.push("/notes")}
                className="text-xs text-slate-400 underline bg-transparent"
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

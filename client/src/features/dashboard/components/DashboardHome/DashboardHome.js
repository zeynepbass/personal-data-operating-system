


import DashboardFooter from "../DashboardFooter";
import DashboardList from "../DashboardList";
import DashboardDuration from "../DashboardDuration"
import DashboardHeading from "../DashboardHeading";
import DashboardListCheck from "../DashboardListCheck";
export default function DashboardHome  ({data,onToggle})  {
  return (
    <div className="space-y-6">
      <DashboardHeading
        title="Günaydın, Zeynep! 👋"
        description="Bugün harika işler seni bekliyor."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <section className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
          <DashboardHeading title="Bugünkü Görevler" />

         <DashboardListCheck  data={data}  onToggle={onToggle}/>
        </section>


        <section className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
          <DashboardHeading
            title="Takvim"
            description="29 Haziran 2024 Cumartesi"
          />

          <div className="mt-5 space-y-3">
            <div className="flex overflow-hidden rounded-xl border border-slate-200">
              <div className="flex min-w-17.5 items-center justify-center bg-[#555A8A] px-4 text-sm font-semibold text-white">
                10:00
              </div>

              <div className="flex flex-1 flex-col justify-between gap-2 p-4 sm:flex-row sm:items-center">
                <span className="font-medium text-gray-700">Meeting</span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Tamamlandı
                </span>
              </div>
            </div>
          </div>
        </section>


        <section className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <DashboardHeading title="İstatistikler" />

        <DashboardDuration/>
 
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-indigo-50 p-4 text-center">
              <p className="text-3xl font-bold text-[#555A8A]">25</p>
              <p className="mt-1 text-sm text-gray-600">Görev</p>
            </div>

            <div className="rounded-xl bg-green-50 p-4 text-center">
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="mt-1 text-sm text-gray-600">Hedef</p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4 text-center">
              <p className="text-3xl font-bold text-orange-500">12</p>
              <p className="mt-1 text-sm text-gray-600">Saat</p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div className="flex min-w-105 items-end justify-between gap-6 px-2">
              {[
                ["Pzt", "h-12"],
                ["Sal", "h-20"],
                ["Çar", "h-10"],
                ["Per", "h-16"],
                ["Cum", "h-8"],
                ["Cmt", "h-14"],
                ["Paz", "h-24"],
              ].map(([day, height]) => (
                <div
                  key={day}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-6 rounded-full bg-[#555A8A] ${height}`}
                  />

                  <span className="text-sm text-gray-600">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
          <DashboardHeading title="Son Notlar" />

          <div className="mt-4">
            <DashboardList />
          </div>
        </section>
      </div>

      <DashboardFooter
        title="AI Önerileri"
        description="Bugün 3 görevin kaldı."
        info="React çalışmaya devam etmeni öneriyorum."
      />
    </div>
  );
};
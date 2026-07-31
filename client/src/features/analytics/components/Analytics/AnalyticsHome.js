
"use client";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import  Select  from "@/shared/components/atoms/Select";
  import { PageHeader } from "@/shared/components/molecules";
  import { getRemainingMonthDates } from "@/shared/utils/date";
  import AnalyticsFooter from "../AnalyticsFooter"
const options = getRemainingMonthDates();
export default function AnalyticsHome  ()  {

  
  const data = [
    { day: "Pzt", value: 7 },
    { day: "Sal", value: 5 },
    { day: "Çar", value: 4 },
    { day: "Per", value: 10 },
    { day: "Cum", value: 13 },
    { day: "Cmt", value: 5 },
    { day: "Paz", value: 10 },
  ];
  return (
    <div className="space-y-6">
        <div className="flex justify-between">

    
      <PageHeader title="Analitik" description="" />
<div className="m-w-md">


               <Select
                   text="Filtrele"
                   name="type"
        
                   placeholder="Filtrele"
                   options={options}
                 /> </div>  
                  </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <StatCard
          title="Toplam Görev"
          value="42"
          percent="+12%"
          color="text-emerald-500"
        />

        <StatCard
          title="Tamamlanan"
          value="28"
          percent="+18%"
          color="text-emerald-500"
        />

        <StatCard
          title="Çalışma Süresi"
          value="16s 45d"
          percent=""
          color="text-gray-500"
        />
      </div>
      <section className="rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="mb-5 text-lg font-semibold text-[#555A8A]">
    Günlere Göre Görev Tamamlama
  </h2>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 14 }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 14 }}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#6C63FF"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorTask)"
          dot={false}
          activeDot={{
            r: 6,
            fill: "#6C63FF",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</section>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">En Verimli Gün</p>

          <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
            Pazartesi
          </h2>

          <p className="mt-2 text-sm font-medium text-emerald-500">
            +22% daha verimli
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            En Çok Çalışılan Kategori
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
            Next.js
          </h2>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[35%] rounded-full bg-[#665CFF]" />
          </div>

          <p className="mt-2 text-sm font-medium text-[#665CFF]">
            35%
          </p>
        </div>
      </div>

      <AnalyticsFooter
        title="AI Önerileri"
        description="Bugün 3 görevin kaldı."
        info="React çalışmaya devam etmeni öneriyorum."
      />
    </div>
  );
};

const StatCard = ({ title, value, percent, color }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <p className="text-sm text-gray-500">{title}</p>

    <h2 className="mt-2 text-4xl font-bold text-[#555A8A]">
      {value}
    </h2>

    {percent && (
      <p className={`mt-3 text-sm font-semibold ${color}`}>
        {percent}
      </p>
    )}

    <p className="mt-1 text-xs text-gray-400">
      Geçen haftaya göre
    </p>
  </div>
);
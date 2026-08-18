"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import AnalyticsCard from "../AnalyticsCard";
import AnalyticsSelect from "../AnalyticsSelect";
import { PageHeader } from "@/shared/components/molecules";

export default function AnalyticsHome({
  totalTasks = 0,
  completedTasks = 0,
  totalEstimatedHours = 0,
  chartData = [],
  options = [],
  selectedRange,
  setSelectedRange,
  mostWorkedCategory,
  mostProductiveDay,
}) {
  return (
    <div className="space-y-6">

<div className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
        <PageHeader
          title="Analiz"
          description="Periyotlarınızın takibini yapın."
   
        />

        <AnalyticsSelect
          options={options}
          value={selectedRange}
          onChange={setSelectedRange}
        />
      </div>


      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AnalyticsCard
          title="Toplam Görev"
          value={totalTasks}
        />

        <AnalyticsCard
          title="Tamamlanan"
          value={completedTasks}
        />

        <AnalyticsCard
          title="Çalışma Süresi"
          value={`${totalEstimatedHours} saat`}
        />
      </div>


      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-[#555A8A]">
          Günlere Göre Görev Tamamlama
        </h2>

        <div className="h-72">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="colorTask"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#6C63FF"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6C63FF"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 14,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 14,
                }}
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
          <p className="text-sm text-gray-500">
            En Verimli Gün
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
            {mostProductiveDay?.day ?? "-"}
          </h2>

          <p className="mt-2 text-sm font-medium text-emerald-500">
            {mostProductiveDay
              ? `${mostProductiveDay.value} task`
              : "Henüz veri yok"}
          </p>
        </div>


        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            En Çok Çalışılan Kategori
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
            {mostWorkedCategory?.category ?? "-"}
          </h2>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#665CFF]"
              style={{
                width: `${mostWorkedCategory?.percentage ?? 0}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm font-medium text-[#665CFF]">
            {mostWorkedCategory?.percentage ?? 0}%
          </p>
        </div>
      </div>
    </div>
  );
}
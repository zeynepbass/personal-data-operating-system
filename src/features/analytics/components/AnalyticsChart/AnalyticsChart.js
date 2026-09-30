"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TICK = { fill: "#6B7280", fontSize: 14 };

export default function AnalyticsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} accessibilityLayer>
        <defs>
          <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={TICK} />
        <YAxis axisLine={false} tickLine={false} tick={TICK} allowDecimals={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          name="Görev"
          stroke="#6C63FF"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorTask)"
          dot={false}
          activeDot={{ r: 6, fill: "#6C63FF" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

"use client";

import dynamic from "next/dynamic";

const AnalyticsChart = dynamic(() => import("./AnalyticsChart"), {
  ssr: false,
  loading: () => <div className="h-full animate-pulse rounded-xl bg-gray-100" />,
});

export default AnalyticsChart;

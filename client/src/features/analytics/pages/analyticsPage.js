"use client";
import  AnalyticsHome  from "../components/AnalyticsHome";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function AnalyticsPage() {
  const { data } = useFeed();
  return <AnalyticsHome data={data} />

}

"use client";
import  AnalyticsHome  from "../components/AnalyticsHome";
import { useDocument } from "@/shared/hooks/useDocument";
export default function AnalyticsPage() {
  const { data } = useFeed();
  return <AnalyticsHome data={data} />

}

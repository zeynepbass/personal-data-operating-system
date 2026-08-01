"use client";
import  DashboardHome  from "../components/DashboardHome";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function DashboardPage() {
  const { data } = useFeed();
  const today = new Date().toISOString().split("T")[0];
  const filteredData=data.filter((item)=>item.start===today)

  return <DashboardHome data={filteredData} />

}

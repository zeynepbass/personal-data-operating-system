"use client";
import  DashboardHome  from "../components/DashboardHome";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function DashboardPage() {
  const { data } = useFeed();
  return <DashboardHome data={data} />

}

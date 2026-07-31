"use client";
import  Dashboard  from "../components/Dashboard";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function DashboardPage() {
  const { data } = useFeed();
  return <Dashboard data={data} />

}

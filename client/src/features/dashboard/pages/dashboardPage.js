"use client";
import { Feed } from "../component/Dashboard";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function Dashboard() {
  const { data } = useFeed();
  return <Feed data={data} />

}

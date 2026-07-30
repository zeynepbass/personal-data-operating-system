"use client";
import { Feed } from "@/components/organisms";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function Dashboard() {
  const { data } = useFeed();
  return <Feed data={data} />

}

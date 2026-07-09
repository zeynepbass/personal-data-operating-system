"use client";
import { Feed } from "@/components/organisms";
import { useFeed } from "@/features/hooks/feed/useFeed";
export default function Dashboard() {
  const { data } = useFeed();
  return <Feed data={data} />

}

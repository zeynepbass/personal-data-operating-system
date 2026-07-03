"use client";
import { Analytics } from "@/components/organisms";
import { useFeed } from "@/features/hooks/feed/useFeed";
export default function Analytic() {
  const { data } = useFeed();
  return <Analytics data={data} />

}

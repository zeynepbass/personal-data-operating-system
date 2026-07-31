"use client";
import { Analytics } from "../component/Analytics";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function Analytic() {
  const { data } = useFeed();
  return <Analytics data={data} />

}

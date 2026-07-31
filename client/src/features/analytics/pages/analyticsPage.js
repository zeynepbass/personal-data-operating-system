"use client";
import  Analytics  from "../components/Analytics";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function Analytic() {
  const { data } = useFeed();
  return <Analytics data={data} />

}

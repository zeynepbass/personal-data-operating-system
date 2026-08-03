"use client";
import { Analytics } from "@/shared/components/organisms";
import { useFeed } from "@/features/dashboard/hooks/useMetting";
export default function Analytic() {
  const { data } = useFeed();
  return <Analytics data={data} />

}

"use client";
import { Analytics } from "@/shared/components/organisms";
import { useDocument } from "@/shared/hooks/useDocument";
export default function Analytic() {
  const { data } = useFeed();
  return <Analytics data={data} />

}

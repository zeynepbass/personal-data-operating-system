"use client";
import { Analytics } from "@/shared/components/organisms";
import { useDocument } from "@/shared/hooks/useDocument";
export default function Analytic() {
  const { data } = useDocument();
  return <Analytics data={data} />

}

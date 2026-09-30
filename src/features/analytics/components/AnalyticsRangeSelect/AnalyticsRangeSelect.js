"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import AnalyticsSelect from "../AnalyticsSelect";

export default function AnalyticsRangeSelect({ options, selectedRange }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div aria-busy={isPending} className={isPending ? "opacity-60" : undefined}>
      <AnalyticsSelect
        options={options}
        value={selectedRange}
        onChange={(value) =>
          startTransition(() => router.push(`${pathname}?range=${encodeURIComponent(value)}`))
        }
      />
    </div>
  );
}

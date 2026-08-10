"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardRepository } from "@/features/dashboard/dashboard.container";

export function useDocument() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const result = await dashboardRepository.getAllDocuments();

      return result;
    },
  });
}

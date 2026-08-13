import { getAll } from "../repositories/goal.repository";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react"
export function useGoals() {
    const query = useQuery({
        queryKey: ["goals"],
        queryFn: getAll,
      });
  return { ...query };
}

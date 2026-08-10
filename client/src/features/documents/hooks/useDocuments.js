import { getAll } from "../repository/document.repository";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useDocuments() {
    const [search,setSearch]=useState("")
    const [filter,setFilter]=useState("new")
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: getAll,
  });



  return {...query,search,setSearch,filter,setFilter};
}
"use client"
import {useState } from "react";
import columns from "@/mocks/data.json"
export const useFeed = () => {

  const [data, setData] = useState(columns);

  return {
    data, setData
  };
};
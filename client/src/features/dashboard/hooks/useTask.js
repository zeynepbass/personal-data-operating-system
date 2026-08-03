
"use client";

import { useEffect, useState } from "react";


import taksRepository from "../dashboard.container";


export const useTask = () => {


  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await taksRepository.getAllTasks();

      console.log("Tasks:", response);

      setTasks(response ?? []);
    } catch (error) {
      console.error("Tasks error:", error);

      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredData =
  tasks?.filter((item) => item.start === today) ?? [];

  return {
    filteredData


  };
};
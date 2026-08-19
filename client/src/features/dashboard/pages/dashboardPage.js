"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHome from "../components/DashboardHome";
import { useTasks } from "@/features/task/hooks/useTask";
import {
  getTodayMeetings,
  getTodayTasks,
} from "@/features/dashboard/utils/meeting.utils";

export default function DashboardPage() {
  const router = useRouter();
  const { data: meetings = [], isLoading, error } = useTasks();

  useEffect(() => {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem("pdos_token");
      window.localStorage.removeItem("pdos_user");
      router.replace("/login");
    }
  }, [error, router]);

  if (isLoading) {
    return <p className="p-6 text-sm text-gray-500">Yükleniyor...</p>;
  }

  if (error) {
    if (error.response?.status === 401) {
      return <p className="p-6 text-sm text-gray-500">Giriş sayfasına yönlendiriliyorsunuz...</p>;
    }
    return <p className="p-6 text-sm text-red-600">Veriler yüklenemedi: {error.message}</p>;
  }

  const filteredMeeting = getTodayMeetings(meetings);
  const filteredData = getTodayTasks(meetings);


  return (
    <DashboardHome

      filteredData={filteredData}
      filteredMeeting={filteredMeeting}


    />
  );
}

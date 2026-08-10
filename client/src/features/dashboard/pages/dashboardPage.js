"use client";

import DashboardHome from "../components/DashboardHome";
import { useDocument } from "@/shared/hooks/useDocument";
import {
  getTodayMeetings,
  getTodayTasks,
} from "@/features/dashboard/utils/meeting.utils";

export default function DashboardPage({ meetings = [] }) {
  const { data: documents, isLoading, isError, error } = useDocument();

  const filteredMeeting = getTodayMeetings(meetings);
  const filteredData = getTodayTasks(meetings);
  if (isLoading) {
    return <p>Belgeler yükleniyor...</p>;
  }

  if (isError) {
    return <p>Hata: {error.message}</p>;
  }

  if (!documents?.length) {
    return <p>Henüz belge bulunmuyor.</p>;
  }


  return (
    <DashboardHome
      isError={isError}
      isLoading={isLoading}
      documents={documents}
      filteredData={filteredData}
      filteredMeeting={filteredMeeting}
      error={error}

    />
  );
}

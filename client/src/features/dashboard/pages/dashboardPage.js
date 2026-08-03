"use client";
import  DashboardHome  from "../components/DashboardHome";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function DashboardPage() {
  const { filteredData,documents,filteredMeeting ,  loading,
    error} = useFeed();
 

  return <DashboardHome data={filteredData}   loading={loading}
  error={error} notes={documents} filteredMeeting={filteredMeeting} />

}

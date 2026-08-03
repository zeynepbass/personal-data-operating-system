"use client";
import  DashboardHome  from "../components/DashboardHome";
import { useFeed } from "@/features/dashboard/hooks/useMetting";
// import { useTask } from "@/features/dashboard/hooks/useTask";
export default function DashboardPage() {
  const { documents,filteredMeeting , filteredData, loading,
    error} = useFeed();
 
    // const { filteredData} = useTask();
  return <DashboardHome  filteredData={filteredData}   loading={loading}
  error={error} notes={documents} filteredMeeting={filteredMeeting} />

}

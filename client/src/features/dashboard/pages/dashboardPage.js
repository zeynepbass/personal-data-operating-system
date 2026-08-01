"use client";
import  DashboardHome  from "../components/DashboardHome";
import { useFeed } from "@/features/dashboard/hooks/useFeed";
export default function DashboardPage() {
  const { filteredData,documents,filteredMeeting } = useFeed();
 

  return <DashboardHome data={filteredData}  notes={documents} filteredMeeting={filteredMeeting}/>

}

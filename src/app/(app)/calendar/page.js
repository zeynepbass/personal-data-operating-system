import Calendar from "@/features/calendar/components/Calendar";
import { toCalendarEvents } from "@/features/calendar/utils/events";
import { requirePageUser } from "@/server/auth/dal";
import { listBoard } from "@/server/services/task.service";

export const metadata = { title: "Takvim" };

export default async function CalendarPage() {
  const user = await requirePageUser();
  const board = await listBoard(user);

  return <Calendar data={toCalendarEvents(board)} />;
}

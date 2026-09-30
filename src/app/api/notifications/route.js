import { authedRoute } from "@/server/route";
import { listNotifications } from "@/server/services/notification.service";

export const GET = authedRoute(({ user, searchParams }) =>
  listNotifications(user, Object.fromEntries(searchParams)),
);

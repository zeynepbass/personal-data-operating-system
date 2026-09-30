import { authedRoute } from "@/server/route";
import { listNotes } from "@/server/services/note.service";

export const GET = authedRoute(({ user, searchParams }) =>
  listNotes(user, Object.fromEntries(searchParams)),
);

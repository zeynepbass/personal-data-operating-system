import { authedRoute } from "@/server/route";
import { listBoard } from "@/server/services/task.service";

export const GET = authedRoute(({ user }) => listBoard(user));

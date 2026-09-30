import { pingDB } from "@/server/db/connect";
import { logger } from "@/server/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pingDB();
    return Response.json({ status: "ok", db: "up" });
  } catch (err) {
    logger.error({ err }, "health check failed");
    return Response.json({ status: "error", db: "down" }, { status: 503 });
  }
}

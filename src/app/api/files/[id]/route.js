import { Readable } from "node:stream";

import { getCurrentUser } from "@/server/auth/dal";
import { isAppError } from "@/server/errors";
import { logger } from "@/server/logger";
import { openFileForRead } from "@/server/services/file.service";

export async function GET(_request, { params }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Yetkilendirme gerekli." }, { status: 401 });

  const { id } = await params;

  try {
    const file = await openFileForRead(id, user);
    const disposition = file.kind === "document" ? "attachment" : "inline";

    return new Response(Readable.toWeb(file.stream), {
      headers: {
        "Content-Type": file.contentType,
        "Content-Length": String(file.length),
        "Content-Disposition": `${disposition}; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
        "Cache-Control": "private, max-age=300",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  } catch (error) {
    if (isAppError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    logger.error({ err: error, fileId: id }, "file download failed");
    return Response.json({ error: "Dosya okunamadı." }, { status: 500 });
  }
}

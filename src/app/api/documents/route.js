import { revalidatePath } from "next/cache";

import { AppError } from "@/server/errors";
import { assertSameOrigin, authedRoute } from "@/server/route";
import { listDocuments, uploadDocument } from "@/server/services/document.service";
import { DOCUMENT_MAX_BYTES } from "@/shared/schemas/document";

export const GET = authedRoute(({ user, searchParams }) =>
  listDocuments(user, Object.fromEntries(searchParams)),
);

export const POST = authedRoute(async ({ request, user }) => {
  assertSameOrigin(request);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > DOCUMENT_MAX_BYTES + 64 * 1024) {
    throw new AppError("VALIDATION", "Dosya en fazla 10 MB olabilir.");
  }

  const form = await request.formData().catch(() => {
    throw new AppError("VALIDATION", "Geçersiz form verisi.");
  });
  const file = form.get("pdf");
  const upload =
    file instanceof File && file.size > 0
      ? { data: new Uint8Array(await file.arrayBuffer()), name: file.name }
      : null;

  const document = await uploadDocument(
    user,
    {
      name: form.get("name"),
      type: form.get("type"),
      color: form.get("color"),
      shared: form.get("shared"),
    },
    upload,
  );

  revalidatePath("/documents");
  return Response.json(document, { status: 201 });
});

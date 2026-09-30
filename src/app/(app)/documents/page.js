import DocumentsPage from "@/features/documents/pages/documentsPage";
import { requirePageUser } from "@/server/auth/dal";
import { listDocuments } from "@/server/services/document.service";

export const metadata = { title: "Belgeler" };

export default async function Documents() {
  const user = await requirePageUser();
  const { items } = await listDocuments(user, { limit: 100 });

  return <DocumentsPage documents={items} />;
}

import { PageSkeleton } from "@/shared/components/molecules";

export default function Loading() {
  return <PageSkeleton label="Analiz yükleniyor" cards={3} rows={8} />;
}

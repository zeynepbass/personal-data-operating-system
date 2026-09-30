import { PageSkeleton } from "@/shared/components/molecules";

export default function Loading() {
  return <PageSkeleton label="Görevler yükleniyor" cards={3} rows={6} />;
}

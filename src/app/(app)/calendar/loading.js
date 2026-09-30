import { PageSkeleton } from "@/shared/components/molecules";

export default function Loading() {
  return <PageSkeleton label="Takvim yükleniyor" cards={0} rows={10} />;
}

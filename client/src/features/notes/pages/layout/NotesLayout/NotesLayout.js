import { PageHeader } from "@/shared/components/molecules";
import { NotesMenuBar } from "@/shared/components/organisms";

export default function NotesLayout({
  children,
}) {
  return (
    <>
      <PageHeader title="Notlar" />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <NotesMenuBar />
        </aside>

        <main>{children}</main>
      </div>
    </>
  );
}
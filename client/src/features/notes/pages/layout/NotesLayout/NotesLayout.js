import { PageHeader } from "@/shared/components/molecules";
import NotesMenu  from "../../../components/NotesMenu";

export default function NotesLayout({
  children,
}) {
  return (
    <>
      <PageHeader title="Notlar" />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <NotesMenu />
        </aside>

        <main>{children}</main>
      </div>
    </>
  );
}
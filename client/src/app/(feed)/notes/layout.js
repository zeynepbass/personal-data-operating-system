import { FeedHeader } from "@/components/molecules";
import { NotesMenuBar } from "@/components/organisms";

export default function NotesLayout({
  children,
}) {
  return (
    <>
      <FeedHeader title="Notlar" />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <NotesMenuBar />
        </aside>

        <main>{children}</main>
      </div>
    </>
  );
}
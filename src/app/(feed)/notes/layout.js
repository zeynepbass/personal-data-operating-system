import { NotesMenuBar } from "@/components/organisms";
import { FeedHeader } from "@/components/molecules";
export default function SettingsLayout({ children }) {
  return (
        <>
    
        <FeedHeader title="Notlar" />
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <NotesMenuBar />
      <main>{children}</main>
    </div></>
  );
}

import { SettingsMenuBar } from "@/components/organisms";
import {FeedHeader} from "@/components/molecules"
export default function SettingsLayout({ children }) {
  return (
    <>

    <FeedHeader title="Ayarlar" />
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <SettingsMenuBar />
      <main>{children}</main>
    </div>    </>
  );  
}

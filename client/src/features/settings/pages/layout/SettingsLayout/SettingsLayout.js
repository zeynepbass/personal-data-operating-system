import { SettingMenuBar } from "@/shared/components/organisms";
import { PageHeader } from "@/shared/components/molecules";
export default function SettingsLayout({ children }) {
  return (
    <>
      <PageHeader title="Ayarlar" />
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <SettingMenuBar />
        <main>{children}</main>
      </div>{" "}
    </>
  );
}

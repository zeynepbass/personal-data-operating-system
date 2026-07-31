import  SettingMenuBar  from "../SettingMenuBar";
import  Heading  from "@/shared/components/components/atoms";
export default function SettingsLayout({ children }) {
  return (
    <>
      <Heading title="Ayarlar" />
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <SettingMenuBar />
        <main>{children}</main>
      </div>{" "}
    </>
  );
}

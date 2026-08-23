import  SettingMenuBar  from "../SettingsMenuBar";

export default function SettingsLayout({ children }) {
  return (
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] py-10">
        <SettingMenuBar />
        <main className="mt-10">{children}</main>
      </div>
  );
}

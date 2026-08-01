import  SettingMenuBar  from "../SettingsMenuBar";

export default function SettingsLayout({ children }) {
  return (
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <SettingMenuBar />
        <main>{children}</main>
      </div>
  );
}

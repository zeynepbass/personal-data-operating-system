import { SettingsMenuBar } from "@/components/organisms";
export default function SettingsLayout({ children }) {
    return (
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <SettingsMenuBar />
        <main>{children}</main>
      </div>
    );
  }
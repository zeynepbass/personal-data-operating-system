import { SearchBar, Sidebar } from "@/shared/components/organisms";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <SearchBar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

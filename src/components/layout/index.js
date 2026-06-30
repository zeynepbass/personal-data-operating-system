import { SearchBar, Sidebar } from "@/components/organisms";

export function Layout  ({ children })  {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <SearchBar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
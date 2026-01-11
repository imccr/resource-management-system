import Sidebar from "@/components/sidebar";

export default function CmsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Sidebar />
        <main className="ml-64 p-4">
            {children}
        </main>
    </div>
  );
}
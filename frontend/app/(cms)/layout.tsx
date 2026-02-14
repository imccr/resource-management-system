import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from "@/components/sidebar";

export default async function CmsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div>
      <Sidebar />
      <main className="ml-64 p-4">
        {children}
      </main>
    </div>
  );
}
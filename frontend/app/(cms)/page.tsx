import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  // If not logged in → go to login
  if (!token) {
    redirect('/login');
  }
  console.log("Token in homepage:", token);

  // Logged in → render homepage
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">
        Admin Dashboard
      </h1>
    </div>
  );
}

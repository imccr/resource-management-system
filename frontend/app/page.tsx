import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  // If not logged in → go to login
  if (!token) {
    redirect('/login');
  }

  // Logged in → render homepage
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome! You are logged in.</p>
    </main>
  );
}

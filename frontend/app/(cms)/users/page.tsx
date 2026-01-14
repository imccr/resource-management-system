import UsersClient from './usersClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <UsersClient />;
}
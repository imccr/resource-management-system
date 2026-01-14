import UsersClient from './usersClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function UsersPage() {
  const cookieStore =  cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return <UsersClient />;
}

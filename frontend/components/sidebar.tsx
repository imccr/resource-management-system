'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'Students', href: '/students' },

];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    router.replace('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/20">
        <h2 className="text-xl font-semibold">🎓 College RMS</h2>
        <p className="text-sm opacity-80">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-6 py-3 text-sm font-medium transition
              ${
                pathname === item.href
                  ? 'bg-white/20 border-l-4 border-white'
                  : 'hover:bg-white/10'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-6">
        <button
          onClick={logout}
          className="w-full rounded-md bg-white/20 py-2 text-sm font-medium hover:bg-white/30 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

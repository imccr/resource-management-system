'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const menuItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Users', href: '/users', icon: '👤' },
  { label: 'Students', href: '/students', icon: '🎓' },
  { label: 'Teachers', href: '/teachers', icon: '👨‍🏫' },
  { label: 'Departments', href: '/departments', icon: '🏢' },
  { label: 'Resources', href: '/resources', icon: '📦' },
  { label: 'Files', href: '/files', icon: '📁' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    router.replace('/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 text-white shadow-lg"
      style={{
        background: `linear-gradient(to bottom right, var(--sidebar-from), var(--sidebar-to))`,
        color: 'var(--sidebar-text)',
      }}
    >
      {/* Logo + Theme Toggle */}
      <div
        className="px-6 py-6 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--sidebar-border)' }}
      >
        <div>
          <h2 className="text-xl font-semibold">🎓 College RMS</h2>
          <p className="text-sm opacity-80">Admin Panel</p>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition hover:scale-110"
          style={{ background: 'var(--sidebar-hover-bg)' }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        <p className="px-6 text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
          Menu
        </p>
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition
              ${pathname === item.href
                ? 'border-l-4 border-white'
                : 'hover:opacity-90'
              }
            `}
            style={{
              background:
                pathname === item.href
                  ? 'var(--sidebar-active-bg)'
                  : 'transparent',
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-6">
        <button
          onClick={logout}
          className="w-full rounded-md py-2 text-sm font-medium transition"
          style={{ background: 'var(--sidebar-hover-bg)' }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

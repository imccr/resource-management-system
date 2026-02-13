'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Optional: if already logged in, skip login page
  useEffect(() => {
    if (document.cookie.includes('token=')) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      const response = await fetch(
        `${API_URL}/admin/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        { method: 'POST' }
      );


      const data = await response.json();

      if (response.ok) {
        setError('');

        // ✅ Store token in cookie (readable by server)
        document.cookie = `token=${data.token}; path=/; max-age=86400`;

        router.replace('/');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Login failed. Check backend server.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-lg"
        style={{
          background: 'var(--bg-card)',
          boxShadow: `0 4px 20px var(--shadow-color)`,
        }}
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: 'var(--accent-primary)' }}
        >
          Admin Login
        </h2>

        {error && (
          <p className="text-sm mb-4 text-center" style={{ color: 'var(--badge-red-text)' }}>
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2"
            placeholder="admin@rms.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white py-2 rounded transition"
          style={{ background: 'var(--accent-primary)' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

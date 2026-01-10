'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // ✅ FIXED: Query params for FastAPI path parameters
      const response = await fetch(
        `http://localhost:8000/admin/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        { 
          method: 'POST',
          // ✅ NO JSON headers/body needed for query params
        }
      );

      const data = await response.json();

      if (response.ok) {
        setError('');
        alert(`Login successful, ${data.username}! App under construction.`);
        localStorage.setItem('token', data.token);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Check backend server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-blue-500 text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className="text-gray-400 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@rms.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            className="text-gray-400 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

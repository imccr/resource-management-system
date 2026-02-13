"use client"

import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AddTeacherModal({ open, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role_id: 1,
    is_active: true,
    department_id: 1,
  })

  if (!open) return null

  const submit = async () => {
    console.log(JSON.stringify(form))

    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    onSuccess()
    onClose()
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'var(--modal-backdrop)' }}>
      <div className="w-105 rounded-lg p-6" style={{ background: 'var(--modal-bg)' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent-primary)' }}>
          Add New Teacher
        </h2>

        <div className="space-y-3">
          <input
            className="w-full rounded px-3 py-2"
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          />

          <input
            className="w-full rounded px-3 py-2"
            placeholder="Email"
            type="email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          />

          <input
            className="w-full rounded px-3 py-2"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          />
          <label className="mb-4 block" style={{ color: 'var(--text-primary)' }}>Department
            <select
              className="w-full rounded px-3 py-2 mt-1"
              onChange={(e) =>
                setForm({ ...form, department_id: Number(e.target.value) })
              }
              style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
            >
              <option value={1}>Electronics and Computer Engineering</option>
              <option value={2}>Architecture</option>
              <option value={3}>Applied Science</option>
              <option value={4}>Automobile and Mechanical Engineering</option>
              <option value={5}>Civil Engineering</option>
              <option value={6}>Industrial Engineering</option>
            </select></label>

          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
            />
            Active
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded"
            style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 text-white rounded transition"
            style={{ background: 'var(--accent-primary)' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

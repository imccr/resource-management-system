"use client"
import { useEffect, useState } from "react"

type Teacher = {
  teacher_id: number
  full_name: string
  email: string
  department_id: number
  is_active: boolean
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  const fetchTeachers = async () => {
    const res = await fetch(`${API_URL}/users/teachers`)
    const data = await res.json()
    setTeachers(data.teachers)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTeachers()
    }, 0);
    return () => clearTimeout(timer);
  }, [])


  return (

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Teachers</h1>
      </div>

      <div className="rounded shadow" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
            <tr>
              <th className="p-4 text-left">Teacher ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Department</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.teacher_id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                <td className="p-4">{t.teacher_id}</td>
                <td className="p-4">{t.full_name}</td>
                <td className="p-4">{t.email}</td>
                <td className="p-4 text-center">{
                  t.department_id === 1 ? "Electronics and Computer Engineering" :
                    t.department_id === 2 ? "Architecture" :
                      t.department_id === 3 ? "Applied Science" :
                        t.department_id === 4 ? "Automobile and Mechanical Engineering" :
                          t.department_id === 5 ? "Civil Engineering" :
                            t.department_id === 6 ? "Industrial Engineering" :
                              "Unknown"
                }
                </td>
                <td className="p-4 text-center">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: t.is_active ? 'var(--badge-green-bg)' : 'var(--badge-red-bg)',
                      color: t.is_active ? 'var(--badge-green-text)' : 'var(--badge-red-text)',
                    }}
                  >
                    {t.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

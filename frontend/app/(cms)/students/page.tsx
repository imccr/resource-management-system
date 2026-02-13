"use client"
import { useEffect, useState } from "react"

type Student = {
  user_id: number
  campus_rollno: string
  full_name: string
  email: string
  class: string
  year: number
  part: number
  is_active: boolean
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])

  const fetchStudents = async () => {
    const res = await fetch(`${API_URL}/users/students`)
    const data = await res.json()
    setStudents(data.students)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents()
    }, 0);
    return () => clearTimeout(timer);
  }, [])


  return (

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Students</h1>
      </div>

      <div className="rounded shadow" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
            <tr>
              <th className="p-4 text-left">Student Roll No.</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Class</th>
              <th className="p-4 text-center">Year</th>
              <th className="p-4 text-center">Part</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.user_id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                <td className="p-4">{s.campus_rollno}</td>
                <td className="p-4">{s.full_name}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4 text-center">{s.class}</td>
                <td className="p-4 text-center">{s.year}</td>
                <td className="p-4 text-center">{s.part}</td>
                <td className="p-4 text-center">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: s.is_active ? 'var(--badge-green-bg)' : 'var(--badge-red-bg)',
                      color: s.is_active ? 'var(--badge-green-text)' : 'var(--badge-red-text)',
                    }}
                  >
                    {s.is_active ? "Active" : "Inactive"}
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

"use client"
import { useEffect, useState } from "react"

type Departments = {
  department_id: number
  name: string
  total_classes: number
  total_teachers: number
  total_students: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Departments[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_URL}/users/departments`)
        const data = await res.json()
        setDepartments(data.departments || [])
      } catch (error) {
        console.error("Failed to fetch departments:", error)
        setDepartments([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  if (isLoading) return <div className="p-6" style={{ color: 'var(--text-secondary)' }}>Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Departments</h1>
      </div>

      <div className="rounded shadow overflow-x-auto" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
            <tr>
              <th className="p-4 text-left w-1/5">Department ID</th>
              <th className="p-4 text-left w-1/5">Name</th>
              <th className="p-4 text-center w-1/5">Total Classes</th>
              <th className="p-4 text-center w-1/5">Total Teachers</th>
              <th className="p-4 text-center w-1/5">Total Students</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((d) => (
                <tr key={d.department_id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                  <td className="p-4 w-1/5">{d.department_id}</td>
                  <td className="p-4 w-1/5">{d.name}</td>
                  <td className="p-4 text-center w-1/5">{d.total_classes}</td>
                  <td className="p-4 text-center w-1/5">{d.total_teachers}</td>
                  <td className="p-4 text-center w-1/5">{d.total_students}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center" style={{ color: 'var(--text-muted)' }}>
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
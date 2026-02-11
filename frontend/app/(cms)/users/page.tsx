"use client"
import { useEffect, useState } from "react"
import AddTeacherModal from "./addTeacherModal"
import AddStudentModal from "./addStudentModal"
import { EditButton, DeleteButton } from "@/components/button"

type User = {
  id: number
  full_name: string
  email: string
  role_id: number
  is_active: boolean
}

// Define API_URL at the top of the component
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [openTeacher, setOpenTeacher] = useState(false)
  const [openStudent, setOpenStudent] = useState(false)

  const fetchUsers = async () => {
<<<<<<< HEAD
    const res = await fetch(`${API_URL}/users`)
=======
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
>>>>>>> aa990d3 (deployed)
    const data = await res.json()
    setUsers(data.users)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers()
    }, 0);
    return () => clearTimeout(timer);
  }, [])

  const handleEdit = () => {
    alert("Edit user functionality to be implemented")
  }

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchUsers())
        .catch((err) => alert("Error deleting user: " + err.message))
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Users</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setOpenStudent(true)}
            className="text-white px-4 py-2 rounded transition"
            style={{ background: 'var(--accent-primary)' }}
          >
            + Add Student
          </button>
          <button
            onClick={() => setOpenTeacher(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Teacher
          </button>
        </div>
      </div>

      <div className="rounded shadow" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center w-64">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                <td className="p-4">{u.id}</td>
                <td className="p-4">{u.full_name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 text-center">
                  {u.role_id === 1 ? "Teacher" : "Student"}
                </td>
                <td className="p-4 text-center">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: u.is_active ? 'var(--badge-green-bg)' : 'var(--badge-red-bg)',
                      color: u.is_active ? 'var(--badge-green-text)' : 'var(--badge-red-text)',
                    }}
                  >
                    {u.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <EditButton onClick={handleEdit} />
                    <DeleteButton onClick={() => handleDelete(u.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTeacherModal
        open={openTeacher}
        onClose={() => setOpenTeacher(false)}
        onSuccess={fetchUsers}
      />
      <AddStudentModal
        open={openStudent}
        onClose={() => setOpenStudent(false)}
        onSuccess={fetchUsers}
      />
    </div>
  )
}

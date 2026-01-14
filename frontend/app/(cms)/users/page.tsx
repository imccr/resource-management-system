"use client"
import { useEffect, useState } from "react"
import AddUserModal from "./addUserModal"

type User = {
  id: number
  full_name: string
  email: string
  role_id: number
  is_active: boolean
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/users")
    const data = await res.json()
    setUsers(data.users)

  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-indigo-600">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{u.id}</td>
                <td className="p-4">{u.full_name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 text-center">
                  {u.role_id === 1 ? "Admin" : "Student"}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchUsers}
      />
    </div>
  )
}

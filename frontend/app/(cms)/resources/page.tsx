"use client"
import { useEffect, useState } from "react"

type Resource = {
  resource_id: number
  file_id: number
  title: string
  type: string
  uploaded_by: string
  date_uploaded: string
  target_count: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState("All Types")
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API_URL}/users/resources`)
        const data = await res.json()
        setResources(data.resources || [])
      } catch (error) {
        console.error("Failed to fetch resources:", error)
        setResources([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [])

  const handleDelete = async (resourceId: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        const res = await fetch(`${API_URL}/users/resources/${resourceId}`, {
          method: "DELETE"
        })
        if (res.ok) {
          setResources(resources.filter(r => r.resource_id !== resourceId))
        } else {
          alert("Failed to delete resource")
        }
      } catch (error) {
        console.error("Delete error:", error)
        alert("Error deleting resource")
      }
    }
  }

  const filteredResources = resources.filter(r => {
    const matchesType = filterType === "All Types" || r.type === filterType
    const matchesSearch = r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(r.uploaded_by).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const resourceTypes = ["All Types", ...new Set(resources.map(r => r.type).filter(Boolean))]

  if (isLoading || !mounted) return <div className="p-6" style={{ color: 'var(--text-secondary)' }}>Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Resources</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{filteredResources.length} total resources</p>
        </div>
        <button
          className="text-white px-4 py-2 rounded transition"
          style={{ background: 'var(--accent-primary)' }}
        >
          + Add Resource
        </button>
      </div>

      <div className="flex gap-4 mb-6 mt-4">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded"
          style={{
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded cursor-pointer"
          style={{
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
        >
          {resourceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="rounded shadow overflow-x-auto" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">File ID</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Uploaded At</th>
              <th className="p-4 text-left">Uploaded By</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.length > 0 ? (
              filteredResources.map((r) => (
                <tr key={r.resource_id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                  <td className="p-4">{r.resource_id}</td>
                  <td className="p-4">{r.file_id}</td>
                  <td className="p-4">{r.title}</td>
                  <td className="p-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)' }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="p-4">{r.target_count}</td>
                  <td className="p-4">{r.uploaded_by}</td>
                  <td className="p-4">{r.date_uploaded}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center" style={{ color: 'var(--text-muted)' }}>
                  No resources found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
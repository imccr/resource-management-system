"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthHeaders } from "@/utils/auth"

type FileItem = {
    file_id: number
    file_name: string
    file_size: string
    file_type: string
    uploaded_at: string
    file_path: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function FilesPage() {
    const router = useRouter();
    const [files, setFiles] = useState<FileItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState("All Types")
    const [mounted, setMounted] = useState(false)

    const fetchFiles = async (search?: string, type?: string) => {
        try {
            const params = new URLSearchParams()
            if (search) params.append("search", search)
            if (type && type !== "All Types") params.append("file_type", type)

            const queryString = params.toString()
            const url = `${API_URL}/users/files${queryString ? `?${queryString}` : ""}`
            const res = await fetch(url, {
                headers: getAuthHeaders()
            })

            if (res.status === 401) {
                document.cookie = 'token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                router.replace('/login');
                return;
            }

            const data = await res.json()
            setFiles(data.files || [])
        } catch (error) {
            console.error("Failed to fetch files:", error)
            setFiles([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setMounted(true)
        fetchFiles()
    }, [])

    useEffect(() => {
        if (mounted) {
            const timer = setTimeout(() => {
                fetchFiles(searchQuery, filterType)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [searchQuery, filterType, mounted])

    const handleDelete = async (fileId: number) => {
        if (confirm("Are you sure you want to delete this file?")) {
            try {
                const res = await fetch(`${API_URL}/users/files/${fileId}`, {
                    method: "DELETE",
                    headers: getAuthHeaders()
                })
                if (res.ok) {
                    setFiles(files.filter(f => f.file_id !== fileId))
                } else {
                    alert("Failed to delete file")
                }
            } catch (error) {
                console.error("Delete error:", error)
                alert("Error deleting file")
            }
        }
    }

    const fileTypes = ["All Types", ...new Set(files.map(f => f.file_type).filter(Boolean))]

    if (isLoading || !mounted) return <div className="p-6" style={{ color: 'var(--text-secondary)' }}>Loading...</div>

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>Files</h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{files.length} total files</p>
                </div>
                <button
                    className="text-white px-4 py-2 rounded transition"
                    style={{ background: 'var(--accent-primary)' }}
                >
                    + Add File
                </button>
            </div>

            <div className="flex gap-4 mb-6 mt-4">
                <input
                    type="text"
                    placeholder="Search files..."
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
                    {fileTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="rounded shadow overflow-x-auto" style={{ background: 'var(--bg-card)', boxShadow: `0 1px 3px var(--shadow-color)` }}>
                <table className="w-full text-sm">
                    <thead style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">File Name</th>
                            <th className="p-4 text-left">Size</th>
                            <th className="p-4 text-left">Type</th>
                            <th className="p-4 text-left">Uploaded At</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ? (
                            files.map((f) => (
                                <tr key={f.file_id} className="transition" style={{ borderTop: `1px solid var(--table-border)` }}>
                                    <td className="p-4">{f.file_id}</td>
                                    <td className="p-4">{f.file_name}</td>
                                    <td className="p-4">{f.file_size}</td>
                                    <td className="p-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs"
                                            style={{ background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)' }}
                                        >
                                            {f.file_type}
                                        </span>
                                    </td>
                                    <td className="p-4">{f.uploaded_at}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleDelete(f.file_id)}
                                            className="px-3 py-1 text-white rounded text-xs transition"
                                            style={{ background: '#ef4444' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center" style={{ color: 'var(--text-muted)' }}>
                                    No files found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

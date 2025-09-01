import React, { useEffect, useState, useMemo } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

const API_BASE = import.meta.env.VITE_API_URL

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchTasks() {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/tasks`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  async function addTask(title) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!res.ok) return alert('Failed to add task')
    const created = await res.json()
    setTasks(prev => [created, ...prev])
  }

  async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
    if (!res.ok) return alert('Failed to delete task')
    setTasks(prev => prev.filter(t => t._id !== id))
  }

  async function toggleTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PATCH' })
    if (!res.ok) return alert('Failed to update task')
    const updated = await res.json()
    setTasks(prev => prev.map(t => (t._id === id ? updated : t)))
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'completed').length
    return { total, completed, pending: total - completed }
  }, [tasks])

  return (
    <div className="min-h-screen px-2 py-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-purple-800">TaskFlow Manager</h1>
        </header>

        <section className="mb-4 flex justify-between text-sm text-gray-600">
          <div>Total: <span className="font-semibold">{stats.total}</span></div>
          <div>Completed: <span className="font-semibold">{stats.completed}</span></div>
          <div>Pending: <span className="font-semibold">{stats.pending}</span></div>
        </section>

        <div className="mb-4">
          <TaskForm onAdd={addTask} />
        </div>

        <main>
          {loading ? (
            <div className="text-gray-500 text-center py-6">Loading tasks…</div>
          ) : error ? (
            <div className="text-red-600 text-center py-6">{error}</div>
          ) : (
            <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
          )}
        </main>
      </div>
    </div>
  )
}
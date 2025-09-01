import React, { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new task…"
        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <button type="submit" className="px-4 py-2 rounded-xl shadow font-medium bg-indigo-600 text-white hover:bg-indigo-700">
        Add
      </button>
    </form>
  )
}
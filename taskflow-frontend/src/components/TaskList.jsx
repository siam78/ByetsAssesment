import React from 'react'

export default function TaskList({ tasks, onDelete, onToggle }) {
  if (!tasks.length) {
    return <div className="text-gray-600">No tasks yet. Add your first one!</div>
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task._id} className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => onToggle(task._id)}
              className="h-5 w-5"
            />
            <div>
              <div className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</div>
              <div className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <button onClick={() => onDelete(task._id)} className="text-sm px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
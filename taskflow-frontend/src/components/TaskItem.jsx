import React from 'react'

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="flex items-center justify-between bg-white rounded shadow p-3 mb-2">
      <div
        className={`flex-1 cursor-pointer ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}
        onClick={() => onToggle(task._id)}
        title="Toggle complete"
      >
        {task.title}
      </div>
      <button
        className="ml-4 text-red-500 hover:text-red-700"
        onClick={() => onDelete(task._id)}
        title="Delete"
      >
        &#10005;
      </button>
    </div>
  )
}
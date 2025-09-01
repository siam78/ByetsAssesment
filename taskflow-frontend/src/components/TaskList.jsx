import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onDelete, onToggle }) {
  if (!tasks.length) {
    return <div className="text-gray-400 text-center py-4">No tasks yet.</div>
  }
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
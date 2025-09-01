import { Router } from 'express'
import Task from '../models/Task.js'

const router = Router()

// Create
router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    if (!title || !title.trim()) return res.status(400).json({ message: 'Title is required' })
    const task = await Task.create({ title: title.trim() })
    res.status(201).json(task)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Read all
router.get('/', async (_req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Task not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Toggle complete (optional -> implemented)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    task.status = task.status === 'completed' ? 'pending' : 'completed'
    await task.save()
    res.json(task)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

export default router
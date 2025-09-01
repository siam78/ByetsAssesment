import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Task', TaskSchema)
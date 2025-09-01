import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import tasksRouter from './src/routes/tasks.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow'
const PORT = process.env.PORT
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.error('MongoDB connection error:', err.message)
  process.exit(1)
})

app.get('/', (req, res) => res.json({ ok: true, service: 'taskflow-api' }))
app.use('/api/tasks', tasksRouter)

app.use((req, res) => res.status(404).json({ message: 'Route not found' }))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
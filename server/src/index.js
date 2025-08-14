import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Message from './models/Message.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://171ankit2020:D8c5EwtXOcr4qUyV@knothost.uuqcrq1.mongodb.net/'

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'KnotHost Auth API' })
})

app.use('/api/auth', authRouter)

// Simple contact endpoint to accept messages from the website
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, details } = req.body || {}
  if (!name || !email || !details) {
    return res.status(400).json({ message: 'Name, email, and details are required' })
  }
  try {
    const msg = await Message.create({ name, email, phone, details })
    res.status(200).json({ success: true, message: 'Request received. We will contact you shortly.', id: msg._id })
  } catch (e) {
    console.error('Failed to save contact message:', e)
    res.status(500).json({ success: false, message: 'Failed to submit request' })
  }
})

async function start() {
  try {
    if (!MONGO_URI) {
      console.warn('MONGO_URI not set. Set it in a .env file to enable persistence.')
    } else {
      await mongoose.connect(MONGO_URI)
      console.log('Connected to MongoDB')
    }
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()



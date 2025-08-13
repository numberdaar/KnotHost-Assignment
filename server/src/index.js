import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'KnotHost Auth API' })
})

app.use('/api/auth', authRouter)

// Simple contact endpoint to accept messages from the website
app.post('/api/contact', (req, res) => {
  const { name, email, phone, details } = req.body || {}
  if (!name || !email || !details) {
    return res.status(400).json({ message: 'Name, email, and details are required' })
  }
  console.log(`[contact] New request from ${name} <${email}> (${phone || 'n/a'}): ${details}`)
  // Simulate processing/sending email successfully
  res.json({ message: 'Request received. We will contact you shortly.' })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})



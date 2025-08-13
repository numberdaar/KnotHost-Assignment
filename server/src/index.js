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

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})



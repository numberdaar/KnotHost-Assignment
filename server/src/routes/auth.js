import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In-memory user store for demo
const users = new Map()
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me'

const router = Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
  if (users.has(email)) return res.status(409).json({ message: 'User already exists' })
  const passwordHash = await bcrypt.hash(password, 10)
  users.set(email, { email, passwordHash, verified: true })
  // Simulate confirmation email
  console.log(`[email] Sent confirmation email to ${email}`)
  res.status(201).json({ message: 'User created. Confirmation email sent.' })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  const user = users.get(email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

router.post('/forgot', (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ message: 'Email required' })
  if (!users.has(email)) return res.status(200).json({ message: 'If the email exists, reset sent' })
  const resetToken = Math.random().toString(36).slice(2)
  users.get(email).resetToken = resetToken
  console.log(`[email] Password reset token for ${email}: ${resetToken}`)
  res.json({ message: 'Reset email sent (simulated).' })
})

router.get('/me', (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    res.json({ email: payload.sub })
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

export default router



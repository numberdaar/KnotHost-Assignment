import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me'

const router = Router()

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body || {}
  if (!firstName || !lastName || !email || !password) return res.status(400).json({ message: 'First name, last name, email and password required' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'User already exists' })
  const passwordHash = await bcrypt.hash(password, 10)
  await User.create({ firstName, lastName, email, passwordHash, verified: true })
  console.log(`[email] Sent confirmation email to ${email}`)
  res.status(201).json({ message: 'User created. Confirmation email sent.' })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

router.post('/forgot', async (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ message: 'Email required' })
  const user = await User.findOne({ email })
  if (!user) return res.status(200).json({ message: 'If the email exists, reset sent' })
  const resetToken = Math.random().toString(36).slice(2)
  user.resetToken = resetToken
  await user.save()
  console.log(`[email] Password reset token for ${email}: ${resetToken}`)
  res.json({ message: 'Reset email sent (simulated).' })
})

// Check if an email exists (for client-side UX to show reset form)
router.post('/check-email', async (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ exists: false })
  const exists = await User.exists({ email })
  res.json({ exists: !!exists })
})

// Reset password directly by email (demo). In production, require a secure token.
router.post('/reset', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and new password required' })
  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  user.passwordHash = await bcrypt.hash(password, 10)
  user.resetToken = undefined
  await user.save()
  res.json({ success: true })
})

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await User.findOne({ email: payload.sub }).lean()
    res.json({ email: payload.sub, firstName: user?.firstName, lastName: user?.lastName })
  } catch (e) {
    res.status(401).json({ message: 'UnAuthorized' })
  }
})

export default router



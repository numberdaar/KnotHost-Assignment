// Axios instance and small API helpers for the auth endpoints
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Create a new user account
export async function signUp(email, password) {
  const { data } = await api.post('/auth/signup', { email, password })
  return data
}

// Authenticate and receive JWT token
export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

// Trigger password reset (simulated on server)
export async function forgot(email) {
  const { data } = await api.post('/auth/forgot', { email })
  return data
}

// Fetch current user based on provided token
export async function me(token) {
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

// Send a contact request to the server
export async function sendContact(payload) {
  const { data } = await api.post('/contact', payload)
  return data
}



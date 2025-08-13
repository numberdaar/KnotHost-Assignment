import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export async function signUp(email, password) {
  const { data } = await api.post('/auth/signup', { email, password })
  return data
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export async function forgot(email) {
  const { data } = await api.post('/auth/forgot', { email })
  return data
}

export async function me(token) {
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}



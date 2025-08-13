import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { login as apiLogin, signUp as apiSignUp, forgot as apiForgot } from './api'
import { useAuth } from './auth.jsx'

function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  function closeMobile() { setMobileOpen(false) }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white">
        <div className="mx-auto px-2 md:px-4 py-4 flex items-center justify-between w-full">
          <Link to="/" className="text-xl font-semibold">KnotBuild Co.</Link>
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-4 text-sm items-center">
            <NavLink end to="/" className={({ isActive }) => isActive ? 'underline underline-offset-4' : 'hover:underline'}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'underline underline-offset-4' : 'hover:underline'}>Services</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'underline underline-offset-4' : 'hover:underline'}>Contact</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'underline underline-offset-4' : 'hover:underline'}>Dashboard</NavLink>
                <button onClick={logout} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'underline underline-offset-4' : 'hover:underline'}>Login</NavLink>
            )}
          </nav>
          {/* Hamburger for small screens */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>
      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMobile} />
          <aside className="fixed left-0 top-0 h-full w-72 bg-white text-slate-800 shadow-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Menu</span>
              <button onClick={closeMobile} aria-label="Close menu" className="p-2 rounded hover:bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <NavLink end to="/" onClick={closeMobile} className={({ isActive }) => `rounded px-3 py-2 ${isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}>Home</NavLink>
            <NavLink to="/services" onClick={closeMobile} className={({ isActive }) => `rounded px-3 py-2 ${isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}>Services</NavLink>
            <NavLink to="/contact" onClick={closeMobile} className={({ isActive }) => `rounded px-3 py-2 ${isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}>Contact</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={closeMobile} className={({ isActive }) => `rounded px-3 py-2 ${isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}>Dashboard</NavLink>
                <button onClick={() => { logout(); closeMobile() }} className="text-left rounded px-3 py-2 hover:bg-slate-50">Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={closeMobile} className={({ isActive }) => `rounded px-3 py-2 ${isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}>Login</NavLink>
            )}
            <div className="mt-auto text-xs text-slate-500">Current: {location.pathname}</div>
          </aside>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600">© {new Date().getFullYear()} KnotBuild Co. All rights reserved.</div>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <div>
      <section className="bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-brightness-50">
          <div className="max-w-6xl mx-auto px-4 py-28 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">We Build. You Thrive.</h1>
            <p className="max-w-2xl text-lg opacity-90">From residential to commercial, our team delivers safe, on-time, and cost-effective construction solutions.</p>
            <div className="mt-8 flex gap-3">
              <a href="#services" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-3 rounded-md">Explore Services</a>
              <a href="#contact" className="border border-white hover:bg-white hover:text-black font-semibold px-5 py-3 rounded-md">Get a Quote</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Residential Construction', desc: 'Custom homes, renovations, and additions with premium craftsmanship.' },
            { title: 'Commercial Projects', desc: 'Office spaces, retail units, and industrial facilities delivered at scale.' },
            { title: 'Project Management', desc: 'End‑to‑end planning, budgeting, and on‑site quality control.' },
          ].map((s) => (
            <div key={s.title} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Us</h2>
          <form className="grid gap-4 max-w-xl">
            <input className="border rounded px-3 py-2" placeholder="Your Name" />
            <input className="border rounded px-3 py-2" placeholder="Email" />
            <textarea className="border rounded px-3 py-2" placeholder="Project details" rows="4" />
            <button type="button" className="bg-slate-800 text-white px-4 py-2 rounded">Send</button>
          </form>
        </div>
      </section>
    </div>
  )
}

function Services() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">Services</h2>
      <p className="text-slate-600 max-w-3xl">We specialize in turnkey design and build, interior finishes, and sustainable construction practices.</p>
    </div>
  )
}

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p className="text-slate-600">Reach us at contact@knotbuild.example or call +1 (555) 123‑4567.</p>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    try {
      const { token } = await apiLogin(email, password)
      login(token)
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Sign in</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input name="email" className="border rounded px-3 py-2" placeholder="Email" />
        <input name="password" className="border rounded px-3 py-2" placeholder="Password" type="password" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Sign in</button>
        <Link to="/forgot" className="text-sm text-slate-600 underline">Forgot password?</Link>
        <p className="text-sm text-slate-600">No account? <Link to="/signup" className="underline">Create one</Link></p>
      </form>
    </div>
  )
}

function Signup() {
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    try {
      await apiSignUp(email, password)
      alert('Account created. Check email (simulated)')
      navigate('/login')
    } catch (err) {
      alert('Sign up failed')
    }
  }
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Create account</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input name="email" className="border rounded px-3 py-2" placeholder="Email" />
        <input name="password" className="border rounded px-3 py-2" placeholder="Password" type="password" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Sign up</button>
      </form>
    </div>
  )
}

function Forgot() {
  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    try {
      await apiForgot(email)
      alert('If the email exists, a reset link has been sent (simulated).')
    } catch (err) {
      alert('Request failed')
    }
  }
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Forgot password</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input name="email" className="border rounded px-3 py-2" placeholder="Email" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Send reset</button>
      </form>
    </div>
  )
}

function ProtectedPage() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-slate-600">This protected content is visible only when signed in.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

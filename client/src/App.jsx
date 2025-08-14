// App pages, router, and responsive navigation
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { login as apiLogin, signUp as apiSignUp, forgot as apiForgot, sendContact, me as apiMe, userExists as apiUserExists, resetPassword as apiReset } from './api'
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
          {/* Desktop nav (visible md and up). Active links are underlined. */}
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
          {/* Hamburger button for small screens */}
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
      {/* Mobile sidebar drawer with overlay */}
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
  // Home no longer has contact form
  return (
    <div>
      <section className="bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-brightness-50">
          <div className="max-w-6xl mx-auto px-4 py-28 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">We Build. You Thrive.</h1>
            <p className="max-w-2xl text-lg opacity-90">From residential to commercial, our team delivers safe, on-time, and cost-effective construction solutions.</p>
            <div className="mt-8 flex gap-3">
              <a href="#services" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-3 rounded-md">Explore Services</a>
              <Link to="/contact" className="border border-white hover:bg-white hover:text-black font-semibold px-5 py-3 rounded-md">Get a Quote</Link>
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

      <section id="about" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">About Us</h2>
              <p className="text-slate-600 mt-3">KnotBuild Co. is a full‑service construction partner serving residential and commercial clients. We combine disciplined project management with skilled craftsmanship to deliver on quality, safety, and schedule.</p>
              <ul className="mt-5 space-y-3">
                {[
                  '15+ years in operation across the metro area',
                  'Licensed, insured, and safety‑first culture',
                  'Dedicated project managers and vetted trade partners',
                  'Transparent pricing and weekly progress updates',
                ].map(point => (
                  <li key={point} className="flex items-start gap-2 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600 mt-0.5">
                      <path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.28-2.28a.75.75 0 00-1.06-1.06L10.5 13.63l-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl font-bold">250+</div>
                <div className="text-xs text-slate-500 mt-1">Projects Delivered</div>
              </div>
              <div className="bg-white border rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs text-slate-500 mt-1">On‑time Rate</div>
              </div>
              <div className="bg-white border rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-xs text-slate-500 mt-1">Client Rating</div>
              </div>
              <div className="bg-white border rounded-xl p-5 text-center shadow-sm sm:col-span-3">
                <div className="text-sm text-slate-600">“They managed our timeline flawlessly and delivered exceptional quality.” — Satisfied Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Dummy catalog for the Services page
const SERVICES = [
  {
    title: 'Residential Construction',
    desc: 'Custom homes, renovations, and additions crafted to exact specifications.',
    icon: '🏠',
    price: 'From $25k',
    features: ['Custom design', 'Energy‑efficient materials', 'Permit assistance'],
  },
  {
    title: 'Commercial Build‑Outs',
    desc: 'Fit‑outs and remodels for offices, retail, and hospitality spaces.',
    icon: '🏢',
    price: 'From $40k',
    features: ['Fast‑track scheduling', 'Code compliance', 'Tenant coordination'],
  },
  {
    title: 'Project Management',
    desc: 'End‑to‑end planning, budgeting, and on‑site quality control.',
    icon: '📋',
    price: 'By quote',
    features: ['Budget tracking', 'Risk mitigation', 'Weekly reporting'],
  },
  {
    title: 'Structural Repairs',
    desc: 'Foundation, framing, and reinforcement by certified specialists.',
    icon: '🧱',
    price: 'From $7k',
    features: ['Engineered solutions', 'Warranty included', 'Municipal inspections'],
  },
  {
    title: 'Exterior & Roofing',
    desc: 'Roofing, siding, and facade work with durable warranties.',
    icon: '🛠️',
    price: 'From $5k',
    features: ['Licensed installers', 'Storm‑resistant options', 'Maintenance plans'],
  },
  {
    title: 'Green Building',
    desc: 'Sustainable materials and methods to lower lifetime costs.',
    icon: '🌿',
    price: 'By quote',
    features: ['LEED‑aligned choices', 'Solar readiness', 'Water savings'],
  },
]

function Services() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
        <p className="text-slate-600 mt-2 max-w-3xl">Transparent pricing, skilled crews, and on‑time delivery. Choose a package or request a custom quote tailored to your project.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <div key={s.title} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{s.icon}</div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{s.price}</span>
              </div>
              <p className="text-slate-600 mt-2 text-sm">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                      <path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.28-2.28a.75.75 0 00-1.06-1.06L10.5 13.63l-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 border-t bg-slate-50">
              <button className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700">Get quote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const [sending, setSending] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    if (sending) return
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      details: fd.get('details'),
    }
    try {
      setSending(true)
      const res = await sendContact(payload)
      if (res && (res.success === true)) {
        alert(res.message || 'Request sent. We will contact you shortly.')
        e.currentTarget.reset()
        return
      }
      alert('Failed to send request')
    } catch (err) {
      alert('Failed to send request')
    } finally {
      setSending(false)
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Tell us about your project. Our team will respond within one business day.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border rounded-xl shadow-sm p-6 grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Your name" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" required type="email" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="(555) 123‑4567" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project details</label>
            <textarea name="details" required rows="5" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Tell us about scope, timeline, and budget..." />
          </div>
          <div className="flex items-center gap-3">
            <input id="agree" type="checkbox" className="h-4 w-4" />
            <label htmlFor="agree" className="text-sm text-slate-600">I agree to be contacted about my request.</label>
          </div>
          <button type="submit" disabled={sending} className={`px-4 py-2 rounded-md text-white w-fit ${sending ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`}>{sending ? 'Sending...' : 'Send request'}</button>
        </form>
        {/* Info */}
        <div className="grid gap-4 content-start">
          <div className="bg-slate-50 border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Office</h3>
            <p className="text-slate-600 text-sm">123 Build Ave, Suite 400, Your City, ST 00000</p>
            <div className="mt-3 text-sm">
              <div>Phone: <a className="underline" href="tel:+15551234567">+1 (555) 123‑4567</a></div>
              <div>Email: <a className="underline" href="mailto:contact@knotbuild.example">contact@knotbuild.example</a></div>
              <div className="mt-2 text-slate-600">Mon‑Fri: 9am‑6pm</div>
            </div>
          </div>
          <div className="bg-slate-50 border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Service Areas</h3>
            <p className="text-slate-600 text-sm">Metro region and surrounding counties. Travel beyond by request.</p>
          </div>
          <div className="bg-slate-100 border rounded-xl h-64 overflow-hidden">
            <iframe
              title="Office location"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.98%2C40.72&layer=mapnik&marker=40.7128%2C-74.0060"
            />
          </div>
        </div>
      </div>
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
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const email = form.get('email')
    const password = form.get('password')
    try {
      await apiSignUp(firstName, lastName, email, password)
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
        <div className="grid grid-cols-2 gap-3">
          <input name="firstName" className="border rounded px-3 py-2" placeholder="First name" />
          <input name="lastName" className="border rounded px-3 py-2" placeholder="Last name" />
        </div>
        <input name="email" className="border rounded px-3 py-2" placeholder="Email" />
        <input name="password" className="border rounded px-3 py-2" placeholder="Password" type="password" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Sign up</button>
      </form>
    </div>
  )
}

function Forgot() {
  const [sending, setSending] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [presetEmail, setPresetEmail] = useState('')
  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    try {
      setSending(true)
      const exists = await apiUserExists(email)
      if (exists?.exists) {
        setPresetEmail(email)
        setShowReset(true)
      }
      await apiForgot(email)
      if (!exists?.exists) alert('If the email exists, a reset link has been sent (simulated).')
    } catch (err) {
      alert('Request failed')
    } finally {
      setSending(false)
    }
  }
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Forgot password</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input name="email" className="border rounded px-3 py-2" placeholder="Email" />
        <button disabled={sending} className={`px-4 py-2 rounded text-white ${sending ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`}>{sending ? 'Checking...' : 'Send reset'}</button>
      </form>
      {showReset && (
        <div className="mt-8 border rounded-xl p-4 bg-slate-50">
          <h3 className="font-semibold mb-2">Set a new password</h3>
          <Reset presetEmail={presetEmail} />
        </div>
      )}
    </div>
  )
}

function Reset({ presetEmail = '' }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    try {
      setLoading(true)
      const res = await apiReset(email, password)
      if (res?.success) {
        alert('Password reset successful. You can sign in now.')
        navigate('/login')
      } else {
        alert('Reset failed')
      }
    } catch (err) {
      alert('Reset failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <input name="email" defaultValue={presetEmail} className="border rounded px-3 py-2" placeholder="Email" />
      <input name="password" className="border rounded px-3 py-2" placeholder="New password" type="password" />
      <button disabled={loading} className={`px-4 py-2 rounded text-white ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`}>{loading ? 'Updating...' : 'Reset password'}</button>
    </form>
  )
}
function ProtectedPage() {
  const { isAuthenticated, isHydrated, token } = useAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      if (!token) return
      try {
        const data = await apiMe(token)
        if (isMounted) setUser(data)
      } catch (e) {
        if (isMounted) setUser(null)
      }
    }
    load()
    return () => { isMounted = false }
  }, [token])

  if (!isHydrated) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />

  const recentProjects = [
    { id: 'PRJ-1042', name: 'Lakeview Residence Remodel', status: 'In Progress', eta: 'Oct 28' },
    { id: 'PRJ-1037', name: 'Westside Retail Fit‑Out', status: 'Inspections', eta: 'Nov 05' },
    { id: 'PRJ-1029', name: 'Riverside Office Upgrade', status: 'Completed', eta: '—' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-8 bg-slate-50 border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-1">Welcome{user?.email ? `, ${user.email}` : ''}</h2>
        <p className="text-slate-600 text-sm">Your project overview and account information.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="text-xs text-slate-500">Projects Active</div>
          <div className="text-3xl font-semibold mt-1">3</div>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="text-xs text-slate-500">Completed This Month</div>
          <div className="text-3xl font-semibold mt-1">5</div>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="text-xs text-slate-500">New Messages</div>
          <div className="text-3xl font-semibold mt-1">2</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border rounded-xl shadow-sm lg:col-span-2">
          <div className="p-5 border-b">
            <h3 className="font-semibold">Recent Projects</h3>
          </div>
          <ul className="divide-y">
            {recentProjects.map((p) => (
              <li key={p.id} className="p-5 flex items-center justify-between">
      <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">ID: {p.id}</div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">{p.status}</span>
                  <span className="text-slate-500">ETA: {p.eta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid gap-3">
            <Link to="/services" className="w-full text-center bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700">Explore Services</Link>
            <Link to="/contact" className="w-full text-center border py-2 rounded-md hover:bg-slate-50">Request a Quote</Link>
          </div>
          <div className="mt-6 text-xs text-slate-500">Need help? Email <a className="underline" href="mailto:contact@knotbuild.example">contact@knotbuild.example</a></div>
        </div>
      </div>

      {/* Our Services inside dashboard */}
      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Our Services</h3>
          <Link to="/services" className="text-sm underline">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((s) => (
            <div key={s.title} className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{s.icon}</div>
                    <h4 className="font-semibold">{s.title}</h4>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{s.price}</span>
                </div>
                <p className="text-slate-600 mt-2 text-sm line-clamp-2">{s.desc}</p>
              </div>
              <div className="p-5 border-t bg-slate-50">
                <button className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700">Get quote</button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

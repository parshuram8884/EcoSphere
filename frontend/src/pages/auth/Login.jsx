import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, fetchMe } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import heroImage from '../../assets/hero.png'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await loginUser(username, password)

    if (result.success) {
      // Fetch user profile after login
      const userData = await fetchMe()
      if (userData) {
        login(userData)
      }
      navigate('/dashboard/overview')
    } else {
      // SimpleJWT returns { detail: "..." } on failure
      setError(result.errors?.detail || 'Invalid credentials. Please try again.')
    }

    setSubmitting(false)
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-overlay">
            <div className="auth-brand-chip">
              <span className="auth-brand-mark">Q</span>
              <span>EcoSphere ESG</span>
            </div>

            <div className="auth-visual-copy">
              <p className="auth-eyebrow">Precise. Vital. Institutional.</p>
              <h1>Enterprise SaaS ESG Analytics Platform Dashboard</h1>
              <p>
                The global standard for ESG data orchestration and sustainability reporting.
              </p>
            </div>

            <div className="auth-visual-links">
              <span>Audit Ready</span>
              <span>Real-Time Analytics</span>
            </div>
          </div>

          <img src={heroImage} alt="ESG analytics dashboard preview" className="auth-visual-image" />
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="auth-logo-row">
              <span className="auth-logo-dot" />
            </div>

            <div className="auth-heading-block">
              <h2>Welcome back</h2>
              <p>Enter your credentials to access your ESG dashboard.</p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Username</span>
                <input
                  type="text"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <div className="auth-row auth-row-between">
                <label className="auth-check">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a href="#" className="auth-link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in to Platform'} <span aria-hidden="true">→</span>
              </button>

              <p className="auth-signup">
                Don&apos;t have an account? <Link to="/auth/register">Sign up</Link>
              </p>
            </form>

            <footer className="auth-footer">
              <span>© 2024 EcoSphere ESG</span>
              <div>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Security</a>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </main>
  )
}

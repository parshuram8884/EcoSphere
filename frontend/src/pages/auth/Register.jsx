import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import heroImage from '../../assets/hero.png'
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: 'employee',
    department: '',
    password: '',
    confirm_password: '',
  })
  const [departments, setDepartments] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  // Fetch departments from backend (public-friendly fallback)
  useEffect(() => {
    async function loadDepartments() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/settings/departments/')
        if (res.ok) {
          const data = await res.json()
          setDepartments(data)
        }
      } catch {
        // Silently fail – departments will be optional
      }
    }
    loadDepartments()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})

    if (!agreed) {
      setErrors({ agree: 'You must agree to the Terms of Service.' })
      return
    }

    setSubmitting(true)

    const payload = {
      ...form,
      department: form.department ? parseInt(form.department) : null,
    }

    const result = await registerUser(payload)

    if (result.success) {
      login(result.data.user)
      navigate('/dashboard/overview')
    } else {
      setErrors(result.errors || { general: 'Registration failed. Please try again.' })
    }

    setSubmitting(false)
  }

  // Flatten errors for display
  function getError(field) {
    const err = errors[field]
    if (Array.isArray(err)) return err[0]
    if (typeof err === 'string') return err
    return null
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <aside className="register-visual">
          <div className="register-pattern" />

          <div className="register-visual-overlay">
            <div className="register-brand-chip">
              <span className="register-brand-mark">Q</span>
              <span>EcoSphere ESG</span>
            </div>

            <div className="register-copy-block">
              <p className="register-kicker">Driving Sustainable Growth</p>
              <h1>Enterprise-grade ESG analytics designed for precision.</h1>
              <p>
                Build a sustainable operating model with audit-ready reporting, team collaboration, and live ESG
                visibility across the organization.
              </p>
            </div>

            <div className="register-poster">
              <img src={heroImage} alt="ESG analytics dashboard preview" className="register-poster-image" />
              <div className="register-poster-caption">
                <h2>Carbon Footprint Analysis</h2>
                <p>Monitor emissions, targets, and sustainability scorecards from one place.</p>
              </div>
            </div>

            <div className="register-badges">
              <span>ISO Ready</span>
              <span>Trusted by Sustainability Teams</span>
            </div>
          </div>
        </aside>

        <div className="register-form-panel">
          <div className="register-form-card">
            <div className="register-heading-block">
              <h2>Create your account</h2>
              <p>Start managing your ESG data with institutional precision.</p>
            </div>

            {(errors.general || errors.non_field_errors) && (
              <div className="auth-error">
                {errors.general || (Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors)}
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-grid-2">
                <label className="register-field">
                  <span>Username</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="john_doe"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                  {getError('username') && <small className="field-error">{getError('username')}</small>}
                </label>

                <label className="register-field">
                  <span>Organization Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {getError('email') && <small className="field-error">{getError('email')}</small>}
                </label>
              </div>

              <div className="register-grid-2">
                <label className="register-field">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </label>

                <label className="register-field">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="register-grid-2">
                <label className="register-field">
                  <span>Role</span>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="employee">Employee</option>
                    <option value="dept_head">Department Head</option>
                    <option value="esg_manager">ESG Manager</option>
                    <option value="compliance_officer">Compliance Officer</option>
                    <option value="executive">Executive</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </label>

                <label className="register-field">
                  <span>Department</span>
                  <select name="department" value={form.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="register-grid-2">
                <label className="register-field">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  {getError('password') && <small className="field-error">{getError('password')}</small>}
                </label>

                <label className="register-field">
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="••••••••"
                    value={form.confirm_password}
                    onChange={handleChange}
                    required
                  />
                  {getError('confirm_password') && <small className="field-error">{getError('confirm_password')}</small>}
                </label>
              </div>

              <label className="register-check">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </span>
              </label>
              {getError('agree') && <small className="field-error">{getError('agree')}</small>}

              <button type="submit" className="register-submit" disabled={submitting}>
                {submitting ? 'Creating Account…' : 'Create Account'}
              </button>

              <p className="register-signin">
                Already have an account? <Link to="/auth/login">Sign in</Link>
              </p>
            </form>

            <footer className="register-footer">
              <span>© 2024 EcoSphere ESG</span>
              <div>
                <a href="#">Installation Guide</a>
                <a href="#">Security</a>
                <a href="#">Support</a>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </main>
  )
}

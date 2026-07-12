import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero.png'
import './Login.css'

export default function Login() {
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

            <form className="auth-form">
              <label className="auth-field">
                <span>Corporate Email</span>
                <input type="email" placeholder="name@company.com" />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input type="password" placeholder="••••••••" />
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

              <button type="submit" className="auth-submit">
                Sign in to Platform <span aria-hidden="true">→</span>
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

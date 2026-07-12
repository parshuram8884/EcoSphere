import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero.png'
import './Register.css'

export default function Register() {
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

            <form className="register-form">
              <div className="register-grid-2">
                <label className="register-field">
                  <span>Company Name</span>
                  <input type="text" placeholder="Acme Corp" />
                </label>

                <label className="register-field">
                  <span>Organization Email</span>
                  <input type="email" placeholder="name@company.com" />
                </label>
              </div>

              <div className="register-grid-2">
                <label className="register-field">
                  <span>Full Name</span>
                  <input type="text" placeholder="John Doe" />
                </label>

                <label className="register-field">
                  <span>Role</span>
                  <input type="text" placeholder="Sustainability Manager" />
                </label>
              </div>

              <label className="register-field">
                <span>Department</span>
                <select defaultValue="">
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="operations">Operations</option>
                  <option value="sustainability">Sustainability</option>
                  <option value="finance">Finance</option>
                  <option value="technology">Technology</option>
                </select>
              </label>

              <div className="register-grid-2">
                <label className="register-field">
                  <span>Password</span>
                  <input type="password" placeholder="••••••••" />
                </label>

                <label className="register-field">
                  <span>Confirm Password</span>
                  <input type="password" placeholder="••••••••" />
                </label>
              </div>

              <label className="register-check">
                <input type="checkbox" />
                <span>
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </span>
              </label>

              <button type="submit" className="register-submit">
                Create Account
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

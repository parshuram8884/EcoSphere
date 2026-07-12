import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-topbar">
        <div className="landing-brand">
          <span className="landing-brand-mark">Q</span>
          <div>
            <strong>Quantum ESG</strong>
            <span>Enterprise analytics platform</span>
          </div>
        </div>

        <nav className="landing-nav" aria-label="Primary">
          <a href="#features">Automations</a>
          <a href="#overview">Resources</a>
          <a href="#analytics">Analytics</a>
          <a href="#blog">Blog</a>
        </nav>

        <div className="landing-actions">
          <Link to="/reports/esg-summary" className="landing-button landing-button-primary">
            Generate Report
          </Link>
          <Link to="/auth/login" className="landing-avatar-link" aria-label="Open sign in">
            <span className="landing-avatar">ES</span>
          </Link>
        </div>
      </header>

      <section className="landing-hero" id="overview">
        <div className="landing-hero-copy">
          <p className="landing-kicker">Enterprise SaaS ESG analytics</p>
          <h1>ESG Analytics SaaS Platform Dashboard</h1>
          <p className="landing-summary">
            A polished command center for emissions, social programs, governance controls, and reporting workflows.
          </p>

          <div className="landing-cta-row">
            <Link to="/reports/custom-report-builder" className="landing-button landing-button-primary">
              Generate Report
            </Link>
            <Link to="/dashboard/overview" className="landing-button landing-button-secondary">
              View Details
            </Link>
          </div>
        </div>

        <div className="landing-hero-visual">
          <img src={heroImage} alt="ESG analytics dashboard preview" />
        </div>
      </section>

      <section className="landing-showcase" id="analytics">
        <div className="landing-dashboard-card">
          <div className="landing-card-header">
            <div>
              <p className="landing-card-label">ESG Performance Overview</p>
              <h2>Snapshot reporting across the full platform</h2>
            </div>
            <span className="landing-pill">Quantum ESG</span>
          </div>

          <div className="landing-card-grid">
            <article className="landing-metric-card">
              <span>Scope 1 + 2 Emissions</span>
              <strong>4,250 tons</strong>
              <div className="landing-sparkline" />
            </article>
            <article className="landing-metric-card landing-metric-card-ring">
              <span>Sustainability Score</span>
              <strong>87/100</strong>
              <div className="landing-ring">
                <div>
                  <small>Score</small>
                  <strong>87</strong>
                </div>
              </div>
            </article>
            <article className="landing-metric-card">
              <span>ESG Coverage</span>
              <strong>94%</strong>
              <div className="landing-bar-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>
          </div>
        </div>

        <aside className="landing-feature-panel">
          <div className="landing-feature-visual">
            <div className="landing-feature-orb" />
            <div className="landing-feature-pod">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="landing-feature-copy">
            <p className="landing-kicker">Driving sustainable growth</p>
            <h2>Carbon Footprint Analysis</h2>
            <p>
              High-signal ESG reporting for teams that need a premium control surface for energy, carbon, compliance,
              and disclosure workflows.
            </p>
            <Link to="/reports/environmental-report" className="landing-button landing-button-secondary">
              View Details
            </Link>
          </div>
        </aside>
      </section>

      <section className="landing-meta" id="features">
        <article>
          <strong>9</strong>
          <span>core modules</span>
        </article>
        <article>
          <strong>39</strong>
          <span>route screens</span>
        </article>
        <article>
          <strong>Live</strong>
          <span>navigation ready</span>
        </article>
      </section>
    </main>
  )
}
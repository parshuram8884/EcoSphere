import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

export default function LandingPage() {
  return (
    <main className="landing-page">
      {/* ── Top Navigation Bar ── */}
      <header className="landing-topbar">
        <div className="landing-brand">
          <span className="landing-brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06111d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="M7.5 12.5l3 3 6-6"/>
            </svg>
          </span>
          <div>
            <strong>EcoSphere</strong>
            <span>ESG Management Platform</span>
          </div>
        </div>

        <nav className="landing-nav" aria-label="Primary">
          <Link to="/environmental/dashboard">Environmental</Link>
          <Link to="/social/csr-activities">Social</Link>
          <Link to="/governance/policies">Governance</Link>
          <Link to="/gamification/challenges">Gamification</Link>
          <Link to="/reports/esg-summary">Reports</Link>
        </nav>

        <div className="landing-actions">
          <Link to="/auth/register" className="landing-button landing-button-primary">
            Get Started
          </Link>
          <Link to="/auth/login" className="landing-avatar-link" aria-label="Sign in">
            <span className="landing-avatar">ES</span>
          </Link>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="landing-hero" id="overview">
        <div className="landing-hero-copy">
          <p className="landing-kicker">Integrated ESG Intelligence</p>
          <h1>Environmental &#183; Social &#183; Governance &#183; Gamification</h1>
          <p className="landing-summary">
            Bring sustainability reporting into everyday operations — track carbon emissions, 
            drive employee participation, maintain compliance, and engage your workforce through 
            gamified challenges — all in a single unified platform.
          </p>

          <div className="landing-cta-row">
            <Link to="/dashboard/overview" className="landing-button landing-button-primary">
              Explore Dashboard
            </Link>
            <Link to="/reports/custom-report-builder" className="landing-button landing-button-secondary">
              Generate Report
            </Link>
          </div>
        </div>

        <div className="landing-hero-visual">
          <img src={heroImage} alt="EcoSphere ESG dashboard preview" />
        </div>
      </section>

      {/* ── Four Pillars Showcase ── */}
      <section className="landing-showcase" id="features">
        <div className="landing-dashboard-card">
          <div className="landing-card-header">
            <div>
              <p className="landing-card-label">The Four Pillars</p>
              <h2>Everything you need for complete ESG management</h2>
            </div>
            <span className="landing-pill">EcoSphere</span>
          </div>

          <div className="landing-card-grid">
            {/* Environmental */}
            <article className="landing-metric-card" style={{ minHeight: 200 }}>
              <div className="landing-pillar-icon" style={{ background: 'rgba(52, 211, 153, 0.15)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5-4 8-10 8S2 17 2 12a10 10 0 0 1 10-10z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <strong className="landing-pillar-title">Environmental</strong>
              <p className="landing-pillar-desc">
                Carbon accounting, emission tracking, sustainability goals, 
                and automated CO₂ calculations from daily operations.
              </p>
              <Link to="/environmental/dashboard" className="landing-pillar-link">
                Explore &rarr;
              </Link>
            </article>

            {/* Social */}
            <article className="landing-metric-card" style={{ minHeight: 200 }}>
              <div className="landing-pillar-icon" style={{ background: 'rgba(96, 165, 250, 0.15)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <strong className="landing-pillar-title">Social</strong>
              <p className="landing-pillar-desc">
                CSR activities, employee participation, diversity metrics, 
                and training completion tracking for workforce engagement.
              </p>
              <Link to="/social/csr-activities" className="landing-pillar-link">
                Explore &rarr;
              </Link>
            </article>

            {/* Governance */}
            <article className="landing-metric-card" style={{ minHeight: 200 }}>
              <div className="landing-pillar-icon" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <strong className="landing-pillar-title">Governance</strong>
              <p className="landing-pillar-desc">
                ESG policies, acknowledgements, internal audits, 
                compliance issue tracking with severity and due-date management.
              </p>
              <Link to="/governance/policies" className="landing-pillar-link">
                Explore &rarr;
              </Link>
            </article>
          </div>
        </div>

        <aside className="landing-feature-panel">
          <div className="landing-feature-visual">
            <div className="landing-feature-orb" />
            <div className="landing-feature-pod">
              <span style={{ background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.36), rgba(10, 18, 30, 0.88))', borderColor: 'rgba(251, 191, 36, 0.25)' }} />
              <span style={{ background: 'linear-gradient(180deg, rgba(52, 211, 153, 0.36), rgba(10, 18, 30, 0.88))', borderColor: 'rgba(52, 211, 153, 0.25)' }} />
              <span style={{ background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.36), rgba(10, 18, 30, 0.88))', borderColor: 'rgba(96, 165, 250, 0.25)' }} />
            </div>
          </div>
          <div className="landing-feature-copy">
            <p className="landing-kicker">Gamified Engagement</p>
            <h2>XP &#183; Badges &#183; Leaderboards &#183; Rewards</h2>
            <p>
              Drive sustainability participation through gamification. Employees earn XP by completing 
              challenges and CSR activities, unlock badges, climb department and organization-wide 
              leaderboards, and redeem rewards — turning ESG compliance into an engaging experience.
            </p>
            <Link to="/gamification/challenges" className="landing-button landing-button-secondary">
              View Challenges
            </Link>
          </div>
        </aside>
      </section>

      {/* ── Platform Stats ── */}
      <section className="landing-meta" id="about">
        <article>
          <strong>4</strong>
          <span>ESG pillars</span>
        </article>
        <article>
          <strong>9</strong>
          <span>integrated modules</span>
        </article>
        <article>
          <strong>6</strong>
          <span>user roles</span>
        </article>
        <article>
          <strong>Real-time</strong>
          <span>scoring engine</span>
        </article>
        <article>
          <strong>Multi-format</strong>
          <span>report exports</span>
        </article>
        <article>
          <strong>Gamified</strong>
          <span>engagement layer</span>
        </article>
      </section>
    </main>
  )
// }
// import { Link } from 'react-router-dom'
// import heroImage from '../assets/hero.png'

// export default function LandingPage() {
//   return (
//     <main className="landing-page">
//       <header className="landing-topbar">
//         <div className="landing-brand">
//           <span className="landing-brand-mark">Q</span>
//           <div>
//             <strong>Quantum ESG</strong>
//             <span>Enterprise analytics platform</span>
//           </div>
//         </div>

//         <nav className="landing-nav" aria-label="Primary">
//           <a href="#features">Automations</a>
//           <a href="#overview">Resources</a>
//           <a href="#analytics">Analytics</a>
//           <a href="#blog">Blog</a>
//         </nav>

//         <div className="landing-actions">
//           <Link to="/reports/esg-summary" className="landing-button landing-button-primary">
//             Generate Report
//           </Link>
//           <Link to="/auth/login" className="landing-avatar-link" aria-label="Open sign in">
//             <span className="landing-avatar">ES</span>
//           </Link>
//         </div>
//       </header>

//       <section className="landing-hero" id="overview">
//         <div className="landing-hero-copy">
//           <p className="landing-kicker">Enterprise SaaS ESG analytics</p>
//           <h1>ESG Analytics SaaS Platform Dashboard</h1>
//           <p className="landing-summary">
//             A polished command center for emissions, social programs, governance controls, and reporting workflows.
//           </p>

//           <div className="landing-cta-row">
//             <Link to="/reports/custom-report-builder" className="landing-button landing-button-primary">
//               Generate Report
//             </Link>
//             <Link to="/dashboard/overview" className="landing-button landing-button-secondary">
//               View Details
//             </Link>
//           </div>
//         </div>

//         <div className="landing-hero-visual">
//           <img src={heroImage} alt="ESG analytics dashboard preview" />
//         </div>
//       </section>

//       <section className="landing-showcase" id="analytics">
//         <div className="landing-dashboard-card">
//           <div className="landing-card-header">
//             <div>
//               <p className="landing-card-label">ESG Performance Overview</p>
//               <h2>Snapshot reporting across the full platform</h2>
//             </div>
//             <span className="landing-pill">Quantum ESG</span>
//           </div>

//           <div className="landing-card-grid">
//             <article className="landing-metric-card">
//               <span>Scope 1 + 2 Emissions</span>
//               <strong>4,250 tons</strong>
//               <div className="landing-sparkline" />
//             </article>
//             <article className="landing-metric-card landing-metric-card-ring">
//               <span>Sustainability Score</span>
//               <strong>87/100</strong>
//               <div className="landing-ring">
//                 <div>
//                   <small>Score</small>
//                   <strong>87</strong>
//                 </div>
//               </div>
//             </article>
//             <article className="landing-metric-card">
//               <span>ESG Coverage</span>
//               <strong>94%</strong>
//               <div className="landing-bar-chart">
//                 <span />
//                 <span />
//                 <span />
//                 <span />
//                 <span />
//                 <span />
//               </div>
//             </article>
//           </div>
//         </div>

//         <aside className="landing-feature-panel">
//           <div className="landing-feature-visual">
//             <div className="landing-feature-orb" />
//             <div className="landing-feature-pod">
//               <span />
//               <span />
//               <span />
//             </div>
//           </div>
//           <div className="landing-feature-copy">
//             <p className="landing-kicker">Driving sustainable growth</p>
//             <h2>Carbon Footprint Analysis</h2>
//             <p>
//               High-signal ESG reporting for teams that need a premium control surface for energy, carbon, compliance,
//               and disclosure workflows.
//             </p>
//             <Link to="/reports/environmental-report" className="landing-button landing-button-secondary">
//               View Details
//             </Link>
//           </div>
//         </aside>
//       </section>

//       <section className="landing-meta" id="features">
//         <article>
//           <strong>9</strong>
//           <span>core modules</span>
//         </article>
//         <article>
//           <strong>39</strong>
//           <span>route screens</span>
//         </article>
//         <article>
//           <strong>Live</strong>
//           <span>navigation ready</span>
//         </article>
//       </section>
//     </main>
//   )
// }
}
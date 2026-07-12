import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar.jsx'
import './GovernanceLayout.css'

export default function GovernanceLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Determine active tab class
  const getTabClass = (path) => {
    return location.pathname === path ? 'layout-tab-link layout-tab-link-active' : 'layout-tab-link'
  }

  const user = {
    name: 'Marcus Thome',
    role: 'Compliance Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80',
    goalPct: 92,
    goalText: 'Audit Readiness'
  }

  return (
    <div className="governance-layout-wrapper">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="layout-sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Shared Left Sidebar */}
      <aside className={`layout-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="layout-brand">
          <div className="layout-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="layout-brand-text">
            <strong>EcoSphere</strong>
            <p>ESG Platform</p>
          </div>
          <button 
            type="button" 
            className="layout-sidebar-close" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <Navbar onLinkClick={() => setIsSidebarOpen(false)} />

        {/* Dynamic Quarterly/Impact Goal */}
        <div className="layout-impact-goal">
          <div className="layout-goal-header">
            <span className="layout-goal-title">Impact Goal</span>
            <span className="layout-goal-pct">{user.goalPct}%</span>
          </div>
          <div className="layout-progress-track">
            <div className="layout-progress-bar" style={{ width: `${user.goalPct}%` }}></div>
          </div>
          <div className="layout-goal-label">{user.goalText}</div>
        </div>

        {/* User Card */}
        <div className="layout-user-card">
          <img className="layout-user-avatar" src={user.avatar} alt={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>
      </aside>

      {/* Layout Content Workspace */}
      <section className="layout-content-wrapper">
        {/* Shared Topbar */}
        <header className="layout-topbar">
          <div className="layout-topbar-left">
            <button 
              type="button" 
              className="layout-menu-toggle" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="gov-page-title-label">Governance</h1>
          </div>

          <div className="layout-topbar-right">
            <button type="button" className="layout-notif-btn" aria-label="Notifications">
              🔔
              <span className="layout-notif-badge"></span>
            </button>

            <div className="layout-topbar-user">
              <div className="layout-topbar-user-info">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
              <img 
                className="layout-topbar-user-avatar" 
                src={user.avatar} 
                alt={user.name} 
              />
            </div>
          </div>
        </header>

        {/* Subnavigation Tabs */}
        <nav className="layout-tabs" aria-label="Governance subnavigation tabs">
          <Link to="/governance/policies" className={getTabClass('/governance/policies')}>Policies</Link>
          <Link to="/governance/policy-acknowledgements" className={getTabClass('/governance/policy-acknowledgements')}>Acknowledgements</Link>
          <Link to="/governance/audits" className={getTabClass('/governance/audits')}>Audits</Link>
          <Link to="/governance/compliance-issues" className={getTabClass('/governance/compliance-issues')}>Compliance</Link>
        </nav>

        {/* Renders the specific sub-page view content */}
        <Outlet />
      </section>
    </div>
  )
}

import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar.jsx'
import './AdministrationLayout.css'

export default function AdministrationLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Determine active tab class
  const getTabClass = (path) => {
    return location.pathname === path ? 'layout-tab-link layout-tab-link-active' : 'layout-tab-link'
  }

  const user = {
    name: 'Marcus Thome',
    role: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80',
    goalPct: 100,
    goalText: 'System Uptime  '
  }

  return (
    <div className="admin-layout-wrapper">
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

        {/* Uptime Goal */}
        <div className="layout-impact-goal">
          <div className="layout-goal-header">
            <span className="layout-goal-title">System Health</span>
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
            <h1 className="admin-page-title-label">System Control Administration</h1>
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
        <nav className="layout-tabs" aria-label="Administration subnavigation tabs">
          <Link to="/administration/users" className={getTabClass('/administration/users')}>Users</Link>
          <Link to="/administration/departments" className={getTabClass('/administration/departments')}>Departments</Link>
          <Link to="/administration/categories" className={getTabClass('/administration/categories')}>Categories</Link>
          <Link to="/administration/esg-settings" className={getTabClass('/administration/esg-settings')}>ESG Settings</Link>
          <Link to="/administration/notification-settings" className={getTabClass('/administration/notification-settings')}>Notification Settings</Link>
          <Link to="/administration/feature-toggles" className={getTabClass('/administration/feature-toggles')}>Feature Toggles</Link>
        </nav>

        {/* Renders the specific sub-page view content */}
        <Outlet />
      </section>
    </div>
  )
}

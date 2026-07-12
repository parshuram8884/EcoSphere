import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar.jsx'
import { useAuth } from '../../context/AuthContext'
import { downloadReport } from '../../services/api'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Determine active tab
  const getTabClass = (path) => {
    return location.pathname === path ? 'layout-tab-link layout-tab-link-active' : 'layout-tab-link'
  }

  // Customize header/sidebar content slightly based on route (optional details from screenshot)
  const isOverviewOrAnalytics = location.pathname.includes('overview') || location.pathname.includes('analytics')
  const { user: authUser, logout } = useAuth()
  const navigate = useNavigate()
  const [exporting, setExporting] = useState(false)

  const user = {
    name: authUser ? `${authUser.first_name || ''} ${authUser.last_name || ''}`.trim() || authUser.username : 'Guest',
    role: authUser?.role?.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80',
    goalPct: 78,
    goalText: 'of Net Zero Target reached'
  }

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  const handleExport = async (format = 'pdf') => {
    setExporting(true)
    const result = await downloadReport('dashboard', format)
    setExporting(false)
    if (!result.ok) {
      alert('Export failed: ' + result.message)
    }
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="layout-sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Shared Sidebar */}
      <aside className={`layout-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="layout-brand">
          <div className="layout-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="layout-brand-text">
            <strong>EcoSphere</strong>
            <p>ESG Management</p>
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
            <span className="layout-goal-title">{isOverviewOrAnalytics ? 'Quarterly Goal' : 'Impact Goal'}</span>
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
        <button type="button" onClick={handleLogout} style={{margin:'12px 16px',padding:'10px 16px',background:'rgba(239,68,68,0.1)',color:'#ef4444',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,cursor:'pointer',fontSize:'0.85rem',fontWeight:600,display:'flex',alignItems:'center',gap:8}}>
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Layout Content wrapper */}
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
            <div className="layout-search">
              <span className="layout-search-icon">🔍</span>
              <input type="search" placeholder="Search ESG reports, logs, or notifications..." />
            </div>
          </div>

          <div className="layout-topbar-right">
            <div className="layout-date-range">
              <span>📅</span>
              <span>{isOverviewOrAnalytics ? 'OCT 2023 - SEP 2024' : 'OCT 2023 - MAR 2024'}</span>
            </div>

            <button type="button" className={isOverviewOrAnalytics ? 'layout-action-btn' : 'layout-download-btn'} onClick={() => handleExport('pdf')} disabled={exporting} style={exporting ? {opacity:0.6,cursor:'wait'} : {}}>
              {exporting ? <>Generating...</> : isOverviewOrAnalytics ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 4}}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Export Report
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 4}}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download Report
                </>
              )}
            </button>

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
        <nav className="layout-tabs" aria-label="Dashboard subnavigation tabs">
          <Link to="/dashboard/overview" className={getTabClass('/dashboard/overview')}>Overview</Link>
          <Link to="/dashboard/analytics" className={getTabClass('/dashboard/analytics')}>Analytics</Link>
          <Link to="/dashboard/department-ranking" className={getTabClass('/dashboard/department-ranking')}>Department Ranking</Link>
          <Link to="/dashboard/activity-feed" className={getTabClass('/dashboard/activity-feed')}>Activity Feed</Link>
          <Link to="/dashboard/notifications" className={getTabClass('/dashboard/notifications')}>Notifications</Link>
        </nav>

        {/* Renders the specific sub-page view content */}
        <Outlet />
      </section>
    </div>
  )
}

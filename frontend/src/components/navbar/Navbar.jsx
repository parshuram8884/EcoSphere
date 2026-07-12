import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ onLinkClick }) {
  const location = useLocation()

  const getSidebarClass = (path) => {
    return location.pathname.startsWith(path) ? 'layout-side-link layout-side-link-active' : 'layout-side-link'
  }

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <nav className="layout-side-nav" aria-label="Dashboard navigation">
      <Link 
        className={getSidebarClass('/dashboard')} 
        to="/dashboard/overview"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
        Dashboard
      </Link>
      <Link 
        className={getSidebarClass('/environmental')} 
        to="/environmental/dashboard"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        Environmental
      </Link>
      <Link 
        className={getSidebarClass('/social')} 
        to="/social/csr-activities"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14-2v2m0 4h.01"/>
        </svg>
        Social
      </Link>
      <Link 
        className={getSidebarClass('/governance')} 
        to="/governance/policies"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Governance
      </Link>
      <Link 
        className={getSidebarClass('/gamification')} 
        to="/gamification/challenges"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Gamification
      </Link>
      <Link 
        className={getSidebarClass('/reports')} 
        to="/reports/environmental-report"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        Reports
      </Link>
      <Link 
        className={getSidebarClass('/administration')} 
        to="/administration/users"
        onClick={handleLinkClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 4}}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
        Setting
      </Link>
    
    </nav>
  )
}

import { useState } from 'react'
import './ComplianceIssues.css'

export default function ComplianceIssues() {
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [ownerFilter, setOwnerFilter] = useState('All')

  const initialIncidents = [
    { id: 'INC-94820', desc: 'Discharged chemical residues in local stream', severity: 'Critical', owner: 'Marcus Thome', discovered: 'Sep 10, 2024', due: 'Oct 01, 2024', status: 'Escalated', overdue: true },
    { id: 'INC-94821', desc: 'Incomplete contractor safety onboarding checks', severity: 'Major', owner: 'Sarah Chen', discovered: 'Oct 02, 2024', due: 'Nov 02, 2024', status: 'Under Investigation', overdue: false },
    { id: 'INC-94822', desc: 'Missing documentation for Scope 3 emissions factors', severity: 'Minor', owner: 'Marcus Thome', discovered: 'Oct 05, 2024', due: 'Nov 05, 2024', status: 'Open', overdue: false },
    { id: 'INC-94823', desc: 'Gift register policy disclosure threshold issue', severity: 'Minor', owner: 'Elena Vance', discovered: 'Sep 01, 2024', due: 'Oct 01, 2024', status: 'Resolved', overdue: false }
  ]

  const [incidents, setIncidents] = useState(initialIncidents)

  const handleEscalate = (id) => {
    alert(`Triggered Board Escalation for incident ${id}!`)
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return <span className="badge-severity badge-severity-critical">Critical</span>
      case 'Major': return <span className="badge-severity badge-severity-major">Major</span>
      case 'Minor': return <span className="badge-severity badge-severity-minor">Minor</span>
      default: return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open': return <span className="badge-tracking-status status-open">Open</span>
      case 'Under Investigation': return <span className="badge-tracking-status status-investigation">Under Investigation</span>
      case 'Escalated': return <span className="badge-tracking-status status-escalated">Escalated</span>
      case 'Resolved': return <span className="badge-tracking-status status-resolved">Resolved</span>
      default: return null
    }
  }

  const filteredIncidents = incidents.filter(inc => {
    const searchMatch = inc.desc.toLowerCase().includes(searchQuery.toLowerCase()) || inc.id.toLowerCase().includes(searchQuery.toLowerCase())
    const severityMatch = severityFilter === 'All' || inc.severity === severityFilter
    const ownerMatch = ownerFilter === 'All' || inc.owner === ownerFilter
    return searchMatch && severityMatch && ownerMatch
  })

  return (
    <div className="compliance-container">
      {/* 1. Risk Dashboard Summary Ribbon (4 Severity Cards Grid) */}
      <section className="risk-ribbon" aria-label="Risk Severity Dashboard Ribbon">
        {/* Critical */}
        <article className="risk-card">
          <div className="risk-indicator risk-indicator-critical" aria-hidden="true"></div>
          <div className="risk-card-details">
            <span className="risk-card-label">Critical Breaches</span>
            <strong className="risk-card-val">1 Active Issue</strong>
          </div>
        </article>

        {/* Major */}
        <article className="risk-card">
          <div className="risk-indicator risk-indicator-major" aria-hidden="true"></div>
          <div className="risk-card-details">
            <span className="risk-card-label">Major Deviations</span>
            <strong className="risk-card-val">3 Issues</strong>
          </div>
        </article>

        {/* Minor */}
        <article className="risk-card">
          <div className="risk-indicator risk-indicator-minor" aria-hidden="true"></div>
          <div className="risk-card-details">
            <span className="risk-card-label">Minor Exceptions</span>
            <strong className="risk-card-val">8 Issues</strong>
          </div>
        </article>

        {/* Resolved */}
        <article className="risk-card">
          <div className="risk-indicator risk-indicator-resolved" aria-hidden="true"></div>
          <div className="risk-card-details">
            <span className="risk-card-label">Total Resolved</span>
            <strong className="risk-card-val">142 Cleared</strong>
          </div>
        </article>
      </section>

      {/* 2. Advanced Risk Management Filter Bar */}
      <article className="risk-filter-bar">
        <div className="risk-filters-left">
          <input 
            type="search" 
            className="risk-search-input" 
            placeholder="Search Active Infractions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="severity-toggle-strip" aria-label="Severity level filter toggle">
            <button 
              type="button" 
              className={`severity-toggle-btn ${severityFilter === 'All' ? 'severity-toggle-btn-active' : ''}`}
              onClick={() => setSeverityFilter('All')}
            >
              All Tiers
            </button>
            <button 
              type="button" 
              className={`severity-toggle-btn ${severityFilter === 'Critical' ? 'severity-toggle-btn-active' : ''}`}
              onClick={() => setSeverityFilter('Critical')}
            >
              Critical
            </button>
            <button 
              type="button" 
              className={`severity-toggle-btn ${severityFilter === 'Major' ? 'severity-toggle-btn-active' : ''}`}
              onClick={() => setSeverityFilter('Major')}
            >
              Major
            </button>
            <button 
              type="button" 
              className={`severity-toggle-btn ${severityFilter === 'Minor' ? 'severity-toggle-btn-active' : ''}`}
              onClick={() => setSeverityFilter('Minor')}
            >
              Minor
            </button>
          </div>
        </div>

        <select 
          className="policies-dropdown" 
          value={ownerFilter} 
          onChange={(e) => setOwnerFilter(e.target.value)}
        >
          <option value="All">Owner Allocation: All</option>
          <option value="Marcus Thome">Marcus Thome</option>
          <option value="Sarah Chen">Sarah Chen</option>
          <option value="Elena Vance">Elena Vance</option>
        </select>
      </article>

      {/* 3. Incident Remediation Data Grid Table */}
      <article className="risk-table-card">
        <div className="risk-table-wrapper">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Issue Tracker ID</th>
                <th>Breach Description</th>
                <th>Severity Tier</th>
                <th>Assigned Officer</th>
                <th>Discovered</th>
                <th>Resolution Due</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className={inc.overdue ? 'row-overdue' : ''}>
                  <td style={{ fontWeight: 700 }}>
                    {inc.overdue && <span style={{ marginRight: 4 }}>⚡</span>}
                    {inc.id}
                  </td>
                  <td>
                    <span>{inc.desc}</span>
                    {inc.overdue && (
                      <div className="escalation-alert-banner">
                        <span>⚠️ Passed strict resolution due date boundaries. Escalation required.</span>
                        <button 
                          type="button" 
                          className="btn-escalate-board"
                          onClick={() => handleEscalate(inc.id)}
                        >
                          Escalate to Board
                        </button>
                      </div>
                    )}
                  </td>
                  <td>{getSeverityBadge(inc.severity)}</td>
                  <td>{inc.owner}</td>
                  <td>{inc.discovered}</td>
                  <td style={{ color: inc.overdue ? '#ef4444' : 'inherit', fontWeight: inc.overdue ? 700 : 'normal' }}>
                    {inc.due}
                  </td>
                  <td>{getStatusBadge(inc.status)}</td>
                  <td>
                    <button type="button" className="risk-btn-actions" aria-label="Action Menu">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

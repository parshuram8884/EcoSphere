import { useState } from 'react'
import './ComplianceIssues.css'
import { useApi } from '../../hooks/useApi'

export default function ComplianceIssues() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')

  const { data: issues, loading, error } = useApi('/governance/issues/')
  const { data: summary } = useApi('/governance/summary/')

  if (loading) return <div style={{ padding: 20 }}>Loading compliance issues...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!issues) return null

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || issue.status.toLowerCase().replace('_', '') === statusFilter.toLowerCase().replace(' ', '')
    const matchesSev = severityFilter === 'All' || issue.severity.toLowerCase() === severityFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesSev
  })

  return (
    <div className="issues-container">
      {/* 1. Status Command Ribbon */}
      <section className="issues-ribbon" aria-label="Issues Summary">
        <article className="issue-stat-card stat-critical">
          <div className="stat-value">{summary?.issues.overdue || 0}</div>
          <div className="stat-label">Overdue SLAs</div>
        </article>
        <article className="issue-stat-card stat-open">
          <div className="stat-value">{summary?.issues.open || 0}</div>
          <div className="stat-label">Open Issues</div>
        </article>
        <article className="issue-stat-card stat-progress">
          <div className="stat-value">{summary?.issues.in_progress || 0}</div>
          <div className="stat-label">In Progress</div>
        </article>
        <article className="issue-stat-card stat-resolved">
          <div className="stat-value">{summary?.issues.resolved || 0}</div>
          <div className="stat-label">Resolved (30d)</div>
        </article>
      </section>

      {/* 2. Controls & Filters */}
      <section className="issues-controls" aria-label="Filter and Search">
        <div className="search-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="search" 
            placeholder="Search findings, regulations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </section>

      {/* 3. Issues List */}
      <section className="issues-list-container">
        {filteredIssues.map((issue) => (
          <article key={issue.id} className="issue-row-card">
            <div className="issue-primary-info">
              <div className="issue-title-block">
                <span className={`issue-severity-badge sev-${issue.severity.toLowerCase()}`}>
                  {issue.severity}
                </span>
                <span className="issue-id">#{issue.id}</span>
                <h3>{issue.description}</h3>
              </div>
              <p className="issue-source-text">Audit Source: {issue.audit_scope}</p>
            </div>

            <div className="issue-meta-info">
              <div className="meta-block">
                <span className="meta-label">Due Date</span>
                <span className="meta-value">{issue.due_date}</span>
              </div>
              <div className="meta-block">
                <span className="meta-label">Owner</span>
                <div className="owner-chip">
                  <span className="owner-avatar">{issue.owner_name.substring(0, 2).toUpperCase()}</span>
                  <span>{issue.owner_name}</span>
                </div>
              </div>
            </div>

            <div className="issue-action-block">
              <span className={`issue-status-badge status-${issue.status.toLowerCase().replace('_', '')}`}>
                {issue.status.replace('_', ' ')}
              </span>
              <button type="button" className="btn-icon" aria-label="View Details">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </article>
        ))}
        
        {filteredIssues.length === 0 && (
          <div className="empty-state">
            <p>No compliance issues found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  )
}

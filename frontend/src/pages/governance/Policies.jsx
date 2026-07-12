import { useState } from 'react'
import './Policies.css'

export default function Policies() {
  const [searchQuery, setSearchQuery] = useState('')
  const [pillar, setPillar] = useState('All')

  const initialPolicies = [
    {
      id: 1,
      title: 'Global Anti-Bribery Code',
      version: 'v4.1',
      status: 'Active',
      date: 'Jan 15, 2024',
      owner: 'Marcus Thome',
      published: true,
      history: [
        { rev: 'Rev 4.1', log: 'Audit revisions approved', date: 'Oct 12, 2024' },
        { rev: 'Rev 4.0', log: 'Legal sign-off completed', date: 'Jan 10, 2024' }
      ]
    },
    {
      id: 2,
      title: 'Whistleblower Protection Policy',
      version: 'v3.2',
      status: 'Under Review',
      date: 'Apr 08, 2023',
      owner: 'Sarah Chen',
      published: true,
      history: [
        { rev: 'Rev 3.2', log: 'Compliance alignment check', date: 'Jun 14, 2024' },
        { rev: 'Rev 3.1', log: 'Minor updates to contact info', date: 'Feb 22, 2024' }
      ]
    },
    {
      id: 3,
      title: 'Data Privacy & Governance Charter',
      version: 'v2.0',
      status: 'Active',
      date: 'Sep 01, 2023',
      owner: 'Elena Vance',
      published: true,
      history: [
        { rev: 'Rev 2.0', log: 'GDPR audit sign-off', date: 'Aug 28, 2023' }
      ]
    },
    {
      id: 4,
      title: 'Supply Chain Code of Conduct',
      version: 'v1.5',
      status: 'Draft',
      date: 'Pending',
      owner: 'Marcus Thome',
      published: false,
      history: [
        { rev: 'Rev 1.5', log: 'Draft prepared for board review', date: 'Jul 11, 2026' }
      ]
    }
  ]

  const [policies, setPolicies] = useState(initialPolicies)

  const handleTogglePublished = (id) => {
    setPolicies(policies.map(p => 
      p.id === id ? { ...p, published: !p.published } : p
    ))
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'policy-status-badge status-active'
      case 'Draft': return 'policy-status-badge status-draft'
      case 'Under Review': return 'policy-status-badge status-review'
      default: return 'policy-status-badge'
    }
  }

  return (
    <div className="policies-container">
      {/* 1. Document Control Bar */}
      <article className="policies-control-bar">
        <div className="policies-search-group">
          <input 
            type="search" 
            className="policies-search-input" 
            placeholder="Search Corporate Policies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            className="policies-dropdown" 
            value={pillar} 
            onChange={(e) => setPillar(e.target.value)}
          >
            <option value="All">Pillar Filter: All</option>
            <option value="Anti-Corruption">Anti-Corruption</option>
            <option value="Data Privacy">Data Privacy</option>
            <option value="Supply Chain Ethics">Supply Chain Ethics</option>
          </select>
        </div>

        <button type="button" className="policies-btn-draft">
          ➕ Draft New Policy
        </button>
      </article>

      {/* 2. Corporate Policy Grid */}
      <section className="policies-grid" aria-label="Corporate Governance Policies">
        {policies.map((policy) => (
          <article key={policy.id} className="policy-card">
            <div className="policy-card-header">
              <div className="policy-card-title-block">
                <h3>{policy.title}</h3>
                <div className="policy-card-meta-row">
                  <span className="policy-version-tag">{policy.version}</span>
                  <span>Effective: {policy.date}</span>
                </div>
              </div>

              <span className={getStatusClass(policy.status)}>
                {policy.status}
              </span>
            </div>

            {/* Details list */}
            <div className="policy-card-details-list">
              <div className="policy-detail-row">
                <span className="policy-detail-label">Executive Owner</span>
                <span className="policy-detail-val">{policy.owner}</span>
              </div>
              <div className="policy-detail-row">
                <span className="policy-detail-label">Audited Registry</span>
                <span className="policy-detail-val">SEC ESG Standard</span>
              </div>
            </div>

            {/* Version History Slide-Over Panel Preview */}
            <div className="policy-history-section">
              <span className="policy-history-title">Version History logs</span>
              <div className="policy-history-list">
                {policy.history.map((h, i) => (
                  <div key={i} className="policy-history-item">
                    <div>
                      <strong style={{ color: '#0f172a' }}>{h.rev}</strong>
                      <span className="policy-history-text"> — {h.log}</span>
                    </div>
                    <span className="policy-history-date">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publish / Archive Toggle switch */}
            <div className="policy-toggle-row">
              <span className="policy-toggle-label">
                {policy.published ? 'Published' : 'Archived'}
              </span>
              <label className="policy-switch" htmlFor={`toggle-${policy.id}`}>
                <input 
                  type="checkbox" 
                  id={`toggle-${policy.id}`}
                  checked={policy.published}
                  onChange={() => handleTogglePublished(policy.id)}
                />
                <span className="policy-slider"></span>
              </label>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

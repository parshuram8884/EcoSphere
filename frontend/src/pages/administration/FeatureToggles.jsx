import { useState } from 'react'
import './FeatureToggles.css'

export default function FeatureToggles() {
  const [searchQuery, setSearchQuery] = useState('')

  const initialFlags = [
    { id: 'FLAG-01', title: 'Automated Sensor Emission Mapping Pipeline', desc: 'Incorporate live IoT utility meter telemetry feeds and automate scope factor coefficient mapping.', env: 'Production', active: true, critical: true },
    { id: 'FLAG-02', title: 'Mandatory Evidence Upload Rules for CSR Submissions', desc: 'Requires employees to upload images or PDF receipts before CSR activities claim approval.', env: 'Production', active: true, critical: false },
    { id: 'FLAG-03', title: 'Gamification Badge Auto-Award Engine', desc: 'Run background routine executing immediate automated badge disbursements upon completed streak checklists.', env: 'Staging', active: true, critical: false },
    { id: 'FLAG-04', title: 'Platform Native Dark Mode Force Overlap', desc: 'Override default adaptive templates to force dark slate theme background globally.', env: 'Staging', active: false, critical: false }
  ]

  const [flags, setFlags] = useState(initialFlags)

  const handleToggleActive = (id) => {
    setFlags(flags.map(f => {
      if (f.id === id) {
        const nextState = !f.active
        if (f.critical) {
          const proceed = confirm('⚠️ WARNING: Altering critical operations logic live changes user environments instantly. Proceed?')
          if (!proceed) return f
        }
        return { ...f, active: nextState }
      }
      return f
    }))
  }

  const activeCount = flags.filter(f => f.active).length
  const disabledCount = flags.length - activeCount

  const filteredFlags = flags.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) || f.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flags-container">
      {/* 1. Flag Search & System Summary Ribbon */}
      <article className="flags-header-bar">
        <input 
          type="search" 
          className="flags-search-input" 
          placeholder="Search Runtime Feature Flags..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flags-summary-stats">
          <div className="flags-stat-item">
            Active: <span>{activeCount} flags</span>
          </div>
          <div className="flags-stat-item">
            Disabled: <span style={{ color: '#64748b' }}>{disabledCount} flags</span>
          </div>
        </div>
      </article>

      {/* 2. System Optimization Toggle Grid */}
      <section className="flags-grid" aria-label="System flag configuration matrix">
        {filteredFlags.map((flag) => (
          <article key={flag.id} className="flag-card">
            <div className="flag-card-header">
              <div className="flag-card-title-block">
                <span className={`flag-env-badge ${flag.env === 'Production' ? 'env-prod' : 'env-staging'}`}>
                  {flag.env} Mode
                </span>
                <h3>{flag.title}</h3>
              </div>

              <label className="switch-toggle-label" aria-label={`Toggle flag ${flag.title}`}>
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={flag.active}
                  onChange={() => handleToggleActive(flag.id)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            <p className="flag-card-desc">{flag.desc}</p>

            {/* 3. Risk Mitigation Warning banner */}
            {flag.critical && (
              <div className="flag-risk-banner">
                <span>⚠️ Altering target platform logic parameters live changes the user environment workspace instantly.</span>
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}

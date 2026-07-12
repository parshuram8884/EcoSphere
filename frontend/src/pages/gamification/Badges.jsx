import { useState } from 'react'
import './Badges.css'

export default function Badges() {
  const [searchQuery, setSearchQuery] = useState('')
  const [pillarClass, setPillarClass] = useState('All')
  const [isMintModalOpen, setIsMintModalOpen] = useState(false)

  // Form states
  const [formTitle, setFormTitle] = useState('')
  const [formRule, setFormRule] = useState('')
  const [formClass, setFormClass] = useState('Carbon')
  const [slackWebhook, setSlackWebhook] = useState(true)

  const initialBadges = [
    { id: 1, title: 'Paperless Pioneer', rule: 'Log 10 consecutive digital transactions.', metPct: 12, class: 'Zero-Waste', primaryColor: '#10b981', secondaryColor: '#064e3b' },
    { id: 2, title: 'Carbon Combatant', rule: 'Reduce individual carbon footprint by 15%.', metPct: 8, class: 'Carbon', primaryColor: '#3b82f6', secondaryColor: '#1d4ed8' },
    { id: 3, title: 'Net-Zero Superhero', rule: 'Achieve zero emissions for 3 consecutive months.', metPct: 0.1, class: 'Carbon', primaryColor: '#a7f3d0', secondaryColor: '#047857' },
    { id: 4, title: 'CSR Contributor', rule: 'Log 20 hours of volunteer service.', metPct: 22, class: 'CSR', primaryColor: '#f59e0b', secondaryColor: '#b45309' },
    { id: 5, title: 'Compliance Champion', rule: 'Perfect score on all compliance training courses.', metPct: 45, class: 'Compliance', primaryColor: '#8b5cf6', secondaryColor: '#5b21b6' }
  ]

  const [badges, setBadges] = useState(initialBadges)

  const handleMintBadge = (e) => {
    e.preventDefault()
    if (!formTitle || !formRule) return

    const newBadge = {
      id: Date.now(),
      title: formTitle,
      rule: formRule,
      metPct: 0,
      class: formClass,
      primaryColor: formClass === 'Carbon' ? '#3b82f6' : formClass === 'Zero-Waste' ? '#10b981' : formClass === 'CSR' ? '#f59e0b' : '#8b5cf6',
      secondaryColor: formClass === 'Carbon' ? '#1d4ed8' : formClass === 'Zero-Waste' ? '#064e3b' : formClass === 'CSR' ? '#b45309' : '#5b21b6'
    }

    setBadges([newBadge, ...badges])
    setFormTitle('')
    setFormRule('')
    setIsMintModalOpen(false)
  }

  const filteredBadges = badges.filter(b => {
    const searchMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.rule.toLowerCase().includes(searchQuery.toLowerCase())
    const classMatch = pillarClass === 'All' || b.class === pillarClass
    return searchMatch && classMatch
  })

  return (
    <div className="badges-container">
      {/* 1. Strategic Metrics Strip */}
      <section className="badges-metrics-row" aria-label="Badge metrics summary">
        {/* Metric 1 */}
        <article className="badge-metric-card">
          <div className="badge-metric-icon" aria-hidden="true">🏅</div>
          <div className="badge-metric-details">
            <span className="badge-metric-label">Total Configured Badges</span>
            <strong className="badge-metric-val">24 Medals</strong>
            <span className="badge-metric-sub">Across 4 ESG pillars</span>
          </div>
        </article>

        {/* Metric 2 */}
        <article className="badge-metric-card">
          <div className="badge-metric-icon" style={{ background: '#ecfdf5', color: '#059669' }} aria-hidden="true">⭐</div>
          <div className="badge-metric-details">
            <span className="badge-metric-label">Most Earned Badge</span>
            <strong className="badge-metric-val">Paperless Pioneer</strong>
            <span className="badge-metric-sub" style={{ color: '#059669' }}>Earned by 421 Users</span>
          </div>
        </article>

        {/* Metric 3 */}
        <article className="badge-metric-card">
          <div className="badge-metric-icon" style={{ background: '#fef2f2', color: '#b91c1c' }} aria-hidden="true">💎</div>
          <div className="badge-metric-details">
            <span className="badge-metric-label">Ultra-Rare Badge</span>
            <strong className="badge-metric-val">Net-Zero Superhero</strong>
            <span className="badge-metric-sub" style={{ color: '#b91c1c' }}>Claimed by 3 Users</span>
          </div>
        </article>
      </section>

      {/* 2. Badge Grid Control Header */}
      <article className="badge-controls-header">
        <div className="badge-search-group">
          <input 
            type="search" 
            className="badge-search-input" 
            placeholder="Search Unlock Rules/Titles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            className="challenge-dropdown" 
            value={pillarClass} 
            onChange={(e) => setPillarClass(e.target.value)}
          >
            <option value="All">Pillar Class: All</option>
            <option value="Carbon">Carbon</option>
            <option value="CSR">CSR</option>
            <option value="Compliance">Compliance</option>
            <option value="Zero-Waste">Zero-Waste</option>
          </select>
        </div>

        <button 
          type="button" 
          className="badge-btn-mint"
          onClick={() => setIsMintModalOpen(true)}
        >
          ➕ Mint New Badge
        </button>
      </article>

      {/* 3. Main Visual Badge Grid */}
      <section className="badge-assets-grid" aria-label="Sustainability Badges Matrix Grid">
        {filteredBadges.map((badge) => (
          <article key={badge.id} className="badge-asset-card">
            <div className="badge-svg-container" aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 40 40">
                <defs>
                  <linearGradient id={`grad-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={badge.primaryColor} />
                    <stop offset="100%" stopColor={badge.secondaryColor} />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill={`url(#grad-${badge.id})`} />
                <circle cx="20" cy="20" r="14" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
                {/* Embedded Star vector */}
                <polygon points="20,10 23,17 30,17 25,22 27,29 20,25 13,29 15,22 10,17 17,17" fill="#ffffff" />
              </svg>
            </div>

            <h3>{badge.title}</h3>
            <p className="badge-unlock-rule">{badge.rule}</p>

            <div className="badge-progress-box">
              <div className="badge-progress-labels">
                <span>Unlock Rate</span>
                <span>{badge.metPct}% of staff</span>
              </div>
              <div className="goals-progress-track">
                <div className="goals-progress-fill" style={{ width: `${badge.metPct}%`, background: badge.primaryColor, height: '100%' }}></div>
              </div>
            </div>

            <div className="badge-asset-actions">
              <button type="button" className="badge-btn-action">Edit Logic Form</button>
              <button type="button" className="badge-btn-action" style={{ color: '#ef4444' }}>Archive Asset</button>
            </div>
          </article>
        ))}
      </section>

      {/* 4. Pop-up Interaction States (Modal Simulation Engine) */}
      {isMintModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMintModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mint New Badge</h3>
              <button 
                type="button" 
                className="btn-modal-close"
                onClick={() => setIsMintModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form className="modal-form" onSubmit={handleMintBadge}>
              <div className="form-group">
                <label htmlFor="badge-title">Badge Title</label>
                <input 
                  type="text" 
                  id="badge-title"
                  className="form-input" 
                  placeholder="e.g., Paperless Pioneer"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="unlock-rule">Unlock Rule Condition</label>
                <input 
                  type="text" 
                  id="unlock-rule"
                  className="form-input" 
                  placeholder="e.g., Log 10 consecutive digital transactions"
                  value={formRule}
                  onChange={(e) => setFormRule(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="badge-class">Pillar Class</label>
                <select 
                  id="badge-class"
                  className="form-input"
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                >
                  <option value="Carbon">Carbon</option>
                  <option value="Zero-Waste">Zero-Waste</option>
                  <option value="CSR">CSR</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <input 
                  type="checkbox" 
                  id="slack-announcement" 
                  checked={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.checked)}
                />
                <label htmlFor="slack-announcement" style={{ cursor: 'pointer' }}>Slack Announcement Webhook</label>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="env-btn-secondary"
                  onClick={() => setIsMintModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="env-btn-primary">
                  Mint Badge Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

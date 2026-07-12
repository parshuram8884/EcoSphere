import { useState } from 'react'
import './ActivityFeed.css'

export default function ActivityFeed() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <>
      {/* Title and control bar */}
      <div className="feed-section-header">
        <div className="feed-title-block">
          <h2>Live Activity Stream</h2>
          <p>Real-time updates across ESG operations and compliance.</p>
        </div>

        <div className="feed-actions-group">
          <button 
            type="button" 
            className="feed-btn-outline"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span>⚙️</span> Filters
          </button>
          <button type="button" className="feed-btn-outline">
            <span>📊</span> Latest
          </button>
        </div>
      </div>

      {/* Live Timeline list */}
      <div className="feed-timeline">
        {/* Card 1: Zero-Waste Competition Launched */}
        <article className="feed-item">
          <div className="feed-item-icon-container icon-bg-trophy" aria-hidden="true">
            🏆
          </div>
          <div className="feed-item-card">
            <div className="feed-item-header">
              <span className="feed-item-badge badge-csr">CSR Initiative</span>
              <span className="feed-item-time">2h ago</span>
            </div>
            <h3 className="feed-item-title">Zero-Waste Competition Launched</h3>
            <p className="feed-item-desc">
              Operations launched a 30-day corporate-wide challenge to reduce landfill dependency across all regional hubs.
            </p>

            <div className="feed-attachment-grid">
              {/* Visual Image Dashboard Panel */}
              <div className="feed-attachment-image-panel">
                <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ background: '#0e1726' }}>
                  {/* SVG mini chart dashboard UI visual */}
                  <rect x="10" y="10" width="80" height="40" fill="#1b2e4b" rx="4" />
                  <text x="18" y="25" fill="#a7f3d0" fontSize="8" fontWeight="bold">GROSS</text>
                  <text x="18" y="42" fill="#ffffff" fontSize="12" fontWeight="bold">4,120 t</text>
                  
                  <rect x="100" y="10" width="90" height="40" fill="#1b2e4b" rx="4" />
                  <circle cx="120" cy="30" r="10" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <text x="145" y="32" fill="#ffffff" fontSize="10" fontWeight="bold">67%</text>

                  {/* Area Sparkline */}
                  <path d="M10 110 Q 50 80, 100 100 T 190 70 L 190 115 L 10 115 Z" fill="#047857" fillOpacity="0.3" />
                  <path d="M10 110 Q 50 80, 100 100 T 190 70" fill="none" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>

              {/* Progress Details Panel */}
              <div className="feed-attachment-progress-panel">
                <span className="progress-title">Participation Progress</span>
                <div className="progress-pct-status">63% joined</div>
                <div className="progress-track-bar">
                  <div className="progress-fill-bar" style={{ width: '63%' }}></div>
                </div>
                <div className="progress-participants-count">
                  <span>1,402 Participants</span>
                </div>
              </div>
            </div>

            <div className="feed-card-actions">
              <button type="button" className="feed-btn-primary">Join Challenge &gt;</button>
            </div>
          </div>
        </article>

        {/* Card 2: Scope 2 Green Tariffs Verified */}
        <article className="feed-item">
          <div className="feed-item-icon-container icon-bg-gear" aria-hidden="true">
            ⚙️
          </div>
          <div className="feed-item-card">
            <div className="feed-item-header">
              <div className="feed-card-verified-badge">
                <span className="feed-verified-circle">✓</span>
                <span>Scope 2 Green Tariffs Verified</span>
              </div>
              <span className="feed-item-time">5h ago</span>
            </div>
            <p className="feed-item-desc">
              Internal Auditor verified renewable energy certificates for all EU-based manufacturing facilities.
            </p>
            <div className="feed-item-links-row">
              <a href="#certificate" className="feed-attachment-link">
                📁 Download Audit Certificate
              </a>
              <span>• Auditor: Sarah Jenkins</span>
            </div>
          </div>
        </article>

        {/* Card 3: Real-time sensor threshold exceeded */}
        <article className="feed-item">
          <div className="feed-item-icon-container icon-bg-warning" aria-hidden="true">
            ⚠
          </div>
          <div className="feed-item-card card-border-red">
            <div className="feed-item-header">
              <span className="feed-item-badge badge-warning">Priority Alert • Critical Threshold</span>
              <span className="feed-item-time">12h ago</span>
            </div>
            <h3 className="feed-item-title">Real-time sensor threshold exceeded</h3>
            <p className="feed-item-desc">
              Production Line B reported a sudden spike in NOx emissions. Current reading: 114 ppm | Limit: 80 ppm.
            </p>
            <div className="feed-card-actions">
              <button type="button" className="feed-btn-red">Open Analytics</button>
              <button type="button" className="feed-btn-secondary">Acknowledge</button>
            </div>
          </div>
        </article>

        {/* Card 4: ISO 14001 Certification Renewed */}
        <article className="feed-item">
          <div className="feed-item-icon-container icon-bg-shield" aria-hidden="true">
            🛡
          </div>
          <div className="feed-item-card">
            <div className="feed-item-header">
              <h3 className="feed-item-title" style={{ margin: 0 }}>ISO 14001 Certification Renewed</h3>
              <span className="feed-item-time">Yesterday</span>
            </div>
            <div className="compliance-card-body">
              <div className="compliance-icon-badge">✓</div>
              <div>
                <p className="feed-item-desc">
                  Environmental management system successfully audited and certified for 2026/2027 fiscal cycle.
                </p>
                <div className="feed-compliance-status-row">
                  <span>Status:</span>
                  <span className="compliance-green">Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Infinite scroll loader indicator */}
      <div className="feed-infinite-scroll">
        <div className="feed-spinner"></div>
        <span>Loading older activities via infinite scroll...</span>
      </div>

      {/* Floating action buttons */}
      <div className="feed-floating-actions">
        <button type="button" className="feed-float-btn">
          Log Activity
        </button>
        <button type="button" className="feed-float-circle-btn" aria-label="Add entry">
          +
        </button>
      </div>
    </>
  )
}


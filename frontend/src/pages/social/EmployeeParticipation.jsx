import { useState } from 'react'
import './EmployeeParticipation.css'

export default function EmployeeParticipation() {
  const [activeTab, setActiveTab] = useState('All Submissions')
  const [activeSubmissionId, setActiveSubmissionId] = useState('Sarah Jenkins')

  const submissions = [
    { id: 'Sarah Jenkins', role: 'Staff Software Engineer', team: 'ENGINEERING TEAM', activity: 'Coastal Cleanup Activity', time: '4.5 hrs', loc: 'Marina Bay', pts: '+150 pts', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&fit=crop&q=80', claimId: '#VOL-29401', detailsTitle: 'Coastal Cleanup & Plastic Retrieval', desc: 'Participated in the city-wide effort to remove macro-plastics from the northern beach strip. Managed a team of 4 other volunteers.' },
    { id: 'Marcus Thorne', role: 'UX Designer', team: 'DESIGN TEAM', activity: 'Local School Mentoring', time: '2.0 hrs', loc: 'Downtown Center', pts: '+80 pts', avatar: '', claimId: '#VOL-29402', detailsTitle: 'UX Design Mentorship', desc: 'Mentored local high school students on basic digital product design tools and interface design principles.' },
    { id: 'Elena Rodriguez', role: 'Account Executive', team: 'SALES TEAM', activity: 'Tree Planting Initiative', time: '6.0 hrs', loc: 'Greenwood Park', pts: '+200 pts', avatar: '', claimId: '#VOL-29403', detailsTitle: 'Urban Afforestation Project', desc: 'Planted native saplings to contribute to the local urban forest expansion and biodiversity corridor project.' },
    { id: 'Kevin Zhang', role: 'Data Analyst', team: 'ANALYTICS TEAM', activity: 'Carbon Footprint Workshop', time: '1.5 hrs', loc: 'Conference Room C', pts: '+50 pts', avatar: '', claimId: '#VOL-29404', detailsTitle: 'ESG Education Seminar', desc: 'Presented data analytics insights on corporate carbon footprinting to help coworkers optimize energy consumption.' }
  ]

  const activeSubmission = submissions.find(sub => sub.id === activeSubmissionId) || submissions[0]

  return (
    <div className="participation-container">
      {/* 1. Header Row */}
      <article className="participation-header-row">
        <div className="participation-title-block">
          <h2>Participation Ledger</h2>
          <p>Verify and audit employee volunteer activities and CSR contributions.</p>
        </div>

        <button type="button" className="participation-btn-add">
          ➕ Add Entry
        </button>
      </article>

      {/* 2. Sub-tabs Filter Row */}
      <nav className="participation-tabs-row" aria-label="Participation ledger view filter">
        <div 
          className={`participation-tab-link ${activeTab === 'All Submissions' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('All Submissions')}
        >
          All Submissions
        </div>
        <div 
          className={`participation-tab-link ${activeTab === 'Pending Verification' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Pending Verification')}
        >
          Pending Verification <span className="participation-tab-badge">4</span>
        </div>
        <div 
          className={`participation-tab-link ${activeTab === 'Approved Claims' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Approved Claims')}
        >
          Approved Claims
        </div>
        <div 
          className={`participation-tab-link ${activeTab === 'Flagged Entries' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Flagged Entries')}
        >
          Flagged Entries
        </div>
      </nav>

      {/* 3. Split Layout */}
      <section className="participation-split-layout" aria-label="Participation ledger workflow">
        
        {/* Left Column Panel: Submissions Feed */}
        <div className="participation-left-card">
          <div className="participation-left-header">
            <span>SUBMISSIONS FEED</span>
            <span>4 Pending</span>
          </div>

          <div className="participation-feed-list">
            {submissions.map((sub) => (
              <div 
                key={sub.id}
                className={`participation-feed-item ${activeSubmissionId === sub.id ? 'participation-feed-item-active' : ''}`}
                onClick={() => setActiveSubmissionId(sub.id)}
              >
                <div className="participation-feed-identity">
                  {sub.avatar ? (
                    <img className="participation-feed-avatar" src={sub.avatar} alt={sub.id} />
                  ) : (
                    <div className="participation-feed-avatar-placeholder" aria-hidden="true">👤</div>
                  )}
                  <div className="participation-feed-details">
                    <span className="participation-feed-name">{sub.id}</span>
                    <span className="participation-feed-desc">{sub.activity}</span>
                    <div className="participation-feed-meta-row">
                      <span>⏱ {sub.time}</span>
                      {sub.loc && <span>📍 {sub.loc}</span>}
                    </div>
                  </div>
                </div>

                <span className="participation-feed-pts">{sub.pts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Panel: Active Submission Details */}
        <div className="participation-right-card">
          <div className="participation-details-profile">
            <div className="participation-details-user">
              {activeSubmission.avatar ? (
                <img className="participation-details-avatar" src={activeSubmission.avatar} alt={activeSubmission.id} />
              ) : (
                <div className="participation-feed-avatar-placeholder" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>👤</div>
              )}
              <div className="participation-details-name-block">
                <strong>{activeSubmission.id}</strong>
                <div className="participation-details-dept-row">
                  <span className="participation-dept-badge">{activeSubmission.team}</span>
                  <span style={{ color: '#64748b' }}>• {activeSubmission.role}</span>
                </div>
              </div>
            </div>

            <div className="participation-details-claim">
              CLAIM ID
              <strong>{activeSubmission.claimId}</strong>
            </div>
          </div>

          {/* Grid activity details */}
          <div className="participation-details-grid">
            <div className="participation-details-block-card">
              <h4>Activity Details</h4>
              <strong>{activeSubmission.detailsTitle}</strong>
              <p>{activeSubmission.desc}</p>
            </div>

            <div className="participation-metrics-split">
              <div className="participation-metric-mini">
                <span className="participation-metric-mini-label">Time</span>
                <span className="participation-metric-mini-val">{activeSubmission.time.replace(' hrs', '')} Hours</span>
              </div>
              <div className="participation-metric-mini">
                <span className="participation-metric-mini-label">Potential Points</span>
                <span className="participation-metric-mini-val participation-metric-mini-val-green">
                  {activeSubmission.pts.replace('+', '')}
                </span>
              </div>
            </div>
          </div>

          {/* Evidence section */}
          <div className="participation-details-block-card">
            <h4>Evidence & Documentation</h4>
            
            <div className="participation-evidence-grid" style={{ marginTop: 8 }}>
              <div className="participation-evidence-img-container">
                <img className="participation-evidence-img" src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=300&fit=crop&q=80" alt="Evidence attachment" />
              </div>

              <div className="participation-pdf-card">
                <span style={{ fontSize: '1.8rem' }}>📄</span>
                <span>CERTIFICATE.PDF</span>
              </div>
            </div>
          </div>

          {/* Actions toolbar */}
          <div className="participation-details-actions">
            <button type="button" className="participation-btn-reject">
              Reject Submission
            </button>
            <button type="button" className="participation-btn-flag">
              Flag for Inquiry
            </button>
            <button type="button" className="participation-btn-approve">
              ✓ Approve & Award Points
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

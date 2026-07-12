import { useState } from 'react'
import './ChallengeParticipation.css'

export default function ChallengeParticipation() {
  const [activeTab, setActiveTab] = useState('Awaiting Review')
  const [activeSubId, setActiveSubId] = useState('Sarah Jenkins')

  const submissions = [
    { id: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&fit=crop&q=80', dept: 'ENGINEERING TEAM', title: '30-Day Zero Plastic Sprint', streak: '5/5 Tasks Done', xp: '+500 XP', performance: '1,420 XP total', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&fit=crop&q=80', receiptName: 'zero_plastic_receipt.pdf', receiptSize: '142 KB' },
    { id: 'Marcus Thorne', avatar: '', dept: 'OPERATIONS TEAM', title: 'Carpool Synergy Week', streak: '4/7 Tasks Done', xp: '+150 XP', performance: '820 XP total', image: '', receiptName: 'carpool_log.pdf', receiptSize: '88 KB' },
    { id: 'Elena Rodriguez', avatar: '', dept: 'R&D TEAM', title: '30-Day Zero Plastic Sprint', streak: '3/5 Tasks Done', xp: '+500 XP', performance: '1,200 XP total', image: '', receiptName: 'plastic_audit.pdf', receiptSize: '112 KB' },
    { id: 'Kevin Zhang', avatar: '', dept: 'FINANCE TEAM', title: 'Green Travel Commute', streak: '5/5 Tasks Done', xp: '+300 XP', performance: '950 XP total', image: '', receiptName: 'commute_receipt.pdf', receiptSize: '94 KB' }
  ]

  const activeSub = submissions.find(s => s.id === activeSubId) || submissions[0]

  return (
    <div className="chal-part-container">
      {/* 1. Operations Selector Ribbon */}
      <nav className="chal-part-ribbon" aria-label="Participation claims filter">
        <div 
          className={`chal-part-tab-link ${activeTab === 'All Claims' ? 'chal-part-tab-link-active' : ''}`}
          onClick={() => setActiveTab('All Claims')}
        >
          All Claims
        </div>
        <div 
          className={`chal-part-tab-link ${activeTab === 'Awaiting Review' ? 'chal-part-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Awaiting Review')}
        >
          Awaiting Review <span className="chal-part-tab-badge">14</span>
        </div>
        <div 
          className={`chal-part-tab-link ${activeTab === 'Approved Logs' ? 'chal-part-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Approved Logs')}
        >
          Approved Logs
        </div>
        <div 
          className={`chal-part-tab-link ${activeTab === 'Rejected Evidence' ? 'chal-part-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Rejected Evidence')}
        >
          Rejected Evidence
        </div>
      </nav>

      {/* 2. Twin-Panel Review Architecture */}
      <section className="chal-part-split-layout" aria-label="Evidence validation workspace">
        
        {/* Left Column: Evidence Submissions List */}
        <div className="chal-part-left-card">
          <div className="chal-part-left-header">
            <span>EVIDENCE SUBMISSIONS LIST</span>
            <span>4 Awaiting</span>
          </div>

          <div className="chal-part-feed-list">
            {submissions.map((sub) => (
              <div 
                key={sub.id}
                className={`chal-part-feed-item ${activeSubId === sub.id ? 'chal-part-feed-item-active' : ''}`}
                onClick={() => setActiveSubId(sub.id)}
              >
                <div className="chal-part-feed-identity">
                  {sub.avatar ? (
                    <img className="chal-part-feed-avatar" src={sub.avatar} alt={sub.id} />
                  ) : (
                    <div className="chal-part-feed-avatar-placeholder" aria-hidden="true">👤</div>
                  )}
                  <div className="chal-part-feed-details">
                    <span className="chal-part-feed-name">{sub.id}</span>
                    <span className="chal-part-feed-title">{sub.title}</span>
                    <span className="chal-part-feed-streak">{sub.streak}</span>
                  </div>
                </div>

                <span className="chal-part-feed-pts">{sub.xp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deep-Dive Verification Workspace */}
        <div className="chal-part-right-card">
          <div className="chal-part-details-profile">
            <div className="chal-part-details-user">
              {activeSub.avatar ? (
                <img className="chal-part-details-avatar" src={activeSub.avatar} alt={activeSub.id} />
              ) : (
                <div className="chal-part-feed-avatar-placeholder" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>👤</div>
              )}
              <div className="chal-part-details-name-block">
                <strong>{activeSub.id}</strong>
                <div className="chal-part-details-dept-row">
                  <span className="chal-part-dept-badge">{activeSub.dept}</span>
                </div>
              </div>
            </div>

            <div className="chal-part-details-history">
              PERFORMANCE HISTORY
              <strong>{activeSub.performance}</strong>
            </div>
          </div>

          {/* Evidence Preview Container */}
          <article className="chal-part-evidence-card">
            <h4>Uploaded Evidence Assets</h4>
            
            <div className="chal-part-evidence-preview-container">
              <img className="chal-part-evidence-preview-img" src={activeSub.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&fit=crop&q=80'} alt="Completions evidence" />
            </div>

            <div className="chal-part-receipt-card">
              <span className="chal-part-receipt-icon" aria-hidden="true">📄</span>
              <div>
                <span className="chal-part-receipt-name">{activeSub.receiptName}</span>
                <div className="chal-part-receipt-meta">Calculated carbon ledger • {activeSub.receiptSize}</div>
              </div>
            </div>
          </article>

          {/* Actionable Toggle Mechanics */}
          <div className="chal-part-actions">
            <button type="button" className="chal-part-btn-reject">
              Reject Claims / Request Clarification
            </button>
            <button type="button" className="chal-part-btn-approve">
              ✓ Approve & Disburse {activeSub.xp.replace('+', '')}
            </button>
          </div>
        </div>
      </section>

      {/* 3. Bottom Activity Lifecycle Milestone Line */}
      <article className="chal-part-lifecycle">
        <h4>Challenge Journey Progress Timestamps</h4>
        
        <div className="chal-part-timeline-graphic">
          <div className="chal-part-timeline-line"></div>
          <div className="chal-part-timeline-nodes">
            <div className="chal-part-timeline-node">
              <div className="chal-part-timeline-node-dot chal-part-node-dot-done"></div>
              <span className="chal-part-timeline-node-title">Joined Event</span>
              <span className="chal-part-timeline-node-date">Oct 01, 2024</span>
            </div>
            <div className="chal-part-timeline-node">
              <div className="chal-part-timeline-node-dot chal-part-node-dot-done"></div>
              <span className="chal-part-timeline-node-title">Progress Submissions</span>
              <span className="chal-part-timeline-node-date">Oct 10, 2024</span>
            </div>
            <div className="chal-part-timeline-node">
              <div className="chal-part-timeline-node-dot chal-part-node-dot-done"></div>
              <span className="chal-part-timeline-node-title">Evidence Uploaded</span>
              <span className="chal-part-timeline-node-date">Oct 12, 2024</span>
            </div>
            <div className="chal-part-timeline-node">
              <div className="chal-part-timeline-node-dot chal-part-node-dot-active"></div>
              <span className="chal-part-timeline-node-title">Verification Audit</span>
              <span className="chal-part-timeline-node-date">In Progress</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

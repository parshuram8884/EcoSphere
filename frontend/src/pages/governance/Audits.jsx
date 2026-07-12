import { useState } from 'react'
import './Audits.css'

export default function Audits() {
  const [auditingBody, setAuditingBody] = useState('All')
  const [departmentArea, setDepartmentArea] = useState('All')

  const timelineSteps = [
    { title: 'Preparation & Scoping', status: 'done', desc: 'Scoping parameters finalized with SEC guidelines.', date: 'Aug 10, 2024' },
    { title: 'On-Site Verification', status: 'done', desc: 'Completed physical verification in main Shenzhen facility.', date: 'Sep 15, 2024' },
    { title: 'Draft Report Issuance', status: 'active', desc: 'Pending internal auditor sign-off and risk review.', date: 'Oct 12, 2024' },
    { title: 'Remediation Sign-Off', status: 'pending', desc: 'Awaiting corrective actions on pending list.', date: 'Nov 01, 2024' }
  ]

  const upcomingAudits = [
    { title: 'ISO 14001 External Recertification Audit', date: 'Oct 25, 2024', auditor: 'A. Sterling', status: 'Confirmed', body: 'ISO' }
  ]

  const historyLogs = [
    { name: 'SEC Climate Disclosure Audit', date: 'Oct 2023', body: 'SEC' },
    { name: 'Waste Diversion Validation', date: 'Jun 2024', body: 'ISO' }
  ]

  return (
    <div className="audits-container">
      {/* 1. Operational Audit Filter Bar */}
      <article className="audits-filter-bar">
        <div className="audits-filters-group">
          <select 
            className="audits-dropdown" 
            value={auditingBody} 
            onChange={(e) => setAuditingBody(e.target.value)}
          >
            <option value="All">Auditing Body: All</option>
            <option value="Internal">Internal</option>
            <option value="ISO">ISO</option>
            <option value="SEC">SEC</option>
          </select>

          <select 
            className="audits-dropdown" 
            value={departmentArea} 
            onChange={(e) => setDepartmentArea(e.target.value)}
          >
            <option value="All">Target Department: All</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Finance">Finance</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>
      </article>

      {/* 2. Two-Section Workspace Layout Matrix */}
      <section className="audits-workspace-grid" aria-label="Audit lifecycle and scheduler grid">
        
        {/* Left Panel: Milestone Lifecycle Timeline */}
        <article className="audits-card-panel">
          <div>
            <h3>Active Milestone Lifecycle Timeline</h3>
            <p>Tracking current ESG audit progress from scoping to final verification sign-off.</p>
          </div>

          <div className="audits-timeline-list">
            <div className="audits-timeline-line"></div>
            {timelineSteps.map((step, i) => (
              <div key={i} className="audits-timeline-item">
                <div className={`audits-timeline-node node-${step.status}`} aria-hidden="true"></div>
                <div className="audits-timeline-details">
                  <span className="audits-timeline-title">{step.title}</span>
                  <p className="audits-timeline-desc">{step.desc}</p>
                  <span className="audits-timeline-date">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Right Panel: Split Upcoming & Completed */}
        <div className="audits-right-split">
          {/* Section A: Upcoming Audits Queue */}
          <article className="audits-card-panel">
            <div>
              <h3>Upcoming Audits Queue</h3>
              <p>Next inspections scheduled across corporate divisions.</p>
            </div>

            {upcomingAudits.map((audit, i) => (
              <div key={i} className="upcoming-audit-card">
                <div className="upcoming-audit-header">
                  <span className="upcoming-audit-title">{audit.title}</span>
                  <span className="upcoming-audit-badge">{audit.body} Audit</span>
                </div>

                <div className="upcoming-audit-meta">
                  <div>
                    <span className="upcoming-audit-label">Target Date</span>
                    <span className="upcoming-audit-val" style={{ display: 'block' }}>{audit.date}</span>
                  </div>
                  <div>
                    <span className="upcoming-audit-label">Lead Auditor</span>
                    <span className="upcoming-audit-val" style={{ display: 'block' }}>{audit.auditor}</span>
                  </div>
                </div>
              </div>
            ))}
          </article>

          {/* Section B: Completed History Log */}
          <article className="audits-card-panel">
            <div>
              <h3>Completed History Log</h3>
              <p>Passed inspections with legally archived audit findings.</p>
            </div>

            <table className="completed-history-table">
              <thead>
                <tr>
                  <th>Audit Checklist Name</th>
                  <th>Body</th>
                  <th>Execution</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyLogs.map((log, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{log.name}</td>
                    <td>{log.body}</td>
                    <td>{log.date}</td>
                    <td>
                      <span className="download-report-link">
                        Download Report PDF
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>

      {/* 3. Corporate Audit Calendar Component */}
      <article className="audits-calendar-section">
        <h3>Corporate Audit Calendar</h3>
        
        <div className="csr-cal-days-grid" style={{ marginTop: 10 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <span key={d} className="csr-cal-weekday">{d}</span>
          ))}
          
          {/* Calendar grid offsets */}
          <span className="csr-cal-day csr-cal-day-other">29</span>
          <span className="csr-cal-day csr-cal-day-other">30</span>
          
          <span className="csr-cal-day">1</span>
          <span className="csr-cal-day">2</span>
          <span className="csr-cal-day">3</span>
          <span className="csr-cal-day">4</span>
          <span className="csr-cal-day">5</span>
          
          <span className="csr-cal-day">6</span>
          <span className="csr-cal-day">7</span>
          <span className="csr-cal-day">8</span>
          <span className="csr-cal-day">9</span>
          <span className="csr-cal-day">10</span>
          <span className="csr-cal-day">11</span>
          <span className="csr-cal-day">12</span>
          
          <span className="csr-cal-day">13</span>
          <span className="csr-cal-day">14</span>
          <span className="csr-cal-day">15</span>
          <span className="csr-cal-day">16</span>
          <span className="csr-cal-day">17</span>
          <span className="csr-cal-day">18</span>
          <span className="csr-cal-day">19</span>
          
          <span className="csr-cal-day">20</span>
          <span className="csr-cal-day">21</span>
          <span className="csr-cal-day">22</span>
          <span className="csr-cal-day">23</span>
          <span className="csr-cal-day">24</span>
          <span className="csr-cal-day csr-cal-day-event csr-cal-day-active">
            25
            <div className="csr-cal-marker-tooltip">
              ISO Recertification
            </div>
          </span>
          <span className="csr-cal-day">26</span>
          
          <span className="csr-cal-day">27</span>
          <span className="csr-cal-day">28</span>
          <span className="csr-cal-day">29</span>
          <span className="csr-cal-day">30</span>
          <span className="csr-cal-day">31</span>
          <span className="csr-cal-day csr-cal-day-other">1</span>
          <span className="csr-cal-day csr-cal-day-other">2</span>
        </div>
      </article>
    </div>
  )
}

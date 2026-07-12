import { useState } from 'react'
import './Training.css'

export default function Training() {
  const [filterQuery, setFilterQuery] = useState('')

  const modules = [
    { title: 'Code of Business Conduct 2026', tag: 'Social', pct: 94, participants: '450 Employees', color: '#059669' },
    { title: 'Workplace Ergonomics & Safety', tag: 'Safety', pct: 88, participants: '380 Employees', color: '#10b981' },
    { title: 'Anti-Bribery & Corruption Framework', tag: 'Governance', pct: 72, participants: '410 Employees', color: '#eab308' }
  ]

  const departments = [
    { name: 'Engineering', modules: 'Code of Conduct, Safety', headcount: 320, completed: 288, warnings: '0 Overdue', pct: 90 },
    { name: 'Logistics Operations', modules: 'Ergonomics, Code of Conduct', headcount: 240, completed: 180, warnings: '12 Overdue', pct: 75 },
    { name: 'Corporate Finance', modules: 'Anti-Bribery, Code of Conduct', headcount: 150, completed: 142, warnings: '0 Overdue', pct: 94 },
    { name: 'Product Marketing', modules: 'Code of Conduct', headcount: 110, completed: 82, warnings: '8 Overdue', pct: 74 },
    { name: 'Human Resources', modules: 'Code of Conduct, Inclusion', headcount: 80, completed: 78, warnings: '0 Overdue', pct: 97 }
  ]

  const filteredDepts = departments.filter(dept => 
    dept.name.toLowerCase().includes(filterQuery.toLowerCase())
  )

  return (
    <div className="training-container">
      {/* 1. High-Level Performance Row */}
      <section className="training-metrics-row" aria-label="Key performance metrics">
        {/* Metric 1 */}
        <article className="training-metric-card">
          <div className="training-metric-icon" aria-hidden="true">📊</div>
          <div className="training-metric-info">
            <span className="training-metric-label">Mandatory ESG Training</span>
            <strong className="training-metric-val">91% Complete</strong>
            <span className="training-metric-sub">↗ +2.3% MoM increase</span>
          </div>
        </article>

        {/* Metric 2 */}
        <article className="training-metric-card">
          <div className="training-metric-icon" aria-hidden="true">👥</div>
          <div className="training-metric-info">
            <span className="training-metric-label">Active Enrolled Employees</span>
            <strong className="training-metric-val">1,240 Enrollees</strong>
            <span className="training-metric-sub" style={{ color: '#64748b' }}>Across all global offices</span>
          </div>
        </article>

        {/* Metric 3 */}
        <article className="training-metric-card">
          <div className="training-metric-icon" aria-hidden="true">📜</div>
          <div className="training-metric-info">
            <span className="training-metric-label">Certificates Issued</span>
            <strong className="training-metric-val">342 Certificates</strong>
            <span className="training-metric-sub">This Month</span>
          </div>
        </article>
      </section>

      {/* 2. Active Educational Modules Grid */}
      <section className="training-modules-section" aria-label="Active Educational Modules">
        <h3>Active Educational Modules</h3>
        
        <div className="training-modules-grid">
          {modules.map((mod) => (
            <article key={mod.title} className="training-module-card">
              <div className="training-module-header">
                <div className="training-module-title-block">
                  <h4>{mod.title}</h4>
                </div>
                <span className="training-module-tag">{mod.tag}</span>
              </div>

              <div className="training-module-body">
                <div className="training-radial-chart" aria-hidden="true">
                  <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.915" 
                      fill="none" 
                      stroke={mod.color} 
                      strokeWidth="3.8" 
                      strokeDasharray={`${mod.pct} ${100 - mod.pct}`} 
                      strokeDashoffset="25" 
                    />
                  </svg>
                  <div className="training-radial-text">{mod.pct}%</div>
                </div>

                <div className="training-module-meta">
                  <span className="training-meta-label">Enrolled:</span>
                  <span className="training-meta-val">{mod.participants}</span>
                </div>
              </div>

              <button type="button" className="training-btn-view-perf">
                View Course Performance
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Department Progress Ledger Table */}
      <article className="training-table-card">
        <div className="training-table-header">
          <h3>Department Progress Ledger</h3>
          <input 
            type="search" 
            className="training-search-input" 
            placeholder="Filter by Department Name..." 
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>

        <div className="training-table-wrapper">
          <table className="training-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Assigned Course Modules</th>
                <th>Total Headcount</th>
                <th>Completed Tracks Count</th>
                <th>Overdue Warnings</th>
                <th>Aggregate Completion</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((dept) => {
                const isUnderThreshold = dept.pct < 80
                return (
                  <tr key={dept.name} style={{ background: isUnderThreshold ? '#fffbeb' : 'transparent' }}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{dept.name}</td>
                    <td>{dept.modules}</td>
                    <td>{dept.headcount}</td>
                    <td>{dept.completed} employees</td>
                    <td>
                      {isUnderThreshold ? (
                        <span className="badge-warn-flag">
                          ⚠️ {dept.warnings}
                        </span>
                      ) : (
                        <span style={{ color: '#64748b' }}>{dept.warnings}</span>
                      )}
                    </td>
                    <td>
                      <div className="training-table-progress-box">
                        <div className="goals-progress-track" style={{ width: '120px' }}>
                          <div 
                            className="goals-progress-fill" 
                            style={{ 
                              width: `${dept.pct}%`, 
                              background: isUnderThreshold ? '#d97706' : '#059669', 
                              height: '100%' 
                            }}
                          ></div>
                        </div>
                        <span className="training-table-progress-pct">{dept.pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

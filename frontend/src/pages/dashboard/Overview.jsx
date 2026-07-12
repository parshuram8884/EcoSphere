import { useState } from 'react'
import './Overview.css'
import { Link } from "react-router-dom"
import { useApi } from '../../hooks/useApi'

const complianceGrid = [
  { label: 'ISO', state: 'ok' },
  { label: 'GHG', state: 'ok' },
  { label: 'SLA', state: 'warn' },
  { label: 'LHP', state: 'warn' },
  { label: 'TAX', state: 'ok' },
  { label: 'SOC', state: 'good' },
  { label: 'EOD', state: 'good' },
  { label: 'EHS', state: 'alert' },
]

export default function Overview() {
  const { data, loading, error } = useApi('/dashboard/overview/')

  if (loading) return <div style={{ padding: 20 }}>Loading dashboard data...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error loading dashboard: {error}</div>
  if (!data) return null

  const summaryCards = [
    { label: 'Overall ESG', value: data.overall_esg.value, delta: data.overall_esg.delta, tone: 'green' },
    { label: 'Environmental', value: data.environmental.value, delta: data.environmental.delta, tone: 'teal' },
    { label: 'Social', value: data.social.value, delta: data.social.delta, tone: 'blue' },
    { label: 'Governance', value: data.governance.value, delta: data.governance.delta, tone: 'amber' },
  ]

  const getTone = (score) => {
    if (score >= 90) return 'green'
    if (score >= 80) return 'teal'
    if (score >= 70) return 'blue'
    return 'amber'
  }

  return (
    <>
      <section className="overview-grid-top" aria-label="Key metrics">
          {summaryCards.map((card) => (
            <article key={card.label} className={`overview-summary-card tone-${card.tone}`}>
              <div className="overview-summary-ring">
                <span>{card.value}</span>
              </div>
              <div>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
                <small>{card.delta}</small>
              </div>
            </article>
          ))}
        </section>

        <section className="overview-main-grid" id="analytics">
          <article className="overview-panel overview-panel-chart">
            <div className="overview-panel-header">
              <div>
                <h2>Carbon Emission Trends</h2>
                <p>Tracking Scope 1, 2, and 3 emissions for the current year.</p>
              </div>
              <div className="overview-legend">
                <span><i className="legend-dot legend-dot-green" />Scope 1</span>
                <span><i className="legend-dot legend-dot-blue" />Scope 2</span>
                <span><i className="legend-dot legend-dot-teal" />Scope 3</span>
              </div>
            </div>

            <div className="overview-chart-shell">
              <div className="overview-chart-tooltip">Mar  420 tCO2e  +8%</div>
              <div className="overview-chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="overview-chart-line" aria-hidden="true" />
            </div>

            <div className="overview-chart-axis">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </article>

          <aside className="overview-stack">
            <article className="overview-panel overview-panel-gauge">
              <div className="overview-panel-header">
                <div>
                  <h2>CSR Participation</h2>
                  <p>Employee engagement and volunteer participation.</p>
                </div>
              </div>

              <div className="overview-gauge">
                <div className="overview-gauge-center">
                  <strong>{data.csr_participation_pct}%</strong>
                  <span>Active Members</span>
                </div>
              </div>

              <div className="overview-gauge-meta">
                <span>Internal target 80%</span>
                <span>{data.csr_participation_pct >= 80 ? 'Target Achieved' : 'Below Target'}</span>
              </div>
            </article>

            <article className="overview-panel overview-panel-compliance" id="notifications">
              <div className="overview-panel-header">
                <div>
                  <h2>Compliance Grid</h2>
                  <p>Open Issues: {data.compliance_summary.open} | Resolved: {data.compliance_summary.resolved}</p>
                </div>
              </div>

              <div className="overview-compliance-grid">
                {complianceGrid.map((item) => (
                  <span key={item.label} className={`compliance-pill state-${item.state}`}>
                    {item.label}
                  </span>
                ))}
              </div>

              <p className="overview-panel-note">All dashboards are refreshed dynamically.</p>
            </article>
          </aside>
        </section>

        <section className="overview-secondary-grid" id="ranking">
          <article className="overview-panel">
            <div className="overview-panel-header">
              <div>
                <h2>Departmental Performance Index</h2>
                <p>Aligned performance by functional area.</p>
              </div>
            </div>

            <div className="overview-department-grid">
              {data.departments.map((department) => (
                <div key={department.name} className="department-card">
                  <div className="department-card-header">
                    <span>{department.name}</span>
                    <strong>{department.score}</strong>
                  </div>
                  <div className="department-bars">
                    <span className={`department-bar tone-${getTone(department.score)}`} />
                    <span className={`department-bar tone-${getTone(department.env)}`} />
                    <span className={`department-bar tone-${getTone(department.social)}`} />
                    <span className={`department-bar tone-${getTone(department.gov)}`} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="overview-multi-column">
            <article className="overview-panel" id="activity">
              <div className="overview-panel-header">
                <div>
                  <h2>Live Updates</h2>
                  <p>Recent operational signals.</p>
                </div>
              </div>

              <ul className="overview-list">
                {data.recent_activities.map((act, index) => (
                  <li key={index}>{act.message}</li>
                ))}
                {data.recent_activities.length === 0 && (
                  <li>No recent activity.</li>
                )}
              </ul>
            </article>

            <article className="overview-panel">
              <div className="overview-panel-header">
                <div>
                  <h2>Sustainability Roadmap</h2>
                  <p>Milestones and next targets.</p>
                </div>
              </div>

              <div className="overview-roadmap">
                <div>
                  <span>Hazard Reduction</span>
                  <strong>6%</strong>
                </div>
                <div>
                  <span>Water Intensity</span>
                  <strong>43%</strong>
                </div>
              </div>
            </article>

            <article className="overview-panel overview-panel-actions" id="settings">
              <button type="button" className="overview-action-card">Log Carbon Footprint</button>
              <button type="button" className="overview-action-card">Launch CSR Initiative</button>
              <button type="button" className="overview-action-card overview-action-card-primary">Settings</button>
            </article>
          </div>
        </section>
      </>
    )
}

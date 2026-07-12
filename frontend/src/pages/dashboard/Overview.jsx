import { useState } from 'react'
import './Overview.css'
import {Link } from "react-router-dom"

const summaryCards = [
  { label: 'Overall ESG', value: '84', delta: '+4.3%', tone: 'green' },
  { label: 'Environmental', value: '79', delta: '+2.1%', tone: 'teal' },
  { label: 'Social', value: '88', delta: '+5.8%', tone: 'blue' },
  { label: 'Governance', value: '85', delta: '+3.4%', tone: 'amber' },
]

const departments = [
  { name: 'R&D', score: '93%', color: 'green' },
  { name: 'Operations', score: '84%', color: 'blue' },
  { name: 'HR', score: '89%', color: 'teal' },
  { name: 'Logistics', score: '76%', color: 'amber' },
]

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
                  <strong>76%</strong>
                  <span>Active Members</span>
                </div>
              </div>

              <div className="overview-gauge-meta">
                <span>Internal target 80%</span>
                <span>Target + 15%</span>
              </div>
            </article>

            <article className="overview-panel overview-panel-compliance" id="notifications">
              <div className="overview-panel-header">
                <div>
                  <h2>Compliance Grid</h2>
                  <p>Quick visibility into controls and status flags.</p>
                </div>
              </div>

              <div className="overview-compliance-grid">
                {complianceGrid.map((item) => (
                  <span key={item.label} className={`compliance-pill state-${item.state}`}>
                    {item.label}
                  </span>
                ))}
              </div>

              <p className="overview-panel-note">All dashboards are refreshed every 4 days.</p>
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
              {departments.map((department) => (
                <div key={department.name} className="department-card">
                  <div className="department-card-header">
                    <span>{department.name}</span>
                    <strong>{department.score}</strong>
                  </div>
                  <div className="department-bars">
                    <span className={`department-bar tone-${department.color}`} />
                    <span className={`department-bar tone-${department.color}`} />
                    <span className={`department-bar tone-${department.color}`} />
                    <span className={`department-bar tone-${department.color}`} />
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
                <li>Judgement audit completed for Q4 review.</li>
                <li>GHG Scope 2 data pipeline processed.</li>
                <li>Training completion coverage reached 96%.</li>
                <li>Supplier review passed for 42 vendors.</li>
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

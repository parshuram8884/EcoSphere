import { useState } from 'react'
import './EnvironmentalDashboard.css'
import { useApi } from '../../hooks/useApi'

export default function EnvironmentalDashboard() {
  const [period, setPeriod] = useState('YTD')

  const { data, loading, error } = useApi('/environmental/dashboard/')

  if (loading) return <div style={{ padding: 20 }}>Loading environmental dashboard...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!data) return null

  return (
    <div className="env-dashboard-container">
      {/* 1. Strategic Command Ribbon */}
      <section className="env-command-ribbon" aria-label="Key Performance Indicators">
        <article className="env-kpi-card kpi-primary">
          <div className="kpi-icon-wrap" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="kpi-data-wrap">
            <span className="kpi-label">Total Carbon Footprint</span>
            <strong className="kpi-value">{data.total_footprint} <span className="kpi-unit">tCO₂e</span></strong>
          </div>
          <div className="kpi-trend trend-down">
            <span>↓ 4.2%</span> vs last year
          </div>
        </article>

        <article className="env-kpi-card">
          <div className="kpi-data-wrap">
            <span className="kpi-label">Energy Intensity Ratio</span>
            <strong className="kpi-value">12.4 <span className="kpi-unit">kWh/sqm</span></strong>
          </div>
          <div className="kpi-trend trend-down">
            <span>↓ 1.1%</span> vs last quarter
          </div>
        </article>

        <article className="env-kpi-card">
          <div className="kpi-data-wrap">
            <span className="kpi-label">Renewable Energy Mix</span>
            <strong className="kpi-value">42.8 <span className="kpi-unit">%</span></strong>
          </div>
          <div className="kpi-trend trend-up">
            <span>↑ 8.5%</span> vs last year
          </div>
        </article>

        <article className="env-kpi-card kpi-health">
          <div className="health-score-ring">
            <span>{data.health_score}</span>
          </div>
          <div className="kpi-data-wrap">
            <span className="kpi-label">Env Health Score</span>
            <strong className="kpi-status">Excellent</strong>
          </div>
        </article>
      </section>

      {/* 2. Main Analytics Grid */}
      <section className="env-main-grid" aria-label="Detailed Analytics">
        
        {/* Left Column: Charts */}
        <div className="env-chart-column">
          
          <article className="env-panel chart-panel">
            <div className="env-panel-header">
              <h3>Emission Source Breakdown</h3>
              <select className="env-select-minimal" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="YTD">Year to Date</option>
                <option value="Q3">Q3 2024</option>
                <option value="FY23">FY 2023</option>
              </select>
            </div>
            
            {/* Custom CSS Bar Chart (Accessible & Lightweight) */}
            <div className="env-bar-chart-container">
              {data.breakdown.map((item, idx) => (
                <div key={idx} className="chart-bar-group">
                  <div className="chart-bar-label">
                    <span>{item.name}</span>
                    <span>{item.value_str}</span>
                  </div>
                  <div className="chart-bar-track">
                    <div 
                      className={`chart-bar-fill bar-color-${idx + 1}`} 
                      style={{ width: `${item.pct}%` }}
                      role="progressbar" 
                      aria-valuenow={item.pct} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              ))}
              {data.breakdown.length === 0 && <p>No data available</p>}
            </div>
          </article>

          <article className="env-panel reduction-panel">
            <div className="env-panel-header">
              <h3>Reduction Initiatives Impact</h3>
              <button className="env-btn-text">View All</button>
            </div>
            <div className="initiatives-grid">
              <div className="initiative-card">
                <h4>Fleet Electrification</h4>
                <span className="init-impact">-120 tCO₂e</span>
                <div className="init-status status-active">Active</div>
              </div>
              <div className="initiative-card">
                <h4>Solar Panel Install HQ</h4>
                <span className="init-impact">-340 tCO₂e</span>
                <div className="init-status status-completed">Completed</div>
              </div>
              <div className="initiative-card">
                <h4>HVAC Optimization</h4>
                <span className="init-impact">-45 tCO₂e</span>
                <div className="init-status status-active">Active</div>
              </div>
            </div>
          </article>
        </div>

        {/* Right Column: Tracking & Alerts */}
        <aside className="env-side-column">
          
          <article className="env-panel target-panel">
            <div className="env-panel-header">
              <h3>Strategic Goals Tracking</h3>
            </div>
            <div className="target-list">
              {data.strategic_goals.map((goal, idx) => (
                <div key={idx} className="target-item">
                  <div className="target-meta">
                    <strong>{goal.label}</strong>
                    <span>{goal.progress}% Complete</span>
                  </div>
                  <div className="target-progress-track">
                    <div 
                      className={`target-progress-fill ${goal.progress >= 75 ? 'fill-good' : goal.progress >= 40 ? 'fill-warn' : 'fill-danger'}`} 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="target-deadline">{goal.meta}</span>
                </div>
              ))}
              {data.strategic_goals.length === 0 && <p>No strategic goals tracked yet.</p>}
            </div>
          </article>

          <article className="env-panel alert-panel">
            <div className="env-panel-header">
              <h3>Automated Anomalies</h3>
            </div>
            <ul className="anomaly-list">
              <li className="anomaly-item anomaly-high">
                <span className="anomaly-dot" />
                <div>
                  <strong>Spike in Natural Gas Usage</strong>
                  <p>Facility B reported 40% increase compared to 30-day moving avg.</p>
                </div>
              </li>
              <li className="anomaly-item anomaly-med">
                <span className="anomaly-dot" />
                <div>
                  <strong>Missing Logistics Data</strong>
                  <p>EU route emissions data gap detected for week 42.</p>
                </div>
              </li>
            </ul>
          </article>

        </aside>

      </section>
    </div>
  )
}

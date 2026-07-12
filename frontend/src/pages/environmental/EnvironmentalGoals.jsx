import { useState } from 'react'
import './EnvironmentalGoals.css'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function EnvironmentalGoals() {
  const [scope, setScope] = useState('Global (All)')

  const tasks = [
    { title: 'Review Scope 3 Data', meta: 'Due in 3 days', info: 'Priority' },
    { title: 'Vendor ESG Survey', meta: '94% completed', info: '94%' }
  ]

  return (
    <div className="goals-container">
      {/* 1. Header Card */}
      <article className="goals-header-card">
        <div className="goals-filter-group">
          <label htmlFor="scope-select">Reporting Scope</label>
          <select 
            id="scope-select" 
            className="goals-dropdown" 
            value={scope} 
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="Global (All)">Global (All)</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
          </select>
        </div>

        <div className="goals-header-stat">
          <div className="goals-stat-gauge" aria-hidden="true">
            <div className="goals-stat-gauge-text">58%</div>
          </div>
          <div className="goals-stat-details">
            <span className="goals-stat-label">Overall Completion</span>
            <strong className="goals-stat-val">58%</strong>
          </div>
        </div>

        <div className="goals-header-stat">
          <div className="goals-stat-gauge" style={{ background: 'conic-gradient(#059669 0% 90%, #e2e8f0 90% 100%)' }} aria-hidden="true">
            <div className="goals-stat-gauge-text">🛡️</div>
          </div>
          <div className="goals-stat-details">
            <span className="goals-stat-label">Target Confidence</span>
            <strong className="goals-stat-val goals-stat-val-green">High</strong>
          </div>
        </div>

        <div className="goals-header-actions">
          <div className="goals-export-group">
            <button type="button" className="env-btn-primary" onClick={() => {
              const cols = [
                { key: 'title', label: 'Goal' },
                { key: 'status', label: 'Status' },
                { key: 'progress', label: 'Progress' },
                { key: 'target', label: 'Target' },
              ]
              const goalsData = [
                { title: 'Net-Zero Carbon 2040', status: 'On-Track', progress: '45%', target: '0 tCO2e' },
                { title: 'Renewable Energy Transition', status: 'Needs Focus', progress: '42%', target: '100%' },
                { title: 'Water Waste Reduction', status: 'On-Track', progress: '82%', target: '100%' },
              ]
              exportToCSV(goalsData, cols, 'Environmental_Goals')
            }}>📥 CSV</button>
            <button type="button" className="env-btn-primary" onClick={() => {
              const cols = [
                { key: 'title', label: 'Goal' },
                { key: 'status', label: 'Status' },
                { key: 'progress', label: 'Progress' },
                { key: 'target', label: 'Target' },
              ]
              const goalsData = [
                { title: 'Net-Zero Carbon 2040', status: 'On-Track', progress: '45%', target: '0 tCO2e' },
                { title: 'Renewable Energy Transition', status: 'Needs Focus', progress: '42%', target: '100%' },
                { title: 'Water Waste Reduction', status: 'On-Track', progress: '82%', target: '100%' },
              ]
              const meta = [
                { label: 'Overall Completion', value: '58%' },
                { label: 'Target Confidence', value: 'High' },
              ]
              exportToPDF('Environmental Goals Report', meta, goalsData, cols, 'Environmental_Goals')
            }}>📄 PDF</button>
          </div>
        </div>
      </article>

      {/* 2. Goals Stack */}
      <section className="goals-list-stack" aria-label="Environmental Goals list">
        {/* Goal 1: Net-Zero Carbon 2040 */}
        <article className="goal-card-item">
          <div className="goal-card-top-row">
            <div className="goal-card-identity">
              <div className="goal-card-icon-box goal-icon-green" aria-hidden="true">
                🍃
              </div>
              <div className="goal-card-title-block">
                <h3>Net-Zero Carbon 2040</h3>
                <p>Strategic carbon reduction across all Scopes (1, 2, 3)</p>
              </div>
            </div>
            <span className="goal-badge-midterm">Mid-Term Goal</span>
          </div>

          <div className="goal-card-metrics-block">
            <div className="goal-progress-group">
              <div className="goal-progress-labels">
                <span>Current: 4,250 tCO₂e</span>
                <span>Target: 0 tCO₂e</span>
              </div>
              <div className="goal-progress-track">
                <div className="goal-progress-fill" style={{ width: '45%', background: '#059669' }}></div>
              </div>
            </div>

            <div className="goal-right-details">
              <div className="goal-detail-item">
                <span className="goal-detail-label">Deviation</span>
                <strong className="goal-detail-val goal-detail-val-green">-12.4%</strong>
              </div>
              <div className="goal-detail-item">
                <span className="goal-detail-label">Status</span>
                <strong className="goal-detail-val">On-Track</strong>
              </div>
            </div>
          </div>
        </article>

        {/* Goal 2: Renewable Energy Transition */}
        <article className="goal-card-item">
          <div className="goal-card-top-row">
            <div className="goal-card-identity">
              <div className="goal-card-icon-box goal-icon-green" aria-hidden="true">
                ☀️
              </div>
              <div className="goal-card-title-block">
                <h3>Renewable Energy Transition</h3>
                <p>Switching global manufacturing to 100% wind and solar</p>
              </div>
            </div>
            <span className="goal-badge-focus">Needs Focus</span>
          </div>

          <div className="goal-card-metrics-block">
            <div className="goal-progress-group" style={{ flex: 'none', width: '80px' }}>
              <strong style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>42%</strong>
            </div>

            <div className="goal-progress-group">
              <div className="goal-progress-labels">
                <span>Current: 42%</span>
                <span>Target: 100%</span>
              </div>
              <div className="goal-progress-track">
                <div className="goal-progress-fill" style={{ width: '42%', background: '#eab308' }}></div>
              </div>
            </div>

            <div className="goal-milestone-box">
              <span>⚠️</span>
              <div>
                <span style={{ display: 'block', fontSize: '0.62rem', color: '#64748b' }}>CRITICAL MILESTONE</span>
                <span>Due in 18 Months</span>
              </div>
            </div>
          </div>
        </article>

        {/* Goal 3: Water Waste Reduction */}
        <article className="goal-card-item">
          <div className="goal-card-top-row">
            <div className="goal-card-identity">
              <div className="goal-card-icon-box goal-icon-blue" aria-hidden="true">
                💧
              </div>
              <div className="goal-card-title-block">
                <h3>Water Waste Reduction</h3>
                <p>Close departmental closed loop water management systems</p>
              </div>
            </div>
          </div>

          <div className="goal-mini-cards-row">
            <div className="goal-mini-card">
              <div>
                <span className="goal-mini-label">Reduction</span>
                <div className="goal-mini-val">82%</div>
              </div>
              <span className="goal-mini-trend" style={{ color: '#059669' }}>+6% QoQ</span>
            </div>

            <div className="goal-mini-card">
              <div>
                <span className="goal-mini-label">Recycling</span>
                <div className="goal-mini-val">45%</div>
              </div>
              <span className="goal-mini-trend" style={{ color: '#ef4444' }}>-2% QoQ</span>
            </div>

            <div className="goal-mini-card">
              <div>
                <span className="goal-mini-label">Diversion</span>
                <div className="goal-mini-val">90%</div>
              </div>
              <span className="goal-mini-trend" style={{ color: '#64748b' }}>Steady</span>
            </div>
          </div>
        </article>
      </section>

      {/* 3. Goal Timeline */}
      <article className="timeline-card">
        <div className="goal-card-top-row">
          <div className="goal-card-title-block">
            <h3>Goal Timeline & Forecast</h3>
            <p>Tracking historical achievements against predictive rollout phases</p>
          </div>
          <div className="timeline-legend">
            <span className="env-legend-item"><span className="timeline-dot-completed"></span>Completed</span>
            <span className="env-legend-item"><span className="timeline-dot-projected"></span>Projected</span>
          </div>
        </div>

        <div className="timeline-graphic">
          <div className="timeline-line"></div>
          <div className="timeline-nodes">
            {/* Node 1 */}
            <div className="timeline-node">
              <div className="timeline-node-dot node-dot-completed"></div>
              <span className="timeline-node-title">ISO 14001 Certified</span>
              <span className="timeline-node-date">OCT 2023</span>
            </div>
            {/* Node 2 */}
            <div className="timeline-node">
              <div className="timeline-node-dot node-dot-completed"></div>
              <span className="timeline-node-title">Solar Phase 1 Complete</span>
              <span className="timeline-node-date">JUN 2024</span>
            </div>
            {/* Node 3 */}
            <div className="timeline-node">
              <div className="timeline-node-dot node-dot-current"></div>
              <span className="timeline-node-title node-title-current">Current Quarter</span>
              <span className="timeline-node-date">Q3 2024</span>
            </div>
            {/* Node 4 */}
            <div className="timeline-node">
              <div className="timeline-node-dot node-dot-projected"></div>
              <span className="timeline-node-title">LEED Platinum Cert</span>
              <span className="timeline-node-date">DEC 2024</span>
            </div>
          </div>
        </div>
      </article>

      {/* 4. Bottom Grid */}
      <section className="goals-bottom-grid" aria-label="Goals forecasts and tasks">
        {/* Left Column Card */}
        <article className="goals-bottom-card">
          <h3>Reduction Performance Index</h3>
          
          <div className="env-svg-chart-container" style={{ height: '140px' }}>
            <svg width="100%" height="100%" viewBox="0 0 320 140" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="320" y2="20" stroke="#f8fafc" strokeWidth="1" />
              <line x1="0" y1="60" x2="320" y2="60" stroke="#f8fafc" strokeWidth="1" />
              <line x1="0" y1="100" x2="320" y2="100" stroke="#f8fafc" strokeWidth="1" />

              {/* Planned line (Dotted grey) */}
              <path 
                d="M 10 120 L 80 102 L 150 86 L 220 70 L 310 52" 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                strokeDasharray="4,4" 
              />

              {/* Actual line (Solid green) */}
              <path 
                d="M 10 120 Q 80 110, 150 96 T 310 40" 
                fill="none" 
                stroke="#059669" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          <div className="goals-bottom-chart-footer">
            <div className="goals-bottom-chart-stat">
              <span>Volatility</span>
              <strong>+4.2%</strong>
            </div>
            <div className="goals-bottom-chart-stat">
              <span>Projection Accuracy</span>
              <strong>+92%</strong>
            </div>
            <div className="goals-bottom-chart-stat">
              <span>Projected Deficit</span>
              <strong>2,120 t</strong>
            </div>
          </div>
        </article>

        {/* Right Column Cards */}
        <div className="goals-right-column">
          {/* Eco-Intelligence insight card */}
          <article className="goals-insight-card">
            <div className="goals-insight-header">
              <span>💡</span> Eco-Intelligence Insight
            </div>
            <p className="goals-insight-text">
              Your Logistics water consumption is currently 8% above the linear projection. Accelerating the greywater redirection project in the Asia-Pacific hub could bridge the gap by Q4.
            </p>
            <button type="button" className="goals-insight-btn">
              Apply Strategy
            </button>
          </article>

          {/* Active Tasks card */}
          <article className="goals-tasks-card">
            <div className="goals-tasks-header-row">
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Active Tasks</h3>
              <span className="goals-tasks-badge">Priority</span>
            </div>

            <div className="goals-tasks-list">
              {tasks.map((task) => (
                <div key={task.title} className="goals-task-item">
                  <div className="goals-task-label-info">
                    <span className="goals-task-title">{task.title}</span>
                    <span className="goals-task-sub" style={{ color: task.info === 'Priority' ? '#ef4444' : '#64748b' }}>
                      {task.meta}
                    </span>
                  </div>
                  <span className="goals-task-pct">{task.info}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

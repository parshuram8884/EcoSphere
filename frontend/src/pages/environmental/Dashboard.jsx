import './Dashboard.css'
import { downloadReport } from '../../services/api'

export default function Dashboard() {
  const breakdownData = [
    { name: 'Manufacturing', value: '2,420 tCO2e', pct: 65, color: '#064e3b' },
    { name: 'Logistics', value: '1,350 tCO2e', pct: 36, color: '#10b981' },
    { name: 'Corporate Offices', value: '450 tCO2e', pct: 12, color: '#34d399' }
  ]

  const strategicGoals = [
    { label: 'Renewable Energy Target', progress: 82, meta: 'Deadline: Dec 2026 • On Track', color: '#10b981' },
    { label: 'Waste Diversion Goal', progress: 64, meta: 'Deadline: Jun 2024 • Needs Focus', color: '#eab308' },
    { label: 'Fleet Electrification', progress: 38, meta: 'Deadline: Dec 2023 • Early Stage', color: '#64748b' }
  ]

  return (
    <div className="env-dashboard-grid">
      {/* 1. Top Highlight Card */}
      <article className="env-health-card">
        <div className="env-health-gauge" aria-hidden="true">
          <div className="env-health-gauge-text">
            <strong>78</strong>
            <span>/ 100</span>
          </div>
        </div>
        <div className="env-health-info">
          <h2>Environmental Health Score</h2>
          <div className="env-health-meta">
            <span className="env-badge-progress">Good Progress</span>
            <span className="env-badge-mom">↗ +4.2% MoM</span>
          </div>
        </div>
        <div className="env-health-actions">
          <button type="button" className="env-btn-primary" onClick={async () => {
            const r = await downloadReport('environmental', 'pdf')
            if (!r.ok) alert('Export failed: ' + r.message)
          }}>
            Export Report
          </button>
          <button type="button" className="env-btn-secondary">
            Recalculate
          </button>
        </div>
      </article>

      {/* 2. Three Metric Cards Row */}
      <section className="env-metrics-row" aria-label="Key environmental metrics">
        {/* Metric 1 */}
        <article className="env-metric-card">
          <div className="env-card-header-row">
            <span className="env-metric-label">Gross Carbon Footprint</span>
            <span className="env-metric-icon">CO₂</span>
          </div>
          <strong className="env-metric-val">4,250 tCO₂e</strong>
          <span className="env-metric-delta env-delta-down">↓ 12% reduction vs baseline</span>
        </article>

        {/* Metric 2 */}
        <article className="env-metric-card">
          <div className="env-card-header-row">
            <span className="env-metric-label">Offsets & Credits</span>
            <span className="env-metric-icon">✓</span>
          </div>
          <strong className="env-metric-val">1,120 tCO₂e</strong>
          <span className="env-metric-delta env-delta-info">Verified Gold Standard</span>
        </article>

        {/* Metric 3 */}
        <article className="env-metric-card">
          <div className="env-card-header-row">
            <span className="env-metric-label">Net Intensity Measure</span>
            <span className="env-metric-icon">📈</span>
          </div>
          <strong className="env-metric-val">0.45 tCO₂e / $1M Rev</strong>
          <span className="env-metric-delta env-delta-down">↘ -3% YoY efficiency</span>
        </article>
      </section>

      {/* 3. Middle-Lower Charts Grid */}
      <section className="env-charts-row" aria-label="Emission trends and source breakdown">
        {/* Chart 1: Emission Trend */}
        <article className="env-chart-card">
          <div className="env-chart-header">
            <h3>Emission Trend (Scope 1, 2, 3)</h3>
            <div className="env-chart-legends">
              <span className="env-legend-item"><span className="legend-dot-scope1"></span>Scope 1</span>
              <span className="env-legend-item"><span className="legend-dot-scope2"></span>Scope 2</span>
              <span className="env-legend-item"><span className="legend-dot-scope3"></span>Scope 3</span>
            </div>
          </div>

          <div className="env-svg-chart-container">
            <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

              {/* Scope 1 Line (Dark Green) */}
              <path 
                d="M 10 140 L 50 135 L 90 144 L 130 132 L 170 128 L 210 130 L 250 120 L 290 110 L 330 115 L 370 102 L 410 106 L 490 92" 
                fill="none" 
                stroke="#064e3b" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />

              {/* Scope 2 Line (Emerald Green) */}
              <path 
                d="M 10 160 L 50 152 L 90 154 L 130 142 L 170 144 L 210 138 L 250 132 L 290 126 L 330 130 L 370 120 L 410 124 L 490 110" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Scope 3 Line (Light Mint Green) */}
              <path 
                d="M 10 172 L 50 168 L 90 168 L 130 160 L 170 162 L 210 154 L 250 150 L 290 144 L 330 146 L 370 138 L 410 138 L 490 128" 
                fill="none" 
                stroke="#a7f3d0" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <div className="env-chart-axis-x">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </article>

        {/* Chart 2: Carbon Sources Mix */}
        <article className="env-chart-card">
          <div className="env-chart-header">
            <h3>Carbon Sources Mix</h3>
          </div>

          <div className="env-donut-wrapper">
            <div className="env-donut-chart">
              <svg width="100%" height="100%" viewBox="0 0 36 36" className="donut">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="4"></circle>
                
                {/* Segment 1: Electricity (45%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#064e3b" strokeWidth="4.2" strokeDasharray="45 55" strokeDashoffset="25"></circle>
                
                {/* Segment 2: Fleet (25%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.2" strokeDasharray="25 75" strokeDashoffset="-20"></circle>
                
                {/* Segment 3: Heating (20%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#34d399" strokeWidth="4.2" strokeDasharray="20 80" strokeDashoffset="-45"></circle>

                {/* Segment 4: Waste (10%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a7f3d0" strokeWidth="4.2" strokeDasharray="10 90" strokeDashoffset="-65"></circle>
              </svg>
            </div>

            <div className="env-donut-legends-list">
              <div className="env-donut-legend-row">
                <span className="env-donut-dot-label">
                  <span className="legend-dot-scope1"></span> Electricity
                </span>
                <span>45%</span>
              </div>
              <div className="env-donut-legend-row">
                <span className="env-donut-dot-label">
                  <span className="legend-dot-scope2"></span> Fleet
                </span>
                <span>25%</span>
              </div>
              <div className="env-donut-legend-row">
                <span className="env-donut-dot-label">
                  <span className="legend-dot-scope3"></span> Heating
                </span>
                <span>20%</span>
              </div>
              <div className="env-donut-legend-row">
                <span className="env-donut-dot-label">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a7f3d0', display: 'inline-block' }}></span> Waste
                </span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 4. Bottom Grid */}
      <section className="env-bottom-grid" aria-label="Detailed breakdowns">
        {/* Breakdown Card */}
        <article className="env-chart-card">
          <div className="env-chart-header">
            <h3>Department Carbon Breakdown</h3>
          </div>

          <div className="env-breakdown-list">
            {breakdownData.map((item) => (
              <div key={item.name} className="env-breakdown-row">
                <div className="env-breakdown-meta">
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
                <div className="env-breakdown-track">
                  <div className="env-breakdown-fill" style={{ width: `${item.pct}%`, background: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Regulatory Cap Card */}
        <article className="env-chart-card">
          <div className="env-chart-header">
            <h3>Emission vs Regulatory Cap</h3>
          </div>

          <div className="env-svg-chart-container">
            <svg width="100%" height="100%" viewBox="0 0 240 120" preserveAspectRatio="none">
              {/* Regulatory Cap Line */}
              <line x1="0" y1="70" x2="240" y2="70" className="env-cap-indicator-line" />
              <text x="180" y="64" className="env-cap-label">Regulatory Cap</text>

              {/* Area Chart Gradient Fill */}
              <defs>
                <linearGradient id="cap-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              <path 
                d="M 10 110 L 50 102 L 90 98 L 135 106 L 175 96 L 210 92 L 230 84 L 230 120 L 10 120 Z" 
                fill="url(#cap-area-grad)" 
              />
              <path 
                d="M 10 110 L 50 102 L 90 98 L 135 106 L 175 96 L 210 92 L 230 84" 
                fill="none" 
                stroke="#047857" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          
          <div className="env-chart-axis-x" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4 [Projected]</span>
          </div>
        </article>
      </section>

      {/* 5. Bottom strategic goals */}
      <article className="env-goals-card">
        <h3>
          <span>🏁</span> Environmental Strategic Goals
        </h3>

        <div className="env-goals-row">
          {strategicGoals.map((goal) => (
            <div key={goal.label} className="env-goal-item">
              <div className="env-goal-label-pct">
                <span>{goal.label}</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="env-breakdown-track">
                <div className="env-breakdown-fill" style={{ width: `${goal.progress}%`, background: goal.color }}></div>
              </div>
              <span className="env-goal-subtext">{goal.meta}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

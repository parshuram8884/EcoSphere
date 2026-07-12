import './ESGSummary.css'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function ESGSummary() {
  const departments = [
    { name: 'Operations', env: 'High', soc: 'Medium', gov: 'High' },
    { name: 'Supply Chain', env: 'Medium', soc: 'High', gov: 'Medium' },
    { name: 'Retail Locations', env: 'Medium', soc: 'Medium', gov: 'High' },
    { name: 'Corporate Office', env: 'High', soc: 'High', gov: 'High' }
  ]

  const handleExportFull = (format) => {
    const cols = [
      { key: 'name', label: 'Business Unit' },
      { key: 'env', label: 'Environmental' },
      { key: 'soc', label: 'Social' },
      { key: 'gov', label: 'Governance' },
    ]
    if (format === 'csv') {
      exportToCSV(departments, cols, 'ESG_Summary')
    } else {
      const meta = [
        { label: 'ESG Rating', value: 'A-' },
        { label: 'Corporate Score', value: '86/100' },
      ]
      exportToPDF('ESG Summary Report', meta, departments, cols, 'ESG_Summary')
    }
  }

  const getPerfTag = (score) => {
    if (score === 'High') return <span className="perf-tag perf-tag-high">High</span>
    return <span className="perf-tag perf-tag-med">Medium</span>
  }

  return (
    <div className="summary-container">
      {/* 1. Master ESG Unified Index Header */}
      <article className="summary-master-header">
        <div className="summary-score-block">
          <div className="summary-rating-badge" aria-label="Corporate ESG Rating: A minus">A-</div>
          <div className="summary-score-details">
            <h2 className="summary-score-title">86/100 Corporate Points Available</h2>
            <p className="summary-score-text">
              EcoSphere ESG Index climbed 4.2 points YoY, driven by Scope 1 reductions in Manufacturing facilities and verified 98.2% policy compliance levels.
            </p>
          </div>
        </div>

        <div className="summary-export-group">
          <button 
            type="button" 
            className="btn-export-full"
            onClick={() => handleExportFull('csv')}
          >
            📥 CSV
          </button>
          <button 
            type="button" 
            className="btn-export-full"
            onClick={() => handleExportFull('pdf')}
          >
            📄 PDF
          </button>
        </div>
      </article>

      {/* 2. Cross-Pillar Radar Analytics Section */}
      <section className="summary-radar-grid" aria-label="ESG multi-pillar performance metrics">
        
        {/* Left Column: Multi-Pillar Radar Chart */}
        <article className="summary-card-panel">
          <div>
            <h3>Cross-Pillar Performance Radar</h3>
            <p>Comparing internal performance index scores directly against competitor peer benchmarks.</p>
          </div>

          <div className="env-svg-chart-container" style={{ height: '200px', display: 'grid', placeItems: 'center' }}>
            {/* 3-Axis Radar Diagram */}
            <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Spider radar chart tracking Environmental, Social, and Governance ratings">
              {/* Web Lines */}
              <polygon points="100,20 170,140 30,140" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="100,50 150,130 50,130" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="100,80 130,120 70,120" fill="none" stroke="#e2e8f0" strokeWidth="1" />

              {/* Axis Labels */}
              <text x="100" y="15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">ENVIRONMENTAL (E)</text>
              <text x="180" y="145" textAnchor="start" fontSize="9" fontWeight="700" fill="#475569">SOCIAL (S)</text>
              <text x="20" y="145" textAnchor="end" fontSize="9" fontWeight="700" fill="#475569">GOVERNANCE (G)</text>

              {/* Competitor Benchmarks (Scope area) */}
              <polygon points="100,60 145,120 60,115" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

              {/* Internal Performance (Scope area) */}
              <polygon points="100,35 155,130 45,135" fill="rgba(5,150,105,0.15)" stroke="#059669" strokeWidth="2.5" />
            </svg>
          </div>
          
          <div className="goals-legend-row" style={{ justifyContent: 'center' }}>
            <span className="goals-legend-item"><span className="goals-legend-dot" style={{ background: '#059669' }}></span>EcoSphere Index</span>
            <span className="goals-legend-item"><span className="goals-legend-dot" style={{ background: '#94a3b8' }}></span>Competitor Benchmark</span>
          </div>
        </article>

        {/* Right Column: Inter-Departmental Performance Grid */}
        <article className="summary-card-panel">
          <div>
            <h3>Inter-Departmental Performance Matrix</h3>
            <p>Scorecards comparison across company business units against ESG standards.</p>
          </div>

          <table className="summary-perf-table">
            <thead>
              <tr>
                <th>Business Unit</th>
                <th>Environmental</th>
                <th>Social</th>
                <th>Governance</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{dept.name}</td>
                  <td>{getPerfTag(dept.env)}</td>
                  <td>{getPerfTag(dept.soc)}</td>
                  <td>{getPerfTag(dept.gov)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>

      {/* 3. Unified Strategic Trajectory Chart */}
      <article className="trajectory-section">
        <div>
          <h3>Unified Strategic Trajectory</h3>
          <p>5-year macro roadmap forecasting pathways to full corporate Net-Zero and Equity targets.</p>
        </div>

        <div className="env-svg-chart-container" style={{ height: '180px' }}>
          <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="traj-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="45" x2="320" y2="45" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="90" x2="320" y2="90" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="135" x2="320" y2="135" stroke="#f1f5f9" strokeWidth="1" />

            {/* Area path */}
            <path 
              d="M 10 145 L 80 120 L 150 95 L 220 70 L 310 40 L 310 170 L 10 170 Z" 
              fill="url(#traj-grad)" 
            />

            {/* Historical line path */}
            <path 
              d="M 10 145 L 80 120 L 150 95" 
              fill="none" 
              stroke="#059669" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />

            {/* Forecast Projection path */}
            <path 
              d="M 150 95 L 220 70 L 310 40" 
              fill="none" 
              stroke="#059669" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeDasharray="4 3" 
            />
          </svg>
        </div>
        
        <div className="env-chart-axis-x" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', marginTop: 4 }}>
          <span>2022 (Hist)</span><span>2023 (Hist)</span><span>2024 (Current)</span><span>2026 (Proj)</span><span>2030 (Target)</span>
        </div>
      </article>
    </div>
  )
}

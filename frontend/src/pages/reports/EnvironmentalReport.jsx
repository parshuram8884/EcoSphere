import { useState } from 'react'
import './EnvironmentalReport.css'

export default function EnvironmentalReport() {
  const [fiscalYear, setFiscalYear] = useState('FY 2024')
  const [scope, setScope] = useState('Global')
  const [standard, setStandard] = useState('GHG Protocol')
  const [isExportOpen, setIsExportOpen] = useState(false)

  const balanceSheet = [
    { cat: 'Scope 1: Stationary Combustion', coeff: 'Natural Gas (2.021 kg CO₂e / m³)', savings: '$14,250', conf: 'High' },
    { cat: 'Scope 2: Purchased Electricity', coeff: 'US Grid eGRID (0.324 kg CO₂e / kWh)', savings: '$8,800', conf: 'High' },
    { cat: 'Scope 3: Business Travel', coeff: 'Flight EPA (0.150 kg CO₂e / pkm)', savings: '$2,100', conf: 'Medium' }
  ]

  const handleDownload = (format) => {
    alert(`Initiating download for Environmental Compliance Report in ${format} format...`)
    setIsExportOpen(false)
  }

  const handlePrint = () => {
    alert('Simulating Print Preview: Compiling layout coordinates for printer output...')
  }

  return (
    <div className="reports-container">
      {/* 1. Document Export & Global Filter Ribbon */}
      <article className="reports-filter-ribbon">
        <div className="reports-selects-group">
          <select 
            className="reports-dropdown" 
            value={fiscalYear} 
            onChange={(e) => setFiscalYear(e.target.value)}
          >
            <option value="FY 2024">Fiscal Year: FY 2024</option>
            <option value="FY 2023">Fiscal Year: FY 2023</option>
            <option value="FY 2022">Fiscal Year: FY 2022</option>
          </select>

          <select 
            className="reports-dropdown" 
            value={scope} 
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="Global">Scope: Global Facilities</option>
            <option value="Regional">Scope: Regional Hubs</option>
          </select>

          <select 
            className="reports-dropdown" 
            value={standard} 
            onChange={(e) => setStandard(e.target.value)}
          >
            <option value="GHG Protocol">Standard: GHG Protocol</option>
            <option value="EPA">Standard: EPA Guidelines</option>
          </select>
        </div>

        <div className="reports-actions-group">
          <button 
            type="button" 
            className="btn-export-dropdown"
            onClick={() => setIsExportOpen(!isExportOpen)}
          >
            📤 Export Data ▾
            {isExportOpen && (
              <div className="export-nested-menu">
                <button type="button" className="export-nested-item" onClick={() => handleDownload('PDF')}>Download PDF</button>
                <button type="button" className="export-nested-item" onClick={() => handleDownload('Excel')}>Export Excel (.xlsx)</button>
                <button type="button" className="export-nested-item" onClick={() => handleDownload('CSV')}>Download CSV Ledger</button>
              </div>
            )}
          </button>
          
          <button type="button" className="env-btn-secondary" onClick={handlePrint}>
            🖨️ Print Preview
          </button>
        </div>
      </article>

      {/* 2. Dense Compliance Charting Layout Matrix */}
      <section className="reports-workspace-grid" aria-label="Environmental compliance charts grid">
        {/* Chart 1: Scope 1, 2, 3 Longitudinal Trend */}
        <article className="reports-card-panel">
          <div>
            <h3>Scope 1, 2, 3 Longitudinal Trend</h3>
            <p>5-year macro operational horizon tracking metric tonnes of CO₂e emissions.</p>
          </div>

          <div className="env-svg-chart-container" style={{ height: '180px' }}>
            <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="area-trend-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="320" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="320" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="320" y2="140" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area path */}
              <path 
                d="M 10 160 L 80 130 L 150 115 L 220 90 L 310 65 L 310 170 L 10 170 Z" 
                fill="url(#area-trend-grad)" 
              />

              {/* Line path */}
              <path 
                d="M 10 160 L 80 130 L 150 115 L 220 90 L 310 65" 
                fill="none" 
                stroke="#059669" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          
          <div className="env-chart-axis-x" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', marginTop: 4 }}>
            <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span>
          </div>
        </article>

        {/* Chart 2: Resource Intensity Benchmarks */}
        <article className="reports-card-panel">
          <div>
            <h3>Resource Intensity Benchmarks</h3>
            <p>Comparing annual resource usage variances against strict regulatory thresholds.</p>
          </div>

          <div className="benchmarks-list">
            {/* Water Consumption */}
            <div className="benchmark-item">
              <div className="benchmark-meta">
                <span>Water Consumption</span>
              </div>
              <div className="benchmark-bars-group">
                <div className="benchmark-bar-row">
                  <span className="benchmark-bar-label">Actual</span>
                  <div className="benchmark-bar-track">
                    <div className="benchmark-bar-fill fill-actual" style={{ width: '68%' }}></div>
                  </div>
                  <span className="benchmark-val-text">6,820 m³</span>
                </div>
                <div className="benchmark-bar-row">
                  <span className="benchmark-bar-label">Limit</span>
                  <div className="benchmark-bar-track">
                    <div className="benchmark-bar-fill fill-limit" style={{ width: '90%' }}></div>
                  </div>
                  <span className="benchmark-val-text">9,000 m³</span>
                </div>
              </div>
            </div>

            {/* Grid Electricity */}
            <div className="benchmark-item">
              <div className="benchmark-meta">
                <span>Grid Electricity</span>
              </div>
              <div className="benchmark-bars-group">
                <div className="benchmark-bar-row">
                  <span className="benchmark-bar-label">Actual</span>
                  <div className="benchmark-bar-track">
                    <div className="benchmark-bar-fill fill-actual" style={{ width: '82%' }}></div>
                  </div>
                  <span className="benchmark-val-text">421k kWh</span>
                </div>
                <div className="benchmark-bar-row">
                  <span className="benchmark-bar-label">Limit</span>
                  <div className="benchmark-bar-track">
                    <div className="benchmark-bar-fill fill-limit" style={{ width: '95%' }}></div>
                  </div>
                  <span className="benchmark-val-text">500k kWh</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 3. Tabular Reporting Breakdown Grid */}
      <article className="reports-table-card">
        <div className="reports-table-header">
          <h3>Environmental Balance Sheet</h3>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Emission Category</th>
                <th>Coefficient Mapped</th>
                <th>Direct Costs Saved</th>
                <th>Confidence Rating</th>
              </tr>
            </thead>
            <tbody>
              {balanceSheet.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.cat}</td>
                  <td><code>{row.coeff}</code></td>
                  <td style={{ fontWeight: 800, color: '#059669' }}>{row.savings}</td>
                  <td>
                    <span className={`badge-confidence ${row.conf === 'High' ? 'conf-high' : 'conf-medium'}`}>
                      {row.conf} Confidence
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

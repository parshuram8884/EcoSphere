import { useState } from 'react'
import './Analytics.css'
import { useApi } from '../../hooks/useApi'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function Analytics() {
  const [reportingYear, setReportingYear] = useState('FY 2024 [Current]')
  const [scopeVariant, setScopeVariant] = useState('All Scopes [1, 2, 3]')
  const [location, setLocation] = useState('Global Operations')

  const { data, loading, error } = useApi('/dashboard/analytics/')

  if (loading) return <div style={{ padding: 20 }}>Loading analytics...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!data) return null

  // Calculate top sources from breakdown
  const topSources = data.source_breakdown.slice(0, 4)

  return (
    <>
      {/* Filters Controls Row */}
      <div className="analytics-filters-row">
        <div className="analytics-select-group">
          <div className="analytics-select-box">
            <label htmlFor="year-select">Reporting Year</label>
            <select 
              id="year-select"
              className="analytics-dropdown" 
              value={reportingYear} 
              onChange={(e) => setReportingYear(e.target.value)}
            >
              <option value="FY 2024 [Current]">FY 2024 [Current]</option>
              <option value="FY 2023">FY 2023</option>
              <option value="FY 2022">FY 2022</option>
            </select>
          </div>

          <div className="analytics-select-box">
            <label htmlFor="scope-select">Scope Variant</label>
            <select 
              id="scope-select"
              className="analytics-dropdown" 
              value={scopeVariant} 
              onChange={(e) => setScopeVariant(e.target.value)}
            >
              <option value="All Scopes [1, 2, 3]">All Scopes [1, 2, 3]</option>
              <option value="Scope 1 & 2">Scope 1 & 2</option>
              <option value="Scope 3 Only">Scope 3 Only</option>
            </select>
          </div>

          <div className="analytics-select-box">
            <label htmlFor="location-select">Global Location</label>
            <select 
              id="location-select"
              className="analytics-dropdown" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Global Operations">Global Operations</option>
              <option value="North America">North America</option>
              <option value="European Hub">European Hub</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
          </div>
        </div>

        <div className="analytics-export-group">
          <button type="button" className="analytics-export-btn" onClick={() => {
            if (!data || !data.source_breakdown) return
            const cols = [
              { key: 'source', label: 'Source' },
              { key: 'total', label: 'Emissions (tCO2e)' },
            ]
            const exportData = data.source_breakdown.map(s => ({
              source: s.source,
              total: Math.round(s.total) + ' t'
            }))
            exportToCSV(exportData, cols, 'Emissions_Analytics')
          }}>📥 CSV</button>
          <button type="button" className="analytics-export-btn" onClick={() => {
            if (!data || !data.source_breakdown) return
            const cols = [
              { key: 'source', label: 'Source' },
              { key: 'total', label: 'Emissions (tCO2e)' },
            ]
            const exportData = data.source_breakdown.map(s => ({
              source: s.source,
              total: Math.round(s.total) + ' t'
            }))
            const meta = [
              { label: 'Total Emissions', value: data.total_emissions.toLocaleString() + ' tCO2e' },
              { label: 'Source Count', value: String(data.source_breakdown.length) },
            ]
            exportToPDF('Emissions Analytics Report', meta, exportData, cols, 'Emissions_Analytics')
          }}>📄 PDF</button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="analytics-dashboard-grid">
        {/* Chart 1: Carbon Trends & Offsets */}
        <article className="analytics-card">
          <div className="analytics-card-header analytics-trends-header">
            <div>
              <h3>Carbon Trends & Offsets</h3>
              <p>Gross emissions vs. carbon credit sequestration curve. Total: {data.total_emissions.toLocaleString()} tCO2e</p>
            </div>
            <div className="analytics-legend">
              <span className="analytics-legend-item">
                <span className="legend-dot-gross"></span> Gross Emissions
              </span>
              <span className="analytics-legend-item">
                <span className="legend-dot-offset"></span> Offsets
              </span>
            </div>
          </div>

          <div className="analytics-chart-container">
            {/* Responsive SVG Area & Line Chart */}
            <svg width="100%" height="100%" viewBox="0 0 500 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gross-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#064e3b" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="offset-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="190" x2="500" y2="190" stroke="#f1f5f9" strokeWidth="1" />

              {/* Gross Emissions Fills & Lines (Dark Green) */}
              <path 
                d="M 0 120 C 100 120, 150 130, 250 120 C 350 110, 400 160, 500 160 L 500 240 L 0 240 Z" 
                fill="url(#gross-grad)" 
              />
              <path 
                d="M 0 120 C 100 120, 150 130, 250 120 C 350 110, 400 160, 500 160" 
                fill="none" 
                stroke="#064e3b" 
                strokeWidth="3.5" 
              />

              {/* Offsets Fills & Lines (Mint Green) */}
              <path 
                d="M 0 180 C 100 170, 200 160, 300 130 C 400 100, 450 110, 500 110 L 500 240 L 0 240 Z" 
                fill="url(#offset-grad)" 
              />
              <path 
                d="M 0 180 C 100 170, 200 160, 300 130 C 400 100, 450 110, 500 110" 
                fill="none" 
                stroke="#34d399" 
                strokeWidth="3" 
              />
            </svg>
          </div>
          
          <div className="analytics-chart-axis-x">
            <span>JAN</span>
            <span>MAR</span>
            <span>MAY</span>
            <span>JUL</span>
            <span>SEP</span>
            <span>NOV</span>
          </div>
        </article>

        {/* Chart 2: Goal Projection Card */}
        <article className="analytics-card analytics-goal-card">
          <div className="analytics-goal-card-top">
            <div className="analytics-card-header">
              <h3>Goal Projection</h3>
              <p>Predictive forecasting towards 2030 Net Zero milestone.</p>
            </div>
            <span className="analytics-on-track-badge">On Track</span>
          </div>

          <div className="analytics-goal-chart-container">
            <svg width="100%" height="100%" viewBox="0 0 260 120" preserveAspectRatio="none">
              {/* Solid Line (Current Trend) */}
              <path 
                d="M 10 90 L 80 84 L 150 56" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              {/* Dotted Line (Future Projection) */}
              <path 
                d="M 150 56 L 200 38 L 250 18" 
                fill="none" 
                stroke="#34d399" 
                strokeWidth="3" 
                strokeDasharray="4,4" 
                strokeLinecap="round"
              />
              {/* Dots */}
              <circle cx="150" cy="56" r="4" fill="#34d399" />
              <circle cx="250" cy="18" r="5" fill="#34d399" />
            </svg>
          </div>

          <div className="analytics-goal-footer">
            <div>
              <span className="analytics-deficit-label">Current Deficit</span>
              <div className="analytics-deficit-val">-12.4%</div>
            </div>
            <div className="analytics-trend-indicator">
              <svg width="100%" height="100%" viewBox="0 0 48 24" fill="none">
                <path d="M6 18l12-12 10 10L42 4" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34 4h8v8" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </article>

        {/* Chart 3: Source Emissions Distribution */}
        <article className="analytics-card analytics-dept-card">
          <div className="analytics-card-header analytics-dept-header-wrap">
            <div>
              <h3>Emission Source Distribution</h3>
              <p>Top emission sources by volume.</p>
            </div>
          </div>

          <div className="analytics-dept-chart">
            {topSources.map((source, idx) => {
               // Calculate a rough percentage for bar height
               const height = Math.min(100, Math.max(10, (source.total / (data.total_emissions || 1)) * 100 * 2))
               return (
                <div key={idx} className="analytics-dept-group">
                  <div className="analytics-dept-bars-pair">
                    <div className="analytics-dept-bar analytics-dept-bar-env" style={{ height: `${height}%` }} data-value={`${Math.round(source.total)}t`}></div>
                  </div>
                  <div className="analytics-dept-name" style={{ textTransform: 'capitalize' }}>{source.source}</div>
                </div>
               )
            })}
            {topSources.length === 0 && <p>No data available</p>}
          </div>
        </article>
      </div>
    </>
  )
}

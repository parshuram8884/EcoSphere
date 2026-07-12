import { useState } from 'react'
import './DiversityMetrics.css'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function DiversityMetrics() {
  const [region, setRegion] = useState('Global')
  const [department, setDepartment] = useState('All')
  const [period, setPeriod] = useState('Q3 2024')

  const departmentData = [
    { name: 'Engineering', female: 35, male: 60, nonBinary: 5 },
    { name: 'Product Management', female: 48, male: 46, nonBinary: 6 },
    { name: 'Human Resources', female: 72, male: 25, nonBinary: 3 },
    { name: 'Finance', female: 52, male: 44, nonBinary: 4 }
  ]

  const ageData = [
    { label: '< 25', val: 12, height: '30px' },
    { label: '25-34', val: 42, height: '110px' },
    { label: '35-44', val: 28, height: '75px' },
    { label: '45-54', val: 14, height: '40px' },
    { label: '55+', val: 4, height: '15px' }
  ]

  return (
    <div className="diversity-container">
      {/* 1. Global Demographic Filter Toolbar */}
      <article className="diversity-toolbar">
        <div className="diversity-filters-group">
          <select 
            className="diversity-dropdown" 
            value={region} 
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="Global">Region: Global</option>
            <option value="North America">Region: North America</option>
            <option value="EMEA">Region: EMEA</option>
            <option value="APAC">Region: APAC</option>
          </select>

          <select 
            className="diversity-dropdown" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">Department: All Units</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product Management</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>

          <select 
            className="diversity-dropdown" 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Q3 2024">Period: Q3 2024</option>
            <option value="Q2 2024">Period: Q2 2024</option>
            <option value="Q1 2024">Period: Q1 2024</option>
            <option value="FY 2023">Period: FY 2023</option>
          </select>
        </div>

        <div className="diversity-toolbar-actions">
          <div className="diversity-export-group">
            <button type="button" className="env-btn-primary" onClick={() => {
              const cols = [
                { key: 'name', label: 'Department' },
                { key: 'female', label: 'Female (%)' },
                { key: 'male', label: 'Male (%)' },
                { key: 'nonBinary', label: 'Non-Binary (%)' },
              ]
              exportToCSV(departmentData, cols, 'Diversity_Metrics')
            }}>📥 CSV</button>
            <button type="button" className="env-btn-primary" onClick={() => {
              const cols = [
                { key: 'name', label: 'Department' },
                { key: 'female', label: 'Female (%)' },
                { key: 'male', label: 'Male (%)' },
                { key: 'nonBinary', label: 'Non-Binary (%)' },
              ]
              const meta = [
                { label: 'Region', value: region },
                { label: 'Department', value: department },
                { label: 'Period', value: period },
              ]
              exportToPDF('Diversity Metrics Report', meta, departmentData, cols, 'Diversity_Metrics')
            }}>📄 PDF</button>
          </div>
        </div>
      </article>

      {/* 2. Core Strategic Chart Grid */}
      <section className="diversity-charts-grid" aria-label="Diversity metrics charts grid">
        {/* Chart 1: Gender Representation Ratio */}
        <article className="diversity-card">
          <div>
            <h3>Gender Representation Ratio</h3>
            <p>Company-wide gender balance splits across management tiers.</p>
          </div>

          <div className="diversity-donut-group">
            <div className="diversity-donut-chart">
              <svg width="100%" height="100%" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#cbd5e1" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#064e3b" strokeWidth="4.2" strokeDasharray="52 48" strokeDashoffset="25" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.2" strokeDasharray="44 56" strokeDashoffset="-27" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#94a3b8" strokeWidth="4.2" strokeDasharray="4 96" strokeDashoffset="-71" />
              </svg>
              <div className="diversity-donut-inner-text">
                <strong>52%</strong>
                <span>Female</span>
              </div>
            </div>

            <div className="diversity-donut-details">
              <div className="diversity-donut-row">
                <span className="diversity-legend-label">
                  <span className="legend-dot-fem"></span> Female
                </span>
                <span>52%</span>
              </div>
              <div className="diversity-donut-row">
                <span className="diversity-legend-label">
                  <span className="legend-dot-male"></span> Male
                </span>
                <span>44%</span>
              </div>
              <div className="diversity-donut-row">
                <span className="diversity-legend-label">
                  <span className="legend-dot-non"></span> Non-Binary / Other
                </span>
                <span>4%</span>
              </div>
            </div>
          </div>
        </article>

        {/* Chart 2: Department Distribution Matrix */}
        <article className="diversity-card">
          <div>
            <h3>Department Distribution Matrix</h3>
            <p>Comparative demographic distribution directly across core business units.</p>
          </div>

          <div className="diversity-stacked-list">
            {departmentData.map((dept) => (
              <div key={dept.name} className="diversity-stacked-row">
                <div className="diversity-stacked-meta">
                  <span>{dept.name}</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {dept.female}% F / {dept.male}% M / {dept.nonBinary}% NB
                  </span>
                </div>
                <div className="diversity-stacked-bar">
                  <div className="diversity-stacked-fill-fem" style={{ width: `${dept.female}%` }}></div>
                  <div className="diversity-stacked-fill-male" style={{ width: `${dept.male}%` }}></div>
                  <div className="diversity-stacked-fill-non" style={{ width: `${dept.nonBinary}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Chart 3: Age Group Breakdown */}
        <article className="diversity-card">
          <div>
            <h3>Age Group Breakdown</h3>
            <p>Workforce demographic allocation across strategic age brackets.</p>
          </div>

          <div className="diversity-histogram-container">
            {ageData.map((bar) => (
              <div key={bar.label} className="diversity-histogram-bar-group">
                <div className="diversity-histogram-bar" style={{ height: bar.height }}>
                  <span className="diversity-histogram-value">{bar.val}%</span>
                </div>
                <span className="diversity-histogram-label">{bar.label}</span>
              </div>
            ))}
          </div>
        </article>

        {/* Chart 4: Inclusive Hiring Funnel Trends */}
        <article className="diversity-card">
          <div>
            <h3>Inclusive Hiring Funnel Trends</h3>
            <p>Target demographic applications vs historical final offer rates.</p>
          </div>

          <div className="env-svg-chart-container" style={{ height: '140px' }}>
            <svg width="100%" height="100%" viewBox="0 0 320 140" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="320" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="60" x2="320" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="320" y2="100" stroke="#f1f5f9" strokeWidth="1" />

              {/* Target application rate line (Dotted light green) */}
              <path 
                d="M 10 110 L 60 98 L 120 90 L 180 84 L 240 76 L 310 68" 
                fill="none" 
                stroke="#34d399" 
                strokeWidth="2" 
                strokeDasharray="4,4" 
              />

              {/* Final offer rate line (Solid emerald green) */}
              <path 
                d="M 10 118 L 60 110 L 120 102 L 180 94 L 240 82 L 310 74" 
                fill="none" 
                stroke="#047857" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          <div className="env-chart-axis-x" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', marginTop: 4 }}>
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </article>
      </section>

      {/* 3. Summary Insights Panel */}
      <article className="diversity-insights-card">
        <span className="diversity-insights-icon" aria-hidden="true">📈</span>
        <div className="diversity-insights-text-block">
          <strong>Demographic Equity & Inclusivity Insight</strong>
          <p>
            Equity index rose by +1.4% since last quarter evaluation cycle. Target demographic hiring conversions improved due to optimized interview structures in Engineering and Product departments.
          </p>
        </div>
      </article>
    </div>
  )
}

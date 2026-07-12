import { useState } from 'react'
import './SocialReport.css'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function SocialReport() {
  const [pillar, setPillar] = useState('All')

  const handleExportBriefing = (format) => {
    const metricsData = [
      { metric: 'CSR Social Capital Return', value: '$1.24 Impact', sub: 'Per Dollar Invested' },
      { metric: 'Safety Incident Rate Index', value: '0.02 TRIR', sub: 'Compliance Baseline Met' },
      { metric: 'DEI Representation Score', value: '89.4% Value', sub: 'YoY progress index' },
    ]
    const cols = [
      { key: 'metric', label: 'Metric' },
      { key: 'value', label: 'Value' },
      { key: 'sub', label: 'Details' },
    ]
    if (format === 'csv') {
      exportToCSV(metricsData, cols, 'Social_Report')
    } else {
      const meta = [
        { label: 'Filter', value: pillar },
        { label: 'Export Date', value: new Date().toLocaleDateString() },
      ]
      exportToPDF('Social Report Briefing', meta, metricsData, cols, 'Social_Report')
    }
  }

  return (
    <div className="soc-rep-container">
      {/* 1. Executive Social Metrics Ledger */}
      <section className="soc-rep-metrics-row" aria-label="Social capital and human metrics ledger">
        {/* Metric 1 */}
        <article className="soc-rep-metric-card">
          <div className="soc-rep-metric-icon" aria-hidden="true">🌱</div>
          <div className="soc-rep-metric-details">
            <span className="soc-rep-metric-label">CSR Social Capital Return</span>
            <strong className="soc-rep-metric-val">$1.24 Impact</strong>
            <span className="soc-rep-metric-sub">Per Dollar Invested</span>
          </div>
        </article>

        {/* Metric 2 */}
        <article className="soc-rep-metric-card">
          <div className="soc-rep-metric-icon" style={{ background: '#fef2f2', color: '#b91c1c' }} aria-hidden="true">🛡️</div>
          <div className="soc-rep-metric-details">
            <span className="soc-rep-metric-label">Safety Incident Rate Index</span>
            <strong className="soc-rep-metric-val">0.02 TRIR</strong>
            <span className="soc-rep-metric-sub" style={{ color: '#b91c1c' }}>Compliance Baseline Met</span>
          </div>
        </article>

        {/* Metric 3 */}
        <article className="soc-rep-metric-card">
          <div className="soc-rep-metric-icon" style={{ background: '#faf5ff', color: '#7e22ce' }} aria-hidden="true">👥</div>
          <div className="soc-rep-metric-details">
            <span className="soc-rep-metric-label">DEI Representation Score</span>
            <strong className="soc-rep-metric-val">89.4% Value</strong>
            <span className="soc-rep-metric-sub" style={{ color: '#7e22ce' }}>YoY progress index</span>
          </div>
        </article>
      </section>

      {/* 2. Reporting Focus Toolbar */}
      <article className="soc-rep-toolbar">
        <select 
          className="reports-dropdown" 
          value={pillar} 
          onChange={(e) => setPillar(e.target.value)}
        >
          <option value="All">Filter by Business Pillar: All</option>
          <option value="CSR">CSR Activities</option>
          <option value="Diversity">Diversity & Inclusion</option>
          <option value="Training">Training Compliance</option>
        </select>

        <div className="soc-rep-export-group">
          <button 
            type="button" 
            className="soc-rep-btn-export"
            onClick={() => handleExportBriefing('csv')}
          >
            📥 CSV
          </button>
          <button 
            type="button" 
            className="soc-rep-btn-export"
            onClick={() => handleExportBriefing('pdf')}
          >
            📄 PDF
          </button>
        </div>
      </article>

      {/* 3. Multi-Quadrant Analytics Grid */}
      <section className="soc-rep-quad-grid" aria-label="Social reports quadrant visual grids">
        
        {/* Chart A: CSR & Participation Matrix */}
        <article className="soc-rep-card-panel">
          <div>
            <h3>CSR & Participation Matrix</h3>
            <p>Comparing total volunteer hours alongside employee registration counts per quarter.</p>
          </div>

          <div className="grouped-bars-container">
            {/* Q1 */}
            <div className="grouped-bar-set">
              <div className="bar-vol-hours" style={{ height: '60px' }} title="60 Hours"></div>
              <div className="bar-emp-reg" style={{ height: '40px' }} title="40 Registered"></div>
            </div>
            {/* Q2 */}
            <div className="grouped-bar-set">
              <div className="bar-vol-hours" style={{ height: '90px' }} title="90 Hours"></div>
              <div className="bar-emp-reg" style={{ height: '70px' }} title="70 Registered"></div>
            </div>
            {/* Q3 */}
            <div className="grouped-bar-set">
              <div className="bar-vol-hours" style={{ height: '120px' }} title="120 Hours"></div>
              <div className="bar-emp-reg" style={{ height: '95px' }} title="95 Registered"></div>
            </div>
          </div>

          <div className="goals-legend-row" style={{ justifyContent: 'center' }}>
            <span className="goals-legend-item"><span className="goals-legend-dot" style={{ background: '#059669' }}></span>Volunteering Hours</span>
            <span className="goals-legend-item"><span className="goals-legend-dot" style={{ background: '#3b82f6' }}></span>Employee Enrolls</span>
          </div>
        </article>

        {/* Chart B: Training Progress & Funnel */}
        <article className="soc-rep-card-panel">
          <div>
            <h3>Training Progress & Funnel</h3>
            <p>Mandatory training modules progression from registration to verified certificates.</p>
          </div>

          <div className="funnel-container">
            <div className="funnel-stage" style={{ width: '100%', background: '#1d4ed8' }}>
              Enrollments (1,200 Users)
            </div>
            <div className="funnel-stage" style={{ width: '80%', background: '#7e22ce' }}>
              In-Progress Modules (816 Users)
            </div>
            <div className="funnel-stage" style={{ width: '60%', background: '#047857' }}>
              Verified Certificates (742 Certs)
            </div>
          </div>
        </article>

        {/* Chart C: Diversity Distribution Matrix */}
        <article className="soc-rep-card-panel">
          <div>
            <h3>Diversity Distribution Matrix</h3>
            <p>Comparing gender ratios across core organizational management blocks.</p>
          </div>

          <div className="diversity-split-box" style={{ marginTop: 10 }}>
            {/* Executive Management */}
            <div className="diversity-row-item">
              <span className="diversity-row-label">Executive Management</span>
              <div className="diversity-split-bar">
                <div className="split-part" style={{ width: '60%', background: '#3b82f6' }} title="60% Male"></div>
                <div className="split-part" style={{ width: '40%', background: '#ec4899' }} title="40% Female"></div>
              </div>
            </div>

            {/* Middle Management */}
            <div className="diversity-row-item">
              <span className="diversity-row-label">Middle Management</span>
              <div className="diversity-split-bar">
                <div className="split-part" style={{ width: '52%', background: '#3b82f6' }} title="52% Male"></div>
                <div className="split-part" style={{ width: '48%', background: '#ec4899' }} title="48% Female"></div>
              </div>
            </div>

            {/* General Personnel */}
            <div className="diversity-row-item">
              <span className="diversity-row-label">General Personnel</span>
              <div className="diversity-split-bar">
                <div className="split-part" style={{ width: '48%', background: '#3b82f6' }} title="48% Male"></div>
                <div className="split-part" style={{ width: '52%', background: '#ec4899' }} title="52% Female"></div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

import './GovernanceReport.css'
import { exportToCSV, exportToPDF } from '../../utils/exportUtils'

export default function GovernanceReport() {
  const auditPoints = [
    { point: 'Board diversity composition', action: 'Recruit independent ESG director', due: 'Nov 15, 2024', status: 'Verified' },
    { point: 'Conflict of interest disclosure', action: 'Update registry signature form', due: 'Oct 20, 2024', status: 'Action Required' },
    { point: 'Whistleblower hotline test', action: 'Conduct live mock triage session', due: 'Dec 01, 2024', status: 'Verified' }
  ]

  const handleGenerateDeck = (format) => {
    const cols = [
      { key: 'point', label: 'Audit Checklist Point' },
      { key: 'action', label: 'Corrective Action Required' },
      { key: 'due', label: 'Remediation Date' },
      { key: 'status', label: 'Status' },
    ]
    if (format === 'csv') {
      exportToCSV(auditPoints, cols, 'Governance_Report')
    } else {
      const meta = [
        { label: 'Regulatory Compliance', value: '100% Free' },
        { label: 'Policy Acknowledgment', value: '98.2% Coverage' },
      ]
      exportToPDF('Governance Report', meta, auditPoints, cols, 'Governance_Report')
    }
  }

  return (
    <div className="gov-rep-container">
      {/* 1. Board Governance KPI Bar */}
      <section className="gov-rep-kpi-bar" aria-label="Board governance metrics summary">
        {/* KPI 1 */}
        <article className="gov-rep-kpi-card">
          <span className="gov-rep-kpi-label">Regulatory Compliance</span>
          <strong className="gov-rep-kpi-val">100% Free</strong>
          <span className="gov-rep-kpi-sub">0 Active Breaches</span>
        </article>

        {/* KPI 2 */}
        <article className="gov-rep-kpi-card">
          <span className="gov-rep-kpi-label">Policy Acknowledgment</span>
          <strong className="gov-rep-kpi-val">98.2% Coverage</strong>
          <span className="gov-rep-kpi-sub" style={{ color: '#059669' }}>Active signature sign-off</span>
        </article>

        {/* KPI 3 */}
        <article className="gov-rep-kpi-card">
          <span className="gov-rep-kpi-label">Internal Audits Completed</span>
          <strong className="gov-rep-kpi-val">24/24 Reviews</strong>
          <span className="gov-rep-kpi-sub">100% Passed</span>
        </article>

        {/* KPI 4 */}
        <article className="gov-rep-kpi-card">
          <span className="gov-rep-kpi-label">Incident Escalation Time</span>
          <strong className="gov-rep-kpi-val">avg. 4.2 Hours</strong>
          <span className="gov-rep-kpi-sub" style={{ color: '#d97706' }}>Triage response duration</span>
        </article>
      </section>

      {/* 2. Core Governance Audit Mapping Components */}
      <section className="gov-rep-workspace-grid" aria-label="Governance audit details">
        {/* Section A: Policy Validation Lifecycle Graph */}
        <article className="gov-rep-card-panel">
          <div>
            <h3>Policy Validation Lifecycle</h3>
            <p>12-month timeline mapping policy reviews, updates, and compliance deviations.</p>
          </div>

          <div className="env-svg-chart-container" style={{ height: '170px' }}>
            <svg width="100%" height="100%" viewBox="0 0 320 170" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="320" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="95" x2="320" y2="95" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="320" y2="140" stroke="#f1f5f9" strokeWidth="1" />

              {/* Multi-series lines */}
              {/* Series 1: Scheduled Reviews */}
              <path 
                d="M 10 140 L 70 120 L 130 90 L 190 95 L 250 60 L 310 40" 
                fill="none" 
                stroke="#059669" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />

              {/* Series 2: Compliance Deviations */}
              <path 
                d="M 10 150 L 70 140 L 130 145 L 190 120 L 250 135 L 310 140" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeDasharray="4 2" 
              />
            </svg>
          </div>
          
          <div className="env-chart-axis-x" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginTop: 4 }}>
            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
          </div>
        </article>

        {/* Section B: Audit Variance Table */}
        <article className="gov-rep-card-panel">
          <div>
            <h3>Audit Variance & Remediation Log</h3>
            <p>Tracking internal inspection points, corrective actions, and oversight updates.</p>
          </div>

          <div className="gov-rep-table-wrapper">
            <table className="gov-rep-table">
              <thead>
                <tr>
                  <th>Audit Checklist Point</th>
                  <th>Corrective Action Required</th>
                  <th>Remediation Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditPoints.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{row.point}</td>
                    <td>{row.action}</td>
                    <td>{row.due}</td>
                    <td>
                      <span className={`badge-oversight ${row.status === 'Verified' ? 'oversight-verified' : 'oversight-action'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* 3. Strategic Document Actions Footer */}
      <article className="gov-rep-footer">
        <button 
          type="button" 
          className="env-btn-secondary"
          onClick={() => handleGenerateDeck('csv')}
        >
          📥 CSV
        </button>
        <button 
          type="button" 
          className="env-btn-primary"
          onClick={() => handleGenerateDeck('pdf')}
        >
          📄 PDF
        </button>
      </article>
    </div>
  )
}

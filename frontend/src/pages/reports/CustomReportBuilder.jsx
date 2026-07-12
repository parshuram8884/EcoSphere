import { useState } from 'react'
import { downloadReport } from '../../services/api'
import './CustomReportBuilder.css'

export default function CustomReportBuilder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMetrics, setActiveMetrics] = useState([
    { id: 'dept', label: 'Department Selectors', category: 'Departments' },
    { id: 'carbon', label: 'Carbon Footprint Scope 1/2', category: 'Metrics' }
  ])

  const availableBlocks = [
    { id: 'dept', label: 'Department Selectors', category: 'Departments' },
    { id: 'demographics', label: 'Employee Demographics', category: 'Demographics' },
    { id: 'carbon', label: 'Carbon Footprint Scope 1/2', category: 'Metrics' },
    { id: 'csr', label: 'CSR Volunteering Hours', category: 'Metrics' },
    { id: 'audits', label: 'Audit Findings Audit List', category: 'Metrics' }
  ]

  const mockRecords = [
    { date: 'Q1 2024', dept: 'Engineering', carbon: '124 tCO₂e', csr: '180 hrs', audits: '0 pending', demo: '82% Parity' },
    { date: 'Q2 2024', dept: 'Operations', carbon: '840 tCO₂e', csr: '120 hrs', audits: '1 pending', demo: '74% Parity' },
    { date: 'Q3 2024', dept: 'Supply Chain', carbon: '620 tCO₂e', csr: '95 hrs', audits: '0 pending', demo: '68% Parity' }
  ]

  const handleToggleBlock = (block) => {
    if (activeMetrics.some(m => m.id === block.id)) {
      setActiveMetrics(activeMetrics.filter(m => m.id !== block.id))
    } else {
      setActiveMetrics([...activeMetrics, block])
    }
  }

  const handleSaveBlueprint = () => {
    alert('Saving Blueprint Template: Saved configuration metrics layout under custom presets catalog.')
  }

  const handleCompileDocument = () => {
    alert('Compiling Document Archive: Compiling custom queries into CSV/PDF report container package...')
  }

  const filteredBlocks = availableBlocks.filter(b => 
    b.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const showDept = activeMetrics.some(m => m.id === 'dept')
  const showDemo = activeMetrics.some(m => m.id === 'demographics')
  const showCarbon = activeMetrics.some(m => m.id === 'carbon')
  const showCsr = activeMetrics.some(m => m.id === 'csr')
  const showAudits = activeMetrics.some(m => m.id === 'audits')

  return (
    <div className="builder-container">
      {/* 1. Split-Panel Customization Workspace */}
      <section className="builder-workspace-grid" aria-label="Custom Report Compilation Engine">
        
        {/* Left Panel: Available Data Blocks Inventory */}
        <aside className="builder-inventory-card" aria-label="Available Data Blocks Inventory">
          <div>
            <h3>Data Blocks Inventory</h3>
            <p>Select metrics below to dynamically compile custom dashboards.</p>
          </div>

          <input 
            type="search" 
            className="builder-search-input" 
            placeholder="Search Report Attributes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="builder-inventory-sections">
            {/* Departments */}
            <div className="inventory-section">
              <span className="inventory-section-title">Departments</span>
              {filteredBlocks.filter(b => b.category === 'Departments').map(block => (
                <div 
                  key={block.id}
                  className={`inventory-item ${activeMetrics.some(m => m.id === block.id) ? 'inventory-item-active' : ''}`}
                  onClick={() => handleToggleBlock(block)}
                >
                  <span>{block.label}</span>
                  <span className="inventory-item-drag-icon">➕</span>
                </div>
              ))}
            </div>

            {/* Demographics */}
            <div className="inventory-section">
              <span className="inventory-section-title">Demographics</span>
              {filteredBlocks.filter(b => b.category === 'Demographics').map(block => (
                <div 
                  key={block.id}
                  className={`inventory-item ${activeMetrics.some(m => m.id === block.id) ? 'inventory-item-active' : ''}`}
                  onClick={() => handleToggleBlock(block)}
                >
                  <span>{block.label}</span>
                  <span className="inventory-item-drag-icon">➕</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="inventory-section">
              <span className="inventory-section-title">ESG Metrics</span>
              {filteredBlocks.filter(b => b.category === 'Metrics').map(block => (
                <div 
                  key={block.id}
                  className={`inventory-item ${activeMetrics.some(m => m.id === block.id) ? 'inventory-item-active' : ''}`}
                  onClick={() => handleToggleBlock(block)}
                >
                  <span>{block.label}</span>
                  <span className="inventory-item-drag-icon">➕</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Compilation Workspace */}
        <article className="builder-canvas-card">
          <div>
            <h3>Visual Layout Canvas</h3>
            <p>Preview compiled datagrid outputs based on selected active attributes.</p>
          </div>

          <div className="canvas-placeholder-zone">
            <p>Active Query Attributes</p>
            <div className="canvas-active-tags">
              {activeMetrics.length === 0 && (
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>No metrics selected. Click attributes on the left to begin.</span>
              )}
              {activeMetrics.map(metric => (
                <span key={metric.id} className="canvas-tag">
                  {metric.label}
                  <button 
                    type="button" 
                    className="canvas-tag-remove"
                    onClick={() => handleToggleBlock(metric)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Real-time Datagrid Preview */}
          <div className="builder-datagrid-box">
            <h4>Live Datagrid Preview</h4>
            
            <div className="builder-table-wrapper">
              <table className="builder-table">
                <thead>
                  <tr>
                    <th>Reporting Fiscal Period</th>
                    {showDept && <th>Business Division</th>}
                    {showDemo && <th>Parity Rate</th>}
                    {showCarbon && <th>Carbon Footprint</th>}
                    {showCsr && <th>CSR Voluntrees</th>}
                    {showAudits && <th>Open Audits</th>}
                  </tr>
                </thead>
                <tbody>
                  {mockRecords.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{row.date}</td>
                      {showDept && <td>{row.dept}</td>}
                      {showDemo && <td>{row.demo}</td>}
                      {showCarbon && <td>{row.carbon}</td>}
                      {showCsr && <td>{row.csr}</td>}
                      {showAudits && <td>{row.audits}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </section>

      {/* 2. Bottom Operations Control Bar */}
      <article className="builder-control-footer">
        <button 
          type="button" 
          className="env-btn-secondary"
          onClick={handleSaveBlueprint}
        >
          💾 Save Custom Blueprint
        </button>
        <button 
          type="button" 
          className="env-btn-primary"
          onClick={() => downloadReport('custom', 'pdf')}
        >
          🖨️ Print Preview (PDF)
        </button>
        <button 
          type="button" 
          className="env-btn-primary"
          onClick={() => downloadReport('custom', 'excel')}
        >
          📊 Download Excel
        </button>
        <button 
          type="button" 
          className="env-btn-primary"
          onClick={() => downloadReport('custom', 'csv')}
        >
          📑 Download CSV
        </button>
      </article>
    </div>
  )
}

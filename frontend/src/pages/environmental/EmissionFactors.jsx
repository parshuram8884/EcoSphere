import { useState } from 'react'
import './EmissionFactors.css'

export default function EmissionFactors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [standard, setStandard] = useState('All')

  const factors = [
    { name: 'Grid Electricity (US Northwest)', source: 'Source: eGRID 2024', scope: 'Scope 2', value: '0.32418', unit: 'kg CO₂e / kWh', effective: 'Jan 2024 — Dec 2024', modified: 'A. Sterling (2d ago)' },
    { name: 'Natural Gas (Industrial Mix)', source: 'Source: DEFRA 2023', scope: 'Scope 1', value: '2.02135', unit: 'kg CO₂e / m³', effective: 'Apr 2023 — Mar 2024', modified: 'M. Chen (5d ago)' },
    { name: 'Cloud Compute (Generic Instance)', source: 'Source: Internal Audit / AWS Bill', scope: 'Scope 3', value: '0.00250', unit: 'kg CO₂e / hr', effective: 'Jan 2024 — Permanent', modified: 'J. Doe (1w ago)' },
    { name: 'Domestic Flights (Average)', source: 'Source: IPCC Tier 1', scope: 'Scope 3', value: '0.15000', unit: 'kg CO₂e / pkm', effective: 'Jan 2022 — Dec 2024', modified: 'System (1mo ago)' },
    { name: 'Passenger Van (Diesel Euro 6)', source: 'Source: ADEME Base Carbone', scope: 'Scope 1', value: '0.24520', unit: 'kg CO₂e / km', effective: 'Jan 2024 — Dec 2025', modified: 'A. Sterling (3w ago)' },
    { name: 'Steel Production (Secondary)', source: 'Source: World Steel Association', scope: 'Scope 3', value: '425.000', unit: 'kg CO₂e / tonne', effective: 'Jan 2023 — Dec 2025', modified: 'L. Weber (2mo ago)' }
  ]

  const getScopeBadge = (scope) => {
    switch (scope) {
      case 'Scope 1':
        return <span className="badge-scope badge-scope1">Scope 1</span>
      case 'Scope 2':
        return <span className="badge-scope badge-scope2">Scope 2</span>
      case 'Scope 3':
        return <span className="badge-scope badge-scope3">Scope 3</span>
      default:
        return null
    }
  }

  return (
    <div className="registry-container">
      {/* 1. Summary Header Card */}
      <article className="registry-header-row">
        <div className="registry-title-block">
          <h2>Emission Factors Registry</h2>
          <p>
            Manage and deploy standardized coefficients for carbon accounting across Scope 1, 2, and 3 activities.
          </p>
        </div>

        <div className="registry-actions-bar">
          <input 
            type="search" 
            className="registry-search-input" 
            placeholder="Search Registry..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            className="registry-dropdown" 
            value={standard} 
            onChange={(e) => setStandard(e.target.value)}
          >
            <option value="All">Standard: All Sources</option>
            <option value="eGRID">eGRID</option>
            <option value="DEFRA">DEFRA</option>
            <option value="IPCC">IPCC</option>
          </select>

          <button type="button" className="registry-btn-add">
            ➕ Add New Factor
          </button>
        </div>
      </article>

      {/* 2. Registry Table Card */}
      <article className="registry-table-card">
        <div className="registry-table-wrapper">
          <table className="registry-table">
            <thead>
              <tr>
                <th>Factor Name / Source</th>
                <th>Category / Scope</th>
                <th>Value</th>
                <th>Unit Basis</th>
                <th>Effective Date</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {factors.map((factor) => (
                <tr key={factor.name}>
                  <td>
                    <span className="td-factor-name">{factor.name}</span>
                    <span className="td-factor-sub">{factor.source}</span>
                  </td>
                  <td>{getScopeBadge(factor.scope)}</td>
                  <td className="td-value-num">{factor.value}</td>
                  <td className="td-unit-basis"><code>{factor.unit}</code></td>
                  <td>{factor.effective}</td>
                  <td>{factor.modified}</td>
                  <td>
                    <div className="registry-actions-btns">
                      <button type="button" className="registry-action-icon" aria-label="Edit">✏️</button>
                      <button type="button" className="registry-action-icon" aria-label="History">📁</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ledger Footer & Pagination */}
        <div className="ledger-footer">
          <span>Showing 6 of 142 Factors</span>
          <div className="ledger-pagination">
            <button type="button" className="pagination-btn">&lt;</button>
            <button type="button" className="pagination-btn pagination-btn-active">1</button>
            <button type="button" className="pagination-btn">2</button>
            <button type="button" className="pagination-btn">3</button>
            <button type="button" className="pagination-btn">&gt;</button>
          </div>
        </div>
      </article>

      {/* 3. Three Summary Stats Cards */}
      <section className="registry-bottom-row" aria-label="Registry summary metrics">
        {/* Card 1 */}
        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-active" aria-hidden="true">
            ✓
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Active Standards</span>
            <strong className="registry-stat-val">12</strong>
            <span className="registry-stat-desc">Verified global registry sets synchronized.</span>
          </div>
        </article>

        {/* Card 2 */}
        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-pending" aria-hidden="true">
            ⚠️
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Pending Review</span>
            <strong className="registry-stat-val">08</strong>
            <span className="registry-stat-desc">Factors awaiting annual standard updates.</span>
          </div>
        </article>

        {/* Card 3 */}
        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-coverage" aria-hidden="true">
            📈
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Registry Coverage</span>
            <strong className="registry-stat-val">94%</strong>
            <span className="registry-stat-desc">Activity types mapped to coefficients.</span>
          </div>
        </article>
      </section>
    </div>
  )
}

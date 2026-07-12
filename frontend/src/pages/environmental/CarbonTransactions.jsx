import { useState } from 'react'
import './CarbonTransactions.css'

export default function CarbonTransactions() {
  const [searchQuery, setSearchQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [sourceType, setSourceType] = useState('All')

  const transactions = [
    { id: 'TX-594238', time: '2023-10-25 09:45', dept: 'Shenzhen Assembly Plant', source: 'Electricity (Grid)', footprint: 'USA-CA-2023', emissions: '142.50', status: 'Verified' },
    { id: 'TX-594239', time: '2023-10-25 10:12', dept: 'Munich Logistics Hub', source: 'Diesel Fuel - Fleet', footprint: 'GER-BY-2023', emissions: '88.10', status: 'Pending' },
    { id: 'TX-594240', time: '2023-10-25 15:30', dept: 'Austin HQ', source: 'Natural Gas (Heating)', footprint: 'USA-TX-2023', emissions: '8.22', status: 'Flagged' },
    { id: 'TX-594241', time: '2023-10-25 17:05', dept: 'Sao Paulo Facility', source: 'Mobile Refrigeration', footprint: 'BRA-SP-2023', emissions: '212.45', status: 'Verified' },
    { id: 'TX-594242', time: '2023-10-25 18:22', dept: 'Amsterdam Office', source: 'Purchased Steam', footprint: 'NLD-NH-2023', emissions: '4.12', status: 'Verified' }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return <span className="badge-status badge-verified">✓ Verified</span>
      case 'Pending':
        return <span className="badge-status badge-pending">Pending Review</span>
      case 'Flagged':
        return <span className="badge-status badge-flagged">Limit Flagged</span>
      default:
        return null
    }
  }

  return (
    <div className="ledger-container">
      {/* 1. Top Cards Row */}
      <section className="ledger-top-row" aria-label="Transaction statistics summary">
        {/* Card 1 */}
        <article className="ledger-stat-card">
          <div className="ledger-card-header">
            <span className="ledger-card-icon">🗂</span>
            <span className="ledger-card-trend">↗ +12.5%</span>
          </div>
          <div className="ledger-card-label">Total Tracked Transactions</div>
          <strong className="ledger-card-val">1,420 <span>entries</span></strong>
          <div className="ledger-card-footer">Across all active facilities</div>
        </article>

        {/* Card 2 */}
        <article className="ledger-stat-card">
          <div className="ledger-card-header">
            <span className="ledger-card-icon">🍃</span>
            <span className="ledger-card-trend">Verified</span>
          </div>
          <div className="ledger-card-label">Total Verified CO₂ Volume</div>
          <strong className="ledger-card-val">4,250.4 <span>tCO₂e</span></strong>
          <div className="ledger-card-footer">Gold Standard Offset registry</div>
        </article>

        {/* Card 3 */}
        <article className="ledger-stat-card ledger-stat-card-priority">
          <div className="ledger-card-header">
            <span className="ledger-card-icon">⚠️</span>
            <span className="ledger-card-trend-priority">Priority</span>
          </div>
          <div className="ledger-card-label">Flagged / Pending Audit</div>
          <strong className="ledger-card-val">14 <span>entries</span></strong>
          <div className="ledger-card-footer ledger-card-footer-alert">Requiring immediate attention</div>
        </article>
      </section>

      {/* 2. Controls Toolbar Card */}
      <article className="ledger-controls-panel">
        <div className="ledger-search-box">
          <span>🔍</span>
          <input 
            type="search" 
            placeholder="Search Transactions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="ledger-filter-row">
          <div className="ledger-selects-group">
            <select 
              className="ledger-dropdown" 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">Department: All</option>
              <option value="Operations">Operations</option>
              <option value="Logistics">Logistics</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>

            <select 
              className="ledger-dropdown" 
              value={sourceType} 
              onChange={(e) => setSourceType(e.target.value)}
            >
              <option value="All">Source Type: All</option>
              <option value="Electricity">Electricity</option>
              <option value="Diesel">Diesel</option>
              <option value="Natural Gas">Natural Gas</option>
            </select>

            <button type="button" className="ledger-btn-action">
              📅 Last 90 Days
            </button>
          </div>

          <button type="button" className="ledger-btn-primary">
            📥 Export Data
          </button>
        </div>
      </article>

      {/* 3. Ledger Table Card */}
      <article className="ledger-table-card">
        <div className="ledger-table-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Timestamp</th>
                <th>Facility / Dept</th>
                <th>Activity Source</th>
                <th>Footprint Status</th>
                <th>Emissions (tCO₂e)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="td-tx-id">{tx.id}</td>
                  <td>{tx.time}</td>
                  <td className="td-facility-name">{tx.dept}</td>
                  <td>{tx.source}</td>
                  <td><code>{tx.footprint}</code></td>
                  <td className="td-emissions-val">{tx.emissions}</td>
                  <td>{getStatusBadge(tx.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ledger Footer & Pagination */}
        <div className="ledger-footer">
          <div className="ledger-footer-left">
            <span>Showing 1 to 5 of 1,420 entries</span>
            <div className="ledger-row-select">
              <label htmlFor="rows-per-page">Rows per page:</label>
              <select id="rows-per-page" className="ledger-dropdown" style={{ padding: '4px 8px' }}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          <div className="ledger-pagination">
            <button type="button" className="pagination-btn">&lt;</button>
            <button type="button" className="pagination-btn pagination-btn-active">1</button>
            <button type="button" className="pagination-btn">2</button>
            <button type="button" className="pagination-btn">3</button>
            <span style={{ alignSelf: 'center', margin: '0 4px' }}>...</span>
            <button type="button" className="pagination-btn">14</button>
            <button type="button" className="pagination-btn">&gt;</button>
          </div>
        </div>
      </article>
    </div>
  )
}

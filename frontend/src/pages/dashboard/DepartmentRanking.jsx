import { useState } from 'react'
import './DepartmentRanking.css'
import { useApi } from '../../hooks/useApi'

export default function DepartmentRanking() {
  const [sortConfig, setSortConfig] = useState({ key: 'total_score', direction: 'desc' })

  const { data: departments, loading, error } = useApi('/dashboard/department-ranking/')

  if (loading) return <div style={{ padding: 20 }}>Loading rankings...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!departments) return null

  const handleSort = (key) => {
    let direction = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...departments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="ranking-container">
      {/* 1. Page Header & Info Banner */}
      <article className="ranking-header-card">
        <div>
          <h2>Departmental ESG Rankings</h2>
          <p>Real-time leaderboard evaluating operational units against enterprise sustainability goals.</p>
        </div>
        <div className="ranking-header-meta">
          <span>Current Cycle: Q4 2024</span>
          <button type="button" className="btn-outline-white">Export Rankings</button>
        </div>
      </article>

      {/* 2. Top Performers Podium */}
      <section className="ranking-podium-section">
        {sortedData.slice(0, 3).map((dept, idx) => (
          <article key={dept.code} className={`podium-card ${idx === 0 ? 'podium-first' : ''}`}>
            <div className="podium-rank-badge">#{idx + 1}</div>
            <h3>{dept.name}</h3>
            <div className="podium-score">
              <strong>{dept.total_score}</strong>
              <span>Overall Score</span>
            </div>
            
            <div className="podium-metrics">
              <div className="podium-metric">
                <span className="metric-label">ENV</span>
                <span className="metric-val">{dept.env}</span>
              </div>
              <div className="podium-metric">
                <span className="metric-label">SOC</span>
                <span className="metric-val">{dept.social}</span>
              </div>
              <div className="podium-metric">
                <span className="metric-label">GOV</span>
                <span className="metric-val">{dept.gov}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 3. Detailed Data Table */}
      <section className="ranking-table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')}>Rank {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('name')}>Department {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('total_score')}>Overall Score {sortConfig.key === 'total_score' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('env')}>Environmental {sortConfig.key === 'env' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('social')}>Social {sortConfig.key === 'social' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('gov')}>Governance {sortConfig.key === 'gov' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((dept) => (
              <tr key={dept.code}>
                <td className="col-rank">#{dept.rank}</td>
                <td className="col-name">
                  <strong>{dept.name}</strong>
                  <span>Code: {dept.code}</span>
                </td>
                <td className="col-score"><strong>{dept.total_score}</strong></td>
                <td>{dept.env}</td>
                <td>{dept.social}</td>
                <td>{dept.gov}</td>
                <td>
                  <span className={`status-pill ${dept.total_score >= 80 ? 'status-ok' : dept.total_score >= 60 ? 'status-warn' : 'status-err'}`}>
                    {dept.total_score >= 80 ? 'Excellent' : dept.total_score >= 60 ? 'Average' : 'Needs Focus'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

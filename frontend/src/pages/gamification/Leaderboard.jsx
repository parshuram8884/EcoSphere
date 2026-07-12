import { useState, useMemo } from 'react'
import './Leaderboard.css'
import { useApi } from '../../hooks/useApi'

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global')

  const { data, loading, error } = useApi('/gamification/leaderboard/')

  if (loading) return <div style={{ padding: 20 }}>Loading leaderboard...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!data) return null

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-gold'
    if (rank === 2) return 'rank-silver'
    if (rank === 3) return 'rank-bronze'
    return 'rank-standard'
  }

  return (
    <div className="leaderboard-container">
      {/* 1. Header & Season Info */}
      <section className="leaderboard-header" aria-label="Leaderboard Season Info">
        <div>
          <h2>Sustainability Champions</h2>
          <p>Current Season: Spring 2024 (Ends in 14 days)</p>
        </div>
        <div className="leaderboard-tabs">
          <button 
            className={`leaderboard-tab ${activeTab === 'global' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('global')}
          >
            Global Top 10
          </button>
          <button 
            className={`leaderboard-tab ${activeTab === 'department' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('department')}
          >
            By Department
          </button>
        </div>
      </section>

      {/* 2. Top 3 Podium (Only visible in Global view) */}
      {activeTab === 'global' && data.employees.length >= 3 && (
        <section className="leaderboard-podium" aria-label="Top 3 Performers">
          {/* Rank 2 */}
          <article className="podium-card podium-silver">
            <div className="podium-avatar">
              <span className="avatar-initials">{data.employees[1].name.substring(0, 2).toUpperCase()}</span>
              <div className="podium-rank-badge">2</div>
            </div>
            <h3>{data.employees[1].name}</h3>
            <span className="podium-dept">{data.employees[1].dept}</span>
            <strong className="podium-xp">{data.employees[1].xp} XP</strong>
          </article>

          {/* Rank 1 */}
          <article className="podium-card podium-gold">
            <div className="podium-avatar">
              <span className="avatar-initials">{data.employees[0].name.substring(0, 2).toUpperCase()}</span>
              <div className="podium-rank-badge">1</div>
              <div className="crown-icon">👑</div>
            </div>
            <h3>{data.employees[0].name}</h3>
            <span className="podium-dept">{data.employees[0].dept}</span>
            <strong className="podium-xp">{data.employees[0].xp} XP</strong>
          </article>

          {/* Rank 3 */}
          <article className="podium-card podium-bronze">
            <div className="podium-avatar">
              <span className="avatar-initials">{data.employees[2].name.substring(0, 2).toUpperCase()}</span>
              <div className="podium-rank-badge">3</div>
            </div>
            <h3>{data.employees[2].name}</h3>
            <span className="podium-dept">{data.employees[2].dept}</span>
            <strong className="podium-xp">{data.employees[2].xp} XP</strong>
          </article>
        </section>
      )}

      {/* 3. Data Table */}
      <section className="leaderboard-table-container">
        {activeTab === 'global' ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Employee</th>
                <th>Department</th>
                <th style={{ textAlign: 'center' }}>Badges</th>
                <th style={{ textAlign: 'right' }}>Total XP</th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((user) => (
                <tr key={user.rank} className={user.rank <= 3 ? 'row-highlight' : ''}>
                  <td>
                    <span className={`rank-pill ${getRankBadgeClass(user.rank)}`}>
                      {user.rank}
                    </span>
                  </td>
                  <td className="col-user">
                    <div className="table-avatar">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.dept}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="badge-count-pill">
                      <span className="badge-icon">🏅</span> {user.badges}
                    </div>
                  </td>
                  <td className="col-xp">
                    <strong>{user.xp}</strong>
                    <span className="xp-label">XP</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="department-leaderboard-grid">
            {data.departments.map((dept, index) => (
              <article key={dept.name} className="dept-rank-card">
                <div className="dept-rank-header">
                  <span className={`dept-rank-pill ${getRankBadgeClass(index + 1)}`}>#{index + 1}</span>
                  <h3>{dept.name}</h3>
                </div>
                <div className="dept-xp-total">
                  <strong>{dept.xp.toLocaleString()}</strong>
                  <span>Total XP</span>
                </div>
                <div className="dept-progress-bar">
                  <div 
                    className="dept-progress-fill" 
                    style={{ width: `${Math.min(100, (dept.xp / (data.departments[0]?.xp || 1)) * 100)}%` }} 
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

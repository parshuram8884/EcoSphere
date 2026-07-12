import { useState } from 'react'
import './Leaderboard.css'

export default function Leaderboard() {
  const [interval, setIntervalVal] = useState('Monthly')
  const [segment, setSegment] = useState('Individual')

  const topThree = [
    { rank: 1, name: 'Sarah Jenkins', dept: 'Engineering', xp: '4,250 XP', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&fit=crop&q=80' },
    { rank: 2, name: 'Marcus Thorne', dept: 'Operations', xp: '3,820 XP', avatar: '' },
    { rank: 3, name: 'Elena Rodriguez', dept: 'Research & Development', xp: '3,120 XP', avatar: '' }
  ]

  const rankTable = [
    { rank: 4, name: 'Kevin Zhang', dept: 'Finance', xp: '2,950 XP', badges: ['🏅', '⭐', '💎'], trend: 'up' },
    { rank: 5, name: 'Sarah Chen', dept: 'Human Resources', xp: '2,800 XP', badges: ['🏅', '⭐'], trend: 'steady' },
    { rank: 6, name: 'Marcus Thome', dept: 'Compliance', xp: '2,750 XP', badges: ['🏅'], trend: 'down' },
    { rank: 7, name: 'Elena Vance', dept: 'Leadership', xp: '2,500 XP', badges: ['💎'], trend: 'up' }
  ]

  const departmentalXp = [
    { name: 'Engineering', xp: '184k XP', pct: 82 },
    { name: 'Operations', xp: '142k XP', pct: 64 },
    { name: 'Research & Development', xp: '85k XP', pct: 38 },
    { name: 'Human Resources', xp: '45k XP', pct: 20 }
  ]

  const recentWins = [
    { name: 'Sarah J.', dept: 'Engineering', badge: 'Solar Sentinel', time: '2 minutes ago' },
    { name: 'Marcus T.', dept: 'Operations', badge: 'Paperless Pioneer', time: '10 minutes ago' },
    { name: 'Kevin Z.', dept: 'Finance', badge: 'Compliance Champion', time: '1 hour ago' }
  ]

  const getTrendArrow = (trend) => {
    switch (trend) {
      case 'up': return <span className="rank-trend-up">▲</span>
      case 'down': return <span className="rank-trend-down">▼</span>
      case 'steady': return <span className="rank-trend-steady">●</span>
      default: return null
    }
  }

  return (
    <div className="lead-container">
      {/* 1. Interval & Segment Bar */}
      <article className="lead-control-bar">
        <div className="lead-intervals" aria-label="Leaderboard interval toggles">
          <button 
            type="button" 
            className={`lead-interval-btn ${interval === 'Weekly' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setIntervalVal('Weekly')}
          >
            Weekly Standings
          </button>
          <button 
            type="button" 
            className={`lead-interval-btn ${interval === 'Monthly' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setIntervalVal('Monthly')}
          >
            Monthly Champions
          </button>
          <button 
            type="button" 
            className={`lead-interval-btn ${interval === 'All-Time' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setIntervalVal('All-Time')}
          >
            All-Time Masters
          </button>
        </div>

        <div className="lead-segments" aria-label="Leaderboard scope toggles">
          <button 
            type="button" 
            className={`lead-segment-btn ${segment === 'Individual' ? 'lead-segment-btn-active' : ''}`}
            onClick={() => setSegment('Individual')}
          >
            Individual Employees
          </button>
          <button 
            type="button" 
            className={`lead-segment-btn ${segment === 'Department' ? 'lead-segment-btn-active' : ''}`}
            onClick={() => setSegment('Department')}
          >
            Inter-Departmental Trophy
          </button>
        </div>
      </article>

      {/* 2. Main Two-Column Analytics Layout */}
      <section className="lead-workspace" aria-label="Leaderboard workspace details">
        
        {/* Left Column: Top Performer Standings Board */}
        <div className="lead-left-panel">
          {/* Top Tier Pedestal Display */}
          <article className="lead-pedestal-card">
            <h3 className="lead-pedestal-title">Top Tier Pedestal Display</h3>
            
            <div className="pedestal-display-row">
              {topThree.map((pod) => {
                const orderClass = pod.rank === 1 ? 'podium-first' : pod.rank === 2 ? 'podium-second' : 'podium-third'
                const avatarClass = pod.rank === 1 ? 'avatar-first' : pod.rank === 2 ? 'avatar-second' : 'avatar-third'
                const medalClass = pod.rank === 1 ? 'medal-first' : pod.rank === 2 ? 'medal-second' : 'medal-third'
                
                return (
                  <div key={pod.rank} className={`pedestal-podium ${orderClass}`}>
                    <div className="pedestal-avatar-container">
                      {pod.avatar ? (
                        <img className={`pedestal-avatar ${avatarClass}`} src={pod.avatar} alt={pod.name} />
                      ) : (
                        <div className={`pedestal-avatar ${avatarClass}`} style={{ background: '#f1f5f9', display: 'grid', placeItems: 'center', fontSize: '1.4rem' }}>👤</div>
                      )}
                      <span className={`pedestal-medal ${medalClass}`}>
                        {pod.rank}
                      </span>
                    </div>

                    <span className="pedestal-name">{pod.name}</span>
                    <span className="pedestal-dept">{pod.dept}</span>
                    <div className="pedestal-xp">{pod.xp}</div>
                  </div>
                )
              })}
            </div>
          </article>

          {/* Rank Extension Table */}
          <article className="lead-table-card">
            <div className="lead-table-wrapper">
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Badges Unlocked</th>
                    <th>Total Earned XP</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {rankTable.map((row) => (
                    <tr key={row.rank}>
                      <td className="td-rank-num">#{row.rank}</td>
                      <td>
                        <div className="td-emp-profile">
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{row.name}</span>
                        </div>
                      </td>
                      <td>{row.dept}</td>
                      <td>
                        <div className="td-badges-row">
                          {row.badges.map((b, i) => (
                            <span key={i} className="td-badge-icon" aria-hidden="true">{b}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontWeight: 800, color: '#059669' }}>{row.xp}</td>
                      <td>{getTrendArrow(row.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        {/* Right Column: Gamification Analytics Panel */}
        <div className="lead-right-panel">
          {/* Chart A: Departmental Aggregate XP Chart */}
          <article className="lead-chart-card">
            <h3>Departmental Aggregate XP Chart</h3>
            <p>Direct comparison of cumulated gamified XP output across enterprise divisions.</p>
            
            <div className="lead-bar-chart" style={{ marginTop: 10 }}>
              {departmentalXp.map((dept) => (
                <div key={dept.name} className="lead-bar-row">
                  <div className="lead-bar-meta">
                    <span>{dept.name}</span>
                    <span>{dept.xp}</span>
                  </div>
                  <div className="lead-bar-track">
                    <div className="lead-bar-fill" style={{ width: `${dept.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Section B: Recent Achievements Stream */}
          <article className="lead-chart-card">
            <h3>Recent Achievements Stream</h3>
            
            <div className="achievements-timeline">
              {recentWins.map((win, i) => (
                <div key={i} className="achievement-timeline-item">
                  <span className="achievement-timeline-icon" aria-hidden="true">🎉</span>
                  <div className="achievement-timeline-details">
                    <div>
                      <strong>{win.name}</strong> ({win.dept}) just unlocked the <strong>{win.badge}</strong> badge.
                    </div>
                    <span className="achievement-timeline-time">{win.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

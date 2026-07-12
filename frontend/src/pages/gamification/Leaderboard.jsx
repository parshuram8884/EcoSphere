import { useState, useMemo } from 'react'
import './Leaderboard.css'
import { useApi } from '../../hooks/useApi'

export default function Leaderboard() {
  // Tab states
  const [interval, setInterval] = useState('monthly') // 'weekly', 'monthly', 'alltime'
  const [viewType, setViewType] = useState('individual') // 'individual', 'department'

  const { data: apiData, loading, error } = useApi('/gamification/leaderboard/')

  // Live Scrolling Achievements
  const liveAchievements = [
    { name: 'Sarah M.', dept: 'Engineering', badgeName: 'Solar Sentinel', time: '2 minutes ago', icon: '☀️' },
    { name: 'Marcus T.', dept: 'Operations', badgeName: 'Zero Waste Hero', time: '15 minutes ago', icon: '♻️' },
    { name: 'David C.', dept: 'Marketing', badgeName: 'Eco Advocate', time: '1 hour ago', icon: '🌿' },
    { name: 'Elena R.', dept: 'HR', badgeName: 'Diversity Ambassador', time: '3 hours ago', icon: '🤝' },
    { name: 'Tariq Y.', dept: 'Finance', badgeName: 'Paperless Pro', time: '5 hours ago', icon: '📄' }
  ];

  // Helper to generate mock extensions to show a full list up to rank 50
  const generateExtendedList = (baseEmployees) => {
    if (!baseEmployees || baseEmployees.length === 0) return [];
    
    const extended = [...baseEmployees];
    
    // Core pool of departments and names to build realistic entries
    const names = [
      'Lucas Greenwood', 'Fiona Gallagher', 'Omar Little', 'Chloe Bennet', 
      'Toby Flenderson', 'Pam Beesly', 'Jim Halpert', 'Oscar Martinez', 
      'Angela Martin', 'Kevin Malone', 'Ryan Howard', 'Kelly Kapoor',
      'Jan Levinson', 'Darryl Philbin', 'Stanley Hudson', 'Phyllis Vance',
      'Creed Bratton', 'Meredith Palmer', 'Erin Hannon', 'Gabe Lewis'
    ];
    const depts = ['Operations', 'R&D', 'HR', 'Sales', 'Finance', 'Engineering', 'Marketing'];
    
    // Scale points down based on rank
    let currentXp = baseEmployees[baseEmployees.length - 1]?.xp || 1200;
    
    for (let r = baseEmployees.length + 1; r <= 50; r++) {
      const name = names[(r - 1) % names.length];
      const dept = depts[(r * 7) % depts.length];
      currentXp = Math.max(100, currentXp - (r % 3 === 0 ? 12 : 25));
      const badgesCount = Math.max(1, Math.floor(currentXp / 300));
      
      extended.push({
        rank: r,
        name,
        dept,
        xp: currentXp,
        badges: badgesCount
      });
    }
    
    return extended;
  };

  // Adjust statistics based on interval selection (Weekly, Monthly, All-Time)
  const processedData = useMemo(() => {
    if (!apiData) return null;

    let multiplier = 1;
    if (interval === 'weekly') multiplier = 0.22;
    if (interval === 'monthly') multiplier = 0.58;

    const scaledEmployees = apiData.employees.map(emp => ({
      ...emp,
      xp: Math.round(emp.xp * multiplier)
    }));

    const scaledDepts = apiData.departments.map(dept => ({
      ...dept,
      xp: Math.round(dept.xp * multiplier)
    }));

    const fullList = generateExtendedList(scaledEmployees);

    return {
      employees: fullList,
      departments: scaledDepts
    };
  }, [apiData, interval])

  // Split into Top 3 and Ranks 4-50
  const topThree = useMemo(() => {
    if (!processedData) return [];
    return [
      processedData.employees[1], // #2 Silver (left)
      processedData.employees[0], // #1 Gold (middle)
      processedData.employees[2]  // #3 Bronze (right)
    ].filter(Boolean);
  }, [processedData])

  const ranksFourToFifty = useMemo(() => {
    if (!processedData) return [];
    return processedData.employees.slice(3);
  }, [processedData])

  // Get deterministic rank movement arrow
  const getMovement = (rank) => {
    const seed = rank % 3;
    if (seed === 0) return { dir: 'up', symbol: '▲', val: 1 + (rank % 2) };
    if (seed === 1) return { dir: 'down', symbol: '▼', val: 1 + (rank % 3) };
    return { dir: 'steady', symbol: '—', val: 0 };
  }

  // Get deterministic tiny badge array for display
  const getTinyBadges = (count) => {
    const badgesPool = ['🏅', '🌟', '🌿', '⚡', '🏆', '🍃', '☀️', '🚲'];
    return Array.from({ length: Math.min(5, count) }, (_, i) => badgesPool[i % badgesPool.length]);
  }

  if (loading) {
    return (
      <div className="gamification-loading-container">
        <div className="gamification-spinner"></div>
        <p>Loading enterprise ESG standings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gamification-error-container">
        <div className="error-icon">⚠️</div>
        <h3>Failed to Load Leaderboard</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="lead-container">
      {/* 1. Interval & Segment Control Bar */}
      <section className="lead-control-bar" aria-label="Leaderboard View Controls">
        {/* Switcher Toggle Row (Weekly, Monthly, All-Time) */}
        <div className="lead-intervals">
          <button 
            type="button"
            className={`lead-interval-btn ${interval === 'weekly' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setInterval('weekly')}
          >
            Weekly Standings
          </button>
          <button 
            type="button"
            className={`lead-interval-btn ${interval === 'monthly' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setInterval('monthly')}
          >
            Monthly Champions
          </button>
          <button 
            type="button"
            className={`lead-interval-btn ${interval === 'alltime' ? 'lead-interval-btn-active' : ''}`}
            onClick={() => setInterval('alltime')}
          >
            All-Time Masters
          </button>
        </div>

        {/* Splitter View Toggle Link (Individual vs Department) */}
        <div className="lead-segments">
          <button 
            type="button"
            className={`lead-segment-btn ${viewType === 'individual' ? 'lead-segment-btn-active' : ''}`}
            onClick={() => setViewType('individual')}
          >
            Individual Employees Ranking
          </button>
          <button 
            type="button"
            className={`lead-segment-btn ${viewType === 'department' ? 'lead-segment-btn-active' : ''}`}
            onClick={() => setViewType('department')}
          >
            Inter-Departmental Trophy Grid
          </button>
        </div>
      </section>

      {/* 2. Main Two-Column Analytics Layout */}
      {viewType === 'individual' ? (
        <section className="lead-workspace">
          
          {/* Left Column (65% width) - Top Performer Standings Board */}
          <article className="lead-left-panel">
            {/* Top Tier Pedestal Display */}
            <div className="lead-pedestal-card">
              <h3 className="lead-pedestal-title">Top Tier Pedestal Display</h3>
              
              <div className="pedestal-display-row">
                {topThree.map((emp, index) => {
                  // absolute positions: index 0 is silver, index 1 is gold, index 2 is bronze
                  let rankLabel = '2';
                  let medalClass = 'medal-second';
                  let avatarClass = 'avatar-second';
                  let podiumClass = 'podium-second';
                  
                  if (index === 1) {
                    rankLabel = '1';
                    medalClass = 'medal-first';
                    avatarClass = 'avatar-first';
                    podiumClass = 'podium-first';
                  } else if (index === 2) {
                    rankLabel = '3';
                    medalClass = 'medal-third';
                    avatarClass = 'avatar-third';
                    podiumClass = 'podium-third';
                  }

                  return (
                    <div key={emp.name} className={`pedestal-podium ${podiumClass}`}>
                      <div className="pedestal-avatar-container">
                        <div className={`pedestal-avatar ${avatarClass}`}>
                          <span style={{ fontSize: rankLabel === '1' ? '1.5rem' : '1.1rem', fontWeight: 800 }}>
                            {emp.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className={`pedestal-medal ${medalClass}`}>
                          {rankLabel === '1' ? '👑' : rankLabel}
                        </span>
                      </div>
                      
                      <span className="pedestal-name">{emp.name}</span>
                      <span className="pedestal-dept">{emp.dept}</span>
                      <span className="pedestal-xp">{emp.xp.toLocaleString()} XP</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Rank Extension Table */}
            <div className="lead-table-card">
              <div className="lead-table-wrapper">
                <table className="lead-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Rank</th>
                      <th>Profile Name</th>
                      <th>Department</th>
                      <th>Badges Unlocked</th>
                      <th>Total XP</th>
                      <th style={{ width: '100px' }}>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranksFourToFifty.map((emp) => {
                      const trend = getMovement(emp.rank);
                      const tinyBadges = getTinyBadges(emp.badges);
                      
                      return (
                        <tr key={emp.rank}>
                          <td className="td-rank-num">#{emp.rank}</td>
                          <td className="col-user">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div className="table-avatar" style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                background: '#cbd5e1', 
                                display: 'grid', 
                                placeItems: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}>
                                {emp.name.substring(0, 2).toUpperCase()}
                              </div>
                              <strong>{emp.name}</strong>
                            </div>
                          </td>
                          <td>{emp.dept}</td>
                          <td>
                            <div className="td-badges-row">
                              {tinyBadges.map((badge, i) => (
                                <span key={i} className="td-badge-icon" title="Unlocked Badge">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <strong style={{ color: '#0f172a' }}>{emp.xp.toLocaleString()}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: '4px' }}>XP</span>
                          </td>
                          <td>
                            {trend.dir === 'up' && (
                              <span className="rank-trend-up">▲ {trend.val}</span>
                            )}
                            {trend.dir === 'down' && (
                              <span className="rank-trend-down">▼ {trend.val}</span>
                            )}
                            {trend.dir === 'steady' && (
                              <span className="rank-trend-steady">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          {/* Right Column (35% width) - Gamification Analytics Panel */}
          <article className="lead-right-panel">
            
            {/* Chart A: Departmental Aggregate XP Chart */}
            <div className="lead-chart-card">
              <div>
                <h3>Departmental Aggregate XP</h3>
                <p>Cumulative XP output breakdown across enterprise divisions</p>
              </div>

              <div className="lead-bar-chart">
                {processedData.departments.map((dept) => {
                  // Find relative percentage compared to highest department
                  const maxVal = processedData.departments[0]?.xp || 1;
                  const percent = Math.round((dept.xp / maxVal) * 100);

                  return (
                    <div key={dept.name} className="lead-bar-row">
                      <div className="lead-bar-meta">
                        <span>{dept.name}</span>
                        <span>{dept.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="lead-bar-track">
                        <div 
                          className="lead-bar-fill" 
                          style={{ width: `${percent}%`, backgroundColor: '#059669' }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Section B: Recent Achievements Stream */}
            <div className="lead-chart-card">
              <div>
                <h3>Recent Achievements Stream</h3>
                <p>Live feed of organizational gamified wins</p>
              </div>

              <div className="achievements-timeline">
                {liveAchievements.map((item, index) => (
                  <div key={index} className="achievement-timeline-item">
                    <span className="achievement-timeline-icon">{item.icon}</span>
                    <div className="achievement-timeline-details">
                      <span>
                        <strong>{item.name}</strong> ({item.dept}) just unlocked the <strong>'{item.badgeName}'</strong> Badge
                      </span>
                      <span className="achievement-timeline-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </article>

        </section>
      ) : (
        /* Inter-Departmental Trophy Grid View */
        <section className="lead-table-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
            Inter-Departmental Trophy Grid
          </h3>
          <div className="department-leaderboard-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {processedData.departments.map((dept, index) => {
              let trophy = '🎖️';
              if (index === 0) trophy = '🏆 Gold Cup';
              else if (index === 1) trophy = '🥈 Silver Cup';
              else if (index === 2) trophy = '🥉 Bronze Cup';

              return (
                <article key={dept.name} className="dept-rank-card" style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div className="dept-rank-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{dept.name}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>{trophy}</span>
                  </div>

                  <div className="dept-xp-total" style={{
                    fontSize: '1.5rem',
                    fontWeight: 850,
                    color: '#0f172a'
                  }}>
                    {dept.xp.toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>XP</span>
                  </div>

                  <div className="dept-progress-bar" style={{
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '99px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      className="dept-progress-fill" 
                      style={{ 
                        height: '100%',
                        background: '#059669',
                        width: `${Math.min(100, (dept.xp / (processedData.departments[0]?.xp || 1)) * 100)}%` 
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                    Active ESG Campaign contributors
                  </span>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

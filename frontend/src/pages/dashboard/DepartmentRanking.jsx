import { useState } from 'react'
import './DepartmentRanking.css'

export default function DepartmentRanking() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortPillar, setSortPillar] = useState('Overall')
  const [excludeBaselines, setExcludeBaselines] = useState(false)

  // Dummy department data representing details
  const departmentScores = [
    { rank: '01', name: 'Operations', subtitle: 'Global Benchmark', esgScore: 94.2, e: 96, s: 92, g: 95, trend: '+4.8%' },
    { rank: '02', name: 'R&D', subtitle: 'Efficiency Lead', esgScore: 88.4, e: 90, s: 84, g: 91, trend: '+2.1%' },
    { rank: '03', name: 'Supply Chain', subtitle: 'Transparency Hero', esgScore: 82.1, e: 80, s: 81, g: 85, trend: '-0.4%' },
    { rank: '04', name: 'Human Resources', subtitle: 'Global HQ', esgScore: 79.2, e: 66, s: 92, g: 82, trend: '+1.1%' },
    { rank: '05', name: 'Marketing & Sales', subtitle: 'Regional Division', esgScore: 74.5, e: 70, s: 78, g: 75, trend: '+0.5%' }
  ]

  return (
    <>
      {/* Title and Controls section */}
      <div className="ranking-section-header">
        <div className="ranking-title-block">
          <h2>Departmental ESG Performance</h2>
          <p>Real-time leaderboard based on multi-pillar sustainability metrics.</p>
        </div>

        <div className="ranking-controls">
          <div className="ranking-filter-row">
            <input 
              type="text" 
              className="ranking-search-filter" 
              placeholder="Search Department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              className="ranking-dropdown-filter"
              value={sortPillar}
              onChange={(e) => setSortPillar(e.target.value)}
            >
              <option value="Overall">Sort by Pillar: Overall</option>
              <option value="Environmental">Sort by Pillar: Environmental</option>
              <option value="Social">Sort by Pillar: Social</option>
              <option value="Governance">Sort by Pillar: Governance</option>
            </select>
          </div>
          
          <label className="ranking-checkbox-label">
            <input 
              type="checkbox" 
              checked={excludeBaselines}
              onChange={(e) => setExcludeBaselines(e.target.checked)}
            />
            Exclude Baselines
          </label>
        </div>
      </div>

      {/* Podium Leaders Cards */}
      <section className="ranking-podium-section" aria-label="Top 3 Department Podium Leaders">
        {/* Rank 2 Podium Card (Left) */}
        <article className="ranking-podium-card ranking-podium-card-second">
          <div className="podium-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19.48 9.44l-5.5-5.5a1 1 0 00-1.41 0l-5.5 5.5a1 1 0 000 1.41l5.5 5.5a1 1 0 001.41 0l5.5-5.5a1 1 0 000-1.41zM2 21h20"/>
            </svg>
          </div>
          <div className="podium-dept-name">R&D</div>
          <div className="podium-badge">Efficiency Lead</div>
          <div className="podium-score-val">88.4</div>
          <div className="podium-trend trend-up">↗ +2.1%</div>
          <div className="podium-rank-num">2</div>
        </article>

        {/* Rank 1 Podium Card (Center, Highlighted) */}
        <article className="ranking-podium-card ranking-podium-card-first">
          <div className="podium-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="podium-dept-name">Operations</div>
          <div className="podium-badge">Global Benchmark</div>
          <div className="podium-score-val">94.2</div>
          <div className="podium-trend trend-up">↗ +4.8%</div>
          <div className="podium-rank-num">1</div>
        </article>

        {/* Rank 3 Podium Card (Right) */}
        <article className="ranking-podium-card ranking-podium-card-third">
          <div className="podium-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14-2v2m0 4h.01"/>
            </svg>
          </div>
          <div className="podium-dept-name">Supply Chain</div>
          <div className="podium-badge">Transparency Hero</div>
          <div className="podium-score-val">82.1</div>
          <div className="podium-trend trend-down">↘ -0.4%</div>
          <div className="podium-rank-num">3</div>
        </article>
      </section>

      {/* Bottom Grid */}
      <div className="ranking-bottom-grid">
        {/* Detailed Score Index Table Card */}
        <article className="ranking-table-card">
          <div className="ranking-table-header">
            <h3>Detailed Score Index</h3>
            <a href="#view-all" className="ranking-view-all">View All Departments</a>
          </div>

          <div className="ranking-table-wrapper">
            <table className="ranking-data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Department</th>
                  <th>ESG Score</th>
                  <th>E</th>
                  <th>S</th>
                  <th>G</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {departmentScores.map((dept) => (
                  <tr key={dept.rank}>
                    <td className="td-rank">#{dept.rank}</td>
                    <td>
                      <span className="td-dept-name">{dept.name}</span>
                      <span className="td-dept-sub">{dept.subtitle}</span>
                    </td>
                    <td>
                      <div className="td-score-container">
                        <div className="td-score-bar-track">
                          <div className="td-score-bar-fill" style={{ width: `${dept.esgScore}%` }}></div>
                        </div>
                        <span className="td-score-num">{dept.esgScore}</span>
                      </div>
                    </td>
                    <td className="td-pillar-val">{dept.e}</td>
                    <td className="td-pillar-val">{dept.s}</td>
                    <td className="td-pillar-val">{dept.g}</td>
                    <td className={`td-trend-val ${dept.trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                      {dept.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Volatility Line Chart Card */}
        <article className="ranking-volatility-card">
          <div className="ranking-chart-header">
            <h3>8ma Volatility</h3>
            <p>Top 5 vs Bottom 5 Aggregates</p>
          </div>

          <div className="ranking-volatility-chart-container">
            {/* Volatility Line Chart */}
            <svg width="100%" height="100%" viewBox="0 0 240 120" preserveAspectRatio="none">
              {/* Y-Axis lines */}
              <line x1="0" y1="20" x2="240" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="60" x2="240" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="240" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              
              {/* Volatility curves */}
              <path 
                d="M 10 90 Q 60 70, 110 80 T 210 30" 
                fill="none" 
                stroke="#092c1f" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              
              {/* Small indicator dots */}
              <circle cx="210" cy="30" r="3.5" fill="#092c1f" />
            </svg>
          </div>
        </article>
      </div>
    </>
  )
}

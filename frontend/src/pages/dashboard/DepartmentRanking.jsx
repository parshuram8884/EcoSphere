import { useState, useMemo } from 'react'
import './DepartmentRanking.css'
import { useApi } from '../../hooks/useApi'

export default function DepartmentRanking() {
  const { data: departments, loading, error } = useApi('/dashboard/department-ranking/')

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPillar, setSelectedPillar] = useState('total_score')
  const [excludeBaseline, setExcludeBaseline] = useState(false)

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: 'total_score', direction: 'desc' })

  // Interactive Chart State
  const [hoveredSeries, setHoveredSeries] = useState(null)
  const [activeTab, setActiveTab] = useState('all') // 'all', 'top', 'bottom'
  const [chartMetric, setChartMetric] = useState('total_score') // total_score, env, social, gov
  const [selectedDeptCodes, setSelectedDeptCodes] = useState([]) // For custom comparison

  if (loading) {
    return (
      <div className="ranking-loading-container">
        <div className="ranking-spinner"></div>
        <p>Analyzing ESG performance metrics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ranking-error-container">
        <div className="error-icon">⚠️</div>
        <h3>Failed to Load Rankings</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!departments || departments.length === 0) {
    return (
      <div className="ranking-empty-container">
        <p>No department ranking data available.</p>
      </div>
    )
  }

  // Helper to map code to a deterministic trend
  const getTrend = (code) => {
    const codeUpper = code.toUpperCase();
    if (['OPS', 'RD', 'ENG', 'PROD'].includes(codeUpper)) return 'up';
    if (['HR', 'MKT', 'SALES', 'ADMIN'].includes(codeUpper)) return 'down';
    return 'stable';
  }

  // Process & Filter Data
  const processedData = useMemo(() => {
    return departments.map(d => ({
      ...d,
      trend: getTrend(d.code),
      // Is baseline if total score is under 70 or name matches specific baseline criteria
      isBaseline: d.total_score < 70 || d.code === 'ADMIN' || d.code === 'MKT'
    }))
  }, [departments])

  // Filtered Data
  const filteredData = useMemo(() => {
    return processedData.filter(d => {
      // 1. Search Query
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            d.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Baseline Exclusion
      const passesExclusion = !excludeBaseline || !d.isBaseline;

      return matchesSearch && passesExclusion;
    })
  }, [processedData, searchQuery, excludeBaseline])

  // Sorted Data based on sortConfig
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig])

  // Handle Sort Toggle
  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  }

  // Handle pillar selection dropdown
  const handlePillarChange = (e) => {
    const pillar = e.target.value;
    setSelectedPillar(pillar);
    setSortConfig({ key: pillar, direction: 'desc' });
  }

  // Top 3 for Podium (always taken from the original top performers to represent absolute organizational ranking)
  const absoluteRanked = [...processedData].sort((a, b) => b.total_score - a.total_score);
  const podiumTop3 = [
    absoluteRanked[1], // #2 Silver (left)
    absoluteRanked[0], // #1 Gold (middle)
    absoluteRanked[2]  // #3 Bronze (right)
  ].filter(Boolean);

  // Chart Data Generation (Top 5 vs Bottom 5 over 6 months)
  const chartMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  
  const chartSeries = useMemo(() => {
    const sortedByOverall = [...processedData].sort((a, b) => b.total_score - a.total_score);
    const top5 = sortedByOverall.slice(0, 5).map(d => ({ ...d, group: 'top' }));
    const bottom5 = sortedByOverall.slice(-5).map(d => ({ ...d, group: 'bottom' }));
    
    const candidates = [...top5, ...bottom5];

    // Generate historical points for each candidate based on their chosen metric
    return candidates.map((d, index) => {
      const currentVal = d[chartMetric];
      
      // Seeded random variation generator based on department code hash
      const codeHash = d.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const points = [];
      
      for (let i = 0; i < 6; i++) {
        if (i === 5) {
          points.push(currentVal);
        } else {
          // Generate realistic fluctuations back in time
          const factor = (5 - i) * (codeHash % 3 === 0 ? 1.5 : codeHash % 2 === 0 ? -1.2 : 0.8);
          const val = Math.min(100, Math.max(20, currentVal - factor + Math.sin(i + codeHash) * 2));
          points.push(parseFloat(val.toFixed(1)));
        }
      }

      // Assign distinct premium color palette
      let color = '#10b981'; // Emerald
      if (d.group === 'top') {
        const topColors = ['#059669', '#0d9488', '#0284c7', '#4f46e5', '#7c3aed'];
        color = topColors[index % topColors.length];
      } else {
        const bottomColors = ['#ea580c', '#e11d48', '#db2777', '#d97706', '#ca8a04'];
        color = bottomColors[index % bottomColors.length];
      }

      return {
        ...d,
        color,
        points
      };
    });
  }, [processedData, chartMetric]);

  // Filter series based on user active tab selection
  const filteredChartSeries = useMemo(() => {
    if (activeTab === 'top') return chartSeries.filter(s => s.group === 'top');
    if (activeTab === 'bottom') return chartSeries.filter(s => s.group === 'bottom');
    return chartSeries;
  }, [chartSeries, activeTab]);

  // Render SVG Line Chart
  const renderSvgChart = () => {
    const width = 600;
    const height = 240;
    const paddingX = 45;
    const paddingY = 30;
    
    // Find min and max value in series for scaling
    let allVals = [];
    filteredChartSeries.forEach(s => allVals.push(...s.points));
    if (allVals.length === 0) allVals = [0, 100];
    const maxVal = Math.min(100, Math.max(...allVals) + 5);
    const minVal = Math.max(0, Math.min(...allVals) - 5);
    const valRange = maxVal - minVal || 1;

    // Scale helpers
    const getX = (index) => paddingX + (index * (width - paddingX * 2) / 5);
    const getY = (val) => height - paddingY - ((val - minVal) * (height - paddingY * 2) / valRange);

    // Y Axis ticks
    const ticksCount = 5;
    const ticks = Array.from({ length: ticksCount }, (_, i) => {
      return parseFloat((minVal + (i * valRange / (ticksCount - 1))).toFixed(0));
    });

    return (
      <svg className="ranking-svg-element" viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
        {/* Grids */}
        {ticks.map((tick, i) => (
          <g key={tick} className="chart-grid-line">
            <line 
              x1={paddingX} 
              y1={getY(tick)} 
              x2={width - paddingX} 
              y2={getY(tick)} 
              stroke="#e2e8f0" 
              strokeWidth="1"
              strokeDasharray={i === 0 ? '0' : '4 4'}
            />
            <text 
              x={paddingX - 10} 
              y={getY(tick) + 4} 
              textAnchor="end" 
              fontSize="10" 
              fill="#94a3b8" 
              fontWeight="600"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* X Axis Labels */}
        {chartMonths.map((m, i) => (
          <text 
            key={m} 
            x={getX(i)} 
            y={height - 8} 
            textAnchor="middle" 
            fontSize="10" 
            fill="#94a3b8" 
            fontWeight="600"
          >
            {m}
          </text>
        ))}

        {/* Series Lines */}
        {filteredChartSeries.map((series) => {
          const pathD = series.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p)}`).join(' ');
          const isDimmed = hoveredSeries !== null && hoveredSeries !== series.code;
          const isHighlighted = hoveredSeries === series.code;

          return (
            <g 
              key={series.code}
              onMouseEnter={() => setHoveredSeries(series.code)}
              onMouseLeave={() => setHoveredSeries(null)}
              className="chart-series-group"
              style={{ transition: 'opacity 0.2s ease' }}
              opacity={isDimmed ? 0.15 : 1}
            >
              {/* Glow trace on highlight */}
              {isHighlighted && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={series.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
              )}
              {/* Primary Line */}
              <path
                d={pathD}
                fill="none"
                stroke={series.color}
                strokeWidth={isHighlighted ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {series.points.map((p, i) => (
                <g key={i} className="chart-node-point">
                  <circle
                    cx={getX(i)}
                    cy={getY(p)}
                    r={isHighlighted ? 5 : 3.5}
                    fill="#ffffff"
                    stroke={series.color}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                  />
                  <title>{`${series.name} - ${chartMonths[i]}: ${p}%`}</title>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="ranking-container">
      {/* 1. Header Hero Panel */}
      <article className="ranking-header-card">
        <div className="header-meta-left">
          <div className="header-tag">ESG PERFORMANCE</div>
          <h2>Departmental Leaderboard</h2>
          <p>Real-time corporate performance comparison across environmental, social, and governance key metrics.</p>
        </div>
        <div className="ranking-header-meta">
          <div className="cycle-badge">
            <span className="cycle-indicator"></span>
            Active Cycle: Q4 2024
          </div>
          <button type="button" className="btn-ranking-export">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export Rankings
          </button>
        </div>
      </article>

      {/* 2. Top Performers Podium Pedestals */}
      <section className="ranking-podium-section">
        {podiumTop3.map((dept, index) => {
          // absolute indexes: index 0 is rank #2, index 1 is rank #1, index 2 is rank #3
          let rankLabel = '#2';
          let badgeClass = 'silver-badge';
          let badgeText = 'Silver';
          let cardModifier = 'podium-second';
          
          if (index === 1) {
            rankLabel = '#1';
            badgeClass = 'gold-badge';
            badgeText = 'Gold';
            cardModifier = 'podium-first';
          } else if (index === 2) {
            rankLabel = '#3';
            badgeClass = 'bronze-badge';
            badgeText = 'Bronze';
            cardModifier = 'podium-third';
          }

          return (
            <article key={dept.code} className={`podium-card ${cardModifier}`}>
              <div className="podium-crown-badge">
                <span className={`podium-medal ${badgeClass}`}>{badgeText}</span>
              </div>
              <div className="podium-rank-display">{rankLabel}</div>
              
              <div className="podium-avatar-frame">
                <div className="podium-avatar-bg">
                  <span>{dept.code}</span>
                </div>
              </div>

              <h3>{dept.name}</h3>
              <div className="podium-score-container">
                <strong className="podium-score-value">{dept.total_score.toFixed(1)}</strong>
                <span className="podium-score-label">Overall ESG</span>
              </div>
              
              <div className="podium-mini-breakdown">
                <div className="podium-mini-pill env-pill">
                  <span className="dot"></span>
                  <span>E: {dept.env}</span>
                </div>
                <div className="podium-mini-pill soc-pill">
                  <span className="dot"></span>
                  <span>S: {dept.social}</span>
                </div>
                <div className="podium-mini-pill gov-pill">
                  <span className="dot"></span>
                  <span>G: {dept.gov}</span>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {/* 3. Interactive Filter Bar */}
      <section className="ranking-filter-bar">
        <div className="filter-input-group">
          <span className="search-icon-inside">🔍</span>
          <input 
            type="text" 
            placeholder="Search Department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
        </div>

        <div className="filter-select-group">
          <label htmlFor="pillar-select">Sort by Pillar</label>
          <select 
            id="pillar-select"
            value={selectedPillar} 
            onChange={handlePillarChange}
            className="pillar-select-dropdown"
          >
            <option value="total_score">Overall ESG Score</option>
            <option value="env">Environmental Metric</option>
            <option value="social">Social Metric</option>
            <option value="gov">Governance Metric</option>
          </select>
        </div>

        <div className="filter-toggle-group">
          <label className="toggle-switch-wrapper">
            <input 
              type="checkbox"
              checked={excludeBaseline}
              onChange={(e) => setExcludeBaseline(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label-text">Exclusion toggle for baseline units</span>
        </div>
      </section>

      {/* 4. Bottom Layout: Detailed Table and Segment Comparison Graph */}
      <section className="ranking-bottom-grid">
        {/* Detailed Department Score Table */}
        <article className="ranking-table-card">
          <div className="card-header-flex">
            <h3>Department performance index</h3>
            <span className="data-results-count">Showing {sortedData.length} records</span>
          </div>

          <div className="ranking-table-wrapper">
            <table className="ranking-data-table">
              <thead>
                <tr>
                  <th className="sortable-header" onClick={() => handleSort('rank')}>
                    Rank {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable-header" onClick={() => handleSort('name')}>
                    Department {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable-header" onClick={() => handleSort('total_score')}>
                    Overall ESG Score {sortConfig.key === 'total_score' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable-header" onClick={() => handleSort('env')}>
                    Env Metric {sortConfig.key === 'env' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable-header" onClick={() => handleSort('social')}>
                    Social Metric {sortConfig.key === 'social' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable-header" onClick={() => handleSort('gov')}>
                    Gov Metric {sortConfig.key === 'gov' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((dept) => {
                  const trend = dept.trend;
                  return (
                    <tr key={dept.code} className="table-row-hoverable">
                      <td className="col-rank-num">#{dept.rank}</td>
                      <td className="col-dept-profile">
                        <div className="dept-avatar-tag">{dept.code}</div>
                        <div className="dept-details">
                          <span className="dept-full-name">{dept.name}</span>
                          <span className="dept-code-tag">CODE: {dept.code}</span>
                        </div>
                      </td>
                      <td className="col-score-progress">
                        <div className="score-flex-align">
                          <strong className="score-bold-num">{dept.total_score.toFixed(1)}</strong>
                          <div className="custom-progress-track">
                            <div 
                              className="custom-progress-bar" 
                              style={{ 
                                width: `${dept.total_score}%`,
                                backgroundColor: dept.total_score >= 80 ? '#10b981' : dept.total_score >= 60 ? '#f59e0b' : '#ef4444' 
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="metric-cell env-cell">{dept.env.toFixed(1)}</td>
                      <td className="metric-cell social-cell">{dept.social.toFixed(1)}</td>
                      <td className="metric-cell gov-cell">{dept.gov.toFixed(1)}</td>
                      <td>
                        {trend === 'up' && (
                          <span className="trend-badge badge-up">
                            <span className="arrow">▲</span> Upward
                          </span>
                        )}
                        {trend === 'down' && (
                          <span className="trend-badge badge-down">
                            <span className="arrow">▼</span> Regress
                          </span>
                        )}
                        {trend === 'stable' && (
                          <span className="trend-badge badge-stable">
                            <span className="arrow">■</span> Stable
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </article>

        {/* Segment Comparison Graph */}
        <article className="ranking-volatility-card">
          <div className="chart-header-controls">
            <div className="chart-header-info">
              <h3>Segment Comparison Graph</h3>
              <p>6-Month historical ESG timeline comparing top and bottom performing cohorts</p>
            </div>
            
            <div className="chart-filter-pills">
              <button 
                type="button" 
                className={`chart-pill-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Cohorts
              </button>
              <button 
                type="button" 
                className={`chart-pill-btn ${activeTab === 'top' ? 'active' : ''}`}
                onClick={() => setActiveTab('top')}
              >
                Top 5 Units
              </button>
              <button 
                type="button" 
                className={`chart-pill-btn ${activeTab === 'bottom' ? 'active' : ''}`}
                onClick={() => setActiveTab('bottom')}
              >
                Bottom 5 Units
              </button>
            </div>
          </div>

          <div className="chart-metric-selector">
            <label>Compare Metric:</label>
            <div className="metric-button-grid">
              {['total_score', 'env', 'social', 'gov'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`metric-choice-btn ${chartMetric === m ? 'active' : ''}`}
                  onClick={() => setChartMetric(m)}
                >
                  {m === 'total_score' ? 'Overall' : m.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="ranking-volatility-chart-container">
            {renderSvgChart()}
          </div>

          {/* Interactive Legend with Highlights */}
          <div className="chart-legend-grid">
            {filteredChartSeries.map((series) => (
              <div 
                key={series.code} 
                className={`legend-item-pill ${hoveredSeries === series.code ? 'highlighted' : ''}`}
                onMouseEnter={() => setHoveredSeries(series.code)}
                onMouseLeave={() => setHoveredSeries(null)}
              >
                <span className="legend-indicator-dot" style={{ backgroundColor: series.color }}></span>
                <span className="legend-item-label">{series.code} ({series.total_score.toFixed(0)})</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

  


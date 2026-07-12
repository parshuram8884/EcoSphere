import { useState } from 'react'
import './CSRActivities.css'

export default function CSRActivities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')

  return (
    <div className="csr-container">
      {/* 1. Title Row */}
      <article className="csr-title-row">
        <div className="csr-title-block">
          <h2>CSR Activities</h2>
          <p>Corporate Social Responsibility management and tracking.</p>
        </div>

        <div className="csr-actions-bar">
          <div className="csr-view-toggle" aria-hidden="true">
            <button type="button" className="csr-toggle-btn csr-toggle-btn-active">Grid View</button>
            <button type="button" className="csr-toggle-btn">List View</button>
          </div>
          <button type="button" className="csr-btn-propose">
            ➕ Propose CSR Activity
          </button>
        </div>
      </article>

      {/* 2. Top Metric Cards */}
      <section className="csr-metrics-row" aria-label="CSR activities summary metrics">
        {/* Hours Card */}
        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-hours" aria-hidden="true">
            ⏱️
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Volunteer Hours</span>
            <strong className="csr-metric-val">4,820 Hours</strong>
            <span className="csr-metric-delta delta-green">↗ +12% vs last Q</span>
          </div>
        </article>

        {/* Engagement Card */}
        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-participation" aria-hidden="true">
            👥
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Engagement Rate</span>
            <strong className="csr-metric-val">74% Participation</strong>
            <span className="csr-metric-delta delta-green">+4% vs Tier 1 Industry</span>
          </div>
        </article>

        {/* Capital Card */}
        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-capital" aria-hidden="true">
            💵
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Capital Allocated</span>
            <strong className="csr-metric-val">$85,000</strong>
            <span className="csr-metric-delta delta-grey">✓ FY 2024 Budget</span>
          </div>
        </article>
      </section>

      {/* 3. Filters Toolbar Card */}
      <article className="csr-filters-panel">
        <input 
          type="search" 
          className="csr-search-input" 
          placeholder="Search activities..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="csr-dropdowns-group">
          <select 
            className="goals-dropdown" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
          </select>

          <select 
            className="goals-dropdown" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="button" className="ledger-btn-action">
            🎛️ More Filters
          </button>
        </div>
      </article>

      {/* 4. Split Layout */}
      <section className="csr-split-layout" aria-label="CSR activities detail layout">
        
        {/* Left Column: Upcoming Activities */}
        <div className="csr-left-panel">
          <div className="csr-panel-title-row">
            <h3>Upcoming Activities</h3>
            <a href="#view-all" className="csr-view-all-link">View All</a>
          </div>

          <div className="csr-activities-grid">
            {/* Card 1 */}
            <article className="csr-activity-card">
              <div className="csr-card-image-box">
                <img className="csr-card-image" src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=300&fit=crop&q=80" alt="Annual Beach Cleanup" />
                <span className="csr-card-status-tag">✓ Open to Join</span>
              </div>
              <div className="csr-card-details">
                <h4>Annual Beach Cleanup</h4>
                <div className="csr-location-row">
                  <span>📍</span>
                  <span>Pacific Coast Beachline</span>
                </div>
                
                <div className="csr-meta-grid">
                  <div className="csr-meta-item">
                    <span className="csr-meta-label">Date & Time</span>
                    <span className="csr-meta-val">Oct 14, 09:00 AM</span>
                  </div>
                  <div className="csr-meta-item">
                    <span className="csr-meta-label">Roster Status</span>
                    <span className="csr-meta-val">Open to all</span>
                  </div>
                </div>

                <div className="csr-progress-box">
                  <div className="csr-progress-labels">
                    <span>Target: 100 Volunteers</span>
                    <span>82% joined</span>
                  </div>
                  <div className="goals-progress-track">
                    <div className="goals-progress-fill" style={{ width: '82%', background: '#059669', height: '100%' }}></div>
                  </div>
                </div>

                <div className="csr-card-actions">
                  <button type="button" className="csr-btn-card-outline">ISO Compliant File</button>
                  <button type="button" className="csr-btn-card-solid">Manage Roster</button>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="csr-activity-card">
              <div className="csr-card-image-box">
                <img className="csr-card-image" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&fit=crop&q=80" alt="Tech Mentorship Workshop" />
                <span className="csr-card-status-tag">✓ Open to Join</span>
              </div>
              <div className="csr-card-details">
                <h4>Tech Mentorship Workshop</h4>
                <div className="csr-location-row">
                  <span>📍</span>
                  <span>Silicon Valley Hub | Room 4B</span>
                </div>
                
                <div className="csr-meta-grid">
                  <div className="csr-meta-item">
                    <span className="csr-meta-label">Date & Time</span>
                    <span className="csr-meta-val">Oct 18, 02:30 PM</span>
                  </div>
                  <div className="csr-meta-item">
                    <span className="csr-meta-label">Roster Status</span>
                    <span className="csr-meta-val">Registration open</span>
                  </div>
                </div>

                <div className="csr-progress-box">
                  <div className="csr-progress-labels">
                    <span>Target: 50 Mentors</span>
                    <span>45% joined</span>
                  </div>
                  <div className="goals-progress-track">
                    <div className="goals-progress-fill" style={{ width: '45%', background: '#eab308', height: '100%' }}></div>
                  </div>
                </div>

                <div className="csr-card-actions">
                  <button type="button" className="csr-btn-card-outline">SDG Align File</button>
                  <button type="button" className="csr-btn-card-solid">Manage Roster</button>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Right Column: Calendar Widget */}
        <div className="csr-right-panel">
          <article className="csr-calendar-card">
            <h3>Corporate CSR Calendar</h3>
            
            <div className="csr-cal-header-row">
              <span>October 2024</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ cursor: 'pointer' }}>&lt;</span>
                <span style={{ cursor: 'pointer' }}>&gt;</span>
              </div>
            </div>

            <div className="csr-cal-days-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <span key={d} className="csr-cal-weekday">{d}</span>
              ))}
              
              {/* Padding */}
              <span className="csr-cal-day csr-cal-day-other">29</span>
              <span className="csr-cal-day csr-cal-day-other">30</span>
              
              {/* Month dates */}
              <span className="csr-cal-day">1</span>
              <span className="csr-cal-day">2</span>
              <span className="csr-cal-day">3</span>
              <span className="csr-cal-day">4</span>
              <span className="csr-cal-day">5</span>
              
              <span className="csr-cal-day">6</span>
              <span className="csr-cal-day">7</span>
              <span className="csr-cal-day">8</span>
              <span className="csr-cal-day">9</span>
              <span className="csr-cal-day">10</span>
              <span className="csr-cal-day">11</span>
              <span className="csr-cal-day">12</span>
              
              <span className="csr-cal-day">13</span>
              <span className="csr-cal-day csr-cal-day-event csr-cal-day-active">
                14
                <div className="csr-cal-marker-tooltip">
                  Tech Workshop
                </div>
              </span>
              <span className="csr-cal-day">15</span>
              <span className="csr-cal-day">16</span>
              <span className="csr-cal-day">17</span>
              <span className="csr-cal-day csr-cal-day-event">18</span>
              <span className="csr-cal-day">19</span>
              
              <span className="csr-cal-day">20</span>
              <span className="csr-cal-day">21</span>
              <span className="csr-cal-day">22</span>
              <span className="csr-cal-day">23</span>
              <span className="csr-cal-day">24</span>
              <span className="csr-cal-day">25</span>
              <span className="csr-cal-day">26</span>
              
              <span className="csr-cal-day">27</span>
              <span className="csr-cal-day">28</span>
              <span className="csr-cal-day">29</span>
              <span className="csr-cal-day">30</span>
              <span className="csr-cal-day">31</span>
              <span className="csr-cal-day csr-cal-day-other">1</span>
              <span className="csr-cal-day csr-cal-day-other">2</span>
            </div>

            <div className="csr-cal-legend">
              <div className="csr-cal-legend-row">
                <span className="cal-legend-dot" style={{ background: '#10b981' }}></span>
                <span>Active/Confirmed CSR Event</span>
              </div>
              <div className="csr-cal-legend-row">
                <span className="cal-legend-dot" style={{ background: '#eab308' }}></span>
                <span>Pending Approval</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

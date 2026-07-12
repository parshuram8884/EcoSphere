import { useState, useMemo } from 'react'
import './CSRActivities.css'
import { useApi } from '../../hooks/useApi'

export default function CSRActivities() {
  const { data: activitiesData, loading, error } = useApi('/social/activities/')
  const { data: summaryData } = useApi('/social/dashboard/')

  // Local additions to supplement API data
  const [localActivities, setLocalActivities] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState('Active & Upcoming')

  // Modals state
  const [isProposeOpen, setIsProposeOpen] = useState(false)
  const [isRosterOpen, setIsRosterOpen] = useState(false)
  const [activeRosterActivity, setActiveRosterActivity] = useState(null)

  // New activity form state
  const [newActivity, setNewActivity] = useState({
    title: '',
    category_name: 'Environment',
    description: '',
    date: '',
    department_name: 'Operations'
  })

  // Combine API and local activities
  const allActivities = useMemo(() => {
    if (!activitiesData) return [];
    
    // Process API activities to add targets/enrolled/impact
    const processedApi = activitiesData.map(act => {
      const seed = act.id || 1;
      const target = 15 + (seed % 3) * 10;
      const enrolled = Math.min(target, 5 + (seed % 4) * 6);
      return {
        ...act,
        target_volunteers: target,
        enrolled_volunteers: enrolled,
        points: 50 + (seed % 3) * 25,
        co2_saved: 120 + (seed % 4) * 80,
        time: '10:00 AM - 2:00 PM',
        image: `https://images.unsplash.com/photo-${1500000000000 + (seed * 10000)}?w=400&auto=format&fit=crop&q=60`
      }
    });

    return [...localActivities, ...processedApi];
  }, [activitiesData, localActivities])

  // Filter logic
  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        activity.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'All Categories' || 
        activity.category_name === categoryFilter;
      
      let matchesStatus = true;
      if (statusFilter === 'Active & Upcoming') {
        matchesStatus = activity.status === 'active' || activity.status === 'draft';
      } else if (statusFilter === 'Completed') {
        matchesStatus = activity.status === 'completed';
      }

      return matchesSearch && matchesCategory && matchesStatus;
    })
  }, [allActivities, searchQuery, categoryFilter, statusFilter])

  // Get categories list
  const categoriesList = useMemo(() => {
    const defaultCats = ['Environment', 'Community', 'Education'];
    if (!activitiesData) return ['All Categories', ...defaultCats];
    const apiCats = activitiesData.map(a => a.category_name).filter(Boolean);
    return ['All Categories', ...new Set([...defaultCats, ...apiCats])];
  }, [activitiesData])

  // Propose activity handler
  const handleProposeSubmit = (e) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.description || !newActivity.date) return;

    const proposed = {
      id: Date.now(),
      title: newActivity.title,
      category_name: newActivity.category_name,
      description: newActivity.description,
      date: newActivity.date,
      department_name: newActivity.department_name,
      status: 'active',
      target_volunteers: 20,
      enrolled_volunteers: 1,
      points: 75,
      co2_saved: 150,
      time: '09:00 AM - 1:00 PM',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&auto=format&fit=crop&q=60'
    };

    setLocalActivities([proposed, ...localActivities]);
    setIsProposeOpen(false);
    // Reset form
    setNewActivity({
      title: '',
      category_name: 'Environment',
      description: '',
      date: '',
      department_name: 'Operations'
    });
  }

  // Handle Roster open
  const openRoster = (activity) => {
    setActiveRosterActivity(activity);
    setIsRosterOpen(true);
  }

  // Simulated roster members based on enrolled count
  const simulatedRoster = useMemo(() => {
    if (!activeRosterActivity) return [];
    const count = activeRosterActivity.enrolled_volunteers;
    const names = [
      { name: 'Sarah Jenkins', dept: 'Engineering', role: 'Team Lead', status: 'Confirmed' },
      { name: 'David Chen', dept: 'Marketing', role: 'Specialist', status: 'Confirmed' },
      { name: 'Elena Rostova', dept: 'HR', role: 'Manager', status: 'Confirmed' },
      { name: 'Marcus Miller', dept: 'Operations', role: 'Coordinator', status: 'Pending' },
      { name: 'Tariq Yusuf', dept: 'Finance', role: 'Analyst', status: 'Confirmed' },
      { name: 'Aiko Tanaka', dept: 'R&D', role: 'Researcher', status: 'Pending' },
      { name: 'Liam Brown', dept: 'Supply Chain', role: 'Specialist', status: 'Confirmed' }
    ];
    return Array.from({ length: count }, (_, i) => names[i % names.length]);
  }, [activeRosterActivity])

  // Calendar View Helpers (July 2026 Grid)
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday start
  const calendarDays = useMemo(() => {
    const days = [];
    // Previous month padding days
    for (let i = 0; i < startDayOffset; i++) {
      days.push({ day: 28 + i, type: 'padding' });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      // Find matching activity for this day
      const dateStr = `2026-07-${i < 10 ? '0' + i : i}`;
      const dayActivities = allActivities.filter(act => act.date === dateStr);
      days.push({
        day: i,
        type: 'current',
        dateString: dateStr,
        activities: dayActivities
      });
    }
    return days;
  }, [allActivities])

  if (loading) {
    return (
      <div className="social-loading-container">
        <div className="social-spinner"></div>
        <p>Loading CSR activities platform...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="social-error-container">
        <div className="error-icon">⚠️</div>
        <h3>Failed to Load CSR Data</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="csr-container">
      {/* 1. Executive Analytics Ribbon */}
      <section className="csr-metrics-row" aria-label="CSR Key Statistics">
        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-hours">
            <span>⏱️</span>
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Volunteer Hours Logged</span>
            <span className="csr-metric-val">{summaryData?.volunteer_hours || '4,820'} Hrs</span>
            <span className="csr-metric-delta delta-green">▲ +12% from last Q</span>
          </div>
        </article>

        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-participation">
            <span>🤝</span>
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Active Engagement Rate</span>
            <span className="csr-metric-val">{summaryData?.engagement_rate || '74'}%</span>
            <span className="csr-metric-delta delta-green">▲ +4.3% this cycle</span>
          </div>
        </article>

        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-capital">
            <span>💰</span>
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Capital Allocated</span>
            <span className="csr-metric-val">$85,000</span>
            <span className="csr-metric-delta delta-grey">● 92% of annual budget</span>
          </div>
        </article>
      </section>

      {/* 2. Management & Filter Controls */}
      <section className="csr-filters-panel">
        <div className="csr-search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search Activities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="csr-search-input"
          />
        </div>

        <div className="csr-dropdowns-group">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="csr-select-filter"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat === 'All Categories' ? 'All Categories' : `${cat} Category`}</option>
            ))}
          </select>

          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="csr-select-filter"
          >
            <option value="Active & Upcoming">Active & Upcoming</option>
            <option value="Completed">Completed</option>
          </select>

          <button 
            type="button" 
            className="csr-btn-propose"
            onClick={() => setIsProposeOpen(true)}
          >
            ➕ Propose CSR Activity
          </button>
        </div>
      </section>

      {/* 3. Two-Column Workspace Layout */}
      <section className="csr-split-layout">
        
        {/* Left Column (60% width) - Upcoming Activities Grid */}
        <article className="csr-left-panel">
          <div className="csr-panel-title-row">
            <h3>Initiatives Portfolio ({filteredActivities.length})</h3>
            <span className="view-all-label">Displaying Cohort Grid</span>
          </div>

          <div className="csr-activities-grid">
            {filteredActivities.map((activity) => {
              const enrollmentPercent = Math.round((activity.enrolled_volunteers / activity.target_volunteers) * 100);
              
              return (
                <div key={activity.id} className="csr-activity-card">
                  <div className="csr-card-image-box">
                    <img 
                      src={activity.image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&auto=format&fit=crop&q=60'} 
                      alt={activity.title} 
                      className="csr-card-image"
                    />
                    <span className="csr-card-status-tag">{activity.category_name}</span>
                  </div>

                  <div className="csr-card-details">
                    <div className="card-top-row">
                      <span className="date-time-badge">📅 {activity.date}</span>
                      <span className="org-dept-tag">🏢 {activity.department_name || 'Global'}</span>
                    </div>

                    <h4>{activity.title}</h4>
                    <p className="card-desc">{activity.description}</p>

                    {/* Progress Bar */}
                    <div className="csr-progress-box">
                      <div className="csr-progress-labels">
                        <span>Volunteers Enrolled</span>
                        <span>{activity.enrolled_volunteers} / {activity.target_volunteers} ({enrollmentPercent}%)</span>
                      </div>
                      <div className="csr-progress-track">
                        <div 
                          className="csr-progress-bar-fill" 
                          style={{ width: `${enrollmentPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Impact Metrics Row */}
                    <div className="csr-meta-grid">
                      <div className="csr-meta-item">
                        <span className="csr-meta-label">Gamification</span>
                        <span className="csr-meta-val">⭐ +{activity.points} XP</span>
                      </div>
                      <div className="csr-meta-item">
                        <span className="csr-meta-label">Est. CO2 Reduced</span>
                        <span className="csr-meta-val">🌱 {activity.co2_saved} kg CO2</span>
                      </div>
                    </div>

                    <div className="csr-card-actions">
                      <button 
                        type="button" 
                        className="csr-btn-card-outline"
                        onClick={() => openRoster(activity)}
                      >
                        👥 Manage Roster
                      </button>
                      <button 
                        type="button" 
                        className="csr-btn-card-solid"
                        disabled={activity.status === 'completed'}
                      >
                        {activity.status === 'completed' ? 'Archived' : 'Enroll Now'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredActivities.length === 0 && (
              <div className="csr-no-results">
                <span>🔍</span>
                <p>No upcoming initiatives found matching the active filters.</p>
              </div>
            )}
          </div>
        </article>

        {/* Right Column (40% width) - Corporate CSR Calendar View */}
        <article className="csr-calendar-card">
          <div className="calendar-card-header">
            <h3>Corporate CSR Calendar</h3>
            <span className="cal-month-indicator">July 2026</span>
          </div>

          <div className="csr-cal-days-grid">
            {/* Days of week */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="csr-cal-weekday">{d}</div>
            ))}

            {/* Day nodes */}
            {calendarDays.map((node, index) => {
              const hasEvents = node.type === 'current' && node.activities && node.activities.length > 0;
              
              return (
                <div 
                  key={index} 
                  className={`csr-cal-day ${node.type === 'padding' ? 'csr-cal-day-other' : ''} ${hasEvents ? 'csr-cal-day-event' : ''}`}
                >
                  <span>{node.day}</span>
                  {hasEvents && (
                    <>
                      <span className="event-dot-marker"></span>
                      <div className="csr-cal-marker-tooltip">
                        <strong>Initiative:</strong> {node.activities[0].title}
                        <br />
                        <strong>Org:</strong> {node.activities[0].department_name || 'Global'}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="csr-cal-legend">
            <div className="csr-cal-legend-row">
              <span className="cal-legend-dot" style={{ backgroundColor: '#10b981' }}></span>
              <span>Active ESG / CSR Initiative scheduled</span>
            </div>
            <div className="csr-cal-legend-row">
              <span className="cal-legend-dot" style={{ backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}></span>
              <span>Open day for team volunteer proposal</span>
            </div>
          </div>
        </article>

      </section>

      {/* 4. Interactive Roster Management Modal */}
      {isRosterOpen && activeRosterActivity && (
        <div className="csr-modal-overlay" onClick={() => setIsRosterOpen(false)}>
          <div className="csr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="csr-modal-header">
              <h3>Roster for: {activeRosterActivity.title}</h3>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setIsRosterOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="csr-modal-body">
              <p className="roster-subinfo">Showing all enrolled employees currently signed up for the activity.</p>
              <div className="roster-list-table">
                <div className="roster-table-header">
                  <span>Volunteer Name</span>
                  <span>Department</span>
                  <span>Corporate Role</span>
                  <span>Status</span>
                </div>
                {simulatedRoster.map((item, index) => (
                  <div key={index} className="roster-table-row">
                    <span className="roster-name">{item.name}</span>
                    <span>{item.dept}</span>
                    <span className="roster-role">{item.role}</span>
                    <span className={`roster-status-pill status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="csr-modal-footer">
              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setIsRosterOpen(false)}
              >
                Close Roster
              </button>
              <button 
                type="button" 
                className="btn-solid"
                onClick={() => {
                  alert('Roster list exported successfully.');
                  setIsRosterOpen(false);
                }}
              >
                Export List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Interactive Propose Activity Modal */}
      {isProposeOpen && (
        <div className="csr-modal-overlay" onClick={() => setIsProposeOpen(false)}>
          <div className="csr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="csr-modal-header">
              <h3>Propose CSR Activity</h3>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setIsProposeOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleProposeSubmit}>
              <div className="csr-modal-body form-grid">
                <div className="form-group">
                  <label htmlFor="title">Activity Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    required
                    placeholder="e.g. Tree Planting Campaign"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  />
                </div>

                <div className="form-group-split">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                      id="category"
                      value={newActivity.category_name}
                      onChange={(e) => setNewActivity({...newActivity, category_name: e.target.value})}
                    >
                      <option value="Environment">Environment</option>
                      <option value="Community">Community</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dept">Host Department</label>
                    <select 
                      id="dept"
                      value={newActivity.department_name}
                      onChange={(e) => setNewActivity({...newActivity, department_name: e.target.value})}
                    >
                      <option value="Operations">Operations</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-split">
                  <div className="form-group">
                    <label htmlFor="date">Scheduled Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      required
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Initiative Objective & Description</label>
                  <textarea 
                    id="description" 
                    required
                    rows="3"
                    placeholder="Describe target audience, volunteer responsibilities, and expected community impacts..."
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              <div className="csr-modal-footer">
                <button 
                  type="button" 
                  className="btn-outline"
                  onClick={() => setIsProposeOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-solid"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

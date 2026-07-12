import { useState, useEffect } from 'react'
import { authFetch } from '../../services/api'
import './CSRActivities.css'

export default function CSRActivities() {
  const [activities, setActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
  })

  // Fetch CSR activities and categories from backend
  const fetchData = async () => {
    try {
      const [actRes, catRes] = await Promise.all([
        authFetch('/social/activities/'),
        authFetch('/settings/categories/'),
      ])
      if (actRes.ok) {
        const data = await actRes.json()
        setActivities(data)
      }
      if (catRes.ok) {
        const data = await catRes.json()
        // Only show CSR-type categories
        setCategories(data.filter((c) => c.type === 'csr'))
      }
    } catch (err) {
      console.error('Failed to fetch CSR data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // Submit new CSR activity
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.description || !formData.date) {
      setError('Title, description, and date are required.')
      return
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      status: 'active',
    }
    if (formData.category) {
      payload.category = parseInt(formData.category, 10)
    }

    try {
      const res = await authFetch('/social/activities/', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({ title: '', category: '', description: '', date: '' })
        fetchData()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to propose activity. Please try again.')
    }
  }

  // Filter activities
  const filteredActivities = activities.filter((a) => {
    const matchesSearch = searchQuery === '' ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'All' || a.category_name === category
    const matchesStatus = status === 'All' || a.status === status
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Derive unique category names for the filter dropdown
  const categoryNames = [...new Set(activities.map((a) => a.category_name).filter(Boolean))]

  // Count stats
  const activeCount = activities.filter((a) => a.status === 'active').length
  const completedCount = activities.filter((a) => a.status === 'completed').length

  if (loading) {
    return (
      <div className="csr-container">
        <div className="loading-state">Loading CSR activities...</div>
      </div>
    )
  }

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
          <button type="button" className="csr-btn-propose" onClick={() => setShowModal(true)}>
            ➕ Propose CSR Activity
          </button>
        </div>
      </article>

      {/* 2. Top Metric Cards */}
      <section className="csr-metrics-row" aria-label="CSR activities summary metrics">
        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-hours" aria-hidden="true">
            📋
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Total Activities</span>
            <strong className="csr-metric-val">{activities.length}</strong>
            <span className="csr-metric-delta delta-green">Across all departments</span>
          </div>
        </article>

        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-participation" aria-hidden="true">
            ✅
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Active</span>
            <strong className="csr-metric-val">{activeCount}</strong>
            <span className="csr-metric-delta delta-green">Currently open</span>
          </div>
        </article>

        <article className="csr-metric-card">
          <div className="csr-metric-icon-box icon-bg-capital" aria-hidden="true">
            🏁
          </div>
          <div className="csr-metric-details">
            <span className="csr-metric-label">Completed</span>
            <strong className="csr-metric-val">{completedCount}</strong>
            <span className="csr-metric-delta delta-grey">Successfully finished</span>
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
            {categoryNames.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="goals-dropdown"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button type="button" className="ledger-btn-action">
            🎛️ More Filters
          </button>
        </div>
      </article>

      {/* 4. Split Layout */}
      <section className="csr-split-layout" aria-label="CSR activities detail layout">

        {/* Left Column: Activities */}
        <div className="csr-left-panel">
          <div className="csr-panel-title-row">
            <h3>Activities ({filteredActivities.length})</h3>
          </div>

          <div className="csr-activities-grid">
            {filteredActivities.length === 0 ? (
              <div className="empty-state">
                <p>No CSR activities found. Click "Propose CSR Activity" to create one.</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <article key={activity.id} className="csr-activity-card">
                  <div className="csr-card-image-box">
                    <div className="csr-card-image-placeholder">
                      {activity.title.charAt(0).toUpperCase()}
                    </div>
                    <span className={`csr-card-status-tag status-${activity.status}`}>
                      {activity.status === 'active' ? '✓ Open' : activity.status}
                    </span>
                  </div>
                  <div className="csr-card-details">
                    <h4>{activity.title}</h4>

                    {activity.category_name && (
                      <div className="csr-location-row">
                        <span>🏷️</span>
                        <span>{activity.category_name}</span>
                      </div>
                    )}

                    <p className="csr-description-text">{activity.description}</p>

                    <div className="csr-meta-grid">
                      <div className="csr-meta-item">
                        <span className="csr-meta-label">Date</span>
                        <span className="csr-meta-val">{activity.date}</span>
                      </div>
                      <div className="csr-meta-item">
                        <span className="csr-meta-label">Status</span>
                        <span className="csr-meta-val">{activity.status}</span>
                      </div>
                      {activity.department_name && (
                        <div className="csr-meta-item">
                          <span className="csr-meta-label">Department</span>
                          <span className="csr-meta-val">{activity.department_name}</span>
                        </div>
                      )}
                    </div>

                    <div className="csr-card-actions">
                      <button type="button" className="csr-btn-card-solid">View Details</button>
                    </div>
                  </div>
                </article>
              ))
            )}
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
              <span className="csr-cal-day csr-cal-day-other">29</span>
              <span className="csr-cal-day csr-cal-day-other">30</span>
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
                  Beach Cleanup
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
                <span>Active CSR Event</span>
              </div>
              <div className="csr-cal-legend-row">
                <span className="cal-legend-dot" style={{ background: '#eab308' }}></span>
                <span>Pending Approval</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Propose CSR Activity Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Propose CSR Activity</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Activity Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Annual Beach Cleanup"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category (optional)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the CSR activity, its goals, and expected impact..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Activity Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Propose Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

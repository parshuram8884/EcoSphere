import { useState } from 'react'
import './CSRActivities.css'
import { useApi } from '../../hooks/useApi'

export default function CSRActivities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState('Active & Upcoming')

  const { data: activities, loading, error } = useApi('/social/activities/')
  const { data: summary } = useApi('/social/dashboard/')

  if (loading) return <div style={{ padding: 20 }}>Loading CSR activities...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!activities) return null

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'All Categories' || activity.category_name === categoryFilter
    
    let matchesStatus = true
    if (statusFilter === 'Active & Upcoming') matchesStatus = activity.status === 'active'
    if (statusFilter === 'Completed') matchesStatus = activity.status === 'completed'
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for the filter
  const categories = ['All Categories', ...new Set(activities.map(a => a.category_name).filter(Boolean))]

  return (
    <div className="csr-container">
      {/* 1. Header & Metrics Ribbon */}
      <section className="csr-header-section" aria-label="CSR Metrics">
        <div className="csr-header-text">
          <h2>Corporate Social Responsibility</h2>
          <p>Discover, track, and participate in community and environmental impact initiatives.</p>
        </div>
        
        <div className="csr-metrics-ribbon">
          <article className="csr-metric-card">
            <span className="metric-val">{summary?.volunteer_hours || 0}</span>
            <span className="metric-label">Volunteer Hrs Logged</span>
          </article>
          <article className="csr-metric-card">
            <span className="metric-val">{summary?.engagement_rate || 0}%</span>
            <span className="metric-label">Employee Engagement</span>
          </article>
        </div>
      </section>

      {/* 2. Controls / Filters */}
      <section className="csr-controls-bar">
        <div className="csr-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="search" 
            placeholder="Search activities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="csr-filters">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Active & Upcoming">Active & Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="All Statuses">All Statuses</option>
          </select>

          <button className="btn-primary" type="button">Propose Initiative</button>
        </div>
      </section>

      {/* 3. Activity Grid */}
      <section className="csr-grid">
        {filteredActivities.map((activity) => (
          <article key={activity.id} className="csr-card">
            <div className="csr-card-header">
              <span className={`csr-category-badge cat-${(activity.category_name || 'General').toLowerCase().replace(' ', '-')}`}>
                {activity.category_name || 'General'}
              </span>
              <span className={`csr-status-dot status-${activity.status}`}></span>
            </div>

            <div className="csr-card-body">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>

            <div className="csr-card-meta">
              <div className="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{activity.date}</span>
              </div>
              <div className="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{activity.department_name || 'Global'}</span>
              </div>
            </div>

            <div className="csr-card-footer">
              <div className="csr-avatars">
                {/* Simulated participant avatars */}
                <span className="csr-avatar">JD</span>
                <span className="csr-avatar">AS</span>
                <span className="csr-avatar">MK</span>
                <span className="csr-avatar-more">+12</span>
              </div>
              <button 
                type="button" 
                className={`btn-enroll ${activity.status !== 'active' ? 'btn-disabled' : ''}`}
                disabled={activity.status !== 'active'}
              >
                {activity.status === 'active' ? 'Enroll Now' : 'Closed'}
              </button>
            </div>
          </article>
        ))}
        {filteredActivities.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', color: '#64748b' }}>
            No activities match your filters.
          </div>
        )}
      </section>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { authFetch } from '../../services/api'
import './Policies.css'

export default function Policies() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [pillar, setPillar] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    version: '',
    body: '',
  })

  // Fetch policies from backend
  const fetchPolicies = async () => {
    try {
      const res = await authFetch('/governance/policies/')
      if (res.ok) {
        setPolicies(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch policies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPolicies()
  }, [])

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // Submit new policy draft
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.version || !formData.body) {
      setError('Title, version, and body are required.')
      return
    }

    try {
      const res = await authFetch('/governance/policies/', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          version: formData.version,
          body: formData.body,
          status: 'draft',
        }),
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({ title: '', version: '', body: '' })
        fetchPolicies()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to draft policy. Please try again.')
    }
  }

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'draft': return 'policy-status-badge status-draft'
      case 'published': return 'policy-status-badge status-active'
      default: return 'policy-status-badge'
    }
  }

  // Truncate body for card preview
  const truncateBody = (text, maxLen = 120) => {
    if (!text) return ''
    return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
  }

  // Toggle policy status (draft <-> published)
  const handleTogglePublish = async (policy) => {
    const newStatus = policy.status === 'published' ? 'draft' : 'published'
    try {
      const res = await authFetch(`/governance/policies/${policy.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        fetchPolicies()
      }
    } catch (err) {
      console.error('Failed to update policy status:', err)
    }
  }

  // Filter policies
  const filteredPolicies = policies.filter((p) => {
    const matchesSearch = searchQuery === '' ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="policies-container">
        <div className="loading-state">Loading policies...</div>
      </div>
    )
  }

  return (
    <div className="policies-container">
      {/* 1. Document Control Bar */}
      <article className="policies-control-bar">
        <div className="policies-search-group">
          <input
            type="search"
            className="policies-search-input"
            placeholder="Search Corporate Policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="policies-dropdown"
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
          >
            <option value="All">Pillar Filter: All</option>
            <option value="Anti-Corruption">Anti-Corruption</option>
            <option value="Data Privacy">Data Privacy</option>
            <option value="Supply Chain Ethics">Supply Chain Ethics</option>
          </select>
        </div>

        <button type="button" className="policies-btn-draft" onClick={() => setShowModal(true)}>
          ➕ Draft New Policy
        </button>
      </article>

      {/* 2. Corporate Policy Grid */}
      <section className="policies-grid" aria-label="Corporate Governance Policies">
        {filteredPolicies.length === 0 ? (
          <div className="empty-state">
            <p>No policies found. Click "Draft New Policy" to create one.</p>
          </div>
        ) : (
          filteredPolicies.map((policy) => (
            <article key={policy.id} className="policy-card">
              <div className="policy-card-header">
                <div className="policy-card-title-block">
                  <h3>{policy.title}</h3>
                  <div className="policy-card-meta-row">
                    <span className="policy-version-tag">v{policy.version}</span>
                    <span>Published: {policy.published_date}</span>
                  </div>
                </div>

                <span className={getStatusClass(policy.status)}>
                  {policy.status === 'published' ? 'Active' : policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </span>
              </div>

              {/* Body preview */}
              <div className="policy-card-details-list">
                <div className="policy-detail-row" style={{ gridColumn: '1 / -1' }}>
                  <span className="policy-detail-label">Policy Body</span>
                  <span className="policy-detail-val">{truncateBody(policy.body)}</span>
                </div>
              </div>

              {/* Status info */}
              <div className="policy-history-section">
                <span className="policy-history-title">Status Information</span>
                <div className="policy-history-list">
                  <div className="policy-history-item">
                    <div>
                      <strong style={{ color: '#0f172a' }}>{policy.status === 'published' ? 'Published' : 'Draft'}</strong>
                      <span className="policy-history-text">
                        {' '}— Last updated {policy.published_date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="policy-toggle-row">
                <span className="policy-toggle-label">
                  {policy.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <label className="policy-switch" htmlFor={`toggle-${policy.id}`}>
                  <input
                    type="checkbox"
                    id={`toggle-${policy.id}`}
                    checked={policy.status === 'published'}
                    onChange={() => handleTogglePublish(policy)}
                  />
                  <span className="policy-slider"></span>
                </label>
              </div>
            </article>
          ))
        )}
      </section>

      {/* ── Draft New Policy Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Draft New Policy</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Policy Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Global Anti-Bribery Code"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="version">Version</label>
                  <input
                    id="version"
                    name="version"
                    type="text"
                    placeholder="e.g. 1.0"
                    value={formData.version}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status-badge">Status</label>
                  <input
                    id="status-badge"
                    type="text"
                    value="Draft"
                    readOnly
                    className="input-readonly"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="body">Policy Body</label>
                <textarea
                  id="body"
                  name="body"
                  rows={6}
                  placeholder="Write the full policy content here..."
                  value={formData.body}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


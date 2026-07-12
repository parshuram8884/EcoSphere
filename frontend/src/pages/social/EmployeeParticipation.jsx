import { useState, useEffect, useRef } from 'react'
import { authFetch } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './EmployeeParticipation.css'

export default function EmployeeParticipation() {
  const { user: authUser } = useAuth()
  const [participations, setParticipations] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All Submissions')
  const [activeParticipationId, setActiveParticipationId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    activity: '',
    points_earned: '',
    completion_date: '',
  })
  const [proofFile, setProofFile] = useState(null)

  // Fetch participations and activities
  const fetchData = async () => {
    try {
      const [partRes, actRes] = await Promise.all([
        authFetch('/social/participations/'),
        authFetch('/social/activities/'),
      ])
      if (partRes.ok) {
        const data = await partRes.json()
        setParticipations(data)
        if (data.length > 0) {
          setActiveParticipationId(data[0].id)
        }
      }
      if (actRes.ok) {
        setActivities(await actRes.json())
      }
    } catch (err) {
      console.error('Failed to fetch participation data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const activeParticipation = participations.find((p) => p.id === activeParticipationId)

  // Filtered participations based on tab
  const filteredParticipations = participations.filter((p) => {
    if (activeTab === 'Pending Verification') return p.approval_status === 'pending'
    if (activeTab === 'Approved Claims') return p.approval_status === 'approved'
    if (activeTab === 'Flagged Entries') return p.approval_status === 'rejected'
    return true // All Submissions
  })

  const pendingCount = participations.filter((p) => p.approval_status === 'pending').length

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProofFile(e.target.files[0])
    }
  }

  // Submit new participation entry
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.activity) {
      setError('Please select an activity.')
      return
    }
    if (!authUser?.employee_id) {
      setError('User profile not found. Please log in again.')
      return
    }

    const formPayload = new FormData()
    formPayload.append('employee', authUser.employee_id)
    formPayload.append('activity', formData.activity)
    formPayload.append('approval_status', 'pending')
    if (formData.points_earned) {
      formPayload.append('points_earned', formData.points_earned)
    }
    if (formData.completion_date) {
      formPayload.append('completion_date', formData.completion_date)
    }
    if (proofFile) {
      formPayload.append('proof', proofFile)
    }

    try {
      const res = await authFetch('/social/participations/', {
        method: 'POST',
        body: formPayload,
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({ activity: '', points_earned: '', completion_date: '' })
        setProofFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        fetchData()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to add entry. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="participation-container">
        <div className="loading-state">Loading participation data...</div>
      </div>
    )
  }

  return (
    <div className="participation-container">
      {/* 1. Header Row */}
      <article className="participation-header-row">
        <div className="participation-title-block">
          <h2>Participation Ledger</h2>
          <p>Verify and audit employee volunteer activities and CSR contributions.</p>
        </div>

        <button type="button" className="participation-btn-add" onClick={() => setShowModal(true)}>
          ➕ Add Entry
        </button>
      </article>

      {/* 2. Sub-tabs Filter Row */}
      <nav className="participation-tabs-row" aria-label="Participation ledger view filter">
        <div
          className={`participation-tab-link ${activeTab === 'All Submissions' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('All Submissions')}
        >
          All Submissions
        </div>
        <div
          className={`participation-tab-link ${activeTab === 'Pending Verification' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Pending Verification')}
        >
          Pending Verification {pendingCount > 0 && <span className="participation-tab-badge">{pendingCount}</span>}
        </div>
        <div
          className={`participation-tab-link ${activeTab === 'Approved Claims' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Approved Claims')}
        >
          Approved Claims
        </div>
        <div
          className={`participation-tab-link ${activeTab === 'Flagged Entries' ? 'participation-tab-link-active' : ''}`}
          onClick={() => setActiveTab('Flagged Entries')}
        >
          Flagged Entries
        </div>
      </nav>

      {/* 3. Split Layout */}
      <section className="participation-split-layout" aria-label="Participation ledger workflow">

        {/* Left Column Panel: Submissions Feed */}
        <div className="participation-left-card">
          <div className="participation-left-header">
            <span>SUBMISSIONS FEED</span>
            <span>{pendingCount} Pending</span>
          </div>

          <div className="participation-feed-list">
            {filteredParticipations.length === 0 ? (
              <div className="empty-state-inline">No entries found. Click "Add Entry" to submit one.</div>
            ) : (
              filteredParticipations.map((p) => (
                <div
                  key={p.id}
                  className={`participation-feed-item ${activeParticipationId === p.id ? 'participation-feed-item-active' : ''}`}
                  onClick={() => setActiveParticipationId(p.id)}
                >
                  <div className="participation-feed-identity">
                    <div className="participation-feed-avatar-placeholder" aria-hidden="true">👤</div>
                    <div className="participation-feed-details">
                      <span className="participation-feed-name">{p.employee_name}</span>
                      <span className="participation-feed-desc">{p.activity_title}</span>
                      <div className="participation-feed-meta-row">
                        <span>📅 {p.completion_date || p.activity_date || '—'}</span>
                        <span>🏷️ {p.approval_status}</span>
                      </div>
                    </div>
                  </div>

                  <span className="participation-feed-pts">{p.points_earned > 0 ? `+${p.points_earned} pts` : '—'}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column Panel: Active Submission Details */}
        <div className="participation-right-card">
          {activeParticipation ? (
            <>
              <div className="participation-details-profile">
                <div className="participation-details-user">
                  <div className="participation-feed-avatar-placeholder" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>👤</div>
                  <div className="participation-details-name-block">
                    <strong>{activeParticipation.employee_name}</strong>
                    <div className="participation-details-dept-row">
                      <span className="participation-dept-badge">{activeParticipation.approval_status}</span>
                      <span style={{ color: '#64748b' }}>• ID #{activeParticipation.id}</span>
                    </div>
                  </div>
                </div>

                <div className="participation-details-claim">
                  ACTIVITY
                  <strong>{activeParticipation.activity_title}</strong>
                </div>
              </div>

              <div className="participation-details-grid">
                <div className="participation-details-block-card">
                  <h4>Activity Details</h4>
                  <strong>{activeParticipation.activity_title}</strong>
                  <p>
                    {activeParticipation.completion_date
                      ? `Completed on ${activeParticipation.completion_date}`
                      : activeParticipation.activity_date
                        ? `Scheduled on ${activeParticipation.activity_date}`
                        : 'Activity participation record.'}
                  </p>
                </div>

                <div className="participation-metrics-split">
                  <div className="participation-metric-mini">
                    <span className="participation-metric-mini-label">Points Earned</span>
                    <span className="participation-metric-mini-val participation-metric-mini-val-green">
                      {activeParticipation.points_earned > 0 ? `+${activeParticipation.points_earned}` : '—'}
                    </span>
                  </div>
                  <div className="participation-metric-mini">
                    <span className="participation-metric-mini-label">Status</span>
                    <span className="participation-metric-mini-val">
                      {activeParticipation.approval_status === 'approved' ? '✓ Approved' :
                       activeParticipation.approval_status === 'rejected' ? '✗ Rejected' :
                       activeParticipation.approval_status === 'pending' ? '⏳ Pending' :
                       activeParticipation.approval_status}
                    </span>
                  </div>
                </div>
              </div>

              {activeParticipation.proof && (
                <div className="participation-details-block-card">
                  <h4>Evidence & Documentation</h4>
                  <div className="participation-evidence-grid" style={{ marginTop: 8 }}>
                    <div className="participation-pdf-card" style={{ cursor: 'default' }}>
                      <span style={{ fontSize: '1.8rem' }}>📄</span>
                      <span>PROOF FILE</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="participation-details-actions">
                <button type="button" className="participation-btn-reject" disabled>
                  Reject Submission
                </button>
                <button type="button" className="participation-btn-flag" disabled>
                  Flag for Inquiry
                </button>
                <button type="button" className="participation-btn-approve" disabled>
                  ✓ Approve & Award Points
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state-inline" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              Select a submission from the left panel to view details.
            </div>
          )}
        </div>
      </section>

      {/* ── Add Entry Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Participation Entry</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="activity">CSR Activity</label>
                <select
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                >
                  <option value="">Select an activity</option>
                  {activities.map((a) => (
                    <option key={a.id} value={a.id}>{a.title} {a.date ? `(${a.date})` : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="points_earned">Points Earned</label>
                  <input
                    id="points_earned"
                    name="points_earned"
                    type="number"
                    min="0"
                    placeholder="e.g. 150"
                    value={formData.points_earned}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="completion_date">Completion Date</label>
                  <input
                    id="completion_date"
                    name="completion_date"
                    type="date"
                    value={formData.completion_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="proof">Proof / Evidence (optional)</label>
                <input
                  id="proof"
                  name="proof"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


import { useState, useEffect } from 'react'
import { authFetch } from '../../services/api'
import './EmissionFactors.css'

export default function EmissionFactors() {
  const [factors, setFactors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [standard, setStandard] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    activity_type: '',
    co2e_factor: '',
    unit: '',
    effective_date: '',
  })

  // Fetch emission factors from backend
  const fetchFactors = async () => {
    try {
      const res = await authFetch('/environmental/emission-factors/')
      if (res.ok) {
        const data = await res.json()
        setFactors(data)
      }
    } catch (err) {
      console.error('Failed to fetch emission factors:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFactors()
  }, [])

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // Submit new factor
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.name || !formData.activity_type || !formData.co2e_factor || !formData.unit || !formData.effective_date) {
      setError('Please fill in all fields.')
      return
    }

    try {
      const res = await authFetch('/environmental/emission-factors/', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          activity_type: formData.activity_type,
          co2e_factor: parseFloat(formData.co2e_factor),
          unit: formData.unit,
          effective_date: formData.effective_date,
        }),
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({ name: '', activity_type: '', co2e_factor: '', unit: '', effective_date: '' })
        // Refresh the list
        fetchFactors()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to create factor. Please try again.')
    }
  }

  // Filter factors based on search and standard filter
  const filteredFactors = factors.filter((f) => {
    const matchesSearch = searchQuery === '' ||
      f.name?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getScopeBadge = (scope) => {
    switch (scope) {
      case 'Scope 1':
        return <span className="badge-scope badge-scope1">Scope 1</span>
      case 'Scope 2':
        return <span className="badge-scope badge-scope2">Scope 2</span>
      case 'Scope 3':
        return <span className="badge-scope badge-scope3">Scope 3</span>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="registry-container">
        <div className="loading-state">Loading emission factors...</div>
      </div>
    )
  }

  return (
    <div className="registry-container">
      {/* ── Summary Header Card ── */}
      <article className="registry-header-row">
        <div className="registry-title-block">
          <h2>Emission Factors Registry</h2>
          <p>
            Manage and deploy standardized coefficients for carbon accounting across Scope 1, 2, and 3 activities.
          </p>
        </div>

        <div className="registry-actions-bar">
          <input
            type="search"
            className="registry-search-input"
            placeholder="Search Registry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="registry-dropdown"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
          >
            <option value="All">Standard: All Sources</option>
            <option value="eGRID">eGRID</option>
            <option value="DEFRA">DEFRA</option>
            <option value="IPCC">IPCC</option>
          </select>

          <button type="button" className="registry-btn-add" onClick={() => setShowModal(true)}>
            ➕ Add New Factor
          </button>
        </div>
      </article>

      {/* ── Registry Table Card ── */}
      <article className="registry-table-card">
        <div className="registry-table-wrapper">
          <table className="registry-table">
            <thead>
              <tr>
                <th>Factor Name / Source</th>
                <th>Activity Type</th>
                <th>Value</th>
                <th>Unit Basis</th>
                <th>Effective Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFactors.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                    No emission factors found. Click "Add New Factor" to create one.
                  </td>
                </tr>
              ) : (
                filteredFactors.map((factor) => (
                  <tr key={factor.id}>
                    <td>
                      <span className="td-factor-name">{factor.name}</span>
                      <span className="td-factor-sub">{factor.activity_type}</span>
                    </td>
                    <td>{getScopeBadge(factor.scope)}</td>
                    <td className="td-value-num">{factor.co2e_factor}</td>
                    <td className="td-unit-basis"><code>{factor.unit}</code></td>
                    <td>{factor.effective_date}</td>
                    <td>
                      <div className="registry-actions-btns">
                        <button type="button" className="registry-action-icon" aria-label="Edit">✏️</button>
                        <button type="button" className="registry-action-icon" aria-label="History">📁</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="ledger-footer">
          <span>Showing {filteredFactors.length} of {factors.length} Factors</span>
          <div className="ledger-pagination">
            <button type="button" className="pagination-btn">&lt;</button>
            <button type="button" className="pagination-btn pagination-btn-active">1</button>
            <button type="button" className="pagination-btn">&gt;</button>
          </div>
        </div>
      </article>

      {/* ── Summary Stats Cards ── */}
      <section className="registry-bottom-row" aria-label="Registry summary metrics">
        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-active" aria-hidden="true">
            ✓
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Total Factors</span>
            <strong className="registry-stat-val">{factors.length}</strong>
            <span className="registry-stat-desc">Emission factors in the registry.</span>
          </div>
        </article>

        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-coverage" aria-hidden="true">
            📈
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Activity Types</span>
            <strong className="registry-stat-val">{new Set(factors.map(f => f.activity_type)).size}</strong>
            <span className="registry-stat-desc">Unique activity categories mapped.</span>
          </div>
        </article>

        <article className="registry-stat-card">
          <div className="registry-stat-icon-wrapper icon-bg-pending" aria-hidden="true">
            ⚙️
          </div>
          <div className="registry-stat-details">
            <span className="registry-stat-label">Status</span>
            <strong className="registry-stat-val" style={{ fontSize: '1.1rem' }}>Active</strong>
            <span className="registry-stat-desc">Registry is operational.</span>
          </div>
        </article>
      </section>

      {/* ── Add New Factor Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Emission Factor</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Factor Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Grid Electricity (US Northwest)"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="activity_type">Activity Type</label>
                <input
                  id="activity_type"
                  name="activity_type"
                  type="text"
                  placeholder="e.g. Electricity, Fuel, Transport"
                  value={formData.activity_type}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="co2e_factor">CO₂e Factor</label>
                  <input
                    id="co2e_factor"
                    name="co2e_factor"
                    type="number"
                    step="any"
                    placeholder="e.g. 0.32418"
                    value={formData.co2e_factor}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unit">Unit</label>
                  <input
                    id="unit"
                    name="unit"
                    type="text"
                    placeholder="e.g. kg CO₂e / kWh"
                    value={formData.unit}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="effective_date">Effective Date</label>
                <input
                  id="effective_date"
                  name="effective_date"
                  type="date"
                  value={formData.effective_date}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Factor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}



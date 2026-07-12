import { useState, useEffect } from 'react'
import { authFetch } from '../../services/api'
import './Rewards.css'

export default function Rewards() {
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points_required: '',
    stock: '',
  })

  // Fetch rewards from backend
  const fetchRewards = async () => {
    try {
      const res = await authFetch('/gamification/rewards/')
      if (res.ok) {
        setRewards(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch rewards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRewards()
  }, [])

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // Submit new reward
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.points_required || !formData.stock) {
      setError('Name, points required, and stock are required.')
      return
    }

    try {
      const res = await authFetch('/gamification/rewards/', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || '',
          points_required: parseInt(formData.points_required, 10),
          stock: parseInt(formData.stock, 10),
          status: 'active',
        }),
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({ name: '', description: '', points_required: '', stock: '' })
        fetchRewards()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to add reward. Please try again.')
    }
  }

  // Filter rewards
  const filteredRewards = rewards.filter((r) => {
    const searchMatch = searchQuery === '' ||
      r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase())

    let priceMatch = true
    if (priceFilter === '<500') priceMatch = r.points_required < 500
    else if (priceFilter === '500-2000') priceMatch = r.points_required >= 500 && r.points_required <= 2000
    else if (priceFilter === '2000+') priceMatch = r.points_required > 2000

    return searchMatch && priceMatch
  })

  // Compute metrics
  const lowStockCount = rewards.filter((r) => r.stock <= 5).length
  const totalRewardItems = rewards.length

  if (loading) {
    return (
      <div className="rewards-container">
        <div className="loading-state">Loading rewards catalog...</div>
      </div>
    )
  }

  return (
    <div className="rewards-container">
      {/* 1. Operational Inventory Summary */}
      <section className="rewards-metrics-row" aria-label="Reward inventory summary stats">
        <article className="rewards-metric-card">
          <div className="rewards-metric-icon" aria-hidden="true">🪙</div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label">Total Reward Items</span>
            <strong className="rewards-metric-val">{totalRewardItems}</strong>
            <span className="rewards-metric-sub">In active catalog</span>
          </div>
        </article>

        <article className="rewards-metric-card">
          <div className="rewards-metric-icon" aria-hidden="true">🎁</div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label">Available Rewards</span>
            <strong className="rewards-metric-val">
              {rewards.filter((r) => r.stock > 0 && r.status === 'active').length}
            </strong>
            <span className="rewards-metric-sub" style={{ color: '#059669' }}>Ready for redemption</span>
          </div>
        </article>

        <article className={`rewards-metric-card ${lowStockCount > 0 ? 'rewards-metric-card-warn' : ''}`}>
          <div className={`rewards-metric-icon ${lowStockCount > 0 ? 'rewards-metric-icon-warn' : ''}`} aria-hidden="true">
            {lowStockCount > 0 ? '⚠️' : '✅'}
          </div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label" style={{ color: lowStockCount > 0 ? '#b45309' : undefined }}>
              {lowStockCount > 0 ? 'Low Stock Warning' : 'Stock OK'}
            </span>
            <strong className="rewards-metric-val" style={{ color: lowStockCount > 0 ? '#b45309' : undefined }}>
              {lowStockCount > 0 ? `${lowStockCount} Item${lowStockCount > 1 ? 's' : ''} Left` : 'All Stocked'}
            </strong>
            <span className={`rewards-metric-sub ${lowStockCount > 0 ? 'rewards-metric-sub-warn' : ''}`}>
              {lowStockCount > 0 ? 'Replenishment needed' : 'All items well stocked'}
            </span>
          </div>
        </article>
      </section>

      {/* 2. Catalog Navigation Filtering Toolbar */}
      <article className="rewards-toolbar">
        <div className="rewards-search-group">
          <input
            type="search"
            className="rewards-search-input"
            placeholder="Search Catalog Rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="price-toggle-strip" aria-label="Points price filter toggle">
            <button
              type="button"
              className={`price-toggle-btn ${priceFilter === 'All' ? 'price-toggle-btn-active' : ''}`}
              onClick={() => setPriceFilter('All')}
            >
              All Prices
            </button>
            <button
              type="button"
              className={`price-toggle-btn ${priceFilter === '<500' ? 'price-toggle-btn-active' : ''}`}
              onClick={() => setPriceFilter('<500')}
            >
              &lt; 500
            </button>
            <button
              type="button"
              className={`price-toggle-btn ${priceFilter === '500-2000' ? 'price-toggle-btn-active' : ''}`}
              onClick={() => setPriceFilter('500-2000')}
            >
              500-2000
            </button>
            <button
              type="button"
              className={`price-toggle-btn ${priceFilter === '2000+' ? 'price-toggle-btn-active' : ''}`}
              onClick={() => setPriceFilter('2000+')}
            >
              2000+
            </button>
          </div>
        </div>

        <button type="button" className="rewards-btn-add" onClick={() => setShowModal(true)}>
          ➕ Add New Reward Item
        </button>
      </article>

      {/* 3. Corporate Reward Card Grid */}
      <section className="rewards-grid" aria-label="Corporate Sustainable Marketplace">
        {filteredRewards.length === 0 ? (
          <div className="empty-state">
            <p>No rewards found. Click "Add New Reward Item" to create one.</p>
          </div>
        ) : (
          filteredRewards.map((reward) => {
            const isLowStock = reward.stock <= 5
            return (
              <article key={reward.id} className="reward-card">
                <div className="reward-image-container">
                  <div className="reward-image-placeholder">
                    {reward.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="reward-points-badge">
                    {reward.points_required.toLocaleString()} pts
                  </span>
                </div>

                <div className="reward-details">
                  <h3>{reward.name}</h3>
                  <p className="reward-description-text">{reward.description || 'No description provided.'}</p>

                  <div className="reward-stock-box">
                    <div className="reward-stock-labels">
                      <span style={{ color: isLowStock ? '#d97706' : '#64748b' }}>
                        {isLowStock ? '⚠️ Low Stock' : 'In Stock'}
                      </span>
                      <span>{reward.stock} left</span>
                    </div>
                    <div className="stock-track">
                      <div
                        className={`stock-fill ${isLowStock ? 'stock-fill-low' : ''}`}
                        style={{ width: `${Math.min((reward.stock / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <button type="button" className="reward-btn-redeem" disabled>
                    Simulate Redemption Process
                  </button>
                </div>
              </article>
            )
          })
        )}
      </section>

      {/* ── Add New Reward Item Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Reward Item</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Reward Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. EcoSphere Premium Flask"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Describe the reward..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="points_required">Points Required</label>
                  <input
                    id="points_required"
                    name="points_required"
                    type="number"
                    min="0"
                    placeholder="e.g. 1200"
                    value={formData.points_required}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock Quantity</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="e.g. 50"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


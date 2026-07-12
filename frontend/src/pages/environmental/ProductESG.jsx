import { useState, useEffect } from 'react'
import { authFetch } from '../../services/api'
import './ProductESG.css'

export default function ProductESG() {
  const [products, setProducts] = useState([])
  const [factors, setFactors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    product_name: '',
    emission_factors: [],
    sustainability_attributes: '{}',
  })

  // Fetch products and emission factors from backend
  const fetchData = async () => {
    try {
      const [prodRes, factRes] = await Promise.all([
        authFetch('/environmental/product-profiles/'),
        authFetch('/environmental/emission-factors/'),
      ])
      if (prodRes.ok) {
        const data = await prodRes.json()
        setProducts(data)
      }
      if (factRes.ok) {
        const data = await factRes.json()
        setFactors(data)
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
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

  // Handle multi-select for emission factors
  const handleFactorToggle = (factorId) => {
    setFormData((prev) => {
      const selected = prev.emission_factors.includes(factorId)
        ? prev.emission_factors.filter((id) => id !== factorId)
        : [...prev.emission_factors, factorId]
      return { ...prev, emission_factors: selected }
    })
  }

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.product_name) {
      setError('Product name is required.')
      return
    }

    let attributes = {}
    try {
      attributes = formData.sustainability_attributes.trim()
        ? JSON.parse(formData.sustainability_attributes)
        : {}
    } catch {
      setError('Sustainability attributes must be valid JSON (e.g. {"material":"recycled"}).')
      return
    }

    try {
      const res = await authFetch('/environmental/product-profiles/', {
        method: 'POST',
        body: JSON.stringify({
          product_name: formData.product_name,
          emission_factors: formData.emission_factors,
          sustainability_attributes: attributes,
        }),
      })

      if (res.ok) {
        setShowModal(false)
        setFormData({
          product_name: '',
          emission_factors: [],
          sustainability_attributes: '{}',
        })
        fetchData()
      } else {
        const errData = await res.json()
        setError(Object.values(errData).flat().join(', '))
      }
    } catch (err) {
      setError('Failed to create product. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="product-esg-container">
        <div className="loading-state">Loading product profiles...</div>
      </div>
    )
  }

  return (
    <div className="product-esg-container">
      {/* 1. Header Row */}
      <article className="product-header-row">
        <div className="product-title-block">
          <h2>Product ESG Ecosystem</h2>
          <p>
            Mapping and monitoring lifecycle sustainability metrics across the global catalog.
          </p>
        </div>

        <div className="product-actions-bar">
          <button type="button" className="product-btn-outline">
            All Categories
          </button>
          <button type="button" className="env-btn-primary" onClick={() => setShowModal(true)}>
            🍃 Map New Product
          </button>
        </div>
      </article>

      {/* 2. Four Metric Cards Row */}
      <section className="product-metrics-row" aria-label="Product metrics summary">
        <article className="product-metric-card">
          <span className="product-metric-label">Products Tracked</span>
          <strong className="product-metric-val">{products.length}</strong>
          <span className="product-metric-delta product-delta-green">Lifecycle monitored</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Emission Factors</span>
          <strong className="product-metric-val">{factors.length}</strong>
          <span className="product-metric-delta product-delta-green">Available for mapping</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Risk Exposure</span>
          <strong className="product-metric-val" style={{ color: '#059669' }}>Low</strong>
          <span className="product-metric-delta product-delta-grey">Complies with EUDR</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Active Profiles</span>
          <strong className="product-metric-val">
            {products.filter((p) => p.sustainability_attributes?.status !== 'inactive').length}
          </strong>
          <span className="product-metric-delta product-delta-green">✓ Fully mapped</span>
        </article>
      </section>

      {/* 3. Product Catalog Grid */}
      <section className="product-catalog-grid" aria-label="Product ESG catalog list">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products mapped yet. Click "Map New Product" to add one.</p>
          </div>
        ) : (
          products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-container">
                <div className="product-image-placeholder">
                  {product.product_name.charAt(0).toUpperCase()}
                </div>
                <span className="product-status-overlay">✓ Active</span>
              </div>

              <div className="product-details">
                <div className="product-name-row">
                  <h3>{product.product_name}</h3>
                </div>
                <p className="product-desc">
                  {product.emission_factors_details?.length || 0} emission factor(s) mapped
                </p>

                <div className="product-footprint-row">
                  <span className="product-footprint-label">Emission Factors</span>
                  <span className="product-footprint-val">
                    {product.emission_factors_details?.map((f) => f.name).join(', ') || 'None'}
                  </span>
                </div>

                <div className="product-card-actions">
                  <button type="button" className="product-btn-action-outline">
                    Edit Footprint Blueprint
                  </button>
                  <button type="button" className="product-btn-action-solid">
                    Recalculate Lifecycle Metric
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* ── Map New Product Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Map New Product</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="product_name">Product Name</label>
                <input
                  id="product_name"
                  name="product_name"
                  type="text"
                  placeholder="e.g. Eco-Pod Case v2"
                  value={formData.product_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Emission Factors</label>
                <div className="checkbox-grid">
                  {factors.length === 0 ? (
                    <p className="empty-hint">No emission factors available. Create one first.</p>
                  ) : (
                    factors.map((f) => (
                      <label key={f.id} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.emission_factors.includes(f.id)}
                          onChange={() => handleFactorToggle(f.id)}
                        />
                        <span>{f.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sustainability_attributes">Sustainability Attributes (JSON)</label>
                <textarea
                  id="sustainability_attributes"
                  name="sustainability_attributes"
                  rows={3}
                  placeholder='{"material": "recycled plastic", "certification": "Cradle-to-Cradle"}'
                  value={formData.sustainability_attributes}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


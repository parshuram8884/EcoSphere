import './ProductESG.css'

export default function ProductESG() {
  const products = [
    {
      name: 'Eco-Pod Case v2',
      category: 'Electronics',
      desc: 'Lifecycle analysis verified Sept 2026',
      footprint: '1.24 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&fit=crop&q=80'
    },
    {
      name: 'Solar-Sync Tablet',
      category: 'Electronics',
      desc: 'Continuous monitoring active',
      footprint: '4.57 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&fit=crop&q=80'
    },
    {
      name: 'Bio-Fiber Hoodie',
      category: 'Apparel',
      desc: 'Global supply chain mapping',
      footprint: '3.12 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&fit=crop&q=80'
    },
    {
      name: 'Smart-Fill Box v4',
      category: 'Packaging',
      desc: 'Zero emission packaging materials',
      footprint: '0.12 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&fit=crop&q=80'
    },
    {
      name: 'Titan Pro Sensor',
      category: 'Electronics',
      desc: 'High precision monitoring unit',
      footprint: '18.42 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&fit=crop&q=80'
    },
    {
      name: 'Vertex Link Band',
      category: 'Electronics',
      desc: 'Recycled ocean plastic strap',
      footprint: '0.48 kg CO₂e / unit',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&fit=crop&q=80'
    }
  ]

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
          <button type="button" className="env-btn-primary">
            🍃 Map New Product
          </button>
        </div>
      </article>

      {/* 2. Four Metric Cards Row */}
      <section className="product-metrics-row" aria-label="Product metrics summary">
        <article className="product-metric-card">
          <span className="product-metric-label">Avg. Footprint</span>
          <strong className="product-metric-val">0.82 kg CO₂e</strong>
          <span className="product-metric-delta product-delta-green">↓ 2.4% MoM</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Monitored SKUs</span>
          <strong className="product-metric-val">1,248</strong>
          <span className="product-metric-delta product-delta-green">✓ 342 added this year</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Risk Exposure</span>
          <strong className="product-metric-val" style={{ color: '#ef4444' }}>Low</strong>
          <span className="product-metric-delta product-delta-grey">Complies with EUDR</span>
        </article>

        <article className="product-metric-card">
          <span className="product-metric-label">Carbon Credits</span>
          <strong className="product-metric-val">24.5k</strong>
          <span className="product-metric-delta product-delta-green">+1.8k Gold Offset</span>
        </article>
      </section>

      {/* 3. Product Catalog Grid */}
      <section className="product-catalog-grid" aria-label="Product ESG catalog list">
        {products.map((product) => (
          <article key={product.name} className="product-card">
            <div className="product-image-container">
              <img className="product-image" src={product.image} alt={product.name} />
              <span className="product-status-overlay">✓ {product.status}</span>
            </div>

            <div className="product-details">
              <div className="product-name-row">
                <h3>{product.name}</h3>
                <span className="product-tag-badge">{product.category}</span>
              </div>
              <p className="product-desc">{product.desc}</p>
              
              <div className="product-footprint-row">
                <span className="product-footprint-label">Carbon Footprint</span>
                <span className="product-footprint-val">{product.footprint}</span>
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
        ))}
      </section>
    </div>
  )
}

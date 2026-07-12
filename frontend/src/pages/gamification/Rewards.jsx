import { useState } from 'react'
import './Rewards.css'

export default function Rewards() {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('All')

  const initialRewards = [
    { id: 1, title: 'EcoSphere Premium Insulated Flask', cost: 1200, stock: 14, totalStock: 50, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&fit=crop&q=80' },
    { id: 2, title: '1-Day Paid Volunteering Leave', cost: 3000, stock: 48, totalStock: 50, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&fit=crop&q=80' },
    { id: 3, title: 'Smart Energy Monitor Plug', cost: 800, stock: 3, totalStock: 30, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&fit=crop&q=80' },
    { id: 4, title: 'Trees Planted in Your Name (x5)', cost: 400, stock: 200, totalStock: 200, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&fit=crop&q=80' }
  ]

  const [rewards, setRewards] = useState(initialRewards)

  const handleRedeem = (title, cost) => {
    alert(`Simulating Redemption: Confirmed claim for "${title}"! Dedicated ${cost} points from your balance.`)
  }

  const filteredRewards = rewards.filter(r => {
    const searchMatch = r.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    let priceMatch = true
    if (priceFilter === '<500') priceMatch = r.cost < 500
    else if (priceFilter === '500-2000') priceMatch = r.cost >= 500 && r.cost <= 2000
    else if (priceFilter === '2000+') priceMatch = r.cost > 2000

    return searchMatch && priceMatch
  })

  return (
    <div className="rewards-container">
      {/* 1. Operational Inventory Summary */}
      <section className="rewards-metrics-row" aria-label="Reward inventory summary stats">
        {/* Card 1 */}
        <article className="rewards-metric-card">
          <div className="rewards-metric-icon" aria-hidden="true">🪙</div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label">Global Unredeemed Points</span>
            <strong className="rewards-metric-val">450,200 pts</strong>
            <span className="rewards-metric-sub">Available corporate pool</span>
          </div>
        </article>

        {/* Card 2 */}
        <article className="rewards-metric-card">
          <div className="rewards-metric-icon" aria-hidden="true">🎁</div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label">Total Claimed (MTD)</span>
            <strong className="rewards-metric-val">184 Claims</strong>
            <span className="rewards-metric-sub" style={{ color: '#059669' }}>↗ +14% vs last month</span>
          </div>
        </article>

        {/* Card 3: Warning indicator */}
        <article className="rewards-metric-card rewards-metric-card-warn">
          <div className="rewards-metric-icon rewards-metric-icon-warn" aria-hidden="true">⚠️</div>
          <div className="rewards-metric-details">
            <span className="rewards-metric-label" style={{ color: '#b45309' }}>Low Stock Warning</span>
            <strong className="rewards-metric-val" style={{ color: '#b45309' }}>2 Items Left</strong>
            <span className="rewards-metric-sub rewards-metric-sub-warn">Replenishment needed</span>
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

        <button type="button" className="rewards-btn-add">
          ➕ Add New Reward Item
        </button>
      </article>

      {/* 3. Corporate Reward Card Grid */}
      <section className="rewards-grid" aria-label="Corporate Sustainable Marketplace">
        {filteredRewards.map((reward) => {
          const isLowStock = reward.stock <= 5
          const stockPct = (reward.stock / reward.totalStock) * 100
          return (
            <article key={reward.id} className="reward-card">
              <div className="reward-image-container">
                <img className="reward-image" src={reward.image} alt={reward.title} />
                <span className="reward-points-badge">
                  {reward.cost.toLocaleString()} pts
                </span>
              </div>

              <div className="reward-details">
                <h3>{reward.title}</h3>
                
                <div className="reward-stock-box">
                  <div className="reward-stock-labels">
                    <span style={{ color: isLowStock ? '#d97706' : '#64748b' }}>
                      {isLowStock ? '⚠️ Low Stock' : 'In Stock'}
                    </span>
                    <span>{reward.stock} / {reward.totalStock} left</span>
                  </div>
                  <div className="stock-track">
                    <div 
                      className={`stock-fill ${isLowStock ? 'stock-fill-low' : ''}`} 
                      style={{ width: `${stockPct}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="reward-btn-redeem"
                  onClick={() => handleRedeem(reward.title, reward.cost)}
                >
                  Simulate Redemption Process
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

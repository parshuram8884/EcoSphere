import { useState } from 'react'
import './Notifications.css'

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState('All Notifications')

  // Notification category data list
  const categories = [
    { name: 'All Notifications', count: 12 },
    { name: 'Unread', count: 4 },
    { name: 'High Priority Alerts', count: 2 },
    { name: 'Compliance Breach Logs', count: 1 },
    { name: 'CSR Events Tracker', count: 5 }
  ]

  return (
    <>
      {/* Section Title and controls toolbar */}
      <div className="notif-section-header">
        <div className="notif-title-block">
          <h2>Notification Center</h2>
          <span className="notif-count-badge">3 new</span>
        </div>

        <div className="notif-actions-group">
          <button type="button" className="notif-btn-action">
            <span>✓</span> Mark All as Read
          </button>
          <button type="button" className="notif-btn-action">
            <span>🗑</span> Clear Non-Critical Archive
          </button>
        </div>
      </div>

      {/* Grid Split Content */}
      <div className="notif-grid">
        {/* Left: Category panel filter list */}
        <nav className="notif-categories-card" aria-label="Notification Categories">
          <div className="notif-categories-title">Categories</div>
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className={`notif-category-item ${activeCategory === cat.name ? 'notif-category-item-active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              <span className="notif-category-label">
                <span>📁</span> {cat.name}
              </span>
              <span className="notif-category-badge">{cat.count}</span>
            </div>
          ))}
        </nav>

        {/* Right: Notifications Feed List */}
        <div className="notif-feed">
          {/* Card 1: Compliance Warning */}
          <article className="notif-card notif-card-urgent">
            <div className="notif-icon-circle notif-icon-red" aria-hidden="true">
              ⚠
            </div>
            <div className="notif-card-content">
              <div className="notif-card-header">
                <div className="notif-card-title-group">
                  <h3 className="notif-card-title">Compliance Warning: Audit Deadline</h3>
                  <span className="notif-tag notif-tag-urgent">Urgent</span>
                </div>
                <span className="notif-card-time">10m ago</span>
              </div>
              <p className="notif-card-desc">
                Pending environmental audit form <strong>(Q3 Emissions)</strong> missing executive signature. Deadline in <strong>48 hours</strong>. Failure to comply may result in regulatory penalties.
              </p>
              <div className="notif-card-actions">
                <button type="button" className="notif-btn-red">Sign Now</button>
                <button type="button" className="notif-btn-secondary">Review Document</button>
              </div>
            </div>
          </article>

          {/* Card 2: Level 3 Unlocked */}
          <article className="notif-card">
            <div className="notif-icon-circle notif-icon-green" aria-hidden="true">
              ✓
            </div>
            <div className="notif-card-content">
              <div className="notif-card-header">
                <div className="notif-card-title-group">
                  <h3 className="notif-card-title">EcoSphere Level 3 Unlocked!</h3>
                  <span className="notif-tag notif-tag-achievement">Achievement</span>
                </div>
                <span className="notif-card-time">2h ago</span>
              </div>
              <p className="notif-card-desc">
                Congratulations! Your department has completed 5 consecutive weekly environmental checklists.
              </p>
            </div>
          </article>

          {/* Card 3: Approval Required: Budget Allocation */}
          <article className="notif-card">
            <div className="notif-icon-circle notif-icon-green" aria-hidden="true">
              💵
            </div>
            <div className="notif-card-content">
              <div className="notif-card-header">
                <div className="notif-card-title-group">
                  <h3 className="notif-card-title">Approval Required: Budget Allocation</h3>
                  <span className="notif-tag notif-tag-finance">Finance</span>
                </div>
                <span className="notif-card-time">5h ago</span>
              </div>
              <p className="notif-card-desc">
                HR department requested a $15,000 matching allocation budget for the upcoming Global Tree Planting Day event (ID: CSR-2024-004).
              </p>
              <div className="notif-card-actions">
                <button type="button" className="notif-btn-green">✓ Approve</button>
                <button type="button" className="notif-btn-lightred">✕ Deny</button>
              </div>
            </div>
          </article>

          {/* Card 4: Sensor Log Sync Successful */}
          <article className="notif-card">
            <div className="notif-icon-circle notif-icon-grey" aria-hidden="true">
              📡
            </div>
            <div className="notif-card-content">
              <div className="notif-card-header">
                <div className="notif-card-title-group">
                  <h3 className="notif-card-title">Sensor Log Sync Successful</h3>
                  <span className="notif-tag notif-tag-logs">Logs</span>
                </div>
                <span className="notif-card-time">Yesterday</span>
              </div>
              <p className="notif-card-desc">
                IoT Gateway at Facility B (Northern Region) has successfully synced 1,402 new atmospheric data points to the main analytics engine.
              </p>
            </div>
          </article>

          {/* Card 5: Departmental Sync Complete */}
          <article className="notif-card">
            <div className="notif-icon-circle notif-icon-grey" aria-hidden="true">
              ⚙️
            </div>
            <div className="notif-card-content">
              <div className="notif-card-header">
                <div className="notif-card-title-group">
                  <h3 className="notif-card-title">Departmental Sync Complete</h3>
                  <span className="notif-tag notif-tag-system">System</span>
                </div>
                <span className="notif-card-time">2 days ago</span>
              </div>
              <p className="notif-card-desc">
                Logistics and Supply Chain departments have completed their monthly ESG metrics alignment. No discrepancies found.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

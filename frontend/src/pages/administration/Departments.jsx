import { useState } from 'react'
import './Departments.css'

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isTreeExpanded, setIsTreeExpanded] = useState(true)

  const initialDivisions = [
    { id: 1, name: 'Supply Chain Logistics', head: 'Sarah Jenkins', headcount: 42, env: 72, soc: 85, gov: 60 },
    { id: 2, name: 'North America Hub', head: 'Marcus Thorne', headcount: 120, env: 82, soc: 78, gov: 88 },
    { id: 3, name: 'Shenzhen Facility', head: 'Kevin Zhang', headcount: 240, env: 65, soc: 72, gov: 58 }
  ]

  const [divisions, setDivisions] = useState(initialDivisions)

  const handleAddUnit = () => {
    const name = prompt('Enter division name:')
    if (!name) return
    const head = prompt('Enter department head name:')
    if (!head) return

    const newDiv = {
      id: Date.now(),
      name,
      head,
      headcount: 1,
      env: 60,
      soc: 60,
      gov: 60
    }

    setDivisions([newDiv, ...divisions])
  }

  const handleArchive = (id) => {
    if (confirm('Are you sure you want to archive this node?')) {
      setDivisions(divisions.filter(d => d.id !== id))
    }
  }

  const filteredDivisions = divisions.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.head.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="depts-container">
      {/* 1. Header & Action Strip */}
      <article className="depts-action-strip">
        <div className="depts-search-group">
          <input 
            type="search" 
            className="depts-search-input" 
            placeholder="Search Departments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <span className="depts-metric-badge">
            Total Corporate Divisions: {divisions.length} Units
          </span>
        </div>

        <button 
          type="button" 
          className="depts-btn-add"
          onClick={handleAddUnit}
        >
          ➕ Add Department Unit
        </button>
      </article>

      {/* 2. Split Panel Layout */}
      <section className="depts-workspace-grid" aria-label="Department matrix split panel">
        
        {/* Left Column: Interactive Hierarchy Tree */}
        <article className="depts-tree-card">
          <h3>Interactive Corporate Hierarchy</h3>
          
          <div className="depts-tree-node">
            <div className="depts-tree-node-item" onClick={() => setIsTreeExpanded(!isTreeExpanded)}>
              <span className="tree-node-toggle">{isTreeExpanded ? '▼' : '▶'}</span>
              <span>🏢 Global Headquarters</span>
            </div>

            {isTreeExpanded && (
              <div className="depts-tree-node">
                <div className="depts-tree-node-item">
                  <span className="tree-node-toggle">▼</span>
                  <span>🌎 North America Hub</span>
                </div>

                <div className="depts-tree-node" style={{ marginLeft: 32 }}>
                  <div className="depts-tree-node-item">
                    <span>• 📦 Supply Chain Logistics</span>
                  </div>
                  <div className="depts-tree-node-item">
                    <span>• 🏭 Shenzhen Facility</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Right Column: Division Profile Grid */}
        <div className="depts-profile-grid" aria-label="Department Division profile grid">
          {filteredDivisions.map((dept) => (
            <article key={dept.id} className="dept-profile-card">
              <div className="dept-profile-header">
                <div className="dept-profile-name-block">
                  <h4>{dept.name}</h4>
                  <span className="dept-profile-head-label">Head: {dept.head}</span>
                </div>
                <span className="dept-headcount-badge">
                  👥 {dept.headcount} Staff
                </span>
              </div>

              {/* Pillar mini-graphs */}
              <div className="dept-pillar-graph" aria-label="Division ESG scores details">
                {/* Environmental */}
                <div className="dept-pillar-row">
                  <span className="dept-pillar-lbl">ENV</span>
                  <div className="dept-pillar-bar-track">
                    <div className="dept-pillar-bar-fill fill-pillar-env" style={{ width: `${dept.env}%` }}></div>
                  </div>
                  <span className="dept-pillar-score-val">{dept.env}%</span>
                </div>

                {/* Social */}
                <div className="dept-pillar-row">
                  <span className="dept-pillar-lbl">SOC</span>
                  <div className="dept-pillar-bar-track">
                    <div className="dept-pillar-bar-fill fill-pillar-soc" style={{ width: `${dept.soc}%` }}></div>
                  </div>
                  <span className="dept-pillar-score-val">{dept.soc}%</span>
                </div>

                {/* Governance */}
                <div className="dept-pillar-row">
                  <span className="dept-pillar-lbl">GOV</span>
                  <div className="dept-pillar-bar-track">
                    <div className="dept-pillar-bar-fill fill-pillar-gov" style={{ width: `${dept.gov}%` }}></div>
                  </div>
                  <span className="dept-pillar-score-val">{dept.gov}%</span>
                </div>
              </div>

              <div className="dept-profile-actions">
                <button type="button" className="dept-btn-action">Edit Division Metadata</button>
                <button 
                  type="button" 
                  className="dept-btn-action" 
                  style={{ color: '#ef4444' }}
                  onClick={() => handleArchive(dept.id)}
                >
                  Archive Node
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

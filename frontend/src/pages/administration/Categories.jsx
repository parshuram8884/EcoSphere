import { useState } from 'react'
import './Categories.css'

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activePartition, setActivePartition] = useState('CSR')

  const initialCategories = [
    // CSR
    { id: 'CSR-01', name: 'Reforestation Initiatives', pillar: 'Environmental', usage: 14, status: 'Active', updated: 'Oct 01, 2024', type: 'CSR' },
    { id: 'CSR-02', name: 'Community Volunteering', pillar: 'Social', usage: 28, status: 'Active', updated: 'Sep 20, 2024', type: 'CSR' },
    { id: 'CSR-03', name: 'Compliance & Governance Seminars', pillar: 'Governance', usage: 8, status: 'Deprecated', updated: 'Aug 15, 2024', type: 'CSR' },
    // Gamification
    { id: 'GAM-01', name: 'Zero-Waste Challenge', pillar: 'Environmental', usage: 12, status: 'Active', updated: 'Oct 10, 2024', type: 'Gamification' },
    { id: 'GAM-02', name: 'Transit Shift Commute', pillar: 'Social', usage: 18, status: 'Active', updated: 'Oct 08, 2024', type: 'Gamification' },
    { id: 'GAM-03', name: 'Energy Savings Sprint', pillar: 'Environmental', usage: 24, status: 'Active', updated: 'Oct 12, 2024', type: 'Gamification' }
  ]

  const [categories, setCategories] = useState(initialCategories)

  const handleMintCategory = () => {
    const name = prompt('Enter taxonomy category name:')
    if (!name) return
    const pillarInput = prompt('Enter ESG Pillar (Environmental, Social, Governance):')
    if (!pillarInput) return

    const newKey = `${activePartition === 'CSR' ? 'CSR' : 'GAM'}-${Math.floor(Math.random() * 900) + 100}`
    const newCat = {
      id: newKey,
      name,
      pillar: pillarInput,
      usage: 0,
      status: 'Active',
      updated: 'Just now',
      type: activePartition
    }

    setCategories([newCat, ...categories])
  }

  const handleToggleStatus = (id) => {
    setCategories(categories.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Deprecated' : 'Active' }
      }
      return c
    }))
  }

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete category ${id}?`)) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  const filteredCategories = categories.filter(c => {
    const typeMatch = c.type === activePartition
    const searchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())
    return typeMatch && searchMatch
  })

  const getPillarBadge = (pillar) => {
    const pLower = pillar.toLowerCase()
    if (pLower.includes('env')) return <span className="badge-pillar pillar-env">Environmental</span>
    if (pLower.includes('soc')) return <span className="badge-pillar pillar-soc">Social</span>
    return <span className="badge-pillar pillar-gov">Governance</span>
  }

  const getStatusBadge = (status) => {
    if (status === 'Active') return <span className="badge-system-status sys-active">Active</span>
    return <span className="badge-system-status sys-deprecated">Deprecated</span>
  }

  return (
    <div className="cats-container">
      {/* 1. Classification Split System Header */}
      <article className="cats-header-bar">
        <input 
          type="search" 
          className="cats-search-input" 
          placeholder="Search Global Taxonomies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button 
          type="button" 
          className="cats-btn-mint"
          onClick={handleMintCategory}
        >
          ➕ Mint New Category Node
        </button>
      </article>

      {/* 2. Segmented Classification Toggles */}
      <nav className="cats-partition-bar" aria-label="Taxonomy partition toggles">
        <button 
          type="button" 
          className={`cats-partition-btn ${activePartition === 'CSR' ? 'cats-partition-btn-active' : ''}`}
          onClick={() => setActivePartition('CSR')}
        >
          CSR Activity Categories
        </button>
        <button 
          type="button" 
          className={`cats-partition-btn ${activePartition === 'Gamification' ? 'cats-partition-btn-active' : ''}`}
          onClick={() => setActivePartition('Gamification')}
        >
          Gamification Challenge Tiers
        </button>
      </nav>

      {/* 3. Segmented Classification Table Layout */}
      <article className="cats-table-card">
        <div className="cats-table-wrapper">
          <table className="cats-table">
            <thead>
              <tr>
                <th>Category Identifier Key</th>
                <th>Taxonomy Name</th>
                <th>Associated ESG Core Pillar</th>
                <th>Usage Counter</th>
                <th>System Status</th>
                <th>Last Operational Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 700 }}>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{getPillarBadge(cat.pillar)}</td>
                  <td style={{ fontWeight: 600 }}>{cat.usage} items</td>
                  <td>{getStatusBadge(cat.status)}</td>
                  <td>{cat.updated}</td>
                  <td>
                    <button 
                      type="button" 
                      className="cats-btn-action"
                      onClick={() => handleToggleStatus(cat.id)}
                    >
                      Toggle Status
                    </button>
                    <button 
                      type="button" 
                      className="cats-btn-action" 
                      style={{ color: '#ef4444' }}
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

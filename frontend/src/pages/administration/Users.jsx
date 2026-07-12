import { useState } from 'react'
import './Users.css'

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const initialUsers = [
    { id: 1, name: 'Marcus Thome', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80', email: 'marcus.thome@ecosphere.com', dept: 'Operations', role: 'System Admin', perm: 'Full Access', status: 'Active', lastLogin: '2 mins ago' },
    { id: 2, name: 'Sarah Chen', avatar: '', email: 'sarah.chen@ecosphere.com', dept: 'Human Resources', role: 'Sustainability Officer', perm: 'Write', status: 'Active', lastLogin: '1 hour ago' },
    { id: 3, name: 'Elena Vance', avatar: '', email: 'elena.vance@ecosphere.com', dept: 'Leadership', role: 'Auditor', perm: 'Read', status: 'Invited', lastLogin: 'Never' },
    { id: 4, name: 'Kevin Zhang', avatar: '', email: 'kevin.zhang@ecosphere.com', dept: 'Finance', role: 'Employee', perm: 'Read', status: 'Suspended', lastLogin: '2 weeks ago' }
  ]

  const [users, setUsers] = useState(initialUsers)

  const handleStatusToggle = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
      }
      return u;
    }))
  }

  const handleCreateUser = () => {
    const name = prompt('Enter new user full name:')
    if (!name) return
    const email = prompt('Enter corporate email:')
    if (!email) return

    const newUser = {
      id: Date.now(),
      name,
      avatar: '',
      email,
      dept: 'Operations',
      role: 'Employee',
      perm: 'Read',
      status: 'Active',
      lastLogin: 'Never'
    }

    setUsers([newUser, ...users])
  }

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc'
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const getSortedUsers = () => {
    return [...users].sort((a, b) => {
      let valA = a[sortField] || ''
      let valB = b[sortField] || ''
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA
    })
  }

  const getPermBadge = (perm) => {
    switch (perm) {
      case 'Full Access': return <span className="badge-permission perm-full">Full Access</span>
      case 'Write': return <span className="badge-permission perm-write">Write</span>
      case 'Read': return <span className="badge-permission perm-read">Read</span>
      default: return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <span className="badge-status status-active">Active</span>
      case 'Suspended': return <span className="badge-status status-suspended">Suspended</span>
      case 'Invited': return <span className="badge-status status-invited">Invited</span>
      default: return null
    }
  }

  const sortedUsers = getSortedUsers()

  const filteredUsers = sortedUsers.filter(u => {
    const searchMatch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const roleMatch = roleFilter === 'All' || u.role === roleFilter
    const deptMatch = deptFilter === 'All' || u.dept === deptFilter
    return searchMatch && roleMatch && deptMatch
  })

  return (
    <div className="users-container">
      {/* 1. User Directory Controls */}
      <article className="users-filter-bar">
        <div className="users-filters-left">
          <input 
            type="search" 
            className="users-search-input" 
            placeholder="Search Users by Name or Email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            className="challenge-dropdown" 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">Role Class: All</option>
            <option value="System Admin">System Admin</option>
            <option value="Sustainability Officer">Sustainability Officer</option>
            <option value="Auditor">Auditor</option>
            <option value="Employee">Employee</option>
          </select>

          <select 
            className="challenge-dropdown" 
            value={deptFilter} 
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">Department: All</option>
            <option value="Operations">Operations</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Leadership">Leadership</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <button 
          type="button" 
          className="users-btn-create"
          onClick={handleCreateUser}
        >
          ➕ Create User
        </button>
      </article>

      {/* 2. Enterprise User Master Table */}
      <article className="users-table-card">
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>User Identity ↕</th>
                <th onClick={() => handleSort('email')}>Corporate Email ↕</th>
                <th onClick={() => handleSort('dept')}>Department ↕</th>
                <th onClick={() => handleSort('role')}>System Role ↕</th>
                <th>Permissions</th>
                <th onClick={() => handleSort('status')}>Account Status ↕</th>
                <th>Toggle Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-identity-cell">
                      {user.avatar ? (
                        <img className="user-identity-avatar" src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="user-identity-avatar-placeholder" aria-hidden="true">👤</div>
                      )}
                      <div className="user-identity-details">
                        <span className="user-identity-name">{user.name}</span>
                      </div>
                    </div>
                  </td>
                  <td><code>{user.email}</code></td>
                  <td>{user.dept}</td>
                  <td style={{ fontWeight: 600 }}>{user.role}</td>
                  <td>{getPermBadge(user.perm)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <label className="switch-toggle-label" aria-label="Toggle user status active state">
                      <input 
                        type="checkbox" 
                        className="switch-toggle-input" 
                        checked={user.status === 'Active'} 
                        onChange={() => handleStatusToggle(user.id)}
                      />
                      <span className="switch-toggle-slider"></span>
                    </label>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button type="button" className="users-btn-action">Edit</button>
                    <button type="button" className="users-btn-action" style={{ color: '#ef4444' }}>Revoke</button>
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

import { useState } from 'react'
import './Users.css'
import { useApi } from '../../hooks/useApi'

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')

  // Using the authentication API for employees
  const { data: users, loading, error } = useApi('/auth/employees/')

  if (loading) return <div style={{ padding: 20 }}>Loading users...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!users) return null

  const filteredUsers = users.filter(user => {
    const nameStr = `${user.user.first_name} ${user.user.last_name} ${user.user.email} ${user.user.username}`.toLowerCase()
    const matchesSearch = nameStr.includes(searchQuery.toLowerCase())
    
    // Formatting role for display matching
    const roleDisplay = user.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())
    const matchesRole = roleFilter === 'All Roles' || roleDisplay === roleFilter
    
    return matchesSearch && matchesRole
  })

  // Get unique roles for filter
  const roles = ['All Roles', ...new Set(users.map(u => u.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())))]

  return (
    <div className="users-container">
      {/* 1. Header and Add Button */}
      <div className="users-header-row">
        <div>
          <h2>User Directory</h2>
          <p>Manage platform access, roles, and functional assignments.</p>
        </div>
        <button type="button" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 6}}>
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Invite User
        </button>
      </div>

      {/* 2. Controls Ribbon */}
      <section className="users-controls" aria-label="Filter and Search Users">
        <div className="users-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="search" 
            placeholder="Search by name, email, or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="users-filters">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="button" className="btn-icon btn-filter-more">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
        </div>
      </section>

      {/* 3. Users Data Table */}
      <section className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Active</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="col-user-profile">
                  <div className="user-avatar">
                    {user.user.first_name ? user.user.first_name.charAt(0) : user.user.username.charAt(0)}
                  </div>
                  <div className="user-info-stack">
                    <strong>{user.user.first_name} {user.user.last_name || user.user.username}</strong>
                    <span className="user-email">{user.user.email}</span>
                  </div>
                </td>
                
                <td>
                  <span className={`role-badge role-${user.role.split('_')[0].toLowerCase()}`}>
                    {user.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </td>
                
                <td>{user.department_name || 'N/A'}</td>
                
                <td>
                  <span className={`status-dot dot-${user.status === 'active' ? 'active' : 'inactive'}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                
                <td className="col-date">2 hours ago</td>
                
                <td className="col-actions">
                  <button type="button" className="btn-icon" aria-label="Edit User">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="empty-state">
             <p>No users found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  )
}

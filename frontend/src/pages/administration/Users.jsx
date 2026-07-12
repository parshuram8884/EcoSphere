import { useState, useMemo } from 'react'
import './Users.css'
import { useApi } from '../../hooks/useApi'

export default function Users() {
  const { data: apiUsers, loading, error } = useApi('/auth/employees/')

  // Local state to support adding, modifying, and status toggles locally
  const [localUsers, setLocalUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [deptFilter, setDeptFilter] = useState('All Departments')
  
  // Sort State
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })

  // Modal & Form State
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newUserData, setNewUserData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: 'employee',
    department_name: 'Operations',
    status: 'active'
  })

  // Combine API users and locally added users
  const allUsers = useMemo(() => {
    if (!apiUsers) return [];
    
    // Add default fields to API users for consistent display
    const mappedApi = apiUsers.map(emp => {
      const seed = emp.id || 1;
      const status = emp.status || (seed % 4 === 0 ? 'suspended' : seed % 5 === 0 ? 'invited' : 'active');
      return {
        id: emp.id,
        username: emp.user.username,
        first_name: emp.user.first_name || 'ESG',
        last_name: emp.user.last_name || 'Member',
        email: emp.user.email || `${emp.user.username}@ecosphere.io`,
        role: emp.role || 'employee',
        department_name: emp.department_name || 'Operations',
        status: status,
        lastLogin: seed % 2 === 0 ? '2 hours ago' : seed % 3 === 0 ? '1 day ago' : 'Just now'
      }
    });

    // Merge with local overrides
    const merged = [...localUsers, ...mappedApi];
    return merged;
  }, [apiUsers, localUsers])

  // Get unique departments for filter dropdown
  const departmentsList = useMemo(() => {
    const defaultDepts = ['Operations', 'R&D', 'HR', 'Sales', 'Finance', 'Engineering', 'Marketing'];
    if (allUsers.length === 0) return ['All Departments', ...defaultDepts];
    const depts = allUsers.map(u => u.department_name).filter(Boolean);
    return ['All Departments', ...new Set([...defaultDepts, ...depts])];
  }, [allUsers])

  // Get unique roles for filter dropdown
  const rolesList = useMemo(() => {
    return ['All Roles', 'System Admin', 'Sustainability Officer', 'Auditor', 'Employee'];
  }, [])

  // Helper to map DB/API role strings to readable Class Names
  const getRoleLabel = (roleStr) => {
    const mapping = {
      'system_admin': 'System Admin',
      'sustainability_officer': 'Sustainability Officer',
      'auditor': 'Auditor',
      'employee': 'Employee'
    };
    return mapping[roleStr.toLowerCase()] || roleStr.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // Helper to map role to permission level badge
  const getPermissionBadge = (roleStr) => {
    const roleLower = roleStr.toLowerCase();
    if (roleLower === 'system_admin') return { label: 'Full Access', class: 'perm-full' };
    if (roleLower === 'sustainability_officer') return { label: 'Write Access', class: 'perm-write' };
    return { label: 'Read Access', class: 'perm-read' };
  }

  // Handle status toggle instantly inside the row layout
  const handleStatusToggle = (userId) => {
    // Check if the user is in localUsers first
    const isLocal = localUsers.some(u => u.id === userId);
    if (isLocal) {
      setLocalUsers(prev => prev.map(u => {
        if (u.id === userId) {
          return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
        }
        return u;
      }));
    } else {
      // If it's an API user, we add a local override entry or mock update it by creating/appending a local override
      setLocalUsers(prev => {
        const existingOverride = prev.find(u => u.id === userId);
        if (existingOverride) {
          return prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u);
        } else {
          const apiUser = allUsers.find(u => u.id === userId);
          if (apiUser) {
            return [...prev, { ...apiUser, status: apiUser.status === 'active' ? 'suspended' : 'active' }];
          }
          return prev;
        }
      });
    }
  }

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      // 1. Search Query
      const nameStr = `${user.first_name} ${user.last_name} ${user.email} ${user.username}`.toLowerCase();
      const matchesSearch = nameStr.includes(searchQuery.toLowerCase());
      
      // 2. Role Filter
      const roleLabel = getRoleLabel(user.role);
      const matchesRole = roleFilter === 'All Roles' || roleLabel === roleFilter;

      // 3. Department Filter
      const matchesDept = deptFilter === 'All Departments' || user.department_name === deptFilter;

      return matchesSearch && matchesRole && matchesDept;
    })
  }, [allUsers, searchQuery, roleFilter, deptFilter])

  // Sorted Users
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'name') {
        aVal = `${a.first_name} ${a.last_name}`.toLowerCase();
        bVal = `${b.first_name} ${b.last_name}`.toLowerCase();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortConfig])

  // Sort toggle handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  // Create User submit
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.username || !newUserData.email || !newUserData.first_name) return;

    const newUser = {
      id: Date.now(),
      username: newUserData.username,
      first_name: newUserData.first_name,
      last_name: newUserData.last_name,
      email: newUserData.email,
      role: newUserData.role,
      department_name: newUserData.department_name,
      status: newUserData.status,
      lastLogin: 'Never'
    };

    setLocalUsers([newUser, ...localUsers]);
    setIsCreateOpen(false);
    // Reset form
    setNewUserData({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      role: 'employee',
      department_name: 'Operations',
      status: 'active'
    });
  }

  // Handle revoke/remove
  const handleRevoke = (userId, name) => {
    if (window.confirm(`Are you sure you want to revoke platform access for ${name}?`)) {
      setLocalUsers(prev => prev.filter(u => u.id !== userId));
      // For API users, simulate a delete by adding a local filtered out list if needed, or simply let state handle
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-spinner"></div>
        <p>Retrieving Identity & Access logs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <div className="error-icon">⚠️</div>
        <h3>Failed to Load IAM Directory</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="users-container">
      {/* 1. Header Hero Area */}
      <div className="users-header-row">
        <div>
          <h2>Identity & Access Management (IAM)</h2>
          <p>Configure enterprise-wide credential roles, permission metrics, and facility profiles.</p>
        </div>
      </div>

      {/* 2. Controls & Search Ribbon */}
      <section className="users-filter-bar" aria-label="User Directory Controls">
        <div className="users-filters-left">
          <input 
            type="text" 
            placeholder="Search Users by Name or Email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="users-search-input"
          />

          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="users-select-filter"
          >
            {rolesList.map(role => (
              <option key={role} value={role}>{role === 'All Roles' ? 'All Roles' : `${role} Class`}</option>
            ))}
          </select>

          <select 
            value={deptFilter} 
            onChange={(e) => setDeptFilter(e.target.value)}
            className="users-select-filter"
          >
            {departmentsList.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button 
          type="button" 
          className="users-btn-create"
          onClick={() => setIsCreateOpen(true)}
        >
          ➕ Create User
        </button>
      </section>

      {/* 3. Enterprise User Master Table */}
      <section className="users-table-card">
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>User Identity & Avatar</th>
                <th onClick={() => handleSort('email')}>Corporate Email</th>
                <th onClick={() => handleSort('department_name')}>Department / Facility</th>
                <th onClick={() => handleSort('role')}>System Role Assignment</th>
                <th>Permission Level</th>
                <th style={{ width: '130px' }}>Account Status</th>
                <th>Last Active</th>
                <th style={{ width: '160px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => {
                const perm = getPermissionBadge(user.role);
                const roleLabel = getRoleLabel(user.role);
                const nameInitials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

                return (
                  <tr key={user.id}>
                    <td className="col-user-profile">
                      <div className="user-identity-cell">
                        <div className="user-identity-avatar-placeholder">
                          {nameInitials}
                        </div>
                        <div className="user-identity-details">
                          <span className="user-identity-name">{user.first_name} {user.last_name}</span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>ID: USR-{user.id.toString().substring(0, 5)}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td><span style={{ fontWeight: 600 }}>{user.email}</span></td>
                    
                    <td>{user.department_name}</td>
                    
                    <td>
                      <span className={`role-badge role-${user.role.split('_')[0].toLowerCase()}`}>
                        {roleLabel}
                      </span>
                    </td>

                    <td>
                      <span className={`badge-permission ${perm.class}`}>
                        {perm.label}
                      </span>
                    </td>
                    
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label className="switch-toggle-label" title="Instant status toggle">
                          <input 
                            type="checkbox" 
                            className="switch-toggle-input" 
                            checked={user.status === 'active'}
                            onChange={() => handleStatusToggle(user.id)}
                          />
                          <span className="switch-toggle-slider"></span>
                        </label>
                        <span className={`badge-status status-${user.status}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    
                    <td style={{ color: '#64748b', fontWeight: 600 }}>{user.lastLogin}</td>
                    
                    <td>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          type="button" 
                          className="users-btn-action"
                          onClick={() => alert(`Edit profile interface for ${user.first_name} under development.`)}
                        >
                          Edit
                        </button>
                        <button 
                          type="button" 
                          className="users-btn-action" 
                          style={{ color: '#dc2626' }}
                          onClick={() => handleRevoke(user.id, `${user.first_name} ${user.last_name}`)}
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {sortedUsers.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No identities found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Create User Interactive Modal */}
      {isCreateOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsCreateOpen(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Create Platform User</h3>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setIsCreateOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="admin-modal-body form-grid-admin">
                <div className="form-group-admin">
                  <label htmlFor="username">Login Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    required
                    placeholder="e.g. jsmith"
                    value={newUserData.username}
                    onChange={(e) => setNewUserData({...newUserData, username: e.target.value})}
                  />
                </div>

                <div className="form-group-split-admin">
                  <div className="form-group-admin">
                    <label htmlFor="first_name">First Name</label>
                    <input 
                      type="text" 
                      id="first_name" 
                      required
                      placeholder="John"
                      value={newUserData.first_name}
                      onChange={(e) => setNewUserData({...newUserData, first_name: e.target.value})}
                    />
                  </div>

                  <div className="form-group-admin">
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                      type="text" 
                      id="last_name" 
                      required
                      placeholder="Smith"
                      value={newUserData.last_name}
                      onChange={(e) => setNewUserData({...newUserData, last_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group-admin">
                  <label htmlFor="email">Corporate Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="jsmith@ecosphere.io"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  />
                </div>

                <div className="form-group-split-admin">
                  <div className="form-group-admin">
                    <label htmlFor="role">Security Role</label>
                    <select 
                      id="role"
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                    >
                      <option value="employee">Employee</option>
                      <option value="auditor">Auditor</option>
                      <option value="sustainability_officer">Sustainability Officer</option>
                      <option value="system_admin">System Admin</option>
                    </select>
                  </div>

                  <div className="form-group-admin">
                    <label htmlFor="dept">Department / Facility</label>
                    <select 
                      id="dept"
                      value={newUserData.department_name}
                      onChange={(e) => setNewUserData({...newUserData, department_name: e.target.value})}
                    >
                      <option value="Operations">Operations</option>
                      <option value="R&D">R&D</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn-outline-admin"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-solid-admin"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

  

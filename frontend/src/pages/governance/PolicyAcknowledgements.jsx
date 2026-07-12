import { useState } from 'react'
import './PolicyAcknowledgements.css'

export default function PolicyAcknowledgements() {
  const [department, setDepartment] = useState('All')
  const [showOverdueOnly, setShowOverdueOnly] = useState(false)

  const deptData = [
    { name: 'Operations', accepted: 88, pending: 8, overdue: 4 },
    { name: 'Finance', accepted: 94, pending: 5, overdue: 1 },
    { name: 'Research & Development', accepted: 82, pending: 11, overdue: 7 }
  ]

  const signOffs = [
    { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&fit=crop&q=80', dept: 'Engineering', policy: 'Global Anti-Bribery Code', status: 'Accepted', deadline: 'Oct 12, 2024' },
    { name: 'Marcus Thorne', avatar: '', dept: 'Operations', policy: 'Whistleblower Protection Policy', status: 'Pending', deadline: 'Oct 31, 2024' },
    { name: 'Elena Rodriguez', avatar: '', dept: 'Research & Development', policy: 'Global Anti-Bribery Code', status: 'Overdue', deadline: 'Oct 01, 2024' },
    { name: 'Kevin Zhang', avatar: '', dept: 'Finance', policy: 'Data Privacy & Charter', status: 'Accepted', deadline: 'Sep 15, 2024' }
  ]

  const filteredSignOffs = signOffs.filter(s => {
    const deptMatch = department === 'All' || s.dept === department
    const statusMatch = !showOverdueOnly || s.status === 'Overdue'
    return deptMatch && statusMatch
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted': return <span className="badge-ack-status badge-ack-accepted">✓ Accepted</span>
      case 'Pending': return <span className="badge-ack-status badge-ack-pending">Pending</span>
      case 'Overdue': return <span className="badge-ack-status badge-ack-overdue">Overdue</span>
      default: return null
    }
  }

  return (
    <div className="ack-container">
      {/* 1. Macro Analytical Progress Card */}
      <article className="ack-macro-card">
        <span className="ack-macro-header">Corporate Sign-off Compliance Status</span>
        
        <div className="ack-macro-blocks">
          <div className="ack-status-block ack-block-signed">
            <span className="ack-status-label">Signed & Accepted</span>
            <strong className="ack-status-val">8,420 <span>Employees (89%)</span></strong>
          </div>

          <div className="ack-status-block ack-block-pending">
            <span className="ack-status-label">Pending Verification</span>
            <strong className="ack-status-val">742 <span>Employees (8%)</span></strong>
          </div>

          <div className="ack-status-block ack-block-overdue">
            <span className="ack-status-label">Overdue Compliance Breaches</span>
            <strong className="ack-status-val" style={{ color: '#ef4444' }}>210 <span>Employees (3%)</span></strong>
            <span className="badge-overdue-crimson">Urgent Action Required</span>
          </div>
        </div>
      </article>

      {/* 2. Analytics Graph Card */}
      <article className="ack-chart-card">
        <h3>Policy Compliance curves by Department</h3>
        
        <div className="ack-dept-chart-list">
          {deptData.map((dept) => (
            <div key={dept.name} className="ack-dept-row">
              <span className="ack-dept-name">{dept.name}</span>
              <div className="ack-dept-bar-container">
                <div className="ack-fill-accepted" style={{ width: `${dept.accepted}%` }}></div>
                <div className="ack-fill-pending" style={{ width: `${dept.pending}%` }}></div>
                <div className="ack-fill-overdue" style={{ width: `${dept.overdue}%` }}></div>
              </div>
              <span className="ack-dept-pct-label">{dept.accepted}%</span>
            </div>
          ))}
        </div>
      </article>

      {/* 3. Employee Sign-Off Master Ledger Table */}
      <article className="ack-table-card">
        <div className="ack-table-header">
          <h3>Employee Sign-off Master Ledger</h3>
          
          <div className="ack-controls-group">
            <select 
              className="policies-dropdown" 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">Filter by Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Operations">Operations</option>
              <option value="Research & Development">Research & Development</option>
              <option value="Finance">Finance</option>
            </select>

            <label className="ack-toggle-label" htmlFor="overdue-toggle">
              <input 
                type="checkbox" 
                id="overdue-toggle"
                checked={showOverdueOnly}
                onChange={(e) => setShowOverdueOnly(e.target.checked)}
              />
              Show Overdue Only
            </label>
          </div>
        </div>

        <div className="ack-table-wrapper">
          <table className="ack-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Business Unit / Department</th>
                <th>Target Policy Document</th>
                <th>Current Status</th>
                <th>Deadline Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSignOffs.map((sub, i) => (
                <tr key={i}>
                  <td>
                    <div className="td-emp-profile">
                      {sub.avatar ? (
                        <img className="td-emp-avatar" src={sub.avatar} alt={sub.name} />
                      ) : (
                        <div className="td-emp-avatar-placeholder" aria-hidden="true">👤</div>
                      )}
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sub.name}</span>
                    </div>
                  </td>
                  <td>{sub.dept}</td>
                  <td>{sub.policy}</td>
                  <td>{getStatusBadge(sub.status)}</td>
                  <td>{sub.deadline}</td>
                  <td>
                    {sub.status !== 'Accepted' && (
                      <button type="button" className="ack-btn-remind">
                        Send Reminder
                      </button>
                    )}
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

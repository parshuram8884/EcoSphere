import { useState } from 'react'
import './NotificationSettings.css'

export default function NotificationSettings() {
  // Row 1 states
  const [row1Email, setRow1Email] = useState(true)
  const [row1Push, setRow1Push] = useState(true)
  const [row1InApp, setRow1InApp] = useState(true)
  const [row1Sms, setRow1Sms] = useState(false)
  const [row1Freq, setRow1Freq] = useState('Immediate')

  // Row 2 states
  const [row2Email, setRow2Email] = useState(true)
  const [row2Push, setRow2Push] = useState(false)
  const [row2InApp, setRow2InApp] = useState(true)
  const [row2Sms, setRow2Sms] = useState(false)
  const [row2Freq, setRow2Freq] = useState('Daily')

  // Row 3 states
  const [row3Email, setRow3Email] = useState(true)
  const [row3Push, setRow3Push] = useState(false)
  const [row3InApp, setRow3InApp] = useState(false)
  const [row3Sms, setRow3Sms] = useState(false)
  const [row3Freq, setRow3Freq] = useState('Monthly')

  const handleApplyConfig = () => {
    alert('Notification Settings Applied Globally: Updated notification parameters across all enterprise users.')
  }

  const handleRestore = () => {
    setRow1Email(true)
    setRow1Push(true)
    setRow1InApp(true)
    setRow1Sms(false)
    setRow1Freq('Immediate')

    setRow2Email(true)
    setRow2Push(false)
    setRow2InApp(true)
    setRow2Sms(false)
    setRow2Freq('Daily')

    setRow3Email(true)
    setRow3Push(false)
    setRow3InApp(false)
    setRow3Sms(false)
    setRow3Freq('Monthly')
    alert('Restored default system parameters.')
  }

  return (
    <div className="notif-set-container">
      {/* 1. Global Preference Save Header */}
      <article className="notif-set-header-bar">
        <h2>Multi-Channel Notification Configuration</h2>
        
        <div className="notif-set-actions">
          <button 
            type="button" 
            className="env-btn-secondary"
            onClick={handleRestore}
          >
            Restore Default Settings Layout
          </button>
          <button 
            type="button" 
            className="env-btn-primary"
            onClick={handleApplyConfig}
          >
            Apply Configuration Parameters Globally
          </button>
        </div>
      </article>

      {/* 2. Multi-Channel Frequency Control Matrix */}
      <section className="notif-set-matrix" aria-label="Frequency control matrix stacked cards">
        {/* Card Row 1: Critical Compliance Alerts */}
        <article className="notif-set-card">
          <div className="notif-set-card-header">
            <div className="notif-set-card-title-block">
              <h3>Critical Compliance Alerts</h3>
              <p>Triggers when breaches occur or policy audits fail thresholds.</p>
            </div>

            <select 
              className="notif-set-frequency-select"
              value={row1Freq}
              onChange={(e) => setRow1Freq(e.target.value)}
            >
              <option value="Immediate">Immediate / Instant Processing</option>
              <option value="Daily">Daily Digest Summaries</option>
            </select>
          </div>

          <div className="notif-set-channels-grid">
            {/* Email */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Email alerts</span>
                <span className="notif-channel-desc">Send to official corporate inbox</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Email alerts">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row1Email}
                  onChange={(e) => setRow1Email(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* Push */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Push Alerts</span>
                <span className="notif-channel-desc">Desktop notification overlay</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Push Alerts">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row1Push}
                  onChange={(e) => setRow1Push(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* In-App */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">In-App Badges</span>
                <span className="notif-channel-desc">Add count indicator directly on shell</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle In-App Badges">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row1InApp}
                  onChange={(e) => setRow1InApp(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* SMS */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">SMS Triggers</span>
                <span className="notif-channel-desc">Direct text message dispatch</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle SMS Triggers">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row1Sms}
                  onChange={(e) => setRow1Sms(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>
          </div>
        </article>

        {/* Card Row 2: CSR & Challenge Events */}
        <article className="notif-set-card">
          <div className="notif-set-card-header">
            <div className="notif-set-card-title-block">
              <h3>CSR & Challenge Events</h3>
              <p>Triggers when new sustainability sprints launch or users earn badges.</p>
            </div>

            <select 
              className="notif-set-frequency-select"
              value={row2Freq}
              onChange={(e) => setRow2Freq(e.target.value)}
            >
              <option value="Daily">Daily Digests / Weekly Bundles</option>
              <option value="Weekly">Weekly Summaries Only</option>
            </select>
          </div>

          <div className="notif-set-channels-grid">
            {/* Email */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Email updates</span>
                <span className="notif-channel-desc">Summary reports</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Email updates">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row2Email}
                  onChange={(e) => setRow2Email(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* Push */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Push Updates</span>
                <span className="notif-channel-desc">Sprint milestone popups</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Push Updates">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row2Push}
                  onChange={(e) => setRow2Push(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* In-App */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">In-App updates</span>
                <span className="notif-channel-desc">Leaderboard milestone markers</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle In-App updates">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row2InApp}
                  onChange={(e) => setRow2InApp(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* SMS */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">SMS Updates</span>
                <span className="notif-channel-desc">Weekly summary reminders</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle SMS Updates">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row2Sms}
                  onChange={(e) => setRow2Sms(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>
          </div>
        </article>

        {/* Card Row 3: System & Audit Reporting */}
        <article className="notif-set-card">
          <div className="notif-set-card-header">
            <div className="notif-set-card-title-block">
              <h3>System & Audit Reporting</h3>
              <p>Manages recurring monthly system reports and factor registry database synchronization updates.</p>
            </div>

            <select 
              className="notif-set-frequency-select"
              value={row3Freq}
              onChange={(e) => setRow3Freq(e.target.value)}
            >
              <option value="Monthly">Monthly Accounting Cycle</option>
              <option value="Quarterly">Quarterly Compliance Horizon</option>
            </select>
          </div>

          <div className="notif-set-channels-grid">
            {/* Email */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Email reports</span>
                <span className="notif-channel-desc">Download links for spreadsheets</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Email reports">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row3Email}
                  onChange={(e) => setRow3Email(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* Push */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">Push Reports</span>
                <span className="notif-channel-desc">Direct PDF preview link alerts</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle Push Reports">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row3Push}
                  onChange={(e) => setRow3Push(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* In-App */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">In-App reports</span>
                <span className="notif-channel-desc">Notification log notification updates</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle In-App reports">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row3InApp}
                  onChange={(e) => setRow3InApp(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>

            {/* SMS */}
            <div className="notif-channel-item">
              <div className="notif-channel-label">
                <span className="notif-channel-name">SMS Reports</span>
                <span className="notif-channel-desc">Link to dashboard summaries</span>
              </div>
              <label className="switch-toggle-label" aria-label="Toggle SMS Reports">
                <input 
                  type="checkbox" 
                  className="switch-toggle-input notif-switch-input" 
                  checked={row3Sms}
                  onChange={(e) => setRow3Sms(e.target.checked)}
                />
                <span className="switch-toggle-slider"></span>
              </label>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

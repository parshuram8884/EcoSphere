import { useState } from 'react'
import './ESGSettings.css'

export default function ESGSettings() {
  const [envWeight, setEnvWeight] = useState(40)
  const [socWeight, setSocWeight] = useState(30)
  const [govWeight, setGovWeight] = useState(30)

  // Sub-metrics
  const [carbonSub, setCarbonSub] = useState(50)
  const [energySub, setEnergySub] = useState(30)
  const [waterSub] = useState(20)

  const [diversitySub, setDiversitySub] = useState(40)
  const [csrSub, setCsrSub] = useState(30)
  const [safetySub, setSafetySub] = useState(30)

  const [regSub, setRegSub] = useState(50)
  const [auditSub, setAuditSub] = useState(50)

  // Metadata
  const [currency, setCurrency] = useState('USD ($)')
  const [horizon, setHorizon] = useState('2030')
  const [darkMode, setDarkMode] = useState(false)

  const totalSum = envWeight + socWeight + govWeight
  const isSumValid = totalSum === 100

  const handleSaveConfigs = () => {
    if (!isSumValid) {
      alert('Error: The total sum of the three ESG pillars must equal exactly 100% before saving!')
      return
    }
    alert('ESG Configurations Saved: Successfully updated aggregate weighting values across system index computation engines.')
  }

  return (
    <div className="settings-container">
      {/* 1. Constraint Banner */}
      <article className="settings-constraint-banner">
        <div className="settings-constraint-text">
          <span className="settings-constraint-title">ESG Pillar Constraint Checker</span>
          <span className="settings-constraint-desc">The sum of Environmental, Social, and Governance weights must equal exactly 100%.</span>
        </div>

        <div className={`constraint-sum-badge ${isSumValid ? 'sum-ok' : 'sum-err'}`}>
          {isSumValid ? '✓ Sum: 100% (Valid)' : `✗ Sum: ${totalSum}% (Invalid)`}
        </div>
      </article>

      {/* 2. Weight Configuration Cards */}
      <section className="settings-weights-grid" aria-label="ESG Weight configuration sliders">
        {/* Pillar Card 1: Environmental */}
        <article className="settings-weight-card">
          <div className="settings-weight-card-header">
            <h3>Environmental Weight</h3>
            <span className="weight-card-value">{envWeight}%</span>
          </div>

          <div className="settings-slider-group">
            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Pillar Share</span>
                <span>{envWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                value={envWeight}
                onChange={(e) => setEnvWeight(Number(e.target.value))}
              />
            </div>

            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginTop: 6 }}>Sub-Metric Allocations</div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Carbon & Greenhouse Gases</span>
                <span>{carbonSub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                value={carbonSub}
                onChange={(e) => setCarbonSub(Number(e.target.value))}
              />
            </div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Grid Energy Management</span>
                <span>{energySub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                value={energySub}
                onChange={(e) => setEnergySub(Number(e.target.value))}
              />
            </div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Water Intensity & Waste</span>
                <span>{waterSub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                value={waterSub}
                onChange={(e) => setWaterSub(Number(e.target.value))}
              />
            </div>
          </div>
        </article>

        {/* Pillar Card 2: Social */}
        <article className="settings-weight-card">
          <div className="settings-weight-card-header">
            <h3>Social Weight</h3>
            <span className="weight-card-value" style={{ color: '#3b82f6' }}>{socWeight}%</span>
          </div>

          <div className="settings-slider-group">
            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Pillar Share</span>
                <span>{socWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#3b82f6' }}
                value={socWeight}
                onChange={(e) => setSocWeight(Number(e.target.value))}
              />
            </div>

            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginTop: 6 }}>Sub-Metric Allocations</div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Employee Diversity & Inclusion</span>
                <span>{diversitySub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#3b82f6' }}
                value={diversitySub}
                onChange={(e) => setDiversitySub(Number(e.target.value))}
              />
            </div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>CSR & Volunteer Projects</span>
                <span>{csrSub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#3b82f6' }}
                value={csrSub}
                onChange={(e) => setCsrSub(Number(e.target.value))}
              />
            </div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Workplace Health & Safety</span>
                <span>{safetySub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#3b82f6' }}
                value={safetySub}
                onChange={(e) => setSafetySub(Number(e.target.value))}
              />
            </div>
          </div>
        </article>

        {/* Pillar Card 3: Governance */}
        <article className="settings-weight-card">
          <div className="settings-weight-card-header">
            <h3>Governance Weight</h3>
            <span className="weight-card-value" style={{ color: '#8b5cf6' }}>{govWeight}%</span>
          </div>

          <div className="settings-slider-group">
            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Pillar Share</span>
                <span>{govWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#8b5cf6' }}
                value={govWeight}
                onChange={(e) => setGovWeight(Number(e.target.value))}
              />
            </div>

            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginTop: 6 }}>Sub-Metric Allocations</div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Regulatory Policies & Registry</span>
                <span>{regSub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#8b5cf6' }}
                value={regSub}
                onChange={(e) => setRegSub(Number(e.target.value))}
              />
            </div>

            <div className="slider-control-row">
              <div className="slider-meta">
                <span>Internal & External Auditing</span>
                <span>{auditSub}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="settings-range-input"
                style={{ accentColor: '#8b5cf6' }}
                value={auditSub}
                onChange={(e) => setAuditSub(Number(e.target.value))}
              />
            </div>
          </div>
        </article>
      </section>

      {/* 3. Organization Profile Layout Sub-Section */}
      <article className="settings-profile-card">
        <h3>Organization Settings & Profile</h3>
        
        <div className="profile-meta-grid">
          <div className="form-group">
            <label htmlFor="comp-currency">Company Reporting Currency</label>
            <select 
              id="comp-currency"
              className="form-input" 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD ($)">USD ($) - United States Dollar</option>
              <option value="EUR (€)">EUR (€) - Euro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="target-horizon">Fiscal Target Horizon Year</label>
            <select 
              id="target-horizon"
              className="form-input" 
              value={horizon} 
              onChange={(e) => setHorizon(e.target.value)}
            >
              <option value="2030">2030 (Set Target)</option>
              <option value="2040">2040 (Long-Term Projection)</option>
            </select>
          </div>

          <div className="form-group">
            <label>UI Global Style Theme</label>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button 
                type="button" 
                className={`env-btn-secondary ${!darkMode ? 'severity-toggle-btn-active' : ''}`}
                style={{ flex: 1, padding: 8 }}
                onClick={() => setDarkMode(false)}
              >
                ☀️ Adaptive Light
              </button>
              <button 
                type="button" 
                className={`env-btn-secondary ${darkMode ? 'severity-toggle-btn-active' : ''}`}
                style={{ flex: 1, padding: 8 }}
                onClick={() => setDarkMode(true)}
              >
                🌙 Slate Dark
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom Save bar */}
      <article className="builder-control-footer">
        <button 
          type="button" 
          className="env-btn-primary"
          onClick={handleSaveConfigs}
        >
          💾 Save ESG Configurations & Recalculate
        </button>
      </article>
    </div>
  )
}

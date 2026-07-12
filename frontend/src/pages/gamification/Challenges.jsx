import { useState } from 'react'
import './Challenges.css'

export default function Challenges() {
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Form states
  const [formTitle, setFormTitle] = useState('')
  const [formXp, setFormXp] = useState('300')
  const [formPillar, setFormPillar] = useState('Environmental')

  const initialChallenges = [
    { id: 1, title: '30-Day Zero Plastic Sprint', difficulty: 'Eco-Warrior', xp: '+500 XP', points: '200 pts', daysLeft: 14, totalDays: 30, enrolled: 320, status: 'Live' },
    { id: 2, title: 'Carpool Synergy Week', difficulty: 'Beginner', xp: '+150 XP', points: '50 pts', daysLeft: 4, totalDays: 7, enrolled: 180, status: 'Live' },
    { id: 3, title: 'Green Travel Commute Challenge', difficulty: 'Intermediate', xp: '+300 XP', points: '100 pts', daysLeft: 30, totalDays: 30, enrolled: 0, status: 'Draft' }
  ]

  const [challenges, setChallenges] = useState(initialChallenges)

  const handleCreateChallenge = (e) => {
    e.preventDefault()
    if (!formTitle) return
    
    const newChallenge = {
      id: Date.now(),
      title: formTitle,
      difficulty: formXp === '500' ? 'Eco-Warrior' : formXp === '300' ? 'Intermediate' : 'Beginner',
      xp: `+${formXp} XP`,
      points: `${Math.round(formXp / 2)} pts`,
      daysLeft: 30,
      totalDays: 30,
      enrolled: 1,
      status: 'Live'
    }

    setChallenges([newChallenge, ...challenges])
    setFormTitle('')
    setIsCreateModalOpen(false)
  }

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner': return <span className="badge-difficulty difficulty-beg">Beginner</span>
      case 'Intermediate': return <span className="badge-difficulty difficulty-int">Intermediate</span>
      case 'Eco-Warrior': return <span className="badge-difficulty difficulty-war">Eco-Warrior</span>
      default: return null
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Live': return <span className="lbl-live">Live</span>
      case 'Draft': return <span className="lbl-draft">Draft</span>
      case 'Completed': return <span className="lbl-completed">Completed</span>
      default: return null
    }
  }

  const filteredChallenges = challenges.filter(c => {
    const searchMatch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
    const diffMatch = difficultyFilter === 'All' || c.difficulty === difficultyFilter
    return searchMatch && diffMatch
  })

  return (
    <div className="challenges-container">
      {/* 1. Executive Challenge Analytics */}
      <section className="challenges-stats-row" aria-label="Gamification stats overview">
        {/* Stat 1 */}
        <article className="challenge-stat-card">
          <div className="challenge-stat-icon" aria-hidden="true">🏆</div>
          <div className="challenge-stat-details">
            <span className="challenge-stat-label">Total Active Challenges</span>
            <strong className="challenge-stat-val">8 Live Events</strong>
            <span className="challenge-stat-sub">Across 4 departments</span>
          </div>
        </article>

        {/* Stat 2 */}
        <article className="challenge-stat-card">
          <div className="challenge-stat-icon" aria-hidden="true">⚡</div>
          <div className="challenge-stat-details">
            <span className="challenge-stat-label">Collective XP Generated</span>
            <strong className="challenge-stat-val">142,500 XP</strong>
            <span className="challenge-stat-sub">Awarded this quarter</span>
          </div>
        </article>

        {/* Stat 3 */}
        <article className="challenge-stat-card">
          <div className="challenge-stat-icon" aria-hidden="true">📈</div>
          <div className="challenge-stat-details">
            <span className="challenge-stat-label">Employee Engagement Rate</span>
            <strong className="challenge-stat-val">68% Active</strong>
            <span className="challenge-stat-sub">This week</span>
          </div>
        </article>
      </section>

      {/* 2. Challenge Control Toolbar */}
      <article className="challenge-toolbar">
        <div className="challenge-search-group">
          <input 
            type="search" 
            className="challenge-search-input" 
            placeholder="Search Corporate Challenges..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            className="challenge-dropdown" 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">Difficulty: All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Eco-Warrior">Eco-Warrior</option>
          </select>
        </div>

        <button 
          type="button" 
          className="challenge-btn-create"
          onClick={() => setIsCreateModalOpen(true)}
        >
          ➕ Create Challenge
        </button>
      </article>

      {/* 3. Challenge Matrix Grid */}
      <section className="challenge-grid" aria-label="Corporate Sustainability Challenges Grid">
        {filteredChallenges.map((challenge) => {
          const progressPct = ((challenge.totalDays - challenge.daysLeft) / challenge.totalDays) * 100
          return (
            <article key={challenge.id} className="challenge-card">
              <div className="challenge-card-header">
                {getDifficultyBadge(challenge.difficulty)}
                
                <div className="challenge-card-rewards">
                  <span className="badge-reward-xp">{challenge.xp}</span>
                  <span className="badge-reward-pts">{challenge.points}</span>
                </div>
              </div>

              <div className="challenge-card-title">
                <h3>{challenge.title}</h3>
              </div>

              <div className="challenge-card-progress">
                <div className="challenge-progress-labels">
                  <span>Progress: {challenge.totalDays - challenge.daysLeft}d / {challenge.totalDays}d</span>
                  <span>{challenge.daysLeft} Days Left</span>
                </div>
                <div className="goals-progress-track">
                  <div className="goals-progress-fill" style={{ width: `${progressPct}%`, background: '#059669', height: '100%' }}></div>
                </div>
              </div>

              <div className="challenge-status-footer">
                <span className="challenge-status-lbl">
                  Status: {getStatusLabel(challenge.status)}
                </span>
                <span style={{ color: '#64748b', fontWeight: 600 }}>
                  👥 {challenge.enrolled} joined
                </span>
              </div>
            </article>
          )
        })}
      </section>

      {/* 4. Pop-up Interaction States (Modal Simulation Engine) */}
      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create ESG Challenge</h3>
              <button 
                type="button" 
                className="btn-modal-close"
                onClick={() => setIsCreateModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreateChallenge}>
              <div className="form-group">
                <label htmlFor="challenge-title">Challenge Title</label>
                <input 
                  type="text" 
                  id="challenge-title"
                  className="form-input" 
                  placeholder="e.g., 30-Day Zero Plastic Sprint"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="xp-multiplier">XP Multiplier Reward</label>
                <select 
                  id="xp-multiplier"
                  className="form-input"
                  value={formXp}
                  onChange={(e) => setFormXp(e.target.value)}
                >
                  <option value="150">+150 XP (Beginner)</option>
                  <option value="300">+300 XP (Intermediate)</option>
                  <option value="500">+500 XP (Eco-Warrior)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="start-date">Start / End Date</label>
                <input type="date" id="start-date" className="form-input" defaultValue="2026-07-12" />
              </div>

              <div className="form-group">
                <label htmlFor="pillar-alignment">Target ESG Pillar Alignment</label>
                <select 
                  id="pillar-alignment"
                  className="form-input"
                  value={formPillar}
                  onChange={(e) => setFormPillar(e.target.value)}
                >
                  <option value="Environmental">Environmental</option>
                  <option value="Social">Social</option>
                  <option value="Governance">Governance</option>
                </select>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="env-btn-secondary"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="env-btn-primary">
                  Launch Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

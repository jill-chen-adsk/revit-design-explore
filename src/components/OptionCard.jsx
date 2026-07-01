import { CheckSquare, Square, Clock, User, MessageSquare, TrendingUp } from 'lucide-react'
import styles from './OptionCard.module.css'

const STATUS_COLORS = {
  'Active': 'green',
  'Under Review': 'yellow',
  'Exploratory': 'purple',
  'Archived': 'dim',
}

function ScoreBar({ value, max = 100 }) {
  const pct = Math.round((value / max) * 100)
  const color = pct >= 80 ? '#4caf82' : pct >= 65 ? '#f5c842' : '#e05a5a'
  return (
    <div className={styles.scoreBar}>
      <div className={styles.scoreTrack}>
        <div className={styles.scoreFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className={styles.scoreNum}>{value}</span>
    </div>
  )
}

export default function OptionCard({ option, selected, onToggleSelect, onOpenDetail }) {
  const statusColor = STATUS_COLORS[option.status] || 'dim'

  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onOpenDetail(option)}
    >
      <div className={styles.cardTop}>
        <div
          className={styles.thumbnail}
          style={{
            background: `linear-gradient(135deg, #1e2440 0%, #2a3060 100%)`,
          }}
        >
          <FloorPlanIllustration optionId={option.id} />
        </div>

        <button
          className={styles.selectBtn}
          onClick={(e) => { e.stopPropagation(); onToggleSelect(option.id) }}
          title={selected ? 'Deselect' : 'Select for comparison'}
        >
          {selected
            ? <CheckSquare size={18} className={styles.checked} />
            : <Square size={18} />
          }
        </button>

        <span className={`${styles.status} ${styles[statusColor]}`}>
          {option.status}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{option.name}</h3>
        <p className={styles.desc}>{option.description}</p>

        <div className={styles.tags}>
          {option.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Net Efficiency</span>
            <ScoreBar value={option.metrics.efficiency} max={100} />
          </div>
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Daylight Score</span>
            <ScoreBar value={option.metrics.daylightScore} max={100} />
          </div>
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Sustainability</span>
            <ScoreBar value={option.metrics.sustainabilityScore} max={100} />
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{option.metrics.netArea.toLocaleString()}</span>
            <span className={styles.statLabel}>m² Net</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{option.metrics.stories}</span>
            <span className={styles.statLabel}>Floors</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{option.metrics.constructionWeeks}</span>
            <span className={styles.statLabel}>Wks</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <User size={12} />
          <span>{option.author}</span>
        </div>
        <div className={styles.meta}>
          <Clock size={12} />
          <span>{option.lastModified}</span>
        </div>
        {option.notes && (
          <div className={styles.meta}>
            <MessageSquare size={12} />
          </div>
        )}
      </div>
    </div>
  )
}

function FloorPlanIllustration({ optionId }) {
  const plans = {
    'opt-1a': (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 120 }}>
        <rect x="10" y="10" width="100" height="60" rx="1" stroke="#4a6ab8" strokeWidth="1.5" fill="rgba(74,106,184,0.1)" />
        <rect x="42" y="28" width="36" height="24" rx="1" stroke="#7a9de0" strokeWidth="1" fill="rgba(122,157,224,0.2)" />
        <line x1="10" y1="28" x2="42" y2="28" stroke="#3a5090" strokeWidth="0.5" />
        <line x1="78" y1="28" x2="110" y2="28" stroke="#3a5090" strokeWidth="0.5" />
        <line x1="10" y1="52" x2="42" y2="52" stroke="#3a5090" strokeWidth="0.5" />
        <line x1="78" y1="52" x2="110" y2="52" stroke="#3a5090" strokeWidth="0.5" />
      </svg>
    ),
    'opt-1b': (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 120 }}>
        <rect x="10" y="10" width="100" height="60" rx="1" stroke="#4a6ab8" strokeWidth="1.5" fill="rgba(74,106,184,0.1)" />
        <rect x="10" y="28" width="32" height="24" rx="1" stroke="#7a9de0" strokeWidth="1" fill="rgba(122,157,224,0.2)" />
        <line x1="42" y1="10" x2="42" y2="70" stroke="#3a5090" strokeWidth="0.5" />
        <line x1="10" y1="40" x2="42" y2="40" stroke="#3a5090" strokeWidth="0.5" />
      </svg>
    ),
    'opt-1c': (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 120 }}>
        <rect x="10" y="10" width="100" height="60" rx="1" stroke="#4a6ab8" strokeWidth="1.5" fill="rgba(74,106,184,0.1)" />
        <rect x="10" y="28" width="26" height="24" rx="1" stroke="#7a9de0" strokeWidth="1" fill="rgba(122,157,224,0.2)" />
        <rect x="84" y="28" width="26" height="24" rx="1" stroke="#7a9de0" strokeWidth="1" fill="rgba(122,157,224,0.2)" />
        <line x1="36" y1="10" x2="36" y2="70" stroke="#3a5090" strokeWidth="0.5" />
        <line x1="84" y1="10" x2="84" y2="70" stroke="#3a5090" strokeWidth="0.5" />
      </svg>
    ),
    'opt-1d': (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 120 }}>
        <rect x="10" y="10" width="100" height="60" rx="1" stroke="#4a6ab8" strokeWidth="1.5" fill="rgba(74,106,184,0.1)" />
        <rect x="48" y="32" width="24" height="16" rx="2" stroke="#7a9de0" strokeWidth="1" fill="rgba(122,157,224,0.2)" />
        <circle cx="52" cy="40" r="3" fill="#7a9de0" opacity="0.6" />
        <circle cx="68" cy="40" r="3" fill="#7a9de0" opacity="0.6" />
      </svg>
    ),
  }

  return plans[optionId] || (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: 120 }}>
      <rect x="10" y="10" width="100" height="60" rx="1" stroke="#4a6ab8" strokeWidth="1.5" fill="rgba(74,106,184,0.1)" />
    </svg>
  )
}

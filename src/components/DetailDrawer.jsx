import { X, Clock, User, Tag, FileText, BarChart3 } from 'lucide-react'
import { metricLabels } from '../data/designOptions'
import styles from './DetailDrawer.module.css'

const METRIC_KEYS = [
  'grossArea', 'netArea', 'efficiency',
  'stories', 'structuralCost',
  'daylightScore', 'sustainabilityScore', 'constructionWeeks',
]

const STATUS_COLORS = {
  'Active': 'green',
  'Under Review': 'yellow',
  'Exploratory': 'purple',
  'Archived': 'dim',
}

export default function DetailDrawer({ option, onClose }) {
  if (!option) return null
  const statusColor = STATUS_COLORS[option.status] || 'dim'

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <div>
            <h2 className={styles.drawerTitle}>{option.name}</h2>
            <span className={`${styles.status} ${styles[statusColor]}`}>{option.status}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionIcon}><FileText size={14} /></div>
            <div className={styles.sectionBody}>
              <h4 className={styles.sectionTitle}>Description</h4>
              <p className={styles.desc}>{option.description}</p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}><Tag size={14} /></div>
            <div className={styles.sectionBody}>
              <h4 className={styles.sectionTitle}>Tags</h4>
              <div className={styles.tags}>
                {option.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIcon}><BarChart3 size={14} /></div>
            <div className={styles.sectionBody}>
              <h4 className={styles.sectionTitle}>Metrics</h4>
              <div className={styles.metricsGrid}>
                {METRIC_KEYS.map((key) => {
                  const meta = metricLabels[key]
                  const val = option.metrics[key]
                  const display = meta.format === 'number'
                    ? typeof val === 'number' ? val.toLocaleString() : val
                    : meta.format === 'percent'
                    ? `${val}%`
                    : val
                  const isScore = meta.format === 'score'
                  const scoreColor = isScore
                    ? val >= 80 ? '#4caf82' : val >= 65 ? '#f5c842' : '#e05a5a'
                    : null

                  return (
                    <div key={key} className={styles.metricItem}>
                      <span className={styles.metricLabel}>{meta.label}</span>
                      <div className={styles.metricVal}>
                        <span style={isScore ? { color: scoreColor } : undefined}>
                          {display}
                        </span>
                        {meta.unit && (
                          <span className={styles.metricUnit}>{meta.unit}</span>
                        )}
                      </div>
                      {isScore && (
                        <div className={styles.scoreTrack}>
                          <div
                            className={styles.scoreFill}
                            style={{ width: `${val}%`, background: scoreColor }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {option.notes && (
            <section className={styles.section}>
              <div className={styles.sectionIcon}><FileText size={14} /></div>
              <div className={styles.sectionBody}>
                <h4 className={styles.sectionTitle}>Notes</h4>
                <p className={styles.notes}>{option.notes}</p>
              </div>
            </section>
          )}

          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <User size={12} />
              <span>{option.author}</span>
            </div>
            <div className={styles.footerItem}>
              <Clock size={12} />
              <span>Modified {option.lastModified}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

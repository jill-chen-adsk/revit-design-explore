import { X, Trophy } from 'lucide-react'
import { metricLabels } from '../data/designOptions'
import styles from './ComparePanel.module.css'

const METRIC_KEYS = [
  'grossArea', 'netArea', 'efficiency',
  'stories', 'structuralCost',
  'daylightScore', 'sustainabilityScore', 'constructionWeeks',
]

function getBestIdx(options, key) {
  const meta = metricLabels[key]
  if (meta.format === 'text') return -1
  const higherBetter = ['efficiency', 'daylightScore', 'sustainabilityScore', 'netArea']
  const lowerBetter = ['constructionWeeks']
  const vals = options.map((o) => o.metrics[key])
  if (higherBetter.includes(key)) {
    const max = Math.max(...vals)
    return vals.indexOf(max)
  }
  if (lowerBetter.includes(key)) {
    const min = Math.min(...vals)
    return vals.indexOf(min)
  }
  return -1
}

export default function ComparePanel({ options, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Compare Design Options</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.scrollArea}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.labelCol}>Metric</th>
                {options.map((o) => (
                  <th key={o.id} className={styles.optionCol}>
                    <div className={styles.optionName}>{o.name}</div>
                    <span className={styles.optionStatus}>{o.status}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRIC_KEYS.map((key) => {
                const meta = metricLabels[key]
                const bestIdx = getBestIdx(options, key)
                return (
                  <tr key={key}>
                    <td className={styles.labelCell}>{meta.label}</td>
                    {options.map((o, i) => {
                      const val = o.metrics[key]
                      const isBest = i === bestIdx
                      const display = meta.format === 'number'
                        ? typeof val === 'number' ? val.toLocaleString() : val
                        : meta.format === 'percent'
                        ? `${val}%`
                        : meta.format === 'score'
                        ? val
                        : val
                      const unit = meta.unit

                      return (
                        <td key={o.id} className={`${styles.valueCell} ${isBest ? styles.best : ''}`}>
                          {isBest && <Trophy size={11} className={styles.trophy} />}
                          <span className={styles.val}>{display}</span>
                          {unit && <span className={styles.unit}>{unit}</span>}
                          {meta.format === 'score' && (
                            <div className={styles.inlineBar}>
                              <div
                                className={styles.inlineFill}
                                style={{
                                  width: `${val}%`,
                                  background: val >= 80 ? '#4caf82' : val >= 65 ? '#f5c842' : '#e05a5a',
                                }}
                              />
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              <tr>
                <td className={styles.labelCell}>Notes</td>
                {options.map((o) => (
                  <td key={o.id} className={styles.notesCell}>
                    {o.notes || <span className={styles.empty}>—</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

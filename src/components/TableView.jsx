import { CheckSquare, Square, ArrowUpDown } from 'lucide-react'
import { metricLabels } from '../data/designOptions'
import styles from './TableView.module.css'

const STATUS_COLORS = {
  'Active': 'green',
  'Under Review': 'yellow',
  'Exploratory': 'purple',
}

const COLS = ['name', 'status', 'efficiency', 'netArea', 'daylightScore', 'sustainabilityScore', 'structuralCost', 'constructionWeeks']

export default function TableView({ options, selected, onToggleSelect, onOpenDetail }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkCol} />
            <th className={styles.nameCol}>
              <div className={styles.thInner}>Name <ArrowUpDown size={12} /></div>
            </th>
            {COLS.slice(1).map((key) => (
              <th key={key} className={styles.th}>
                <div className={styles.thInner}>
                  {metricLabels[key]?.label || key}
                  <ArrowUpDown size={12} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {options.map((o) => {
            const isSelected = selected.includes(o.id)
            const statusColor = STATUS_COLORS[o.status] || 'dim'
            return (
              <tr
                key={o.id}
                className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
                onClick={() => onOpenDetail(o)}
              >
                <td className={styles.checkCell} onClick={(e) => e.stopPropagation()}>
                  <button
                    className={styles.checkBtn}
                    onClick={() => onToggleSelect(o.id)}
                  >
                    {isSelected
                      ? <CheckSquare size={16} className={styles.checked} />
                      : <Square size={16} />
                    }
                  </button>
                </td>
                <td className={styles.nameCell}>
                  <div className={styles.optName}>{o.name}</div>
                  <div className={styles.optTags}>
                    {o.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[statusColor]}`}>{o.status}</span>
                </td>
                <td className={styles.numCell}>{o.metrics.efficiency}%</td>
                <td className={styles.numCell}>{o.metrics.netArea.toLocaleString()} m²</td>
                <td className={styles.numCell}>
                  <ScoreCell val={o.metrics.daylightScore} />
                </td>
                <td className={styles.numCell}>
                  <ScoreCell val={o.metrics.sustainabilityScore} />
                </td>
                <td className={styles.numCell}>{o.metrics.structuralCost}</td>
                <td className={styles.numCell}>{o.metrics.constructionWeeks} wks</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ScoreCell({ val }) {
  const color = val >= 80 ? '#4caf82' : val >= 65 ? '#f5c842' : '#e05a5a'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--color-surface-3)', borderRadius: 2, overflow: 'hidden', maxWidth: 60 }}>
        <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ color, fontWeight: 600 }}>{val}</span>
    </div>
  )
}

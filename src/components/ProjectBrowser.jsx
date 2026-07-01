import { useState } from 'react'
import { ChevronRight, ChevronDown, Eye } from 'lucide-react'
import { SCENARIOS } from '../data/phasingData'
import styles from './ProjectBrowser.module.css'

export default function ProjectBrowser({ activeScenario, onSelectScenario }) {
  const [expanded, setExpanded] = useState({ views: true, floorPlans: true, sheets: false, families: false })

  function toggle(key) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className={styles.browser}>
      <div className={styles.header}>Project Browser – phase-demo.rvt</div>
      <div className={styles.tree}>
        <TreeNode
          label="Views (all)"
          expanded={expanded.views}
          onToggle={() => toggle('views')}
        >
          <TreeNode
            label="Floor Plans"
            expanded={expanded.floorPlans}
            onToggle={() => toggle('floorPlans')}
            indent={1}
          >
            {SCENARIOS.map((sc, i) => (
              <ViewItem
                key={i}
                label={sc.viewName}
                active={activeScenario === i}
                onClick={() => onSelectScenario(i)}
              />
            ))}
          </TreeNode>

          <TreeNode
            label="3D Views"
            expanded={false}
            onToggle={() => {}}
            indent={1}
          >
            <ViewItem label="{3D}" active={false} onClick={() => {}} />
          </TreeNode>

          <TreeNode
            label="Elevations (Building Elevation)"
            expanded={false}
            onToggle={() => {}}
            indent={1}
          />
        </TreeNode>

        <TreeNode
          label="Sheets (all)"
          expanded={expanded.sheets}
          onToggle={() => toggle('sheets')}
        >
          <ViewItem label="A101 - Site Plan" active={false} onClick={() => {}} />
          <ViewItem label="A201 - Floor Plans" active={false} onClick={() => {}} />
        </TreeNode>

        <TreeNode
          label="Families"
          expanded={expanded.families}
          onToggle={() => toggle('families')}
        >
          <ViewItem label="Walls" active={false} onClick={() => {}} />
          <ViewItem label="Rooms" active={false} onClick={() => {}} />
        </TreeNode>
      </div>
    </div>
  )
}

function TreeNode({ label, expanded, onToggle, indent = 0, children }) {
  const Icon = expanded ? ChevronDown : ChevronRight
  return (
    <div className={styles.node}>
      <div
        className={styles.nodeHeader}
        style={{ paddingLeft: 8 + indent * 12 }}
        onClick={onToggle}
      >
        <Icon size={12} className={styles.chevron} />
        <span className={styles.nodeLabel}>{label}</span>
      </div>
      {expanded && children && (
        <div className={styles.children}>{children}</div>
      )}
    </div>
  )
}

function ViewItem({ label, active, onClick }) {
  return (
    <div
      className={`${styles.viewItem} ${active ? styles.viewActive : ''}`}
      onClick={onClick}
    >
      <Eye size={11} className={styles.viewIcon} />
      <span className={styles.viewLabel}>{label}</span>
    </div>
  )
}

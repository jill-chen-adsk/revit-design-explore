import { useState } from 'react'
import { PHASES, FILTERS } from '../data/phasingData'
import styles from './RevitRibbon.module.css'

const TABS = ['Architecture', 'Structure', 'Systems', 'Insert', 'Annotate', 'Analyze', 'View', 'Manage', 'Modify']

export default function RevitRibbon({ viewPhase, viewFilter, onPhaseChange, onFilterChange }) {
  const [activeTab, setActiveTab] = useState('View')

  return (
    <div className={styles.ribbon}>
      <div className={styles.tabStrip}>
        <button className={styles.fileBtn}>File</button>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.panelRow}>
        {activeTab === 'View' ? (
          <>
            <RibbonPanel title="Graphics">
              <RibbonIconBtn label="Visual Style" icon="🪟" />
              <RibbonIconBtn label="Shadows" icon="☁" />
              <RibbonIconBtn label="Rendering" icon="✦" />
            </RibbonPanel>

            <RibbonPanel title="Phasing" highlight>
              <div className={styles.phasingPanel}>
                <div className={styles.phasingRow}>
                  <label className={styles.dropLabel}>Phase</label>
                  <select
                    className={styles.drop}
                    value={viewPhase}
                    onChange={e => onPhaseChange(+e.target.value)}
                  >
                    {PHASES.map((p, i) => (
                      <option key={i} value={i}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.phasingRow}>
                  <label className={styles.dropLabel}>Phase Filter</label>
                  <select
                    className={styles.drop}
                    value={viewFilter}
                    onChange={e => onFilterChange(e.target.value)}
                  >
                    {Object.entries(FILTERS).map(([k, f]) => (
                      <option key={k} value={k}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </RibbonPanel>

            <RibbonPanel title="Create">
              <RibbonIconBtn label="Duplicate View" icon="⊞" />
              <RibbonIconBtn label="Apply Template" icon="▤" />
            </RibbonPanel>

            <RibbonPanel title="Windows">
              <RibbonIconBtn label="Tile Views" icon="⊟" />
              <RibbonIconBtn label="Close Hidden" icon="✕" />
              <RibbonIconBtn label="Switch Windows" icon="⇄" />
            </RibbonPanel>

            <RibbonPanel title="Sheet Composition">
              <RibbonIconBtn label="Sheet" icon="📋" />
              <RibbonIconBtn label="Viewport" icon="⬚" />
            </RibbonPanel>
          </>
        ) : activeTab === 'Architecture' ? (
          <>
            <RibbonPanel title="Build">
              <RibbonIconBtn label="Wall" icon="▬" />
              <RibbonIconBtn label="Door" icon="⬓" />
              <RibbonIconBtn label="Window" icon="⊡" />
              <RibbonIconBtn label="Component" icon="⚙" />
            </RibbonPanel>
            <RibbonPanel title="Room & Area">
              <RibbonIconBtn label="Room" icon="⬜" />
              <RibbonIconBtn label="Room Separator" icon="╌" />
              <RibbonIconBtn label="Tag Room" icon="🏷" />
              <RibbonIconBtn label="Area" icon="▣" />
            </RibbonPanel>
            <RibbonPanel title="Circulation">
              <RibbonIconBtn label="Stair" icon="⩥" />
              <RibbonIconBtn label="Ramp" icon="⊿" />
              <RibbonIconBtn label="Railing" icon="⌇" />
            </RibbonPanel>
          </>
        ) : (
          <RibbonPanel title="">
            <span className={styles.tabPlaceholder}>Select the <strong>View</strong> tab to access Phasing controls.</span>
          </RibbonPanel>
        )}
      </div>
    </div>
  )
}

function RibbonPanel({ title, highlight, children }) {
  return (
    <div className={`${styles.panel} ${highlight ? styles.panelHighlight : ''}`}>
      <div className={styles.panelContent}>{children}</div>
      <div className={styles.panelTitle}>{title}</div>
    </div>
  )
}

function RibbonIconBtn({ label, icon }) {
  return (
    <button className={styles.iconBtn} title={label}>
      <span className={styles.iconBtnIcon}>{icon}</span>
      <span className={styles.iconBtnLabel}>{label}</span>
    </button>
  )
}

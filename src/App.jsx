import { useState } from 'react'
import RevitRibbon from './components/RevitRibbon'
import ProjectBrowser from './components/ProjectBrowser'
import PropertiesPanel from './components/PropertiesPanel'
import FloorPlanCanvas from './components/FloorPlanCanvas'
import ViewControlBar from './components/ViewControlBar'
import { SCENARIOS } from './data/phasingData'
import styles from './App.module.css'

export default function App() {
  const [viewPhase, setViewPhase]   = useState(0)
  const [viewFilter, setViewFilter] = useState('complete')
  const [activeScenario, setActiveScenario] = useState(0)
  const [hoveredElement, setHoveredElement] = useState(null)
  const [scenarioNote, setScenarioNote] = useState(SCENARIOS[0].note)

  function applyScenario(idx) {
    const sc = SCENARIOS[idx]
    setViewPhase(sc.phase)
    setViewFilter(sc.filter)
    setActiveScenario(idx)
    setScenarioNote(sc.note)
  }

  function handlePhaseChange(val) {
    setViewPhase(val)
    setActiveScenario(-1)
    setScenarioNote('')
  }

  function handleFilterChange(val) {
    setViewFilter(val)
    setActiveScenario(-1)
    setScenarioNote('')
  }

  return (
    <div className={styles.shell}>
      {/* Title bar */}
      <div className={styles.titleBar}>
        <div className={styles.titleBarLeft}>
          <div className={styles.quickAccess}>
            <TinyBtn>💾</TinyBtn>
            <TinyBtn>↩</TinyBtn>
            <TinyBtn>↪</TinyBtn>
            <div className={styles.qaDivider} />
            <TinyBtn>⚡</TinyBtn>
          </div>
        </div>
        <div className={styles.titleBarCenter}>
          Autodesk Revit 2026 — [Floor Plan: Level 1 – phase-demo.rvt]
        </div>
        <div className={styles.titleBarRight}>
          <TinyBtn>─</TinyBtn>
          <TinyBtn>⬜</TinyBtn>
          <TinyBtn close>✕</TinyBtn>
        </div>
      </div>

      {/* Ribbon */}
      <RevitRibbon
        viewPhase={viewPhase}
        viewFilter={viewFilter}
        onPhaseChange={handlePhaseChange}
        onFilterChange={handleFilterChange}
      />

      {/* Guided scenario strip */}
      <div className={styles.scenarioStrip}>
        <span className={styles.scenarioStripLabel}>Guided Scenarios:</span>
        {SCENARIOS.map((sc, i) => (
          <button
            key={i}
            className={`${styles.scenarioBtn} ${activeScenario === i ? styles.scenarioBtnActive : ''}`}
            onClick={() => applyScenario(i)}
          >
            {i + 1} · {sc.viewName.replace('Floor Plan: ', '')}
          </button>
        ))}
        {scenarioNote && (
          <span className={styles.scenarioNote}>{scenarioNote}</span>
        )}
      </div>

      {/* Main workspace */}
      <div className={styles.workspace}>
        {/* Left: Project Browser */}
        <ProjectBrowser
          activeScenario={activeScenario}
          onSelectScenario={applyScenario}
        />

        {/* Center: canvas + view control bar */}
        <div className={styles.canvasColumn}>
          <div className={styles.viewTab}>
            <span className={styles.viewTabName}>
              {activeScenario >= 0 ? SCENARIOS[activeScenario].viewName : 'Floor Plan: Level 1'}
            </span>
            <button className={styles.viewTabClose}>✕</button>
          </div>
          <FloorPlanCanvas
            viewPhase={viewPhase}
            viewFilter={viewFilter}
            onHoverElement={setHoveredElement}
          />
          <ViewControlBar viewPhase={viewPhase} viewFilter={viewFilter} />
        </div>

        {/* Right: Properties palette */}
        <PropertiesPanel
          viewPhase={viewPhase}
          viewFilter={viewFilter}
          onPhaseChange={handlePhaseChange}
          onFilterChange={handleFilterChange}
          hoveredElement={hoveredElement}
        />
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <span>Click to select elements. Hover to inspect phase metadata.</span>
        <div className={styles.statusRight}>
          <LegendSwatch color="#cde8f6" label="Existing" />
          <LegendSwatch color="#ccf0e0" label="New" />
          <LegendSwatch color="#f0d0e8" label="Demolished" />
          <LegendSwatch color="#f0f0d8" label="Future Fit-Out" />
        </div>
      </div>
    </div>
  )
}

function TinyBtn({ children, close }) {
  return (
    <button
      className={`${styles.tinyBtn} ${close ? styles.tinyBtnClose : ''}`}
    >
      {children}
    </button>
  )
}

function LegendSwatch({ color, label }) {
  return (
    <div className={styles.legendItem}>
      <div className={styles.swatch} style={{ background: color }} />
      <span>{label}</span>
    </div>
  )
}

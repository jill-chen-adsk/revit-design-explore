import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { PHASES, FILTERS, elemStatus } from '../data/phasingData'
import styles from './PropertiesPanel.module.css'

const STATUS_LABEL = {
  existing:   { label: 'Existing',   color: '#1565a0' },
  new_:       { label: 'New',        color: '#2e7d52' },
  demolished: { label: 'Demolished', color: '#cc3300' },
  future:     { label: 'Future',     color: '#7a7a1a' },
  fitout:     { label: 'Future Fit-Out', color: '#7a7a1a' },
  past:       { label: 'Past (hidden)', color: '#888' },
}

export default function PropertiesPanel({ viewPhase, viewFilter, onPhaseChange, onFilterChange, hoveredElement }) {
  const [sections, setSections] = useState({
    identity: false,
    graphics: false,
    extents: false,
    phasing: true,
  })

  function toggle(key) {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isElement = hoveredElement !== null

  if (isElement) {
    const { elem, kind, status } = hoveredElement
    const st = status || elemStatus(elem, viewPhase)
    const phaseNames = PHASES
    const stStyle = STATUS_LABEL[st] || STATUS_LABEL.existing

    return (
      <div className={styles.panel}>
        <div className={styles.header}>Properties</div>

        <div className={styles.typeBar}>
          <span className={styles.typeLabel}>{kind === 'room' ? 'Room' : 'Wall'}</span>
          <span className={styles.typeName}>{kind === 'room' ? elem.name : 'Basic Wall'}</span>
        </div>

        <div className={styles.scrollArea}>
          <Section
            title="Identity Data"
            expanded={true}
            onToggle={() => {}}
          >
            <PropRow label="Element ID" value={elem.id} />
            {kind === 'room' && elem.num && (
              <PropRow label="Room Number" value={elem.num} />
            )}
            {kind === 'room' && (
              <PropRow label="Name" value={elem.name} />
            )}
            {kind === 'wall' && (
              <PropRow label="Description" value={elem.desc} />
            )}
          </Section>

          <Section title="Phasing" expanded={true} onToggle={() => {}} accent>
            <PropRow
              label="Phase Created"
              value={phaseNames[elem.c] ?? '—'}
            />
            <PropRow
              label="Phase Demolished"
              value={elem.d !== null ? phaseNames[elem.d] : '—'}
            />
            <PropRow
              label="Status at View Phase"
              value={
                <span style={{ color: stStyle.color, fontWeight: 600 }}>
                  {stStyle.label}
                </span>
              }
            />
          </Section>

          <div className={styles.tip}>
            <em>← Click element to select. Hover shows phasing metadata.</em>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>Properties</div>

      <div className={styles.typeBar}>
        <span className={styles.typeLabel}>Floor Plan</span>
        <select className={styles.typeSelect}>
          <option>Floor Plan: Level 1</option>
        </select>
      </div>

      <div className={styles.scrollArea}>
        <Section title="Identity Data" expanded={sections.identity} onToggle={() => toggle('identity')}>
          <PropRow label="View Name" value="Level 1" />
          <PropRow label="Dependency" value="Independent" />
          <PropRow label="Title on Sheet" value="" />
          <PropRow label="Sheet Number" value="" />
        </Section>

        <Section title="Graphics" expanded={sections.graphics} onToggle={() => toggle('graphics')}>
          <PropRow label="View Scale" value="1 : 100" />
          <PropRow label="Scale Value 1:" value="100" />
          <PropRow label="Display Model" value="Normal" />
          <PropRow label="Detail Level" value="Coarse" />
          <PropRow label="Visual Style" value="Wireframe" />
          <PropRow label="Graphic Display Options" value="Edit…" link />
        </Section>

        <Section title="Extents" expanded={sections.extents} onToggle={() => toggle('extents')}>
          <PropRow label="Crop View" value="☐" />
          <PropRow label="Crop Region Visible" value="☐" />
          <PropRow label="Annotation Crop" value="☐" />
        </Section>

        <Section title="Phasing" expanded={sections.phasing} onToggle={() => toggle('phasing')} accent>
          <PropRowSelect
            label="Phase Filter"
            value={viewFilter}
            options={Object.entries(FILTERS).map(([k, f]) => ({ value: k, label: f.label }))}
            onChange={onFilterChange}
          />
          <PropRowSelect
            label="Phase"
            value={String(viewPhase)}
            options={PHASES.map((p, i) => ({ value: String(i), label: p }))}
            onChange={v => onPhaseChange(+v)}
          />
        </Section>

        <div className={styles.tip}>
          <em>Hover a room or wall on the floor plan to inspect its phase properties.</em>
        </div>
      </div>
    </div>
  )
}

function Section({ title, expanded, onToggle, accent, children }) {
  const Icon = expanded ? ChevronDown : ChevronRight
  return (
    <div className={styles.section}>
      <div
        className={`${styles.sectionHeader} ${accent ? styles.sectionAccent : ''}`}
        onClick={onToggle}
      >
        <Icon size={12} />
        <span>{title}</span>
      </div>
      {expanded && <div className={styles.sectionBody}>{children}</div>}
    </div>
  )
}

function PropRow({ label, value, link }) {
  return (
    <div className={styles.propRow}>
      <div className={styles.propLabel}>{label}</div>
      <div className={`${styles.propValue} ${link ? styles.propLink : ''}`}>
        {value}
      </div>
    </div>
  )
}

function PropRowSelect({ label, value, options, onChange }) {
  return (
    <div className={styles.propRow}>
      <div className={styles.propLabel}>{label}</div>
      <div className={styles.propValue}>
        <select
          className={styles.propSelect}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

import { useState, useMemo } from 'react'
import {
  ROOMS, WALLS, FILTERS,
  elemStatus, isVisible, displayStyle,
  WALL_STYLE, ROOM_STYLE,
} from '../data/phasingData'
import styles from './FloorPlanCanvas.module.css'

function pts2str(pts) {
  return pts.map(p => `${p.x},${p.y}`).join(' ')
}

function Tooltip({ elem, kind, pi, pos }) {
  if (!elem) return null
  const st = elemStatus(elem, pi)
  const phaseNames = ['Existing', 'New Construction', 'Future Fit-Out']
  const label = kind === 'room'
    ? `${elem.name}${elem.num ? ` (${elem.num})` : ''}`
    : (elem.desc || elem.id)

  return (
    <div
      className={styles.tooltip}
      style={{ left: pos.x + 14, top: pos.y + 14 }}
    >
      <div className={styles.ttTitle}>{label}</div>
      <div className={styles.ttRow}>
        <span className={styles.ttLabel}>Element ID:</span> {elem.id}
      </div>
      <div className={styles.ttRow}>
        <span className={styles.ttLabel}>Phase Created:</span> {phaseNames[elem.c] ?? '—'}
      </div>
      <div className={styles.ttRow}>
        <span className={styles.ttLabel}>Phase Demolished:</span>{' '}
        {elem.d !== null ? phaseNames[elem.d] : '—'}
      </div>
      <div className={styles.ttRow}>
        <span className={styles.ttLabel}>Status at view:</span>{' '}
        <span className={styles.ttStatus}>{st}</span>
      </div>
    </div>
  )
}

export default function FloorPlanCanvas({ viewPhase, viewFilter, onHoverElement }) {
  const [hovered, setHovered] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const fk = viewFilter
  const pi = viewPhase

  function handleEnter(e, elem, kind) {
    setHovered({ elem, kind })
    onHoverElement?.({ elem, kind, status: elemStatus(elem, pi) })
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  function handleMove(e) {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  function handleLeave() {
    setHovered(null)
    onHoverElement?.(null)
  }

  const roomElements = useMemo(() => {
    const existingPolys = []
    const demolishedPolys = []
    const labels = []

    ROOMS.forEach(room => {
      const st = elemStatus(room, pi)
      if (!isVisible(st, fk)) return

      const vis = displayStyle(st, room)
      const rs = ROOM_STYLE[vis] || ROOM_STYLE.existing

      if (st !== 'demolished') {
        existingPolys.push(
          <polygon
            key={room.id}
            points={pts2str(room.poly)}
            fill={rs.fill}
            stroke={rs.stroke}
            strokeWidth="1"
            opacity={rs.op}
            className={styles.hoverable}
            onMouseEnter={e => handleEnter(e, room, 'room')}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          />
        )
      } else {
        const opacity = fk === 'all' ? 0.5 : rs.op
        demolishedPolys.push(
          <polygon
            key={room.id}
            points={pts2str(room.poly)}
            fill={rs.fill}
            stroke={rs.stroke}
            strokeWidth="1"
            opacity={opacity}
            className={styles.hoverable}
            onMouseEnter={e => handleEnter(e, room, 'room')}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          />
        )
      }

      const isDemolished = st === 'demolished'
      const nameColor = isDemolished ? '#cc3300' : '#1a2a3a'
      const numColor  = isDemolished ? '#cc3300' : '#1a2a3a'
      const boxStroke = isDemolished ? '#cc3300' : '#333333'
      const fontSize  = room.name.length > 10 ? 9.5 : 10.5

      labels.push(
        <g key={`lbl-${room.id}`} style={{ pointerEvents: 'none' }}>
          <text
            x={room.lx} y={room.ly - 10}
            textAnchor="middle"
            fontFamily="Arial"
            fontSize={fontSize}
            fontWeight="600"
            letterSpacing="0.4"
            fill={nameColor}
          >
            {room.name}
          </text>
          {room.num && (
            <>
              <rect
                x={room.lx - 11} y={room.ly + 1}
                width={22} height={15}
                fill="white" stroke={boxStroke} strokeWidth="1" rx="2"
              />
              <text
                x={room.lx} y={room.ly + 12}
                textAnchor="middle"
                fontFamily="Arial"
                fontSize={9}
                fontWeight="700"
                fill={numColor}
              >
                {room.num}
              </text>
            </>
          )}
        </g>
      )
    })

    return { existingPolys, demolishedPolys, labels }
  }, [pi, fk])

  const wallLines = useMemo(() => WALLS.reduce((acc, wall) => {
    const st = elemStatus(wall, pi)
    if (!isVisible(st, fk)) return acc
    const vis = displayStyle(st, wall)
    const ws = WALL_STYLE[vis] || WALL_STYLE.existing
    acc.push(
      <polyline
        key={wall.id}
        points={pts2str(wall.pts)}
        fill="none"
        stroke={ws.stroke}
        strokeWidth={ws.w}
        strokeDasharray={ws.dash}
        strokeLinecap="square"
        opacity={ws.op}
        className={styles.hoverable}
        onMouseEnter={e => handleEnter(e, wall, 'wall')}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      />
    )
    return acc
  }, []), [pi, fk])

  const stats = useMemo(() => {
    let ex = 0, dm = 0, nw = 0, fu = 0, hid = 0
    ;[...WALLS, ...ROOMS].forEach(e => {
      const s = elemStatus(e, pi)
      if (!isVisible(s, fk)) { hid++; return }
      if (s === 'existing')   ex++
      else if (s === 'demolished') dm++
      else if (s === 'new_')  nw++
      else if (s === 'future') fu++
    })
    return { ex, dm, nw, fu, hid }
  }, [pi, fk])

  return (
    <div className={styles.wrap}>
      <div className={styles.viewport}>
        <svg
          viewBox="0 0 706 962"
          className={styles.svg}
          style={{ background: '#f7f8f9' }}
        >
          <defs>
            <pattern id="hatch-demo" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <rect width="10" height="10" fill="none" />
              <line x1="0" y1="5" x2="10" y2="5" stroke="#d888aa" strokeWidth="3.5" />
            </pattern>
          </defs>
          <g>{roomElements.existingPolys}</g>
          <g>{roomElements.demolishedPolys}</g>
          <g>{wallLines}</g>
          <g>{roomElements.labels}</g>
        </svg>
      </div>

      <div className={styles.statsBar}>
        <span>Visible elements — </span>
        <span>existing: <strong>{stats.ex}</strong></span>
        {stats.dm > 0 && <span> · demolished: <strong style={{ color: '#cc3300' }}>{stats.dm}</strong></span>}
        {stats.nw > 0 && <span> · new: <strong style={{ color: '#0055aa' }}>{stats.nw}</strong></span>}
        {stats.fu > 0 && <span> · future: <strong style={{ color: '#888' }}>{stats.fu}</strong></span>}
        {stats.hid > 0 && <span className={styles.hidden}> · hidden by filter: {stats.hid}</span>}
      </div>

      {hovered && (
        <Tooltip
          elem={hovered.elem}
          kind={hovered.kind}
          pi={pi}
          pos={tooltipPos}
        />
      )}
    </div>
  )
}

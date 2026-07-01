export const PHASES = ["Existing", "New Construction", "Future Fit-Out"]

export const FILTERS = {
  "all":       { label: "Show All",                 existing: 1, demolished: 1, new_: 1, future: 0 },
  "prev-demo": { label: "Show Previous + Demolish", existing: 1, demolished: 1, new_: 0, future: 0 },
  "prev-new":  { label: "Show Previous + New",      existing: 1, demolished: 0, new_: 1, future: 0 },
  "complete":  { label: "Show Complete",            existing: 1, demolished: 0, new_: 1, future: 0 },
  "new":       { label: "Show New",                 existing: 0, demolished: 0, new_: 1, future: 0 },
}

export const SCENARIOS = [
  {
    phase: 0, filter: "complete",
    viewName: "Floor Plan: Existing",
    note: "Original building: 9 rooms, all walls solid. Hover any room or wall to inspect its Phase Created / Phase Demolished.",
  },
  {
    phase: 1, filter: "prev-demo",
    viewName: "Floor Plan: NC – Demolition",
    note: "New Construction demolition scope: Storage, Lobby, Reception 12 and their walls shown demolished (red dashed / pink fill).",
  },
  {
    phase: 1, filter: "prev-new",
    viewName: "Floor Plan: NC – New Programme",
    note: "New programme overlaid: Conference Room 18 + Reception 17 (green) and new dividing wall (blue), alongside surviving existing rooms.",
  },
  {
    phase: 1, filter: "complete",
    viewName: "Floor Plan: NC – Complete",
    note: "Finished New Construction state: demolished elements hidden; new rooms replace old programme in the left column.",
  },
  {
    phase: 1, filter: "new",
    viewName: "Floor Plan: NC – New Only",
    note: "New-only view: only elements created in New Construction — useful for contractor scope packages.",
  },
  {
    phase: 2, filter: "prev-demo",
    viewName: "Floor Plan: Future Fit-Out",
    note: "Future Fit-Out splits Meeting Room 3 into Breakout 19 + Lounge 20. MR3 demolished — hover to see room identity discontinuity (15 → 19/20).",
  },
]

export const WALLS = [
  { id: "ow1",   c: 0, d: null, desc: "Outer top-left",               pts: [{ x: 58, y: 148 }, { x: 238, y: 148 }] },
  { id: "ow2",   c: 0, d: null, desc: "Bump-out left",                pts: [{ x: 238, y: 148 }, { x: 238, y: 32 }] },
  { id: "ow3",   c: 0, d: null, desc: "Bump-out top",                 pts: [{ x: 238, y: 32 },  { x: 472, y: 32 }] },
  { id: "ow4",   c: 0, d: null, desc: "Bump-out right",               pts: [{ x: 472, y: 32 },  { x: 472, y: 148 }] },
  { id: "ow5",   c: 0, d: null, desc: "Outer top-right",              pts: [{ x: 472, y: 148 }, { x: 648, y: 148 }] },
  { id: "ow6",   c: 0, d: null, desc: "Outer right",                  pts: [{ x: 648, y: 148 }, { x: 648, y: 930 }] },
  { id: "ow7",   c: 0, d: null, desc: "Outer bottom",                 pts: [{ x: 58,  y: 930 }, { x: 648, y: 930 }] },
  { id: "ow8",   c: 0, d: null, desc: "Outer left",                   pts: [{ x: 58,  y: 148 }, { x: 58,  y: 930 }] },
  { id: "iw_bb", c: 0, d: null, desc: "Bump-out base",                pts: [{ x: 238, y: 148 }, { x: 472, y: 148 }] },
  { id: "iw3",   c: 0, d: null, desc: "Office 11 left",               pts: [{ x: 472, y: 148 }, { x: 472, y: 575 }] },
  { id: "iw4",   c: 0, d: null, desc: "Upper/lower divide L",         pts: [{ x: 58,  y: 575 }, { x: 316, y: 575 }] },
  { id: "iw4b",  c: 0, d: null, desc: "Lobby/corridor top",           pts: [{ x: 316, y: 575 }, { x: 440, y: 575 }] },
  { id: "iw5",   c: 0, d: null, desc: "Upper/lower divide R",         pts: [{ x: 440, y: 575 }, { x: 648, y: 575 }] },
  { id: "iw6",   c: 0, d: null, desc: "Corridor left",                pts: [{ x: 316, y: 575 }, { x: 316, y: 782 }] },
  { id: "iw7",   c: 0, d: null, desc: "Corridor right",               pts: [{ x: 440, y: 575 }, { x: 440, y: 782 }] },
  { id: "iw11",  c: 0, d: null, desc: "MR3 top",                      pts: [{ x: 58,  y: 782 }, { x: 648, y: 782 }] },
  { id: "nw1",   c: 1, d: null, desc: "Conf Room / Reception divide", pts: [{ x: 58,  y: 390 }, { x: 472, y: 390 }] },
  { id: "nw2",   c: 2, d: null, desc: "MR3 split (Breakout | Lounge)",pts: [{ x: 353, y: 782 }, { x: 353, y: 930 }] },
  { id: "dw1",   c: 0, d: 1,    desc: "Storage | Lobby vertical",     pts: [{ x: 265, y: 148 }, { x: 265, y: 575 }] },
  { id: "dw2",   c: 0, d: 1,    desc: "Storage | Reception horiz",    pts: [{ x: 58,  y: 345 }, { x: 265, y: 345 }] },
]

export const ROOMS = [
  {
    id: "r8",  name: "OFFICE",         num: "8",  c: 0, d: null,
    poly: [{ x: 238, y: 32 }, { x: 472, y: 32 }, { x: 472, y: 148 }, { x: 238, y: 148 }],
    lx: 355, ly: 90,
  },
  {
    id: "r10", name: "LOBBY",          num: "10", c: 0, d: 1,
    poly: [{ x: 265, y: 148 }, { x: 472, y: 148 }, { x: 472, y: 575 }, { x: 265, y: 575 }],
    lx: 368, ly: 362,
  },
  {
    id: "r11", name: "OFFICE",         num: "11", c: 0, d: null,
    poly: [{ x: 472, y: 148 }, { x: 648, y: 148 }, { x: 648, y: 575 }, { x: 472, y: 575 }],
    lx: 560, ly: 362,
  },
  {
    id: "r14", name: "Meeting Room 1", num: "14", c: 0, d: null,
    poly: [{ x: 58, y: 575 }, { x: 316, y: 575 }, { x: 316, y: 782 }, { x: 58, y: 782 }],
    lx: 187, ly: 676,
  },
  {
    id: "r13", name: "Meeting Room 2", num: "13", c: 0, d: null,
    poly: [{ x: 440, y: 575 }, { x: 648, y: 575 }, { x: 648, y: 782 }, { x: 440, y: 782 }],
    lx: 544, ly: 676,
  },
  {
    id: "r16", name: "Corridor",       num: "16", c: 0, d: null,
    poly: [{ x: 316, y: 575 }, { x: 440, y: 575 }, { x: 440, y: 782 }, { x: 316, y: 782 }],
    lx: 378, ly: 679,
  },
  {
    id: "r15", name: "Meeting Room 3", num: "15", c: 0, d: 2,
    poly: [{ x: 58, y: 782 }, { x: 648, y: 782 }, { x: 648, y: 930 }, { x: 58, y: 930 }],
    lx: 353, ly: 856,
  },
  {
    id: "r9",  name: "STORAGE",        num: "9",  c: 0, d: 1,
    poly: [{ x: 58, y: 148 }, { x: 265, y: 148 }, { x: 265, y: 345 }, { x: 58, y: 345 }],
    lx: 162, ly: 246,
  },
  {
    id: "r12", name: "RECEPTION",      num: "12", c: 0, d: 1,
    poly: [{ x: 58, y: 345 }, { x: 265, y: 345 }, { x: 265, y: 575 }, { x: 58, y: 575 }],
    lx: 162, ly: 460,
  },
  {
    id: "r18", name: "Conference Room",num: "18", c: 1, d: null,
    poly: [{ x: 58, y: 148 }, { x: 472, y: 148 }, { x: 472, y: 390 }, { x: 58, y: 390 }],
    lx: 265, ly: 269,
  },
  {
    id: "r17", name: "RECEPTION",      num: "17", c: 1, d: null,
    poly: [{ x: 58, y: 390 }, { x: 472, y: 390 }, { x: 472, y: 575 }, { x: 58, y: 575 }],
    lx: 265, ly: 483,
  },
  {
    id: "r19", name: "BREAKOUT",       num: "19", c: 2, d: null,
    poly: [{ x: 58, y: 782 }, { x: 353, y: 782 }, { x: 353, y: 930 }, { x: 58, y: 930 }],
    lx: 205, ly: 856,
  },
  {
    id: "r20", name: "LOUNGE",         num: "20", c: 2, d: null,
    poly: [{ x: 353, y: 782 }, { x: 648, y: 782 }, { x: 648, y: 930 }, { x: 353, y: 930 }],
    lx: 500, ly: 856,
  },
]

export function elemStatus(elem, pi) {
  const { c, d } = elem
  if (c > pi)               return "future"
  if (d !== null && d < pi) return "past"
  if (d === pi)             return "demolished"
  if (c === pi && c > 0)    return "new_"
  return "existing"
}

export function isVisible(st, fk) {
  if (st === "past") return false
  const f = FILTERS[fk]
  return !!(f[st] ?? 0)
}

export function displayStyle(st, elem) {
  if (st === "new_" && elem.c >= 2) return "fitout"
  return st
}

export const WALL_STYLE = {
  existing:   { stroke: "#1a1a1a", w: 5,   dash: "",    op: 1 },
  demolished: { stroke: "#cc3300", w: 2.5, dash: "8,5", op: 1 },
  new_:       { stroke: "#0055aa", w: 5,   dash: "",    op: 1 },
  fitout:     { stroke: "#6a6a5a", w: 4,   dash: "6,4", op: 1 },
  future:     { stroke: "#888",    w: 2,   dash: "5,4", op: 0.4 },
}

export const ROOM_STYLE = {
  existing:   { fill: "#cde8f6", stroke: "#a0c8e0", op: 1 },
  demolished: { fill: "#f0d0e8", stroke: "#d8a0c4", op: 1 },
  new_:       { fill: "#ccf0e0", stroke: "#88d4aa", op: 1 },
  fitout:     { fill: "#f0f0d8", stroke: "#c8c8a0", op: 1 },
  future:     { fill: "#f0f0d8", stroke: "#c8c8a0", op: 0.45 },
}

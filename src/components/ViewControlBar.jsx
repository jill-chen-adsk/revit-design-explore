import styles from './ViewControlBar.module.css'

export default function ViewControlBar({ viewPhase, viewFilter }) {
  const phaseNames = ['Existing', 'New Construction', 'Future Fit-Out']
  return (
    <div className={styles.bar}>
      <CtrlBtn label="1:100" title="View Scale" />
      <Divider />
      <CtrlBtn label="Coarse" title="Detail Level" />
      <Divider />
      <CtrlBtn label="Wireframe" title="Visual Style" />
      <Divider />
      <CtrlBtn label="☀" title="Sun Path" />
      <CtrlBtn label="⛅" title="Shadows" />
      <CtrlBtn label="🌀" title="Rendering" />
      <Divider />
      <CtrlBtn label="⊞" title="Crop View" />
      <Divider />
      <CtrlBtn label="HLR" title="Hide/Isolate" />
      <Divider />
      <span className={styles.phaseTag}>
        Phase: <strong>{phaseNames[viewPhase]}</strong>
      </span>
      <Divider />
      <CtrlBtn label="⊙" title="Temporary Hide/Isolate" />
      <CtrlBtn label="⤢" title="Reveal Hidden Elements" />
    </div>
  )
}

function CtrlBtn({ label, title }) {
  return (
    <button className={styles.btn} title={title}>
      {label}
    </button>
  )
}

function Divider() {
  return <div className={styles.divider} />
}

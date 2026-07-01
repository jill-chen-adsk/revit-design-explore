import { Layers, ChevronDown, Bell, User } from 'lucide-react'
import styles from './Header.module.css'

export default function Header({ projects, selectedProject, onSelectProject }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Layers size={20} />
          <span className={styles.logoText}>Revit Design Explore</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.projectSelect}>
          <select
            value={selectedProject}
            onChange={(e) => onSelectProject(e.target.value)}
            className={styles.select}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={17} />
        </button>
        <div className={styles.avatar}>
          <User size={15} />
        </div>
      </div>
    </header>
  )
}

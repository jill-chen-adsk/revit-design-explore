import { LayoutGrid, Table2, GitCompare, Search, SlidersHorizontal, Plus } from 'lucide-react'
import styles from './Toolbar.module.css'

export default function Toolbar({
  view,
  onViewChange,
  search,
  onSearch,
  filterTag,
  onFilterTag,
  allTags,
  selectedCount,
  onCompare,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'grid' ? styles.active : ''}`}
            onClick={() => onViewChange('grid')}
            title="Card view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={`${styles.viewBtn} ${view === 'table' ? styles.active : ''}`}
            onClick={() => onViewChange('table')}
            title="Table view"
          >
            <Table2 size={16} />
          </button>
        </div>

        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.search}
            placeholder="Search options…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className={styles.tags}>
          <SlidersHorizontal size={14} className={styles.tagsIcon} />
          <button
            className={`${styles.tagBtn} ${filterTag === '' ? styles.tagActive : ''}`}
            onClick={() => onFilterTag('')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${filterTag === tag ? styles.tagActive : ''}`}
              onClick={() => onFilterTag(tag === filterTag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {selectedCount >= 2 && (
          <button className={styles.compareBtn} onClick={onCompare}>
            <GitCompare size={14} />
            Compare {selectedCount} Options
          </button>
        )}
        <button className={styles.addBtn}>
          <Plus size={14} />
          New Option
        </button>
      </div>
    </div>
  )
}

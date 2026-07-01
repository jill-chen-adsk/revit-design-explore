import { useState, useMemo } from 'react'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import OptionCard from './components/OptionCard'
import TableView from './components/TableView'
import ComparePanel from './components/ComparePanel'
import DetailDrawer from './components/DetailDrawer'
import { projects, designOptions } from './data/designOptions'
import styles from './App.module.css'

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id)
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [detailOption, setDetailOption] = useState(null)

  const currentProject = projects.find((p) => p.id === selectedProjectId)
  const allOptions = designOptions[selectedProjectId] || []

  const allTags = useMemo(() => {
    const set = new Set()
    allOptions.forEach((o) => o.tags.forEach((t) => set.add(t)))
    return [...set].sort()
  }, [allOptions])

  const filtered = useMemo(() => {
    return allOptions.filter((o) => {
      const matchSearch = !search ||
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase())
      const matchTag = !filterTag || o.tags.includes(filterTag)
      return matchSearch && matchTag
    })
  }, [allOptions, search, filterTag])

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const compareOptions = allOptions.filter((o) => selectedIds.includes(o.id))

  function handleProjectChange(id) {
    setSelectedProjectId(id)
    setSelectedIds([])
    setSearch('')
    setFilterTag('')
  }

  return (
    <div className={styles.app}>
      <Header
        projects={projects}
        selectedProject={selectedProjectId}
        onSelectProject={handleProjectChange}
      />

      <div className={styles.projectBanner}>
        <div className={styles.bannerLeft}>
          <span className={styles.bannerLabel}>Phase</span>
          <span className={styles.bannerValue}>{currentProject.phase}</span>
          <span className={styles.bannerDivider}>·</span>
          <span className={styles.bannerLabel}>{filtered.length} option{filtered.length !== 1 ? 's' : ''}</span>
          {selectedIds.length > 0 && (
            <>
              <span className={styles.bannerDivider}>·</span>
              <span className={styles.bannerSelected}>{selectedIds.length} selected</span>
            </>
          )}
        </div>
      </div>

      <Toolbar
        view={view}
        onViewChange={setView}
        search={search}
        onSearch={setSearch}
        filterTag={filterTag}
        onFilterTag={setFilterTag}
        allTags={allTags}
        selectedCount={selectedIds.length}
        onCompare={() => setCompareOpen(true)}
      />

      <main className={styles.main}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No design options match your filters.</p>
          </div>
        ) : view === 'grid' ? (
          <div className={styles.grid}>
            {filtered.map((opt) => (
              <OptionCard
                key={opt.id}
                option={opt}
                selected={selectedIds.includes(opt.id)}
                onToggleSelect={toggleSelect}
                onOpenDetail={setDetailOption}
              />
            ))}
          </div>
        ) : (
          <TableView
            options={filtered}
            selected={selectedIds}
            onToggleSelect={toggleSelect}
            onOpenDetail={setDetailOption}
          />
        )}
      </main>

      {compareOpen && compareOptions.length >= 2 && (
        <ComparePanel
          options={compareOptions}
          onClose={() => setCompareOpen(false)}
        />
      )}

      {detailOption && (
        <DetailDrawer
          option={detailOption}
          onClose={() => setDetailOption(null)}
        />
      )}
    </div>
  )
}

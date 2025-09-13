import React, { useMemo, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { ACTIVITIES, CATEGORIES, MOODS } from '../utils/activities'

export default function ActivityCatalog({ onAdd }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Select from wide range of categories')

  const filtered = useMemo(() => {
    let arr = ACTIVITIES
    if (category !== 'Select from wide range of categories') arr = arr.filter(a => a.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      arr = arr.filter(a => a.name.toLowerCase().includes(q))
    }
    return arr
  }, [query, category])

  const Row = ({ index, style }) => {
    const a = filtered[index]
    return (
      <div style={style} className="px-2">
        <button
          className="w-full text-left rounded-2xl bg-card border shadow-soft hover:shadow p-3 transition"
          onClick={() => onAdd(a)}
          aria-label={`Add ${a.name}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{a.name}</div>
              <div className="text-sm text-muted-foreground flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-muted">{a.category}</span>
                {/* <span className="px-2 py-0.5 rounded-full bg-muted">{a.defaultDuration}m</span> */}
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20">Add</span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3" role="region" aria-label="Activity catalog">
      <div className="flex flex-col gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search activities..."
          className="flex-1 rounded-xl border px-3 py-2 bg-card"
        />

        <div className="relative">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="rounded-xl border px-3 py-2 bg-card w-full appearance-none"
          >
            <option>Select from wide range of categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* custom arrow with spacing */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            ▼
          </span>
        </div>
      </div>
      <div className="border roundefd-2xl overflow-hidden bg-xdcard" style={{ height: 375, paddingRight: 4, paddingTop: 6 }}>
        <List
          height={360}
          itemCount={filtered.length}
          itemSize={84}
          width="100%"
        >
          {Row}
        </List>
      </div>
      <p className="text-xs text-muted-foreground">Tip: Click an item to add it to your current day.</p>
    </div>
  )
}

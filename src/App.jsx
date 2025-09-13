import React, { useEffect, useMemo, useRef, useState } from 'react'
import ActivityCatalog from './components/ActivityCatalog.jsx'
import DayColumn from './components/DayColumn.jsx'
import Toolbar from './components/Toolbar.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { ACTIVITIES, MOODS } from './utils/activities.js'
import { createEmptySchedule, addItem, moveItem, removeItem, reorder, defaultDays } from './lib/planner.js'
import * as htmlToImage from 'html-to-image'
import { suggestLongWeekends } from './utils/longWeekends.js'

function uuid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function App() {
  const [days, setDays] = useLocalStorage('weekendly:days', defaultDays)
  const [schedule, setSchedule] = useLocalStorage('weekendly:schedule', createEmptySchedule(days))
  const [currentDay, setCurrentDay] = useState(days[0] ?? 'Saturday')
  const [theme, setTheme] = useLocalStorage('weekendly:theme', 'system')

  // Keep schedule object in sync with days
  useEffect(() => {
    setSchedule(prev => {
      const next = { ...prev }
      for (const d of days) if (!next[d]) next[d] = []
      for (const d of Object.keys(next)) if (!days.includes(d)) delete next[d]
      return next
    })
  }, [days, setSchedule])

  useEffect(() => {
    let appliedTheme;

    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else if (theme === 'lazy') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      appliedTheme = systemPrefersDark ? 'light' : 'dark'; // flip system theme
    }

    document.documentElement.dataset.theme = appliedTheme;
  }, [theme]);

  const posterRef = useRef(null)

  // Drag state
  const dragRef = useRef({ fromDay: null, index: null, id: null })

  function onAddBase(act) {
    const mood = act.defaultMood
    const moodMeta = MOODS.find(m => m.id === mood)
    const item = {
      uid: uuid(),
      id: act.id,
      name: act.name,
      category: act.category,
      icon: act.icon,
      duration: act.defaultDuration,
      mood,
      moodEmoji: moodMeta?.emoji ?? '🎯',
      notes: '',
      link: ''
    }
    setSchedule(s => addItem(s, currentDay, item))
  }

  function onRemove(day, id) {
    setSchedule(s => removeItem(s, day, id))
  }

  function onEdit(day, id) {
    const item = schedule[day].find(x => x.uid === id)
    if (!item) return
    const name = prompt('Rename activity (leave blank to keep):', item.name) ?? item.name
    const duration = parseInt(prompt('Duration in minutes:', item.duration) || item.duration, 10)
    const mood = prompt('Mood (e.g. happy, relaxed):', item.mood) || item.mood
    const notes = prompt('Notes (optional):', item.notes ?? '') || item.notes
    const link = prompt('Link / Place (optional):', item.link ?? '') || item.link
    const moodEmoji = (MOODS.find(m => m.id === mood) || {}).emoji || item.moodEmoji

    setSchedule(s => {
      const next = structuredClone(s)
      const idx = next[day].findIndex(x => x.uid === id)
      if (idx >= 0) next[day][idx] = { ...next[day][idx], name, duration, mood, moodEmoji, notes, link }
      return next
    })
  }

  function onDragStart(e, fromDay, index, id) {
    dragRef.current = { fromDay, index, id }
    e.dataTransfer.setData('text/plain', JSON.stringify(dragRef.current))
    e.dataTransfer.effectAllowed = 'move'
  }
  function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }
  function onDropItem(e, toDay) {
    e.preventDefault()
    let data
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')) } catch { return }
    if (!data) return
    const { fromDay, id } = data
    setSchedule(s => moveItem(s, fromDay, toDay, id))
  }

  function onReorder(day, startIndex, endIndex) { setSchedule(s => reorder(s, day, startIndex, endIndex)) }

  function addDay(label) {
    setDays(prev => Array.from(new Set([...prev, label])))
    setCurrentDay(label)
  }
  function removeDay() {
    setDays(prev => prev.slice(0, -1))
    setCurrentDay(d => (days[0] ?? 'Saturday'))
  }
  const canRemoveDay = days.length > 2

  function clearPlan() {
    if (confirm('Clear entire plan?')) setSchedule(createEmptySchedule(days))
  }

  async function exportPoster() {
    if (!posterRef.current) return
    // Temporarily add white background for export
    const node = posterRef.current
    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 2,
      backgroundColor: '#ffffff'
    })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'weekendly-plan.png'
    a.click()
  }

  const longWeekendHints = useMemo(() => suggestLongWeekends(new Date()), [])

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto p-4">
          <div className=" sm:flex sm:items-center sm:gap-3">

            <div className='flex gap-3 sm:flex sm:gap-3'>
              <div className="w-10 h-10 rounded-2xl bg-primary/15 border flex items-center justify-center text-xl">🗓️</div>
              <div>
                <h1 className="text-xl font-bold leading-tight">EndJoy</h1>
                <p className="text-sm text-muted-foreground">Plan a delightful weekend. Drag it, Drop it & EndJoy it.</p>
              </div>
            </div>

            {/* <div className="w-10 h-10 rounded-2xl bg-primary/15 border flex items-center justify-center text-xl">🗓️</div>
            <div>
              <h1 className="text-xl font-bold leading-tight">EndJoy</h1>
              <p className="text-sm text-muted-foreground">Plan a delightful weekend. Drag it, Drop it & EndJoy it.</p>
            </div> */}

            <div className="pt-2 ml-auto flex items-center gap-2">
              {/* custom select wrapper */}
              <div className="relative">
                <select
                  value={currentDay}
                  onChange={e => setCurrentDay(e.target.value)}
                  className="rounded-xl border px-3 py-1.5 bg-card pr-8 appearance-none"
                >
                  {days.map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                {/* custom arrow */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ▼
                </span>
              </div>

              <button
                className="rounded-xl border px-3 py-1.5 bg-card"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(
                      currentDay + ' activities'
                    )}`,
                    '_blank'
                  )
                }
              >
                Find nearby
              </button>

              <button
                className="rounded-xl border px-3 py-1.5 bg-card"
                onClick={() => window.print()}
                title="Print as PDF"
                aria-label="Print"
              >
                🖨️ Print
              </button>
            </div>


          </div>
          <div className="mt-3">
            <Toolbar
              theme={theme}
              setTheme={setTheme}
              addDay={addDay}
              removeDay={removeDay}
              canRemoveDay={canRemoveDay}
              exportPoster={exportPoster}
              clearPlan={clearPlan}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1 space-y-4 no-print" aria-label="Controls and catalog">
            <div className="rounded-2xl bg-card p-4 border">
              <h2 className="font-semibold mb-2">Activity Catalog</h2>
              <p className="text-sm text-muted-foreground mb-3">Click to add to <span className="font-medium">{currentDay}</span> or drag into any day.</p>
              <ActivityCatalog onAdd={onAddBase} />
            </div>
            {longWeekendHints.length > 0 && (
              <div className="rounded-2xl bg-card p-4 border">
                <h3 className="font-semibold">Upcoming Long Weekends</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {longWeekendHints.map(h => <li key={h.date} className="flex items-center gap-2"><span>⭐</span><span>{h.label} — <span className="font-mono">{h.date}</span></span></li>)}
                </ul>
              </div>
            )}
            <div className="rounded-2xl bg-card p-4 border">
              <h3 className="font-semibold">Legend</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {MOODS.slice(0, 8).map(m => (
                  <div key={m.id} className="px-2 py-1 rounded-lg bg-muted flex items-center gap-2">
                    <span>{m.emoji}</span><span className="truncate">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2 space-y-4">
            <div className="pd-4 bg-card print-as-poster" ref={posterRef}>
              <div className="grid md:grid-cols-2 gap-4">
                {days.map(day => (
                  <DayColumn
                    key={day}
                    day={day}
                    items={schedule[day] ?? []}
                    onRemove={onRemove}
                    onEdit={onEdit}
                    onDropItem={onDropItem}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onReorder={reorder}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto p-4 text-xs text-muted-foreground flex flex-wrap gap-2 justify-between">
          <span>Made with ❤ Happy Weekend !!!</span>
          <span>Data saved locally · Works offline (basic)</span>
        </div>
      </footer>
    </div>
  )
}
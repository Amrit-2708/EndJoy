import React from 'react'

export default function Toolbar({ theme, setTheme, addDay, removeDay, canRemoveDay, exportPoster, clearPlan }) {
  return (
    <div className="sm:flex sm:flex-wrap sm:items-center gap-2">
      <div className="sm:w-auto w-full flex items-center gap-2 rounded-2xl border p-2 bg-card">
        <span className="text-sm px-2">Theme</span>
        <div className="relative flex-1">
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="w-full rounded-xl border px-3 py-1.5 bg-card pr-8 appearance-none"
          >
            <option value="system">System</option>
            <option value="lazy">Lazy Weekend</option>
          </select>

          {/* custom arrow */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            ▼
          </span>
        </div>
      </div>

      <div className="sm:w-auto w-full flex items-center gap-2 rounded-2xl border p-2 bg-card">
        <button className="px-3 py-1.5 rounded-xl bg-primary/90 text-white hover:opacity-90" onClick={() => addDay('Friday')}>+ Friday</button>
        <button className="px-3 py-1.5 rounded-xl bg-primary/90 text-white hover:opacity-90" onClick={() => addDay('Monday')}>+ Monday</button>
        <button disabled={!canRemoveDay} className="px-3 py-1.5 rounded-xl bg-accent hover:opacity-90 disabled:opacity-50" onClick={removeDay}>Remove last day</button>
      </div>

      <div className="sm:ml-auto sm:flex sm:flex-row sm:gap-2 flex flex-col gap-2 mt-2">
        <button className="sm:w-auto w-full px-3 py-1.5 rounded-xl bg-accent hover:opacity-90" onClick={exportPoster}>Export Poster</button>
        <button className="sm:w-auto w-full px-3 py-1.5 rounded-xl bg-red-500 text-white hover:opacity-90" onClick={clearPlan}>Clear Plan</button>
      </div>
    </div>
  )
}

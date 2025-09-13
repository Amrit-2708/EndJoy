import React from 'react'
import ActivityCard from './ActivityCard.jsx'

export default function DayColumn({ day, items, onRemove, onEdit, onDropItem, onDragOver, onDragStart, onReorder }) {
  return (
    <section className="rounded-2xl bg-card p-3 border min-h-[400px]" aria-label={day} role="list"
      onDragOver={onDragOver}
      onDrop={(e) => onDropItem(e, day)}
    >
      <header className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{day}</h3>
        <span className="text-xs text-muted-foreground">{items.length} activities</span>
      </header>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <ActivityCard
            key={it.uid}
            item={it}
            onRemove={() => onRemove(day, it.uid)}
            onEdit={() => onEdit(day, it.uid)}
            draggableProps={{
              onDragStart: (e) => onDragStart(e, day, idx, it.uid),
              onDragEnd: (e) => e.preventDefault()
            }}
          />
        ))}
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground rounded-xl border border-dashed p-6 text-center">
            Drag items here or add from catalog
          </div>
        )}
      </div>
    </section>
  )
}

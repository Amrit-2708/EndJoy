import React from 'react'

export default function ActivityCard({ item, onRemove, onEdit, draggableProps, isDragging }) {
  return (
    <div
      className={`rounded-xl shadow-soft p-3 bg-card border hover:shadow transition
        ${isDragging ? 'ring-2 ring-primary' : ''}`}
      draggable
      {...draggableProps}
      role="listitem"
      aria-roledescription="Draggable activity"
      aria-label={item.name}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{item.name}</div>
          <div className="text-sm text-muted-foreground flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-muted">{item.category}</span>
            <span className="px-2 py-0.5 rounded-full bg-muted">{item.duration}min</span>
            {item.mood && <span className="px-2 py-0.5 rounded-full bg-muted">{item.moodEmoji} {item.mood}</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-sm px-2 py-1 rounded-lg bg-accent hover:opacity-90" onClick={() => onEdit(item)} aria-label="Edit activity">Edit</button>
          <button className="text-sm px-2 py-1 rounded-lg bg-red-500 text-white hover:opacity-90" onClick={() => onRemove(item)} aria-label="Remove activity">Remove</button>
        </div>
      </div>
    </div>
  )
}

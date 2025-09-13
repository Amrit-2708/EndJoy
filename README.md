# EndJoy — Weekend Planner

A playful, responsive weekend planner with drag-and-drop, moods, themes, export-to-image, and local persistence.

## Quick start
```bash
npm install
npm run dev
```
Visit the printed dev URL.


## Features implemented
- Browse 60+ activities (search + filter; virtualized with `react-window`)
- Add to Saturday/Sunday schedule
- Edit/remove items
- Drag-and-drop across days (native HTML5)
- Mood tracking per activity (emoji + label)
- Personalization: themes (System/lazy weekend)
- Long-weekend support: add Friday/Monday with one click
- Export poster as PNG (using `html-to-image`) and Print to PDF
- Persistence via `localStorage`
- Offline-friendly (basic) via service worker
- Accessible: semantic roles, aria labels; keyboard friendly inputs
- Scales smoothly with 50+ activities

> Note: Holiday awareness uses a tiny placeholder list in `src/utils/longWeekends.js`. Replace it with a proper calendar API if needed.

## Folder structure
- `src/lib/planner.js` ➜ pure functions (tested with Vitest)
- `src/components/*` ➜ UI building blocks
- `src/utils/activities.js` ➜ data and mood catalog
- `public/service-worker.js` ➜ simple cache-first SW

## Keyboard tips
- In catalog, type to search then press Enter on an item to add.
- Use the Edit button on a card to change duration/mood/notes/link.
- Print from the header (🖨️) or Export Poster to PNG.

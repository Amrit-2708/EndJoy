# EndJoy — Weekend Planner

EndJoy is an interactive weekend planner that helps you organize your free time by simply selecting activities and arranging them into a personalized weekend schedule. The idea was to make planning fun, intuitive, and visually engaging.

👉 [Live Demo](https://endjoyweekendplanner.vercel.app/) 

## 🚀 Features implemented
- **Activity Catalog** – Browse, search, and filter activities by category.
- **Wide range of categories to choose from** - Browse 60+ activities (search + filter; virtualized with `react-window`)
- **Add to Schedule** – Add activities to the currently selected day (default: Saturday).
- **Drag-and-Drop** – Reorder or move activities between days easily
- **Edit & Remove** – Modify activity details or remove them from the plan.
- **Long Weekend Support** – Add/remove extra days (e.g., Friday or Monday).
- **Themes** – System theme support + special Lazy Weekend(light/dark) mode.
- **Export & Share** – Export as poster or print as PDF.
- **Find Nearby** – Quick Google Maps search for activities.
- **Responsive UI** – Works beautifully across devices.
-  **Works offline** - Offline-friendly (basic) via service worker & Persistence via `localStorage`
- **Scalibilty** - Scales smoothly with 50+ activities

> Note: Holiday awareness uses a tiny placeholder list in `src/utils/longWeekends.js`. Replace it with a proper calendar API if needed.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS with custom design tokens
- **State Management**: React hooks (`useState`, `useEffect`, `useMemo`)
- **Utilities**: React Window for optimized activity list rendering
- **Deployment**: Vercel

---

## 📦 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/Amrit-2708/EndJoy.git
cd endjoy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

---

🧑‍💻 Author

Made with ❤️ by Amrit Raj


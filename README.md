# Users Search

A Next.js application that displays a searchable list of users with a favorites feature. Built with the App Router architecture, demonstrating the separation between Server and Client Components.

**[Live Demo](https://nextjs-users-search-git-main-antonstetsenkos-projects.vercel.app/)**

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **next-themes** — theme switching (light / dark / system)

## Features

- **Server-side data loading** — user list is fetched on the server with a simulated 1 s database delay (`setTimeout`).
- **URL-based search** — filtering happens via `?search=` query parameter, so search results are shareable via link. Input is debounced (300 ms).
- **Favorites** — each user has a toggle button; favorites are persisted in `localStorage` and do not trigger page reloads or server re-fetches.
- **Streaming UI** — the user list is wrapped in `<Suspense>` so the search input is interactive while data loads.
- **Theme switching** — light / dark / system, powered by `next-themes` with no flash on reload.

## Architecture

```
src/
├── app/
│   ├── globals.css        # Tailwind imports & dark mode config
│   ├── layout.tsx         # Root layout (Server Component)
│   └── page.tsx           # Main page  (Server Component)
├── components/
│   ├── FavoriteButton.tsx  # Client Component — toggle favorites
│   ├── Providers.tsx       # Client Component — theme provider wrapper
│   ├── SearchInput.tsx     # Client Component — search input with URL sync
│   ├── ThemeToggle.tsx     # Client Component — theme switcher
│   └── UserList.tsx        # Server Component — renders user cards
└── lib/
    ├── types.ts            # User interface
    └── users.ts            # Emulated database with getUsers()
```

### Server vs Client Components

| Component | Type | Why |
|---|---|---|
| `page.tsx` | Server | Fetches data, reads `searchParams`, orchestrates layout |
| `UserList.tsx` | Server | Pure presentational list, no interactivity needed |
| `SearchInput.tsx` | Client | Needs `useRouter`, `useSearchParams` for debounced URL-based search |
| `FavoriteButton.tsx` | Client | Needs `useSyncExternalStore` and `localStorage` for favorites toggle |
| `ThemeToggle.tsx` | Client | Needs `useTheme` from `next-themes` for theme switching |
| `Providers.tsx` | Client | Wraps children with `ThemeProvider` from `next-themes` |

Only the minimal interactive parts are marked as `"use client"`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

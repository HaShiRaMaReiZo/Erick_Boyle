# Erick Boyle — Portfolio

Dark neon glassmorphism portfolio built with **Vue 3**, **Vite**, **TypeScript**, and **Tailwind CSS**. Design matches the sidebar + hero video layout; content is based on [erickboyle.website](https://erickboyle.website/).

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Assets

| File | Purpose |
|------|---------|
| `public/videos/hero-loop.mp4` | Hero looping video (already copied) |
| `public/images/hero-frame.jpg` | First-frame fallback / reference |
| `public/images/avatar.jpg` | Sidebar profile photo |
| `public/images/projects/*.jpg` | Project card images |
| `public/cv.pdf` | Download CV button target |

The page uses a shared **space backdrop** (twinkling stars, nebula, floating rocks) so the video’s deep navy / purple / cyan scene blends with the rest of the UI.

Edit all copy, links, stats, and projects in [`src/data/portfolio.ts`](src/data/portfolio.ts).

## Project structure

- `src/components/layout/AppSidebar.vue` — fixed nav + socials
- `src/components/hero/` — hero copy + masked looping video
- `src/components/stats/StatsBar.vue` — metrics row
- `src/components/projects/` — featured + project cards
- `src/components/sections/` — About, Skills, Projects, Experience, Testimonials, Blog, Contact

## Notes

- Contact form opens the user’s email client via `mailto:` (no backend).
- Hero video uses `autoplay`, `muted`, `loop`, and `playsinline`, with a soft radial mask so it blends into the dark background.

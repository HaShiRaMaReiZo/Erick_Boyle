# Erick Boyle — Portfolio

Dark neon glassmorphism portfolio built with **Vue 3**, **Vite**, **TypeScript**, and **Tailwind CSS**.

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill VITE_EMAILJS_* values (see EmailJS section below)
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Contact form (EmailJS)

The contact form sends mail through [EmailJS](https://www.emailjs.com/) (same approach as `portfolio-new`).

1. Connect a Gmail service in EmailJS that delivers to **`zwemhanhtet2004@gmail.com`**.
2. Template variables must match: `{{name}}`, `{{email}}`, `{{title}}`, `{{message}}`, `{{time}}`.
3. Set **Reply To** to `{{email}}`.
4. Add env vars (Vite prefix):

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Local: `.env.local` (gitignored).  
Production: set the same three keys in the Vercel project **Environment Variables**.

## Deploy on Vercel

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo.
3. Framework preset: **Vite** (or leave auto-detect). Build: `npm run build`, Output: `dist`.
4. Add the three `VITE_EMAILJS_*` environment variables → Redeploy.
5. Optional: confirm `public/Zwe_Mhan_Htet_Resume.pdf` is present so **Resume** downloads work.

`vercel.json` is included for SPA rewrites.

## Assets

| File | Purpose |
|------|---------|
| `public/videos/hero-loop.orig.mp4` | Hero looping video |
| `public/images/avatar.jpg` | Sidebar profile photo |
| `public/Zwe_Mhan_Htet_Resume.pdf` | Resume download (`portfolio.cvUrl`) |

Edit copy, links, stats, and projects in [`src/data/portfolio.ts`](src/data/portfolio.ts).

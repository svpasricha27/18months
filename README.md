# Eighteen Months — Anniversary Site

A password-protected, time-locked schedule for Anjali. Each chapter unlocks at
its real moment on **Friday, July 31, 2026 (Toronto time)**.

- **Password:** `sleezy`
- **Your private preview:** add `?preview=sachin31` to the URL to unlock every
  chapter early for proofreading. Share the plain URL (no `?preview=`) with her.

## Edit anything
Open `src/App.jsx`. The top has the settings (password, preview token, date).
The whole day lives in the `CHAPTERS` array below — times, titles, wording,
addresses, and which photos show on each. Photos live in `public/photos/` and
are referenced by filename (e.g. `c01.jpg`). To change the "kiss" finale photo,
edit the last chapter's `photos` list.

## Deploy to Vercel
Easiest (no terminal):
1. vercel.com -> Add New -> Project.
2. Drag this whole folder in, or push to a GitHub repo and import it.
3. Framework preset: Vite (auto-detected). Build `npm run build`, output `dist`.
4. Deploy, then add your custom domain under Settings -> Domains.

With the CLI:
    npm install
    npm run build
    vercel --prod

## Run locally
    npm install
    npm run dev

## Notes
- Timezone offset (-04:00, EDT) is baked in, so chapters unlock at the correct
  Toronto minute regardless of her phone's timezone.
- The page is set to noindex.
- The password is client-side only (light protection, not bank-grade security).

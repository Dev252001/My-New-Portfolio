# Devashish Pandey — Portfolio

Personal portfolio site built with **Vite + React + TypeScript + Tailwind CSS**.

## Tech stack

| Tool | Purpose |
|---|---|
| Vite + React + TypeScript | Build tooling & UI |
| Tailwind CSS v3 | Utility-first styling with CSS-variable design tokens |
| Framer Motion | Scroll animations, layout transitions, parallax |
| react-icons (Simple Icons) | Brand/tech logos in skill tiles |
| lucide-react | Generic UI icons |
| Inter + JetBrains Mono | Typography (Google Fonts, `display=swap`) |

---

## Quick start

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## How to edit content

All content lives in **`src/data/`** — components contain zero hard-coded text.

| File | What it controls |
|---|---|
| `src/data/site.ts` | Nav, hero, tagline, about, contact, footer, GitHub username |
| `src/data/projects.ts` | Project cards (title, tag, description, URLs) |
| `src/data/experience.ts` | Experience rows (company, role, description, date) |
| `src/data/skills.ts` | Skill tiles (name, descriptor, icon, brand colour) |

### Common edits

**Set your GitHub username** — in `src/data/site.ts`:
```ts
githubUsername: 'your-github-handle',
```
This loads your live followers, repos, and contribution calendar automatically.

**Fill in contact details** — in `src/data/site.ts`:
```ts
contact: {
  city: 'Greater Noida',
  email: 'you@example.com',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
  x: 'https://x.com/your-handle',   // optional
},
```
Any field that is a real URL becomes a live link automatically.

**Add a project** — append to `src/data/projects.ts`:
```ts
{
  id: 'my-new-project',
  title: 'MY NEW PROJECT',
  tag: 'Web',           // or 'AI/ML'
  description: 'One-line description.',
  githubUrl: 'https://github.com/...',
  demoUrl: 'https://...',
}
```

**Mark a project as featured** — set `featured: true` on the first entry (only one featured card is shown at a time; it renders centred above the grid).

---

## Swapping images

| Image | Path | Notes |
|---|---|---|
| Portrait | `public/images/portrait.jpg` | 4:5 aspect ratio recommended (~860×1075px) |
| Experience photo | replace `PlaceholderImage variant="landscape"` in `Experience.tsx` with a real `<img>` | 4:5 |
| Contact photo | replace `PlaceholderImage variant="contact"` in `Contact.tsx` with a real `<img>` | ~400×490px |
| Project screenshots | replace `<ProjectScreenshot>` in card components with `<img>` | 16:9 for grid cards |
| Resume | `public/resume.pdf` | Linked from the hero CTA |
| OG image | `public/og-image.png` | 1200×630px recommended |

All placeholder components are `src/components/shared/PlaceholderImage.tsx` and `src/components/shared/ProjectScreenshot.tsx` — drop real images at the paths above and the components will display them automatically.

---

## Design tokens

Tokens are CSS variables in `src/styles/globals.css` under `:root` (light) and `.dark`.
Tailwind classes reference them via `bg-bg`, `text-ink`, `text-muted`, `bg-surface`, etc.

To change a colour, edit the variable — no component changes needed.

---

## Dark mode

- Defaults to the OS preference (`prefers-color-scheme`).
- User's choice is persisted in `localStorage`.
- Toggle via the moon/sun icon in the nav.
- All colour transitions cross-fade in 300ms.

---

## Deploy to Vercel

1. Push the `portfolio/` folder (or its contents) to a GitHub repo.
2. Import the repo at [vercel.com](https://vercel.com).
3. **Framework preset:** Vite — Vercel detects it automatically.
4. **Root directory:** set to `portfolio` if the repo root is the monorepo.
5. Click **Deploy**.

## Deploy to Netlify

1. Push to GitHub.
2. **New site → Import from Git** at [app.netlify.com](https://app.netlify.com).
3. **Build command:** `npm run build`
4. **Publish directory:** `dist`
5. Click **Deploy site**.

---

## Folder structure

```
src/
├── data/           ← all content (edit here)
├── hooks/          ← useFitText, useActiveSection, useTheme, useGitHub
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects/
│   ├── Experience/
│   ├── Skills/
│   ├── GitHub/
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── shared/     ← SectionTitle, FadeUp, PlaceholderImage, ProjectScreenshot
└── styles/
    └── globals.css ← design tokens + base styles
```

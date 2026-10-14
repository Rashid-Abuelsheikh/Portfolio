# Rashid Abu Elsheikh — Portfolio

Personal portfolio. Next.js 14 (App Router) + TypeScript + Tailwind CSS.
Three parts of the page actually run: a schema explorer, a CTF design case,
and a live BB84 simulation ported from the original Python.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Project layout

```
app/
  layout.tsx       fonts (Archivo + JetBrains Mono via next/font), metadata, no-flash theme
  page.tsx         assembles the sections
  globals.css      design tokens (light + dark) and component styles
components/
  Rail.tsx         left nav, scroll-spy, theme toggle, ⌘K trigger   (client)
  TopBar.tsx       mobile header + theme toggle                      (client)
  Hero.tsx         hero + Amman clock                                (client)
  SchemaExplorer.tsx   15-module / 72-table explorer                (client)
  Decisions.tsx    three defended database decisions                 (client)
  BB84.tsx         live BB84 simulation                              (client)
  CommandPalette.tsx   ⌘K / Ctrl-K palette                          (client)
  Sections.tsx     Profile, Experience, Database, Vault, BB84 wrap,
                   Other work, Training, Skills, Contact             (server)
lib/
  content.ts       all copy and data in one place
  bb84.ts          the BB84 algorithm (faithful port of the Python)
  theme.ts         light/dark toggle helper
```

## Editing content

All text, the schema modules, the project write-ups, training and skills live
in `lib/content.ts`. Change copy there; the components read from it.
Links (GitHub, LinkedIn, email) are the `profile` object at the top.

## Theming

Colors are CSS variables in `app/globals.css`, defined once on `:root` and
again for dark mode (both the system preference and an explicit `data-theme`).
Tailwind is wired to those variables in `tailwind.config.ts`, so utilities like
`text-ink` or `bg-card` resolve to the same tokens if you extend the page.
Dark mode follows the OS setting and can be toggled; the choice is saved.

## Deploy

Zero-config on Vercel. For any Node host, `npm run build && npm start`.
For a fully static export, add `output: "export"` to `next.config.mjs`.

# Kaung Myat San — Portfolio

A responsive Next.js App Router portfolio based on the supplied résumé. Includes project category filters, project detail dialogs, career history, a skills section, email actions, and a downloadable résumé.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` followed by `npm start`.

## Edit content

Portfolio content is in `app/page.tsx`, styling in `app/globals.css`, and metadata in `app/layout.tsx`. Replace `public/Kaung_Myat_San.pdf` when updating the downloadable résumé. Project visuals are illustrative UI compositions, not screenshots of the original products. Google Fonts load progressively, with system font fallbacks.

Checks: `npm run typecheck` and `npm run build`.

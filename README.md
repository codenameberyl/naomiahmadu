# Naomi Ahmadu — portfolio

Personal portfolio for Naomi Ahmadu, Creative Marketer & Account Manager.
Built with Next.js (App Router, TypeScript), Tailwind CSS v4 and Motion,
deployed on Vercel.

Design direction: **A · Editorial** (Fraunces + Instrument Sans, linen /
ink / terracotta). The Phase 1 comparison mock is kept in
`design-preview/index.html`.

## Run it

Requires Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint
npm run typecheck    # generate route types, then tsc
npm run format       # Prettier (with Tailwind class sorting)
```

## Edit content

All copy lives in typed files in `content/`. Components never hard-code it.

| File                 | What it holds                                              |
| -------------------- | ---------------------------------------------------------- |
| `content/site.ts`    | Name, title, contact details, nav items, footer            |
| `content/home.ts`    | Hero, metrics strip, client names, "How I work"            |
| `content/work.ts`    | Work page intro and the four roles (also the case studies) |
| `content/about.ts`   | About page, pull quote, strengths                          |
| `content/contact.ts` | Contact page and its links                                 |
| `content/types.ts`   | The types the files above must satisfy                     |

Change the text, save, and the dev server reloads. TypeScript flags a
missing or misspelt field.

Media files live in `public/assets/`. Video posters are in
`public/assets/posters/`. Each video has an MP4 (H.264) and a WebM (VP9)
fallback for browsers without H.264.

## Add a case-study field

Every role in `content/work.ts` becomes a page at `/work/<slug>`. Four
optional fields are already supported and render only when present:

```ts
{
  slug: "smartmark",
  // ...existing fields...
  challenge: ["What the situation was going in."],
  approach: ["How the work was approached."],
  results: ["Results in prose, alongside the outcome chips."],
  gallery: [
    { kind: "image", src: "/assets/extra.jpg", width: 1200, height: 900, alt: "Describe the image" },
  ],
}
```

To add a brand-new field:

1. Add it as optional to the `Role` type in `content/types.ts`.
2. Render it in `app/work/[slug]/page.tsx`, guarded so nothing shows when
   it is missing. `OptionalProse` in that file handles plain paragraphs.
3. Fill it in for the roles that have it in `content/work.ts`.

To add a role, add an object to the `roles` array. The page, sitemap entry
and previous/next links are generated from it.

## Theme

Light, dark and system are supported. A small inline script in
`app/layout.tsx` (from `lib/theme.ts`) sets `data-theme` on `<html>` before
first paint, so there is no flash. Colour tokens live at the top of
`app/globals.css`, with contrast ratios noted.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js** (detected automatically). Leave the build
   command (`next build`), output directory and install command (`npm install`)
   at their defaults.
4. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` set to the
   final domain (for example `https://naomiahmadu.vercel.app`), for the
   Production environment.
5. Deploy.
6. In the project, open **Analytics** and **Speed Insights** and enable
   both. The components are already in the layout.
7. To use a custom domain, add it under **Settings → Domains** and follow
   Vercel's DNS instructions. Then update `NEXT_PUBLIC_SITE_URL` and
   redeploy.

The live Netlify site is separate and is not touched by any of this.

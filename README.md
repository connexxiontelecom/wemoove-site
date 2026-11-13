# WeMoove website (Next.js)

Marketing site for WeMoove. Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Editing content

All copy, links and contact details live in `src/content/*.ts`. Values in `[SQUARE_BRACKETS]`
are placeholders that must be replaced before launch.

## Production build and cPanel deployment

`npm run build` creates a self-contained server in `.next/standalone/` (with `public/` and
static files copied in). `npm start` runs it locally.

On cPanel ("Setup Node.js App"):

1. Run `npm run build` (locally or on the server).
2. Upload the contents of `.next/standalone/` as the application root.
3. Set the application startup file to `server.js`.
4. Add `NEXT_PUBLIC_SITE_URL` (the live domain, e.g. https://example.com) as an environment variable.
   Note that `NEXT_PUBLIC_*` values are baked in at build time, so set it before building too.
5. Restart the app. cPanel sets `PORT` automatically.

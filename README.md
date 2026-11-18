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

The cPanel server only has Node.js 16, and Next.js 16 needs 20.9+, so the live site is deployed as a
**static export**: plain HTML/CSS/JS that Apache serves directly, with no Node.js app.

```bash
NEXT_PUBLIC_SITE_URL=https://wemooveinc.com npm run build:static   # writes out/
cd out && zip -qr ../wemoove-site-static.zip .                       # includes .htaccess
```

Upload the zip to the domain's document root in cPanel File Manager and extract it. `public/.htaccess`
(copied into `out/`) handles https, the `/safety` redirect, trailing slashes, caching and the 404 page.
For the main domain, unregister the old Express app in **Application Manager** first, or Passenger keeps
answering instead of Apache.

What the static export can't do: on-the-fly image resizing (images are served as-is) and server
redirects (done in `.htaccess` instead). The footer year is set at build time, so rebuild each January.

`npm run build` still makes the Node.js server build (`.next/standalone/`, start with `node server.js`),
used by Vercel and by any host with Node 20.9+.

## Brand assets

The full WeMoove logo kit lives in `public/brand/` (SVG and PNG for every version).
Which version to use:

| Background | Use |
|---|---|
| White / light | `01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg` (navbar) |
| Dark | `01_Logo/Horizontal/WeMoove_Logo_Horizontal_Reversed.svg` (footer) |
| Amber, or one-colour print | `..._Black` versions |
| Small square spaces | `03_Icon/` (the pin) |

The browser tab icon (`src/app/icon.svg`), home-screen icon (`src/app/apple-icon.png`) and
link-preview image (`src/app/opengraph-image.png`) are copies from this kit.

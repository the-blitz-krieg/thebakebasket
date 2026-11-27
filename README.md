# thebakebasket.com

Static website for The Bake Basket by Priya, a home bakery in Madhavaram, Chennai. Plain HTML, one CSS file and one small script: no CMS, no database, no login page, nothing on the server to break into.

## Staging first

The site currently runs at **https://staging.thebakebasket.com** for review. The staging build (`python3 sitebuild.py staging`) is identical to production except that every page carries `noindex,nofollow`, `robots.txt` disallows all crawlers, and `CNAME` is `staging.thebakebasket.com`. Canonical URLs, Open Graph URLs, schema and the sitemap already point at `https://thebakebasket.com`, so going live is a rebuild with `python3 sitebuild.py prod`, a push, and a DNS change from the staging record to the apex records below.

## Deploy on GitHub Pages

1. Create a repository (for example `thebakebasket.com`) and upload the contents of this folder to the root of the `main` branch. Keep the hidden files `.nojekyll` and `.well-known/`.
2. Repository Settings, Pages: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The `CNAME` file already contains `thebakebasket.com`. At your DNS provider (or Cloudflare), point the apex domain to GitHub Pages (A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and `www` as a CNAME to `<your-github-username>.github.io`. Then tick "Enforce HTTPS".
4. Canonical URLs use `https://thebakebasket.com` (no www). GitHub redirects www to the apex automatically once both records exist.

## Analytics

- Google Tag Manager container `GTM-NSJZGD9X` is installed in the `<head>` and `<noscript>` positions of every page.
- Inside GTM, add a **Google tag** with measurement ID `G-DWQREQ9K8F`, firing on All Pages. Do not also hard-code gtag.js, or visits will be counted twice.
- The site pushes these dataLayer events, ready to use as GTM triggers and GA4 key events: `whatsapp_click`, `call_click`, `email_click` (with `link_location` and `page_path`).
- Your brief also listed `GTM-WZW6HP6G` as a "measurement ID". That is a GTM container ID format, not a GA4 ID, so it is not installed. Tell me if it should replace `GTM-NSJZGD9X`.

## Security

- Every page carries a strict Content Security Policy (meta tag) allowing only this site, Google Tag Manager, Google Analytics and the Google Maps embed. The GTM snippet is allowed by its SHA-256 hash, not by `unsafe-inline`. If you add Custom HTML tags in GTM that inject inline scripts, they will be blocked by design.
- GitHub Pages cannot send custom HTTP headers. Put the domain behind Cloudflare (free plan) and add these response headers with a Transform Rule:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Frame-Options: DENY` and `Content-Security-Policy: frame-ancestors 'none'` (frame-ancestors cannot be set in a meta tag)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  - `Cross-Origin-Opener-Policy: same-origin`
- Turn on two-factor sign-in for GitHub, the domain registrar, Cloudflare and Google. Turn on registrar lock and DNSSEC.
- Set SPF, DKIM and DMARC for hello@thebakebasket.com so nobody can send fake payment requests from your domain.
- `/.well-known/security.txt` gives researchers a contact address.

## AI and search files

- `robots.txt`: every major search engine and AI crawler allowed by name; Internet Archive, Wayback and Heritrix agents blocked (with case and version variants).
- `sitemap.xml`: all 86 indexable URLs.
- `llms.txt` and `llms-full.txt`: llmstxt.org summary and full text, linked from every page's `<head>`.
- Schema.org JSON-LD on every page: Bakery/LocalBusiness with address, geo and opening days, WebSite, BreadcrumbList, FAQPage, BlogPosting, CollectionPage, HowTo, OfferCatalog, Person and ProfilePage.

## Still to supply

1. **Exact map pin.** The schema and geo tags use an approximate point for Madhavaram (13.1488, 80.2306). Copy the exact coordinates from the Google Business Profile into `site_data.py` and rebuild.
2. **Opening times.** Only the days are known (Monday to Saturday, closed Sunday). Add times to the schema once Priya confirms them.
3. **Social profile URLs** (Instagram, Facebook, YouTube, Pinterest, LinkedIn, X). Add them to `SITE['social']`; they then appear in the footer and in `sameAs`.
4. **Real photos** for the photo slots: Priya in her kitchen, and celebration photos shared with permission.
5. **Reviews page:** add it once there are at least five real Google reviews.
6. A lawyer's read of the privacy, terms and cancellation pages.

## Adding the weekly blog posts

The source package (`thebakebasket-source.zip`) has the content in Markdown and the build scripts. Add posts in the same format to a new `live/blog-09.md` file, then run `python3 make_live.py` (if editing the original content) and `python3 sitebuild.py prod`. Posts, category pages, the sitemap, the llms files and the OG images all regenerate.

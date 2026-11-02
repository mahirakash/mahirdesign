# mahir.design (v2)

Personal portfolio of Mahir Abrar Akash. Static site, no build step: white/black editorial design, Geist + Instrument Serif, GSAP + Lenis from CDN.

## Pages (hash routes, one `index.html`)
| Route | Page | Linked from the site? |
|---|---|---|
| `/` | Home: hero, clients, about, selected work, how I work, services, design archives, contact | yes |
| `#case-skribe` `#case-vendidit` `#case-sendwin` | Case studies | yes (Work list) |
| `#dashboards` | Dashboard & admin systems | yes (Work list) |
| `#signaldesk` | SignalDesk interactive demo | yes (Work list) |
| `#team` | Team | **no** (built, intentionally unlinked) |

## Files
```
index.html            home markup + contact + footer
assets/site.css       all styles
assets/site.js        interactions, page templates, router, case/team/dashboard data
assets/signaldesk.*   SignalDesk demo (fictional data)
assets/img|work|dash|team|logos|archive   images (500px copies taken from Webflow)
scripts/fetch-hires.sh  optional build step: swaps in hi-res originals from the Webflow CDN
_headers              Cloudflare Pages caching/security headers
```

## Editing content
- Case studies, dashboards, team: the `CASES`, `DASHES`, `LEAD/AWS/MORE` objects at the top of `assets/site.js`.
- Everything on the home page: `index.html`.
- Contact form: by default it opens WhatsApp with the message pre-filled. To get submissions by email instead, create a free key at web3forms.com and paste it into `CONFIG.web3formsKey` in `assets/site.js`.

## Deploy on Cloudflare Pages (free)
1. Push this folder to a GitHub repo (e.g. `mahirakash/mahirdesign`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: `bash scripts/fetch-hires.sh` (or leave empty). Output directory: `/`.
4. Deploy, check the `*.pages.dev` URL.
5. Custom domains → add `mahir.design` and `www.mahir.design`, then update DNS as Cloudflare instructs.
6. Only after the new site is live on the domain: cancel the Webflow site plan.

Run locally: `python3 -m http.server 8080`

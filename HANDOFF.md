# Love Lakewood Sunday — handoff

Everything the planning team needs to finish, run, and maintain the site.
No code knowledge required for anything in "What we still need from you."

---

## What we still need from you

Each item has one place to change it. Nothing else breaks while you wait — every
one of these has a designed placeholder state that already looks intentional.

### Content

| #   | What                                         | Where it goes                                                                                                      | Currently                                                         |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| 1   | **The shared event graphic**                 | Put the file in `static/`, then set `media.eventGraphic` in `src/lib/config/site.ts` (e.g. `'/event-graphic.jpg'`) | Hero is typographic only; share kit shows a "coming soon" note    |
| 2   | **Pastor welcome video**                     | Paste the YouTube or Vimeo link into `media.welcomeVideo`                                                          | Shows "The welcome video is being filmed"                         |
| 3   | **Parking map / diagram**                    | Put in `static/`, set `media.parkingMap`                                                                           | Parking card shows the written directions only                    |
| 4   | **Church logos**                             | Put in `static/churches/`, set `logo` on each church in `src/lib/data/churches.ts`                                 | Uniform initial tiles (GF, LV, SP, BC, WW)                        |
| 5   | **Siete Pilares website + address**          | `src/lib/data/churches.ts`                                                                                         | Card reads "Website and service times coming soon"                |
| 6   | **Westwoods service times**                  | `src/lib/data/churches.ts`                                                                                         | Times omitted — sources disagreed, so nothing was published       |
| 7   | **One sentence per church, written by them** | `blurb` field in `src/lib/data/churches.ts`                                                                        | Omitted — we deliberately did not put words in any church's mouth |
| 8   | **Real contact inbox**                       | `site.contactEmail` in `src/lib/config/site.ts`                                                                    | Placeholder `hello@lovelakewoodsunday.org`                        |
| 9   | **Social share image** (1200×630)            | Save as `static/og-image.png`                                                                                      | Referenced but not yet present — link previews will have no image |

### Please double-check

- **Doors open at 9:30 a.m.** — we wrote this to support the "arrive 15–20 minutes
  early" guidance, but nobody confirmed a door time. Change or remove it in
  `event.arriveBy`.
- **Church details** were taken from each church's own website in August 2026.
  Confirmed: The Bridge at Bear Creek (8:45 & 10:30), Grace Fellowship (9:00 &
  10:30), Lakewood Vineyard (10:00). Ask each church to sign off before launch —
  service times change.
- **Venue address**: 9800 W Dartmouth Pl, Lakewood, CO 80227 (confirmed with Jeffco).

### Adding a church later

Append to the array in `src/lib/data/churches.ts`. It automatically appears in
the header count, the "Hosted together" row, the "Find a church" cards, and the
footer. **Keep the list alphabetical** — it is rendered in file order, and equal
billing is the whole point of the design.

---

## Answers to the questions in the brief

**"Should we do a Plan Your Visit button?"** Yes — it's the primary hero button
and the first nav item. That section is where a nervous first-time guest goes.

**"How hard is it to include copy/text/email/social share buttons?"** Done.
`/#invite` has copy-link, text, email, Facebook, and X, plus the native phone
share sheet when the browser offers one. Every link carries a `utm_source` so you
can see which channel actually brought people.

**"Any chance the site could provide an invitation link the churches can share?"**
Yes — `/share` is a share kit built for the churches: the link, a downloadable QR
code (SVG for print, PNG for slides), and four pieces of ready-to-paste wording
(text, social, bulletin, email). Not linked from the main nav, since it's for
staff, not guests — it's in the footer and excluded from search engines.

**"Do we need a contact form?"** Included, with the exact fields you listed.

**"Maybe display each church's logo?"** Built for it — drop logo files in and they
replace the initial tiles. Until then every church gets an identical treatment.

---

## Pages

| Route                | What it is                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | The whole event: hero, invitation, plan your visit, what to expect, kids & dress, pastor video, churches, volunteer, invite, find a church, FAQ, contact |
| `/volunteer`         | "Serve at Love Lakewood Sunday" — role picker + contact details                                                                                          |
| `/share`             | Share kit for participating churches (not indexed by search engines)                                                                                     |
| `/invite`            | Short link → redirects to the home page. Good for print and pulpit                                                                                       |
| `/event.ics`         | "Add to your calendar" download                                                                                                                          |
| `/qr.svg`, `/qr.png` | QR codes for the invitation link. `?source=bulletin` tags the scan                                                                                       |
| `/sitemap.xml`       | For search engines                                                                                                                                       |

Short links configured in `netlify.toml`: `/serve` and `/volunteers` → `/volunteer`,
`/faq` → the FAQ section, `/qr` → a print-ready PNG.

---

## Where form submissions go

Both forms write to Postgres (Neon). Nothing is ever lost, even if email is not
set up.

- Volunteers → `volunteer_signup` table
- Contact questions → `contact_message` table

**To read them:** run `pnpm db:studio` and open the table. Each row has a checkbox
column — `contacted` for volunteers, `answered` for questions — so whoever works
the list can mark people off and nobody gets contacted twice.

**To also get an email on every submission** (recommended), set these environment
variables in Netlify:

```
NOTIFY_EMAIL=whoever@example.com
RESEND_API_KEY=re_xxxxxxxx
NOTIFY_FROM=Love Lakewood Sunday <hello@lovelakewoodsunday.org>
```

`NOTIFY_EMAIL` accepts a comma-separated list. Without these, submissions are still
saved and are simply logged to the server. Replies go straight to the person who
wrote in.

### Spam protection

Two quiet checks that cost real visitors nothing: a hidden field people never see,
and a timestamp (anything submitted in under 2.5 seconds is a bot). Blocked
submissions get a normal-looking success page so bots learn nothing, and no row is
written. No CAPTCHA — a puzzle at the door is the opposite of the tone here.

---

## Deploying

Set in Netlify's environment variables:

```
DATABASE_URL=postgresql://...        # the Neon connection string
ORIGIN=https://lovelakewoodsunday.org
BETTER_AUTH_SECRET=...               # any long random string
```

Then update `site.url` in `src/lib/config/site.ts` if the domain differs — it is
what the share links and QR codes point to.

```bash
pnpm run build
```

Requires pnpm 11 (`npx pnpm@11 <command>` works if your local pnpm is older).

---

## Design notes, so future edits stay on tone

- **No church is featured.** Alphabetical order, identical card treatment, no
  church's brand colors anywhere. The palette is a Colorado morning — cream, sand,
  foothill teal, sunrise amber — so it reads as the city's, not a congregation's.
- **The writing is aimed at the nervous guest**, not the regular attender. It says
  what will actually happen, in order, and answers "will I be singled out?" before
  anyone has to ask. Keep that voice: specific, plain, and unhurried.
- **Every promise on the page is one you have to keep** — no offering, no
  registration, no name tags, nobody singled out. If any of those change, change
  the site the same day.
- The map and the video only load when someone clicks them. That keeps Google's
  and YouTube's tracking off the page for everyone who never opens them, and the
  page stays fast on a phone in a parking lot.

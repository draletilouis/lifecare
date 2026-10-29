# Life Care Hospital, Arua: website

The public website for Life Care Hospital, a private hospital in Arua City, Uganda ("We care for your Life").

It uses the same stack as the Lefori `shopmaster-website`: plain HTML pages, one stylesheet, small vanilla
JavaScript modules, and a Node build script with no dependencies. `serve` hosts the pages as static files.
Nothing needs installing apart from Node 18 or newer.

## Run it

```bash
npm run dev
```

This builds the pages and serves them at http://localhost:8790.

| Command | What it does |
| --- | --- |
| `npm run build` | Regenerates every page from `data/` and the shared shell in `index.html` |
| `npm run check` | Fails if any page is out of date (use it in CI) |
| `npm start` | Builds (`--deploy`), then serves on `$PORT` (for Railway, Render or similar) |

## Where things live

```
index.html                 Homepage, and the source of the shared shell (head, icons, header, footer)
departments/index.html     Department directory, with search
departments/<slug>/        Department pages, GENERATED from data/departments.js (do not edit by hand)
emergency/                 Accident & Emergency: danger signs, where to go, what to do on the way
appointments/              Appointment request form
patients/                  Patient and visitor guide: what to bring, hours, paying, stays, visiting, rights, feedback
patients/international/    Coming from South Sudan, DR Congo or further away
packages/                  Health check packages
health/                    Health information hub
health/<slug>/             Health articles, GENERATED from data/articles.js
refer/                     For health workers: referral line and referral form
doctors/                   "Find a doctor", GENERATED from data/doctors.js (only once the list has entries)
about/                     Who we are, mission and values, team, quality and safety, careers
contact/                   Contact numbers, map, hours, enquiry form
privacy/                   Privacy notice (Data Protection and Privacy Act, 2019)
404.html                   Not-found page

data/site.js               Facts: phone numbers, email, address, hours, visiting, languages, payment, notices
data/departments.js        Departments and their content
data/articles.js           Health articles
data/packages.js           Health check packages
data/doctors.js            Doctor profiles (empty until real, consented profiles are added)
data/clinics.js            Specialist clinic days (empty until confirmed)
templates/                 Layouts of department, article and doctor pages
scripts/build.js           The build (see the comment at its top)
css/site.css               All styles
js/modules/                nav.js, ui.js, directory.js, request-form.js, checklist.js
assets/                    Logo (assets/brand), favicons, sharing image, photos, contact card (generated)
docs/                      Research notes behind the design
```

## Design

The look comes from studying the leading hospital websites: Mayo Clinic, Cleveland Clinic, Johns Hopkins,
Mass General Brigham, Cedars-Sinai, Karolinska, Singapore General, UCSF, Stanford, NYU Langone, Great Ormond
Street, Aga Khan and others. What it borrows from them:

- **Colour:** the logo's own blue (deepened to navy for the header bar, hero and footer) and its green
  (buttons and small marks), on white pages with light grey bands. Red is reserved for emergencies.
- **Type:** two faces made for health and accessibility: Parkinsans (commissioned by Parkinson's UK) for
  headings, and Atkinson Hyperlegible Next (made by the Braille Institute for low-vision readers) for text.
  Body text is 17px.
- **Accent and atmosphere:** one marigold accent (`--sun`), used only on dark bands; a faint woven chevron
  after Ugandan basketwork (`--weave`) behind the services band and the footer.
- **Motion:** the homepage hero arrives once on page load, headline first and figures last. Nothing waits
  for scrolling, and the motion is off for anyone who prefers reduced motion.
- **Photographs and lines:** real photographs, with thin rules and lists instead of icon tiles and boxes.
- **Task-led entry:** the homepage "I need …" finder, the "Where to go" routes and the family task cards.
- **Plain wording:** headings say what the section is ("Opening hours", "How to find us"), not slogans.

An earlier version used a serif with italic words, cream backgrounds, small uppercase labels above every
heading and slogan headlines. Together those read as AI-generated, so they were removed. Keep new pages
plain in the same way.

All styles are in `css/site.css`; the colours and fonts are the variables at its top.

A second study looked at Africa's top 10 hospitals (Groote Schuur, Kasr Al Ainy, Ain Shams, Tygerberg, Lagos
University Teaching Hospital, Aga Khan Nairobi, Aswan Heart Centre, Korle Bu, King Faisal Kigali and Netcare
Milpark) and seven leading private sites (Mediclinic, Life Healthcare, Evercare Lekki, Lagoon, The Nairobi
Hospital, Nyaho and Cleopatra). The notes are in `docs/research-african-hospitals.md`. What came from it:

- **For health workers:** a referral page with its own line and a form (`/refer/`), linked from the top bar.
- **Patients from neighbouring countries:** a page for people coming from South Sudan, DR Congo and further away.
- **Health information:** articles on malaria, antenatal care, danger signs in children, blood pressure
  and cholera, each marked "awaiting review" until a Life Care clinician signs it off (`reviewedBy`).
- **Health check packages,** which can be picked on the appointment form.
- **A "what to bring" checklist** that remembers ticks on the phone and can be shared on WhatsApp.
- **Visiting rules for each ward,** and a **"Save our numbers"** contact card (`assets/lifecare-hospital.vcf`).
- **Things that switch on once data exists:** a public-health notice (`alert.on`), figures and licences
  (`stats`, `accreditations`), the doctor directory (`data/doctors.js`) and clinic days (`data/clinics.js`).
  Each stays hidden while empty, so nothing unconfirmed is shown.

It also avoids what those sites often get wrong. Their homepages weigh 0.8–13.5 MB; this one is about 0.5 MB.
Some hide content behind scroll animations. Most treat WhatsApp as an afterthought, and none mentions
mobile money.

## Photographs

The photographs in `assets/photos/` are **placeholders** from Unsplash (free licence); see
`assets/photos/CREDITS.md`. Replace them with the hospital's own before launch. Each photo exists at two sizes
(`<name>-800.jpg` and `<name>-1600.jpg`); keep the names and the pages pick up the new files. A department's
photo is set by `photo` in `data/departments.js`.

## Editing content

- **Phone numbers, email, address, hours and other facts:** edit `data/site.js`, then run `npm run build`.
  On any page, an element marked `data-fact="phones.main"` shows that value, and `data-fact-href="tel:phones.main"`
  links to it. So each number is written in one place only.
- **Departments:** edit `data/departments.js`, then run `npm run build`. Adding an entry creates its page and
  adds it to the menus, the homepage, the directory, the appointment form and the sitemap.
- **Health articles, packages, doctors and clinic days:** edit the matching file in `data/`, then run
  `npm run build`. Each file explains its fields at the top.
- **A public-health notice on every page:** fill in `alert` in `data/site.js`, set `on: true`, and build.
  Set it back to `false` when the notice ends.
- **Header, footer or icons:** edit them in `index.html`, then run `npm run build` to copy them to every page.
- **Page text:** edit the page's `index.html` directly, outside the `<!-- shell:… -->` and `<!-- build:… -->` blocks.

## Appointment and contact forms

The forms (appointment, contact and referral) need no server. By default, a request opens WhatsApp with the
message already written and addressed to the hospital's WhatsApp number (`phones.whatsapp`). The patient,
or the referring health worker, then presses Send.

To receive requests by email instead, create a form on a form-delivery service such as
[Formspree](https://formspree.io). Then put its address in `FORM_ENDPOINT` at the top of
`js/modules/request-form.js`. If the service cannot be reached, WhatsApp is used as the fallback.

## Sample content (internal preview only)

Most facts are now real: the hospital confirmed its departments, hours and clinic days on 28 October 2026,
and its history, leadership, staff, contacts, address, visiting hours and insurers on 29 October. A few placeholders
remain for the internal preview:

- stock photos standing in for the building and its interior (the hospital is sending its own)
- two licences in `accreditations` in `data/site.js`
- initials in place of staff portraits. When the hospital sends a portrait, save it as
  `assets/doctors/<name>.jpg`, for example `anthony-luluwa.jpg` or `dr-odar-emmanuel.jpg`, and rebuild: it
  appears on the homepage, the directory, the department page and the About page with no other change.
  Every build lists the file names still missing. Crop to about 800 x 800 px and keep each under 400 KB.

While `sampleContent` in `data/site.js` is `true`:

- every page carries `noindex, nofollow`
- `robots.txt` blocks search engines

Before launch:

1. Replace each item with confirmed facts, or remove it. Never publish a stock photo under a real person's name.
2. Then set `sampleContent: false`.

## Before launch: details to confirm with the hospital

Every build prints this list from `PENDING` in `data/site.js`. The web address is still the reserved domain
`lifecare.example`, which Railway replaces with its public domain at deploy.

Still open on 29 October 2026:

1. Web address (domain), and a referral line and careers email if the hospital has them (they show reception and
   the main email for now).
2. The spelling of three insurers (Britam, Cigna, MTC), and whether UAP and UAP Uganda are one scheme.
3. Staff numbers: the history said about 57 staff; the figures given were 56 professional and 28 support staff.
4. The specialists for paediatrics, general surgery, ENT, the in-house physician, dental, ophthalmology and
   orthopaedics, and titles for the heads of departments.
5. Languages spoken by staff and by interpreters, accepted payment methods, and other currencies.
6. **Every service named on each department page**, especially the newer departments.
7. **Clinical sign-off of each health article** (`reviewedBy` in `data/articles.js`).
8. What each health check package includes, and its price.
9. How referrals are handled, and how the ambulance service works (calls, area covered, charges).

## Deploying

Any Node host that runs `npm start` with a `PORT` works (Railway, Render, a VPS). The start command builds
first, so a page that someone forgot to rebuild cannot go out stale. Cache headers are set in `serve.json`.
Once the real domain is set in `data/site.js`, submit `/sitemap.xml` to Google Search Console. Also
create a Google Business Profile for the hospital, so it appears on Google Maps.

/* Builds the site in place. Every page is plain HTML that "serve" sends as it is; this script
   only rewrites the parts that are shared between pages or come from the data files.

   1. Department pages: departments/<slug>/index.html is written from data/departments.js
      using templates/department.js.
   2. Build blocks: regions between <!-- build:NAME --> and <!-- /build:NAME --> (department
      menus, cards, form options, hours tables, structured data) are regenerated from data/.
   3. Facts: an element with data-fact="phones.main" gets its text from data/site.js, and
      data-fact-href="tel:phones.main" (or -src) its link, so a number is changed in one place.
   4. Shell: the head assets, icon sprite, header and footer are copied from index.html to
      every page, and each page's own links are marked as the current page.
   5. Page addresses: canonical and sharing links are set from site.url and the page's path.
   6. Asset stamps: local CSS and JS links get ?v=<hash of the file>, so browsers can cache
      them and still fetch a changed file at once.
   7. sitemap.xml, robots.txt and site.webmanifest are written from the page list.

   npm run build    update every page
   npm run check    exit with an error if any page is out of date
   npm start        builds (--deploy) and serves; a build error never stops the site starting

   Nothing is written unless every page passes its checks. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const fresh = (file) => {
  delete require.cache[require.resolve(file)];
  return require(file);
};
const site = fresh('../data/site.js');

// The address used for canonical links, sharing previews, the sitemap and the contact card.
// SITE_URL, if set, always wins. On Railway, while data/site.js still has the placeholder .example
// address, the deployment's own public domain is used instead, so shared links and previews work.
if (process.env.SITE_URL) {
  site.url = process.env.SITE_URL.replace(/\/+$/, '');
} else if (process.env.RAILWAY_PUBLIC_DOMAIN && new URL(site.url).hostname.endsWith('.example')) {
  site.url = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
}
const { CATEGORIES, DEPARTMENTS } = fresh('../data/departments.js');
const { ARTICLES } = fresh('../data/articles.js');
const { PACKAGES } = fresh('../data/packages.js');
const { DOCTORS } = fresh('../data/doctors.js');
const { CLINICS } = fresh('../data/clinics.js');
const renderDepartment = fresh('../templates/department.js');
const renderArticle = fresh('../templates/article.js');
const renderDoctors = fresh('../templates/doctors.js');

class BuildError extends Error {}

/* ---------------------------------------------------------------- helpers */

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function read(file) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return { text: null, eol: '\n' };
  const raw = fs.readFileSync(absolute, 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
}

function lookup(key) {
  const value = key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), facts);
  if (value === undefined || value === null || typeof value === 'object') {
    throw new BuildError(`data/site.js has no text value for "${key}".`);
  }
  return String(value);
}

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const facts = {
  ...site,
  year: String(new Date().getFullYear()),
  addressLine: [site.address.street, site.address.city, site.address.country].filter(Boolean).join(', '),
  // One service's opening hours, e.g. data-fact="hoursOf.outpatient-clinic"
  hoursOf: Object.fromEntries(site.hours.map((h) => [slug(h.service), h.time])),
};

const FORMATS = {
  text: (v) => v,
  tel: (v) => `tel:${v.replace(/[^\d+X]/gi, '')}`,
  wa: (v) => `https://wa.me/${v.replace(/[^\dX]/gi, '')}`,
  mailto: (v) => `mailto:${v}`,
  // Directions go to the hospital's own map pin when there is one, otherwise to a search for mapQuery.
  map: (v) => site.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
  mapembed: (v) => `https://maps.google.com/maps?q=${encodeURIComponent(v)}&z=15&output=embed`,
};

function resolve(spec, file) {
  const [format, key] = spec.includes(':') ? spec.split(':') : ['text', spec];
  if (!FORMATS[format]) throw new BuildError(`${file}: unknown fact format "${format}" in "${spec}".`);
  return FORMATS[format](lookup(key));
}

/* ---------------------------------------------------------------- pages */

const departmentPages = DEPARTMENTS.filter((d) => !d.href);
const deptUrl = (d) => d.href || `/departments/${d.slug}/`;

// Departments shown with a photograph in the homepage services band, in this order.
const HOME_SERVICES = ['maternity', 'paediatrics', 'surgery', 'obstetrics-gynaecology', 'physician', 'laboratory'];

// Pages with "render" are generated from data/; the others are written by hand.
const PAGES = [
  { file: 'index.html', url: '/', section: '/' },
  { file: 'departments/index.html', url: '/departments/', section: '/departments/' },
  ...departmentPages.map((d) => ({ file: `departments/${d.slug}/index.html`, url: deptUrl(d), section: '/departments/', render: (ctx) => renderDepartmentPage(d, ctx) })),
  ...(DOCTORS.length ? [{ file: 'doctors/index.html', url: '/doctors/', section: '/departments/', render: (ctx) => renderDoctors(DOCTORS, ctx) }] : []),
  { file: 'emergency/index.html', url: '/emergency/', section: '/emergency/' },
  { file: 'appointments/index.html', url: '/appointments/', section: '/appointments/' },
  { file: 'patients/index.html', url: '/patients/', section: '/patients/' },
  { file: 'patients/international/index.html', url: '/patients/international/', section: '/patients/' },
  { file: 'packages/index.html', url: '/packages/', section: '/patients/' },
  { file: 'health/index.html', url: '/health/', section: '/patients/' },
  ...ARTICLES.map((a) => ({ file: `health/${a.slug}/index.html`, url: `/health/${a.slug}/`, section: '/patients/', render: (ctx) => renderArticlePage(a, ctx) })),
  { file: 'refer/index.html', url: '/refer/', section: null },
  { file: 'about/index.html', url: '/about/', section: '/about/' },
  { file: 'contact/index.html', url: '/contact/', section: '/contact/' },
  { file: 'privacy/index.html', url: '/privacy/', section: null },
  { file: '404.html', url: null, section: null },
];

const findDepartment = (slug, from) => {
  const d = DEPARTMENTS.find((x) => x.slug === slug);
  if (!d) throw new BuildError(`${from} refers to unknown department "${slug}".`);
  return { ...d, url: deptUrl(d) };
};

// The heading over a department's people, so heads of departments are not called doctors.
function teamTitle(team) {
  const heads = team.filter((doc) => doc.group === 'head').length;
  if (!heads) return team.length === 1 ? 'Our doctor' : 'Doctors in this department';
  if (heads === team.length) return heads === 1 ? 'Head of department' : 'Heads of department';
  return 'Our team';
}

function renderDepartmentPage(d, ctx) {
  // The head is listed before the doctors.
  const team = DOCTORS.filter((doc) => doc.department === d.slug).sort((a, b) => (b.group === 'head') - (a.group === 'head'));
  if (d.hours && !hoursRow(d.hours)) throw new BuildError(`data/departments.js: ${d.slug} uses hours "${d.hours}", which is not a row in data/site.js.`);
  return renderDepartment(d, {
    ...ctx,
    category: CATEGORIES.find((c) => c.id === d.category),
    related: (d.related || []).map((slug) => findDepartment(slug, `data/departments.js (${d.slug})`)),
    all: DEPARTMENTS.map((x) => ({ ...x, url: deptUrl(x) })),
    when: whenOpen(d),
    people: team.map((doc) => personCard(doc)),
    teamTitle: teamTitle(team),
  });
}

// A figure from site.stats. Whole numbers are marked so js/modules/ui.js can count them up from zero;
// the number itself is in the page, so it reads correctly without JavaScript.
function statValue(s) {
  const number = /^\d+$/.test(s.value)
    ? `<span data-count-to="${s.value}">${s.value}</span>`
    : escapeHtml(s.value);
  return number + (s.suffix ? escapeHtml(s.suffix) : '');
}

// When a department can be seen: its row of the hours table, otherwise its clinic days from
// data/clinics.js, otherwise 24 hours (the hospital's rule where no time is given).
// Returns { label, time, note }.
function whenOpen(d) {
  const hours = d.hours ? hoursRow(d.hours) : null;
  if (hours) return { label: 'Hours', time: hours.time, note: hours.note };
  const clinics = CLINICS.filter((c) => c.department === d.slug);
  if (clinics.length === 1) return { label: 'Clinic days', time: clinics[0].days, note: clinics[0].time };
  if (clinics.length) return { label: 'Clinic days', time: clinics.map((c) => `${c.clinic}: ${c.days}`).join('; ') };
  return { label: 'Hours', time: 'Open 24 hours, every day' };
}

// The anchor for a clinician's card in the /doctors/ directory, e.g. "dr-demo-surgeon".
const doctorId = (doc) => slug(doc.name);

// Staff portraits live in assets/doctors/. A file named after the person, e.g. anthony-luluwa.jpg, is
// used on its own; "photo" in data/doctors.js names any other file. The name must match exactly,
// capitals included: the server is case-sensitive even where Windows is not.
const PORTRAIT_DIR = path.join(root, 'assets', 'doctors');
const PORTRAIT_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const PORTRAIT_MAX_KB = 400;
const portraitWarnings = new Set();
function portraitFile(doc) {
  const files = fs.existsSync(PORTRAIT_DIR) ? fs.readdirSync(PORTRAIT_DIR) : [];
  let file = null;
  if (doc.photo) {
    if (!files.includes(doc.photo)) throw new BuildError(`data/doctors.js: the photo "${doc.photo}" for ${doc.name} is not in assets/doctors/ (check the capitals).`);
    file = doc.photo;
  } else {
    file = PORTRAIT_TYPES.map((type) => `${doctorId(doc)}.${type}`).find((f) => files.includes(f)) || null;
    const nearMiss = !file && files.find((f) => f.toLowerCase().replace(/\.[^.]+$/, '') === doctorId(doc));
    if (nearMiss) portraitWarnings.add(`assets/doctors/${nearMiss}: rename it to ${doctorId(doc)}.jpg (lower case) so it is used for ${doc.name}.`);
  }
  if (file && fs.statSync(path.join(PORTRAIT_DIR, file)).size > PORTRAIT_MAX_KB * 1024) {
    portraitWarnings.add(`assets/doctors/${file} is over ${PORTRAIT_MAX_KB} KB: resize it to about 800 x 800 px so pages load quickly on phones.`);
  }
  return file;
}

// The person's photograph, or until it arrives their initials, e.g. "OE" for Dr Odar Emmanuel.
// Both fill the same square, so a row that mixes the two still lines up.
const initials = (name) => name.replace(/^(Dr|Mr|Mrs|Ms|Sr)\.?\s+/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const portrait = (doc) => {
  const file = portraitFile(doc);
  return file
    ? `<img src="/assets/doctors/${escapeHtml(file)}" alt="" width="800" height="800" loading="lazy"${doc.photoPosition ? ` style="object-position: ${escapeHtml(doc.photoPosition)}"` : ''} />`
    : `<span class="initials" aria-hidden="true">${initials(doc.name)}</span>`;
};

// A small card for one clinician: photo (or their initials), name and role (or a leadership title),
// linking to the directory when the person is listed there.
function personCard(doc, title) {
  // The co-founder is not in the directory, so her card has nothing to link to.
  const listed = doc.group !== 'leadership';
  return [
    listed ? `      <a href="/doctors/#${doctorId(doc)}" class="person">` : '      <div class="person">',
    `        <span class="person__photo">${portrait(doc)}</span>`,
    `        <span class="person__name">${escapeHtml(doc.name)}</span>`,
    `        <span class="person__role">${escapeHtml(title || doc.role)}</span>`,
    listed ? '      </a>' : '      </div>',
  ].join('\n');
}

function renderArticlePage(a, ctx) {
  return renderArticle(a, {
    ...ctx,
    related: (a.related || []).map((slug) => findDepartment(slug, `data/articles.js (${a.slug})`)),
    others: ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3),
  });
}

/* ---------------------------------------------------------------- build blocks */

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}" /></svg>`;
const byCategory = () => CATEGORIES.map((c) => ({ ...c, items: DEPARTMENTS.filter((d) => d.category === c.id) }));

// The department choices for a form, grouped by category. Emergency is never a form choice.
const departmentOptions = (keep) => [
  '<option value="">Choose a department</option>',
  ...byCategory().map((c) => ({ ...c, items: c.items.filter((d) => d.slug !== 'emergency' && keep(d)) }))
    .filter((c) => c.items.length)
    .map((c) => [
      `<optgroup label="${escapeHtml(c.name)}">`,
      ...c.items.map((d) => `  <option value="${d.slug}">${escapeHtml(d.name)}</option>`),
      '</optgroup>',
    ]).flat(),
  '<option value="not-sure">Not sure: please advise me</option>',
];

const hoursRow = (service) => site.hours.find((h) => h.service === service);

const BLOCKS = {
  'nav-departments': () =>
    byCategory().map((c) => [
      '<div class="mega__col">',
      `  <p class="mega__heading">${escapeHtml(c.name)}</p>`,
      ...c.items.map((d) => `  <a href="${deptUrl(d)}" class="mega__link">${icon(d.icon)}<span>${escapeHtml(d.name)}</span></a>`),
      '</div>',
    ]).flat(),

  'mobile-departments': () => DEPARTMENTS.map((d) => `<a href="${deptUrl(d)}">${escapeHtml(d.name)}</a>`),

  'footer-departments': () => DEPARTMENTS.map((d) => `<a href="${deptUrl(d)}">${escapeHtml(d.name)}</a>`),

  // Homepage services band: a photograph and short description for each department in HOME_SERVICES.
  'service-highlights': () =>
    HOME_SERVICES.map((slug) => DEPARTMENTS.find((d) => d.slug === slug))
      .filter((d) => d && d.photo)
      .map((d) => [
        `<a href="${deptUrl(d)}" class="service-tile">`,
        `  <span class="service-tile__media"><img src="/assets/photos/${d.photo.file}-800.jpg" alt="" width="800" height="600" loading="lazy"${d.photo.position ? ` style="object-position: ${d.photo.position}"` : ''} /></span>`,
        `  <span class="service-tile__name">${escapeHtml(d.name)} ${icon('arrow')}</span>`,
        `  <span class="service-tile__text">${escapeHtml(d.card)}</span>`,
        '</a>',
      ]).flat(),

  // Footer: licences and accreditations, left out while there are none.
  'footer-accreditations': () =>
    site.accreditations.length
      ? [
          '<ul class="footer__marks" aria-label="Licences and accreditations">',
          ...site.accreditations.map((a) => `  <li>${icon('shield')}<span><strong>${escapeHtml(a.name)}</strong>${a.detail ? `<small>${escapeHtml(a.detail)}</small>` : ''}</span></li>`),
          '</ul>',
        ]
      : [],

  // Hero figures, from site.stats.
  'hero-stats': () =>
    site.stats.length
      ? [
          '<dl class="hero__stats">',
          ...site.stats.map((s) => `  <div><dt>${escapeHtml(s.label)}</dt><dd>${statValue(s)}</dd></div>`),
          '</dl>',
        ]
      : [],

  'department-directory': () =>
    byCategory().map((c) => [
      `<section class="directory__group" aria-labelledby="cat-${c.id}">`,
      `  <h2 class="directory__heading" id="cat-${c.id}">${escapeHtml(c.name)}</h2>`,
      '  <div class="directory__grid">',
      ...c.items.map((d) => {
        const open = whenOpen(d);
        const when = d.slug === 'emergency' ? 'Open 24 hours, every day' : open.label === 'Clinic days' ? `Clinic days: ${open.time}` : open.time;
        const keywords = [d.name, d.keywords, d.card, d.summary, ...(d.services || []).flat()].filter(Boolean).join(' ').toLowerCase();
        return [
          `    <a href="${deptUrl(d)}" class="dept-card${d.slug === 'emergency' ? ' dept-card--urgent' : ''}" data-search="${escapeHtml(keywords)}">`,
          `      <span class="dept-card__icon">${icon(d.icon)}</span>`,
          `      <span class="dept-card__body">`,
          `        <span class="dept-card__name">${escapeHtml(d.name)}</span>`,
          `        <span class="dept-card__text">${escapeHtml(d.card)}</span>`,
          when ? `        <span class="dept-card__hours">${icon('clock')} ${escapeHtml(when)}</span>` : null,
          '      </span>',
          `      <span class="dept-card__arrow">${icon('arrow')}</span>`,
          '    </a>',
        ].filter(Boolean).join('\n');
      }),
      '  </div>',
      '</section>',
    ]).flat(),

  'department-options': () => departmentOptions(() => true),

  // The appointment form leaves out the services nobody books in advance (bookable: false).
  'appointment-departments': () => departmentOptions((d) => d.bookable !== false),

  hours: () =>
    site.hours.map((h) =>
      `<tr><th scope="row">${escapeHtml(h.service)}</th><td>${escapeHtml(h.time)}${h.note ? `<small>${escapeHtml(h.note)}</small>` : ''}</td></tr>`),

  // Homepage: the opening hours in brief. Services open around the clock are named in one line, and only
  // the exceptions get a row of their own; the full table is on the patient guide.
  'hours-summary': () => {
    const allDay = site.hours.filter((h) => h.allDay && /every day/.test(h.time));
    const others = site.hours.filter((h) => !allDay.includes(h));
    return [
      '<div class="hours-summary">',
      '  <div class="hours-summary__main">',
      '    <h3>Open 24 hours, every day</h3>',
      '    <ul class="hours-summary__list">',
      ...allDay.map((h) => `      <li>${escapeHtml(h.service)}</li>`),
      '    </ul>',
      '  </div>',
      '  <dl class="hours-summary__other">',
      ...others.map((h) => `    <div><dt>${escapeHtml(h.service)}</dt><dd>${escapeHtml(h.time)}</dd></div>`),
      ...(CLINICS.length ? [`    <div><dt>Specialist clinics</dt><dd>On set days. <a class="link" href="/patients/#clinic-days">See the clinic days</a></dd></div>`] : []),
      '  </dl>',
      '</div>',
    ];
  },

  'visiting-hours': () =>
    site.visitingHours.map((v) => `<tr><th scope="row">${escapeHtml(v.period)}</th><td>${escapeHtml(v.time)}</td></tr>`),

  'visiting-by-ward': () =>
    site.visitingByWard.map((w) => `<tr><th scope="row">${escapeHtml(w.ward)}</th><td>${escapeHtml(w.times)}</td><td>${escapeHtml(w.note || '')}</td></tr>`),

  // A public-health notice across the top of every page, only while site.alert.on is true.
  alert: () =>
    site.alert && site.alert.on
      ? [
          '<div class="alert-band" role="region" aria-label="Public health notice">',
          '  <div class="container alert-band__inner">',
          `    ${icon('alert')}`,
          `    <p><strong>${escapeHtml(site.alert.title)}.</strong> ${escapeHtml(site.alert.text)}</p>`,
          site.alert.link ? `    <a href="${escapeHtml(site.alert.link)}">${escapeHtml(site.alert.linkText || 'Read more')} ${icon('arrow')}</a>` : '',
          '  </div>',
          '</div>',
        ].filter(Boolean)
      : [],

  // Confirmed figures and registrations. The whole section is left out while both lists are empty.
  trust: () => {
    if (!site.stats.length && !site.accreditations.length) return [];
    return [
      '<section class="section section--tight trust" aria-labelledby="trust-title">',
      '  <div class="container">',
      '    <h2 class="sr-only" id="trust-title">Life Care Hospital in figures</h2>',
      site.stats.length ? '    <dl class="trust__stats">' : '',
      ...site.stats.map((s) => `      <div><dt>${escapeHtml(s.label)}</dt><dd>${statValue(s)}</dd></div>`),
      site.stats.length ? '    </dl>' : '',
      site.accreditations.length ? '    <ul class="trust__marks">' : '',
      ...site.accreditations.map((a) => `      <li>${icon('shield')}<span><strong>${escapeHtml(a.name)}</strong>${a.detail ? `<small>${escapeHtml(a.detail)}</small>` : ''}</span></li>`),
      site.accreditations.length ? '    </ul>' : '',
      '  </div>',
      '</section>',
    ].filter(Boolean);
  },

  packages: () =>
    PACKAGES.map((p) => [
      `<article class="package" id="${p.id}">`,
      '  <div class="package__head">',
      `    <h2 class="package__name">${escapeHtml(p.name)}</h2>`,
      `    <p class="package__for">${escapeHtml(p.for)}</p>`,
      '  </div>',
      '  <ul class="check-list">',
      ...p.includes.map((i) => `    <li>${icon('check')}<span>${escapeHtml(i)}</span></li>`),
      '  </ul>',
      '  <div class="package__foot">',
      `    <p class="package__price">${p.price ? escapeHtml(p.price) : 'Price on request'}</p>`,
      `    <a href="/appointments/?package=${p.id}" class="btn btn--primary btn--sm">Book this check</a>`,
      '  </div>',
      '</article>',
    ]).flat(),

  'package-options': () => [
    '<option value="">No package</option>',
    ...PACKAGES.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`),
  ],

  'article-cards': () =>
    ARTICLES.slice(0, 3).map((a) => [
      `<a href="/health/${a.slug}/" class="article-card">`,
      `  <span class="article-card__cat">${escapeHtml(a.category)}</span>`,
      `  <span class="article-card__title">${escapeHtml(a.title)}</span>`,
      `  <span class="article-card__text">${escapeHtml(a.summary)}</span>`,
      `  <span class="article-card__meta">${a.readMinutes} min read</span>`,
      '</a>',
    ]).flat(),

  'article-list': () =>
    ARTICLES.map((a) => [
      `<a href="/health/${a.slug}/" class="article-row">`,
      `  <span class="article-row__cat">${escapeHtml(a.category)}</span>`,
      `  <span class="article-row__title">${escapeHtml(a.title)}</span>`,
      `  <span class="article-row__text">${escapeHtml(a.summary)}</span>`,
      `  <span class="article-row__meta">${a.readMinutes} min read · ${a.reviewedBy ? `Reviewed by ${escapeHtml(a.reviewedBy)}` : 'Awaiting clinical review'}</span>`,
      `  ${icon('arrow')}`,
      '</a>',
    ]).flat(),

  // Specialist clinic days, left out while data/clinics.js is empty. The time and clinician columns
  // appear only when at least one clinic has them.
  'clinic-days': () => {
    if (!CLINICS.length) return [];
    const withTime = CLINICS.some((c) => c.time);
    const withClinician = CLINICS.some((c) => c.clinician);
    const rows = CLINICS.map((c) => {
      const dept = c.department ? findDepartment(c.department, `data/clinics.js (${c.clinic})`) : null;
      const name = dept ? `<a href="${dept.url}">${escapeHtml(c.clinic)}</a>` : escapeHtml(c.clinic);
      return `      <tr><th scope="row">${name}</th><td>${escapeHtml(c.days)}</td>${withTime ? `<td>${escapeHtml(c.time || '')}</td>` : ''}${withClinician ? `<td>${escapeHtml(c.clinician || '')}</td>` : ''}</tr>`;
    });
    return [
      '<section class="block" id="clinic-days" aria-labelledby="clinic-days-title">',
      '  <h2 id="clinic-days-title">Specialist clinic days</h2>',
      '  <p>Come on a clinic day, or request an appointment.</p>',
      '  <table class="hours-table timetable">',
      `    <thead><tr><th scope="col">Clinic</th><th scope="col">Days</th>${withTime ? '<th scope="col">Time</th>' : ''}${withClinician ? '<th scope="col">Clinician</th>' : ''}</tr></thead>`,
      '    <tbody>',
      ...rows,
      '    </tbody>',
      '  </table>',
      '</section>',
    ];
  },

  // "Find a doctor" link, only once data/doctors.js has entries.
  'doctors-link': () => (DOCTORS.length ? ['<a href="/doctors/">Find a doctor</a>'] : []),
  'topbar-doctors': () => (DOCTORS.length ? [`<a href="/doctors/" class="topbar__extra">${icon('users')} Find a doctor</a>`] : []),

  // Homepage: the doctors marked "featured", left out while there are none.
  'doctor-highlights': () => {
    const featured = DOCTORS.filter((doc) => doc.featured).slice(0, 4);
    if (!featured.length) return [];
    return [
      '<section class="section" aria-labelledby="doctors-title">',
      '  <div class="container">',
      '    <div class="section__head section__head--split">',
      '      <h2 id="doctors-title">Our team</h2>',
      `      <a href="/doctors/" class="text-link">Specialists and heads of departments ${icon('arrow')}</a>`,
      '    </div>',
      '    <div class="people">',
      ...featured.map((doc) => personCard(doc)),
      '    </div>',
      '  </div>',
      '</section>',
    ];
  },

  // About page: the people with a "leadership" title in data/doctors.js.
  leadership: () => {
    const leaders = DOCTORS.filter((doc) => doc.leadership);
    if (!leaders.length) return [];
    return [
      '<section class="section" aria-labelledby="leaders-title">',
      '  <div class="container">',
      '    <div class="section__head">',
      '      <h2 id="leaders-title">Hospital leadership</h2>',
      '    </div>',
      '    <div class="people people--wide">',
      ...leaders.map((doc) => personCard(doc, doc.leadership)),
      '    </div>',
      '  </div>',
      '</section>',
    ];
  },

  // Homepage: insurers as a row of names, and how else to pay. Left out while site.insurers is empty.
  'insurance-partners': () =>
    site.insurers && site.insurers.length
      ? [
          '<section class="section section--paper" aria-labelledby="partners-title">',
          '  <div class="container">',
          '    <div class="section__head section__head--center">',
          '      <h2 id="partners-title">Insurers and schemes we work with</h2>',
          '      <p>Members of these insurers and medical schemes can be treated on cover. You can also pay by cash, MTN Mobile Money or Airtel Money.</p>',
          '    </div>',
          '    <ul class="partners">',
          ...site.insurers.map((name) => `      <li>${escapeHtml(name)}</li>`),
          '    </ul>',
          '    <p class="partners__links">',
          `      <a href="/patients/#paying" class="text-link">Payment and insurance details ${icon('arrow')}</a>`,
          `      <a href="/packages/" class="text-link">Health check packages ${icon('arrow')}</a>`,
          '    </p>',
          '  </div>',
          '</section>',
        ]
      : [],

  // Insurers whose members can be treated on cover, left out while site.insurers is empty.
  insurers: () =>
    site.insurers && site.insurers.length
      ? [
          '<div class="insurers">',
          '  <h3>Insurers and schemes we work with</h3>',
          '  <ul class="insurers__list">',
          ...site.insurers.map((name) => `    <li>${escapeHtml(name)}</li>`),
          '  </ul>',
          '</div>',
        ]
      : [],

  // Keeps search engines out while the site holds sample content (site.sampleContent).
  'robots-meta': () => (site.sampleContent ? ['<meta name="robots" content="noindex, nofollow" />'] : []),

  'hospital-schema': () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Hospital',
      '@id': `${site.url}/#hospital`,
      name: site.name,
      slogan: site.tagline,
      description: site.description,
      url: `${site.url}/`,
      logo: `${site.url}/assets/brand/lifecare-logo-480.png`,
      image: `${site.url}/assets/og-image.png`,
      telephone: site.phones.main.replace(/\s/g, ''),
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: 'UG',
      },
      ...(site.geo ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
      ...(site.hours.some((h) => h.allDay) ? { openingHours: 'Mo-Su 00:00-23:59' } : {}),
      isAcceptingNewPatients: true,
      medicalSpecialty: ['Emergency', 'PrimaryCare', 'Obstetric', 'Midwifery', 'Gynecologic', 'Pediatric', 'Surgical', 'Dentistry', 'LaboratoryScience', 'Radiography', 'PharmacySpecialty'],
      department: DEPARTMENTS.map((d) => ({ '@type': 'MedicalClinic', name: d.name, url: `${site.url}${deptUrl(d)}` })),
      sameAs: Object.values(site.social).filter(Boolean),
    };
    return ['<script type="application/ld+json">', ...JSON.stringify(schema, null, 2).split('\n').map((l) => `  ${l}`), '</script>'];
  },
};

function fillBlocks(text, file) {
  return text.replace(/([ \t]*)<!-- build:([\w-]+) -->[\s\S]*?<!-- \/build:\2 -->/g, (all, indent, name) => {
    if (!BLOCKS[name]) throw new BuildError(`${file}: unknown build block "${name}".`);
    const lines = BLOCKS[name]().join('\n').split('\n');
    return [`${indent}<!-- build:${name} -->`, ...lines.map((l) => (l ? `${indent}  ${l}` : l)), `${indent}<!-- /build:${name} -->`].join('\n');
  });
}

/* ---------------------------------------------------------------- facts */

const FACT_TEXT = /<([a-z][\w-]*)\b([^>]*?\sdata-fact="([^"]+)"[^>]*)>([^<]*)<\/\1>/gi;
// data-fact-href, data-fact-src, data-fact-action, data-fact-data-src ... fill the attribute named after "data-fact-".
const FACT_ATTR = /<[a-z][\w-]*\b[^>]*\sdata-fact-[a-z][a-z-]*="[^"]+"[^>]*>/gi;

function stampFacts(text, file) {
  const expected = (text.match(/\sdata-fact="/g) || []).length;
  let seen = 0;
  let next = text.replace(FACT_TEXT, (all, tag, attrs, spec) => {
    seen += 1;
    return `<${tag}${attrs}>${escapeHtml(resolve(spec, file))}</${tag}>`;
  });
  if (seen !== expected) {
    throw new BuildError(`${file}: an element with data-fact contains other tags; facts must be plain text.`);
  }
  return next.replace(FACT_ATTR, (tag) => {
    let out = tag;
    for (const [, attr, spec] of tag.matchAll(/\sdata-fact-([a-z][a-z-]*)="([^"]+)"/gi)) {
      const target = new RegExp(`(\\s${attr}=")[^"]*(")`, 'i');
      if (!target.test(out)) throw new BuildError(`${file}: ${tag} needs a ${attr} attribute to fill.`);
      const value = escapeHtml(resolve(spec, file));
      out = out.replace(target, (all, open, close) => `${open}${value}${close}`);
    }
    return out;
  });
}

/* ---------------------------------------------------------------- shell */

const SHELL = ['head', 'icons', 'header', 'footer'];
const TAG = /<[a-zA-Z][\w-]*(?:[^>"']|"[^"]*"|'[^']*')*>/g;

const shellPattern = (name) => new RegExp(`[ \\t]*<!-- shell:${name} -->[\\s\\S]*?<!-- /shell:${name} -->`);

function extract(text, name, file) {
  const opens = text.split(`<!-- shell:${name} -->`).length - 1;
  const closes = text.split(`<!-- /shell:${name} -->`).length - 1;
  const match = text.match(shellPattern(name));
  if (opens !== 1 || closes !== 1 || !match) {
    throw new BuildError(`${file}: needs exactly one <!-- shell:${name} --> ... <!-- /shell:${name} --> pair (found ${opens} opening, ${closes} closing).`);
  }
  return match[0];
}

// Remove the homepage's own current-page marks so the shell can be marked for each page.
const unmark = (block) => block.replace(/ aria-current="page"/g, '').replace(/ is-active\b/g, '');

const pagePath = (href) => href.split('#')[0].split('?')[0];

// Header links carry data-section: the one for the page's section is highlighted. Any link to
// the page itself (not a dropdown trigger, not a #section link) gets aria-current="page".
function markCurrent(block, page) {
  return block.replace(TAG, (tag) => {
    if (!/^<a\b/i.test(tag)) return tag;
    let out = tag;
    const href = (tag.match(/\shref="([^"]*)"/i) || [])[1];
    const section = (tag.match(/\sdata-section="([^"]*)"/i) || [])[1];
    if (section !== undefined && section === page.section) {
      out = out.replace(/(\sclass="[^"]*)"/i, '$1 is-active"');
    }
    const isTrigger = /\saria-expanded=/i.test(tag);
    if (!isTrigger && page.url && href !== undefined && !href.includes('#') && pagePath(href) === page.url) {
      out = out.replace(/^<a\b/i, '<a aria-current="page"');
    }
    return out;
  });
}

/* ---------------------------------------------------------------- page addresses and assets */

function setAddresses(text, page) {
  if (!page.url) return text;
  const absolute = `${site.url}${page.url}`;
  return text
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${absolute}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${absolute}$2`)
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g, `$1${site.url}/assets/og-image.png$2`);
}

const ASSET_REF = /(\s(?:href|src)=")(\/(?:css|js)\/[^"?#]+\.(?:css|js))(?:\?v=[\w-]*)?(")/g;

function stampAssets(text, file) {
  return text.replace(ASSET_REF, (all, before, ref, quote) => {
    const absolute = path.join(root, ref.slice(1));
    if (!fs.existsSync(absolute)) throw new BuildError(`${file}: ${ref} does not exist.`);
    const contents = fs.readFileSync(absolute, 'utf8').replace(/\r\n/g, '\n');
    const hash = crypto.createHash('sha1').update(contents).digest('hex').slice(0, 8);
    return `${before}${ref}?v=${hash}${quote}`;
  });
}

/* ---------------------------------------------------------------- site files */

function sitemap() {
  const urls = PAGES.filter((p) => p.url).map((p) => `  <url><loc>${site.url}${p.url}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n');
}

// While the site holds sample content, search engines are asked to stay out entirely.
const robots = () =>
  (site.sampleContent
    ? ['User-agent: *', 'Disallow: /', '']
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${site.url}/sitemap.xml`, '']
  ).join('\n');

// A contact card patients can save to their phone ("Save our numbers").
const vcard = () => {
  const tel = (v) => v.replace(/[^\d+X]/gi, '');
  const esc = (v) => String(v).replace(/[\\,;]/g, (m) => `\\${m}`);
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(site.name)} Arua`,
    `ORG:${esc(site.name)}`,
    `item1.TEL;TYPE=VOICE:${tel(site.phones.emergency)}`,
    'item1.X-ABLabel:Emergency (24 hours)',
    `TEL;TYPE=WORK,VOICE:${tel(site.phones.main)}`,
    `item2.TEL;TYPE=CELL:${tel(site.phones.whatsapp)}`,
    'item2.X-ABLabel:WhatsApp',
    `EMAIL;TYPE=WORK:${site.email}`,
    `ADR;TYPE=WORK:;;${esc(site.address.street)};${esc(site.address.city)};${esc(site.address.region)};;${esc(site.address.country)}`,
    `URL:${site.url}/`,
    `NOTE:${esc(`Emergency line answered day and night. ${site.tagline}.`)}`,
    'END:VCARD',
    '',
  ].join('\n');
};

const manifest = () =>
  `${JSON.stringify(
    {
      name: `${site.name}, Arua`,
      short_name: site.shortName,
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#0b364c',
      icons: [
        { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  )}\n`;

/* ---------------------------------------------------------------- build */

function build() {
  const outputs = [];

  // Generated pages (departments, articles, doctors) are written from data/; their shell blocks
  // are filled below like any page.
  const sources = PAGES.map((page) => {
    const { text, eol } = read(page.file);
    if (page.render) {
      const generated = page.render({ site, icon, escapeHtml, departments: DEPARTMENTS, categories: CATEGORIES, doctorId, portrait });
      // Keep the shell already in the file, so an unchanged page is not reported as changed.
      let merged = generated;
      if (text) {
        for (const name of SHELL) {
          if (text.match(shellPattern(name))) merged = merged.replace(shellPattern(name), () => extract(text, name, page.file));
        }
      }
      return { page, text, eol, next: merged };
    }
    if (text === null) throw new BuildError(`${page.file} does not exist.`);
    return { page, text, eol, next: text };
  });

  for (const s of sources) {
    s.next = stampFacts(fillBlocks(s.next, s.page.file), s.page.file);
  }

  const home = sources.find((s) => s.page.file === 'index.html');
  const shell = Object.fromEntries(SHELL.map((name) => [name, unmark(extract(home.next, name, 'index.html'))]));

  const symbols = new Set([...shell.icons.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]));

  for (const s of sources) {
    for (const name of SHELL) {
      extract(s.next, name, s.page.file);
      s.next = s.next.replace(shellPattern(name), () => markCurrent(shell[name], s.page));
    }
    // Every icon a page uses must be in the shared sprite (checked after the shell is copied in).
    for (const [, id] of s.next.matchAll(/<use href="#([^"]+)"/g)) {
      if (!symbols.has(id)) throw new BuildError(`${s.page.file}: icon "#${id}" is not in the icon sprite in index.html.`);
    }
    const outside = SHELL.reduce((rest, name) => rest.replace(shellPattern(name), ''), s.next);
    if (/<meta\s+name="theme-color"/i.test(outside)) throw new BuildError(`${s.page.file}: remove its own theme-color tag; the shell sets it.`);
    if (s.page.url && !/<link rel="canonical"/.test(outside)) throw new BuildError(`${s.page.file}: add <link rel="canonical" href="" /> to its head.`);
    s.next = stampAssets(setAddresses(s.next, s.page), s.page.file);
    outputs.push({ file: s.page.file, before: s.text, after: s.next, eol: s.eol });
  }

  for (const [file, content] of [['sitemap.xml', sitemap()], ['robots.txt', robots()], ['site.webmanifest', manifest()], ['assets/lifecare-hospital.vcf', vcard()]]) {
    const { text, eol } = read(file);
    // Contact cards use CRLF line endings, as the vCard standard requires.
    outputs.push({ file, before: text, after: content, eol: file.endsWith('.vcf') ? '\r\n' : eol });
  }

  // Generated folders with no entry in data/ are left alone but reported.
  const orphansIn = (dir, known) => {
    const full = path.join(root, dir);
    return fs.existsSync(full)
      ? fs.readdirSync(full, { withFileTypes: true }).filter((e) => e.isDirectory() && !known.has(e.name)).map((e) => `${dir}/${e.name}/`)
      : [];
  };
  const orphans = [
    ...orphansIn('departments', new Set(departmentPages.map((d) => d.slug))),
    ...orphansIn('health', new Set(ARTICLES.map((a) => a.slug))),
    ...(DOCTORS.length || !fs.existsSync(path.join(root, 'doctors')) ? [] : ['doctors/']),
  ];

  return { outputs: outputs.map((o) => ({ ...o, changed: o.before !== o.after })), orphans };
}

const deploying = process.argv.includes('--deploy');

try {
  const checkOnly = process.argv.includes('--check');
  const { outputs, orphans } = build();
  const stale = outputs.filter((o) => o.changed);

  if (checkOnly) {
    stale.forEach((o) => console.log(`Out of date: ${o.file}`));
    if (stale.length) {
      console.error('Run "npm run build" to update these files.');
      process.exit(1);
    }
  } else {
    for (const o of stale) {
      const target = path.join(root, o.file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, o.after.replace(/\n/g, o.eol));
      console.log(`Updated ${o.file}`);
    }
  }

  if (!stale.length) console.log(`All ${outputs.length} files are up to date.`);
  orphans.forEach((dir) => console.warn(`Note: ${dir} has no entry in data/. Delete the folder if it was removed on purpose.`));

  const noPortrait = DOCTORS.filter((doc) => !portraitFile(doc));
  if (noPortrait.length) {
    console.warn(`\nStaff portraits: ${DOCTORS.length - noPortrait.length} of ${DOCTORS.length}. Still to come (save as assets/doctors/<name>.jpg):`);
    noPortrait.forEach((doc) => console.warn(`  - ${doctorId(doc)}.jpg  ${doc.name}, ${doc.role}`));
  }
  portraitWarnings.forEach((warning) => console.warn(`Warning: ${warning}`));

  if (site.PENDING.length) {
    console.warn(`\n${site.PENDING.length} items still need confirming with the hospital (data/site.js, PENDING):`);
    site.PENDING.forEach((item) => console.warn(`  - ${item}`));
  }
} catch (error) {
  if (deploying) {
    console.error(`build skipped: ${error.message}`);
    process.exit(0);
  }
  if (!(error instanceof BuildError)) throw error;
  console.error(error.message);
  process.exit(1);
}

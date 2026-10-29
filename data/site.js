/* Facts about the hospital, used on every page.
   Edit a value here, run "npm run build", and every page that shows it is updated.

   Values that have not yet been confirmed by the hospital are listed in PENDING at the
   bottom. The build prints that list each time it runs, so nothing goes live by accident.
   Remove a key from PENDING once the hospital has confirmed it.

   Placeholders use reserved values that can never reach a real person:
   phone numbers written with X, and the .example domain (RFC 2606). */

module.exports = {
  name: 'Life Care Hospital',
  shortName: 'Life Care',
  tagline: 'We care for your Life',
  description:
    'Life Care Hospital is a private hospital in Arua City, Uganda, offering emergency, maternity, children’s, surgical and outpatient care with laboratory, imaging and pharmacy on site.',

  // The live web address, with no trailing slash. Used for canonical links, sharing previews and the sitemap.
  url: 'https://lifecare.example',

  // Contact details confirmed by the hospital on 29 October 2026.
  phones: {
    main: '+256 392 656378', // reception and general enquiries
    emergency: '+256 772 487959', // answered day and night
    whatsapp: '+256 772 487859', // appointment requests arrive here
    referral: '+256 392 656378', // for health workers; no separate line was given, so this is reception
  },
  email: 'fcc.arua@gmail.com',
  careersEmail: 'fcc.arua@gmail.com', // no separate careers address was given

  address: {
    street: 'Plot 2, Abram Riji Road, Congoloya Cell, Nsambia, Central Division',
    city: 'Arua City',
    region: 'West Nile',
    country: 'Uganda',
    landmark: 'South of Husna Mosque, Nsambia. Branch off Pakwach Road at the Big Tree stage onto Abram Riji Road.',
  },
  // The hospital's own Google Maps pin, used for every "Get directions" link.
  mapLink: 'https://maps.app.goo.gl/uGi15M5z2CbZEonu7',
  // What the embedded map searches for.
  mapQuery: 'Life Care Hospital, Arua' /* the hospital's own Google listing, as in mapLink; a street search lands on the airport */,
  geo: null, // e.g. { lat: 3.0201, lng: 30.9110 } once the exact location is known

  // Opening hours shown in the hours tables and in search results. Confirmed by the hospital on
  // 28 October 2026: all services are open 24 hours, imaging every day and dental Monday to Saturday.
  // Where the hospital gave no time, 24 hours is assumed. Specialist clinic days are in data/clinics.js.
  hours: [
    { service: 'Accident & Emergency', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Outpatient clinic', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Inpatient wards', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Maternity and labour ward', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Neonatal ICU', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Laboratory', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Pharmacy', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Ambulance', time: 'Available 24 hours, every day', allDay: true },
    { service: 'Imaging (ultrasound and X-ray)', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Dental clinic', time: 'Open 24 hours, Monday to Saturday' },
  ],
  hoursSummary: 'Open 24 hours, every day',

  // Visiting hours, confirmed by the hospital on 29 October 2026. They apply to every ward.
  visitingHours: [
    { period: 'Morning', time: '6:00 am – 8:00 am' },
    { period: 'Afternoon', time: '1:00 pm – 2:00 pm' },
    { period: 'Evening', time: '5:00 pm – 8:00 pm' },
  ],

  // Visiting arrangements for each ward, shown in the table on the patient guide.
  visitingByWard: [
    { ward: 'General wards', times: '6:00 – 8:00 am, 1:00 – 2:00 pm and 5:00 – 8:00 pm', note: 'Two visitors at a bedside' },
    { ward: 'Maternity ward', times: '6:00 – 8:00 am, 1:00 – 2:00 pm and 5:00 – 8:00 pm', note: 'The partner and one other adult' },
    { ward: 'Children’s ward', times: '6:00 – 8:00 am, 1:00 – 2:00 pm and 5:00 – 8:00 pm', note: 'One parent or caregiver may stay overnight' },
    { ward: 'Neonatal ICU', times: '6:00 – 8:00 am, 1:00 – 2:00 pm and 5:00 – 8:00 pm', note: 'Parents at any time. No other visitors, to protect babies from infection' },
  ],

  languages: 'English, Lugbara and Swahili',
  // Languages the team can help with for patients from neighbouring countries.
  interpreterLanguages: 'English, Lugbara, Swahili, Arabic and French',
  payment: 'cash, MTN Mobile Money, Airtel Money and approved insurance or employer schemes',
  foreignCurrency: 'Payment is in Uganda shillings (UGX). Ask reception whether other currencies can be accepted.',

  // True while the site still holds placeholder content (stock photographs, licences, unreviewed articles)
  // for the internal preview. While it is true, every page tells search engines not to index the site.
  // Replace the placeholders, then set this to false before launch.
  sampleContent: true,

  // Insurers and schemes whose members can be treated on cover, confirmed by the hospital on
  // 29 October 2026. Shown on the homepage and the patient guide; hidden while empty.
  insurers: [
    'Jubilee',
    'UAP Uganda',
    'Prudential',
    'Britam',
    'CIC South Sudan',
    'AAR',
    'Case Medcare',
    'ICEA',
    'Sanlam',
    'Cigna',
    'Bank of Uganda',
    'IAA',
    'Liberty Blue',
    'UNHCR Uganda',
    'GA Insurance',
    'CAA',
    'MTC',
    'CIC Uganda',
    'JMS',
    'NWSC',
    'APA',
    'Henner',
  ],

  // Figures on the homepage and About page, confirmed on 29 October 2026. Each value counts up from zero
  // when it comes into view; 'suffix' is shown after the number.
  stats: [
    { value: String(new Date().getFullYear() - 2003), label: 'Years of care, since 2003' }, // Family Care Clinic opened in 2003,
    { value: '56', label: 'Professional staff' },
    { value: '28', label: 'Support staff' },
    { value: '24', suffix: ' hours', label: 'Open every day' },
  ],
  // SAMPLE: not yet confirmed by the hospital.
  accreditations: [
    { name: 'Licensed by the Uganda Medical and Dental Practitioners Council', detail: 'Private hospital licence' },
    { name: 'Laboratory registered with the Allied Health Professionals Council', detail: 'Clinical laboratory' },
  ],

  // A public-health notice shown at the top of every page while "on" is true, for example during an
  // outbreak in the region. Keep the wording short, factual and approved by the medical director.
  alert: {
    on: false,
    title: 'Public health notice',
    text: 'If you have a fever with bleeding, or have been in contact with someone with a suspected infectious disease, call our emergency line before you come, so the team can receive you safely.',
    link: '/emergency/',
    linkText: 'What to do',
  },

  social: {
    facebook: '',
    x: '',
    instagram: '',
    tiktok: '',
  },

  PENDING: [
    'Placeholders for the internal preview: stock photographs (the hospital is sending its own), and the two licences in accreditations. Replace them and set sampleContent to false before launch',
    'url',
    'phones.referral: no referral line was given, so it shows reception',
    'careersEmail: no careers address was given, so it shows the main email',
    'insurers: check the spelling of Britam (sent as Britain), Cigna (sent as CIGNA Medi) and MTC, and whether UAP and UAP Uganda are one scheme (shown once)',
    'staff numbers: the history said about 57 staff, the figures say 56 professional and 28 support staff',
    'data/doctors.js: add the specialists for paediatrics, general surgery, ENT, the in-house physician, dental, ophthalmology and orthopaedics; and titles (Mr, Ms, Sister) for the heads of departments',
    'languages',
    'interpreterLanguages',
    'payment',
    'foreignCurrency',
    'data/articles.js: each article needs review and sign-off by a Life Care clinician',
    'data/packages.js: confirm package contents and add prices',
    'refer/index.html: confirm the referral process (referral line, reply to the referring clinician)',
    'patients/international/index.html: confirm interpreter languages, currencies and help with accommodation',
    'data/departments.js: confirm the services named on each page, especially the new ones (Antenatal Care, Immunisation, Neonatal ICU, ENT, Ophthalmology, Orthopaedics, Ambulance Services)',
    'ambulance: confirm how the service works (calls, area covered, charges) for the Ambulance Services page',
  ],
};

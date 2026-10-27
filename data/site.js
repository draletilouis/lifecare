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

  phones: {
    main: '+256 7XX XXX XXX', // reception and general enquiries
    emergency: '+256 7XX XXX XXX', // answered day and night
    whatsapp: '+256 7XX XXX XXX', // appointment requests arrive here
    referral: '+256 7XX XXX XXX', // for health workers referring or transferring a patient
  },
  email: 'info@lifecare.example',
  careersEmail: 'careers@lifecare.example',

  address: {
    street: 'Street address to be confirmed',
    city: 'Arua City',
    region: 'West Nile',
    country: 'Uganda',
    landmark: 'Landmark to be confirmed',
  },
  // What Google Maps should search for. Replace with the hospital's own map pin once it is listed.
  mapQuery: 'Arua City, Uganda',
  geo: null, // e.g. { lat: 3.0201, lng: 30.9110 } once the exact location is known

  // Opening hours shown in the hours tables and in search results.
  hours: [
    { service: 'Accident & Emergency', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Maternity and labour ward', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Inpatient wards', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Outpatient clinic', time: 'Monday to Saturday, 8:00 am – 8:00 pm', note: 'Sundays and public holidays: seen through Accident & Emergency' },
    { service: 'Laboratory', time: 'Open 24 hours for emergencies; routine tests 8:00 am – 8:00 pm' },
    { service: 'Imaging (ultrasound and X-ray)', time: 'Monday to Saturday, 8:00 am – 6:00 pm; emergencies at any time' },
    { service: 'Pharmacy', time: 'Open 24 hours, every day', allDay: true },
    { service: 'Dental clinic', time: 'Monday to Friday, 9:00 am – 5:00 pm' },
  ],
  hoursSummary: 'Emergency and maternity: 24 hours',

  visitingHours: [
    { period: 'Midday', time: '12:30 pm – 2:00 pm' },
    { period: 'Evening', time: '4:30 pm – 7:00 pm' },
  ],

  // Visiting arrangements for each ward, shown in the table on the patient guide.
  visitingByWard: [
    { ward: 'General wards', times: '12:30 pm – 2:00 pm and 4:30 pm – 7:00 pm', note: 'Two visitors at a bedside' },
    { ward: 'Maternity ward', times: '12:30 pm – 2:00 pm and 4:30 pm – 7:00 pm', note: 'The partner and one other adult' },
    { ward: 'Children’s ward', times: '12:30 pm – 2:00 pm and 4:30 pm – 7:00 pm', note: 'One parent or caregiver may stay overnight' },
    { ward: 'Newborn care', times: 'Parents at any time', note: 'No other visitors, to protect babies from infection' },
  ],

  languages: 'English, Lugbara and Swahili',
  // Languages the team can help with for patients from neighbouring countries.
  interpreterLanguages: 'English, Lugbara, Swahili, Arabic and French',
  payment: 'Cash, MTN Mobile Money, Airtel Money and approved insurance or employer schemes',
  foreignCurrency: 'Payment is in Uganda shillings (UGX). Ask reception whether other currencies can be accepted.',

  // True while the site holds invented sample content (doctors, clinic days, insurers, figures, history)
  // for the internal preview. While it is true, every page tells search engines not to index the site.
  // Replace the sample content with confirmed facts, then set this to false before launch.
  sampleContent: true,

  // Insurers and medical schemes whose members can be treated on cover. Shown on the homepage and the
  // patient guide; the list is hidden while empty. SAMPLE: not confirmed with the hospital.
  insurers: [
    'AAR Healthcare',
    'Jubilee Health Insurance',
    'UAP Old Mutual',
    'Prudential Assurance',
    'Sanlam',
    'ICEA LION',
    'Liberty Health',
    'GA Insurance',
    'Britam',
    'IAA Healthcare',
    'CIC Africa',
  ],

  // Figures and registrations shown on the homepage and About page. The section is hidden while both
  // lists are empty. SAMPLE: the values below are invented.
  stats: [
    { value: '2009', label: 'Caring for West Nile since' },
    { value: '64', label: 'Inpatient beds' },
    { value: '120', label: 'Staff' },
    { value: '24 hours', label: 'Emergency and maternity' },
  ],
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
    'SAMPLE CONTENT for the internal preview: doctors, clinic days, insurers, figures, licences and the About page history are invented. Replace them and set sampleContent to false before launch',
    'url',
    'phones.main',
    'phones.emergency',
    'phones.whatsapp',
    'phones.referral',
    'email',
    'careersEmail',
    'address.street',
    'address.landmark',
    'mapQuery',
    'hours',
    'visitingHours',
    'visitingByWard',
    'languages',
    'interpreterLanguages',
    'payment',
    'foreignCurrency',
    'data/articles.js: each article needs review and sign-off by a Life Care clinician',
    'data/packages.js: confirm package contents and add prices',
    'refer/index.html: confirm the referral process (referral line, reply to the referring clinician)',
    'patients/international/index.html: confirm interpreter languages, currencies and help with accommodation',
    'departments (data/departments.js): confirm the list and every service named',
    'about/index.html: add the history (year opened, founder, medical director, beds and staff); mission, vision and values are drafts',
    'ambulance: confirm whether the hospital runs one (emergency page)',
  ],
};

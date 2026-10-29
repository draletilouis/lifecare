/* The hospital's leadership, specialists and heads of departments, shown in the "Find a doctor" directory at
   /doctors/ (grouped as below), on their department's page, on the About page ("leadership") and, for
   those marked "featured", on the homepage. Edit here, then run "npm run build".

   Names and roles were sent by the hospital on 29 October 2026. Qualifications, languages, clinic days
   and biographies were not, so they are left out rather than guessed. Add them, and a consented
   photograph for each person, when the hospital supplies them.

   Fields:
     name           Full name as registered, e.g. 'Dr Jane Example'
     group          'director' (the Managing Director's own section), 'specialist' or 'head' (the
                    sections of the directory), or 'leadership' (About page only, not in the directory)
     role           e.g. 'Obstetrician and Gynaecologist'
     department     A department slug from data/departments.js, e.g. 'maternity' (optional)
     qualifications e.g. 'MBChB (Mak), MMed Obs/Gyn (Mak)' (optional)
     registration   Professional council registration (optional)
     languages      e.g. 'English, Lugbara, Swahili' (optional)
     clinicDays     e.g. 'Gynaecology clinic every day' (optional)
     photo          Optional. Not needed if the portrait is saved as assets/doctors/<name>.jpg, where <name>
                    is the person's name in lower case with hyphens (e.g. anthony-luluwa.jpg,
                    dr-odar-emmanuel.jpg): the build finds it on its own and lists who is still missing.
                    Use this field only for a file named differently. Until a portrait arrives, the
                    person's initials are shown. Portraits are cropped to a square: about 800 x 800 px,
                    under 400 KB, with the person's consent.
     photoPosition  Optional: where to centre the crop when the face is not in the upper third,
                    e.g. 'center 15%' (higher) or 'center 50%' (middle)
     bio            Two or three sentences in plain language (optional)
     featured       true to show on the homepage (up to four)
     leadership     Optional title for the About page, e.g. 'Founder and Managing Director'
*/

const DOCTORS = [
  /* Managing Director: his own section at the top of the directory */
  {
    name: 'Dr Odar Emmanuel',
    group: 'director',
    role: 'Senior Consultant Obstetrician and Gynaecologist',
    department: 'obstetrics-gynaecology',
    clinicDays: 'Gynaecology clinic every day',
    bio: 'Founded the hospital as Family Care Clinic in 2003 and still leads its team.',
    featured: true,
    leadership: 'Founder and Managing Director, Senior Consultant Obstetrician and Gynaecologist',
  },

  /* Co-founder: shown on the About page only, not in the directory */
  {
    name: 'Okwii Proscovia Alice',
    group: 'leadership',
    role: 'Co-Founder and Executive Director',
    leadership: 'Co-Founder and Executive Director',
  },

  /* Specialist doctors: none named yet besides Dr Odar */

  /* Heads of departments */
  { name: 'Anthony Luluwa', group: 'head', role: 'Head of Laboratory', department: 'laboratory', featured: true },
  { name: 'Robert Onyiyo', group: 'head', role: 'Head of Radiology', department: 'imaging' },
  { name: 'Letasi Agnes', group: 'head', role: 'Head of Pharmacy', department: 'pharmacy' },
  { name: 'Driwaru Favour', group: 'head', role: 'Head of Dental Services', department: 'dental' },
  { name: 'Idrisi Noah', group: 'head', role: 'Head of Ambulance Services', department: 'ambulance' },
  { name: 'Oroma Joyce', group: 'head', role: 'Head of the Neonatal ICU', department: 'neonatal-icu' },
  { name: 'Nagudi Aisha', group: 'head', role: 'Head of Theatre', department: 'surgery' },
  { name: 'Achikane Sarah', group: 'head', role: 'Head of Midwives', department: 'maternity', featured: true },
  { name: 'Ajidiru Scovia', group: 'head', role: 'Head of Nursing', department: 'inpatient', featured: true },
  { name: 'Wandera David', group: 'head', role: 'Hospital Administrator' },
  { name: 'Oketcha Francis', group: 'head', role: 'Head of Claims and Procurement' },
];

/* The medical officers the hospital sent on 29 October 2026 are not listed on the site, which shows only
   the specialists and heads of departments: Dr Adebo Andrew, Dr Enos, Dr Munakenya Newton,
   Dr Justine Ovungoru, Dr Anite Phiona, Dr Owacwun Lawrence and Dr Achiro Winnie. */

module.exports = { DOCTORS };

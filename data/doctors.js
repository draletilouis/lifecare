/* Doctors and other clinicians shown in the "Find a doctor" directory at /doctors/, on their department's
   page, and (those marked "featured") on the homepage. The directory page and its menu links are only built
   when this list has at least one entry. Edit here, then run "npm run build".

   SAMPLE DATA: every person below is invented for the internal preview. The names, roles, qualifications
   and biographies are not real, and the photographs are Unsplash placeholders of models (see
   assets/doctors/CREDITS.md). Replace them with real, consented profiles, or empty the list, before launch.

   Fields:
     name           Full name as registered, e.g. 'Dr Jane Example'
     role           e.g. 'Consultant Obstetrician and Gynaecologist'
     department     A department slug from data/departments.js, e.g. 'maternity'
     qualifications e.g. 'MBChB (Mak), MMed Obs/Gyn (Mak)'
     registration   Professional council registration, e.g. 'UMDPC registration no. …' (optional)
     languages      e.g. 'English, Lugbara, Swahili'
     clinicDays     e.g. 'Tuesday and Thursday mornings'
     photo          Optional: a file name in assets/doctors/, e.g. 'jane-example.jpg' (square, at least 400 px)
     bio            Two or three sentences in plain language
     featured       true to show on the homepage (up to four)
     leadership     Optional title for the About page, e.g. 'Medical Director'
*/

const DOCTORS = [
  {
    name: 'Dr Emmanuel Anguyo',
    role: 'Consultant Physician',
    department: 'internal-medicine',
    qualifications: 'MBChB (Mak), MMed Internal Medicine (Mak)',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Monday, Wednesday and Friday mornings',
    photo: 'emmanuel-anguyo.jpg',
    bio: 'Dr Anguyo founded Life Care Hospital and leads its medical team. He sees adults with high blood pressure, diabetes, and heart and kidney disease.',
    featured: true,
    leadership: 'Founder and Medical Director',
  },
  {
    name: 'Dr Grace Ayikoru',
    role: 'Consultant Obstetrician and Gynaecologist',
    department: 'maternity',
    qualifications: 'MBChB (MUST), MMed Obstetrics and Gynaecology (Mak)',
    languages: 'English, Lugbara',
    clinicDays: 'Antenatal clinic Tuesday and Thursday; gynaecology clinic Wednesday',
    photo: 'grace-ayikoru.jpg',
    bio: 'Dr Ayikoru leads the maternity unit. She looks after women with higher-risk pregnancies and performs caesarean sections and gynaecological operations.',
    featured: true,
  },
  {
    name: 'Dr Patrick Ochaya',
    role: 'General Surgeon',
    department: 'surgery',
    qualifications: 'MBChB (Gulu), MMed Surgery (Mak)',
    languages: 'English, Alur, Swahili',
    clinicDays: 'Surgical clinic Monday and Thursday',
    photo: 'patrick-ochaya.jpg',
    bio: 'Dr Ochaya carries out planned and emergency operations, including hernia repairs, appendix and gallbladder surgery, and the care of wounds and fractures.',
    featured: true,
  },
  {
    name: 'Dr Sarah Nakato',
    role: 'Paediatrician',
    department: 'paediatrics',
    qualifications: 'MBChB (Mak), MMed Paediatrics and Child Health (Mak)',
    languages: 'English, Luganda, Swahili',
    clinicDays: 'Children’s clinic Monday to Friday; Saturday mornings',
    photo: 'sarah-nakato.jpg',
    bio: 'Dr Nakato cares for newborns and sick children on the children’s ward and in clinic, and runs the newborn care unit.',
    featured: true,
  },
  {
    name: 'Dr Moses Afedra',
    role: 'Medical Officer, Accident & Emergency',
    department: 'emergency',
    qualifications: 'MBChB (Gulu)',
    languages: 'English, Lugbara, Madi',
    clinicDays: 'Accident & Emergency, on the duty rota',
    photo: 'moses-afedra.jpg',
    bio: 'Dr Afedra leads the emergency team, which assesses and treats injuries, severe illness and emergencies in pregnancy at any hour.',
  },
  {
    name: 'Dr Brenda Adiru',
    role: 'Medical Officer, Outpatient Clinic',
    department: 'outpatient',
    qualifications: 'MBChB (KIU)',
    languages: 'English, Lugbara, Arabic',
    clinicDays: 'Monday to Saturday',
    photo: 'brenda-adiru.jpg',
    bio: 'Dr Adiru sees adults and children in the outpatient clinic, and helps patients from South Sudan who speak Arabic.',
  },
  {
    name: 'Dr Isaac Onzima',
    role: 'Consultant Radiologist',
    department: 'imaging',
    qualifications: 'MBChB (Mak), MMed Radiology (Mak)',
    languages: 'English, Lugbara',
    clinicDays: 'Ultrasound lists Tuesday and Thursday; reports X-rays daily',
    photo: 'isaac-onzima.jpg',
    bio: 'Dr Onzima performs specialist ultrasound scans and reports every X-ray and scan done at the hospital.',
  },
  {
    name: 'Dr Esther Driciru',
    role: 'Dental Surgeon',
    department: 'dental',
    qualifications: 'BDS (Mak)',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Monday to Friday',
    photo: 'esther-driciru.jpg',
    bio: 'Dr Driciru runs the dental clinic: check-ups, fillings, extractions and treatment for tooth pain, for adults and children.',
  },
  {
    name: 'Sister Rose Maturu',
    role: 'Senior Midwife',
    department: 'maternity',
    qualifications: 'Diploma in Midwifery (Lacor), registered with UNMC',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Antenatal clinic Tuesday and Thursday; labour ward',
    photo: 'rose-maturu.jpg',
    bio: 'Sister Maturu leads the midwives on the labour ward and runs the antenatal and postnatal clinics.',
    leadership: 'Head of Nursing and Midwifery',
  },
];

module.exports = { DOCTORS };

/* Doctors and other clinicians shown in the "Find a doctor" directory at /doctors/, on their department's
   page, and (those marked "featured") on the homepage. The directory page and its menu links are only built
   when this list has at least one entry. Edit here, then run "npm run build".

   DEMO DATA: the people below do not exist. Each one is named after their role ("Dr Demo Surgeon") and
   shown with a plain avatar instead of a photograph, so nobody mistakes them for real staff. Replace them
   with real, consented profiles, or empty the list, before launch.

   Fields:
     name           Full name as registered, e.g. 'Dr Jane Example'
     role           e.g. 'Consultant Obstetrician and Gynaecologist'
     department     A department slug from data/departments.js, e.g. 'maternity'
     qualifications e.g. 'MBChB (Mak), MMed Obs/Gyn (Mak)'
     registration   Professional council registration, e.g. 'UMDPC registration no. …' (optional)
     languages      e.g. 'English, Lugbara, Swahili'
     clinicDays     e.g. 'Tuesday and Thursday mornings'
     photo          Optional: a file name in assets/doctors/, e.g. 'jane-example.jpg' (square, at least
                    400 px). Without one, a plain avatar is shown.
     bio            Two or three sentences in plain language
     featured       true to show on the homepage (up to four)
     leadership     Optional title for the About page, e.g. 'Medical Director'
*/

const DOCTORS = [
  {
    name: 'Dr Demo Physician',
    role: 'Consultant Physician',
    department: 'internal-medicine',
    qualifications: 'MBChB, MMed Internal Medicine',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Monday, Wednesday and Friday mornings',
    bio: 'Founded the hospital and leads its medical team. Sees adults with high blood pressure, diabetes, and heart and kidney disease.',
    featured: true,
    leadership: 'Founder and Medical Director',
  },
  {
    name: 'Dr Demo Obstetrician',
    role: 'Consultant Obstetrician and Gynaecologist',
    department: 'maternity',
    qualifications: 'MBChB, MMed Obstetrics and Gynaecology',
    languages: 'English, Lugbara',
    clinicDays: 'Antenatal clinic Tuesday and Thursday; gynaecology clinic Wednesday',
    bio: 'Leads the maternity unit. Looks after women with higher-risk pregnancies and performs caesarean sections and gynaecological operations.',
    featured: true,
  },
  {
    name: 'Dr Demo Surgeon',
    role: 'General Surgeon',
    department: 'surgery',
    qualifications: 'MBChB, MMed Surgery',
    languages: 'English, Alur, Swahili',
    clinicDays: 'Surgical clinic Monday and Thursday',
    bio: 'Carries out planned and emergency operations, including hernia repairs, appendix and gallbladder surgery, and the care of wounds and fractures.',
    featured: true,
  },
  {
    name: 'Dr Demo Paediatrician',
    role: 'Paediatrician',
    department: 'paediatrics',
    qualifications: 'MBChB, MMed Paediatrics and Child Health',
    languages: 'English, Luganda, Swahili',
    clinicDays: 'Children’s clinic Monday to Friday; Saturday mornings',
    bio: 'Cares for newborns and sick children on the children’s ward and in clinic, and runs the newborn care unit.',
    featured: true,
  },
  {
    name: 'Dr Demo Emergency Doctor',
    role: 'Medical Officer, Accident & Emergency',
    department: 'emergency',
    qualifications: 'MBChB',
    languages: 'English, Lugbara, Madi',
    clinicDays: 'Accident & Emergency, on the duty rota',
    bio: 'Leads the emergency team, which assesses and treats injuries, severe illness and emergencies in pregnancy at any hour.',
  },
  {
    name: 'Dr Demo Medical Officer',
    role: 'Medical Officer, Outpatient Clinic',
    department: 'outpatient',
    qualifications: 'MBChB',
    languages: 'English, Lugbara, Arabic',
    clinicDays: 'Monday to Saturday',
    bio: 'Sees adults and children in the outpatient clinic, and helps patients from South Sudan who speak Arabic.',
  },
  {
    name: 'Dr Demo Radiologist',
    role: 'Consultant Radiologist',
    department: 'imaging',
    qualifications: 'MBChB, MMed Radiology',
    languages: 'English, Lugbara',
    clinicDays: 'Ultrasound lists Tuesday and Thursday; reports X-rays daily',
    bio: 'Performs specialist ultrasound scans and reports every X-ray and scan done at the hospital.',
  },
  {
    name: 'Dr Demo Dentist',
    role: 'Dental Surgeon',
    department: 'dental',
    qualifications: 'BDS',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Monday to Friday',
    bio: 'Runs the dental clinic: check-ups, fillings, extractions and treatment for tooth pain, for adults and children.',
  },
  {
    name: 'Sister Demo Midwife',
    role: 'Senior Midwife',
    department: 'maternity',
    qualifications: 'Diploma in Midwifery',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Antenatal clinic Tuesday and Thursday; labour ward',
    bio: 'Leads the midwives on the labour ward and runs the antenatal and postnatal clinics.',
    leadership: 'Head of Nursing and Midwifery',
  },
];

module.exports = { DOCTORS };

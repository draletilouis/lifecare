/* Doctors, medical officers and heads of departments, shown in the "Find a doctor" directory at /doctors/
   (grouped as below), on their department's page, and (those marked "featured") on the homepage. The
   directory page and its menu links are only built when this list has at least one entry.
   Edit here, then run "npm run build".

   DEMO DATA: the people below do not exist. Each one is named after their role ("Dr Demo Surgeon") and
   shown with a plain avatar instead of a photograph, so nobody mistakes them for real staff. The roles
   follow the hospital's list of 28 October 2026: a specialist for each specialist service, the medical
   officers, and the heads of departments. Replace them with real, consented profiles before launch.

   Fields:
     name           Full name as registered, e.g. 'Dr Jane Example'
     group          'specialist', 'medical-officer' or 'head' (the section of the directory)
     role           e.g. 'Obstetrician and Gynaecologist'
     department     A department slug from data/departments.js, e.g. 'maternity'
     qualifications e.g. 'MBChB (Mak), MMed Obs/Gyn (Mak)'
     registration   Professional council registration, e.g. 'UMDPC registration no. …' (optional)
     languages      e.g. 'English, Lugbara, Swahili'
     clinicDays     e.g. 'Gynaecology clinic every day'
     photo          Optional: a file name in assets/doctors/, e.g. 'jane-example.jpg' (square, at least
                    400 px). Without one, a plain avatar is shown.
     bio            Two or three sentences in plain language
     featured       true to show on the homepage (up to four)
     leadership     Optional title for the About page, e.g. 'Medical Director'
*/

const DOCTORS = [
  /* Specialist doctors: one for each specialist service */
  {
    name: 'Dr Demo Paediatrician',
    group: 'specialist',
    role: 'Paediatrician',
    department: 'paediatrics',
    qualifications: 'MBChB, MMed Paediatrics and Child Health',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Paediatric clinic on Fridays, Saturdays and Sundays, 24 hours',
    bio: 'Cares for babies, children and teenagers in the paediatric clinic and on the children’s ward, and oversees the Neonatal ICU.',
    featured: true,
  },
  {
    name: 'Dr Demo Surgeon',
    group: 'specialist',
    role: 'General Surgeon',
    department: 'surgery',
    qualifications: 'MBChB, MMed Surgery',
    languages: 'English, Alur, Swahili',
    clinicDays: 'Surgical clinic on Tuesdays, 24 hours',
    bio: 'Carries out planned and emergency operations, including hernia repairs and appendix and gallbladder surgery.',
    featured: true,
  },
  {
    name: 'Dr Demo Obstetrician',
    group: 'specialist',
    role: 'Obstetrician and Gynaecologist',
    department: 'obstetrics-gynaecology',
    qualifications: 'MBChB, MMed Obstetrics and Gynaecology',
    languages: 'English, Lugbara',
    clinicDays: 'Gynaecology clinic every day, 24 hours',
    bio: 'Looks after women with higher-risk pregnancies, performs caesarean sections and gynaecological operations, and runs the gynaecology clinic.',
    featured: true,
  },
  {
    name: 'Dr Demo ENT Surgeon',
    group: 'specialist',
    role: 'ENT Surgeon',
    department: 'ent',
    qualifications: 'MBChB, MMed Otorhinolaryngology',
    languages: 'English, Swahili',
    clinicDays: '24 hours, every day',
    bio: 'Treats ear, nose and throat problems in adults and children, in clinic and in theatre.',
  },
  {
    name: 'Dr Demo Physician',
    group: 'specialist',
    role: 'Physician',
    department: 'physician',
    qualifications: 'MBChB, MMed Internal Medicine',
    languages: 'English, Lugbara, Swahili',
    clinicDays: '24 hours, every day',
    bio: 'Founded the hospital and leads its medical team. Sees adults with high blood pressure, diabetes, and heart, lung and kidney disease.',
    featured: true,
    leadership: 'Founder and Medical Director',
  },
  {
    name: 'Dr Demo Dentist',
    group: 'specialist',
    role: 'Dental Surgeon',
    department: 'dental',
    qualifications: 'BDS',
    languages: 'English, Lugbara, Swahili',
    clinicDays: '24 hours, Monday to Saturday',
    bio: 'Runs the dental clinic: check-ups, fillings, extractions and treatment for tooth pain, for adults and children.',
  },
  {
    name: 'Dr Demo Ophthalmologist',
    group: 'specialist',
    role: 'Ophthalmologist',
    department: 'ophthalmology',
    qualifications: 'MBChB, MMed Ophthalmology',
    languages: 'English, Lugbara',
    clinicDays: '24 hours, every day',
    bio: 'Examines and treats eye conditions, from infections and injuries to cataract and glaucoma.',
  },
  {
    name: 'Dr Demo Orthopaedic Surgeon',
    group: 'specialist',
    role: 'Orthopaedic Surgeon',
    department: 'orthopaedics',
    qualifications: 'MBChB, MMed Orthopaedic Surgery',
    languages: 'English, Swahili',
    clinicDays: '24 hours, every day',
    bio: 'Treats broken bones, joint and back pain, and injuries to muscles and ligaments.',
  },

  /* Medical officers */
  {
    name: 'Dr Demo Emergency Medical Officer',
    group: 'medical-officer',
    role: 'Medical Officer, Accident & Emergency',
    department: 'emergency',
    qualifications: 'MBChB',
    languages: 'English, Lugbara, Madi',
    clinicDays: 'Accident & Emergency, on the duty rota',
    bio: 'Leads the emergency team, which assesses and treats injuries, severe illness and emergencies in pregnancy at any hour.',
  },
  {
    name: 'Dr Demo Outpatient Medical Officer',
    group: 'medical-officer',
    role: 'Medical Officer, Outpatient Clinic',
    department: 'outpatient',
    qualifications: 'MBChB',
    languages: 'English, Lugbara, Arabic',
    clinicDays: 'Outpatient clinic, on the duty rota',
    bio: 'Sees adults and children in the outpatient clinic, and helps patients from South Sudan who speak Arabic.',
  },
  {
    name: 'Dr Demo Ward Medical Officer',
    group: 'medical-officer',
    role: 'Medical Officer, Inpatient Wards',
    department: 'inpatient',
    qualifications: 'MBChB',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Daily ward rounds',
    bio: 'Reviews patients on the wards every day and keeps families informed of their progress.',
  },
  {
    name: 'Dr Demo Maternity Medical Officer',
    group: 'medical-officer',
    role: 'Medical Officer, Maternity',
    department: 'maternity',
    qualifications: 'MBChB',
    languages: 'English, Lugbara',
    clinicDays: 'Labour ward, on the duty rota',
    bio: 'Works with the midwives on the labour ward and with the obstetrician on complicated births.',
  },

  /* Heads of departments */
  {
    name: 'Sister Demo Midwife',
    group: 'head',
    role: 'Head of Maternity, Antenatal Care and the Neonatal ICU',
    department: 'maternity',
    qualifications: 'Diploma in Midwifery',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Labour ward and antenatal clinic',
    bio: 'Leads the midwives and the nurses of the maternity unit, the antenatal clinic and the Neonatal ICU.',
    leadership: 'Head of Nursing and Midwifery',
  },
  {
    name: 'Sister Demo Nursing Officer',
    group: 'head',
    role: 'Head of Nursing, Outpatient Clinic and Wards',
    department: 'inpatient',
    qualifications: 'Diploma in Nursing',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Wards and outpatient clinic',
    bio: 'Leads the nurses in the outpatient clinic, the wards and the immunisation clinic.',
  },
  {
    name: 'Demo Laboratory Manager',
    group: 'head',
    role: 'Head of Laboratory',
    department: 'laboratory',
    qualifications: 'BSc Biomedical Laboratory Technology',
    languages: 'English, Lugbara',
    clinicDays: 'Laboratory',
    bio: 'Runs the laboratory day and night, and makes sure every result is accurate and reaches the right clinician.',
  },
  {
    name: 'Demo Radiographer',
    group: 'head',
    role: 'Head of Imaging',
    department: 'imaging',
    qualifications: 'Diploma in Diagnostic Radiography',
    languages: 'English, Swahili',
    clinicDays: 'Imaging unit, 24 hours',
    bio: 'Runs the ultrasound and X-ray unit, including the daily pregnancy and specialist scans.',
  },
  {
    name: 'Demo Pharmacist',
    group: 'head',
    role: 'Head of Pharmacy',
    department: 'pharmacy',
    qualifications: 'Bachelor of Pharmacy',
    languages: 'English, Lugbara',
    clinicDays: 'Pharmacy',
    bio: 'Runs the pharmacy and makes sure medicines are safe, in stock and clearly explained to patients.',
  },
  {
    name: 'Demo Ambulance Coordinator',
    group: 'head',
    role: 'Head of Ambulance Services',
    department: 'ambulance',
    qualifications: 'Diploma in Emergency Medical Care',
    languages: 'English, Lugbara, Swahili',
    clinicDays: 'Ambulance, 24 hours',
    bio: 'Coordinates the ambulance, emergency calls and transfers between hospitals.',
  },
];

module.exports = { DOCTORS };

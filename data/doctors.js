/* Doctors and other clinicians shown in the "Find a doctor" directory at /doctors/.
   The directory page and its menu links are only built when this list has at least one entry, so
   nothing appears on the site until real, consented profiles are added. Edit here, then run "npm run build".

   Fields:
     name           Full name as registered, e.g. 'Dr Jane Example'
     role           e.g. 'Consultant Obstetrician and Gynaecologist'
     department     A department slug from data/departments.js, e.g. 'maternity'
     qualifications e.g. 'MBChB (Mak), MMed Obs/Gyn (Mak)'
     registration   Professional council registration, e.g. 'UMDPC registration no. …'
     languages      e.g. 'English, Lugbara, Swahili'
     clinicDays     e.g. 'Tuesday and Thursday mornings'
     photo          Optional: a file name in assets/doctors/, e.g. 'jane-example.jpg' (square, at least 400 px)
     bio            Two or three sentences in plain language

   Example (copy, fill in, and remove the slashes):
   // { name: 'Dr …', role: '…', department: 'maternity', qualifications: '…', registration: '…',
   //   languages: 'English, Lugbara', clinicDays: '…', photo: '', bio: '…' },
*/

const DOCTORS = [];

module.exports = { DOCTORS };

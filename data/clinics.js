/* Specialist clinic days, shown as a weekly timetable on the patient guide (/patients/#clinic-days).
   The timetable section only appears when this list has at least one entry. Edit here, then run "npm run build".

   DEMO DATA: the timetable below is invented for the internal preview, to match the demo clinicians in
   data/doctors.js. Replace it with the hospital's real clinic days, or empty the list, before launch.

   Fields: day ('Monday' … 'Sunday'), clinic, time, clinician (optional), department (optional slug).
*/

const CLINICS = [
  { day: 'Monday', clinic: 'Diabetes and blood pressure clinic', time: '8:00 am – 1:00 pm', clinician: 'Dr Demo Physician', department: 'internal-medicine' },
  { day: 'Monday', clinic: 'Surgical clinic', time: '9:00 am – 1:00 pm', clinician: 'Dr Demo Surgeon', department: 'surgery' },
  { day: 'Tuesday', clinic: 'Antenatal clinic', time: '8:00 am – 1:00 pm', clinician: 'Dr Demo Obstetrician and the midwives', department: 'maternity' },
  { day: 'Tuesday', clinic: 'Pregnancy and specialist ultrasound', time: '9:00 am – 4:00 pm', clinician: 'Dr Demo Radiologist', department: 'imaging' },
  { day: 'Wednesday', clinic: 'Gynaecology and family planning clinic', time: '9:00 am – 1:00 pm', clinician: 'Dr Demo Obstetrician', department: 'gynaecology' },
  { day: 'Wednesday', clinic: 'Medical review clinic', time: '8:00 am – 1:00 pm', clinician: 'Dr Demo Physician', department: 'internal-medicine' },
  { day: 'Thursday', clinic: 'Antenatal clinic', time: '8:00 am – 1:00 pm', clinician: 'Sister Demo Midwife and the midwives', department: 'maternity' },
  { day: 'Thursday', clinic: 'Child immunisation and growth checks', time: '8:30 am – 12:30 pm', clinician: 'Children’s clinic nurses', department: 'paediatrics' },
  { day: 'Thursday', clinic: 'Surgical clinic', time: '2:00 pm – 5:00 pm', clinician: 'Dr Demo Surgeon', department: 'surgery' },
  { day: 'Friday', clinic: 'Diabetes and blood pressure clinic', time: '8:00 am – 1:00 pm', clinician: 'Dr Demo Physician', department: 'internal-medicine' },
  { day: 'Saturday', clinic: 'Children’s clinic', time: '9:00 am – 1:00 pm', clinician: 'Dr Demo Paediatrician', department: 'paediatrics' },
];

module.exports = { CLINICS };

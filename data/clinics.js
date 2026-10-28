/* Specialist clinic days, shown as a table on the patient guide (/patients/#clinic-days) and in the facts
   strip of each department page. The section only appears when this list has at least one entry.
   Edit here, then run "npm run build".

   The clinics and their days were confirmed by the hospital on 28 October 2026. No times were given,
   so each clinic runs for 24 hours on its days, as the hospital asked.

   Fields: clinic, days (as patients should read them), department (a slug from data/departments.js),
   time, clinician (optional).
*/

const CLINICS = [
  { clinic: 'Antenatal clinic', days: 'Every day', time: '24 hours', department: 'antenatal' },
  { clinic: 'Pregnancy and specialist ultrasound', days: 'Every day', time: '24 hours', department: 'imaging' },
  { clinic: 'Gynaecology clinic', days: 'Every day', time: '24 hours', department: 'obstetrics-gynaecology' },
  { clinic: 'Surgical clinic', days: 'Tuesday', time: '24 hours', department: 'surgery' },
  { clinic: 'Paediatric clinic', days: 'Friday, Saturday and Sunday', time: '24 hours', department: 'paediatrics' },
  { clinic: 'Immunisation clinic', days: 'Monday and Friday', time: '24 hours', department: 'immunisation' },
];

module.exports = { CLINICS };

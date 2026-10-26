/* Specialist clinic days, shown as a weekly timetable on the patient guide (/patients/#clinic-days).
   The timetable section only appears when this list has at least one entry. Edit here, then run "npm run build".

   Fields: day ('Monday' … 'Sunday'), clinic, time, clinician (optional), department (optional slug).

   Example:
   // { day: 'Tuesday', clinic: 'Antenatal clinic', time: '8:00 am – 1:00 pm', clinician: 'Midwifery team', department: 'maternity' },
*/

const CLINICS = [];

module.exports = { CLINICS };

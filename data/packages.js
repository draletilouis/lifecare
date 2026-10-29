/* Health check packages, shown on /packages/. Edit here, then run "npm run build".

   "price" is shown as written (for example 'UGX 85,000'). Leave it null until the hospital confirms
   it, and the page says "Price on request". Confirm every item in "includes" with the laboratory and
   the medical director before launch.

   HIV testing is always voluntary and is never part of an employment or school check: Ugandan law
   does not allow compulsory HIV testing for employment. */

const PACKAGES = [
  {
    id: 'general',
    name: 'General health check',
    for: 'Adults who want a routine check-up',
    includes: ['Consultation with a clinician', 'Blood pressure, weight and body mass index', 'Blood sugar', 'Full blood count', 'Urine test', 'Advice on your results'],
    price: null,
  },
  {
    id: 'over-40',
    name: 'Over-40 health check',
    for: 'Adults over 40, or younger adults with a family history of heart disease, stroke or diabetes',
    includes: ['Everything in the general health check', 'Cholesterol', 'Kidney function', 'Liver function', 'Cervical cancer screening for women', 'A follow-up plan with a clinician'],
    price: null,
  },
  {
    id: 'antenatal',
    name: 'Antenatal first visit',
    for: 'Women at their first antenatal visit',
    includes: ['Pregnancy test', 'Pregnancy scan', 'Malaria test', 'Urine test', 'Full blood count', 'Blood group', 'HIV test, with counselling', 'Syphilis test', 'Blood sugar test', 'Sickle cell test', 'Hepatitis B test'],
    price: null,
  },
  {
    id: 'child',
    name: 'Child wellness check',
    for: 'Babies and children up to 12 years',
    includes: ['Growth and development check', 'Review of the vaccines due on the child health card', 'Haemoglobin', 'Deworming and vitamin A when due', 'Advice on feeding and nutrition'],
    price: null,
  },
  {
    id: 'women',
    name: 'Women’s health check',
    for: 'Women from the age of 25',
    includes: ['Consultation with a clinician', 'Cervical cancer screening', 'Breast examination', 'Blood pressure and blood sugar', 'Full blood count', 'Family planning advice if you would like it'],
    price: null,
  },
  {
    id: 'medical-exam',
    name: 'Employment or school medical',
    for: 'Anyone who needs a medical form completed',
    includes: ['Medical examination and completion of your form', 'Eyesight check', 'Full blood count and urine test', 'Other tests your employer or school asks for, such as a chest X-ray or hepatitis B test'],
    price: null,
  },
];

module.exports = { PACKAGES };

/* The hospital's departments. Each entry becomes a page at /departments/<slug>/ and appears
   in the menus, the department directory, the homepage tiles and the appointment form.
   Edit here, then run "npm run build".

   An entry with "href" links to a page that is written by hand instead (Emergency).
   "hours" names a row of the hours table in data/site.js.
   "keywords" are extra words the department search on /departments/ should match.
   "photo" names a photograph in assets/photos (<file>-800.jpg and <file>-1600.jpg); it is optional.

   Every service named here must be confirmed by the hospital's medical director before launch. */

const CATEGORIES = [
  { id: 'urgent', name: 'Emergency and everyday care' },
  { id: 'family', name: 'Women and children' },
  { id: 'surgical', name: 'Surgery and hospital stays' },
  { id: 'support', name: 'Tests, medicines and dental care' },
];

const DEPARTMENTS = [
  {
    slug: 'emergency',
    keywords: 'accident emergency casualty injury urgent ambulance trauma night',
    href: '/emergency/',
    name: 'Accident & Emergency',
    category: 'urgent',
    icon: 'ambulance',
    card: 'Day and night care for injuries, sudden illness and emergencies in pregnancy.',
  },

  {
    slug: 'outpatient',
    photo: { file: 'consultation', alt: 'A doctor talks with a patient across a desk, a blood pressure monitor beside them.', position: '35% 50%' },
    keywords: 'opd doctor consultation fever malaria cough general check-up medical form walk-in',
    name: 'Outpatient Clinic',
    category: 'urgent',
    icon: 'stethoscope',
    hours: 'Outpatient clinic',
    card: 'See a doctor for illness, check-ups and referrals, with tests and medicines in the same building.',
    summary: 'Walk in or book ahead to see a clinician about any health concern, for adults and children.',
    intro: [
      'The outpatient clinic is where most visits to Life Care begin. Whether you have a fever, a cough that will not go away, pain, a skin problem or simply want a check-up, our clinicians will listen, examine you and explain what they find.',
      'If you need tests, the laboratory and imaging units are in the same building, so most patients leave with results and a treatment plan on the same visit.',
    ],
    services: [
      ['General consultations', 'Assessment and treatment of common illnesses in adults and children, such as malaria, chest and urinary infections, stomach problems and skin conditions.'],
      ['Malaria testing and treatment', 'Every fever is tested for malaria, and treatment starts the same day when malaria is confirmed.'],
      ['Health check-ups', 'Blood pressure, blood sugar, weight and other routine checks, for individuals, families and employers.'],
      ['Medical examinations', 'Examinations and completed forms for employment, school and other requirements.'],
      ['Minor procedures', 'Wound dressing, stitching and removal of stitches, draining of abscesses, and injections.'],
      ['Referrals', 'Referral to our specialist clinics, or to a referral hospital when you need care we do not provide, with a letter summarising your care.'],
    ],
    whenToCome: [
      'Fever, headache or body pains',
      'A cough, cold or chest infection (come to Emergency if breathing is difficult)',
      'Stomach pain, diarrhoea or vomiting',
      'Pain or burning when passing urine',
      'Skin rashes, wounds and minor injuries',
      'A routine check-up or a follow-up visit',
    ],
    bring: [
      'National ID, refugee ID or passport',
      'Your insurance card or employer letter, if you are covered',
      'Any medicines you are taking, and previous results or medical forms',
      'For children: the child health card',
    ],
    faqs: [
      ['Do I need an appointment?', 'No. Walk-in patients are welcome during clinic hours. Booking ahead helps us plan and can shorten your wait, especially for a check-up or a follow-up visit.'],
      ['Can I be seen on a Sunday or at night?', 'Yes. Outside clinic hours, patients are seen in Accident & Emergency, which is open 24 hours.'],
      ['What if I need a specialist?', 'Your clinician will refer you to the right clinic here. If you need a service we do not offer, we will refer you to a hospital that does and give you a referral letter.'],
    ],
    related: ['laboratory', 'pharmacy', 'internal-medicine'],
  },

  {
    slug: 'internal-medicine',
    photo: { file: 'blood-pressure', alt: 'A clinician in blue scrubs checks an older man’s blood pressure.', position: '50% 40%' },
    keywords: 'physician blood pressure hypertension sugar diabetes asthma heart kidney chronic adult',
    name: 'Internal Medicine',
    category: 'urgent',
    icon: 'heart-pulse',
    hours: 'Outpatient clinic',
    card: 'Care for adults with high blood pressure, diabetes, asthma and other long-term or serious medical conditions.',
    summary: 'Diagnosis and long-term care for adults with chronic and complex medical conditions.',
    intro: [
      'Conditions such as high blood pressure and diabetes often cause no symptoms until they have done harm. Our medical team finds them early and works with you to keep them under control, with regular reviews, clear advice and medicines you understand.',
      'We also care for adults admitted with serious medical illness, such as severe malaria, pneumonia or the complications of a long-term condition.',
    ],
    services: [
      ['High blood pressure', 'Diagnosis, treatment and regular reviews to protect your heart, brain and kidneys.'],
      ['Diabetes', 'Blood sugar monitoring, medicines and advice on diet, activity and care of your feet and eyes.'],
      ['Asthma and lung conditions', 'Assessment, inhaler technique and plans that help you breathe more easily.'],
      ['Heart and kidney conditions', 'Assessment and long-term follow-up, with referral for specialised tests when they are needed.'],
      ['Serious infections', 'Inpatient care for severe malaria, typhoid, pneumonia and other infections that need close monitoring.'],
      ['Health screening', 'Checks of blood pressure, blood sugar, cholesterol, kidney and liver function.'],
    ],
    whenToCome: [
      'You have been told your blood pressure or blood sugar is high',
      'You are always tired, very thirsty or passing urine often',
      'You have frequent headaches, swollen feet or get breathless easily',
      'You need a review and repeat medicines for a long-term condition',
      'You are over 40 and have never had your blood pressure or sugar checked',
    ],
    bring: [
      'All the medicines you are taking, in their packets',
      'Your treatment book or previous results',
      'National ID, refugee ID or passport, and your insurance card',
    ],
    faqs: [
      ['How often should I come for a review?', 'It depends on your condition and how well it is controlled. Your doctor will agree a review plan with you; many patients with stable blood pressure or diabetes come every one to three months.'],
      ['Can I get my repeat medicines here?', 'Yes. Bring your current medicines or prescription to your review. The doctor will renew your prescription and our pharmacy can dispense it the same day.'],
      ['Should I stop my medicine when I feel well?', 'No. Blood pressure and diabetes medicines work only while you take them. Talk to your doctor before stopping or changing any medicine.'],
    ],
    related: ['laboratory', 'pharmacy', 'inpatient'],
  },

  {
    slug: 'maternity',
    photo: { file: 'midwife-ward', alt: 'A midwife in pink scrubs cares for a mother and baby on the ward while a relative watches.', position: '50% 50%' },
    keywords: 'pregnancy pregnant antenatal anc delivery birth labour mother baby midwife caesarean c-section postnatal',
    name: 'Maternity',
    category: 'family',
    icon: 'hand-heart',
    hours: 'Maternity and labour ward',
    card: 'Antenatal visits, safe delivery and care for mother and baby after birth, day and night.',
    summary: 'Care for you and your baby from the first antenatal visit to the weeks after birth, with a labour ward open day and night.',
    intro: [
      'Our midwives and doctors look after women through pregnancy, labour and the weeks after birth. Start antenatal care early, ideally in the first three months, so we can check your health and your baby’s growth and plan a safe delivery with you.',
      'If complications arise in pregnancy or labour, our team can perform a caesarean section in the hospital’s own theatre.',
    ],
    services: [
      ['Antenatal care', 'Regular check-ups, blood tests and ultrasound scans, with advice on nutrition, malaria prevention and preparing for birth.'],
      ['Labour and delivery', 'A labour ward staffed by midwives day and night, with a doctor on call for any complication.'],
      ['Caesarean section', 'Planned and emergency caesarean sections in our own theatre.'],
      ['Care after birth', 'Checks for mother and baby, support with breastfeeding, and your baby’s first vaccines.'],
      ['Higher-risk pregnancies', 'Closer follow-up for mothers with high blood pressure, diabetes, a previous caesarean, twins or other risks.'],
      ['Family planning after birth', 'Advice on spacing your next pregnancy and a choice of methods before you go home.'],
    ],
    whenToCome: [
      'For your first antenatal visit, ideally before 12 weeks of pregnancy',
      'For each antenatal visit on your card',
      'When labour starts: regular, painful contractions, a “show” or your waters breaking',
      'For your postnatal check in the first week after birth',
    ],
    warning: {
      title: 'Danger signs in pregnancy: come immediately, day or night',
      items: [
        'Bleeding from the vagina',
        'Severe headache, blurred vision or fits',
        'Fever, or severe pain in the abdomen',
        'Fast or difficult breathing',
        'Your baby moving less than usual',
        'Your waters breaking before labour starts',
      ],
    },
    bring: [
      'Your antenatal card and any scan or test results',
      'National ID, refugee ID or passport, and your insurance card',
      'For delivery: clothes and wrappers for you and your baby, sanitary pads, and the items on the delivery list from your antenatal visits',
    ],
    faqs: [
      ['When should I start antenatal care?', 'As early as possible, ideally before 12 weeks. If you are further along, come anyway: it is never too late to start.'],
      ['Can I book a caesarean section?', 'A caesarean is planned when there is a medical reason for it. Your doctor will discuss the safest way for you to give birth during your antenatal visits.'],
      ['Will my baby be vaccinated before we go home?', 'Yes. Babies born here receive the vaccines due at birth, and you can return to our children’s clinic for the rest of the immunisation schedule.'],
    ],
    related: ['gynaecology', 'paediatrics', 'imaging'],
  },

  {
    slug: 'gynaecology',
    photo: { file: 'doctor-portrait', alt: 'A smiling doctor in a white coat with a stethoscope.', position: '50% 25%' },
    keywords: 'women obstetrics gynecology period menstruation fertility infertility family planning contraception cervical screening fibroids',
    name: 'Gynaecology & Family Planning',
    category: 'family',
    icon: 'venus',
    hours: 'Outpatient clinic',
    card: 'Period problems, fertility concerns, cervical cancer screening and family planning.',
    summary: 'Private, respectful care for women’s health concerns, cervical cancer screening and a choice of family planning methods.',
    intro: [
      'From painful or irregular periods to fertility worries and the menopause, our team offers a private place to talk and get answers.',
      'Consultations are confidential. You can ask to be seen by a female clinician, and we will arrange it whenever one is available.',
    ],
    services: [
      ['Gynaecology consultations', 'Period problems, pelvic pain, discharge and infections, fibroids and the menopause.'],
      ['Fertility assessment', 'First tests for couples trying to conceive, with referral for specialised treatment when needed.'],
      ['Cervical cancer screening', 'Screening that finds early changes before they become cancer, with treatment or referral if anything is found.'],
      ['Family planning', 'Counselling and a choice of short- and long-acting methods, including pills, injections, implants and IUDs.'],
      ['Sexual health', 'Confidential testing and treatment for sexually transmitted infections, including treatment for partners.'],
      ['Early pregnancy care', 'Care for bleeding in early pregnancy and after a miscarriage, with ultrasound assessment.'],
    ],
    whenToCome: [
      'Periods that are very heavy, painful or irregular',
      'Bleeding between periods, after sex or after the menopause',
      'Lower abdominal pain or an unusual discharge',
      'You have been trying to conceive for a year without success',
      'You want to start, stop or change a family planning method',
      'You are due for cervical cancer screening',
    ],
    bring: [
      'National ID, refugee ID or passport, and your insurance card',
      'Any previous results, scans or medicines',
      'The date your last period started',
    ],
    faqs: [
      ['Will my visit be kept private?', 'Yes. What you tell us is confidential and shared only with the people caring for you, unless you agree otherwise or the law requires it.'],
      ['Which family planning method is right for me?', 'It depends on your health, whether and when you want more children, and your preferences. A provider will explain each option, how long it lasts and its possible side effects, so you can choose.'],
      ['Does cervical screening hurt?', 'Most women feel only mild discomfort for a few minutes. The clinician will explain each step and you can ask them to stop at any time.'],
    ],
    related: ['maternity', 'laboratory', 'imaging'],
  },

  {
    slug: 'paediatrics',
    photo: { file: 'clinic-child', alt: 'A doctor at her desk turns to talk with a young girl.', position: '50% 50%' },
    keywords: 'paediatrics pediatrics child children baby newborn immunisation vaccination vaccine growth',
    name: 'Children’s Clinic',
    category: 'family',
    icon: 'baby',
    hours: 'Outpatient clinic',
    card: 'Care for sick children, newborn checks, immunisation and growth checks.',
    summary: 'Clinics and a ward for babies, children and teenagers, including immunisation and growth checks.',
    intro: [
      'Children’s illnesses can change quickly, and children need clinicians who know how to examine them and how to talk to them, and to you. Our children’s team sees sick children every day and admits those who need closer care.',
      'Malaria, pneumonia and diarrhoea remain the most common serious illnesses in young children in West Nile. Early testing and treatment save lives, so bring your child as soon as you are worried.',
    ],
    services: [
      ['Sick child consultations', 'Assessment and treatment of fever, cough, diarrhoea, rashes and other childhood illnesses.'],
      ['Newborn care', 'Newborn checks, help with feeding, and assessment of jaundice and other early problems.'],
      ['Immunisation', 'Vaccines on Uganda’s national immunisation schedule, with every dose recorded on your child’s health card.'],
      ['Growth and nutrition', 'Weight and height checks, screening for malnutrition, and advice on breastfeeding and feeding.'],
      ['Children’s admissions', 'Inpatient care for severe malaria, pneumonia, dehydration and other serious illness.'],
      ['Deworming and vitamin A', 'Routine doses for young children, given at the clinic.'],
    ],
    warning: {
      title: 'Bring your child immediately if they',
      items: [
        'Cannot drink or breastfeed',
        'Vomit everything',
        'Have fits (convulsions)',
        'Are very sleepy or hard to wake',
        'Breathe fast or with difficulty',
        'Are under two months old and have a fever',
      ],
    },
    whenToCome: [
      'Fever, cough, diarrhoea or vomiting',
      'A rash, ear pain or sore throat',
      'Poor feeding or poor weight gain',
      'Vaccines that are due or were missed',
      'A check-up or growth review',
    ],
    bring: [
      'Your child’s health card',
      'Any medicines your child has taken for this illness',
      'A parent’s or guardian’s ID, and your insurance card',
    ],
    faqs: [
      ['Should I wait to see whether the fever goes down?', 'No. In West Nile a child with fever should be tested for malaria the same day. Please do not give leftover medicines at home before your child has been tested.'],
      ['My child was born elsewhere. Can they get vaccines here?', 'Yes. Bring the child health card so we can see which doses are due.'],
      ['Can I stay with my child if they are admitted?', 'Yes. A parent or caregiver stays with their child on the ward.'],
    ],
    related: ['maternity', 'laboratory', 'inpatient'],
  },

  {
    slug: 'surgery',
    keywords: 'surgeon operation theatre hernia appendix circumcision lump wound',
    name: 'Surgery & Theatre',
    category: 'surgical',
    icon: 'scalpel',
    photo: { file: 'operating-theatre', alt: 'A theatre nurse prepares instruments in a modern operating theatre.', position: '60% 50%' },
    hours: 'Outpatient clinic',
    card: 'Planned and emergency operations, including hernia repairs and caesarean sections.',
    summary: 'Assessment, operations and recovery care for general surgical conditions, planned or in an emergency.',
    intro: [
      'Our surgical team sees you in clinic, explains your options and what to expect, and plans your operation with you. Emergency operations, such as for appendicitis or a complicated delivery, are performed day and night.',
      'Before any operation we explain the procedure, its benefits and risks and the anaesthetic, give you an estimate of the cost, and ask for your written consent.',
    ],
    services: [
      ['General surgery', 'Operations for hernias, lumps and swellings, appendicitis and other abdominal conditions.'],
      ['Emergency surgery', 'Assessment and surgery for acute abdominal pain, injuries and other urgent conditions, at any hour.'],
      ['Caesarean section', 'Planned and emergency caesarean sections, with the maternity team.'],
      ['Minor surgery', 'Removal of cysts and small lumps, circumcision, draining of abscesses and wound care.'],
      ['Injuries and wounds', 'Treatment of cuts, burns and injuries, with referral to an orthopaedic surgeon when needed.'],
      ['Surgical clinic', 'Assessment before an operation, and wound checks and follow-up afterwards.'],
    ],
    whenToCome: [
      'A lump or swelling anywhere on the body',
      'A bulge in the groin or abdomen that may be a hernia',
      'A wound that is not healing',
      'You have been referred for an operation',
      'A check after your operation',
    ],
    warning: {
      title: 'Go straight to Accident & Emergency for',
      items: [
        'Severe or worsening pain in the abdomen',
        'A hernia that has become painful, hard or cannot be pushed back',
        'Heavy bleeding or a deep wound',
        'Vomiting with a swollen abdomen',
      ],
    },
    bring: [
      'Your referral letter and any scans or results',
      'All the medicines you take',
      'National ID, refugee ID or passport, and your insurance card or approval',
      'A relative or friend to support you on the day of your operation',
    ],
    faqs: [
      ['Will I know the cost before my operation?', 'Yes. For planned operations we give you an estimate covering theatre, anaesthesia, your ward stay and medicines, so you can prepare or get approval from your insurer.'],
      ['Do I need to stop eating before surgery?', 'Yes. Do not eat or drink for the time your surgical team tells you before the operation. This keeps you safe under anaesthesia.'],
      ['How soon can I go home?', 'After many minor operations you go home the same day. After larger operations most patients stay a few days. Your surgeon will tell you what to expect.'],
    ],
    related: ['inpatient', 'imaging', 'laboratory'],
  },

  {
    slug: 'inpatient',
    photo: { file: 'nurse-ward', alt: 'A nurse in pink scrubs leans over a patient resting on a bed covered in a bright wrapper.', position: '50% 50%' },
    keywords: 'admission ward bed stay visiting attendant nursing',
    name: 'Inpatient Wards',
    category: 'surgical',
    icon: 'bed',
    hours: 'Inpatient wards',
    showVisiting: true,
    card: 'Round-the-clock nursing and daily doctor reviews for patients who need to stay in hospital.',
    summary: 'When you need to stay in hospital, nurses care for you day and night and a doctor reviews you every day.',
    intro: [
      'Patients are admitted from Accident & Emergency, the outpatient clinic, maternity or after an operation. On the ward, nurses monitor you and give your treatment around the clock, and a doctor reviews you on a ward round every day.',
      'We keep you and your family informed. Ask the nurse in charge at any time about your treatment plan, your progress or your bill.',
    ],
    services: [
      ['Adult medical and surgical care', 'Nursing and treatment for adults recovering from illness or an operation.'],
      ['Maternity and newborn care', 'Care for mothers and babies after delivery.'],
      ['Children’s admissions', 'Care for sick children, with a parent or caregiver at the bedside.'],
      ['Daily ward rounds', 'A doctor reviews every patient each day and updates the plan.'],
      ['Discharge planning', 'Your medicines, a discharge summary and a follow-up date before you leave.'],
      ['Clear billing', 'Ask for an update on your bill at any time during your stay.'],
    ],
    whenToCome: [
      'Admission is arranged by a clinician after you are assessed in Emergency, the clinic or maternity',
      'Planned admissions for an operation are booked through the surgical clinic',
    ],
    bring: [
      'National ID, refugee ID or passport',
      'Your insurance card, or the approval from your insurer',
      'All the medicines you take',
      'Nightwear, a change of clothes, a towel, toiletries and slippers',
      'A phone and charger, so the ward can keep in touch with your family',
    ],
    faqs: [
      ['Can a relative stay with me?', 'An attendant can usually stay with children, mothers and patients who need extra help. Ask the nurse in charge about the ward’s arrangements.'],
      ['Do I pay a deposit when I am admitted?', 'Ask the billing office about the deposit for your admission. If you are insured, our billing team will help you request approval from your insurer.'],
      ['Can I bring food from home?', 'Please check with the nurse first, as some patients need a special diet or must not eat before tests or surgery.'],
    ],
    related: ['surgery', 'internal-medicine', 'pharmacy'],
  },

  {
    slug: 'laboratory',
    photo: { file: 'laboratory', alt: 'A laboratory scientist in a white coat looks through a microscope.', position: '50% 40%' },
    keywords: 'lab test blood urine stool malaria hiv typhoid sugar results',
    name: 'Laboratory',
    category: 'support',
    icon: 'microscope',
    hours: 'Laboratory',
    card: 'Blood, urine and stool tests for diagnosis and check-ups, with most routine results the same day.',
    summary: 'Blood, urine and stool tests on site. Most routine results are ready the same day.',
    intro: [
      'Our laboratory supports every department in the hospital, from a malaria test in the outpatient clinic to blood grouping before an operation. Because it is on site, your clinician can usually see your results and start treatment on the same visit.',
      'You can also bring a request form from another clinic or doctor and have your tests done here.',
    ],
    services: [
      ['Blood counts and grouping', 'Full blood count, haemoglobin, blood grouping and cross-matching.'],
      ['Malaria and infections', 'Malaria tests, and tests for typhoid, brucellosis, syphilis and hepatitis B.'],
      ['HIV testing', 'Voluntary, confidential testing with counselling before and after.'],
      ['Blood chemistry', 'Blood sugar, kidney and liver function, and cholesterol.'],
      ['Urine and stool tests', 'Urinalysis, pregnancy tests and stool examination.'],
      ['Check-up packages', 'Groups of tests for routine check-ups and employment requirements.'],
    ],
    whenToCome: [
      'With a request form from a Life Care clinician',
      'With a request form from another clinic or doctor',
      'For routine check-up or employment tests',
    ],
    bring: [
      'Your request form',
      'If your clinician asked you to fast: no food for 8 to 12 hours before the test (plain water is fine)',
      'For some urine tests, the first urine of the morning in a clean container we provide',
    ],
    faqs: [
      ['Do I need to fast before my test?', 'Only for some tests, such as fasting blood sugar and cholesterol. For these, eat nothing for 8 to 12 hours before; you can drink plain water. Your clinician will tell you if fasting is needed.'],
      ['How do I get my results?', 'Results go to the clinician who requested them, who will explain them to you. You can also ask for a printed copy.'],
      ['Is HIV testing confidential?', 'Yes. Testing is voluntary, includes counselling, and your result is shared only with you and the clinicians caring for you.'],
    ],
    related: ['outpatient', 'imaging', 'pharmacy'],
  },

  {
    slug: 'imaging',
    keywords: 'scan ultrasound x-ray xray radiology pregnancy scan imaging',
    name: 'Ultrasound & X-ray',
    category: 'support',
    icon: 'scan',
    hours: 'Imaging (ultrasound and X-ray)',
    card: 'Ultrasound scans, including pregnancy scans, and X-rays, with a written report for your clinician.',
    summary: 'Ultrasound scans, including pregnancy scans, and X-rays, with a written report for your clinician.',
    intro: [
      'Imaging helps your clinician find the cause of a problem quickly and safely. Ultrasound uses sound waves, not radiation, so it is safe in pregnancy. X-rays use a small, controlled dose of radiation and are the quickest way to check bones and the chest.',
      'Every examination is reviewed and a written report goes to the clinician who requested it.',
    ],
    services: [
      ['Pregnancy scans', 'Dating, growth checks and the position of the baby and placenta.'],
      ['Abdominal and pelvic ultrasound', 'The liver, gall bladder, kidneys, bladder, womb, ovaries and prostate.'],
      ['Small-parts ultrasound', 'Breast, thyroid, scrotum and lumps under the skin.'],
      ['Chest X-ray', 'For coughs, chest infections and check-ups.'],
      ['Bone and joint X-ray', 'For injuries, suspected fractures and joint pain.'],
      ['Written reports', 'A report on every examination, sent to your clinician.'],
    ],
    whenToCome: [
      'With a request from a Life Care clinician',
      'With a request form from another clinic or doctor',
    ],
    bring: [
      'Your request form and any previous scans or X-rays',
      'For a pelvic scan: drink about a litre of water an hour before and do not pass urine until after the scan',
      'For an abdominal scan: do not eat for 6 hours before (plain water is fine)',
      'Before an X-ray, tell the staff if you are or might be pregnant',
    ],
    faqs: [
      ['Is ultrasound safe in pregnancy?', 'Yes. Ultrasound uses sound waves, not radiation, and is used routinely in pregnancy.'],
      ['Do I need a request form?', 'Yes. Scans and X-rays are done on a clinician’s request, so that the right examination is done and the result goes to someone who can act on it. If you do not have one, a clinician in our outpatient clinic can see you first.'],
      ['When will I get my report?', 'Most reports are ready on the same day. Your clinician will go through the result with you.'],
    ],
    related: ['maternity', 'outpatient', 'surgery'],
  },

  {
    slug: 'pharmacy',
    keywords: 'medicine drugs prescription chemist tablets',
    name: 'Pharmacy',
    category: 'support',
    icon: 'pill',
    hours: 'Pharmacy',
    card: 'Prescriptions dispensed in the same building, with clear advice on how to take each medicine.',
    summary: 'Your prescription dispensed in the same building, with clear advice on how to take each medicine safely.',
    intro: [
      'Our pharmacy dispenses prescriptions from Life Care clinicians and other prescribers. Medicines are bought from suppliers licensed by the National Drug Authority and stored as the manufacturer requires.',
      'Our pharmacy staff explain how and when to take each medicine, which side effects to look out for, and what to do if you miss a dose. Ask any question, however small.',
    ],
    services: [
      ['Prescriptions', 'Prescriptions from our clinicians and from other prescribers dispensed promptly.'],
      ['Medicine advice', 'How to take each medicine, how to store it, and what to avoid while taking it.'],
      ['Repeat medicines', 'Regular supplies for long-term conditions, such as high blood pressure and diabetes.'],
      ['Ward pharmacy', 'Medicines supplied to the wards, theatre and emergency unit day and night.'],
      ['Medicine safety checks', 'Checks for allergies, interactions and safety in pregnancy and breastfeeding.'],
    ],
    whenToCome: [
      'After your consultation, with your prescription',
      'With a prescription from another clinic or doctor',
      'For repeat medicines for a long-term condition',
    ],
    bring: [
      'Your prescription',
      'Your insurance card, if your medicines are covered',
      'A list of your other medicines, so we can check they are safe together',
    ],
    faqs: [
      ['Can I buy medicines without a prescription?', 'Some everyday medicines can be bought without one. Antibiotics and other prescription-only medicines need a prescription from a qualified prescriber, to protect you and to slow antibiotic resistance.'],
      ['Should I finish my antibiotics if I feel better?', 'Take antibiotics exactly as prescribed, for the full course, unless your clinician tells you to stop.'],
      ['Can I return medicines I did not use?', 'For safety, medicines cannot be resold once they have left the pharmacy. Bring unused medicines and we will dispose of them safely.'],
    ],
    related: ['outpatient', 'internal-medicine', 'laboratory'],
  },

  {
    slug: 'dental',
    photo: { file: 'dentist-child', alt: 'A dentist in gloves treats a young boy’s teeth.', position: '50% 45%' },
    keywords: 'dentist teeth tooth toothache gum filling extraction',
    name: 'Dental Clinic',
    category: 'support',
    icon: 'tooth',
    hours: 'Dental clinic',
    card: 'Check-ups, cleaning, fillings, extractions and treatment of tooth pain for the whole family.',
    summary: 'Check-ups, cleaning, fillings and extractions for adults and children.',
    intro: [
      'Toothache, bleeding gums and broken teeth are painful, but most dental problems can be prevented, or treated simply when they are caught early. Our dental team treats the problem today and helps you keep your teeth healthy.',
    ],
    services: [
      ['Check-ups and cleaning', 'Examination, scaling and polishing, and advice on caring for teeth and gums.'],
      ['Fillings', 'Repair of decayed and broken teeth.'],
      ['Extractions', 'Removal of teeth that cannot be saved, with local anaesthetic.'],
      ['Tooth pain and infection', 'Treatment of toothache, abscesses and swelling.'],
      ['Gum care', 'Treatment of bleeding and swollen gums.'],
      ['Children’s dental care', 'Gentle check-ups and treatment for children.'],
    ],
    whenToCome: [
      'Toothache or sensitivity to hot and cold',
      'Bleeding or swollen gums',
      'A broken or loose tooth',
      'A check-up and cleaning every six to twelve months',
    ],
    warning: {
      title: 'Go straight to Accident & Emergency if',
      items: [
        'Your face or neck is swelling from a tooth',
        'You find it hard to swallow, open your mouth or breathe',
        'You have a fever with a dental infection',
      ],
    },
    bring: [
      'National ID, refugee ID or passport, and your insurance card',
      'A list of the medicines you take, especially blood thinners',
    ],
    faqs: [
      ['How often should I have a dental check-up?', 'Most people benefit from a check-up every six to twelve months. Your dentist will advise how often you need one.'],
      ['Does an extraction hurt?', 'The tooth and gum are numbed with a local anaesthetic first, so you feel pressure but should not feel pain.'],
      ['Should I take antibiotics for toothache?', 'Antibiotics alone rarely cure toothache. The cause needs treatment, so see the dentist rather than buying antibiotics.'],
    ],
    related: ['outpatient', 'pharmacy', 'imaging'],
  },
];

module.exports = { CATEGORIES, DEPARTMENTS };

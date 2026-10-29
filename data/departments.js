/* The hospital's departments. Each entry becomes a page at /departments/<slug>/ and appears
   in the menus, the department directory, the homepage tiles and the appointment form.
   Edit here, then run "npm run build".

   An entry with "href" links to a page that is written by hand instead (Emergency).
   "hours" names a row of the hours table in data/site.js. A department without "hours" shows its
   clinic days from data/clinics.js instead, or "Open 24 hours, every day" if it has none (the hospital's
   rule where no time is given).
   "keywords" are extra words the department search on /departments/ should match.
   "photo" names a photograph in assets/photos (<file>-800.jpg and <file>-1600.jpg); it is optional.

   The list of departments and their groups was confirmed by the hospital on 28 October 2026.
   Every service named on each page must still be confirmed by the medical director before launch. */

const CATEGORIES = [
  { id: 'urgent', name: 'Emergency and everyday care' },
  { id: 'family', name: 'Women and children' },
  { id: 'specialist', name: 'Specialist services' },
  { id: 'support', name: 'Tests and medicines' },
  { id: 'ambulance', name: 'Ambulance' },
];

const DEPARTMENTS = [
  /* ---------------------------------------------------------------- Emergency and everyday care */

  {
    slug: 'emergency',
    keywords: 'accident emergency casualty injury urgent trauma night',
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
    card: 'See a doctor at any hour for illness, check-ups and referrals, with tests and medicines in the same building.',
    summary: 'Walk in at any hour, day or night, to see a clinician about any health concern, for adults and children.',
    intro: [
      'The outpatient clinic is where most visits to Life Care begin, and it is open 24 hours a day. Whether you have a fever, a cough that will not go away, pain, a skin problem or simply want a check-up, our clinicians will listen, examine you and explain what they find.',
      'If you need tests, the laboratory and imaging units are in the same building, so most patients leave with results and a treatment plan on the same visit. If you need a specialist, we refer you to the right clinic here.',
    ],
    services: [
      ['General consultations', 'Assessment and treatment of common illnesses in adults and children, such as malaria, chest and urinary infections, stomach problems and skin conditions.'],
      ['Malaria testing and treatment', 'Every fever is tested for malaria, and treatment starts the same day when malaria is confirmed.'],
      ['Health check-ups', 'Blood pressure, blood sugar, weight and other routine checks, for individuals, families and employers.'],
      ['Medical examinations', 'Examinations and completed forms for employment, school and other requirements.'],
      ['Minor procedures', 'Wound dressing, stitching and removal of stitches, draining of abscesses, and injections.'],
      ['Referrals to specialists', 'Referral to our specialist clinics, or to a referral hospital when you need care we do not provide, with a letter summarising your care.'],
    ],
    whenToCome: [
      'Fever, headache or body pains',
      'A cough, cold or chest infection (come to Accident & Emergency if breathing is difficult)',
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
      ['Do I need an appointment?', 'No. Walk-in patients are welcome at any hour. Booking ahead helps us plan and can shorten your wait, especially for a check-up or a follow-up visit.'],
      ['Can I be seen on a Sunday or at night?', 'Yes. The outpatient clinic is open 24 hours a day, every day, including Sundays and public holidays.'],
      ['What if I need a specialist?', 'Your clinician will refer you to the right specialist clinic here. If you need a service we do not offer, we will refer you to a hospital that does and give you a referral letter.'],
    ],
    related: ['laboratory', 'pharmacy', 'physician'],
  },

  {
    slug: 'inpatient',
    bookable: false,
    whenTitle: 'How patients are admitted',
    photo: { file: 'nurse-ward', alt: 'A nurse in pink scrubs leans over a patient resting on a bed covered in a bright wrapper.', position: '50% 50%' },
    keywords: 'admission ward stay visiting attendant nursing',
    name: 'Inpatient Wards',
    category: 'urgent',
    icon: 'bed',
    hours: 'Inpatient wards',
    showVisiting: true,
    card: 'Round-the-clock nursing and daily doctor reviews for patients who need to stay in hospital.',
    summary: 'When you need to stay in hospital, nurses care for you day and night and a doctor reviews you every day.',
    intro: [
      'Patients are admitted from Accident & Emergency, the outpatient clinic, maternity, the specialist clinics or after an operation. On the ward, nurses monitor you and give your treatment around the clock, and a doctor reviews you on a ward round every day.',
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
      'Admission is arranged by a clinician after you are assessed in Accident & Emergency, a clinic or maternity',
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
    related: ['surgery', 'physician', 'pharmacy'],
  },

  /* ---------------------------------------------------------------- Women and children */

  {
    slug: 'maternity',
    photo: { file: 'midwife-ward', alt: 'A midwife in pink scrubs cares for a mother and baby on the ward while a relative watches.', position: '50% 50%' },
    keywords: 'pregnancy pregnant delivery birth labour mother baby midwife caesarean c-section postnatal',
    name: 'Maternity',
    category: 'family',
    icon: 'hand-heart',
    hours: 'Maternity and labour ward',
    card: 'Safe delivery and care for mother and baby after birth, with a labour ward open day and night.',
    summary: 'Labour, delivery and care for you and your baby in the weeks after birth, with a labour ward open day and night.',
    intro: [
      'Our midwives and doctors look after women through labour, birth and the weeks after. The labour ward is open 24 hours a day.',
      'If complications arise in labour, our team can perform a caesarean section in the hospital’s own theatre, and babies who need extra care go to our Neonatal ICU.',
    ],
    services: [
      ['Labour and delivery', 'A labour ward staffed by midwives day and night, with an obstetrician on call for any complication.'],
      ['Caesarean section', 'Planned and emergency caesarean sections in our own theatre.'],
      ['Care after birth', 'Checks for mother and baby, support with breastfeeding, and your baby’s first vaccines.'],
      ['Newborn care', 'A check of every baby after birth, and the Neonatal ICU for babies who need closer care.'],
      ['Higher-risk births', 'Closer care for mothers with high blood pressure, diabetes, a previous caesarean, twins or other risks.'],
      ['Family planning after birth', 'Advice on spacing your next pregnancy and a choice of methods before you go home.'],
    ],
    whenToCome: [
      'When labour starts: regular, painful contractions, a “show” or your waters breaking',
      'If you are past your due date',
      'For your postnatal check in the first week after birth',
      'For antenatal visits during pregnancy, see Antenatal Care',
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
      ['Can I book a caesarean section?', 'A caesarean is planned when there is a medical reason for it. Your obstetrician will discuss the safest way for you to give birth during your antenatal visits.'],
      ['Can my partner be with me in labour?', 'Ask the midwife in charge. One birth companion can usually stay with you, as long as the ward allows it at the time.'],
      ['Will my baby be vaccinated before we go home?', 'Yes. Babies born here receive the vaccines due at birth, and you can return to our immunisation clinic for the rest of the schedule.'],
    ],
    related: ['antenatal', 'neonatal-icu', 'obstetrics-gynaecology'],
  },

  {
    slug: 'antenatal',
    keywords: 'antenatal anc pregnancy pregnant check-up clinic mother baby scan',
    name: 'Antenatal Care',
    category: 'family',
    icon: 'heart',
    card: 'Antenatal check-ups every day, with tests, scans and advice through your pregnancy.',
    summary: 'Antenatal check-ups every day, from your first visit early in pregnancy until your baby is born.',
    intro: [
      'Antenatal care checks your health and your baby’s growth at each stage of pregnancy, and finds problems early, when they are easiest to treat. Start as early as you can, ideally in the first three months.',
      'The antenatal clinic runs every day. Our midwives see you at each visit, and our obstetrician sees women who need closer care.',
    ],
    services: [
      ['Your first visit', 'Your history and an examination, a pregnancy scan, and tests: pregnancy test, malaria, urine test, full blood count, blood group, HIV, syphilis, blood sugar, sickle cell and hepatitis B.'],
      ['Regular check-ups', 'Blood pressure, urine, your baby’s growth and heartbeat at every visit.'],
      ['Pregnancy scans', 'Ultrasound scans to date the pregnancy and check your baby’s growth and position.'],
      ['Protecting you and your baby', 'Medicines to prevent malaria, iron and folic acid, and the tetanus vaccine, as Uganda’s guidelines recommend.'],
      ['Preparing for birth', 'A plan for where and how you will give birth, and what to bring on the day.'],
      ['Higher-risk pregnancies', 'Referral to our obstetrician for high blood pressure, diabetes, a previous caesarean, twins or other risks.'],
    ],
    whenToCome: [
      'For your first visit, ideally before 12 weeks of pregnancy',
      'For each visit marked on your antenatal card',
      'If you have missed visits, come anyway: it is never too late',
    ],
    warning: {
      title: 'Danger signs in pregnancy: come immediately, day or night',
      items: [
        'Bleeding from the vagina',
        'Severe headache, blurred vision or fits',
        'Fever, or severe pain in the abdomen',
        'Your baby moving less than usual',
        'Your waters breaking before labour starts',
      ],
    },
    bring: [
      'Your antenatal card, if you have one',
      'Any previous scans and test results',
      'National ID, refugee ID or passport, and your insurance card',
    ],
    faqs: [
      ['Do I need an appointment?', 'No. The antenatal clinic runs every day, so you can come on any day that suits you.'],
      ['How many visits will I need?', 'The World Health Organization recommends at least eight antenatal visits during pregnancy. Your midwife will mark the date of your next visit on your card.'],
      ['Can my partner come with me?', 'Yes. Partners are welcome at antenatal visits, and it helps to plan for the birth together.'],
    ],
    related: ['maternity', 'imaging', 'obstetrics-gynaecology'],
  },

  {
    slug: 'immunisation',
    keywords: 'immunisation immunization vaccine vaccination jab child baby polio measles bcg hpv',
    name: 'Immunisation',
    category: 'family',
    icon: 'syringe',
    card: 'Vaccines for babies and children on Uganda’s national immunisation schedule.',
    summary: 'Vaccines for babies and children on Uganda’s national schedule, with every dose recorded on the child health card.',
    intro: [
      'Vaccines protect children from serious diseases such as measles, polio, whooping cough, pneumonia and severe diarrhoea. Each dose works best when it is given on time.',
      'The immunisation clinic runs on Mondays and Fridays, from 8 am to 1 pm. Babies born at Life Care receive the vaccines due at birth before they go home.',
    ],
    services: [
      ['Vaccines at birth', 'The first vaccines, given before your baby leaves the hospital.'],
      ['Infant vaccines', 'The doses due at 6, 10 and 14 weeks, on the national schedule.'],
      ['Measles and rubella', 'The measles-rubella vaccine, from nine months of age.'],
      ['Missed doses', 'Catch-up vaccines for children who have missed a dose. There is no need to start again.'],
      ['HPV vaccine', 'For girls, to protect against cervical cancer later in life.'],
      ['Growth checks', 'Your child’s weight is checked and recorded at each visit.'],
    ],
    whenToCome: [
      'On each date written on your child’s health card',
      'If your child has missed a vaccine',
      'If your child was born elsewhere and you are not sure which doses are due',
    ],
    bring: [
      'Your child’s health card',
      'A parent’s or guardian’s ID',
    ],
    faqs: [
      ['My child missed a vaccine. What now?', 'Bring your child and the health card to the next clinic day. The nurse will give the missed dose and tell you when the next one is due.'],
      ['Can my child be vaccinated with a cold?', 'Usually yes. Tell the nurse how your child is. A child with a high fever may be asked to come back when they are better.'],
      ['What reactions are normal?', 'A mild fever or a sore spot where the injection was given can last a day or two. Come back, or go to Accident & Emergency, if your child seems very unwell.'],
    ],
    related: ['paediatrics', 'maternity', 'neonatal-icu'],
  },

  {
    slug: 'neonatal-icu',
    bookable: false,
    whenTitle: 'How babies are admitted',
    keywords: 'neonatal nicu newborn premature preterm baby special care jaundice incubator',
    name: 'Neonatal ICU',
    category: 'family',
    icon: 'baby',
    hours: 'Neonatal ICU',
    card: 'Intensive care, day and night, for babies born early, small or unwell.',
    summary: 'Round-the-clock care for newborns who are born early, small or unwell, with parents involved in their care.',
    intro: [
      'Some babies need extra care in their first days or weeks: babies born early or small, and babies with breathing problems, infection or jaundice. Our Neonatal Intensive Care Unit cares for them day and night.',
      'Parents can be with their baby at any time. The nurses help mothers to express milk and to breastfeed as soon as the baby is able.',
    ],
    services: [
      ['Premature and small babies', 'Warmth, feeding support and close monitoring for babies born early or small.'],
      ['Breathing support', 'Oxygen and monitoring for babies who need help to breathe.'],
      ['Jaundice treatment', 'Light treatment (phototherapy) for babies with jaundice.'],
      ['Infections', 'Tests and treatment for newborns with signs of infection.'],
      ['Feeding support', 'Help with expressing milk and with feeding babies who cannot yet breastfeed.'],
      ['Skin-to-skin care', 'Kangaroo mother care, which keeps small babies warm and helps them grow.'],
    ],
    whenToCome: [
      'Babies are admitted from our labour ward, or from Accident & Emergency',
      'Babies born elsewhere can be referred or brought in by their family',
    ],
    warning: {
      title: 'Bring your newborn immediately if they',
      items: [
        'Are not feeding well, or have stopped feeding',
        'Have fits (convulsions)',
        'Breathe fast, or their chest pulls in as they breathe',
        'Have a fever, or feel cold to touch',
        'Have yellow palms or soles',
        'Are very sleepy or move less than usual',
      ],
    },
    bring: [
      'Your baby’s birth notes or discharge summary, if your baby was born elsewhere',
      'The mother’s antenatal card',
      'A parent’s ID and your insurance card',
    ],
    faqs: [
      ['Can I stay with my baby?', 'Yes. Parents can be with their baby at any time. Other visitors are not allowed, to protect babies from infection.'],
      ['Can I breastfeed my baby in the unit?', 'Yes, as soon as your baby is able. Until then, the nurses will help you express milk so your baby can be fed with it.'],
      ['How long will my baby stay?', 'It depends on why your baby was admitted and how quickly they improve. The doctors will explain your baby’s progress every day.'],
    ],
    related: ['maternity', 'paediatrics', 'immunisation'],
  },

  /* ---------------------------------------------------------------- Specialist services */

  {
    slug: 'paediatrics',
    photo: { file: 'clinic-child', alt: 'A doctor at her desk turns to talk with a young girl.', position: '50% 50%' },
    keywords: 'paediatrics pediatrics paediatrician child children baby teenager growth',
    name: 'Paediatrics',
    category: 'specialist',
    icon: 'baby',
    card: 'Specialist care for sick babies, children and teenagers, in clinic and on the ward.',
    summary: 'A paediatrician for babies, children and teenagers, in the paediatric clinic and on the children’s ward.',
    intro: [
      'Children’s illnesses can change quickly. Our paediatrician runs the paediatric clinic on Fridays, Saturdays and Sundays, from 8 am to 5 pm, and cares for children admitted to the ward.',
      'A sick child can be seen at any hour in the outpatient clinic or Accident & Emergency. Malaria, pneumonia and diarrhoea remain the most common serious illnesses in young children in West Nile, so bring your child as soon as you are worried.',
    ],
    services: [
      ['Paediatric clinic', 'A paediatrician sees children referred by our clinicians or brought by their families.'],
      ['Sick child care', 'Assessment and treatment of fever, cough, diarrhoea, rashes and other childhood illnesses.'],
      ['Children’s admissions', 'Inpatient care for severe malaria, pneumonia, dehydration and other serious illness.'],
      ['Newborn follow-up', 'Checks for babies after a stay in the Neonatal ICU, and for jaundice and feeding problems.'],
      ['Growth and nutrition', 'Weight and height checks, screening for malnutrition, and advice on breastfeeding and feeding.'],
      ['Long-term conditions', 'Care for children with asthma, epilepsy, sickle cell disease and other long-term conditions.'],
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
      'A referral to the paediatrician from another clinician',
      'A check-up or growth review',
    ],
    bring: [
      'Your child’s health card',
      'Any medicines your child has taken for this illness',
      'A parent’s or guardian’s ID, and your insurance card',
    ],
    faqs: [
      ['Should I wait to see whether the fever goes down?', 'No. In West Nile a child with fever should be tested for malaria the same day. Please do not give leftover medicines at home before your child has been tested.'],
      ['Can my child get vaccines here?', 'Yes, at the immunisation clinic on Mondays and Fridays, from 8 am to 1 pm. Bring the child health card so we can see which doses are due.'],
      ['Can I stay with my child if they are admitted?', 'Yes. A parent or caregiver stays with their child on the ward.'],
    ],
    related: ['immunisation', 'neonatal-icu', 'laboratory'],
  },

  {
    slug: 'surgery',
    keywords: 'surgeon general surgery operation theatre hernia appendix circumcision lump wound',
    name: 'General Surgery',
    category: 'specialist',
    icon: 'scalpel',
    photo: { file: 'operating-theatre', alt: 'A theatre nurse prepares instruments in a modern operating theatre.', position: '60% 50%' },
    card: 'Planned and emergency operations for hernias, lumps, appendicitis and other surgical conditions.',
    summary: 'Assessment, operations and recovery care for general surgical conditions, planned or in an emergency.',
    intro: [
      'Our surgeon sees you in the surgical clinic on Tuesdays, explains your options and what to expect, and plans your operation with you. Emergency operations, such as for appendicitis, are performed day and night.',
      'Before any operation we explain the procedure, its benefits and risks and the anaesthetic, give you an estimate of the cost, and ask for your written consent.',
    ],
    services: [
      ['General surgery', 'Operations for hernias, lumps and swellings, appendicitis and other abdominal conditions.'],
      ['Emergency surgery', 'Assessment and surgery for acute abdominal pain, injuries and other urgent conditions, at any hour.'],
      ['Minor surgery', 'Removal of cysts and small lumps, circumcision, draining of abscesses and wound care.'],
      ['Injuries and wounds', 'Treatment of cuts, burns and injuries, with our orthopaedic surgeon for broken bones.'],
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
    related: ['inpatient', 'orthopaedics', 'imaging'],
  },

  {
    slug: 'obstetrics-gynaecology',
    photo: { file: 'doctor-portrait', alt: 'A smiling doctor in a white coat with a stethoscope.', position: '50% 25%' },
    keywords: 'obstetrics gynaecology gynecology obstetrician gynaecologist women period fertility infertility family planning contraception cervical screening fibroids caesarean high-risk pregnancy',
    name: 'Obstetrics & Gynaecology',
    category: 'specialist',
    icon: 'venus',
    card: 'Specialist care in pregnancy and for women’s health, with a gynaecology clinic every day.',
    summary: 'An obstetrician and gynaecologist for higher-risk pregnancies, caesarean sections, gynaecology, fertility, screening and family planning.',
    intro: [
      'Our obstetrician and gynaecologist cares for women with higher-risk pregnancies, performs caesarean sections and gynaecological operations, and sees women in the gynaecology clinic, which runs every day.',
      'Consultations are private. You can ask to be seen by a female clinician, and we will arrange it whenever one is available.',
    ],
    services: [
      ['Higher-risk pregnancies', 'Specialist care for high blood pressure, diabetes, a previous caesarean, twins and other risks, with the antenatal and maternity teams.'],
      ['Caesarean section', 'Planned and emergency caesarean sections in our own theatre.'],
      ['Gynaecology consultations', 'Period problems, pelvic pain, discharge and infections, fibroids and the menopause.'],
      ['Fertility assessment', 'First tests for couples trying to conceive, with referral for specialised treatment when needed.'],
      ['Cervical cancer screening', 'Screening that finds early changes before they become cancer, with treatment or referral if anything is found.'],
      ['Family planning', 'Counselling and a choice of short- and long-acting methods, including pills, injections, implants and coils (IUDs).'],
    ],
    whenToCome: [
      'Periods that are very heavy, painful or irregular',
      'Bleeding between periods, after sex or after the menopause',
      'Lower abdominal pain or an unusual discharge',
      'You have been trying to conceive for a year without success',
      'You want to start, stop or change a family planning method',
      'Your midwife or doctor has referred you in pregnancy',
    ],
    bring: [
      'National ID, refugee ID or passport, and your insurance card',
      'Your antenatal card, if you are pregnant',
      'Any previous results, scans or medicines',
      'The date your last period started',
    ],
    faqs: [
      ['Will my visit be kept private?', 'Yes. What you tell us is confidential and shared only with the people caring for you, unless you agree otherwise or the law requires it.'],
      ['Which family planning method is right for me?', 'It depends on your health, whether and when you want more children, and your preferences. A clinician will explain each option, how long it lasts and its possible side effects, so you can choose.'],
      ['Does cervical screening hurt?', 'Most women feel only mild discomfort for a few minutes. The clinician will explain each step and you can ask them to stop at any time.'],
    ],
    related: ['antenatal', 'maternity', 'imaging'],
  },

  {
    slug: 'ent',
    keywords: 'ent ear nose throat tonsils adenoids sinus hearing nosebleed hoarse',
    name: 'ENT (Ear, Nose & Throat)',
    category: 'specialist',
    icon: 'ear',
    card: 'Assessment and treatment of ear, nose and throat problems in adults and children.',
    summary: 'An ENT surgeon for ear, nose, throat and neck problems in adults and children, in clinic and in theatre.',
    intro: [
      'Ear infections, blocked noses, sinus problems and sore throats are common in children and adults. Our ENT surgeon sees problems that have not settled with routine treatment, and treats them in clinic or in theatre.',
      'Children often push small objects into their ears or noses. Do not try to remove them at home: bring your child and we will remove the object safely.',
    ],
    services: [
      ['Ear problems', 'Ear pain and discharge, wax, infections and difficulty hearing, with referral for specialised hearing tests when needed.'],
      ['Nose and sinus problems', 'Blocked or runny nose, sinus pain, allergies and nosebleeds.'],
      ['Throat problems', 'Repeated tonsillitis, a hoarse voice and difficulty swallowing.'],
      ['Objects in the ear or nose', 'Safe removal of beads, seeds and other objects, especially in children.'],
      ['Lumps in the neck', 'Assessment of lumps and swellings in the neck and throat.'],
      ['ENT surgery', 'Operations such as removal of the tonsils or adenoids, when there is a clear reason for them.'],
    ],
    whenToCome: [
      'Ear pain or discharge that lasts more than a few days',
      'Difficulty hearing, or ringing in the ears',
      'A blocked nose or sinus pain for more than ten days',
      'Repeated sore throats or tonsillitis',
      'A child who snores loudly with pauses in breathing',
      'A lump in the neck',
    ],
    warning: {
      title: 'Go straight to Accident & Emergency for',
      items: [
        'Difficulty breathing or noisy breathing',
        'A fish bone or other object stuck in the throat',
        'A nosebleed that does not stop after 20 minutes of pressure',
        'A painful swelling behind the ear with a fever',
      ],
    },
    bring: [
      'Your referral letter, if you have one',
      'The medicines you have tried for this problem',
      'National ID, refugee ID or passport, and your insurance card',
    ],
    faqs: [
      ['Do I need a referral?', 'No. You can request an appointment directly, or see a clinician in the outpatient clinic first, who can refer you.'],
      ['My child put something in their ear. Should I try to remove it?', 'No. Trying at home can push it deeper or damage the ear. Bring your child to us.'],
      ['When are tonsils removed?', 'Only when there is a clear reason, such as repeated severe tonsillitis or blocked breathing during sleep. The surgeon will discuss it with you.'],
    ],
    related: ['outpatient', 'paediatrics', 'surgery'],
  },

  {
    slug: 'physician',
    photo: { file: 'blood-pressure', alt: 'A clinician in blue scrubs checks an older man’s blood pressure.', position: '50% 40%' },
    keywords: 'physician internal medicine blood pressure hypertension sugar diabetes asthma heart kidney chronic adult',
    name: 'In-house Physician',
    category: 'specialist',
    icon: 'heart-pulse',
    card: 'A specialist physician for adults with high blood pressure, diabetes, heart, lung and kidney conditions.',
    summary: 'A specialist physician in the hospital, for adults with long-term and complex medical conditions and serious illness.',
    intro: [
      'Conditions such as high blood pressure and diabetes often cause no symptoms until they have done harm. Our in-house physician finds them early and works with you to keep them under control, with regular reviews, clear advice and medicines you understand.',
      'The physician also cares for adults admitted with serious medical illness, such as severe malaria, pneumonia or the complications of a long-term condition, and advises the other teams in the hospital.',
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
      ['How often should I come for a review?', 'It depends on your condition and how well it is controlled. The physician will agree a review plan with you; many patients with stable blood pressure or diabetes come every one to three months.'],
      ['Can I get my repeat medicines here?', 'Yes. Bring your current medicines or prescription to your review. The physician will renew your prescription and our pharmacy can dispense it the same day.'],
      ['Should I stop my medicine when I feel well?', 'No. Blood pressure and diabetes medicines work only while you take them. Talk to your doctor before stopping or changing any medicine.'],
    ],
    related: ['laboratory', 'pharmacy', 'inpatient'],
  },

  {
    slug: 'dental',
    photo: { file: 'dentist-child', alt: 'A dentist in gloves treats a young boy’s teeth.', position: '50% 45%' },
    keywords: 'dentist dental teeth tooth toothache gum filling extraction',
    name: 'Dental Services',
    category: 'specialist',
    icon: 'tooth',
    hours: 'Dental clinic',
    card: 'Check-ups, cleaning, fillings, extractions and treatment of tooth pain for the whole family.',
    summary: 'Check-ups, cleaning, fillings and extractions for adults and children, 24 hours a day from Monday to Saturday.',
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

  {
    slug: 'ophthalmology',
    keywords: 'ophthalmology eye eyes vision sight cataract glaucoma red eye glasses squint',
    name: 'Ophthalmology (Eye Care)',
    category: 'specialist',
    icon: 'eye',
    card: 'Eye examinations, and treatment of eye infections, injuries, cataract and other eye conditions.',
    summary: 'An ophthalmologist for eye examinations, eye infections and injuries, cataract, glaucoma and children’s eye problems.',
    intro: [
      'Good sight matters at every age, for school, work and getting around safely. Our ophthalmologist examines your eyes, treats eye infections and injuries, and finds conditions such as cataract and glaucoma early.',
      'If you have diabetes or high blood pressure, have your eyes checked regularly: both can damage the eyes before you notice any change in your sight.',
    ],
    services: [
      ['Eye examinations', 'A check of your sight and the health of your eyes, with a prescription if you need glasses.'],
      ['Red and painful eyes', 'Treatment of eye infections, allergies and inflammation.'],
      ['Eye injuries', 'Care for injuries, scratches and objects in the eye.'],
      ['Cataract and glaucoma', 'Assessment and treatment, with surgery or referral when it is needed.'],
      ['Diabetes and blood pressure checks', 'Regular eye checks for people with diabetes or high blood pressure.'],
      ['Children’s eyes', 'Checks for squint and poor sight, which can hold children back at school.'],
    ],
    whenToCome: [
      'Blurred or worsening sight',
      'A red, painful or sticky eye',
      'Difficulty seeing at night or seeing the board at school',
      'A squint in a child',
      'A yearly eye check if you have diabetes or high blood pressure',
    ],
    warning: {
      title: 'Come immediately, day or night, for',
      items: [
        'Sudden loss of sight in one or both eyes',
        'A chemical in the eye: rinse with plenty of clean water on the way',
        'An injury that has cut or pierced the eye',
        'Severe eye pain with headache and vomiting',
      ],
    },
    bring: [
      'Your glasses, if you wear them',
      'Any eye drops or medicines you are using',
      'National ID, refugee ID or passport, and your insurance card',
    ],
    faqs: [
      ['Do I need a referral?', 'No. You can request an appointment directly, or see a clinician in the outpatient clinic first.'],
      ['Can I use eye drops left over from before?', 'No. Old or someone else’s eye drops can make some eye problems worse. Have your eye checked first.'],
      ['Will my eyes be dilated?', 'Sometimes drops are used to widen your pupils for a full check. Your sight may be blurred for a few hours, so do not drive or ride yourself home.'],
    ],
    related: ['physician', 'outpatient', 'paediatrics'],
  },

  {
    slug: 'orthopaedics',
    keywords: 'orthopaedics orthopedics bone fracture broken joint knee hip back pain sprain cast plaster',
    name: 'Orthopaedics',
    category: 'specialist',
    icon: 'bone',
    card: 'Care for broken bones, joint and back pain, and injuries to muscles and ligaments.',
    summary: 'An orthopaedic surgeon for broken bones, joint and back pain, and injuries to muscles, tendons and ligaments.',
    intro: [
      'Road accidents, falls and sports injuries are a common cause of broken bones and joint damage. Our orthopaedic surgeon treats fractures and injuries, from a plaster cast to surgery, and follows you up until you are back on your feet.',
      'We also see adults and children with joint pain, back pain and problems with walking.',
    ],
    services: [
      ['Fractures', 'X-rays, casts and splints, and surgery for broken bones when it is needed.'],
      ['Joint pain', 'Assessment and treatment of painful knees, hips, shoulders and other joints, including arthritis.'],
      ['Back and neck pain', 'Assessment of back and neck pain, and advice and treatment to help you move again.'],
      ['Sprains and sports injuries', 'Care for injuries to ligaments, tendons and muscles.'],
      ['Children’s bones and joints', 'Checks for limping, bowed legs and other problems with how a child walks.'],
      ['Follow-up', 'Cast checks, removal of plaster and advice on exercises after an injury or operation.'],
    ],
    whenToCome: [
      'Joint pain or swelling that does not settle',
      'Back or neck pain that lasts more than a few weeks',
      'An old injury that still hurts or limits movement',
      'A child who limps or walks differently',
      'A follow-up after a fracture',
    ],
    warning: {
      title: 'Go straight to Accident & Emergency for',
      items: [
        'A suspected broken bone, or a bone showing through the skin',
        'A serious injury after a road accident or a fall',
        'A limb that is cold, numb or cannot move',
        'A neck or back injury: keep the person as still as possible',
      ],
    },
    bring: [
      'Any X-rays and reports from before',
      'Your referral letter, if you have one',
      'National ID, refugee ID or passport, and your insurance card',
    ],
    faqs: [
      ['Will I need an X-ray?', 'Usually, for an injury. X-rays are done here in the imaging unit, so the surgeon can see the result on the same visit.'],
      ['How long will my cast stay on?', 'It depends on the bone and your age. Most casts stay on for several weeks. Your surgeon will tell you when to come back.'],
      ['Do I need surgery for a broken bone?', 'Many fractures heal well in a cast. Surgery is needed only for some breaks. The surgeon will explain the options for your injury.'],
    ],
    related: ['imaging', 'surgery', 'emergency'],
  },

  /* ---------------------------------------------------------------- Tests and medicines */

  {
    slug: 'laboratory',
    photo: { file: 'laboratory', alt: 'A laboratory scientist in a white coat looks through a microscope.', position: '50% 40%' },
    keywords: 'lab test blood urine stool malaria hiv typhoid sugar results',
    name: 'Laboratory',
    category: 'support',
    icon: 'microscope',
    hours: 'Laboratory',
    card: 'Blood, urine and stool tests for diagnosis and check-ups, 24 hours a day, with most routine results the same day.',
    summary: 'Blood, urine and stool tests on site, 24 hours a day. Most routine results are ready the same day.',
    intro: [
      'Our laboratory supports every department in the hospital, from a malaria test in the outpatient clinic to blood grouping before an operation. Because it is on site and open around the clock, your clinician can usually see your results and start treatment on the same visit.',
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
    card: 'Ultrasound scans, including pregnancy scans every day, and X-rays, with a written report for your clinician.',
    summary: 'Ultrasound scans, including pregnancy scans, and X-rays, 24 hours a day, with a written report for your clinician.',
    intro: [
      'Imaging helps your clinician find the cause of a problem quickly and safely. Ultrasound uses sound waves, not radiation, so it is safe in pregnancy. X-rays use a small, controlled dose of radiation and are the quickest way to check bones and the chest.',
    ],
    services: [
      ['Pregnancy scans', 'Dating, growth checks and the position of the baby and placenta.'],
      ['Abdominal and pelvic ultrasound', 'The liver, gall bladder, kidneys, bladder, womb, ovaries and prostate.'],
      ['Other ultrasound scans', 'Breast, thyroid, testicles and lumps under the skin.'],
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
    related: ['antenatal', 'orthopaedics', 'outpatient'],
  },

  {
    slug: 'pharmacy',
    bookable: false,
    keywords: 'medicine drugs prescription chemist tablets',
    name: 'Pharmacy',
    category: 'support',
    icon: 'pill',
    hours: 'Pharmacy',
    card: 'Prescriptions dispensed in the same building, 24 hours a day, with clear advice on how to take each medicine.',
    summary: 'Your prescription dispensed in the same building, 24 hours a day, with clear advice on how to take each medicine safely.',
    intro: [
      'Our pharmacy dispenses prescriptions from Life Care clinicians and other prescribers, day and night. Medicines are bought from suppliers licensed by the National Drug Authority and stored as the manufacturer requires.',
      'Our pharmacy staff explain how and when to take each medicine, which side effects to look out for, and what to do if you miss a dose. Ask any question, however small.',
    ],
    services: [
      ['Prescriptions', 'We dispense prescriptions from our own clinicians and from other clinics and doctors.'],
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
    related: ['outpatient', 'physician', 'laboratory'],
  },

  /* ---------------------------------------------------------------- Ambulance */

  {
    slug: 'ambulance',
    bookable: false,
    callLine: 'emergency',
    whenTitle: 'When to call the ambulance',
    keywords: 'ambulance transport transfer emergency pick-up road accident referral',
    name: 'Ambulance Services',
    category: 'ambulance',
    icon: 'ambulance',
    hours: 'Ambulance',
    card: 'An ambulance for emergencies and for transfers between hospitals, day and night.',
    summary: 'Call our emergency line for an ambulance, day or night. We also transfer patients to and from other hospitals and health centres.',
    intro: [
      'If someone is seriously ill or injured and cannot travel safely, call our emergency line and ask for the ambulance. Tell us where you are, what has happened and how many people are hurt, and keep your phone on so the team can call you back.',
      'The ambulance team gives first care on the way and calls ahead, so Accident & Emergency is ready when you arrive.',
    ],
    services: [
      ['Emergency calls', 'An ambulance sent to homes, roads and workplaces when someone cannot travel safely.'],
      ['Care on the way', 'First care and monitoring by the ambulance team during the journey.'],
      ['Maternity emergencies', 'Transport for women in labour with danger signs, straight to our labour ward.'],
      ['Transfers between facilities', 'Transfers of patients referred to us from health centres and clinics, and to referral hospitals when needed.'],
      ['Calls ahead', 'The team tells Accident & Emergency who is coming, so care can start at once.'],
    ],
    whenToCome: [
      'Someone is unconscious or having fits',
      'Someone has difficulty breathing',
      'A serious injury, for example after a road accident',
      'Heavy bleeding that will not stop',
      'A woman in labour with danger signs',
      'A patient who cannot travel safely by car or boda boda',
    ],
    warning: {
      title: 'While you wait for the ambulance',
      items: [
        'Keep an injured person still, especially after a fall or road accident',
        'Press firmly on any bleeding with a clean cloth',
        'Lay an unconscious person who is breathing on their side',
        'Do not give food or drink to someone who may need an operation',
      ],
    },
    bring: [
      'The patient’s ID and insurance card, if you can find them quickly',
      'The medicines the patient takes',
      'A relative or friend to come along, if possible',
    ],
    faqs: [
      ['How do I call the ambulance?', 'Call our 24-hour emergency line and ask for the ambulance. Tell us where you are and what has happened.'],
      ['Is there a charge for the ambulance?', 'Ask our team when you call. Some insurance and employer schemes cover ambulance transport.'],
      ['Can the ambulance take a patient to another hospital?', 'Yes. Transfers to and from other hospitals and health centres are arranged with the team; health workers can use the referral line.'],
    ],
    related: ['emergency', 'maternity', 'inpatient'],
  },
];

module.exports = { CATEGORIES, DEPARTMENTS };

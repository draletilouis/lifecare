/* Health information articles. Each entry becomes a page at /health/<slug>/ and appears in the
   health information hub and on the homepage. Edit here, then run "npm run build".

   Every article must be reviewed and signed off by a Life Care clinician before launch: set
   "reviewedBy" (name and role) and "updated" (month and year) when that is done. Until then the page
   says the article is awaiting clinical review.

   Sections: "list" items are shown as a plain list; "urgent" makes the section a red danger-signs box. */

const ARTICLES = [
  {
    slug: 'malaria',
    title: 'Malaria: test the same day, treat it the right way',
    category: 'Common illness',
    summary: 'Malaria is common in West Nile and can become severe within hours, especially in young children and pregnant women. How to recognise it, when to come in, and how to protect your family.',
    readMinutes: 4,
    updated: 'October 2026',
    reviewedBy: null,
    related: ['outpatient', 'paediatrics', 'laboratory'],
    sections: [
      {
        heading: 'Know the signs',
        paragraphs: ['Malaria usually starts within one to two weeks of a mosquito bite. The signs can look like many other illnesses:'],
        list: ['Fever, or feeling hot and cold with shivering and sweating', 'Headache, body and joint pains', 'Tiredness, poor appetite, nausea or vomiting', 'In young children: fever, crying, refusing to feed, or being unusually sleepy'],
      },
      {
        heading: 'Test before you treat',
        paragraphs: [
          'Many illnesses cause fever. A malaria test, either a rapid test or a blood slide, shows whether malaria is the cause, so you get the right medicine and do not take medicines you do not need.',
          'Come for a test on the same day the fever starts. Do not take leftover or borrowed medicines before you are tested.',
        ],
      },
      {
        heading: 'Come immediately if you see any of these',
        urgent: true,
        list: ['Very sleepy, confused or hard to wake', 'Fits (convulsions)', 'Unable to drink or breastfeed, or vomiting everything', 'Fast or difficult breathing', 'Very pale palms or lips', 'Dark urine, or passing very little urine', 'Yellow eyes'],
      },
      {
        heading: 'Finish the treatment',
        paragraphs: [
          'Take every dose exactly as prescribed, even if you feel better after the first day. Stopping early can let the infection return.',
          'Come back if the fever has not settled after three days of treatment, or at once if any danger sign appears.',
        ],
      },
      {
        heading: 'Protect your family',
        list: ['Sleep under a long-lasting insecticide-treated net every night, all year round. Children under five and pregnant women need nets most', 'Let indoor spraying teams treat your home when they visit', 'Clear standing water, tins and old tyres around the home', 'Pregnant women: attend antenatal care, where you will be given medicine that helps prevent malaria in pregnancy'],
      },
    ],
  },

  {
    slug: 'antenatal-care',
    title: 'Antenatal care: start early, come often',
    category: 'Pregnancy',
    summary: 'Regular antenatal visits protect you and your baby. When to start, what happens at each visit, and the danger signs that mean you should come in straight away.',
    readMinutes: 4,
    updated: 'October 2026',
    reviewedBy: null,
    related: ['maternity', 'imaging', 'laboratory'],
    sections: [
      {
        heading: 'When to start',
        paragraphs: [
          'Come as soon as you think you are pregnant, ideally before 12 weeks. Starting early lets the midwife check your health, find problems such as anaemia, high blood pressure or infection early, and plan a safe birth with you.',
          'The World Health Organization recommends at least eight antenatal contacts during a pregnancy. Your midwife will write the date of your next visit on your antenatal card.',
        ],
      },
      {
        heading: 'What happens at your visits',
        list: ['Your blood pressure, weight and urine are checked', 'Blood tests, including your blood group, haemoglobin, HIV, syphilis and hepatitis B', 'An ultrasound scan to check your baby’s growth and position', 'Tetanus vaccination', 'Iron and folic acid tablets, and medicine to help prevent malaria', 'Time to ask questions and plan where and how you will give birth'],
      },
      {
        heading: 'Danger signs in pregnancy: come immediately, day or night',
        urgent: true,
        list: ['Bleeding from the vagina', 'Severe headache or blurred vision', 'Fits', 'Fever', 'Severe pain in the abdomen', 'Fast or difficult breathing', 'Your baby moving less than usual', 'Your waters breaking before labour starts', 'Swelling of the face and hands'],
      },
      {
        heading: 'Prepare for the birth',
        list: ['Decide with your family how you will get to the hospital, day or night, and save the money for transport', 'Choose who will come with you', 'Pack clothes and wrappers for you and your baby, sanitary pads, and the items on your delivery list', 'Keep your antenatal card with you at all times', 'Save our emergency number in your phone'],
      },
    ],
  },

  {
    slug: 'child-danger-signs',
    title: 'When to bring your child to hospital immediately',
    category: 'Children',
    summary: 'Children can become seriously ill very quickly. These danger signs mean your child needs care straight away, at any hour. Plus how to care for diarrhoea at home.',
    readMinutes: 3,
    updated: 'October 2026',
    reviewedBy: null,
    related: ['paediatrics', 'outpatient', 'laboratory'],
    sections: [
      {
        heading: 'Danger signs: come immediately, day or night',
        urgent: true,
        list: ['Cannot drink or breastfeed', 'Vomits everything', 'Has had fits (convulsions)', 'Is very sleepy or hard to wake', 'Breathes fast, or the chest pulls in with each breath', 'A baby under two months with a fever, or who feels cold', 'Diarrhoea with sunken eyes, or skin that goes back very slowly when pinched'],
      },
      {
        heading: 'Fever',
        paragraphs: ['In West Nile, a child with fever should be tested for malaria on the same day. Do not wait to see whether the fever goes down, and do not give leftover medicines before the test.'],
      },
      {
        heading: 'Diarrhoea: what to do at home',
        list: ['Give oral rehydration solution (ORS) after every loose stool, in small sips from a cup or spoon', 'Give zinc tablets every day for 10 to 14 days, as a health worker advises', 'Keep breastfeeding, and keep giving food', 'Bring your child in if they cannot drink, get worse, have blood in the stool, or have a fever'],
      },
      {
        heading: 'Keep vaccinations up to date',
        paragraphs: ['Vaccines on Uganda’s national schedule protect children against measles, polio, pneumonia, some causes of diarrhoea and other serious illnesses. Bring the child health card to every visit so we can check which doses are due.'],
      },
    ],
  },

  {
    slug: 'high-blood-pressure',
    title: 'High blood pressure: the condition you cannot feel',
    category: 'Long-term conditions',
    summary: 'Many adults have high blood pressure and do not know it. A two-minute check can protect your heart, brain and kidneys.',
    readMinutes: 3,
    updated: 'October 2026',
    reviewedBy: null,
    related: ['internal-medicine', 'pharmacy', 'laboratory'],
    sections: [
      {
        heading: 'Why it matters',
        paragraphs: ['High blood pressure usually causes no symptoms. Over years it damages the heart, the brain, the kidneys and the eyes, and it is a leading cause of stroke and heart failure. The only way to know is to have it measured.'],
      },
      {
        heading: 'Get checked',
        paragraphs: [
          'Adults should have their blood pressure checked at least once a year from the age of 40, and earlier if a parent has high blood pressure, or if you are overweight, have diabetes or are pregnant.',
          'A reading of 140/90 or higher on more than one occasion usually means high blood pressure. Your clinician will explain your own readings.',
        ],
      },
      {
        heading: 'Lower your risk',
        list: ['Use less salt, and fewer salty and processed foods', 'Eat more vegetables, fruit and beans', 'Be active for about 30 minutes on most days; walking counts', 'Limit alcohol, and do not smoke', 'Keep to a healthy weight'],
      },
      {
        heading: 'If you are on treatment',
        list: ['Take your medicine every day, even when you feel well', 'Do not stop or change a medicine without talking to your clinician', 'Keep your review appointments, and bring all your medicines with you', 'Ask us to check your kidneys and blood sugar as advised'],
      },
      {
        heading: 'Come immediately if you have',
        urgent: true,
        list: ['Sudden weakness or numbness of the face, arm or leg', 'Difficulty speaking, or sudden confusion', 'Chest pain or pressure', 'Severe headache with vomiting or blurred vision', 'Difficulty breathing'],
      },
    ],
  },

  {
    slug: 'cholera-and-safe-water',
    title: 'Cholera and diarrhoea: safe water saves lives',
    category: 'Prevention',
    summary: 'Cholera spreads through unsafe water and food and can kill within hours through dehydration. The signs, what to do at once, and simple steps that protect your household.',
    readMinutes: 3,
    updated: 'October 2026',
    reviewedBy: null,
    related: ['outpatient', 'paediatrics', 'emergency'],
    sections: [
      {
        heading: 'Know the signs',
        list: ['Sudden, large amounts of watery diarrhoea, sometimes pale like rice water', 'Vomiting', 'Leg cramps', 'Great thirst, a dry mouth, sunken eyes, and passing little urine'],
      },
      {
        heading: 'Act at once',
        urgent: true,
        paragraphs: ['Start oral rehydration solution (ORS) straight away and keep drinking, then come to the hospital immediately if the diarrhoea is severe, or the person is weak, very thirsty, confused or passing little urine. Cholera can kill within hours, but it is treatable when fluids are replaced quickly.'],
      },
      {
        heading: 'If you have no ORS sachets',
        paragraphs: ['Mix six level teaspoons of sugar and half a level teaspoon of salt in one litre of clean water that has been boiled and cooled. Give it in small, frequent sips, and still come to the hospital.'],
      },
      {
        heading: 'Protect your household',
        list: ['Drink water that has been boiled or treated', 'Wash hands with soap after using the latrine, and before eating or preparing food', 'Eat food while it is hot and well cooked; keep it covered', 'Use a latrine, and keep it clean', 'Wash fruit and vegetables in safe water'],
      },
    ],
  },
];

module.exports = { ARTICLES };

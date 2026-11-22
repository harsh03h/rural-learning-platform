const QUESTION_BANK = {
  fractions: [
    {
      q: 'If 4 out of 20 mangoes in a village orchard are ripe, what fraction of the mangoes is ripe?',
      options: ['1/5', '1/4', '4/10', '2/5'],
      answer: '1/5',
      explanation: '4/20 simplifies to 1/5 when both numerator and denominator are divided by 4.',
    },
    {
      q: 'A farmer sold 3/8 of his harvest in the morning and 2/8 in the afternoon. What fraction was sold in total?',
      options: ['5/8', '5/16', '1/8', '6/8'],
      answer: '5/8',
      explanation: '3/8 + 2/8 = (3 + 2)/8 = 5/8.',
    },
    {
      q: 'Which fraction is equivalent to 1/2?',
      options: ['2/3', '3/6', '2/5', '4/5'],
      answer: '3/6',
      explanation: 'Multiplying numerator and denominator of 1/2 by 3 gives 3/6.',
    },
  ],
  percentage: [
    {
      q: 'A shop gives 25% discount on a ₹400 notebook. What is the discount amount?',
      options: ['₹50', '₹75', '₹100', '₹125'],
      answer: '₹100',
      explanation: '25% of 400 = (25/100) × 400 = ₹100.',
    },
    {
      q: 'If 15 of 60 students in a class are girls, what percentage are girls?',
      options: ['15%', '20%', '25%', '30%'],
      answer: '25%',
      explanation: '15/60 = 1/4 = 25%.',
    },
  ],
  science: [
    {
      q: 'Which part of a plant mainly absorbs water from the soil?',
      options: ['Leaves', 'Roots', 'Flowers', 'Stem'],
      answer: 'Roots',
      explanation: 'Roots absorb water and minerals from the soil.',
    },
    {
      q: 'What is the main source of energy for photosynthesis?',
      options: ['Moonlight', 'Sunlight', 'Wind', 'Soil'],
      answer: 'Sunlight',
      explanation: 'Plants use sunlight to prepare food in the presence of chlorophyll.',
    },
  ],
  general: [
    {
      q: 'Which number is a prime number?',
      options: ['12', '18', '17', '21'],
      answer: '17',
      explanation: '17 has exactly two factors: 1 and 17.',
    },
    {
      q: 'What is the perimeter of a square with side 6 cm?',
      options: ['12 cm', '18 cm', '24 cm', '36 cm'],
      answer: '24 cm',
      explanation: 'Perimeter of a square = 4 × side = 4 × 6 = 24 cm.',
    },
    {
      q: 'Which sentence uses a noun?',
      options: ['Quickly', 'Rohan', 'Beautifully', 'Yesterday'],
      answer: 'Rohan',
      explanation: 'Rohan is a proper noun — the name of a person.',
    },
  ],
};

function categoryFor(topic = '') {
  const value = topic.toLowerCase();
  if (value.includes('fraction') || value.includes('भिन्न') || value.includes('roti')) return 'fractions';
  if (value.includes('percent') || value.includes('प्रतिशत') || value.includes('decimal')) return 'percentage';
  if (value.includes('science') || value.includes('plant') || value.includes('photo') || value.includes('विज्ञान')) return 'science';
  return 'general';
}

export function fallbackQuestions({ topic = 'Fractions', grade = 'Class 7', count = 3, difficulty = 'Medium' } = {}) {
  const pool = QUESTION_BANK[categoryFor(topic)];
  const safeCount = Math.min(Math.max(1, Number(count) || 3), pool.length);
  return {
    success: true,
    topic,
    grade,
    difficulty,
    count: safeCount,
    source: 'fallback',
    fallback: true,
    questions: pool.slice(0, safeCount).map((question, index) => ({
      ...question,
      questionId: `fb-${index + 1}`,
      difficulty,
    })),
  };
}

export function fallbackRecommendations(weakTopics = []) {
  const rules = [
    {
      match: /(fraction|भिन्न|roti)/i,
      prerequisite: 'Fractions (Class 6/7)',
      action: 'Revise Fractions Chapters 1 & 2 before starting Percentages',
      reason: 'Fractions are the foundation for percentages, ratios and algebra.',
      priority: 'High',
    },
    {
      match: /(decimal|दशमलव)/i,
      prerequisite: 'Decimals (Class 6/7)',
      action: 'Practice decimal place-value and conversion exercises daily',
      reason: 'Decimal confidence is needed for measurements and money problems.',
      priority: 'High',
    },
    {
      match: /(percent|प्रतिशत)/i,
      prerequisite: 'Percentages (Class 7)',
      action: 'Revise the fraction-to-percentage method with village market examples',
      reason: 'Percentages build directly on fraction concepts.',
      priority: 'Medium',
    },
    {
      match: /(geometry|ज्यामिति|area)/i,
      prerequisite: 'Basic Geometry (Class 6/7)',
      action: 'Revise shapes, perimeter and area with field-measurement examples',
      reason: 'Spatial reasoning supports higher mathematics and science.',
      priority: 'Medium',
    },
    {
      match: /(grammar|व्याकरण|english)/i,
      prerequisite: 'English/Hindi Grammar Basics',
      action: 'Practice sentence formation and tense exercises for 15 minutes daily',
      reason: 'Strong grammar improves comprehension across all subjects.',
      priority: 'Medium',
    },
  ];

  const matched = rules
    .filter((rule) => weakTopics.some((topic) => rule.match.test(String(topic))))
    .map(({ match, ...recommendation }) => recommendation);

  if (matched.length) return matched;

  return [
    {
      prerequisite: 'Core Foundation',
      action: 'Revise the previous chapter and retry the diagnostic test after 3 days',
      reason: 'Consistent revision strengthens long-term retention.',
      priority: 'Low',
    },
  ];
}

export function fallbackDoubtReply(query = '', language = 'hi') {
  const hindi = /[\u0900-\u097F]/.test(query) || language === 'hi';
  if (hindi) {
    return {
      reply: 'शानदार सवाल! यहाँ गाँव के उदाहरणों से समझते हैं — जैसे रोटी के टुकड़े (भिन्न), खेत की माप (क्षेत्रफल) या हाट-बाज़ार की कीमतें (प्रतिशत)।',
      analogy: 'उदाहरण: यदि एक रोटी को 4 बराबर हिस्सों में बाँटें और आपको 1 हिस्सा मिले, तो आपका हिस्सा 1/4 कहलाता है।',
      practicalTip: 'सुझाव: पहले रोज़मर्रा की वस्तुओं से संकल्पना जोड़ें, फिर पाठ्यपुस्तक के उदाहरण हल करें।',
      source: 'offline-fallback',
    };
  }
  return {
    reply: 'Great question! We explain concepts using everyday village examples — sharing rotis (fractions), measuring fields (area), or market prices (percentages).',
    analogy: 'Example: if one roti is split into 4 equal parts and you get 1 part, your share is 1/4.',
    practicalTip: 'Tip: connect the idea to a daily-life object first, then solve the textbook problem.',
    source: 'offline-fallback',
  };
}

export function parentMessageTemplate({ childName, childScore, weakTopic, language = 'hi', category = 'progress' }) {
  if (language === 'hi') {
    if (category === 'remedial') {
      return `ज्ञानसेतु: ${childName} को ${weakTopic || 'मुख्य विषय'} में अतिरिक्त अभ्यास की आवश्यकता है। कृपया 15 मिनट रोज़ अभ्यास करवाएँ।`;
    }
    return `ज्ञानसेतु: ${childName} का साप्ताहिक स्कोर ${childScore}% है। ${weakTopic ? `कमजोर विषय: ${weakTopic}।` : ''} कृपया बच्चे को प्रोत्साहित करें।`;
  }
  if (category === 'remedial') {
    return `GyanSetu: ${childName} needs extra practice in ${weakTopic || 'core concepts'}. Please encourage 15 minutes of revision daily.`;
  }
  return `GyanSetu: ${childName}'s weekly score is ${childScore}%. ${weakTopic ? `Weak area: ${weakTopic}.` : ''} Please encourage your child.`;
}

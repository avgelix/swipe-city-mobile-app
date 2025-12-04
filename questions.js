/**
 * Questions for "Where to Move" Game
 * 
 * 20 questions across 8 categories designed to feel like a "choose your own adventure"
 * Users shouldn't know where they're heading until the AI reveals their match
 * 
 * Question Types:
 * - binary: Left swipe = No, Right swipe = Yes
 * - multiChoice: 8-directional swipes (↑ ↓ ← → ↖ ↗ ↙ ↘)
 * 
 * Categories Distribution:
 * - Climate & Environment (3)
 * - Lifestyle & Pace (3)
 * - Work & Economy (2)
 * - Food & Dining (2)
 * - Culture & Values (3)
 * - Recreation & Hobbies (3)
 * - Family & Social (2)
 * - Transportation (2)
 */

export const questions = [
  // ===== CLIMATE & ENVIRONMENT (3) =====
  {
    id: 1,
    category: 'Climate & Environment',
    text: 'You wake up to snow on a winter morning',
    type: 'binary',
    options: {
      left: 'You can find me in the depths of my comforter',
      right: 'Where are my gloves again?! I love a snowy day'
    }
  },
  {
    id: 2,
    category: 'Climate & Environment',
    text: 'Your wardrobe is your temple of self-expression.',
    type: 'multiChoice',
    options: {
      up: 'I like just about everything - heavy coats to tank tops',
      upRight: "I'm always out an about in my leather jacket",
      right: "I'll layer up if needed... like once a year",
      downRight: "I wear mostly the same pants and shirt every day — unless I don't",
      down: 'I trust the same old shorts and t-shirts year-round',
      downLeft: "Let me get my sandals, shorts and t-shirt and I'm out the doot",
      left: 'How many swimsuits does one person need?',
      upLeft: 'Sweather weather is the best weather'
    },
    // Vertical axis: Up = More variation, Down = Less variation
    // Horizontal axis: Right = Moderate, Left = Extreme preferences
  },
  {
    id: 3,
    category: 'Climate & Environment',
    text: 'A powerful thunderstorm rolls in...',
    type: 'binary',
    options: {
      left: 'A chance to close the windows and put up a good movie',
      right: 'When can we go outside to dance in the rain?'
    }
  },

  // ===== LIFESTYLE & PACE (3) =====
  {
    id: 4,
    category: 'Lifestyle & Pace',
    text: 'It\'s 11 PM on a Tuesday. Where do you want to be?',
    type: 'binary',
    options: {
      left: 'In bed with a book',
      right: 'Out grabbing late-night food'
    }
  },
  {
    id: 5,
    category: 'Lifestyle & Pace',
    text: 'You need milk from the store. How far are you willing to walk?',
    type: 'multiChoice',
    options: {
      up: '2 blocks - everything nearby',
      upRight: '5-10 minute walk',
      right: '15-20 minute walk',
      downRight: '30 minute walk is fine',
      down: 'I\'ll drive 10-15 minutes',
      downLeft: 'I\'ll drive 20-30 minutes',
      left: 'I\'ll drive however long it takes',
      upLeft: 'I want a 24/7 bodega next door'
    },
    // Vertical axis: Up = More walkable, Down = Car-dependent
  },
  {
    id: 6,
    category: 'Lifestyle & Pace',
    text: 'The sound of sirens, honking, and people shouting outside at 3 AM is...',
    type: 'binary',
    options: {
      left: 'Unacceptable',
      right: 'The soundtrack of life'
    }
  },

  // ===== WORK & ECONOMY (2) =====
  {
    id: 7,
    category: 'Work & Economy',
    text: 'You go get coffee near your office. The people sitting next to you are talking about...',
    type: 'multiChoice',
    options: {
      up: 'The latest app launch and coding frameworks',
      upRight: 'Stock markets and quarterly earnings',
      right: 'Gallery openings and creative projects',
      downRight: 'Research papers and academic conferences',
      down: 'Patient care and medical breakthroughs',
      downLeft: 'Building projects and skilled trades',
      left: 'Travel tips and hospitality trends',
      upLeft: 'Pitch decks and investor meetings'
    }
  },
  {
    id: 8,
    category: 'Work & Economy',
    text: 'You just got your paycheck. After rent, you have...',
    type: 'binary',
    options: {
      left: 'Plenty left over for savings and fun',
      right: 'Less than you\'d like, but you love where you live'
    }
  },

  // ===== FOOD & DINING (2) =====
  {
    id: 9,
    category: 'Food & Dining',
    text: 'It\'s Friday night. Having your ideal dinner means...',
    type: 'binary',
    options: {
      left: 'I am cooking at home',
      right: 'I am out trying a new restaurant'
    }
  },
  {
    id: 10,
    category: 'Food & Dining',
    text: 'Within a 10-minute walk from home, you want access to...',
    type: 'multiChoice',
    options: {
      up: 'Cuisine from every continent',
      upRight: 'Trendy fusion & experimental spots',
      right: 'Mix of authentic ethnic restaurants',
      downRight: 'Reliable chain restaurants',
      down: 'Classic comfort food diners',
      downLeft: 'Local mom & pop places',
      left: 'Street food vendors & food trucks',
      upLeft: 'Fine dining & Michelin stars'
    }
  },

  // ===== CULTURE & VALUES (3) =====
  {
    id: 11,
    category: 'Culture & Values',
    text: 'You overhear a heated political debate at a coffee shop. Your reaction?',
    type: 'binary',
    options: {
      left: 'Uncomfortable',
      right: 'Energized'
    }
  },
  {
    id: 12,
    category: 'Culture & Values',
    text: 'On Sunday mornings, you feel most at peace surrounded by...',
    type: 'binary',
    options: {
      left: 'A quiet coffee shop or bookstore',
      right: 'A nature trail or park'
    }
  },
  {
    id: 13,
    category: 'Culture & Values',
    text: 'A perfect weekend includes...',
    type: 'multiChoice',
    options: {
      up: 'Art museum & gallery visits',
      upRight: 'Live theater' ,
      right: 'Concert or festival',
      downRight: 'Historical sites & architecture tours',
      down: 'Mall shopping',
      downLeft: 'Sports games',
      left: 'Bar hopping & nightlife',
      upLeft: 'Outdoor markets'
    }
  },

  // ===== RECREATION & HOBBIES (3) =====
  {
    id: 14,
    category: 'Recreation & Hobbies',
    text: 'Your Saturday morning involves being outdoors. What are you doing?',
    type: 'multiChoice',
    options: {
      up: 'Hiking mountain trails',
      upRight: 'Yoga in the park',
      right: 'Running or biking',
      downRight: 'Beach walks and sunbathing',
      down: 'Kayaking and water sports',
      downLeft: 'Casual park picnic',
      left: 'Urban exploring on foot',
      upLeft: 'Camping or backcountry adventure'
    }
  },
  {
    id: 15,
    category: 'Recreation & Hobbies',
    text: 'When you exercise, you want to see...',
    type: 'binary',
    options: {
      left: 'Other people around doing the same activity',
      right: 'Trees, trails, and open sky'
    }
  },
  {
    id: 16,
    category: 'Recreation & Hobbies',
    text: 'After a long week, you unwind by...',
    type: 'binary',
    options: {
      left: 'Staying in',
      right: 'Going out'
    }
  },

  // ===== FAMILY & SOCIAL (2) =====
  {
    id: 17,
    category: 'Family & Social',
    text: 'When choosing where to live, the quality of local education is...',
    type: 'binary',
    options: {
      left: 'A dealbreaker - must be top-tier',
      right: 'One factor among many others'
    }
  },
  {
    id: 18,
    category: 'Family & Social',
    text: 'Your closest friends and family are far away. How does this make you feel?',
    type: 'binary',
    options: {
      left: 'Lonely',
      right: 'Liberated'
    }
  },

  // ===== TRANSPORTATION (2) =====
  {
    id: 19,
    category: 'Transportation',
    text: 'You need to visit family across the country. How do you feel about getting on a plane?',
    type: 'multiChoice',
    options: {
      up: 'Love flying - do it all the time',
      upRight: 'Comfortable with regular flights',
      right: 'Fine with occasional flying',
      downRight: 'Prefer to fly rarely',
      down: 'Avoid flying when possible',
      downLeft: 'Very uncomfortable with flying',
      left: 'Will only fly if absolutely necessary',
      upLeft: 'Excited by airports & travel'
    },
    // Vertical axis: Up = More comfortable, Down = Less comfortable
  },
  {
    id: 20,
    category: 'Transportation',
    text: 'You\'re running late for an important meeting across town. You grab your...',
    type: 'binary',
    options: {
      left: 'Car keys',
      right: 'Metro card and comfortable shoes'
    }
  }
];

/**
 * Helper function to get questions by category
 */
export const getQuestionsByCategory = (category) => {
  return questions.filter(q => q.category === category);
};

/**
 * Helper function to get category counts for validation
 */
export const getCategoryCounts = () => {
  const counts = {};
  questions.forEach(q => {
    counts[q.category] = (counts[q.category] || 0) + 1;
  });
  return counts;
};

/**
 * Validate that we have exactly 20 questions with correct distribution
 */
export const validateQuestions = () => {
  const counts = getCategoryCounts();
  const expectedCounts = {
    'Climate & Environment': 3,
    'Lifestyle & Pace': 3,
    'Work & Economy': 2,
    'Food & Dining': 2,
    'Culture & Values': 3,
    'Recreation & Hobbies': 3,
    'Family & Social': 2,
    'Transportation': 2
  };

  const validation = {
    totalQuestions: questions.length,
    expectedTotal: 20,
    isValid: questions.length === 20,
    categoryCounts: counts,
    expectedCounts,
    categoryValidation: {}
  };

  Object.keys(expectedCounts).forEach(category => {
    validation.categoryValidation[category] = {
      actual: counts[category] || 0,
      expected: expectedCounts[category],
      isValid: (counts[category] || 0) === expectedCounts[category]
    };
  });

  return validation;
};

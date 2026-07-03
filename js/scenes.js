const MISSIONS = {
  changi: [
    {
      id: 'find_gate',
      title: 'Find Your Gate',
      icon: '🚪',
      description: 'Navigate to Gate A08 using the airport information board.',
      question: 'changi_1'
    },
    {
      id: 'jewel_discovery',
      title: 'Discover Jewel',
      icon: '💎',
      description: 'Find the iconic Rain Vortex inside Jewel Changi.',
      question: 'changi_3'
    },
    {
      id: 'butterfly_garden',
      title: 'Butterfly Garden',
      icon: '🦋',
      description: 'Locate the beautiful Butterfly Garden sanctuary.',
      question: 'changi_4'
    },
    {
      id: 'airport_excellence',
      title: 'Airport Excellence',
      icon: '⭐',
      description: 'Learn about Changi\'s consistent world-class recognition.',
      question: 'changi_2'
    },
    {
      id: 'luggage_challenge',
      title: 'Cabin Baggage Challenge',
      icon: '✈️',
      description: 'Know what you can bring onboard.',
      question: 'changi_5'
    }
  ],
  hawker: [
    {
      id: 'chope_table',
      title: 'The Art of Chope',
      icon: '🪑',
      description: 'Understand why tissue packets are precious in hawker culture.',
      question: 'hawker_1'
    },
    {
      id: 'kopi_ordering',
      title: 'Kopi Ordering',
      icon: '☕',
      description: 'Master the hawker coffee language.',
      question: 'hawker_2'
    },
    {
      id: 'unesco_heritage',
      title: 'UNESCO Heritage',
      icon: '🏆',
      description: 'Discover why hawker culture is globally celebrated.',
      question: 'hawker_3'
    },
    {
      id: 'multicultural_dining',
      title: 'Multicultural Melting Pot',
      icon: '🍜',
      description: 'Experience Singapore\'s food story.',
      question: 'hawker_4'
    },
    {
      id: 'fusion_cuisine',
      title: 'Unique Fusion',
      icon: '👨‍🍳',
      description: 'Learn what makes Singaporean food uniquely ours.',
      question: 'hawker_5'
    }
  ]
};

const HAWKER_SCENES = [
  {
    speaker: 'Hawker Uncle',
    dialogue: 'Morning boss! First time here ah? Come, come, sit down first. Where you from?',
    options: [
      'Just arrived from the airport',
      'Been traveling around',
      'Visiting for a few days'
    ]
  },
  {
    speaker: 'Hawker Uncle',
    dialogue: 'Ah, welcome to Singapore lah! You want to try real local food? Let me recommend for you. What you prefer?',
    options: [
      'Something with chicken',
      'Something with seafood',
      'Something vegetarian'
    ]
  },
  {
    speaker: 'Hawker Auntie',
    dialogue: 'See all these people, different races, different backgrounds, all come here to eat. This is Singapore lor. Family table, friend table, office people—everyone come same place.',
    options: [
      'That\'s really special',
      'I want to understand more',
      'Tell me a story'
    ]
  }
];

function getMissionsByDestination(destination) {
  return MISSIONS[destination] || [];
}

function getHawkerScene(index) {
  return HAWKER_SCENES[index % HAWKER_SCENES.length];
}
const QUESTIONS = {
  changi: [
    {
      id: 'changi_1',
      type: 'choice',
      context: 'An immigration officer asks you a friendly question as they review your arrival.',
      text: 'The immigration officer asks: "First time in Singapore?" You reply that you\'re excited to explore. They smile and ask: "What does the word Changi mean in Malay?"',
      options: [
        { text: 'Beach', correct: true },
        { text: 'Airport', correct: false },
        { text: 'Gateway', correct: false },
        { text: 'Sky', correct: false }
      ],
      insight: 'Changi is named after a coastal area. The name reflects Singapore\'s maritime heritage.'
    },
    {
      id: 'changi_2',
      type: 'choice',
      context: 'You notice plaques around the airport celebrating its achievements.',
      text: 'Looking at the awards, you wonder: How many consecutive years has Changi won Best Airport in Asia-Pacific?',
      options: [
        { text: '5 years', correct: false },
        { text: '10 years', correct: true },
        { text: '15 years', correct: false },
        { text: 'Every year since opening', correct: false }
      ],
      insight: 'Changi\'s consistent excellence is a source of national pride and reflects Singapore\'s commitment to quality.'
    },
    {
      id: 'changi_3',
      type: 'choice',
      context: 'You explore Jewel Changi and notice the distinctive architecture.',
      text: 'The Jewel has a stunning centerpiece. What is it called?',
      options: [
        { text: 'Crystal Dome', correct: false },
        { text: 'Rain Vortex', correct: true },
        { text: 'Sky Garden', correct: false },
        { text: 'Water Mirror', correct: false }
      ],
      insight: 'The Rain Vortex is a seven-story indoor waterfall—the tallest in the world. It represents Singapore\'s blend of nature and modernity.'
    },
    {
      id: 'changi_4',
      type: 'choice',
      context: 'You notice beautiful plants throughout the airport terminals.',
      text: 'Changi is known for its botanical spaces. Which garden is located inside the airport?',
      options: [
        { text: 'Singapore Botanic Gardens', correct: false },
        { text: 'Butterfly Garden', correct: true },
        { text: 'Sunken Garden', correct: false },
        { text: 'Night Garden', correct: false }
      ],
      insight: 'The Butterfly Garden is a sanctuary inside the airport—a peaceful space that represents Singapore\'s commitment to nature conservation.'
    },
    {
      id: 'changi_5',
      type: 'choice',
      context: 'You\'re packing for a day trip within Singapore and wondering about baggage rules.',
      text: 'You want to bring a souvenir back: a small Singapore Airlines model plane (15cm tall). Can it go in your cabin baggage?',
      options: [
        { text: 'Yes, no problem', correct: true },
        { text: 'No, must be checked', correct: false },
        { text: 'No, not allowed at all', correct: false },
        { text: 'Only if declared', correct: false }
      ],
      insight: 'Small toys and souvenirs are perfectly fine in cabin baggage. It\'s another reason why Changi is so traveler-friendly.'
    }
  ],
  hawker: [
    {
      id: 'hawker_1',
      type: 'choice',
      context: 'You arrive at the hawker centre during lunch rush. Every table is full. You notice someone has placed a tissue packet on an empty table.',
      text: 'Why did someone place a tissue packet on that empty table?',
      options: [
        { text: 'To indicate the table needs cleaning', correct: false },
        { text: 'To reserve the table (chope)', correct: true },
        { text: 'Because they forgot it', correct: false },
        { text: 'To mark it as closed', correct: false }
      ],
      insight: '"Chope" is a uniquely Singaporean practice. A tissue packet, bag, or even a chair reserves a table in a hawker centre. It\'s an informal but universally respected system.'
    },
    {
      id: 'hawker_2',
      type: 'choice',
      context: 'You approach the coffee stall. "Uncle" asks what you\'d like.',
      text: 'You hear someone order "Kopi O". What does that mean?',
      options: [
        { text: 'Coffee with milk and sugar', correct: false },
        { text: 'Black coffee', correct: true },
        { text: 'Coffee with condensed milk', correct: false },
        { text: 'Iced coffee', correct: false }
      ],
      insight: 'Kopi ordering is an art form in Singapore. "Kopi O" = black coffee. "Kopi C" = coffee with evaporated milk. "Kopi" = coffee with condensed milk. Learning these is your first step to belonging.'
    },
    {
      id: 'hawker_3',
      type: 'choice',
      context: 'You watch the hawker stalls operate with impressive efficiency during the lunch hour.',
      text: 'What food was UNESCO recognized as "Intangible Cultural Heritage" in Singapore?',
      options: [
        { text: 'Hawker culture', correct: true },
        { text: 'Chinese dim sum', correct: false },
        { text: 'Peranakan cuisine', correct: false },
        { text: 'Indian bread', correct: false }
      ],
      insight: 'In 2020, UNESCO recognized Hawker Culture as Intangible Cultural Heritage of Humanity. Hawker centres are where Singapore comes together—people from all communities, all backgrounds, sharing meals.'
    },
    {
      id: 'hawker_4',
      type: 'choice',
      context: 'You notice people at different stalls seem to know each other and chat in different languages.',
      text: 'How many major ethnic groups call hawker centres their "eating place"?',
      options: [
        { text: '2 main groups', correct: false },
        { text: '3 main groups', correct: true },
        { text: '5 main groups', correct: false },
        { text: 'Everyone', correct: false }
      ],
      insight: 'Chinese, Malay, and Indian communities all have their signature hawker dishes. Hawker centres are where Singapore\'s multiculturalism is most alive and delicious.'
    },
    {
      id: 'hawker_5',
      type: 'choice',
      context: 'You\'re watching the food preparation and notice the incredible speed and skill.',
      text: 'What makes Singaporean hawker food unique compared to the countries it originated from?',
      options: [
        { text: 'It uses more expensive ingredients', correct: false },
        { text: 'It blends flavors from multiple cuisines', correct: true },
        { text: 'It uses western cooking techniques', correct: false },
        { text: 'It uses less spice', correct: false }
      ],
      insight: 'Singaporean hawker food is uniquely fusion. The hawker centres became melting pots where Chinese cooks learned from Indian spice merchants, where Malay techniques influenced Chinese dishes. It\'s culinary multiculturalism.'
    }
  ]
};

function getRandomQuestion(destinationId, exclude = []) {
  const questions = QUESTIONS[destinationId] || [];
  const available = questions.filter(q => !exclude.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function getQuestionById(id) {
  for (const destination in QUESTIONS) {
    const question = QUESTIONS[destination].find(q => q.id === id);
    if (question) return question;
  }
  return null;
}
export interface CardData {
  id: number;
  type: 'short' | 'long';
  pairId: number;
  content: string;
}

export const gameCards: CardData[] = [
  // Pair 1 - Science
  {
    id: 1,
    type: 'short',
    pairId: 1,
    content: 'Photosynthesis'
  },
  {
    id: 2,
    type: 'long',
    pairId: 1,
    content: 'Plants use sunlight, water, air to make food.'
  },
  // Pair 2 - History
  {
    id: 3,
    type: 'short',
    pairId: 2,
    content: 'Industrial revolution'
  },
  {
    id: 4,
    type: 'long',
    pairId: 2,
    content: 'Factories, machines, new inventions changed society.'
  },
  // Pair 3 - Technology
  {
    id: 5,
    type: 'short',
    pairId: 3,
    content: 'Artificial intelligence'
  },
  {
    id: 6,
    type: 'long',
    pairId: 3,
    content: 'Computers solve problems, learn, recognize patterns.'
  },
  // Pair 4 - Geography
  {
    id: 7,
    type: 'short',
    pairId: 4,
    content: 'Climate change'
  },
  {
    id: 8,
    type: 'long',
    pairId: 4,
    content: 'Global warming, weather changes, human impact.'
  }
];

export const shuffleCards = (cards: CardData[]): CardData[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

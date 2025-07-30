export interface CardData {
  id: number;
  type: 'scenario' | 'solution';
  pairId: number;
  content: string;
}

export const gameCards: CardData[] = [
  // Pair 1 - Sudden Change in Company Signatories

  {
    id: 1,
    type: 'scenario',
    pairId: 1,
    content: 'The customer changes directors and signatories just before requesting large trade transactions.'
  },
  {
    id: 2,
    type: 'solution',
    pairId: 1,
    content: 'Verify the reason for the change and conduct fresh due diligence.'
  },
  // Pair 2 No Supplier Details, Wants Advance Payment

  {
    id: 3,
    type: 'scenario',
    pairId: 2,
    content: ' Importer wants to pay in advance to a high-risk country but has no supplier contract.'
  },
  {
    id: 4,
    type: 'solution',
    pairId: 2,
    content: 'Request detailed documents and assess the legitimacy of the trade.'
  },
  // Pair 3 - Overpriced Low-Value Goods
  {
    id: 5,
    type: 'scenario',
    pairId: 3,
    content: 'Invoices show unusually high prices for low-value goods like cables and cloths.'
  },
  {
    id: 6,
    type: 'solution',
    pairId: 3,
    content: 'Check pricing against industry standards and flag for over-invoicing.'
  },
  
];

export const shuffleCards = (cards: CardData[]): CardData[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

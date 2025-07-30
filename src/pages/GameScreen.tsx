import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import ResultModal from "../components/ResultModal";
import { gameCards, shuffleCards } from "../data/gameData";
import type { CardData } from "../data/gameData";
import { ArrowLeft, RotateCcw } from "lucide-react";

const GameScreen = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchedPairs.length === 4) {
      setTimeout(() => setIsGameComplete(true), 1000);
    }
  }, [matchedPairs]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [first, second] = flippedCards;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstCard.pairId]);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1500);
      }
    }
  }, [flippedCards, cards]);

  const initializeGame = () => {
    const shuffledCards = shuffleCards(gameCards);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsGameComplete(false);
    setIsChecking(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(cardId) ||
      matchedPairs.some(
        (pairId) => cards.find((card) => card.id === cardId)?.pairId === pairId
      ) ||
      isChecking
    ) {
      return;
    }

    setFlippedCards((prev) => [...prev, cardId]);
  };

  const isCardFlipped = (cardId: number) => {
    return (
      flippedCards.includes(cardId) ||
      matchedPairs.some(
        (pairId) => cards.find((card) => card.id === cardId)?.pairId === pairId
      )
    );
  };

  const isCardMatched = (cardId: number) => {
    return matchedPairs.some(
      (pairId) => cards.find((card) => card.id === cardId)?.pairId === pairId
    );
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex justify-between items-center mb-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link to="/">
              <motion.button
                className="p-3 rounded-full hover:bg-[#252525]/10 text-white hover:text-white"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#252525",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            </Link>
            <h1 className="text-2xl font-bold text-white">
              Flip & Find
            </h1>
            <motion.button
              onClick={initializeGame}
              className="p-3 rounded-full hover:bg-[#252525]/10 text-white hover:text-white"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#252525",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </motion.button>
          </motion.div>

          {/* Title and Stats */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center gap-8">
              <motion.div
                className="flex items-center py-1 px-4 gap-4 bg-[#252525]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-gray-400 text-sm font-medium">
                  Moves
                </div>
                <div className="text-2xl font-bold text-white">{moves}</div>
              </motion.div>

              <motion.div
                className="flex items-center py-1 px-4 gap-4 bg-[#252525]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-gray-400 text-sm font-medium">
                  Pairs
                </div>
                <div className="text-2xl font-bold text-white">
                  {matchedPairs.length}
                  <span className="text-white">/4</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="max-w-md mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative h-2 bg-[#252525] rounded-full overflow-hidden backdrop-blur-sm border border-gray-800/30">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#96FF43]  rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(matchedPairs.length / 4) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
            </div>
            <div className="text-center mt-2 text-xs text-gray-500">
              {Math.round((matchedPairs.length / 4) * 100)}% Complete
            </div>
          </motion.div>

          {/* Game Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GameCard
                  card={card}
                  isFlipped={isCardFlipped(card.id)}
                  isMatched={isCardMatched(card.id)}
                  onClick={() => handleCardClick(card.id)}
                  disabled={isChecking}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={isGameComplete}
        moves={moves}
        onPlayAgain={initializeGame}
      />
    </div>
  );
};

export default GameScreen;

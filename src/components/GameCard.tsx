import { motion } from 'framer-motion';
import type { CardData } from '../data/gameData';

interface GameCardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const GameCard = ({ card, isFlipped, isMatched, onClick, disabled }: GameCardProps) => {
  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-pointer group perspective-1000"
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      whileTap={disabled ? {} : { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 120,
          damping: 15
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={!disabled && !isFlipped ? {
            boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
          } : {}}
        >
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/5 rounded-full blur-sm"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/5 rounded-full blur-sm"></div>
            </div>
          </div>
          
          {/* Border and glow effect */}
          <div className="absolute inset-0 rounded-3xl border border-gray-700/50 group-hover:border-gray-600/80 transition-colors duration-300"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <motion.div
              className="text-6xl filter drop-shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* 🎯 */}
            </motion.div>
          </div>
          
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
            style={{ transform: 'skewX(-20deg)' }}
          ></motion.div>
        </motion.div>

        {/* Card Front */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden ${
            isMatched ? 'ring-2 ring-white/60 shadow-2xl shadow-white/20' : ''
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Dynamic background based on card type */}
          <div className={`absolute inset-0 ${
            card.type === 'short' 
              ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900' 
              : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
          }`}>
            {/* Subtle animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
          </div>
          
          {/* Border and glow */}
          <div className={`absolute inset-0 rounded-3xl border transition-all duration-300 ${
            card.type === 'short' 
              ? 'border-gray-600/60' 
              : 'border-gray-700/60'
          } ${isMatched ? 'border-white/40' : ''}`}></div>
          
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full p-6">
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.div 
                className={`font-bold leading-relaxed ${
                  card.type === 'short' 
                    ? 'text-xl' 
                    : 'text-sm leading-relaxed'
                }`}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {card.content}
              </motion.div>
              
              {/* Type indicator */}
              <motion.div
                className={`mt-3 text-xs font-medium tracking-wider uppercase ${
                  card.type === 'short' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                {card.type === 'short' ? 'Term' : 'Definition'}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Matched celebration effect */}
          {isMatched && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 0.7], 
                scale: [0.8, 1.05, 1],
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          )}
        </motion.div>
      </motion.div>
      
      {/* Matched glow effect */}
      {isMatched && (
        <motion.div
          className="absolute inset-0 -z-10 bg-white/20 rounded-3xl blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

export default GameCard;
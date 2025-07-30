import { motion } from 'framer-motion';

interface ResultModalProps {
  isOpen: boolean;
  moves: number;
  onPlayAgain: () => void;
}

const ResultModal = ({ isOpen, moves, onPlayAgain }: ResultModalProps) => {
  if (!isOpen) return null;


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Card Flip Game',
        text: `I completed the game in ${moves} moves! Can you beat my score?`,
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      // Copy link to clipboard when sharing is not supported
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard! Share it with your friends.');
        })
        .catch(() => {
          alert('Unable to copy link. Please copy the URL manually.');
        });
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0D0D0D]/90 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border border-gray-800/50"
        initial={{ scale: 0, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ 
          type: "spring", 
          duration: 0.8,
          bounce: 0.4
        }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🎉
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Congratulations!
        </h2>
        
        <p className="text-gray-400 mb-2">
          You completed the game in
        </p>
        
        <motion.div
          className="text-4xl font-bold text-white mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {moves} moves
        </motion.div>
        
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-[#252525] backdrop-blur-sm text-gray-300  font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
          
          <motion.button
            onClick={handleShare}
            className="px-6 py-3 bg-[#252525] backdrop-blur-sm text-gray-300  font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Share
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultModal;
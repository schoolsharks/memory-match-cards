import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const IntroScreen = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden flex items-center justify-center p-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 bg-[#252525] p-8 max-w-md w-full shadow-2xl border border-gray-800/50"
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          bounce: 0.4
        }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-6"
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
            🧠
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-6">
            Flip & Find
          </h1>
          
          <div className="text-gray-400 text-left space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Match each risky scenario with the right next step.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Tap to flip the cards and see what's inside.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Find all 3 matching pairs.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Try to use the least moves!</span>
            </div>
          </div>
          
          <div className="bg-[#464646] backdrop-blur-sm p-4 mb-6 border border-gray-700/30">
            {/* <div className="text-gray-500 text-sm mb-2">Game Stats</div> */}
            <div className="flex justify-between text-white">
              <span>Cards: <span className="text-gray-300">6</span></span>
              <span>Pairs: <span className="text-gray-300">3</span></span>
            </div>
          </div>
          
          <Link to="/game">
            <motion.button
              className="w-full py-3 bg-[#96FF43] backdrop-blur-sm text-black font-semibold border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Game
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
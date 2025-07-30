import { motion } from "framer-motion";
import type { CardData } from "../data/gameData";
import matchCardBg from "../assets/match-card-bg.webp";

interface GameCardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const GameCard = ({
  card,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}: GameCardProps) => {
  return (
    <div className="w-full aspect-[3/4]" style={{ perspective: "1000px" }}>
      <motion.div
        className={`flex items-center justify-center w-full h-full cursor-pointer ${
          isMatched ? "bg-[#96FF43]" : "bg-white"
        }`}
        onClick={disabled ? undefined : onClick}
        whileTap={{ scale: 0.95 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {isFlipped ? (
          <div
            className="flex w-full items-center justify-center h-full p-2 text-black"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="h-full w-full flex flex-col justify-between">
              <div className="flex flex-1 items-center">
                <div className={`leading-relaxed text-md`}>{card.content}</div>
              </div>
              <div
                className={`text-xs mt-3 font-bold tracking-wider`}
              >
                {card.type === "scenario" ? "Scenario" : "Solution"}
              </div>
            </div>
          </div>
        ) : (
          <img
            src={matchCardBg}
            alt="Card back"
            className="w-full h-full object-fill"
          />
        )}
      </motion.div>
    </div>
  );
};

export default GameCard;

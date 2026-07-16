import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const VotingScene = ({ onComplete }) => {
  const [voted, setVoted] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleVote = (index) => {
    setVoted(index);
    setTimeout(() => {
      setShowResult(true);
      if (content.voting.options[index].isCorrect) {
        setTimeout(() => setShowCorrect(true), 2000);
      } else {
        setTimeout(() => {
          setVoted(null);
          setShowResult(false);
        }, 1500);
      }
    }, 600);
  };

  const isCorrect = voted !== null && content.voting.options[voted]?.isCorrect;

  return (
    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="text-xs text-[#888]">Voting Phase</span>
        </div>
        <div className="top-bar-center">
          <span className="text-[10px] text-[#666]">Day 1</span>
        </div>
        <div className="top-bar-right">
          <div className="conn-indicator" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Question */}
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-[#D0D0D0] font-medium">{content.voting.question}</p>
          <p className="text-[10px] text-[#666] mt-1">Select who you think is guilty</p>
        </div>

        {/* Options */}
        <div className="px-4 space-y-2 pb-4">
          {content.voting.options.map((option, i) => (
            <button
              key={i}
              className={`vote-option ${
                voted === i && isCorrect ? 'correct' :
                voted === i && !isCorrect ? 'wrong' :
                voted !== null ? 'opacity-40' : ''
              }`}
              onClick={() => handleVote(i)}
              disabled={voted !== null}
            >
              <span className="text-base">{option.emoji}</span>
              <span className="flex-1">{option.name}</span>
              {voted === i && <span className="text-xs">{isCorrect ? '✓' : '✗'}</span>}
            </button>
          ))}
        </div>

        {/* Result overlay */}
        <AnimatePresence>
          {showCorrect && (
            <motion.div
              className="absolute inset-0 bg-black/70 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-center px-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="text-3xl mb-2">❤️</div>
                <p className="text-sm text-[#4CAF50] font-bold mb-1">{content.voting.correctMessage}</p>
                <p className="text-xs text-[#888] mb-5">{content.voting.correctSubtitle}</p>
                <button
                  onClick={onComplete}
                  className="game-btn game-btn-gold text-[11px] px-5 py-2"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}

          {showResult && !isCorrect && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-xs text-[#C74B4B]">Wrong guess... Try again</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VotingScene;
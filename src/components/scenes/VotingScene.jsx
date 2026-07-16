import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti, StarField } from '../effects/ParticleField';
import content from '../../config/content';

const VoteOption = ({ option, index, onVote, disabled }) => {
  const isCorrect = option.isCorrect;

  return (
    <motion.button
      className="relative w-full px-6 py-4 rounded-xl border border-white/10 bg-white/5
                 hover:bg-white/10 transition-all duration-300 flex items-center gap-4
                 disabled:cursor-not-allowed disabled:opacity-50"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 + 0.5 }}
      whileHover={!disabled ? { scale: 1.02, borderColor: 'rgba(212,168,83,0.4)' } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={() => onVote(index)}
      disabled={disabled}
    >
      <span className="text-2xl">{option.emoji}</span>
      <span className="text-white/80 text-sm tracking-[0.05em]">{option.name}</span>
    </motion.button>
  );
};

const VotingScene = ({ onComplete }) => {
  const [voted, setVoted] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleVote = (index) => {
    setVoted(index);
    setTimeout(() => {
      setShowResult(true);
      if (content.voting.options[index].isCorrect) {
        setTimeout(() => setShowContinue(true), 3000);
      } else {
        setTimeout(() => {
          setVoted(null);
          setShowResult(false);
        }, 2000);
      }
    }, 1000);
  };

  const isCorrect = voted !== null && content.voting.options[voted]?.isCorrect;

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <StarField count={30} />
      <Confetti active={showResult && isCorrect} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl text-gold font-bold tracking-[0.1em] mb-3">
            {content.voting.title}
          </h2>
          <p className="text-white/60 text-base">
            {content.voting.question}
          </p>
        </motion.div>

        <div className="w-full max-w-sm space-y-3">
          {content.voting.options.map((option, i) => (
            <VoteOption
              key={i}
              option={option}
              index={i}
              onVote={handleVote}
              disabled={voted !== null}
            />
          ))}
        </div>

        <AnimatePresence>
          {showResult && isCorrect && (
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <motion.div
                  className="text-7xl mb-4"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                >
                  ❤️
                </motion.div>
                <h2 className="text-3xl md:text-4xl text-gold-light font-bold mb-3">
                  {content.voting.correctMessage}
                </h2>
                <p className="text-gold/80 text-lg tracking-[0.05em]">
                  {content.voting.correctSubtitle}
                </p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  onClick={onComplete}
                  className="mt-10 px-10 py-3 rounded-full border border-gold/40 text-gold 
                             text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                             transition-all duration-500 hover:border-gold/60
                             hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
                >
                  Continue
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {showResult && !isCorrect && (
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-rose text-xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                Try again...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VotingScene;
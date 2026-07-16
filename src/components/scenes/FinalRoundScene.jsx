import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const FinalRoundScene = ({ onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [flipped, setFlipped] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('card'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = () => {
    if (flipped) return;
    setFlipped(true);
    setTimeout(() => setShowComplete(true), 3000);
  };

  return (
    <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="flex gap-2 justify-center">
              {[0,1,2].map(i => (
                <motion.span
                  key={i}
                  className="text-lg text-[#555]"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  ♥
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Card */}
            <div
              className="relative w-[220px] aspect-[3/4] cursor-pointer mx-auto perspective-[800px]"
              onClick={handleFlip}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-lg flex flex-col items-center justify-center gap-3"
                  style={{
                    background: '#2C2C2C',
                    border: '1px solid #4A4A4A',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-sm text-[#D0D0D0] font-semibold tracking-wider uppercase">
                    {content.finalRound.frontTitle}
                  </p>
                  <p className="text-[10px] text-[#555]">Tap to reveal</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-lg flex flex-col items-center justify-center p-6"
                  style={{
                    background: '#222',
                    border: '1px solid #E74C7A55',
                    boxShadow: '0 0 20px rgba(231,76,122,0.1)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={flipped ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="text-3xl mb-3">❤️</div>
                    <p className="text-xs text-[#D0D0D0] mb-2 leading-relaxed">
                      {content.finalRound.backTitle}
                    </p>
                    <p className="text-[10px] text-[#888] italic mb-3">
                      {content.finalRound.backSubtitle}
                    </p>
                    <motion.p
                      className="text-sm text-[#E74C7A] font-semibold"
                      initial={{ opacity: 0 }}
                      animate={flipped ? { opacity: 1 } : {}}
                      transition={{ delay: 1.5, duration: 0.4 }}
                    >
                      {content.finalRound.finalLine}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <AnimatePresence>
              {showComplete && (
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  onClick={onComplete}
                  className="game-btn game-btn-gold text-[11px] px-5 py-2 mt-6"
                >
                  See the Ending
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalRoundScene;
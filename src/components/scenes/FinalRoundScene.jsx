import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, ParticleField } from '../effects/ParticleField';
import content from '../../config/content';

const FinalRoundScene = ({ onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [flipped, setFlipped] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('card'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = () => {
    setFlipped(true);
    setTimeout(() => setShowComplete(true), 3500);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <StarField count={40} />
      <ParticleField count={20} color="#e74c7a" speed={0.3} />

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="text-2xl md:text-3xl text-white/30 tracking-[0.2em]"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥ ♥ ♥
            </motion.div>
          </motion.div>
        )}

        {phase === 'card' && (
          <motion.div
            key="final"
            className="relative z-10 w-full max-w-[320px] perspective-[1000px] px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative w-full aspect-[3/4] cursor-pointer"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={!flipped ? handleFlip : undefined}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
                style={{
                  background: 'linear-gradient(145deg, rgba(20,10,30,0.98), rgba(10,5,20,0.98))',
                  border: '2px solid rgba(212,168,83,0.3)',
                  boxShadow: '0 0 60px rgba(212,168,83,0.1)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <motion.div
                  className="text-5xl mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </motion.div>
                <h2 className="text-2xl md:text-3xl text-gold font-bold text-center tracking-[0.1em] text-shadow">
                  {content.finalRound.frontTitle}
                </h2>
                <motion.p
                  className="text-white/30 text-sm mt-4 tracking-[0.1em]"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to discover
                </motion.p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
                style={{
                  background: 'linear-gradient(145deg, rgba(30,20,50,0.98), rgba(10,10,30,0.98))',
                  border: '2px solid rgba(231,76,122,0.3)',
                  boxShadow: '0 0 60px rgba(231,76,122,0.1)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={flipped ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="text-6xl mb-4">❤️</div>
                  <h2 className="text-xl text-gold-light font-bold mb-3">
                    {content.finalRound.backTitle}
                  </h2>
                  <p className="text-white/50 text-sm mb-4 italic">
                    {content.finalRound.backSubtitle}
                  </p>
                  <motion.p
                    className="text-rose text-lg tracking-[0.1em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={flipped ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    {content.finalRound.finalLine}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            <AnimatePresence>
              {showComplete && (
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={onComplete}
                    className="px-10 py-3 rounded-full border border-rose/40 text-rose 
                               text-sm tracking-[0.2em] uppercase hover:bg-rose/10 
                               transition-all duration-500 hover:border-rose/60
                               hover:shadow-[0_0_30px_rgba(231,76,122,0.2)]"
                  >
                    See the Ending
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalRoundScene;
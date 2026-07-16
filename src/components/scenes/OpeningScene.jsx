import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FogParticles, StarField } from '../effects/ParticleField';
import content from '../../config/content';

const OpeningScene = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading');
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('welcome'), 2000);
    const timer2 = setTimeout(() => setPhase('detective'), 3500);
    const timer3 = setTimeout(() => setShowContinue(true), 5500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <StarField count={60} />
      <FogParticles />
      
      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.p
                className="text-gold/60 text-sm tracking-[0.3em] uppercase"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {content.opening.loadingText}
              </motion.p>
            </motion.div>
          )}

          {phase === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-light tracking-[0.2em] text-gold text-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {content.opening.welcomeText}
              </motion.h1>
            </motion.div>
          )}

          {phase === 'detective' && (
            <motion.div
              key="detective"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <motion.p
                className="text-2xl md:text-3xl text-white/80 mt-4 tracking-[0.15em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                {content.opening.detectiveText}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContinue && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.5 }}
              onClick={onComplete}
              className="mt-16 px-10 py-3 rounded-full border border-gold/40 text-gold 
                         text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                         transition-all duration-500 hover:border-gold/60
                         hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
            >
              {content.opening.continueText}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OpeningScene;
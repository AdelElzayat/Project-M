import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const OpeningScene = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading');
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('welcome'), 1800);
    const t2 = setTimeout(() => setPhase('detective'), 3200);
    const t3 = setTimeout(() => setShowContinue(true), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="load"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="loading-spinner" />
            <span className="text-xs text-[#666] tracking-wider uppercase">{content.opening.loadingText}</span>
          </motion.div>
        )}

        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-[#888] tracking-wider uppercase">{content.opening.welcomeText}</p>
          </motion.div>
        )}

        {phase === 'detective' && (
          <motion.div
            key="detective"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-lg text-[#D0D0D0] tracking-wider">"{content.opening.detectiveText}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContinue && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            onClick={onComplete}
            className="game-btn game-btn-primary mt-8 text-xs px-5 py-2"
          >
            {content.opening.continueText}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpeningScene;
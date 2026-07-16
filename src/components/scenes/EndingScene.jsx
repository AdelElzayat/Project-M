import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, FogParticles, Constellations, FloatingHearts } from '../effects/ParticleField';
import content from '../../config/content';

const EndingScene = ({ onRestart }) => {
  const [revealedLines, setRevealedLines] = useState([]);
  const [showHeart, setShowHeart] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const lineRef = useRef(0);

  const lines = [
    content.ending.line1,
    content.ending.line2,
    content.ending.line3,
  ];

  const finalMessages = [
    content.ending.message,
    content.ending.message2,
    content.ending.message3,
    content.ending.message4,
    '',
    content.ending.message5,
    content.ending.message6,
    content.ending.message7,
    content.ending.message8,
    content.ending.message9,
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setRevealedLines(prev => [...prev, i]);
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(() => setShowHeart(true), 2000);
        setTimeout(() => setShowFinal(true), 3500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showFinal) return;

    let i = 0;
    const interval = setInterval(() => {
      setRevealedLines(prev => [...prev, lines.length + i]);
      i++;
      if (i >= finalMessages.length) {
        clearInterval(interval);
        setTimeout(() => setShowRestart(true), 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showFinal]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-black via-dark-900 to-black overflow-hidden">
      <StarField count={80} />
      <FogParticles />
      <Constellations />
      <FloatingHearts count={12} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Main lines */}
        <div className="text-center max-w-lg">
          {lines.map((line, i) => (
            <AnimatePresence key={`line-${i}`}>
              {revealedLines.includes(i) && (
                <motion.p
                  className="text-xl md:text-2xl text-white/70 font-light tracking-[0.05em] mb-4"
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Large Heart */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="my-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
            >
              <motion.span
                className="text-7xl md:text-8xl inline-block cursor-pointer select-none"
                animate={{
                  scale: [1, 1.15, 1],
                  textShadow: [
                    '0 0 20px rgba(231,76,122,0.3)',
                    '0 0 40px rgba(231,76,122,0.6)',
                    '0 0 20px rgba(231,76,122,0.3)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => {
                  // Easter egg: long press heart triggers gallery
                }}
              >
                ❤️
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final messages */}
        <div className="text-center max-w-lg">
          {showFinal && finalMessages.map((msg, i) => (
            <AnimatePresence key={`final-${i}`}>
              {revealedLines.includes(lines.length + i) && (
                <motion.p
                  className={`text-lg tracking-[0.05em] mb-2 ${
                    msg === content.ending.message9
                      ? 'text-gold-light font-bold text-2xl mt-4 text-shadow-strong'
                      : msg === ''
                      ? 'h-4'
                      : 'text-white/60'
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  {msg}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Anniversary message */}
        <AnimatePresence>
          {showRestart && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl text-gold font-bold tracking-[0.1em] mb-4 text-shadow-strong"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                {content.ending.anniversary} {content.ending.heartEmoji}
              </motion.h2>

              <motion.p
                className="text-white/40 text-sm tracking-[0.1em] mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                {content.ending.message}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 4, duration: 1 }}
                onClick={onRestart}
                className="mt-10 px-8 py-3 rounded-full border border-gold/40 text-gold 
                           text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                           transition-all duration-500 hover:border-gold/60
                           hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
              >
                Experience Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EndingScene;
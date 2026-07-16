import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const EndingScene = ({ onRestart }) => {
  const [revealedLines, setRevealedLines] = useState([]);
  const [showHeart, setShowHeart] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [showStars, setShowStars] = useState(false);

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

  // Stars for ending
  useEffect(() => {
    setShowStars(true);
  }, []);

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
    }, 2800);
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
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] flex flex-col items-center justify-center px-6 overflow-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Stars */}
      {showStars && (
        <>
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-0 text-center max-w-sm">
        {/* Main lines */}
        {lines.map((line, i) => (
          <AnimatePresence key={`l${i}`}>
            {revealedLines.includes(i) && (
              <motion.p
                className="text-sm md:text-base text-[#D0D0D0] font-light tracking-wider mb-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {line}
              </motion.p>
            )}
          </AnimatePresence>
        ))}

        {/* Heart */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="my-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
            >
              <motion.span
                className="text-5xl md:text-6xl inline-block cursor-pointer"
                animate={{
                  scale: [1, 1.12, 1],
                  textShadow: [
                    '0 0 10px rgba(231,76,122,0.3)',
                    '0 0 25px rgba(231,76,122,0.6)',
                    '0 0 10px rgba(231,76,122,0.3)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final messages - scrollable if needed */}
        <div className="overflow-y-auto max-h-[40vh] px-2">
          {showFinal && finalMessages.map((msg, i) => (
            <AnimatePresence key={`f${i}`}>
              {revealedLines.includes(lines.length + i) && (
                <motion.p
                  className={`tracking-wider mb-2 ${
                    msg === content.ending.message9
                      ? 'text-[#D4A853] font-bold text-base mt-4'
                      : msg === ''
                      ? 'h-2'
                      : 'text-xs text-[#888]'
                  }`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {msg}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Anniversary + Restart */}
        <AnimatePresence>
          {showRestart && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="text-lg md:text-xl text-[#D4A853] font-bold tracking-wider mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {content.ending.anniversary} {content.ending.heartEmoji}
              </motion.h2>
              <motion.p
                className="text-[10px] text-[#666] mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                {content.ending.message}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.3 }}
                onClick={onRestart}
                className="game-btn game-btn-gold text-[11px] px-5 py-2"
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
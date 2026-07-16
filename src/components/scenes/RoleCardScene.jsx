import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const RoleCardScene = ({ onComplete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleFlip = () => {
    if (flipped) return;
    setFlipped(true);
    setTimeout(() => setShowContinue(true), 2200);
  };

  return (
    <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Card */}
      <div
        className="relative w-[220px] aspect-[3/4] cursor-pointer perspective-[800px]"
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
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
            <motion.div
              className="text-2xl"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❓
            </motion.div>
            <p className="text-xs text-[#888] tracking-wider uppercase">{content.roleCard.frontTitle}</p>
            <p className="text-[10px] text-[#555]">{content.roleCard.frontSubtitle}</p>
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-[10px] text-[#555]" style={{ writingMode: 'vertical-lr' }}>↓</span>
            </motion.div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-lg flex flex-col items-center justify-center p-6"
            style={{
              background: '#222',
              border: '1px solid #7C5CBF',
              boxShadow: '0 0 20px rgba(124,92,191,0.15)',
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
              <motion.div
                className="text-3xl mb-3"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <p className="text-rose text-sm font-bold tracking-wider mb-4">{content.roleCard.backTitle}</p>
              
              {content.roleCard.roles.map((role, i) => (
                <motion.p
                  key={i}
                  className="text-xs text-[#555] line-through mb-1"
                  initial={{ opacity: 0 }}
                  animate={flipped ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  {role}
                </motion.p>
              ))}
              
              <motion.p
                className="text-sm text-[#D4A853] mt-4 font-semibold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={flipped ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                {content.roleCard.special}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            className="text-center mt-6 max-w-[280px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <p className="text-xs text-[#888] mb-1">{content.roleCard.description}</p>
            <p className="text-xs text-[#666] mb-1">{content.roleCard.mission}</p>
            <p className="text-xs text-[#9B7FD4] mb-4">{content.roleCard.missionDetail}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContinue && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            onClick={onComplete}
            className="game-btn game-btn-primary text-xs px-5 py-2"
          >
            {content.roleCard.continueText}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleCardScene;
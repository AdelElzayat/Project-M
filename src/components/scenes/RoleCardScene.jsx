import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, FloatingHearts } from '../effects/ParticleField';
import content from '../../config/content';

const RoleCardScene = ({ onComplete }) => {
  const [flipped, setFlipped] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleFlip = () => {
    setFlipped(true);
    setTimeout(() => setShowContinue(true), 2500);
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center p-6">
      <StarField count={50} />
      <FloatingHearts count={6} />

      <div className="relative z-10 perspective-[1000px] w-full max-w-[320px]">
        <motion.div
          className="relative w-full aspect-[3/4] cursor-pointer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={!flipped ? handleFlip : undefined}
        >
          {/* Front */}
          <motion.div
            className={`absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 backface-hidden
                       ${!flipped ? 'gold-gradient border border-gold/30' : ''}`}
            style={{ 
              background: !flipped 
                ? 'linear-gradient(145deg, rgba(20,20,40,0.95), rgba(10,10,20,0.95))' 
                : 'transparent',
              backdropFilter: 'blur(20px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 rounded-2xl border border-gold/30" />
            <motion.div
              className="text-6xl mb-4"
              animate={!flipped ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❓
            </motion.div>
            <h2 className="text-2xl tracking-[0.15em] text-gold text-center text-shadow">
              {content.roleCard.frontTitle}
            </h2>
            <motion.p
              className="text-sm text-white/40 tracking-[0.1em] text-center"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {content.roleCard.frontSubtitle}
            </motion.p>
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-6 border-r-2 border-b-2 border-gold/40 rotate-45" />
            </motion.div>
          </motion.div>

          {/* Back */}
          <motion.div
            className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, rgba(30,20,50,0.95), rgba(10,10,30,0.95))',
              backdropFilter: 'blur(20px)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              border: '2px solid rgba(212, 168, 83, 0.3)',
              boxShadow: '0 0 40px rgba(212,168,83,0.15), inset 0 0 40px rgba(212,168,83,0.05)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={flipped ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <h2 className="text-3xl font-bold text-rose mb-4 text-shadow-strong">
                {content.roleCard.backTitle}
              </h2>
              {content.roleCard.roles.map((role, i) => (
                <motion.p
                  key={i}
                  className="text-white/50 text-sm tracking-[0.1em] line-through"
                  initial={{ opacity: 0, x: -20 }}
                  animate={flipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  {role}
                </motion.p>
              ))}
              <motion.p
                className="text-gold text-xl mt-4 font-bold tracking-[0.15em]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={flipped ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5, type: 'spring' }}
              >
                {content.roleCard.special}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showContinue && (
          <motion.div
            className="relative z-10 mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="text-gold/80 text-sm tracking-[0.1em] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {content.roleCard.description}
            </motion.p>
            <motion.p
              className="text-white/60 text-xs tracking-[0.1em] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {content.roleCard.mission}
            </motion.p>
            <motion.p
              className="text-rose-light text-sm tracking-[0.1em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {content.roleCard.missionDetail}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              onClick={onComplete}
              className="px-10 py-3 rounded-full border border-gold/40 text-gold 
                         text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                         transition-all duration-500 hover:border-gold/60
                         hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
            >
              {content.roleCard.continueText}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleCardScene;
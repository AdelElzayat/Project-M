import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, FogParticles } from '../effects/ParticleField';
import content from '../../config/content';

const EvidenceCard = ({ evidence, index, onClick }) => (
  <motion.button
    className="relative w-full p-4 rounded-xl overflow-hidden text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(evidence)}
    style={{
      background: `linear-gradient(135deg, ${evidence.color}11, ${evidence.color}22)`,
      border: `1px solid ${evidence.color}33`,
      boxShadow: `0 0 20px ${evidence.color}11`,
    }}
  >
    <div className="flex items-center gap-4">
      <div className="text-3xl">{evidence.icon}</div>
      <div>
        <h3 className="text-white/90 font-bold text-sm tracking-[0.05em]">
          {evidence.title}
        </h3>
        <p className="text-white/40 text-xs mt-0.5">{evidence.date}</p>
      </div>
      <motion.div
        className="ml-auto text-white/30"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        →
      </motion.div>
    </div>
  </motion.button>
);

const EvidenceModal = ({ evidence, onClose }) => (
  <motion.div
    className="absolute inset-0 z-30 flex items-center justify-center p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
    <motion.div
      className="relative w-full max-w-md rounded-2xl p-8 overflow-hidden"
      initial={{ scale: 0.8, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -30 }}
      transition={{ type: 'spring', damping: 25 }}
      style={{
        background: `linear-gradient(145deg, rgba(20,20,40,0.97), rgba(10,10,30,0.97))`,
        border: `2px solid ${evidence.color}44`,
        boxShadow: `0 0 60px ${evidence.color}22, inset 0 0 60px ${evidence.color}05`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${evidence.color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="text-4xl"
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {evidence.icon}
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white/90" style={{ color: evidence.color }}>
              {evidence.title}
            </h2>
            <p className="text-sm text-white/40">{evidence.date}</p>
          </div>
        </div>

        <motion.div
          className="mt-6 p-4 rounded-xl"
          style={{
            background: `${evidence.color}08`,
            border: `1px solid ${evidence.color}22`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/70 text-sm leading-relaxed italic">
            "{evidence.description}"
          </p>
        </motion.div>

        <motion.button
          className="mt-8 w-full py-3 rounded-xl border border-white/10 text-white/50 
                     text-sm hover:bg-white/5 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Close Evidence
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const DetectiveScene = ({ onComplete }) => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [allViewed, setAllViewed] = useState(false);
  const [viewedCount, setViewedCount] = useState(0);

  const handleViewEvidence = (evidence) => {
    setSelectedEvidence(evidence);
  };

  const handleCloseEvidence = () => {
    setViewedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= content.detective.evidence.length) {
        setTimeout(() => setAllViewed(true), 500);
      }
      return newCount;
    });
    setSelectedEvidence(null);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <StarField count={25} />
      <FogParticles />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="glass border-b border-white/5 px-4 py-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl text-gold font-bold tracking-[0.1em]">
              {content.detective.title}
            </h1>
            <p className="text-[10px] text-white/30 mt-1 tracking-[0.1em] uppercase">
              {content.detective.subtitle}
            </p>
          </div>
        </div>

        {/* Evidence List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-md mx-auto space-y-3">
            {content.detective.evidence.map((evidence, i) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
                index={i}
                onClick={handleViewEvidence}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedEvidence && (
            <EvidenceModal
              evidence={selectedEvidence}
              onClose={handleCloseEvidence}
            />
          )}
        </AnimatePresence>

        {/* Continue */}
        <AnimatePresence>
          {allViewed && (
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                onClick={onComplete}
                className="px-10 py-3 rounded-full border border-gold/40 text-gold 
                           text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                           transition-all duration-500 hover:border-gold/60
                           hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
              >
                Continue Investigation
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetectiveScene;
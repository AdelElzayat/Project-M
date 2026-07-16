import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, Fireflies } from '../effects/ParticleField';
import content from '../../config/content';

const SecretFileCard = ({ file, index, onClick, isUnlocked }) => {
  return (
    <motion.button
      className="relative w-full p-5 rounded-xl overflow-hidden text-left"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 + 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(file)}
      style={{
        background: isUnlocked
          ? 'linear-gradient(135deg, rgba(212,168,83,0.1), rgba(139,92,246,0.1))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.05))',
        border: `1px solid ${isUnlocked ? 'rgba(212,168,83,0.3)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isUnlocked ? '0 0 30px rgba(212,168,83,0.1)' : 'none',
      }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="text-3xl"
          animate={isUnlocked ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isUnlocked ? file.emoji : '🔒'}
        </motion.div>
        <div className="flex-1">
          <h3 className={`font-bold text-sm tracking-[0.05em] ${isUnlocked ? 'text-gold' : 'text-white/50'}`}>
            {file.name}
          </h3>
          {isUnlocked && (
            <motion.p
              className="text-xs text-white/40 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {file.description}
            </motion.p>
          )}
        </div>
        {!isUnlocked && (
          <motion.div
            className="text-white/20 text-sm"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔑
          </motion.div>
        )}
      </div>

      {/* Unlock animation overlay */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(139,92,246,0.2))',
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const SecretFileModal = ({ file, onClose }) => {
  const [hasUnlocked, setHasUnlocked] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-md rounded-2xl p-8 overflow-hidden"
        initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
        transition={{ type: 'spring', damping: 20 }}
        style={{
          background: 'linear-gradient(145deg, rgba(20,20,40,0.98), rgba(10,10,30,0.98))',
          border: '1px solid rgba(212,168,83,0.2)',
          boxShadow: '0 0 80px rgba(212,168,83,0.1)',
        }}
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/20 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/20 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/20 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/20 rounded-br-2xl" />

        <div className="relative z-10 text-center">
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {file.emoji}
          </motion.div>

          <h2 className="text-2xl font-bold text-gold mb-4 tracking-[0.1em]">
            {file.name}
          </h2>

          <motion.p
            className="text-white/60 text-sm leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {file.description}
          </motion.p>

          {!hasUnlocked ? (
            <motion.button
              className="px-8 py-3 rounded-xl bg-gold/10 border border-gold/30 text-gold 
                         text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,168,83,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHasUnlocked(true)}
            >
              Unlock Memory
            </motion.button>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,83,0.08), rgba(139,92,246,0.08))',
                  border: '1px solid rgba(212,168,83,0.15)',
                }}
              >
                <p className="text-gold-light/80 text-sm leading-relaxed">
                  Every memory with you is a treasure I hold close to my heart.
                  This one is special. Just like you.
                </p>
              </div>

              <motion.button
                className="w-full py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:bg-white/5"
                onClick={onClose}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SecretEvidenceScene = ({ onComplete }) => {
  const [unlockedFiles, setUnlockedFiles] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [allUnlocked, setAllUnlocked] = useState(false);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setUnlockedFiles(prev => {
      const next = new Set(prev);
      next.add(file.id);
      if (next.size >= content.secretEvidence.files.length) {
        setTimeout(() => setAllUnlocked(true), 1500);
      }
      return next;
    });
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <StarField count={20} />
      <Fireflies count={4} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 text-center">
          <h1 className="text-xl md:text-2xl text-gold font-bold tracking-[0.1em]">
            {content.secretEvidence.title}
          </h1>
          <p className="text-[10px] text-white/30 mt-1 tracking-[0.1em] uppercase">
            {content.secretEvidence.subtitle}
          </p>
        </div>

        {/* Files */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="max-w-sm mx-auto space-y-3">
            {content.secretEvidence.files.map((file, i) => (
              <SecretFileCard
                key={file.id}
                file={file}
                index={i}
                onClick={handleFileClick}
                isUnlocked={unlockedFiles.has(file.id)}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedFile && (
            <SecretFileModal
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
            />
          )}
        </AnimatePresence>

        {/* Continue */}
        <AnimatePresence>
          {allUnlocked && (
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
                Enter Final Round
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecretEvidenceScene;
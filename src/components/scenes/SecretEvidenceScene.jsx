import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const SecretFile = ({ file, index, onClick, isUnlocked }) => {
  const icons = ['🖼️', '🎞️', '💌', '⭐', '💫'];
  const colors = ['#D4A853', '#E74C7A', '#7C5CBF', '#4FC3F7', '#4CAF50'];

  return (
    <motion.div
      className={`secret-file ${isUnlocked ? 'unlocked' : ''}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onClick(file)}
    >
      <div
        className="w-8 h-8 flex items-center justify-center rounded text-sm"
        style={{ background: `${colors[index]}15` }}
      >
        {isUnlocked ? icons[index] : '🔒'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[#D0D0D0] font-medium">{file.name}</div>
        {isUnlocked && (
          <div className="text-[10px] text-[#666] mt-0.5 truncate">{file.description}</div>
        )}
      </div>
      {!isUnlocked && <span className="text-[10px] text-[#555]">🔑</span>}
      {isUnlocked && <span className="text-[10px] text-[#7C5CBF]">✓</span>}
    </motion.div>
  );
};

const SecretFileModal = ({ file, index, onClose }) => {
  const [unlocked, setUnlocked] = useState(false);
  const icons = ['🖼️', '🎞️', '💌', '⭐', '💫'];
  const colors = ['#D4A853', '#E74C7A', '#7C5CBF', '#4FC3F7', '#4CAF50'];
  const memories = [
    'Every smile you\'ve ever given me is etched into my memory like a photograph I\'ll never lose.',
    'Our story plays like the most beautiful movie. I never want it to end.',
    'Words could never capture what you mean to me. But I\'ll spend forever trying.',
    'Every dream I have begins and ends with you. You are my wish come true.',
    'Forever isn\'t long enough. But I\'ll take every second I can get with you.',
  ];

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <span className="text-base">{icons[index]}</span>
            <h3>{file.name}</h3>
          </div>
          <div className="modal-close" onClick={onClose}>✕</div>
        </div>
        <div className="modal-body text-center">
          {!unlocked ? (
            <>
              <p className="text-xs text-[#666] mb-4">{file.description}</p>
              <button
                onClick={() => setUnlocked(true)}
                className="game-btn game-btn-primary text-[11px] px-4 py-1.5"
              >
                Unlock Memory
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="p-4 rounded text-[12px] text-[#D0D0D0] leading-relaxed mb-4"
                style={{
                  background: `${colors[index]}08`,
                  border: `1px solid ${colors[index]}22`,
                }}
              >
                {memories[index]}
              </div>
              <button
                onClick={onClose}
                className="game-btn w-full text-[11px] justify-center"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SecretEvidenceScene = ({ onComplete }) => {
  const [unlockedSet, setUnlockedSet] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allUnlocked, setAllUnlocked] = useState(false);

  const handleClick = (file) => {
    const idx = content.secretEvidence.files.findIndex(f => f.id === file.id);
    setSelectedFile(file);
    setSelectedIndex(idx);
    setUnlockedSet(prev => {
      const next = new Set(prev);
      next.add(file.id);
      if (next.size >= content.secretEvidence.files.length) {
        setTimeout(() => setAllUnlocked(true), 1000);
      }
      return next;
    });
  };

  return (
    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="text-xs text-[#888]">✧ Secret Archive</span>
        </div>
        <div className="top-bar-right">
          <span className="text-[10px] text-[#555]">
            {unlockedSet.size}/{content.secretEvidence.files.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="section-header">
          <span>Classified Files</span>
          <span className="text-[10px] text-[#555]">Tap to access</span>
        </div>
        <div className="px-3 py-2 space-y-2">
          {content.secretEvidence.files.map((file, i) => (
            <SecretFile
              key={file.id}
              file={file}
              index={i}
              onClick={handleClick}
              isUnlocked={unlockedSet.has(file.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFile && (
          <SecretFileModal
            file={selectedFile}
            index={selectedIndex}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </AnimatePresence>

      {/* Continue */}
      <AnimatePresence>
        {allUnlocked && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              onClick={onComplete}
              className="game-btn game-btn-gold text-[11px] px-5 py-2"
            >
              Enter Final Round
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretEvidenceScene;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const evidenceColors = ['#D4A853', '#E74C7A', '#FFA726', '#7C5CBF', '#4CAF50'];
const evidenceIcons = ['📞', '😂', '❤️', '🎮', '💍'];

const EvidenceItem = ({ evidence, index, onClick }) => (
  <motion.div
    className="evidence-item"
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ background: 'rgba(255,255,255,0.03)' }}
    onClick={() => onClick(evidence)}
  >
    <div
      className="evidence-icon"
      style={{ background: `${evidenceColors[index]}22` }}
    >
      {evidenceIcons[index]}
    </div>
    <div className="evidence-info">
      <div className="evidence-title">{evidence.title}</div>
      <div className="evidence-date">{evidence.date}</div>
    </div>
    <span className="text-[10px] text-[#555]">→</span>
  </motion.div>
);

const EvidenceModal = ({ evidence, index, onClose }) => (
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
          <span className="text-base">{evidenceIcons[index]}</span>
          <h3>{evidence.title}</h3>
        </div>
        <div className="modal-close" onClick={onClose}>✕</div>
      </div>
      <div className="modal-body">
        <p className="text-[11px] text-[#666] mb-3">{evidence.date}</p>
        <div
          className="p-4 rounded text-[12px] text-[#D0D0D0] leading-relaxed"
          style={{
            background: `${evidenceColors[index]}08`,
            border: `1px solid ${evidenceColors[index]}22`,
          }}
        >
          "{evidence.description}"
        </div>
        <button
          onClick={onClose}
          className="game-btn w-full mt-4 text-[11px] justify-center"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const DetectiveScene = ({ onComplete }) => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allViewed, setAllViewed] = useState(false);
  const [viewedSet, setViewedSet] = useState(new Set());

  const handleOpen = (evidence) => {
    const idx = content.detective.evidence.findIndex(e => e.id === evidence.id);
    setSelectedEvidence(evidence);
    setSelectedIndex(idx);
  };

  const handleClose = () => {
    setViewedSet(prev => {
      const next = new Set(prev);
      next.add(selectedEvidence.id);
      if (next.size >= content.detective.evidence.length) {
        setTimeout(() => setAllViewed(true), 300);
      }
      return next;
    });
    setSelectedEvidence(null);
  };

  return (
    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="text-xs text-[#888]">Evidence Room</span>
        </div>
        <div className="top-bar-right">
          <span className="text-[10px] text-[#555]">
            {viewedSet.size}/{content.detective.evidence.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="section-header">
          <span>Case Files</span>
          <span className="text-[10px] text-[#555]">Tap to investigate</span>
        </div>

        {content.detective.evidence.map((evidence, i) => (
          <EvidenceItem
            key={evidence.id}
            evidence={evidence}
            index={i}
            onClick={handleOpen}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvidence && (
          <EvidenceModal
            evidence={selectedEvidence}
            index={selectedIndex}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Continue */}
      <AnimatePresence>
        {allViewed && (
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
              Continue Investigation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetectiveScene;
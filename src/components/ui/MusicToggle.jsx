import { motion } from 'framer-motion';

const MusicToggle = ({ isMuted, onToggle }) => {
  return (
    <motion.button
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full glass flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span className="text-sm">
        {isMuted ? '🔇' : '🔊'}
      </span>
    </motion.button>
  );
};

export default MusicToggle;
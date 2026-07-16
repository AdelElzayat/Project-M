import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleField } from '../effects/ParticleField';
import content from '../../config/content';

const PlayerAvatar = ({ player, index }) => (
  <motion.div
    className="flex flex-col items-center gap-2"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
  >
    <motion.div
      className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg font-bold"
      style={{
        background: `linear-gradient(135deg, ${player.color}33, ${player.color}66)`,
        border: `2px solid ${player.color}88`,
        boxShadow: `0 0 20px ${player.color}33`,
      }}
      animate={player.isUser ? { 
        scale: [1, 1.05, 1],
        boxShadow: [`0 0 20px ${player.color}33`, `0 0 30px ${player.color}66`, `0 0 20px ${player.color}33`]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {player.avatar}
      {player.isUser && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-dark-900"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
    <div className="text-center">
      <p className={`text-xs md:text-sm font-medium ${player.isUser ? 'text-gold' : 'text-white/70'}`}>
        {player.name}
      </p>
      <div className="flex items-center gap-1 justify-center mt-0.5">
        {player.isReady ? (
          <motion.span
            className="text-[10px] text-emerald-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● Ready
          </motion.span>
        ) : (
          <span className="text-[10px] text-white/30">○ Waiting</span>
        )}
      </div>
    </div>
  </motion.div>
);

const LobbyScene = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(content.lobby.countdownStart);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    if (frozen) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setFrozen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [frozen]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <ParticleField count={30} color="#8b5cf6" speed={0.5} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="glass border-b border-white/5 px-4 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <h1 className="text-gold text-lg font-bold tracking-[0.1em]">
              {content.lobby.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">{content.lobby.playerCount}</span>
              {!frozen && (
                <motion.div
                  className="px-3 py-1 rounded-full border border-gold/30"
                  animate={{ borderColor: ['rgba(212,168,83,0.3)', 'rgba(212,168,83,0.6)', 'rgba(212,168,83,0.3)'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-gold text-xs font-bold">{countdown}s</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-md mx-auto">
            {content.lobby.players.map((player, i) => (
              <PlayerAvatar key={i} player={player} index={i} />
            ))}
          </div>
        </div>

        {/* Freeze Message */}
        <AnimatePresence>
          {frozen && (
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-center px-8"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              >
                <motion.p
                  className="text-xl md:text-2xl text-gold-light font-light tracking-[0.1em]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1.5 }}
                >
                  {content.lobby.freezeMessage}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  onClick={onComplete}
                  className="mt-10 px-10 py-3 rounded-full border border-gold/40 text-gold 
                             text-sm tracking-[0.2em] uppercase hover:bg-gold/10 
                             transition-all duration-500 hover:border-gold/60
                             hover:shadow-[0_0_30px_rgba(212,168,83,0.2)]"
                >
                  Remember
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom bar */}
        <div className="glass border-t border-white/5 px-4 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <span className="text-xs text-white/30">Room ID: #LOVE-2024</span>
            <motion.div
              className="flex gap-2"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
              ))}
            </motion.div>
            <span className="text-xs text-white/30">Connecting...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScene;
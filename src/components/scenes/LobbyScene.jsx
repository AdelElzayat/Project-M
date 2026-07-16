import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const LobbyPlayerRow = ({ player, index }) => {
  const colors = ['#C74B4B', '#4CAF50', '#7C5CBF', '#FFA726', '#4FC3F7', '#E74C7A', '#26C6DA', '#8D6E63'];
  const avatars = ['A', 'M', 'S', 'T', 'J', 'Y', 'E', 'L'];
  const flags = ['🇺🇸', '🇬🇧', '🇨🇦', '🇺🇸', '🇦🇺', '🇮🇳', '🇩🇪', '🇫🇷'];
  const statuses = ['Online', 'Away', 'Online', 'Online', 'DND', 'Online', 'Online', 'Away'];

  return (
    <motion.div
      className={`player-row ${player.isUser ? 'bg-[#7C5CBF]/10' : ''}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="player-avatar" style={{ background: `${colors[index]}33`, color: colors[index] }}>
        {avatars[index]}
        <div className={`player-online ${index === 4 ? 'ingame' : ''}`} />
      </div>
      <div className="player-info">
        <div className="player-name-row">
          <span className="player-name" style={{ color: player.isUser ? '#9B7FD4' : undefined }}>
            {player.name}
          </span>
          <span className="player-flag">{flags[index]}</span>
          {player.isUser && <span className="player-badge">YOU</span>}
        </div>
        <div className="player-status">
          <span className={`${statuses[index] === 'Online' ? 'dot-online' : statuses[index] === 'Away' ? 'dot-away' : 'dot-dnd'}`}>●</span>
          {statuses[index]}
          {player.isReady ? (
            <span className="text-[#4CAF50] ml-2">✓ Ready</span>
          ) : (
            <span className="text-[#555] ml-2">○ Waiting</span>
          )}
        </div>
      </div>
      <div className="player-action">
        {!player.isUser && (
          <button className="game-btn game-btn-small text-[10px]">
            Invite
          </button>
        )}
        {player.isUser && (
          <div className="ready-check ready flex items-center justify-center">
            ✓
          </div>
        )}
      </div>
    </motion.div>
  );
};

const LobbyScene = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(content.lobby.countdownStart);
  const [frozen, setFrozen] = useState(false);
  const [tab, setTab] = useState('lobby');

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
    <div className="absolute inset-0 bg-[#2C2C2C] flex flex-col">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="text-[#888] text-sm">‹</span>
          <span className="text-xs text-[#888]">Room #LOVE</span>
        </div>
        <div className="top-bar-center">
          <div className="conn-indicator" />
          <span className="text-xs text-[#888]">{content.lobby.playerCount}</span>
          {!frozen && (
            <div className="countdown-ring">
              {countdown}
            </div>
          )}
        </div>
        <div className="top-bar-right">
          <button className="game-btn game-btn-small text-[10px] px-2 py-1">⚙</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Section: Players */}
        <div className="section-header">
          <span>Players ({content.lobby.players.length}/8)</span>
          <span className="text-[10px] text-[#555]">ID: MM-4242</span>
        </div>
        <div>
          {content.lobby.players.map((player, i) => (
            <LobbyPlayerRow key={i} player={player} index={i} />
          ))}
        </div>

        <div className="game-divider mx-3" />

        {/* Room info */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between text-[10px] text-[#666]">
            <span>Spectators: 0</span>
            <span>Ping: 42ms</span>
            <span>Region: US East</span>
          </div>
        </div>

        {/* Game settings preview */}
        <div className="px-3 py-2 bg-[rgba(255,255,255,0.02)] mx-3 rounded mb-2">
          <div className="flex items-center justify-between text-[11px] text-[#666]">
            <span>Mode: Classic</span>
            <span>Night: 30s</span>
            <span>Day: 60s</span>
          </div>
        </div>
      </div>

      {/* Bottom area - either countdown or frozen message */}
      <div className="px-3 py-2 border-t border-[#4A4A4A] bg-[#2C2C2C]">
        {!frozen ? (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666]">Waiting for players...</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#666]">{countdown}s</span>
              <button className="game-btn game-btn-small game-btn-primary text-[10px]">
                Ready ✓
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-[#888] mb-3">{content.lobby.freezeMessage}</p>
            <button
              onClick={onComplete}
              className="game-btn game-btn-gold text-[11px] px-4 py-1.5"
            >
              Remember
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <button className={`nav-tab ${tab === 'lobby' ? 'active' : ''}`} onClick={() => setTab('lobby')}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 10h6v8H2zM12 2h6v16h-6zM2 2h6v4H2zM12 12h6v6h-6z" />
          </svg>
          <span>Lobby</span>
        </button>
        <button className={`nav-tab ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 10a9 9 0 1118 0 9 9 0 01-9 9H1l3-3a9 9 0 01-3-6z" />
          </svg>
          <span>Chat</span>
        </button>
        <button className={`nav-tab ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="8" r="4" />
            <path d="M3 18c0-4 3-7 7-7s7 3 7 7" />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default LobbyScene;
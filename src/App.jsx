import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSoundManager } from './hooks/useSoundManager';
import MusicToggle from './components/ui/MusicToggle';
import { CursorParticles, TouchRipple } from './components/effects/ParticleField';

// Lazy load scenes for performance
import OpeningScene from './components/scenes/OpeningScene';
import RoleCardScene from './components/scenes/RoleCardScene';
import LobbyScene from './components/scenes/LobbyScene';
import ChatScene from './components/scenes/ChatScene';
import VotingScene from './components/scenes/VotingScene';
import DetectiveScene from './components/scenes/DetectiveScene';
import SecretEvidenceScene from './components/scenes/SecretEvidenceScene';
import FinalRoundScene from './components/scenes/FinalRoundScene';
import EndingScene from './components/scenes/EndingScene';

const SceneWrapper = ({ children, sceneKey }) => (
  <motion.div
    key={sceneKey}
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const scenes = [
  'opening',
  'roleCard',
  'lobby',
  'chat',
  'voting',
  'detective',
  'secretEvidence',
  'finalRound',
  'ending',
];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const { play, stopAll, toggleMute, isMuted, init } = useSoundManager();
  const [isDesktop] = useState(() => window.innerWidth > 768);

  const goToNextScene = useCallback(() => {
    play('click');
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
      // Play scene-specific sounds
      if (currentScene + 1 === 2) play('wind'); // lobby
      if (currentScene + 1 === 5) play('piano'); // detective
      if (currentScene + 1 === 8) play('ending'); // ending
    }
  }, [currentScene, play]);

  const handleRestart = useCallback(() => {
    stopAll();
    setCurrentScene(0);
    setTimeout(() => init(), 100);
  }, [stopAll, init]);

  // Initialize audio on first interaction
  useEffect(() => {
    const handleInteraction = () => init();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [init]);

  // Keyboard navigation easter egg: Konami Code
  useEffect(() => {
    const konami = '38384040373937396665';
    let input = '';
    
    const handleKey = (e) => {
      input += e.keyCode;
      if (input.includes(konami)) {
        play('sparkle');
        setCurrentScene(prev => Math.min(prev + 2, scenes.length - 1));
        input = '';
      }
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [play]);

  const renderScene = () => {
    const scene = scenes[currentScene];
    
    switch (scene) {
      case 'opening':
        return <OpeningScene onComplete={goToNextScene} />;
      case 'roleCard':
        return <RoleCardScene onComplete={goToNextScene} />;
      case 'lobby':
        return <LobbyScene onComplete={goToNextScene} />;
      case 'chat':
        return <ChatScene onComplete={goToNextScene} />;
      case 'voting':
        return <VotingScene onComplete={goToNextScene} />;
      case 'detective':
        return <DetectiveScene onComplete={goToNextScene} />;
      case 'secretEvidence':
        return <SecretEvidenceScene onComplete={goToNextScene} />;
      case 'finalRound':
        return <FinalRoundScene onComplete={goToNextScene} />;
      case 'ending':
        return <EndingScene onRestart={handleRestart} />;
      default:
        return <OpeningScene onComplete={goToNextScene} />;
    }
  };

  return (
    <div className="w-full h-full bg-dark-900 overflow-hidden">
      {/* Global effects */}
      {isDesktop && <CursorParticles />}
      <TouchRipple />
      <MusicToggle isMuted={isMuted} onToggle={toggleMute} />

      {/* Scene progress indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {scenes.slice(0, -1).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i === currentScene ? 'bg-gold w-4' : 'bg-white/10'
            }`}
            animate={i === currentScene ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Scene container */}
      <AnimatePresence mode="wait">
        <SceneWrapper key={scenes[currentScene]}>
          {renderScene()}
        </SceneWrapper>
      </AnimatePresence>
    </div>
  );
}

export default App;
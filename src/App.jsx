import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSoundManager } from './hooks/useSoundManager';
import MusicToggle from './components/ui/MusicToggle';
import { TouchRipple } from './components/effects/ParticleField';

import OpeningScene from './components/scenes/OpeningScene';
import RoleCardScene from './components/scenes/RoleCardScene';
import LobbyScene from './components/scenes/LobbyScene';
import ChatScene from './components/scenes/ChatScene';
import VotingScene from './components/scenes/VotingScene';
import DetectiveScene from './components/scenes/DetectiveScene';
import SecretEvidenceScene from './components/scenes/SecretEvidenceScene';
import FinalRoundScene from './components/scenes/FinalRoundScene';
import EndingScene from './components/scenes/EndingScene';

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

  const goToNextScene = useCallback(() => {
    play('click');
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
      if (currentScene + 1 === 2) play('wind');
      if (currentScene + 1 === 8) play('ending');
    }
  }, [currentScene, play]);

  const handleRestart = useCallback(() => {
    stopAll();
    setCurrentScene(0);
    setTimeout(() => init(), 100);
  }, [stopAll, init]);

  useEffect(() => {
    const handleInteraction = () => init();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [init]);

  // Konami Code
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
    switch (scenes[currentScene]) {
      case 'opening': return <OpeningScene onComplete={goToNextScene} />;
      case 'roleCard': return <RoleCardScene onComplete={goToNextScene} />;
      case 'lobby': return <LobbyScene onComplete={goToNextScene} />;
      case 'chat': return <ChatScene onComplete={goToNextScene} />;
      case 'voting': return <VotingScene onComplete={goToNextScene} />;
      case 'detective': return <DetectiveScene onComplete={goToNextScene} />;
      case 'secretEvidence': return <SecretEvidenceScene onComplete={goToNextScene} />;
      case 'finalRound': return <FinalRoundScene onComplete={goToNextScene} />;
      case 'ending': return <EndingScene onRestart={handleRestart} />;
      default: return <OpeningScene onComplete={goToNextScene} />;
    }
  };

  return (
    <div className="w-full h-full bg-[#1A1A1A]">
      <div className="phone-frame">
        <TouchRipple />
        <MusicToggle isMuted={isMuted} onToggle={toggleMute} />

        <AnimatePresence mode="wait">
          <motion.div
            key={scenes[currentScene]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
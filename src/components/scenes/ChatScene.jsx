import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../effects/ParticleField';
import content from '../../config/content';

const MessageBubble = ({ message, index, isVisible }) => {
  const isSystem = message.type === 'system';
  const isUser = message.sender === 'You';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div
            className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
              isSystem
                ? 'bg-white/5 text-white/40 text-xs italic text-center w-full max-w-full'
                : isUser
                ? 'bg-mystery/40 border border-mystery/30 text-white'
                : 'glass text-white/90'
            }`}
          >
            {!isSystem && (
              <p className={`text-xs font-bold mb-1 ${
                isUser ? 'text-mystery-light' : 'text-gold'
              }`}>
                {message.sender}
              </p>
            )}
            <p className={`${isSystem ? 'text-center' : 'text-sm leading-relaxed'}`}>
              {message.text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TypingIndicator = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="flex justify-start mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="glass px-4 py-3 rounded-2xl">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gold/50"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ChatScene = ({ onComplete }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [allVisible, setAllVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const messages = content.chat.messages;

    const showNext = () => {
      if (currentIndex >= messages.length) {
        setTimeout(() => setAllVisible(true), 1000);
        return;
      }

      const msg = messages[currentIndex];
      setTyping(true);

      setTimeout(() => {
        setTyping(false);
        setVisibleMessages(prev => [...prev, currentIndex]);
        currentIndex++;
        
        setTimeout(showNext, msg.delay || 2000);
      }, msg.sender === 'System' ? 500 : 1200);
    };

    setTimeout(showNext, 1000);

    return () => {};
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, typing]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <StarField count={40} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Chat Header */}
        <div className="glass border-b border-white/5 px-4 py-3">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <motion.div
              className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-gold text-xs">💬</span>
            </motion.div>
            <div>
              <h2 className="text-gold text-sm font-bold">{content.chat.title}</h2>
              <p className="text-[10px] text-white/30">8 players online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-2xl mx-auto">
            {content.chat.messages.map((msg, i) => (
              <MessageBubble
                key={i}
                message={msg}
                index={i}
                isVisible={visibleMessages.includes(i)}
              />
            ))}
            <TypingIndicator visible={typing} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="glass border-t border-white/5 px-4 py-3">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10">
              <p className="text-xs text-white/20">{content.chat.typingPlaceholder}</p>
            </div>
            <motion.div
              className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-gold text-sm">➤</span>
            </motion.div>
          </div>
        </div>

        {/* Continue button */}
        <AnimatePresence>
          {allVisible && (
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20"
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
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatScene;
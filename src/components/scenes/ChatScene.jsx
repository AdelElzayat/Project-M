import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../config/content';

const colors = ['#C74B4B', '#4CAF50', '#7C5CBF', '#FFA726', '#4FC3F7', '#E74C7A', '#26C6DA', '#8D6E63'];

const ChatMessage = ({ msg, index, isVisible }) => {
  const color = colors[index % colors.length];
  const isSystem = msg.type === 'system';
  const isYou = msg.sender === 'You';

  if (isSystem) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="chat-system"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="chat-message"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="chat-avatar" style={{ background: `${color}33`, color }}>
            {msg.sender[0]}
          </div>
          <div className="chat-content">
            <div className="chat-header">
              <span className="chat-username" style={{ color: isYou ? '#9B7FD4' : color }}>
                {msg.sender}
              </span>
              <span className="chat-timestamp">now</span>
            </div>
            <p className="chat-text">{msg.text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ChatScene = ({ onComplete }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [allVisible, setAllVisible] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const messages = content.chat.messages;

    const showNext = () => {
      if (currentIndex >= messages.length) {
        setTimeout(() => setAllVisible(true), 800);
        return;
      }
      const msg = messages[currentIndex];
      setTyping(true);
      setTypingUser(msg.sender !== 'System' ? msg.sender : '');

      setTimeout(() => {
        setTyping(false);
        setTypingUser('');
        setVisibleMessages(prev => [...prev, currentIndex]);
        currentIndex++;
        setTimeout(showNext, msg.delay || 1500);
      }, msg.sender === 'System' ? 400 : 900);
    };

    setTimeout(showNext, 800);
    return () => {};
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, typing]);

  return (
    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="w-6 h-6 rounded-full bg-[#7C5CBF] flex items-center justify-center text-white text-[10px] font-bold">#</div>
          <span className="text-xs text-[#888]">Game Chat</span>
        </div>
        <div className="top-bar-right">
          <span className="text-[10px] text-[#555]">8 online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-1">
        <div className="section-header">
          <span>Day 1</span>
          <span className="text-[10px] text-[#555]">Today</span>
        </div>

        {content.chat.messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg} index={i} isVisible={visibleMessages.includes(i)} />
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              className="chat-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="chat-avatar" style={{ background: `${colors[visibleMessages.length % colors.length]}33`, color: colors[visibleMessages.length % colors.length] }}>
                {typingUser[0]}
              </div>
              <div className="chat-content">
                <div className="chat-header">
                  <span className="chat-username" style={{ color: colors[visibleMessages.length % colors.length] }}>{typingUser}</span>
                </div>
                <div className="flex gap-1 py-1">
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#555]"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="px-3 py-2 border-t border-[#4A4A4A] bg-[#2C2C2C]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="game-input text-[11px] flex-1"
            placeholder={content.chat.typingPlaceholder}
            disabled
          />
          <button className="game-btn game-btn-small text-[10px] px-2 py-1.5" disabled>
            Send
          </button>
        </div>
      </div>

      {/* Continue overlay */}
      <AnimatePresence>
        {allVisible && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              onClick={onComplete}
              className="game-btn game-btn-gold text-[11px] px-5 py-2"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatScene;
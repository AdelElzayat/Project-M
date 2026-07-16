const content = {
  // ===== OPENING SCENE =====
  opening: {
    loadingText: 'Loading...',
    welcomeText: 'Welcome Back',
    detectiveText: '...Detective.',
    continueText: 'Continue',
    subtitle: 'A new mystery awaits...',
  },

  // ===== ROLE ASSIGNMENT =====
  roleCard: {
    frontTitle: 'Unknown Role',
    frontSubtitle: 'Tap to Reveal',
    backTitle: '❤️ SOULMATE ❤️',
    roles: ['Not Mafia.', 'Not Detective.', 'Not Doctor.'],
    special: 'Soulmate.',
    description: 'You\'ve been assigned the rarest role.',
    mission: 'One mission remains.',
    missionDetail: 'Find the person who stole your heart.',
    continueText: 'Continue',
  },

  // ===== LEVEL 1: LOBBY =====
  lobby: {
    title: 'Game Lobby',
    playerCount: '8 Players',
    players: [
      { name: 'Alex', avatar: 'A', color: '#e74c7a', isUser: false, isReady: true },
      { name: 'Marcus', avatar: 'M', color: '#3498db', isUser: false, isReady: true },
      { name: 'Sarah', avatar: 'S', color: '#2ecc71', isUser: false, isReady: false },
      { name: 'Tanisha ❤️', avatar: 'T', color: '#f1c40f', isUser: true, isReady: true },
      { name: 'James', avatar: 'J', color: '#9b59b6', isUser: false, isReady: true },
      { name: 'You', avatar: 'Y', color: '#1abc9c', isUser: false, isReady: false },
      { name: 'Emma', avatar: 'E', color: '#e67e22', isUser: false, isReady: true },
      { name: 'Lucas', avatar: 'L', color: '#34495e', isUser: false, isReady: true },
    ],
    countdownStart: 10,
    freezeMessage: 'Do you remember where everything began?',
  },

  // ===== LEVEL 2: CHAT =====
  chat: {
    title: 'Game Chat',
    messages: [
      { sender: 'System', text: 'Day 1 has begun.', type: 'system' },
      { sender: 'Marcus', text: 'Anyone got info?', type: 'player', delay: 1500 },
      { sender: 'Sarah', text: 'I think I saw something last night...', type: 'player', delay: 3000 },
      { sender: 'Alex', text: 'Don\'t trust anyone too quickly.', type: 'player', delay: 4500 },
      { sender: 'James', text: 'Who should we vote for?', type: 'player', delay: 6000 },
      { sender: 'Tanisha', text: 'Hey... I\'m new here. What do I do?', type: 'player', delay: 7500 },
      { sender: 'You', text: 'Just stay close to me. I\'ll protect you.', type: 'player', delay: 9000 },
      { sender: 'System', text: 'A connection has been made...', type: 'system', delay: 10500 },
      { sender: 'Tanisha', text: 'I feel safe with you already. ❤️', type: 'player', delay: 12000 },
    ],
    typingPlaceholder: 'Type a message...',
  },

  // ===== LEVEL 3: VOTING =====
  voting: {
    title: 'Voting Phase',
    question: 'Who stole Adel\'s heart?',
    options: [
      { name: 'Random Player', emoji: '🤷', isCorrect: false },
      { name: 'Another Player', emoji: '🧑', isCorrect: false },
      { name: 'Someone Else', emoji: '👤', isCorrect: false },
      { name: 'Tanisha ❤️', emoji: '👸', isCorrect: true },
    ],
    correctMessage: 'Correct.',
    correctSubtitle: 'You\'ve always been the answer.',
  },

  // ===== LEVEL 4: DETECTIVE =====
  detective: {
    title: 'Evidence Files',
    subtitle: 'Tap to investigate',
    evidence: [
      {
        id: 1,
        title: 'First Call',
        date: 'The beginning of us',
        icon: '📞',
        description: 'The first time I heard your voice, I knew something had changed. The world felt different. Brighter. Warmer.',
        color: '#d4a853',
      },
      {
        id: 2,
        title: 'First Laugh',
        date: 'The moment I fell',
        icon: '😂',
        description: 'Your laugh. That beautiful sound that could light up the darkest room. I wanted to hear it forever.',
        color: '#e74c7a',
      },
      {
        id: 3,
        title: 'First "I Love You"',
        date: 'The words that changed everything',
        icon: '❤️',
        description: 'Three words. But they meant the universe. Every beat of my heart belonged to you from that moment.',
        color: '#f1c40f',
      },
      {
        id: 4,
        title: 'Our Favorite Game',
        date: 'Where we belonged',
        icon: '🎮',
        description: 'Side by side. Playing together. Laughing together. Winning together. That\'s where I wanted to be forever.',
        color: '#8b5cf6',
      },
      {
        id: 5,
        title: 'Our Anniversary',
        date: 'A year of magic',
        icon: '💍',
        description: 'Every day with you is a gift. Every moment, a treasure. A year? A lifetime? It will never be enough.',
        color: '#10b981',
      },
    ],
  },

  // ===== LEVEL 5: SECRET EVIDENCE =====
  secretEvidence: {
    title: 'Secret Evidence Room',
    subtitle: 'Every memory is here...',
    files: [
      { id: 1, name: 'Pictures', icon: '📸', emoji: '🖼️', description: 'Every smile. Every glance. Every moment frozen in time.' },
      { id: 2, name: 'Memories', icon: '🎬', emoji: '🎞️', description: 'Like a movie playing in my mind. Over and over.' },
      { id: 3, name: 'Letters', icon: '✉️', emoji: '💌', description: 'Words I wrote when my heart was too full to speak.' },
      { id: 4, name: 'Dreams', icon: '🌙', emoji: '⭐', description: 'Every dream I\'ve ever had, you were there.' },
      { id: 5, name: 'Forever', icon: '♾️', emoji: '💫', description: 'What I want to give you. Every single day.' },
    ],
  },

  // ===== FINAL ROUND =====
  finalRound: {
    frontTitle: 'MISSION COMPLETE',
    backTitle: 'You solved the mystery.',
    backSubtitle: 'No... The mystery solved you.',
    finalLine: 'The day I met you.',
  },

  // ===== ENDING =====
  ending: {
    line1: 'Every game eventually ends.',
    line2: "I'm just grateful...",
    line3: '...ours never did.',
    heartEmoji: '❤️',
    anniversary: 'Happy Anniversary',
    message: 'Thank you for choosing me.',
    message2: 'Every.',
    message3: 'Single.',
    message4: 'Day.',
    message5: "I'd choose you...",
    message6: 'again...',
    message7: 'and again...',
    message8: 'and again...',
    message9: 'Forever.',
  },

  // ===== EASTER EGGS =====
  easterEggs: {
    moonMessage: 'The moon hides many secrets...',
    heartGallery: 'Our Memories',
    konamiMessage: 'You found a secret! 🎮',
    passwordHint: 'The answer is always love.',
    secretPassword: 'love',
    loveLetter: 'I could search a thousand universes and never find a love like ours. You are my beginning and my end. Every breath, every heartbeat, every star in the sky - they all whisper your name. You are my forever.',
  },

  // ===== NAMES (for replacement) =====
  names: {
    detective: 'Adel',
    soulmate: 'Tanisha',
    nicknameDetective: 'Detective',
    nicknameSoulmate: 'My Love',
  },
};

export default content;
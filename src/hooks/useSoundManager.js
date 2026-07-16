import { useState, useCallback, useRef } from 'react';

// Sound effects using Web Audio API
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.musicSource = null;
    this.currentMusic = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
      
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.3;
      this.musicGain.connect(this.masterGain);
      
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.6;
      this.sfxGain.connect(this.masterGain);
      
      this.initialized = true;
    } catch (e) {
      console.warn('Audio not available');
    }
  }

  playNote(freq, duration, type = 'sine', gainNode = null) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    env.gain.setValueAtTime(0, this.ctx.currentTime);
    env.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(env);
    env.connect(gainNode || this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  click() {
    this.playNote(800, 0.1, 'sine');
  }

  cardFlip() {
    if (!this.ctx) return;
    this.playNote(400, 0.15, 'triangle');
    setTimeout(() => this.playNote(600, 0.2, 'sine'), 100);
  }

  success() {
    if (!this.ctx) return;
    this.playNote(523, 0.2, 'sine');
    setTimeout(() => this.playNote(659, 0.2, 'sine'), 150);
    setTimeout(() => this.playNote(784, 0.4, 'sine'), 300);
  }

  vote() {
    this.playNote(300, 0.15, 'sawtooth');
  }

  heartbeat() {
    if (!this.ctx) return;
    this.playNote(80, 0.3, 'sine', this.musicGain);
    setTimeout(() => this.playNote(80, 0.3, 'sine'), 400);
  }

  type() {
    this.playNote(1000, 0.03, 'sine');
  }

  sparkle() {
    if (!this.ctx) return;
    this.playNote(1200, 0.1, 'sine');
    setTimeout(() => this.playNote(1600, 0.15, 'sine'), 80);
  }

  wind() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(Math.random(), 3);
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.05;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    source.loop = true;
    source.start();
    return source;
  }

  playPianoChord() {
    if (!this.ctx) return;
    const notes = [262, 330, 392, 523];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playNote(freq, 2, 'sine', this.musicGain), i * 200);
    });
  }

  playEndingMusic() {
    if (!this.ctx) return;
    const melody = [
      [262, 0.8], [294, 0.8], [330, 0.8], [349, 1.2],
      [330, 0.8], [294, 0.8], [262, 1.5],
      [349, 0.8], [392, 0.8], [440, 0.8], [523, 1.2],
      [440, 0.8], [392, 0.8], [349, 1.5],
      [262, 0.8], [294, 0.8], [330, 0.8], [349, 1.2],
      [330, 0.8], [294, 0.8], [262, 1.5],
      [392, 0.8], [349, 0.8], [330, 0.8], [294, 0.8],
      [262, 2],
    ];
    let time = 0;
    melody.forEach(([freq, dur]) => {
      setTimeout(() => this.playNote(freq, dur, 'sine', this.musicGain), time * 1000);
      time += dur;
    });
  }

  stopMusic() {
    if (this.musicSource) {
      try { this.musicSource.stop(); } catch(e) {}
      this.musicSource = null;
    }
  }
}

const soundEngine = new SoundEngine();

export function useSoundManager() {
  const [isMuted, setIsMuted] = useState(false);
  const initializedRef = useRef(false);

  const init = useCallback(() => {
    if (!initializedRef.current) {
      soundEngine.init();
      initializedRef.current = true;
    }
  }, []);

  const play = useCallback((soundName) => {
    if (isMuted) return;
    init();
    switch(soundName) {
      case 'click': soundEngine.click(); break;
      case 'cardFlip': soundEngine.cardFlip(); break;
      case 'success': soundEngine.success(); break;
      case 'vote': soundEngine.vote(); break;
      case 'heartbeat': soundEngine.heartbeat(); break;
      case 'type': soundEngine.type(); break;
      case 'sparkle': soundEngine.sparkle(); break;
      case 'wind': return soundEngine.wind();
      case 'piano': soundEngine.playPianoChord(); break;
      case 'ending': soundEngine.playEndingMusic(); break;
      default: break;
    }
  }, [isMuted, init]);

  const stopAll = useCallback(() => {
    soundEngine.stopMusic();
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(m => !m);
  }, []);

  return { play, stopAll, toggleMute, isMuted, init };
}

export default useSoundManager;
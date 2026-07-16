import { useMemo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const ParticleField = ({ count = 50, color = '#d4a853', speed = 1, className = '' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 10 / speed,
      delay: Math.random() * 10,
      driftX: (Math.random() - 0.5) * 20,
      driftY: -Math.random() * 30 - 10,
    }));
  }, [count, speed]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX / 2, 0],
            opacity: [p.opacity, p.opacity * 0.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const StarField = ({ count = 100 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            boxShadow: s.size > 1.5 ? `0 0 ${s.size * 3}px rgba(255,255,255,0.3)` : 'none',
          }}
          animate={{
            opacity: [s.opacity, s.opacity * 0.3, s.opacity],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const FogParticles = () => {
  const fogLayers = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 50 + (i - 1) * 30,
      width: Math.random() * 30 + 40,
      height: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 30,
      delay: i * 5,
      opacity: 0.03 + i * 0.02,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {fogLayers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            width: `${f.width}%`,
            height: `${f.height}%`,
            background: 'radial-gradient(ellipse, rgba(212,168,83,0.15), transparent)',
            left: `${f.x}%`,
            top: `${f.y}%`,
            opacity: f.opacity,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 20, -10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const FloatingHearts = ({ count = 8, className = '' }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.x}%`,
            top: '100%',
            fontSize: h.size,
            opacity: h.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2 - 200],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, Math.random() * 360],
            opacity: [h.opacity, h.opacity * 0.5, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const Fireflies = ({ count = 6 }) => {
  const fireflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      color: ['#f0d68a', '#e74c7a', '#8b5cf6', '#10b981'][i % 4],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            width: f.size,
            height: f.size,
            left: `${f.x}%`,
            top: `${f.y}%`,
            background: f.color,
            boxShadow: `0 0 ${f.size * 4}px ${f.color}`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200, 0],
            y: [0, (Math.random() - 0.5) * 200, 0],
            opacity: [1, 0.2, 1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const CursorParticles = () => {
  const particles = useRef([]);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${['#d4a853', '#f0d68a', '#e74c7a', '#8b5cf6'][Math.floor(Math.random() * 4)]};
      pointer-events: none;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      box-shadow: 0 0 ${size * 2}px currentColor;
      transition: all 0.6s ease-out;
      opacity: 0.8;
    `;
    containerRef.current.appendChild(particle);
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`;
      particle.style.opacity = '0';
    });
    setTimeout(() => particle?.remove(), 600);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      onMouseMove={(e) => {
        if (Math.random() > 0.5) handleMouseMove(e);
      }}
    />
  );
};

const TouchRipple = () => {
  const containerRef = useRef(null);

  const handleTouch = useCallback((e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const ripple = document.createElement('div');
    const size = Math.random() * 50 + 30;
    ripple.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 1px solid rgba(212, 168, 83, 0.3);
      left: ${touch.clientX - size / 2}px;
      top: ${touch.clientY - size / 2}px;
      pointer-events: none;
      transform: scale(0);
      transition: all 0.6s ease-out;
    `;
    containerRef.current.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(3)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple?.remove(), 600);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      onTouchStart={handleTouch}
    />
  );
};

const Confetti = ({ active = false }) => {
  const pieces = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#d4a853', '#f0d68a', '#e74c7a', '#8b5cf6', '#10b981', '#f1c40f'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 1.5,
      size: Math.random() * 8 + 4,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: '2px',
            left: `${p.x}%`,
            top: -20,
          }}
          initial={{ y: -20, rotate: p.rotation }}
          animate={{
            y: window.innerHeight + 50,
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

const Constellations = () => {
  const stars = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 30; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      });
    }
    return positions;
  }, []);

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dist = Math.sqrt(
          (stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2
        );
        if (dist < 15 && Math.random() > 0.85) {
          result.push({ from: stars[i], to: stars[j] });
        }
      }
    }
    return result;
  }, [stars]);

  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none">
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={`${line.from.x}%`}
          y1={`${line.from.y}%`}
          x2={`${line.to.x}%`}
          y2={`${line.to.y}%`}
          stroke="rgba(212,168,83,0.08)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {stars.map((star, i) => (
        <motion.circle
          key={i}
          cx={`${star.x}%`}
          cy={`${star.y}%`}
          r={star.size}
          fill="white"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
};

export {
  ParticleField,
  StarField,
  FogParticles,
  FloatingHearts,
  Fireflies,
  CursorParticles,
  TouchRipple,
  Confetti,
  Constellations,
};
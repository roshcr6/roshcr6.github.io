import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Confetti component
interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

export const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const colors = ['#FF4D4D', '#FF8C00', '#FFD700', '#4DFFFF', '#FF4DFF', '#4DFF4D'];

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          size: Math.random() * 10 + 5,
        });
      }
      setPieces(newPieces);
      
      // Clear confetti after animation
      setTimeout(() => setPieces([]), 3000);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="confetti-container">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="confetti-piece"
              initial={{ 
                x: `${piece.x}vw`, 
                y: '-10vh', 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: '110vh', 
                rotate: piece.rotation * 2,
                opacity: 0 
              }}
              transition={{ 
                duration: 2 + Math.random(), 
                delay: piece.delay,
                ease: 'easeOut'
              }}
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

// Ripple Button component
interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const RippleButton = ({ children, onClick, className = '', disabled = false }: RippleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={`btn-ripple relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
    </button>
  );
};

// Live Clock component
interface LiveClockProps {
  timezone?: string;
  className?: string;
}

export const LiveClock = ({ timezone = 'Asia/Kolkata', className = '' }: LiveClockProps) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const location = timezone.split('/')[1]?.replace('_', ' ') || timezone;

  return (
    <div className={`live-clock ${className}`}>
      <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
        {location}
      </div>
      <div className="text-white text-lg">
        {formattedTime}
      </div>
    </div>
  );
};

// Noise Texture Overlay
export const NoiseTexture = () => (
  <div className="noise-texture" aria-hidden="true" />
);

// Morphing Blob Background
interface MorphingBlobProps {
  color?: string;
  size?: number;
  className?: string;
}

export const MorphingBlob = ({ 
  color = 'rgba(255, 77, 77, 0.15)', 
  size = 400,
  className = '' 
}: MorphingBlobProps) => (
  <motion.div
    className={`morphing-blob absolute pointer-events-none ${className}`}
    animate={{
      scale: [1, 1.1, 0.95, 1.05, 1],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(60px)',
    }}
  />
);

// Skeleton Loader
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton = ({ 
  width = '100%', 
  height = 20, 
  className = '',
  rounded = 'md'
}: SkeletonProps) => {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`skeleton ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  );
};

// Animated Counter
interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedNumber = ({ 
  value, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '' 
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOutExpo = 1 - Math.pow(2, -10 * percentage);
      countRef.current = Math.floor(value * easeOutExpo);
      setCount(countRef.current);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Floating Label Input
interface FloatingLabelInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export const FloatingLabelInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 4,
  className = '',
}: FloatingLabelInputProps) => {
  const inputId = `floating-${name}`;

  return (
    <div className={`floating-label-group ${className}`}>
      {multiline ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          required={required}
          rows={rows}
          className="w-full min-h-[120px] resize-none"
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          required={required}
        />
      )}
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

// Success Checkmark Animation
export const SuccessCheckmark = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 10 }}
        >
          <motion.svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Kinetic Text (animated on hover)
interface KineticTextProps {
  text: string;
  className?: string;
}

export const KineticText = ({ text, className = '' }: KineticTextProps) => (
  <span className={`kinetic-text ${className}`}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="char inline-block"
        whileHover={{ y: -10, color: '#FF4D4D' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

// Scroll Indicator
export const ScrollIndicator = () => (
  <motion.div
    className="scroll-indicator flex flex-col items-center gap-2 text-white/40"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
      Scroll
    </span>
    <motion.div
      className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1"
    >
      <motion.div
        className="w-1 h-2 bg-[#FF4D4D] rounded-full"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  </motion.div>
);

// Reveal on Scroll wrapper
interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const RevealOnScroll = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: RevealOnScrollProps) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

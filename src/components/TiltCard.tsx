import { useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
}

const TiltCard = ({ 
  children, 
  className = '', 
  tiltAmount = 15, 
  glareEnabled = true,
  scale = 1.02
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;
    
    cardRef.current.style.setProperty('--tilt-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${rotateY}deg`);
    
    // Update glare position
    if (glareRef.current && glareEnabled) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  }, [tiltAmount, glareEnabled]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--tilt-x', '0deg');
    cardRef.current.style.setProperty('--tilt-y', '0deg');
    
    if (glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        className="tilt-card-inner"
        style={{
          transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
        
        {/* Glare effect overlay */}
        {glareEnabled && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
            style={{ 
              borderRadius: 'inherit',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TiltCard;

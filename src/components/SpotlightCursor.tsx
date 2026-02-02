import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCursorProps {
  enabled?: boolean;
}

const SpotlightCursor = ({ enabled = true }: SpotlightCursorProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.1,
        y: prev.y + (targetPos.current.y - prev.y) * 0.1,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    // Update CSS custom properties
    const updateCSSVariables = () => {
      document.documentElement.style.setProperty('--mouse-x', `${mousePos.x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mousePos.y}px`);
    };
    updateCSSVariables();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, handleMouseMove, mousePos]);

  useEffect(() => {
    document.documentElement.style.setProperty('--mouse-x', `${mousePos.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mousePos.y}px`);
  }, [mousePos]);

  if (!enabled) return null;

  return (
    <>
      {/* Spotlight gradient overlay */}
      <div 
        className="spotlight-overlay"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0, 0, 0, 0.02) 40%, rgba(0, 0, 0, 0.06) 100%)`,
        }}
      />
      
      {/* Spotlight glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[9989]"
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(255,77,77,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
};

export default SpotlightCursor;

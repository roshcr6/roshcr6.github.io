import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: string[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

const FullScreenMenu = ({ isOpen, onClose, sections, activeSection, onNavigate }: FullScreenMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Animate menu items with stagger
      gsap.fromTo(
        itemsRef.current,
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      );
    }
  }, [isOpen]);

  const handleNavigate = (index: number) => {
    // Animate out
    gsap.to(itemsRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        onNavigate(index);
        onClose();
      },
    });
  };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fullscreen-menu"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Animated orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle, rgba(255,77,77,0.2) 0%, transparent 70%)',
              left: '50%',
              top: '50%',
              marginLeft: '-300px',
              marginTop: '-300px',
            }}
          />

          {/* Close button */}
          <motion.button
            className="absolute top-8 right-8 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#FF4D4D] hover:text-[#FF4D4D] transition-colors z-10"
            onClick={onClose}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Navigation items */}
          <nav className="relative z-10 flex flex-col items-center gap-4">
            {sections.map((section, index) => (
              <button
                key={section}
                ref={(el) => { itemsRef.current[index] = el; }}
                onClick={() => handleNavigate(index)}
                className={`fullscreen-menu-item ${activeSection === index ? 'text-[#FF4D4D] opacity-100' : ''}`}
                data-index={String(index + 1).padStart(2, '0')}
                style={{ perspective: '1000px' }}
              >
                <span className="relative inline-block">
                  {section}
                  {activeSection === index && (
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-[#FF4D4D] rounded-full"
                      layoutId="activeIndicator"
                      style={{ width: '100%' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom info */}
          <motion.div
            className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                Portfolio 2026
              </p>
              <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                Roshith Robert
              </p>
            </div>
            
            <div className="flex gap-6">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs uppercase tracking-[0.15em] hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;

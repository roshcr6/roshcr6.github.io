import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  sections: string[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

const Navigation = ({ sections, activeSection, onNavigate }: NavigationProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power4.out' }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      {/* Progress indicator */}
      <div className="absolute -left-4 top-0 bottom-0 w-px bg-white/5">
        <motion.div
          className="w-full bg-gradient-to-b from-[#FF4D4D] to-[#FF8C00]"
          style={{ originY: 0 }}
          animate={{ 
            height: `${((activeSection + 1) / sections.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex flex-col gap-5">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => onNavigate(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex items-center gap-4"
            data-magnetic
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Dot indicator with ring effect */}
            <div className="relative">
              <motion.div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeSection === index
                    ? 'bg-[#FF4D4D]'
                    : 'bg-white/20 group-hover:bg-white/40'
                }`}
                animate={{
                  scale: activeSection === index ? 1.3 : hoveredIndex === index ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              
              {/* Active ring */}
              <AnimatePresence>
                {activeSection === index && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-[#FF4D4D]/50"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Pulse effect */}
              {activeSection === index && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[#FF4D4D]"
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Section number */}
            <span
              className={`text-[10px] w-4 transition-colors duration-300 ${
                activeSection === index ? 'text-[#FF4D4D]' : 'text-white/30'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Label with slide animation */}
            <AnimatePresence>
              {(activeSection === index || hoveredIndex === index) && (
                <motion.span
                  className={`text-[10px] tracking-[0.15em] uppercase whitespace-nowrap ${
                    activeSection === index ? 'text-white' : 'text-white/60'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {section}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Connection line */}
            {index < sections.length - 1 && (
              <motion.div
                className="absolute left-[3px] top-6 w-px h-5"
                style={{
                  background: activeSection > index 
                    ? 'linear-gradient(to bottom, rgba(255,77,77,0.5), rgba(255,77,77,0.1))' 
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;

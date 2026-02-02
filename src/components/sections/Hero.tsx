import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const greetings = ['Hello', 'Bonjour', 'Hola', 'नमस्ते', 'Ciao', '你好', 'Olá', 'مرحبا'];

// Floating shapes for visual interest
const FloatingShape = ({ delay, size, top, left, color }: { delay: number; size: number; top: string; left: string; color: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
      filter: 'blur(1px)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Morphing blob component
const MorphingBlob = ({ color, size, position, delay }: { 
  color: string; 
  size: number; 
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}) => (
  <motion.div
    className="absolute morphing-blob pointer-events-none"
    style={{
      width: size,
      height: size,
      ...position,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(80px)',
    }}
    animate={{
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const chars = title.querySelectorAll('.char');
    gsap.set(chars, { y: 0, opacity: 1, rotateX: 0 });
    
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 2.5,
      }
    );
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block hover:text-[#FF4D4D] transition-colors duration-300"
        style={{ perspective: '1000px' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div
      ref={heroRef}
      className="hero-content relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Floating decorative shapes */}
      <FloatingShape delay={0} size={300} top="10%" left="10%" color="#FF4D4D" />
      <FloatingShape delay={1} size={200} top="60%" left="75%" color="#FF8C00" />
      <FloatingShape delay={2} size={150} top="30%" left="85%" color="#FF4D4D" />
      <FloatingShape delay={1.5} size={100} top="70%" left="20%" color="#FF6B6B" />

      {/* Morphing blobs - premium effect */}
      <MorphingBlob color="rgba(255,77,77,0.15)" size={500} position={{ top: '10%', left: '5%' }} delay={0} />
      <MorphingBlob color="rgba(255,140,0,0.12)" size={400} position={{ bottom: '10%', right: '10%' }} delay={5} />
      <MorphingBlob color="rgba(147,51,234,0.08)" size={350} position={{ top: '50%', right: '20%' }} delay={10} />

      {/* Animated gradient blob following mouse */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-40 blur-[150px] pointer-events-none"
        animate={{
          x: mousePos.x * 3,
          y: mousePos.y * 3,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,77,77,0.5) 0%, rgba(255,140,0,0.2) 40%, transparent 70%)',
          left: '50%',
          top: '50%',
          marginLeft: '-400px',
          marginTop: '-400px',
        }}
      />

      {/* Subtle grid pattern with gradient fade */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 70%),
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
        {/* Rotating greeting */}
        <div className="h-16 md:h-20 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={greetingIndex}
              initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -60, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl text-white/80"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic' }}
            >
              {greetings[greetingIndex]}
              <motion.span 
                className="text-[#FF4D4D] inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                .
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small intro with stagger animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-base text-white/40 mb-8 uppercase tracking-[0.25em]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          I'm <span className="text-white/70 relative">
            Roshith Robert
            <motion.span 
              className="absolute -bottom-1 left-0 h-px bg-[#FF4D4D]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </span>, a
        </motion.p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-[15vw] md:text-[12vw] leading-[0.9] tracking-[-0.03em] text-white mb-8"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          <div className="overflow-hidden">
            {splitText('Creative')}
          </div>
          <div className="overflow-hidden flex items-center justify-center gap-4">
            <span 
              className="text-gradient"
              style={{ fontStyle: 'italic' }}
            >
              {splitText('Dev')}
            </span>
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#FF4D4D] text-[5vw]"
              whileHover={{ rotate: 180, scale: 1.2 }}
            >
              ✦
            </motion.span>
            {splitText('eloper')}
          </div>
        </h1>

        {/* Tagline with animated words */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-16 tracking-wide"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.8 }}
        >
          Helping brands stand out in the{' '}
          <span className="text-white/80 relative inline-block group" style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
            digital era
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#FF4D4D] to-[#FF8C00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </span>
          <br />
          through thoughtful design & code
        </motion.p>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#FF4D4D] text-white overflow-hidden hover-glow rounded-full"
            data-magnetic
            data-cursor-text="GO"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D] to-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span 
              className="relative text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Start a Project
            </span>
            <span className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <a
            href="#projects"
            className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
            data-magnetic
          >
            <span 
              className="text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              View Work
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-8 h-px bg-white/20"
            animate={{ scaleX: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span 
            className="text-[10px] text-white/40 uppercase"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
          >
            Scroll to explore
          </span>
          <motion.div 
            className="w-8 h-px bg-white/20"
            animate={{ scaleX: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 bg-[#FF4D4D] rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations with animation */}
      <motion.div 
        className="absolute top-8 left-8 text-[10px] text-white/20 uppercase"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
      >
        <div>Portfolio</div>
        <div className="text-[#FF4D4D]/50">© 2026</div>
      </motion.div>
      
      <motion.div 
        className="absolute top-8 right-8 text-[10px] text-white/20 uppercase text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
      >
        <div>Based in</div>
        <div className="text-[#FF4D4D]/50">Kerala, India</div>
      </motion.div>

      {/* Animated corner brackets */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
      />
    </div>
  );
};

export default Hero;

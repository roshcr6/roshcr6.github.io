import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Outro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,77,77,0.08) 0%, transparent 50%)`,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              top: `${(i + 1) * 6.5}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        ))}
      </div>

      {/* Large background text with animation */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0.01, 0.025, 0.01] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span 
          className="text-[25vw] select-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            WebkitTextStroke: '1px rgba(255,255,255,0.02)',
            color: 'transparent',
          }}
        >
          2026
        </span>
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#FF4D4D]/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Credits with enhanced styling */}
        <motion.div
          className="mb-16 reveal"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p 
            className="text-white/40 text-[10px] uppercase mb-6"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.4em' }}
          >
            Designed & Developed by
          </p>
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl text-white relative inline-block"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            <motion.span
              className="relative"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255,77,77,0)',
                  '0 0 40px rgba(255,77,77,0.3)',
                  '0 0 20px rgba(255,77,77,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Roshith
            </motion.span>
            <motion.span 
              className="text-[#FF4D4D]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Animated signature line with glow */}
        <motion.div
          className="relative w-64 h-px mx-auto mb-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF4D4D] to-transparent" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF4D4D] to-transparent blur-md"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Status & Time with glass card */}
        <motion.div
          className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16 glass px-8 py-4 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span 
              className="text-white/70 text-xs"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.1em' }}
            >
              Available for Projects
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 hidden md:block" />

          <div 
            className="text-white/50 text-xs flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Kochi, India • {formatTime(time)}
          </div>
        </motion.div>

        {/* Quick links with enhanced hover */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16 reveal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {[
            { name: 'GitHub', url: 'https://github.com/roshithrobert' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/roshithrobert' },
            { name: 'Twitter', url: 'https://twitter.com/roshithrobert' },
            { name: 'Email', url: 'mailto:roshithrobert7@gmail.com' },
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-white/50 text-sm hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.1em' }}
              data-magnetic
              whileHover={{ y: -3 }}
            >
              {link.name}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF4D4D] group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright with year animation */}
        <motion.p
          className="text-white/20 text-[10px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.25em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          © 2026 Roshith Robert — Made with 
          <motion.span 
            className="inline-block mx-1 text-[#FF4D4D]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ♥
          </motion.span>
           in Kerala
        </motion.p>
      </div>

      {/* Animated decorative corner elements */}
      <motion.div 
        className="absolute top-8 left-8 w-16 h-16"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
      <motion.div 
        className="absolute top-8 right-8 w-16 h-16"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.75 }}
      >
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
      <motion.div 
        className="absolute bottom-8 left-8 w-16 h-16"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-white/20 to-transparent" />
      </motion.div>
      <motion.div 
        className="absolute bottom-8 right-8 w-16 h-16"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.25 }}
      >
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-white/20 to-transparent" />
      </motion.div>

      {/* Scroll to top indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-magnetic
        whileHover={{ y: -5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-[#FF4D4D]/20 transition-colors"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-4 h-4 text-white/50 group-hover:text-[#FF4D4D] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.div>
        <span 
          className="text-[10px] text-white/30 uppercase group-hover:text-white/60 transition-colors"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
        >
          Back to Top
        </span>
      </motion.button>
    </div>
  );
};

export default Outro;

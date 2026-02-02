import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Animated stat counter component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax text effect
    const words = section.querySelectorAll('.word-reveal');
    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'left 80%',
            containerAnimation: gsap.getById('horizontalScroll'),
          },
        }
      );
    });
  }, []);

  const skills = [
    { name: 'React / Next.js', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, color: '#3178C6' },
    { name: 'Node.js', level: 85, color: '#68A063' },
    { name: 'Python / AI', level: 80, color: '#FFD43B' },
    { name: 'Game Dev (Godot)', level: 75, color: '#478CBF' },
  ];

  const stats = [
    { value: 20, suffix: '+', label: 'Projects' },
    { value: 3, suffix: '+', label: 'Years Exp' },
    { value: 10, suffix: 'K+', label: 'Lines of Code' },
    { value: 100, suffix: '%', label: 'Passion' },
  ];

  const timeline = [
    { year: '2024', title: 'Full Stack Developer', desc: 'Building modern web apps' },
    { year: '2023', title: 'Game Developer', desc: 'Created indie games with Godot' },
    { year: '2022', title: 'Frontend Focus', desc: 'Mastered React & TypeScript' },
    { year: '2021', title: 'Started Coding', desc: 'First lines of Python' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient blob following mouse */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          animate={{
            x: mousePos.x * 200 - 100,
            y: mousePos.y * 200 - 100,
            background: `radial-gradient(circle, #FF4D4D 0%, transparent 70%)`,
          }}
          transition={{ type: 'spring', stiffness: 30, damping: 30 }}
          style={{ left: '20%', top: '20%' }}
        />
        
        {/* Large text background with animation */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] pointer-events-none select-none whitespace-nowrap"
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            WebkitTextStroke: '1px rgba(255,255,255,0.02)',
            color: 'transparent',
          }}
        >
          ABOUT
        </motion.div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Decorative lines with glow */}
        <motion.div 
          className="absolute top-0 left-1/3 w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,77,77,0.3), transparent)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-0 left-2/3 w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,77,77,0.2), transparent)',
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto w-full">
          {/* Left side - Text content */}
          <div ref={textRef} className="flex flex-col justify-center">
            {/* Section label */}
            <motion.div className="flex items-center gap-4 mb-8 reveal">
              <div className="w-12 h-px bg-[#FF4D4D]" />
              <span 
                className="text-[#FF4D4D] text-xs uppercase"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.25em' }}
              >
                ( 01 ) — About Me
              </span>
            </motion.div>

            {/* Main heading - HERO STYLE Premium typography */}
            <h2 
              className="text-5xl md:text-6xl lg:text-[5.5rem] text-white mb-10 leading-[0.95] reveal tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  I don't just write
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#FF6B35] to-[#FF8C00]"
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontStyle: 'italic' }}
                >
                  code
                  <motion.span 
                    className="inline-block text-[#FF4D4D] ml-3"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    ✦
                  </motion.span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  I design how
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  people{' '}
                  <span className="relative inline-block" style={{ fontStyle: 'italic' }}>
                    feel
                    <motion.span 
                      className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-[#FF4D4D] to-[#FF8C00] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </span>
                </motion.span>
              </span>
            </h2>

            {/* Description - Elegant prose */}
            <div 
              className="space-y-6 text-white/50 text-lg leading-[2] reveal max-w-xl"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            >
              <p>
                I'm a{' '}
                <span className="text-white font-medium relative group">
                  full-stack developer
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/20 group-hover:bg-[#FF4D4D] transition-colors" />
                </span>
                {' '}and{' '}
                <span className="text-white font-medium relative group">
                  game creator
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/20 group-hover:bg-[#FF4D4D] transition-colors" />
                </span>
                {' '}from Alappuzha, Kerala. I believe that the best digital products are those that feel{' '}
                <span 
                  className="text-[#FF4D4D] font-normal"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  invisible
                </span>
                {' '}— they just work, beautifully.
              </p>
              <p className="text-white/40">
                When I'm not coding, you'll find me designing game mechanics, exploring new frameworks, 
                or crafting experiences that make people smile.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-6 mt-12 reveal">
              {[
                { label: 'Location', value: 'Kerala, India' },
                { label: 'Experience', value: '3+ Years' },
                { label: 'Focus', value: 'Full Stack + Games' },
                { label: 'Status', value: 'Available' },
              ].map((fact, i) => (
                <div key={i} className="border-l border-white/10 pl-4 hover:border-[#FF4D4D] transition-colors">
                  <span 
                    className="text-[10px] text-white/40 uppercase"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                  >
                    {fact.label}
                  </span>
                  <p 
                    className="text-white mt-1"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                  >
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="mt-12 reveal">
              <h3 
                className="text-[10px] text-white/40 uppercase mb-6"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
              >
                Journey
              </h3>
              <div className="timeline">
                {timeline.map((item, i) => (
                  <motion.div 
                    key={i}
                    className="timeline-item group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span 
                      className="text-[#FF4D4D] text-xs block mb-1"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.year}
                    </span>
                    <h4 
                      className="text-white text-sm group-hover:text-[#FF4D4D] transition-colors"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="text-white/40 text-xs mt-1"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Visual + Skills */}
          <div className="flex flex-col justify-center space-y-12">
            {/* Profile image area with creative frame */}
            <div className="relative scale-in">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated frame decorations */}
                <motion.div 
                  className="absolute -top-4 -left-4 w-24 h-24"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4D4D] to-transparent" />
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#FF4D4D] to-transparent" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-24 h-24"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#FF4D4D] to-transparent" />
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#FF4D4D] to-transparent" />
                </motion.div>
                
                {/* Main card with glassmorphism */}
                <div className="relative w-full h-full glass overflow-hidden rounded-2xl">
                  {/* Animated background */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(255,77,77,0.1) 0%, transparent 50%)',
                        'linear-gradient(225deg, rgba(255,140,0,0.1) 0%, transparent 50%)',
                        'linear-gradient(315deg, rgba(255,77,77,0.1) 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  
                  {/* Central element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-9xl"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        background: 'linear-gradient(135deg, #FF4D4D 0%, #FF8C00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0, -2, 0],
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      RR
                    </motion.span>
                  </div>
                  
                  {/* Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* Floating badge with animation */}
                <motion.div 
                  className="absolute -right-6 top-1/2 -translate-y-1/2 glass-dark text-white px-4 py-6 writing-vertical rounded-full"
                  animate={{ y: ['-50%', 'calc(-50% + 10px)', '-50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span 
                    className="text-xs uppercase"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.3em' }}
                  >
                    Developer
                  </span>
                </motion.div>
                
                {/* Status indicator */}
                <motion.div 
                  className="absolute -left-2 top-8 flex items-center gap-2 glass-dark px-4 py-2 rounded-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
                    Available
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 reveal">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center glass-dark p-4 rounded-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="text-2xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div 
                    className="text-[10px] text-white/40 uppercase"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills with enhanced styling */}
            <div className="space-y-5 reveal">
              <h3 
                className="text-[10px] text-white/40 uppercase mb-6"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
              >
                Core Skills
              </h3>
              {skills.map((skill, i) => (
                <motion.div 
                  key={i} 
                  className="group"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span 
                      className="text-white group-hover:text-[#FF4D4D] transition-colors flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.875rem' }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      {skill.name}
                    </span>
                    <span 
                      className="text-white/40 text-xs glass-dark px-2 py-1 rounded-full"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full origin-left"
                      style={{ 
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint with animation */}
      <motion.div 
        className="absolute right-8 bottom-8 flex items-center gap-3 text-white/30"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span 
          className="text-[10px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
        >
          Keep scrolling
        </span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

export default About;

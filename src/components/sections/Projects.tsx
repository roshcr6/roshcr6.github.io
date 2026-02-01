import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  color: string;
  year: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MindFlip',
    subtitle: 'Reverse Dash Game',
    description: 'A minimalist, reverse-psychology lane-switcher mobile game that trains decision fatigue. Prototype winner at Game Jam with polished core mechanics and narrative design.',
    tech: ['Godot', 'GDScript', 'Game Design', 'UI/UX'],
    image: '/projects/mindflip.jpg',
    color: '#FF4D4D',
    year: '2024',
  },
  {
    id: 2,
    title: 'HeritageMap',
    subtitle: 'Cultural Preservation Platform',
    description: 'An interactive platform for mapping and preserving cultural heritage sites. Features real-time collaboration and immersive 3D visualizations.',
    tech: ['React', 'Three.js', 'Node.js', 'MongoDB'],
    image: '/projects/heritagemap.jpg',
    color: '#4D9FFF',
    year: '2024',
  },
  {
    id: 3,
    title: 'VIBE IDE',
    subtitle: 'Next-Gen Code Editor',
    description: 'Built live syntax highlighting & smart transpiler. A modern IDE focused on developer experience with AI-powered suggestions and real-time collaboration.',
    tech: ['TypeScript', 'React', 'Monaco', 'WebSockets'],
    image: '/projects/vibe-ide.jpg',
    color: '#9F4DFF',
    year: '2023',
  },
  {
    id: 4,
    title: 'Portfolio',
    subtitle: 'This Website',
    description: 'A premium horizontal-scrolling portfolio with cinematic animations, magnetic interactions, and luxury design inspired by top creative studios.',
    tech: ['React', 'GSAP', 'Framer Motion', 'Tailwind'],
    image: '/projects/portfolio.jpg',
    color: '#FF8C00',
    year: '2026',
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const displayProject = hoveredProject !== null ? hoveredProject : activeProject;

  return (
    <div className="relative w-[200vw] h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Large number background with gradient */}
        <motion.div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 text-[40vw] pointer-events-none select-none"
          animate={{ opacity: [0.01, 0.02, 0.01] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            WebkitTextStroke: '1px rgba(255,255,255,0.03)',
            color: 'transparent',
          }}
        >
          {String(displayProject + 1).padStart(2, '0')}
        </motion.div>

        {/* Animated gradient based on active project */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full opacity-30"
          animate={{
            background: `radial-gradient(ellipse at 70% 50%, ${projects[displayProject].color}50 0%, transparent 60%)`,
          }}
          transition={{ duration: 1 }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
        />
      </div>

      {/* Content container */}
      <div ref={containerRef} className="relative z-10 w-full h-full flex">
        {/* Left section - Project info */}
        <div className="w-[50vw] h-full flex flex-col justify-center px-16 lg:px-24">
          {/* Section label */}
          <motion.div className="flex items-center gap-4 mb-12 reveal">
            <div className="w-12 h-px bg-[#FF4D4D]" />
            <span 
              className="text-[#FF4D4D] text-xs uppercase"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.25em' }}
            >
              ( 02 ) — Selected Work
            </span>
          </motion.div>

          {/* Project list */}
          <div className="space-y-2">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => setActiveProject(index)}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`group w-full text-left py-6 border-b border-white/10 transition-all duration-500 ${
                  activeProject === index ? 'border-white/30' : ''
                }`}
                data-cursor-text="VIEW"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Number */}
                    <span
                      className={`text-xs transition-colors duration-300 ${
                        activeProject === index ? 'text-[#FF4D4D]' : 'text-white/30'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <div>
                      <h3
                        className={`text-3xl md:text-4xl transition-all duration-500 ${
                          activeProject === index
                            ? 'text-white translate-x-4'
                            : 'text-white/50 group-hover:text-white group-hover:translate-x-2'
                        }`}
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                      >
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs uppercase transition-colors duration-300 ${
                          activeProject === index ? 'text-white/60' : 'text-white/30'
                        }`}
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                      >
                        {project.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.svg
                    className={`w-6 h-6 transition-all duration-300 ${
                      activeProject === index ? 'text-[#FF4D4D]' : 'text-white/20'
                    }`}
                    animate={{
                      x: activeProject === index ? 0 : -10,
                      opacity: activeProject === index ? 1 : 0,
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 bg-white/5 mt-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF4D4D]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeProject === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* View all projects link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 mt-12 text-white/50 hover:text-white transition-colors group"
            data-magnetic
          >
            <span 
              className="text-xs uppercase"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', fontWeight: 500 }}
            >
              View All Projects
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </div>

        {/* Right section - Project preview */}
        <div 
          className="w-[150vw] h-full flex items-center px-16"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -60, rotateX: -15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
              style={{ perspective: 1000 }}
            >
              {/* Project card with glassmorphism */}
              <div className="relative group" data-cursor-text="EXPLORE">
                {/* Glow effect behind card */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl blur-3xl opacity-30"
                  animate={{
                    background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, ${projects[activeProject].color}60 0%, transparent 50%)`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main card */}
                <div className="relative glass rounded-2xl overflow-hidden">
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          `linear-gradient(135deg, ${projects[activeProject].color}30 0%, transparent 50%), linear-gradient(315deg, ${projects[activeProject].color}15 0%, transparent 50%)`,
                          `linear-gradient(225deg, ${projects[activeProject].color}30 0%, transparent 50%), linear-gradient(45deg, ${projects[activeProject].color}15 0%, transparent 50%)`,
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
                    />
                    
                    {/* Grid pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />

                    {/* Project mockup */}
                    <div className="absolute inset-12 border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <motion.span 
                        className="text-8xl"
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          background: `linear-gradient(135deg, ${projects[activeProject].color}, ${projects[activeProject].color}80)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {projects[activeProject].title.substring(0, 2).toUpperCase()}
                      </motion.span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />

                    {/* Animated corner brackets */}
                    <motion.div 
                      className="absolute top-6 left-6 w-12 h-12"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30" />
                      <div className="absolute top-0 left-0 w-0.5 h-full bg-white/30" />
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-6 right-6 w-12 h-12"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white/30" />
                      <div className="absolute bottom-0 right-0 w-0.5 h-full bg-white/30" />
                    </motion.div>

                    {/* Year badge */}
                    <motion.div 
                      className="absolute top-6 right-6 px-4 py-2 glass-dark rounded-full"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span 
                        className="text-xs text-white/80"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                      >
                        {projects[activeProject].year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Project details */}
                  <div className="p-8 space-y-6">
                    {/* Title row */}
                    <div className="flex items-start justify-between">
                      <div>
                        <motion.h2
                          className="text-4xl text-white mb-2"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                          layoutId={`title-${activeProject}`}
                        >
                          {projects[activeProject].title}
                        </motion.h2>
                        <span
                          className="text-sm uppercase text-white/40"
                          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                        >
                          {projects[activeProject].subtitle}
                        </span>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                          Live
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-white/60 text-base leading-[1.9] max-w-2xl"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                    >
                      {projects[activeProject].description}
                    </p>

                    {/* Tech stack with enhanced styling */}
                    <div className="flex flex-wrap gap-3">
                      {projects[activeProject].tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="px-4 py-2 text-xs glass-dark rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 cursor-default"
                          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action buttons with enhanced styling */}
                    <div className="flex items-center gap-4 pt-4">
                      <motion.button
                        className="group/btn relative flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full"
                        style={{ background: projects[activeProject].color }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-magnetic
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          whileHover={{ translateX: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span 
                          className="relative text-white text-sm uppercase"
                          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em', fontWeight: 500 }}
                        >
                          View Case Study
                        </span>
                        <svg
                          className="relative w-4 h-4 text-white transform group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>

                      <motion.button
                        className="group/btn flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/5 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-magnetic
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span 
                          className="text-sm uppercase"
                          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em', fontWeight: 500 }}
                        >
                          Source
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom progress indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveProject(index)}
            className="group relative p-2"
          >
            <motion.div
              className={`w-12 h-1 rounded-full transition-colors duration-300 ${
                activeProject === index ? 'bg-white' : 'bg-white/20'
              }`}
              whileHover={{ scaleY: 2 }}
            />
            <span 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      {/* Floating project titles marquee */}
      <div className="absolute bottom-24 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array(5).fill(null).map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {projects.map((project, i) => (
                <span 
                  key={`${groupIndex}-${i}`}
                  className="text-8xl mx-12 text-transparent select-none"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    WebkitTextStroke: '1px rgba(255,255,255,0.03)',
                  }}
                >
                  {project.title}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;

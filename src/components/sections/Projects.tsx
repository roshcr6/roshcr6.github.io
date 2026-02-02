import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  year: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MindFlip',
    subtitle: 'Reverse Dash Game',
    description: 'A minimalist, reverse-psychology lane-switcher mobile game that trains decision fatigue. Prototype winner at Game Jam.',
    tech: ['Godot', 'GDScript', 'Game Design'],
    color: '#FF4D4D',
    year: '2024',
    category: 'Game Dev',
  },
  {
    id: 2,
    title: 'HeritageMap',
    subtitle: 'Cultural Platform',
    description: 'Interactive platform for mapping and preserving cultural heritage sites with real-time collaboration and 3D visualizations.',
    tech: ['React', 'Three.js', 'Node.js'],
    color: '#4D9FFF',
    year: '2024',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'VIBE IDE',
    subtitle: 'Code Editor',
    description: 'Modern IDE with live syntax highlighting, smart transpiler, AI-powered suggestions and real-time collaboration.',
    tech: ['TypeScript', 'React', 'Monaco'],
    color: '#9F4DFF',
    year: '2023',
    category: 'Dev Tools',
  },
  {
    id: 4,
    title: 'Portfolio',
    subtitle: 'This Website',
    description: 'Premium horizontal-scrolling portfolio with cinematic animations, magnetic interactions, and luxury design.',
    tech: ['React', 'GSAP', 'Framer Motion'],
    color: '#FF8C00',
    year: '2026',
    category: 'Creative',
  },
];

// Floating orb component
const FloatingOrb = ({ color, size, delay, duration, x, y }: { 
  color: string; size: number; delay: number; duration: number; x: string; y: string 
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
      left: x,
      top: y,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="relative w-[200vw] h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated background orbs */}
      <FloatingOrb color="#FF4D4D" size={400} delay={0} duration={8} x="10%" y="20%" />
      <FloatingOrb color="#4D9FFF" size={300} delay={2} duration={10} x="60%" y="60%" />
      <FloatingOrb color="#9F4DFF" size={350} delay={4} duration={9} x="80%" y="10%" />

      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center px-12 lg:px-20">
        {/* Left Header Section */}
        <div className="w-[30vw] h-full flex flex-col justify-center pr-12">
          {/* Section indicator */}
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-8 h-8 rounded-full border border-[#FF4D4D]/50" />
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#FF4D4D] rounded-full -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <span 
              className="text-white/50 text-xs uppercase"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.3em' }}
            >
              02 / Work
            </span>
          </motion.div>

          {/* Main heading - HERO STYLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 
              className="text-6xl lg:text-[5rem] text-white mb-6 leading-[0.9] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Selected
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#FF6B35] to-[#FF8C00]"
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontStyle: 'italic' }}
                >
                  Projects
                  <motion.span 
                    className="inline-block text-[#FF4D4D] ml-2 text-4xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    ◈
                  </motion.span>
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <motion.p 
            className="text-white/40 text-base leading-[1.9] mb-10 max-w-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A curated collection of work that showcases my passion for creating{' '}
            <span className="text-white/70" style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              meaningful
            </span>{' '}
            digital experiences.
          </motion.p>

          {/* Mini stats */}
          <motion.div 
            className="flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { value: '04', label: 'Projects' },
              { value: '10+', label: 'Tech Stack' },
            ].map((stat, i) => (
              <div key={i}>
                <div 
                  className="text-3xl text-white mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-[10px] text-white/30 uppercase"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bento Grid Projects */}
        <div className="w-[170vw] h-[80vh] grid grid-cols-12 grid-rows-6 gap-4">
          
          {/* Project 1 - Featured Large Card */}
          <motion.div
            className="col-span-5 row-span-6 relative group cursor-pointer"
            onMouseEnter={() => setHoveredProject(0)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(0)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.985 }}
          >
            {/* Card background with gradient border effect */}
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div 
              className="relative h-full rounded-[2rem] overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${projects[0].color}12 0%, rgba(10,10,10,0.95) 40%)`,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 20%, ${projects[0].color}30 0%, transparent 50%)`,
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
              />

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col">
                {/* Top bar */}
                <div className="flex justify-between items-start mb-auto">
                  <motion.div 
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: `${projects[0].color}20` }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full"
                      style={{ background: projects[0].color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span 
                      className="text-[11px] uppercase"
                      style={{ fontFamily: 'var(--font-mono)', color: projects[0].color, letterSpacing: '0.1em' }}
                    >
                      {projects[0].category}
                    </span>
                  </motion.div>
                  <span 
                    className="text-white/30 text-sm px-3 py-1 rounded-full border border-white/10"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {projects[0].year}
                  </span>
                </div>

                {/* Center visual */}
                <div className="flex-1 flex items-center justify-center py-8">
                  <motion.div className="relative">
                    {/* Orbital rings */}
                    <motion.div
                      className="absolute -inset-20 rounded-full border border-dashed"
                      style={{ borderColor: `${projects[0].color}20` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute -inset-12 rounded-full border"
                      style={{ borderColor: `${projects[0].color}15` }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* Main icon */}
                    <motion.div 
                      className="w-36 h-36 rounded-3xl flex items-center justify-center relative"
                      style={{ 
                        background: `linear-gradient(135deg, ${projects[0].color}50, ${projects[0].color}20)`,
                        boxShadow: `0 20px 60px ${projects[0].color}30`,
                      }}
                      animate={{ 
                        rotate: hoveredProject === 0 ? [0, 5, -5, 0] : 0,
                        scale: hoveredProject === 0 ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <span 
                        className="text-5xl text-white"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {projects[0].title.substring(0, 2)}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom content */}
                <div className="mt-auto">
                  <h3 
                    className="text-4xl text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                  >
                    {projects[0].title}
                  </h3>
                  <p 
                    className="text-white/50 text-sm mb-5 leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {projects[0].description}
                  </p>
                  
                  {/* Tech row */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {projects[0].tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-[11px] rounded-lg"
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Arrow button */}
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        background: hoveredProject === 0 ? projects[0].color : 'rgba(255,255,255,0.05)',
                      }}
                      animate={{ x: hoveredProject === 0 ? 5 : 0 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 - Horizontal card top */}
          <motion.div
            className="col-span-4 row-span-3 relative group cursor-pointer"
            onMouseEnter={() => setHoveredProject(1)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(1)}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.985 }}
          >
            <div className="absolute -inset-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div 
              className="relative h-full rounded-[1.5rem] overflow-hidden p-6 flex flex-col"
              style={{
                background: `linear-gradient(135deg, ${projects[1].color}10 0%, rgba(10,10,10,0.9) 60%)`,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Top row */}
              <div className="flex justify-between items-center mb-auto">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${projects[1].color}20` }}
                  animate={{ rotate: hoveredProject === 1 ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span 
                    className="text-xl"
                    style={{ fontFamily: 'var(--font-display)', color: projects[1].color }}
                  >
                    {projects[1].title.charAt(0)}
                  </span>
                </motion.div>
                
                <div className="flex items-center gap-3">
                  <span 
                    className="text-[10px] uppercase text-white/40"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {projects[1].category}
                  </span>
                  <div className="w-px h-3 bg-white/20" />
                  <span 
                    className="text-xs text-white/30"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {projects[1].year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-auto">
                <h3 
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  {projects[1].title}
                </h3>
                <p 
                  className="text-white/40 text-sm line-clamp-2 mb-4"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {projects[1].subtitle}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {projects[1].tech.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] rounded-md"
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: hoveredProject === 1 ? projects[1].color : 'rgba(255,255,255,0.05)' }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 3 - Square card */}
          <motion.div
            className="col-span-3 row-span-3 relative group cursor-pointer"
            onMouseEnter={() => setHoveredProject(2)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(2)}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 0.985 }}
          >
            <div className="absolute -inset-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div 
              className="relative h-full rounded-[1.5rem] overflow-hidden p-6 flex flex-col justify-between"
              style={{
                background: `linear-gradient(200deg, ${projects[2].color}15 0%, rgba(10,10,10,0.9) 50%)`,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Visual element */}
              <motion.div 
                className="absolute top-6 right-6 w-20 h-20 rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${projects[2].color}40, ${projects[2].color}10)`,
                }}
                animate={{ 
                  rotate: hoveredProject === 2 ? 90 : 0,
                  scale: hoveredProject === 2 ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <span 
                  className="absolute inset-0 flex items-center justify-center text-2xl text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {projects[2].title.charAt(0)}
                </span>
              </motion.div>

              {/* Category */}
              <span 
                className="text-[10px] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: projects[2].color, letterSpacing: '0.15em' }}
              >
                {projects[2].category}
              </span>

              {/* Bottom content */}
              <div>
                <h3 
                  className="text-xl text-white mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  {projects[2].title}
                </h3>
                <p 
                  className="text-white/40 text-xs mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {projects[2].subtitle}
                </p>
                <span 
                  className="text-white/20 text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {projects[2].year}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Project 4 - Wide bottom card */}
          <motion.div
            className="col-span-7 row-span-3 relative group cursor-pointer"
            onMouseEnter={() => setHoveredProject(3)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(3)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 0.99 }}
          >
            <div className="absolute -inset-[1px] rounded-[1.5rem] bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div 
              className="relative h-full rounded-[1.5rem] overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${projects[3].color}10 0%, rgba(10,10,10,0.9) 40%)`,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="h-full p-6 flex items-center gap-8">
                {/* Left - Visual */}
                <motion.div
                  className="w-28 h-28 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${projects[3].color}40, ${projects[3].color}15)`,
                    boxShadow: `0 10px 40px ${projects[3].color}20`,
                  }}
                  animate={{ 
                    rotate: hoveredProject === 3 ? [0, 10, -10, 0] : 0,
                    scale: hoveredProject === 3 ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span 
                    className="text-4xl text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {projects[3].title.substring(0, 2)}
                  </span>
                </motion.div>

                {/* Center - Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      className="px-3 py-1 rounded-full text-[10px] uppercase"
                      style={{ 
                        fontFamily: 'var(--font-mono)',
                        background: `${projects[3].color}20`,
                        color: projects[3].color,
                      }}
                    >
                      {projects[3].category}
                    </motion.div>
                    <span 
                      className="text-white/30 text-xs"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {projects[3].year}
                    </span>
                  </div>
                  <h3 
                    className="text-3xl text-white mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                  >
                    {projects[3].title}
                  </h3>
                  <p 
                    className="text-white/40 text-sm line-clamp-2 max-w-xl"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {projects[3].description}
                  </p>
                </div>

                {/* Right - Tech & CTA */}
                <div className="flex-shrink-0 flex flex-col items-end gap-4">
                  <div className="flex gap-2">
                    {projects[3].tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[10px] rounded-lg"
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: hoveredProject === 3 ? projects[3].color : 'rgba(255,255,255,0.05)',
                    }}
                    animate={{ x: hoveredProject === 3 ? 5 : 0 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-3xl rounded-[2rem] overflow-hidden"
              style={{ 
                background: '#0a0a0a',
                border: `1px solid ${projects[selectedProject].color}30`,
              }}
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient top border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${projects[selectedProject].color}, ${projects[selectedProject].color}50)` }}
              />

              {/* Close button */}
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-10">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${projects[selectedProject].color}50, ${projects[selectedProject].color}20)` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span 
                      className="text-3xl text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {projects[selectedProject].title.substring(0, 2)}
                    </span>
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="px-3 py-1 rounded-full text-xs uppercase"
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          background: `${projects[selectedProject].color}20`,
                          color: projects[selectedProject].color,
                        }}
                      >
                        {projects[selectedProject].category}
                      </span>
                      <span className="text-white/30 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                        {projects[selectedProject].year}
                      </span>
                    </div>
                    <h2 
                      className="text-4xl text-white"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                    >
                      {projects[selectedProject].title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p 
                  className="text-white/60 text-lg leading-relaxed mb-8"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                >
                  {projects[selectedProject].description}
                </p>

                {/* Tech stack */}
                <div className="mb-8">
                  <h4 
                    className="text-[10px] text-white/40 uppercase mb-4"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                  >
                    Built with
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {projects[selectedProject].tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-5 py-2 rounded-xl text-sm"
                        style={{ 
                          fontFamily: 'var(--font-mono)',
                          background: `${projects[selectedProject].color}15`,
                          color: 'rgba(255,255,255,0.8)',
                          border: `1px solid ${projects[selectedProject].color}25`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    className="px-8 py-4 rounded-xl text-white text-sm uppercase flex items-center gap-3"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      background: projects[selectedProject].color,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 rounded-xl text-white/60 text-sm uppercase flex items-center gap-3 border border-white/10 hover:border-white/30 hover:text-white transition-all"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

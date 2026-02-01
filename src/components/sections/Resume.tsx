import { useRef } from 'react';
import { motion } from 'framer-motion';

const Resume = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      year: '2024 - Present',
      title: 'Full Stack Developer',
      company: 'Freelance',
      description: 'Building premium web experiences and digital products for clients worldwide.',
    },
    {
      year: '2023 - 2024',
      title: 'Frontend Developer',
      company: 'VIBE IDE Project',
      description: 'Built live syntax highlighting & smart transpiler. Led UI/UX development.',
    },
    {
      year: '2023',
      title: 'Game Designer & Developer',
      company: 'MindFract',
      description: 'Lead game designer - Created MindFlip, a Game Jam winning mobile game.',
    },
  ];

  const education = [
    {
      year: '2021 - Present',
      degree: 'B.Tech in Computer Science',
      institution: 'University, Kerala',
      description: 'Focus on Software Engineering and Game Development',
    },
  ];

  const skills = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    'Backend': ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    'Game Dev': ['Godot', 'GDScript', 'Unity Basics', 'Game Design'],
    'Tools': ['Git', 'Figma', 'VS Code', 'Docker', 'AWS'],
  };

  const achievements = [
    { 
      icon: 'trophy', 
      title: 'Game Jam Winner', 
      desc: 'MindFlip - Best Game Mechanics',
      gradient: 'from-amber-500 to-yellow-400'
    },
    { 
      icon: 'medal', 
      title: 'Hackathon Champion', 
      desc: 'State Level Competition',
      gradient: 'from-blue-500 to-cyan-400'
    },
    { 
      icon: 'rocket', 
      title: '20+ Projects', 
      desc: 'Completed & Deployed',
      gradient: 'from-purple-500 to-pink-400'
    },
    { 
      icon: 'target', 
      title: '3+ Years', 
      desc: 'Development Experience',
      gradient: 'from-[#FF4D4D] to-orange-400'
    },
  ];

  // SVG Icons component
  const AchievementIcon = ({ type, className }: { type: string; className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
      trophy: (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      ),
      medal: (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
          <path d="M11 12 5.12 2.2" />
          <path d="m13 12 5.88-9.8" />
          <path d="M8 7h8" />
          <circle cx="12" cy="17" r="5" />
          <path d="M12 18v-2h-.5" />
        </svg>
      ),
      rocket: (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      target: (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Large text background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.015] pointer-events-none select-none whitespace-nowrap">
          RESUME
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-24 overflow-y-auto py-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section header */}
          <motion.div className="flex items-center gap-4 mb-16 reveal">
            <div className="w-12 h-px bg-[#FF4D4D]" />
            <span 
              className="text-[#FF4D4D] text-xs uppercase"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.25em' }}
            >
              ( 03 ) — Resume & Skills
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left column - Experience */}
            <div className="lg:col-span-2 space-y-12">
              {/* Experience section */}
              <div className="reveal">
                <h2 
                  className="text-3xl md:text-4xl text-white mb-8 flex items-center gap-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  <span className="text-[#FF4D4D]">●</span>
                  Experience
                </h2>
                
                <div className="space-y-8">
                  {experiences.map((exp, i) => (
                    <motion.div
                      key={i}
                      className="group relative pl-8 border-l border-white/10 hover:border-[#FF4D4D] transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-[#FF4D4D] group-hover:scale-125 transition-transform" />
                      <span 
                        className="text-[10px] text-[#FF4D4D] uppercase"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                      >
                        {exp.year}
                      </span>
                      <h3 
                        className="text-xl text-white mt-1"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                      >
                        {exp.title}
                      </h3>
                      <p 
                        className="text-white/60 text-sm"
                        style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                      >
                        {exp.company}
                      </p>
                      <p 
                        className="text-white/40 mt-2 text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                      >
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="reveal">
                <h2 
                  className="text-3xl md:text-4xl text-white mb-8 flex items-center gap-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  <span className="text-[#FF4D4D]">●</span>
                  Education
                </h2>
                
                {education.map((edu, i) => (
                  <div key={i} className="pl-8 border-l border-white/10">
                    <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-white/30" />
                    <span 
                      className="text-[10px] text-white/40 uppercase"
                      style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                    >
                      {edu.year}
                    </span>
                    <h3 
                      className="text-xl text-white mt-1"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                    >
                      {edu.degree}
                    </h3>
                    <p 
                      className="text-white/60 text-sm"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                    >
                      {edu.institution}
                    </p>
                    <p 
                      className="text-white/40 mt-2 text-sm"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                    >
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills grid */}
              <div className="reveal">
                <h2 
                  className="text-3xl md:text-4xl text-white mb-8 flex items-center gap-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  <span className="text-[#FF4D4D]">●</span>
                  Skills
                </h2>
                
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(skills).map(([category, items], i) => (
                    <motion.div
                      key={category}
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <h3 
                        className="text-[10px] text-white/40 uppercase"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                      >
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, j) => (
                          <span
                            key={j}
                            className="px-3 py-1.5 text-xs border border-white/10 text-white/70 hover:border-[#FF4D4D] hover:text-white transition-all duration-300"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Achievements & Download */}
            <div className="space-y-8">
              {/* Achievements */}
              <div className="reveal">
                <h3 
                  className="text-[10px] text-white/40 uppercase mb-6"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                >
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className="group relative p-4 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {/* Gradient background on hover */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      
                      {/* Icon container */}
                      <div className={`relative w-10 h-10 mb-3 rounded-lg bg-gradient-to-br ${achievement.gradient} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                        <AchievementIcon type={achievement.icon} className="w-full h-full text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative">
                        <h4 
                          className="text-white text-sm group-hover:text-white transition-colors"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          {achievement.title}
                        </h4>
                        <p 
                          className="text-[10px] text-white/40 mt-1 leading-relaxed"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                        >
                          {achievement.desc}
                        </p>
                      </div>
                      
                      {/* Corner accent */}
                      <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-br ${achievement.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Download resume */}
              <div className="reveal">
                <h3 
                  className="text-[10px] text-white/40 uppercase mb-6"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                >
                  Download
                </h3>
                <button
                  className="w-full group relative px-8 py-4 bg-[#FF4D4D] text-white overflow-hidden"
                  data-magnetic
                >
                  <span 
                    className="relative z-10 flex items-center justify-center gap-3 text-xs uppercase"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.15em' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  <span 
                    className="absolute inset-0 flex items-center justify-center text-[#FF4D4D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-xs uppercase"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.15em' }}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </span>
                </button>
              </div>

              {/* Contact info */}
              <div className="reveal p-6 border border-white/10">
                <h3 
                  className="text-[10px] text-white/40 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                >
                  Contact
                </h3>
                <div 
                  className="space-y-3 text-xs"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                >
                  <a href="mailto:roshithrobert7@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    roshithrobert7@gmail.com
                  </a>
                  <a href="tel:+919188539872" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 9188539872
                  </a>
                  <p className="flex items-center gap-3 text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Alappuzha, Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

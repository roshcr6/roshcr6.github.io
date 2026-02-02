import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import Outro from './components/sections/Outro';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import TextRibbon from './components/TextRibbon';
import FullScreenMenu from './components/FullScreenMenu';
import SpotlightCursor from './components/SpotlightCursor';
import { NoiseTexture } from './components/MicroInteractions';
import './index.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = ['hero', 'about', 'projects', 'resume', 'contact', 'outro'];
const greetings = ['Hello', 'Bonjour', 'Hola', 'नमस्ते', 'Ciao', 'こんにちは', 'Olá', 'Hallo'];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Greeting animation cycle
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Loading animation - Dennis Snellenberg inspired
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const tl = gsap.timeline();
    
    // Counter animation
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const counterEl = document.querySelector('.loader-counter');
        if (counterEl) counterEl.textContent = Math.round(counter.value).toString();
      },
    })
    .to('.loader-greeting', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.3')
    .to('.loader-counter', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.2')
    .to('.loader-line', {
      scaleX: 1,
      duration: 0.5,
      ease: 'power4.inOut',
    }, '-=0.1')
    .to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    })
    .add(() => {
      setIsLoading(false);
      setLoaderDone(true);
      if (loader) loader.style.display = 'none';
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Check for mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Horizontal Scroll Setup
  useEffect(() => {
    if (isMobile || !containerRef.current || isLoading) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray<HTMLElement>('.panel');
      const totalPanels = panels.length;
      const panelWidth = window.innerWidth;
      const totalWidth = panelWidth * totalPanels;

      // Kill any existing ScrollTriggers first
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Create horizontal scroll
      const scrollTween = gsap.to(panels, {
        x: () => -(totalWidth - panelWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth - panelWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const sectionIndex = Math.min(
              Math.floor(progress * totalPanels),
              totalPanels - 1
            );
            setActiveSection(sectionIndex);
          },
        },
      });

      // Reveal animations for each panel
      panels.forEach((panel) => {
        const revealElements = panel.querySelectorAll('.reveal');
        if (revealElements.length > 0) {
          gsap.fromTo(
            revealElements,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const scaleElements = panel.querySelectorAll('.scale-in');
        if (scaleElements.length > 0) {
          gsap.fromTo(
            scaleElements,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Handle resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, isLoading]);

  // Navigate to section
  const navigateToSection = useCallback((index: number) => {
    if (isMobile) {
      const section = document.getElementById(sections[index]);
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const panelWidth = window.innerWidth;
      const totalPanels = sections.length;
      const maxScroll = panelWidth * (totalPanels - 1);
      const targetScroll = (index / (totalPanels - 1)) * maxScroll;
      
      gsap.to(window, {
        scrollTo: { y: targetScroll },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  }, [isMobile]);

  return (
    <>
      {/* Premium Loader */}
      {!loaderDone && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Greeting text cycling */}
            <div 
              className="loader-greeting text-6xl md:text-8xl text-white mb-8 h-24 flex items-center"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic' }}
            >
              {greetings[currentGreeting]}
            </div>
            
            {/* Counter */}
            <div className="flex items-center gap-4">
              <span 
                className="loader-counter text-9xl md:text-[12rem] text-white/10"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                0
              </span>
              <span 
                className="text-2xl text-white/30"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 300 }}
              >
                %
              </span>
            </div>
            
            {/* Loading line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-white/20 overflow-hidden">
              <div className="loader-line w-full h-full bg-[#FF4D4D] origin-left scale-x-0" />
            </div>
          </div>
        </div>
      )}

      {/* Noise Texture Overlay */}
      <NoiseTexture />
      
      {/* Spotlight Cursor Effect */}
      {!isMobile && !isLoading && <SpotlightCursor />}
      
      {/* Custom Cursor */}
      {!isMobile && <CustomCursor />}

      {/* Full Screen Menu */}
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={sections}
        activeSection={activeSection}
        onNavigate={(index) => {
          navigateToSection(index);
          setMenuOpen(false);
        }}
      />

      {/* Menu Toggle Button */}
      {!isLoading && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-8 right-8 z-[9998] w-14 h-14 rounded-full glass flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
          data-magnetic
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      )}

      {/* Top Text Ribbon */}
      {!isMobile && !isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent">
          <TextRibbon 
            text=" ✦ ROSHITH ROBERT ✦ FULLSTACK DEVELOPER ✦ CREATIVE TECHNOLOGIST ✦ OPEN FOR WORK "
            speed={35}
            direction="left"
            className="text-white/20"
          />
        </div>
      )}

      {/* Bottom Text Ribbon */}
      {!isMobile && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 z-50 py-2 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent">
          <TextRibbon 
            text=" ✦ REACT ✦ TYPESCRIPT ✦ NODE.JS ✦ PYTHON ✦ GSAP ✦ FRAMER MOTION ✦ TAILWIND ✦ UI/UX "
            speed={30}
            direction="right"
            className="text-white/15"
          />
        </div>
      )}
      
      {/* Navigation */}
      {!isLoading && (
        <Navigation 
          sections={sections} 
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />
      )}
      
      {/* Scroll Progress */}
      {!isMobile && !isLoading && (
        <ScrollProgress 
          sections={sections}
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />
      )}

      {/* Main Content */}
      <div 
        ref={containerRef}
        className={isMobile ? '' : 'horizontal-scroll-wrapper'}
      >
        <main className={`horizontal-scroll ${isMobile ? 'flex-col' : ''}`}>
          <section id="hero" className="panel">
            <Hero />
          </section>
          
          <section id="about" className="panel">
            <About />
          </section>
          
          <section id="projects" className="panel">
            <Projects />
          </section>
          
          <section id="resume" className="panel">
            <Resume />
          </section>
          
          <section id="contact" className="panel">
            <Contact />
          </section>
          
          <section id="outro" className="panel">
            <Outro />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;

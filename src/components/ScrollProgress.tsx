import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProgressProps {
  sections: string[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

const ScrollProgress = ({ sections, activeSection, onNavigate }: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const percent = percentRef.current;
    if (!progress || !percent) return;

    ScrollTrigger.create({
      trigger: '.horizontal-scroll-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progressValue = self.progress * 100;
        gsap.to(progress, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
        });
        percent.textContent = `${Math.round(progressValue)}%`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-white/5 z-[60]">
        <div
          ref={progressRef}
          className="h-full bg-[#FF4D4D] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Section indicators on right side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => onNavigate(index)}
            className="group flex items-center gap-3"
            data-magnetic
          >
            {/* Label - appears on hover */}
            <span
              className={`text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                activeSection === index
                  ? 'text-white/60 opacity-100'
                  : 'text-white/30 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {section}
            </span>
            
            {/* Line indicator */}
            <div className="relative h-px overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  activeSection === index
                    ? 'w-8 bg-[#FF4D4D]'
                    : 'w-4 bg-white/20 group-hover:w-6 group-hover:bg-white/40'
                }`}
              />
            </div>
          </button>
        ))}
        
        {/* Percentage */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <span
            ref={percentRef}
            className="text-[10px] font-mono text-white/30"
          >
            0%
          </span>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;

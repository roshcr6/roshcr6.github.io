import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;
    if (!cursor || !cursorDot || !cursorTextEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);

      cursor.style.transform = `translate3d(${cursorX - 25}px, ${cursorY - 25}px, 0)`;
      cursorDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic elements
      if (target.closest('[data-magnetic]')) {
        setIsHovering(true);
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement;
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power3.out',
        });

        // Magnetic pull effect
        gsap.to(magneticEl, {
          x: (mouseX - centerX) * 0.3,
          y: (mouseY - centerY) * 0.3,
          duration: 0.3,
          ease: 'power3.out',
        });
      }

      // Check for cursor text
      if (target.closest('[data-cursor-text]')) {
        const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        gsap.to(cursor, {
          scale: 3,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(cursorTextEl, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }

      // Check for pointer elements
      if (target.closest('a, button, [data-pointer]')) {
        setIsPointer(true);
        gsap.to(cursor, {
          scale: 1.5,
          borderColor: '#FF4D4D',
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('[data-magnetic]')) {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(target.closest('[data-magnetic]'), {
          x: 0,
          y: 0,
          duration: 0.3,
        });
      }

      if (target.closest('[data-cursor-text]')) {
        setCursorText('');
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(cursorTextEl, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        });
      }

      if (target.closest('a, button, [data-pointer]')) {
        setIsPointer(false);
        gsap.to(cursor, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          duration: 0.3,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[50px] h-[50px] rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={cursorTextRef}
          className="text-[8px] font-bold text-white uppercase tracking-wider opacity-0 scale-50"
        >
          {cursorText}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-colors duration-200 ${
          isPointer || isHovering ? 'bg-[#FF4D4D]' : 'bg-white'
        }`}
        style={{ willChange: 'transform' }}
      />

      <style>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default MagneticCursor;

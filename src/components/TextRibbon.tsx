import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TextRibbonProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const TextRibbon = ({ text, speed = 20, direction = 'left', className = '' }: TextRibbonProps) => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    const content = contentRef.current;
    if (!ribbon || !content) return;

    // Duplicate content for seamless loop
    const contentWidth = content.offsetWidth;
    
    gsap.set(ribbon, { x: direction === 'left' ? 0 : -contentWidth });
    
    const tween = gsap.to(ribbon, {
      x: direction === 'left' ? -contentWidth : 0,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    // Scroll-based speed variation
    let scrollVelocity = 0;
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      scrollVelocity = Math.abs(currentScrollTop - lastScrollTop);
      lastScrollTop = currentScrollTop;

      // Speed up ribbon based on scroll velocity
      const speedMultiplier = 1 + scrollVelocity * 0.05;
      tween.timeScale(speedMultiplier);

      // Reset speed after scroll stops
      gsap.to(tween, {
        timeScale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.1,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      tween.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [direction, speed]);

  const repeatedText = Array(10).fill(text).join('');

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={ribbonRef} className="inline-flex">
        <div ref={contentRef} className={`inline-block ${className}`}>
          <span 
            className="text-xs uppercase"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.25em' }}
          >
            {repeatedText}
          </span>
        </div>
        <div className={`inline-block ${className}`}>
          <span 
            className="text-xs uppercase"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.25em' }}
          >
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextRibbon;

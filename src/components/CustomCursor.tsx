import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const requestRef = useRef<number | null>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'link' | 'project' | 'magnetic'>('default');

  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  // Trail particles
  const trails = useRef<{ x: number; y: number; alpha: number }[]>(
    Array(8).fill(null).map(() => ({ x: 0, y: 0, alpha: 0 }))
  );

  // Smooth lerp function
  const lerp = useCallback((a: number, b: number, n: number) => (1 - n) * a + n * b, []);

  // Calculate cursor stretch based on velocity
  const getStretch = useCallback(() => {
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const maxStretch = 1.5;
    const stretch = Math.min(1 + speed * 0.01, maxStretch);
    const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
    return { stretch, angle };
  }, []);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    const followerEl = followerRef.current;
    const textEl = textRef.current;
    if (!cursorEl || !cursorInner || !followerEl || !textEl) return;

    // Animation loop
    const animate = () => {
      // Calculate velocity
      velocity.current.x = mouse.current.x - prevMouse.current.x;
      velocity.current.y = mouse.current.y - prevMouse.current.y;
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;

      // Lerp cursor positions with different speeds
      cursor.current.x = lerp(cursor.current.x, mouse.current.x, 0.35);
      cursor.current.y = lerp(cursor.current.y, mouse.current.y, 0.35);
      follower.current.x = lerp(follower.current.x, mouse.current.x, 0.12);
      follower.current.y = lerp(follower.current.y, mouse.current.y, 0.12);

      // Get stretch values
      const { stretch, angle } = getStretch();

      // Apply main cursor transform with stretch
      cursorEl.style.transform = `translate(${cursor.current.x}px, ${cursor.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch})`;
      cursorInner.style.transform = `rotate(${-angle}deg)`;
      
      // Apply follower transform
      followerEl.style.transform = `translate(${follower.current.x}px, ${follower.current.y}px) translate(-50%, -50%)`;
      
      // Apply text transform
      textEl.style.transform = `translate(${follower.current.x}px, ${follower.current.y}px) translate(-50%, 45px)`;

      // Update trail particles
      trails.current.forEach((trail, i) => {
        const target = i === 0 ? cursor.current : trails.current[i - 1];
        trail.x = lerp(trail.x, target.x, 0.3 - i * 0.02);
        trail.y = lerp(trail.y, target.y, 0.3 - i * 0.02);
        trail.alpha = lerp(trail.alpha, isHovering ? 0 : 1 - i * 0.12, 0.1);
        
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
          trailRefs.current[i].style.opacity = `${trail.alpha * 0.5}`;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Mouse down/up handlers
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add interaction listeners
    const addInteractionListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-magnetic], [data-cursor-text], [data-cursor-hover], input, textarea, [role="button"]'
      );

      interactiveElements.forEach((el) => {
        const element = el as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          
          // Set cursor variant based on element type
          if (element.dataset.cursorText) {
            setCursorText(element.dataset.cursorText);
            setCursorVariant('project');
          } else if (element.dataset.magnetic !== undefined) {
            setCursorVariant('magnetic');
          } else {
            setCursorVariant('link');
          }
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
          setCursorVariant('default');
        });

        // Enhanced magnetic effect
        if (element.dataset.magnetic !== undefined) {
          element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = (e as MouseEvent).clientX - centerX;
            const y = (e as MouseEvent).clientY - centerY;
            
            // Stronger magnetic pull
            gsap.to(element, {
              x: x * 0.4,
              y: y * 0.4,
              duration: 0.4,
              ease: 'power3.out',
            });

            // Move cursor toward center of element
            gsap.to(cursor.current, {
              x: centerX + x * 0.2,
              y: centerY + y * 0.2,
              duration: 0.2,
              ease: 'power2.out',
            });
          });
          
          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: 'elastic.out(1, 0.4)',
            });
          });
        }
      });
    };

    // Initialize
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Initial setup
    setTimeout(addInteractionListeners, 100);

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(addInteractionListeners, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [lerp, getStretch, isHovering]);

  // Get cursor size based on state
  const getCursorSize = () => {
    if (isClicking) return 'scale-75';
    if (isHovering) return 'scale-50';
    return 'scale-100';
  };

  const getFollowerSize = () => {
    if (cursorVariant === 'project') return 'w-24 h-24';
    if (cursorVariant === 'magnetic') return 'w-16 h-16';
    if (isHovering) return 'w-14 h-14';
    return 'w-10 h-10';
  };

  return (
    <>
      {/* Trail particles */}
      {trails.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9997] w-1 h-1 rounded-full bg-[#FF4D4D]"
          style={{ 
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-100 ${getCursorSize()}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div 
          ref={cursorInnerRef}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isHovering 
              ? 'bg-transparent border-2 border-[#FF4D4D]' 
              : 'bg-[#FF4D4D]'
          }`}
          style={{
            boxShadow: isHovering ? 'none' : '0 0 20px rgba(255, 77, 77, 0.5)',
          }}
        />
      </div>
      
      {/* Follower ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-500 ease-out flex items-center justify-center ${getFollowerSize()} ${
          isHovering 
            ? 'border-[#FF4D4D] bg-[#FF4D4D]/5 backdrop-blur-sm' 
            : 'border-white/20'
        } ${isClicking ? 'scale-90' : ''}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* Rotating border effect on hover */}
        {isHovering && cursorVariant === 'project' && (
          <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#FF4D4D"
              strokeWidth="1"
              strokeDasharray="20 10"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Cursor text */}
      <div
        ref={textRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] text-xs font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap transition-all duration-300 ${
          cursorText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{ transform: 'translate(-50%, 45px)' }}
      >
        <span className="px-3 py-1.5 bg-[#FF4D4D] rounded-full">{cursorText}</span>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

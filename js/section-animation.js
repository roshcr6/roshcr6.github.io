// section-animations.js
export function animateSection(sectionId) {
  if (typeof gsap === 'undefined') return; // safety if GSAP not loaded

  gsap.from(`#${sectionId} > *`, {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });
}

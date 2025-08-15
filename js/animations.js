// js/animations.js
// central animation module: hero cinematic, nav glass, card hover previews, cursor, lottie init
// requires: window.gsap (optional), lottie-player (optional)

export function prefersReducedMotion(){
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------------- Hero cinematic: split text + subtle parallax ---------------- */
export function initHeroCinematic(selector = '.hero'){
  const hero = document.querySelector(selector);
  if(!hero) return;
  if(prefersReducedMotion()) return; // skip heavy motion

  // split hero title into words for stagger
  const title = hero.querySelector('.hero-title');
  if(title){
    const words = title.textContent.trim().split(' ').map(w => `<span class="word">${w}&nbsp;</span>`).join('');
    title.innerHTML = words;
    // animate with gsap if available
    if(window.gsap){
      gsap.fromTo('.hero-title .word', {y: 30, opacity:0, rotateX:10}, {y:0, opacity:1, rotateX:0, duration:0.9, stagger:0.08, ease: "power3.out"});
    } else {
      // fallback: just reveal
      Array.from(document.querySelectorAll('.hero-title .word')).forEach((el,i)=> setTimeout(()=> el.style.opacity = 1, 80*i));
    }
  }

  // mousemove parallax on hero-right elements (profile)
  const parallaxTargets = hero.querySelectorAll('.profile-photo, .hero-right img');
  if(parallaxTargets.length){
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const mx = (e.clientX - cx) / rect.width;
      const my = (e.clientY - cy) / rect.height;
      parallaxTargets.forEach((el, idx) => {
        const depth = 6 + idx*4;
        el.style.transform = `translate3d(${mx*depth}px, ${my*depth}px, 0) rotateX(${my*2}deg) rotateY(${-mx*2}deg)`;
      });
    });
    hero.addEventListener('mouseleave', ()=>{
      parallaxTargets.forEach(el => el.style.transform = '');
    });
  }

  // subtle background layer float (if GSAP available)
  if(window.gsap){
    const layers = hero.querySelectorAll('.hero-layer');
    layers.forEach((layer, i) => {
      gsap.to(layer, { y: (i+1)*8, duration: 8 + i*2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
  }
}

/* ---------------- NAV GLASS on scroll ---------------- */
export function initNavGlass(navSelector = '.nav'){
  const nav = document.querySelector(navSelector);
  if(!nav) return;
  const threshold = 40;
  function onScroll(){
    if(window.scrollY > threshold) nav.classList.add('glass','scrolled');
    else nav.classList.remove('glass','scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

/* ---------------- PROJECT HOVER PREVIEW ----------------
  For each .project-card with data-preview="path/to/preview.mp4"
  this will show a small floating video when you hover the card.
*/
export function initProjectHoverPreview(gridSelector = '.projects-grid'){
  const grid = document.querySelector(gridSelector);
  if(!grid) return;
  // delegate hover events
  grid.addEventListener('pointerenter', onPointerEnter, true);
  grid.addEventListener('pointerleave', onPointerLeave, true);

  function onPointerEnter(e){
    const card = e.target.closest('.project-card');
    if(!card) return;
    const preview = card.dataset.preview;
    if(!preview) return;
    // create preview node if not present
    let pv = card.querySelector('.project-preview');
    if(!pv){
      pv = document.createElement('div');
      pv.className = 'project-preview';
      pv.innerHTML = `<video muted autoplay loop playsinline src="${preview}"></video>`;
      card.appendChild(pv);
    }
    card.classList.add('preview-active');
    // small GSAP scale in if available
    if(window.gsap){
      gsap.fromTo(pv, {y: 10, opacity:0, scale:0.98}, {y:0, opacity:1, scale:1, duration:0.45, ease:'power3.out'});
    }
  }

  function onPointerLeave(e){
    const card = e.target.closest('.project-card');
    if(!card) return;
    card.classList.remove('preview-active');
    const pv = card.querySelector('.project-preview');
    if(pv && window.gsap){
      gsap.to(pv, {opacity:0, y:6, duration:0.35, onComplete: ()=> pv.remove()});
    } else if(pv) pv.remove();
  }
}

/* ---------------- CARD 3D MICRO-LIFT (GSAP) ---------------- */
export function initCardMicroLift(selector = '.project-card'){
  if(!window.gsap || prefersReducedMotion()) return;
  document.querySelectorAll(selector).forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {rotationY: px * 6, rotationX: -py * 6, scale: 1.02, transformPerspective: 1000, duration: 0.4, ease: "power3.out"});
      if(img) gsap.to(img, {scale: 1.06, duration: 0.6, ease: "power3.out"});
    });
    card.addEventListener('pointerleave', () => {
      gsap.to(card, {rotationY:0, rotationX:0, scale:1, duration:0.6, ease:"power3.out"});
      if(img) gsap.to(img, {scale:1, duration:0.6});
    });
  });
}

/* ---------------- Lottie micro-icons loader ----------------
   Use <div data-lottie="url.json"></div> in your HTML to auto-replace with lottie-player
*/
export function initLottieInline(root = document){
  if(!window.document) return;
  const nodes = Array.from(root.querySelectorAll('[data-lottie]'));
  nodes.forEach(n => {
    const src = n.dataset.lottie;
    const player = document.createElement('lottie-player');
    player.setAttribute('src', src);
    player.setAttribute('background','transparent');
    player.setAttribute('speed','1');
    player.setAttribute('loop','true');
    player.setAttribute('autoplay','true');
    player.className = 'lottie-inline';
    n.replaceWith(player);
    // reveal class for fade
    requestAnimationFrame(()=> player.classList.add('visible'));
  });
}

/* ---------------- Optional custom cursor ---------------- */
export function initCustomCursor(){
  if(prefersReducedMotion()) return;
  const dot = document.createElement('div'); dot.className='cursor-dot';
  const ring = document.createElement('div'); ring.className='cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  document.addEventListener('pointermove', (e)=>{
    dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`;
    ring.style.left = `${e.clientX}px`; ring.style.top = `${e.clientY}px`;
  });
  // interactive states
  document.querySelectorAll('a, button, .btn').forEach(el=>{
    el.addEventListener('pointerenter', ()=> { ring.style.transform = 'translate(-50%,-50%) scale(1.25)'; dot.style.transform = 'translate(-50%,-50%) scale(0.6)'; });
    el.addEventListener('pointerleave', ()=> { ring.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
}

/* ---------------- Generic reveal utility for .reveal elements ------------- */
export function initRevealObserver(rootSelector = document){
  const items = Array.from((rootSelector || document).querySelectorAll('.reveal'));
  if(items.length === 0) return;
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2});
  items.forEach(i => obs.observe(i));
}

/* ---------------- master init function ---------------- */
export function initAnimations(){
  // non-blocking: gracefully handle absence of GSAP/Lottie
  try { initHeroCinematic(); } catch(e){ console.warn('hero init failed', e); }
  try { initNavGlass(); } catch(e){}
  try { initProjectHoverPreview(); } catch(e){}
  try { initCardMicroLift(); } catch(e){}
  try { initLottieInline(); } catch(e){}
  try { initRevealObserver(); } catch(e){}
  // optional cursor: comment out if you don't want it
  try { initCustomCursor(); } catch(e){}
}

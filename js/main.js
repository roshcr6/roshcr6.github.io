// main.js - orchestrator (updated to init new features)
import { loadPartial } from './loader.js';
import { initTheme } from './theme.js';       // existing theme init (safe)
import { initNav } from './nav.js';
import { initPreloader } from './preloader.js';
import { initParticles } from './particles.js';
import { initTilt } from './tilt.js';
import { initTimeline } from './timeline.js';
import { initProjects } from './projects.js';
import { initSkills } from './skills.js';

// new modules
import { initThemeSwitch } from './theme-toggle.js';
import { initNavIndicator } from './nav-indicator.js';
import { initPageTransitions } from './page-transitions.js';
// near other imports at top:
import { initAnimations } from './animations.js';

// ... inside bootstrap after initTilt() and before other inits:


(async function bootstrap(){
  // load header/footer partials first (ensures theme-switch and nav exist)
  await loadPartial('header-placeholder', 'header.html');
  await loadPartial('footer-placeholder', 'footer.html');

  // base inits
  initTheme();          // keeps older toggle functionality if present
  initThemeSwitch();    // initialize our new switch UI
  initNav();            // hamburger + active highlight
  initNavIndicator();   // sliding nav indicator
  initPreloader();
  initPageTransitions();

  // page-specific features
  if(document.getElementById('tsparticles')) initParticles();
  initTilt();
  initAnimations();


  if(document.querySelector('#timeline')) await initTimeline('#timeline');
  if(document.querySelector('.projects-grid')) await initProjects('.projects-grid', '.project-filters');
  if(document.querySelector('.skills-grid')) await initSkills('.skills-grid');

})();

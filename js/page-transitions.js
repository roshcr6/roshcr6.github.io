// page-transitions.js
export function initPageTransitions(){
  // Add page-enter on initial load
  document.body.classList.add('page-enter');
  window.addEventListener('load', ()=> {
    setTimeout(()=> document.body.classList.remove('page-enter'), 60);
  });

  // Intercept internal link clicks to play exit transition
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    // conditions to skip: anchor, external link, new-tab, hash-only
    if(!href || href.startsWith('http') || href.startsWith('#') || a.target === '_blank') return;
    // If it's the same page anchor, skip
    if(href === location.pathname || href === '' ) return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(()=> {
      window.location.href = href;
    }, 360); // match CSS transition timing (approx)
  });
}

// nav-indicator.js
export function initNavIndicator(){
  const navWrap = document.querySelector('.nav .nav-links');
  if(!navWrap) return;
  const links = Array.from(navWrap.querySelectorAll('a'));
  const indicator = navWrap.querySelector('.nav-indicator');
  if(!indicator) return;

  function update(activeEl){
    const rect = activeEl.getBoundingClientRect();
    const parentRect = navWrap.getBoundingClientRect();
    const left = rect.left - parentRect.left;
    const width = rect.width;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  }

  // initial active: find .active or first
  const initial = links.find(a => a.classList.contains('active')) || links[0];
  if(initial) update(initial);

  // on click set/update
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      // remove class from all
      links.forEach(l=>l.classList.remove('active'));
      a.classList.add('active');
      update(a);
    });
  });

  // reposition on resize
  window.addEventListener('resize', () => {
    const active = navWrap.querySelector('a.active') || links[0];
    if(active) update(active);
  });
}

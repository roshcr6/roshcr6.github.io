// nav.js
export function initNav(){
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  ham?.addEventListener('click', ()=> {
    const open = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('active');
  });

  // active link highlight (basic)
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if(location.pathname.endsWith(href) || location.href.includes(href)) a.classList.add('active');
  });
}

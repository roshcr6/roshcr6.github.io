// timeline.js
export async function initTimeline(selector = '#timeline'){
  const el = document.querySelector(selector);
  if(!el) return;
  try{
    const res = await fetch('data/timeline.json');
    const items = await res.json();
    el.innerHTML = items.map(it => `
      <article class="timeline-item" tabindex="0" aria-expanded="false">
        <div class="timeline-icon">${it.icon||'📌'}</div>
        <div class="timeline-body">
          <header class="timeline-head"><h3>${it.title}</h3><time>${it.range}</time></header>
          <div class="timeline-content" hidden>
            <p>${it.summary}</p>
            ${it.points ? `<ul>${it.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
          </div>
        </div>
      </article>`).join('');

    // accordion and simple reveal
    el.querySelectorAll('.timeline-item').forEach(item=>{
      const body = item.querySelector('.timeline-content');
      const toggle = () => {
        const open = item.getAttribute('aria-expanded') === 'true';
        item.setAttribute('aria-expanded', String(!open));
        body.hidden = open;
      };
      item.addEventListener('click', toggle);
      item.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }});
    });

    // reveal with IntersectionObserver fallback
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.35});
    el.querySelectorAll('.timeline-item').forEach(i => obs.observe(i));

  }catch(err){ console.error('Failed loading timeline', err); }
}

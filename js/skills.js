// skills.js
export async function initSkills(selector = '.skills-grid'){
  const root = document.querySelector(selector);
  if(!root) return;
  try{
    const res = await fetch('data/skills.json');
    const items = await res.json();
    root.innerHTML = items.map(s => `
      <div class="skill-card card">
        <div class="skill-icon" aria-hidden="true">${s.name[0]}</div>
        <h4>${s.name}</h4>
        <div class="skill-bar"><span data-skill-width="${s.level}%"></span></div>
      </div>
    `).join('');

    // animate bars when in view
    const spans = root.querySelectorAll('.skill-bar span');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.width = e.target.dataset.skillWidth;
          obs.unobserve(e.target);
        }
      });
    }, {threshold:0.35});
    spans.forEach(s=>obs.observe(s));
  }catch(err){ console.error('Failed loading skills', err); }
}

// projects.js
export async function initProjects(gridSelector = '.projects-grid', filtersSelector = '.project-filters'){
  const grid = document.querySelector(gridSelector);
  if(!grid) return;
  try{
    const res = await fetch('data/projects.json');
    const list = await res.json();

    // inside initProjects() where you render the grid
grid.innerHTML = list.map(p => `
  <article class="project-card card" data-tags="${p.tags.join(',')}" data-preview="${p.preview || ''}">
    <img src="${p.thumb}" alt="${p.title} screenshot" loading="lazy" width="1200" height="800"/>
    <div class="card-meta">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    <div class="project-overlay">
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <div class="card-actions" style="margin-top:12px">
        ${p.demo ? `<a class="btn small" href="${p.demo}" target="_blank" rel="noopener">Live</a>` : ''}
        ${p.repo ? `<a class="btn-outline" href="${p.repo}" target="_blank" rel="noopener">Source</a>` : ''}
        ${p.case ? `<a class="btn-outline" href="${p.case}" target="_blank" rel="noopener">Case</a>` : ''}
      </div>
    </div>
  </article>
`).join('');


    // build filters if placeholder exists
    const filtersRoot = document.querySelector(filtersSelector);
    if(filtersRoot){
      const tags = Array.from(new Set(list.flatMap(p => p.tags)));
      filtersRoot.innerHTML = `<button data-filter="all" class="btn small active">All</button>` +
        tags.map(t=>`<button data-filter="${t}" class="btn small btn-outline">${t}</button>`).join('');
      filtersRoot.addEventListener('click', (e)=>{
        const btn = e.target.closest('button');
        if(!btn) return;
        const tag = btn.dataset.filter;
        grid.querySelectorAll('.project-card').forEach(card=>{
          const tags = card.dataset.tags.split(',');
          card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
        });
        filtersRoot.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
      });
    }

    // init tilt for newly added items (if tilt lib loaded)
    if(window.VanillaTilt) VanillaTilt.init(document.querySelectorAll('.project-card'), { max: 10, speed: 400, glare:true, "max-glare":0.2 });

  }catch(err){ console.error('Error loading projects', err); }
}

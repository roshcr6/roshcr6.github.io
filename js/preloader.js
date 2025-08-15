// preloader.js
export function initPreloader(){
  const pre = document.getElementById('preloader');
  if(!pre) return;
  window.addEventListener('load', ()=>{
    pre.classList.add('hidden');
    setTimeout(()=> pre.remove(), 700);
  });
}

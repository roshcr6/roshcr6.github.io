// theme.js
const THEME_KEY = 'rr_theme';
export function initTheme(){
  const btn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem(THEME_KEY);
  if(stored === 'light') document.body.classList.add('theme-light');
  else document.body.classList.remove('theme-light');

  if(btn){
    // set label
    btn.textContent = document.body.classList.contains('theme-light') ? 'Light' : 'Dark';
    btn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-light');
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
      btn.textContent = isLight ? 'Light' : 'Dark';
    });
  }
}

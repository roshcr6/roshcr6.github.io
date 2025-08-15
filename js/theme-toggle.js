// theme-toggle.js
export function initThemeSwitch() {
  const btn = document.getElementById('theme-switch');
  if (!btn) return;
  const THEME_KEY = 'rr_theme';

  const setState = (isLight) => {
    document.body.classList.toggle('theme-light', isLight);
    btn.setAttribute('aria-pressed', String(isLight));
    btn.dataset.theme = isLight ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  };

  // initial state from localStorage or prefers
  const stored = localStorage.getItem(THEME_KEY);
  let isLight = stored ? stored === 'light' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  setState(isLight);

  // Update button label visually (optional)
  btn.setAttribute('title', isLight ? 'Light mode' : 'Dark mode');

  btn.addEventListener('click', () => {
    setState(!document.body.classList.contains('theme-light'));
    btn.setAttribute('title', document.body.classList.contains('theme-light') ? 'Light mode' : 'Dark mode');
  });
}

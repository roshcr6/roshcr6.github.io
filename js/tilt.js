// tilt.js
export function initTilt(){
  if(!window.VanillaTilt) return;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const cards = document.querySelectorAll('.project-card');
  if(cards.length) {
    VanillaTilt.init(cards, {
      max: isMobile ? 6 : 15,
      speed: 400,
      glare: !isMobile,
      "max-glare": isMobile ? 0 : 0.25,
      scale: 1.03
    });
  }
  const profile = document.querySelector('.profile-photo');
  if(profile) {
    VanillaTilt.init(profile, {max: isMobile ? 4 : 8, speed: 400, glare:false});
  }
}

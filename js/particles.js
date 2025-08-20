// particles.js
export function initParticles(){
  if(!document.getElementById('tsparticles') || !window.tsParticles) return;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  tsParticles.load("tsparticles", {
    background:{color:{value:"transparent"}},
    fpsLimit:60,
    particles:{
      number:{value: isMobile ? 18 : 60, density:{enable:true,area:800}},
      color:{value: "#ff0000ff"},
      links:{enable:true, color:"#80FF80", opacity:0.25, distance:120},
      move:{enable:true, speed: isMobile ? 0.6 : 1.2, outModes:"bounce"},
      size:{value:{min:1,max:4}}
    },
    interactivity:{events:{onHover:{enable:true,mode:"repulse"},onClick:{enable:true,mode:"push"}}},
    detectRetina:true
  });
}
9
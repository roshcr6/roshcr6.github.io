// section-loader.js
import { animateSection } from './section-animations.js';

export async function loadSection(sectionId, url) {
  const container = document.getElementById(sectionId);
  if (container && !container.hasChildNodes()) {
    try {
      const response = await fetch(url);
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const mainContent = doc.querySelector("main");

      if (mainContent) {
        container.innerHTML = mainContent.innerHTML;
        animateSection(sectionId);
      }
    } catch (err) {
      console.error(`❌ Failed to load ${url} into #${sectionId}:`, err);
    }
  }
}

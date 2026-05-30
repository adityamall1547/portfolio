import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ═══════════════ LOADER ═══════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAnimations();
  }, 1200);
});

// ═══════════════ CUSTOM CURSOR ═══════════════
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (dot && ring) {
  let mx = 0, my = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  (function moveCursor() {
    dx += (mx - dx) * 0.15; dy += (my - dy) * 0.15;
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    ring.style.transform = `translate(${dx - 18}px, ${dy - 18}px)`;
    requestAnimationFrame(moveCursor);
  })();
}

// ═══════════════ NAVBAR SCROLL ═══════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ═══════════════ SCROLL ANIMATIONS ═══════════════
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ═══════════════ TECH GRID ═══════════════
const techs = ['HTML','CSS','JavaScript','React','Node.js','Tailwind CSS','GSAP','Vite','Figma','Git','Mapbox','TypeScript'];
const techGrid = document.getElementById('tech-icons');
if (techGrid) {
  techs.forEach(t => {
    const chip = document.createElement('div');
    chip.className = 'tech-chip';
    chip.textContent = t;
    techGrid.appendChild(chip);
  });
}

// ═══════════════ GITHUB BARS ═══════════════
const barsContainer = document.getElementById('github-bars');
if (barsContainer) {
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.className = 'graph-bar';
    bar.style.height = (Math.random() * 80 + 20) + '%';
    barsContainer.appendChild(bar);
  }
}

// ═══════════════ LIVE CODING TIME ═══════════════
const hoursEl = document.getElementById('live-hours');
const clockEl = document.getElementById('live-clock');

if (hoursEl && clockEl) {
  const startDate = new Date('2024-01-01T00:00:00');
  
  function updateTime() {
    const now = new Date();
    const diffMs = now - startDate;
    const daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Estimate 5 hours of coding per day
    const estimatedCodingHours = daysSince * 5;
    hoursEl.textContent = estimatedCodingHours + "+";

    // IST is UTC+5:30
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const hours = istTime.getUTCHours().toString().padStart(2, '0');
    const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = istTime.getUTCSeconds().toString().padStart(2, '0');
    
    clockEl.textContent = `${hours}:${minutes}:${seconds} IST`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// ═══════════════ COUNTER ANIMATION ═══════════════
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      gsap.to({ val: 0 }, { val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.round(this.targets()[0].val); }
      });
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ═══════════════ SMOOTH SCROLL NAV LINKS ═══════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

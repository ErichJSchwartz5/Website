/* ============================================================
   script.js — Erich J. Schwartz Academic Portfolio
   ============================================================ */

// ── Smooth-scroll nav links ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.navbar')?.offsetHeight ?? 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ── Active nav link highlight on scroll ─────────────────────
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveNav() {
  const navH = document.querySelector('.navbar')?.offsetHeight ?? 64;
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - navH - 32) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// ── Intersection Observer: fade-in sections ──────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

// ── Navbar shadow on scroll ──────────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.28)'
    : '0 2px 12px rgba(0,0,0,0.18)';
}, { passive: true });

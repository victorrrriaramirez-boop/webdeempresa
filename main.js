const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header nav');
menuButton.addEventListener('click', () => {const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menuButton.setAttribute('aria-expanded', 'false');menuButton.setAttribute('aria-label', 'Abrir menú');}));
if (!reduced && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {for (const entry of entries) if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}}, {threshold:.1});
 document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
const projects = [...document.querySelectorAll('[data-project]')];
let ticking = false;
function updateScroll() {
 const max = document.documentElement.scrollHeight - innerHeight;
 document.querySelector('.progress span').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
 if (!reduced && innerWidth > 850) projects.forEach(section => {
  const rect = section.getBoundingClientRect(); const distance = Math.max(1, rect.height - innerHeight);
  const progress = Math.max(0, Math.min(1, -rect.top / distance));
  const stage = section.querySelector('.stage');
  stage.style.setProperty('--lift', `${(progress-.5)*-80}px`);
  stage.style.setProperty('--scale', `${.91+progress*.12}`);
 });
 ticking = false;
}
addEventListener('scroll', () => {if (!ticking) {requestAnimationFrame(updateScroll);ticking=true;}}, {passive:true});
addEventListener('resize', updateScroll);updateScroll();

// Escala la web real a cada marco y permite explorarla sin bloquear el scroll principal.
const previewWindows = [...document.querySelectorAll('.preview-window')];
const resizePreviews = () => previewWindows.forEach(win => {
 const scale = win.clientWidth / 1440;
 win.style.setProperty('--preview-scale', String(scale));
 win.querySelector('iframe').style.height = `${Math.max(900, Math.ceil(win.clientHeight / Math.max(scale,.1)))}px`;
});
if ('ResizeObserver' in window) {const ro = new ResizeObserver(resizePreviews);previewWindows.forEach(win => ro.observe(win));}
addEventListener('resize', resizePreviews);resizePreviews();
previewWindows.forEach(win => {
 const button = win.querySelector('.preview-toggle');
 button.addEventListener('click', () => {
  const active = win.classList.toggle('is-active');
  button.setAttribute('aria-pressed', String(active));
  button.textContent = active ? 'Salir de la vista ✕' : 'Explorar aquí ↗';
  win.querySelector('iframe').tabIndex = active ? 0 : -1;
 });
});

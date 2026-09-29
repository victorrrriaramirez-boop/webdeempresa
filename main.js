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
 ticking = false;
}
addEventListener('scroll', () => {if (!ticking) {requestAnimationFrame(updateScroll);ticking=true;}}, {passive:true});
addEventListener('resize', updateScroll);updateScroll();

// Galería horizontal con ampliación del proyecto señalado, al estilo Dock.
const gallery = document.querySelector('.project-track');
if (gallery) {
 const cards = [...gallery.querySelectorAll('[data-project]')];
 const setActive = card => {
  cards.forEach(item => item.classList.toggle('is-selected', item === card));
  requestAnimationFrame(resizePreviews);
 };
 cards.forEach(card => {
  card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setActive(card); });
  card.addEventListener('focusin', () => setActive(card));
  card.addEventListener('click', e => { if (!e.target.closest('button,a,iframe')) setActive(card); });
 });
 gallery.addEventListener('wheel', e => {
  if (e.target.closest('.preview-window.is-active')) return;
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  const delta = e.deltaY;
  const next = gallery.scrollLeft + delta;
  if ((delta > 0 && gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth - 2) || (delta < 0 && gallery.scrollLeft > 2)) {
   e.preventDefault(); gallery.scrollLeft = next;
  }
 }, {passive:false});
 document.querySelectorAll('[data-gallery-direction]').forEach(button => button.addEventListener('click', () => {
  gallery.scrollBy({left: Number(button.dataset.galleryDirection) * Math.min(gallery.clientWidth * .7, 600), behavior: reduced ? 'instant' : 'smooth'});
 }));
 if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver(entries => {
   if (innerWidth > 700) return;
   const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
   if (visible) setActive(visible.target);
  }, {root:gallery, threshold:[.5,.7,.9]});
  cards.forEach(card => cardObserver.observe(card));
 }
}

// Escala la web real a cada marco y permite explorarla sin bloquear el scroll principal.
const previewWindows = [...document.querySelectorAll('.preview-window')];
const resizePreviews = () => previewWindows.forEach(win => {
 const viewportWidth = innerWidth <= 850 ? Math.max(390, Math.min(innerWidth, 850)) : 1440;
 win.style.setProperty('--preview-width', `${viewportWidth}px`);
 const scale = win.clientWidth / viewportWidth;
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
  button.innerHTML = active
   ? 'Salir de la vista <svg class="ui-icon icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'
   : 'Explorar aquí <svg class="ui-icon icon-diagonal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  win.querySelector('iframe').tabIndex = active ? 0 : -1;
 });
});

// Transición inicial: se omite al tocar el botón y respeta movimiento reducido.
const intro = document.getElementById('intro');
let introFinished = false;
function finishIntro() {
 if (introFinished) return;
 introFinished = true;
 document.body.classList.remove('intro-open');
 intro.classList.add('is-leaving');
 setTimeout(() => {intro.classList.add('is-done');intro.setAttribute('aria-hidden','true');}, reduced ? 0 : 1000);
}
document.getElementById('skip-intro').addEventListener('click',finishIntro);
setTimeout(finishIntro, reduced ? 100 : 2550);
// Profundidad muy suave ligada al scroll. No hay interacción con el puntero.
const hero = document.querySelector('.hero');
const updateHeroDepth = () => {
 if (!hero || reduced) return;
 hero.style.setProperty('--photo-scroll', `${Math.min(65, scrollY * .12)}px`);
};
addEventListener('scroll', updateHeroDepth, {passive:true});updateHeroDepth();
const chapterCount=document.getElementById('chapter-count');
const art=document.querySelector('.work-intro-art');
const chapters=[document.querySelector('.hero'),document.querySelector('#metodo'),document.querySelector('#trabajos'),document.querySelector('#servicios')];
const onChapterScroll=()=>{
 const point=innerHeight*.5;
 let chapter=1;chapters.forEach((el,i)=>{if(el.getBoundingClientRect().top<point)chapter=i+1});
 if(chapterCount)chapterCount.textContent=String(chapter).padStart(2,'0');
 if(art&&!reduced){const r=art.getBoundingClientRect();art.style.setProperty('--art-shift',`${Math.max(-120,Math.min(120,(innerHeight-r.top)*.12))}px`);}
};
addEventListener('scroll',onChapterScroll,{passive:true});onChapterScroll();

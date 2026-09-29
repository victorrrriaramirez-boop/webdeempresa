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
 const counter = document.getElementById('gallery-current');
 const setActive = card => {
  cards.forEach(item => item.classList.toggle('is-selected', item === card));
  if (counter) counter.textContent = String(cards.indexOf(card) + 1).padStart(2, '0');
  requestAnimationFrame(resizePreviews);
 };
 cards.forEach(card => {
  card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setActive(card); });
  card.addEventListener('focusin', () => setActive(card));
  card.addEventListener('click', e => { if (!e.target.closest('button,a')) openProject(card); });
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
 let galleryTicking = false;
 gallery.addEventListener('scroll', () => {
  if (galleryTicking) return;
  galleryTicking = true;
  requestAnimationFrame(() => {
   const center = gallery.getBoundingClientRect().left + (innerWidth <= 700 ? gallery.clientWidth / 2 : Math.min(gallery.clientWidth * .25, 220));
   const nearest = cards.reduce((best, card) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.left + rect.width / 2 - center);
    return distance < best.distance ? {card, distance} : best;
   }, {card:cards[0], distance:Infinity}).card;
   if (nearest && !nearest.classList.contains('is-selected')) setActive(nearest);
   galleryTicking = false;
  });
 }, {passive:true});
 setActive(cards[0]);
}

// Las miniaturas muestran la web escalada; la vista grande usa el ancho real del dispositivo.
const previewWindows = [...document.querySelectorAll('.preview-window')];
function resizePreviews() { previewWindows.forEach(win => {
 const viewportWidth = innerWidth <= 850 ? Math.max(390, Math.min(innerWidth, 850)) : 1440;
 win.style.setProperty('--preview-width', `${viewportWidth}px`);
 const scale = win.clientWidth / viewportWidth;
 win.style.setProperty('--preview-scale', String(scale));
 win.querySelector('iframe').style.height = `${Math.max(900, Math.ceil(win.clientHeight / Math.max(scale,.1)))}px`;
}); }
if ('ResizeObserver' in window) {const ro = new ResizeObserver(resizePreviews);previewWindows.forEach(win => ro.observe(win));}
addEventListener('resize', resizePreviews);resizePreviews();
const modal = document.getElementById('project-modal');
const modalFrame = document.getElementById('modal-frame');
const modalTitle = document.getElementById('modal-title');
const modalExternal = document.getElementById('modal-external');
const modalClose = document.getElementById('modal-close');
let returnFocus = null;
function openProject(card) {
 const url = card.querySelector('.project-link').href;
 returnFocus = document.activeElement === document.body ? card.querySelector('.preview-toggle') : document.activeElement;
 modalTitle.textContent = card.querySelector('.project-n').textContent;
 modalExternal.href = url;
 modalFrame.src = url;
 modal.hidden = false;
 document.body.classList.add('modal-open');
 requestAnimationFrame(() => modal.classList.add('is-open'));
 modalClose.focus();
}
function closeProject() {
 if (modal.hidden) return;
 modal.classList.remove('is-open');
 document.body.classList.remove('modal-open');
 const finish = () => {
  if (modal.classList.contains('is-open')) return;
  modal.hidden = true;
  modalFrame.src = 'about:blank';
  if (returnFocus && returnFocus !== document.body) returnFocus.focus();
 };
 if (reduced) finish(); else setTimeout(finish, 280);
}
document.querySelectorAll('.preview-toggle').forEach(button => button.addEventListener('click', () => openProject(button.closest('[data-project]'))));
modalClose.addEventListener('click', closeProject);
modal.querySelector('[data-close-modal]').addEventListener('click', closeProject);
document.addEventListener('keydown', e => {
 if (modal.hidden) return;
 if (e.key === 'Escape') closeProject();
 if (e.key === 'Tab') {
  const focusable = [modalExternal, modalClose, modalFrame];
  const index = focusable.indexOf(document.activeElement);
  if (e.shiftKey && index === 0) {e.preventDefault();modalFrame.focus();}
  else if (!e.shiftKey && index === 2) {e.preventDefault();modalExternal.focus();}
 }
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

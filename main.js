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
 let navTargetIndex = null;
 const setActive = card => {
  cards.forEach(item => item.classList.toggle('is-selected', item === card));
  if (card && counter) counter.textContent = String(cards.indexOf(card) + 1).padStart(2, '0');
 };
 cards.forEach(card => {
  card.addEventListener('pointerenter', e => {if (e.pointerType === 'mouse' && navTargetIndex === null) setActive(card);});
  card.addEventListener('click', e => { if (!e.target.closest('button,a')) openProject(card); });
 });
 gallery.addEventListener('wheel', e => {
  navTargetIndex = null;
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  const delta = e.deltaY;
  if ((delta > 0 && gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth - 2) || (delta < 0 && gallery.scrollLeft > 2)) {
   e.preventDefault(); gallery.scrollLeft += delta;
  }
 }, {passive:false});
 gallery.addEventListener('touchstart', () => {navTargetIndex = null;}, {passive:true});
 const focusMetrics = () => {
  const box = gallery.getBoundingClientRect();
  const start = gallery.clientWidth * .04 + cards[0].offsetWidth / 2;
  const end = gallery.clientWidth * .96 - cards[cards.length - 1].offsetWidth / 2;
  const max = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
  return {box, start, end, max};
 };
 const focusLine = () => {
  const {box,start,end,max} = focusMetrics();
  return box.left + (innerWidth <= 700 ? gallery.clientWidth / 2 : start + (end - start) * (max ? gallery.scrollLeft / max : 0));
 };
 function moveProject(direction) {
  const selectedIndex = cards.indexOf(gallery.querySelector('.is-selected'));
  const current = navTargetIndex ?? (selectedIndex >= 0 ? selectedIndex : Math.max(0, Number(counter.textContent) - 1));
  const nextIndex = Math.max(0, Math.min(cards.length - 1, current + direction));
  if (nextIndex === current) return;
  const next = cards[nextIndex];
  if (next) {
   navTargetIndex = nextIndex;
   setActive(null);
   const rect = next.getBoundingClientRect();
   const {box,start,end,max} = focusMetrics();
   const contentCenter = gallery.scrollLeft + rect.left + rect.width / 2 - box.left;
   const left = innerWidth <= 700
    ? contentCenter - gallery.clientWidth / 2
    : (contentCenter - start) / (1 + (max ? (end - start) / max : 0));
   gallery.scrollTo({left,behavior:reduced ? 'instant' : 'smooth'});
   if (reduced) requestAnimationFrame(updateGalleryDepth);
  }
 }
 document.querySelectorAll('[data-gallery-direction]').forEach(button => button.addEventListener('click', () => moveProject(Number(button.dataset.galleryDirection))));
 document.addEventListener('keydown', e => {
  if (innerWidth <= 700 || !['ArrowLeft','ArrowRight'].includes(e.key) || e.altKey || e.ctrlKey || e.metaKey || !document.getElementById('project-modal').hidden || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) return;
  const rect = gallery.closest('.projects').getBoundingClientRect();
  if (rect.top > innerHeight * .7 || rect.bottom < innerHeight * .3) return;
  e.preventDefault();
  moveProject(e.key === 'ArrowRight' ? 1 : -1);
 });
 const updateGalleryDepth = () => {
  const line = focusLine();
  let nearest = cards[0];
  let nearestDistance = Infinity;
  cards.forEach(card => {
   const rect = card.getBoundingClientRect();
   const distance = Math.abs(rect.left + rect.width / 2 - line);
   const strength = Math.max(0, 1 - distance / (card.offsetWidth * .85));
   card.style.setProperty('--depth-scale', reduced ? '1' : (1 + strength * (innerWidth <= 700 ? .045 : .055)).toFixed(4));
   if (distance < nearestDistance) {nearest = card; nearestDistance = distance;}
  });
  const target = navTargetIndex === null ? nearest : cards[navTargetIndex];
  const rect = target.getBoundingClientRect();
  const aligned = Math.abs(rect.left + rect.width / 2 - line) < target.offsetWidth * .12;
  if (aligned) {
   if (!target.classList.contains('is-selected')) setActive(target);
   if (navTargetIndex !== null) navTargetIndex = null;
  } else if (gallery.querySelector('.is-selected')) setActive(null);
 };
 let galleryTicking = false;
 gallery.addEventListener('scroll', () => {
  if (galleryTicking) return;
  galleryTicking = true;
  requestAnimationFrame(() => {
   updateGalleryDepth();
   galleryTicking = false;
  });
 }, {passive:true});
 addEventListener('resize', updateGalleryDepth);
 setActive(cards[0]);
 requestAnimationFrame(updateGalleryDepth);
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
const modalClose = document.getElementById('modal-close');
let returnFocus = null;
function openProject(card) {
 const url = card.querySelector('.preview-window iframe').src;
 returnFocus = document.activeElement === document.body ? card.querySelector('.preview-toggle') : document.activeElement;
 modalTitle.textContent = card.querySelector('.project-copy h3').textContent.trim();
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
  const focusable = [modalClose, modalFrame];
  const index = focusable.indexOf(document.activeElement);
  if (e.shiftKey && index === 0) {e.preventDefault();modalFrame.focus();}
  else if (!e.shiftKey && index === 1) {e.preventDefault();modalClose.focus();}
 }
});

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

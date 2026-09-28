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
 const viewportWidth = innerWidth <= 560 ? 390 : 1440;
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
  button.textContent = active ? 'Salir de la vista ✕' : 'Explorar aquí ↗';
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
// Fondo de partículas abstractas: responde al puntero y a la posición de scroll.
const canvas = document.querySelector('.hero-canvas');
const ctx = canvas?.getContext('2d');
const halo = document.querySelector('.cursor-halo');
let px = .5, py = .5, particles = [], animationFrame;
function sizeCanvas() {
 if (!canvas || !ctx) return;
 const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2);
 canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
 ctx.setTransform(dpr,0,0,dpr,0,0);
 particles=Array.from({length:innerWidth<600?22:45},(_,i)=>({x:(i*.61803398875%1)*rect.width,y:(i*.41421356237%1)*rect.height,r:2+(i%6),phase:i*.71}));
}
function drawCanvas(time=0) {
 if (!ctx || !canvas) return;
 const width=canvas.clientWidth,height=canvas.clientHeight;
 ctx.clearRect(0,0,width,height);
 const g=ctx.createRadialGradient(width*(.62+(px-.5)*.15),height*(.5+(py-.5)*.1),10,width*.58,height*.48,width*.7);
 g.addColorStop(0,'#763ee1');g.addColorStop(.42,'#342459');g.addColorStop(1,'#100f1a');ctx.fillStyle=g;ctx.fillRect(0,0,width,height);
 ctx.strokeStyle='#d7ff3733';ctx.lineWidth=1;
 for(let j=0;j<4;j++){ctx.beginPath();const radius=width*(.12+j*.07);ctx.ellipse(width*(.65+(px-.5)*.07),height*(.45+(py-.5)*.05),radius,radius*.72,-.35,0,Math.PI*2);ctx.stroke();}
 particles.forEach(p=>{const x=p.x+Math.sin(time*.0003+p.phase)*16+(px-.5)*14,y=p.y+Math.cos(time*.0004+p.phase)*14+(py-.5)*10;ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fillStyle=p.r>5?'#d7ff3780':'#ffffffa0';ctx.fill();});
 if(!reduced) animationFrame=requestAnimationFrame(drawCanvas);
}
sizeCanvas();drawCanvas();addEventListener('resize',sizeCanvas);
if(!reduced) addEventListener('pointermove',e=>{px=e.clientX/innerWidth;py=e.clientY/innerHeight;if(halo){halo.style.left=e.clientX+'px';halo.style.top=e.clientY+'px';halo.style.opacity='1';}},{passive:true});
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

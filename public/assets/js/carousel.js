const DURATION = 3000; // ← changed from 5000
const slides=document.querySelectorAll('.slide'),dots=document.querySelectorAll('.dot');
let idx=0,tick=null;
function show(n){slides.forEach(s=>s.classList.remove('active'));dots.forEach(d=>d.classList.remove('active'));idx=(n+slides.length)%slides.length;slides[idx].classList.add('active');dots[idx].classList.add('active');}
function next(){show(idx+1);}
function auto(){tick=setInterval(next,DURATION);}
function stop(){clearInterval(tick);}
const hero=document.getElementById('hero');
hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',auto);
document.querySelectorAll('.dot').forEach((d,i)=>d.addEventListener('click',()=>{stop();show(i);auto();}));
window.matchMedia('(prefers-reduced-motion: reduce)').matches?show(0):auto();






















// const DURATION = 5000;
// const slides   = document.querySelectorAll('.slide');
// const dots     = document.querySelectorAll('.dot');
// const hero     = document.getElementById('hero');
// let idx = 0, tick = null;

// function show(n){
//   slides.forEach(s=>s.classList.remove('active'));
//   dots.forEach(d=>d.classList.remove('active'));
//   idx = (n + slides.length) % slides.length;
//   slides[idx].classList.add('active');
//   dots[idx].classList.add('active');
// }
// function next(){ show(idx+1); }
// function auto(){ tick = setInterval(next,DURATION); }
// function stop(){ clearInterval(tick); }

// hero.addEventListener('mouseenter', stop);
// hero.addEventListener('mouseleave', auto);
// document.querySelectorAll('.dot').forEach((d,i)=>{
//   d.addEventListener('click',()=>{ stop(); show(i); auto(); });
// });

// // respect reduced-motion
// const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// reduced ? show(0) : auto();
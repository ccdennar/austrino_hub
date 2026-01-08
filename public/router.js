// ultra-light spa router – works in every browser
(function(){
const routes = {
  '/'                : '/views/home.html',
  '/about'           : '/views/about.html',
  '/blog'            : '/views/blog.html',
  '/careers'         : '/views/careers.html',
  '/contact'         : '/views/contact.html',
  '/services'        : '/views/services/index.html',
  '/services/kubernetes' : '/views/services/kubernetes.html',
  '/services/aws'        : '/views/services/aws.html',
  '/services/devops'     : '/views/services/devops.html',
  '/services/offshore'   : '/views/services/offshore.html'
};
async function load(url){
  const file=routes[url]||routes['/'];
  const html=await fetch(file).then(r=>r.text());
  document.getElementById('app').innerHTML=html;
  window.scrollTo(0,0);
}
window.addEventListener('click',e=>{
  const a=e.target.closest('a[data-link]');
  if(!a) return;
  e.preventDefault();
  history.pushState(null,null,a.href);
  load(location.pathname);
});
window.addEventListener('popstate',()=>load(location.pathname));
// first paint
Promise.all([
  fetch('components/header.html').then(r=>r.text()).then(h=>header.innerHTML=h),
  fetch('components/footer.html').then(r=>r.text()).then(h=>footer.innerHTML=h)
]).then(()=>load(location.pathname));
})();
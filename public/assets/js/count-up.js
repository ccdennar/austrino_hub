// count-up on scroll (lodash-throttle optional)
const counters = document.querySelectorAll('.stat-val');
const updateCount = el => {
  const target = +el.getAttribute('data-target');
  const increment = target / 120;
  let count = 0;
  const tick = () => {
    count += increment;
    if (count < target) { el.textContent = Math.floor(count); requestAnimationFrame(tick); }
    else el.textContent = target;
  };
  tick();
};

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) updateCount(entry.target); });
}, { threshold: .6 });
counters.forEach(c => io.observe(c));
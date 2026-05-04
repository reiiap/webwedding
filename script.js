const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileNav');
const mq = window.matchMedia('(max-width: 980px)');

const setMenuState = (isOpen) => {
  burger?.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.classList.toggle('open', isOpen);
};

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const shouldOpen = burger.getAttribute('aria-expanded') !== 'true';
    requestAnimationFrame(() => setMenuState(shouldOpen));
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      requestAnimationFrame(() => setMenuState(false));
    }
  });

  mq.addEventListener('change', (event) => {
    if (!event.matches) setMenuState(false);
  });
}


const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item) => io.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

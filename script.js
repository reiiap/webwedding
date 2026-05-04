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

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

const slides = [...document.querySelectorAll('[data-slide]')];
const dotsWrap = document.querySelector('[data-slider-dots]');
let activeSlide = 0;
let sliderTimer;

const renderSlide = (index) => {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
  dotsWrap?.querySelectorAll('button').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeSlide));
};

const startSlider = () => {
  if (slides.length < 2) return;
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => renderSlide(activeSlide + 1), 5000);
};

if (slides.length && dotsWrap) {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Lihat slide ${index + 1}`);
    dot.addEventListener('click', () => {
      renderSlide(index);
      startSlider();
    });
    dotsWrap.appendChild(dot);
  });
  document.querySelector('[data-slider-prev]')?.addEventListener('click', () => {
    renderSlide(activeSlide - 1);
    startSlider();
  });
  document.querySelector('[data-slider-next]')?.addEventListener('click', () => {
    renderSlide(activeSlide + 1);
    startSlider();
  });
  renderSlide(0);
  startSlider();
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

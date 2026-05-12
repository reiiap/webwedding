const params = new URLSearchParams(window.location.search);
const fallbackGuest = document.body.dataset.guest || 'Tamu Undangan';
const pathGuest = decodeURIComponent(window.location.pathname.split('/').filter(Boolean).pop() || '').replace(/[-_]+/g, ' ');
const guestName = params.get('to') || (pathGuest && pathGuest !== document.body.dataset.theme ? pathGuest : fallbackGuest);
document.querySelectorAll('[data-guest]').forEach((item) => { item.textContent = guestName; });

document.querySelector('[data-open-invitation]')?.addEventListener('click', () => {
  document.querySelector('#opening')?.scrollIntoView({ behavior: 'smooth' });
});

const targetDate = new Date(document.body.dataset.eventDate || '2026-12-19T09:00:00+07:00');
const countdownItems = document.querySelectorAll('[data-countdown] strong');
const updateCountdown = () => {
  const diff = Math.max(targetDate.getTime() - Date.now(), 0);
  const values = [Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)];
  values.forEach((value, index) => { if (countdownItems[index]) countdownItems[index].textContent = String(value).padStart(2, '0'); });
};
updateCountdown();
setInterval(updateCountdown, 1000);

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

document.querySelector('[data-music]')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const active = button.dataset.active === 'true';
  button.dataset.active = String(!active);
  button.textContent = active ? '♪' : '❚❚';
});

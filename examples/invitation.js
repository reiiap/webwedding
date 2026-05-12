const params = new URLSearchParams(window.location.search);
const guestName = params.get('to') || 'Guest Name';
document.querySelectorAll('[data-guest]').forEach((item) => {
  item.textContent = guestName;
});

const coverButton = document.querySelector('[data-open-invitation]');
coverButton?.addEventListener('click', () => {
  document.querySelector('#opening')?.scrollIntoView({ behavior: 'smooth' });
});

const targetDate = new Date(document.body.dataset.eventDate || '2026-12-19T09:00:00+07:00');
const countdownItems = document.querySelectorAll('[data-countdown] strong');
const updateCountdown = () => {
  const diff = Math.max(targetDate.getTime() - Date.now(), 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  [days, hours, minutes, seconds].forEach((value, index) => {
    if (countdownItems[index]) countdownItems[index].textContent = String(value).padStart(2, '0');
  });
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

const musicButton = document.querySelector('[data-music]');
musicButton?.addEventListener('click', () => {
  const active = musicButton.dataset.active === 'true';
  musicButton.dataset.active = String(!active);
  musicButton.textContent = active ? '♪' : '❚❚';
});

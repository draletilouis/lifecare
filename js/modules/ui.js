/* Small page behaviours shared by every page: back-to-top, the homepage finder,
   the on-this-page highlight, and maps that load only when asked for. */

(function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;
  window.addEventListener('scroll', () => {
    button.classList.toggle('is-visible', window.scrollY > 700);
  }, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* Highlights the section of a long page that is on screen in its table of contents. */
(function initToc() {
  const links = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((section) => observer.observe(section));
})();

/* "I need …" finder on the homepage: go straight to the page for the chosen task.
   Without JavaScript the form opens the departments page instead. */
(function initFinder() {
  document.querySelectorAll('form[data-finder]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = form.querySelector('select').value;
      if (target.startsWith('/')) window.location.href = target;
    });
  });
})();

/* Google Maps is about a megabyte on a phone, so the map loads only when a visitor asks for it. */
(function initMaps() {
  document.querySelectorAll('[data-map-load]').forEach((button) => {
    button.addEventListener('click', () => {
      const map = button.closest('.map');
      const frame = document.createElement('iframe');
      frame.src = button.dataset.src;
      frame.title = 'Map showing the location of Life Care Hospital';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      map.appendChild(frame);
      map.querySelector('.map__placeholder')?.remove();
    });
  });
})();

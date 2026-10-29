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

/* Figures such as "56 professional staff" count up from zero once, when they come into view.
   The real number is already in the page, so without JavaScript, or for anyone who prefers reduced
   motion, it simply shows. */
(function initCountUp() {
  const figures = Array.from(document.querySelectorAll('[data-count-to]'));
  if (!figures.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const run = (el) => {
    const target = Number(el.dataset.countTo);
    const duration = 1000;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * ease(t)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // The page is built with the final figures, so visitors without JavaScript still see them.
  figures.forEach((el) => { el.textContent = '0'; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      // In the homepage hero, wait for the figures to finish rising into place.
      setTimeout(() => run(entry.target), entry.target.closest('.hero') ? 250 : 0);
    });
  }, { threshold: 0.6 });
  figures.forEach((el) => observer.observe(el));
})();


/* Navigation: scroll shadow, desktop dropdown menus and the mobile panel. */
(function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdownItems = Array.from(document.querySelectorAll('.has-dropdown'));
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Desktop dropdowns: open on hover or click, close on outside click or Escape. */
  const closeAll = (except) => {
    dropdownItems.forEach((item) => {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('.nav__link')?.setAttribute('aria-expanded', 'false');
    });
  };

  const hoverCapable = window.matchMedia('(hover: hover)').matches;

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav__link');
    if (!trigger) return;
    let hoverTimer;

    const open = () => {
      closeAll(item);
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    /* The trigger opens its menu; the menu itself links to the section's main page. */
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const fromKeyboard = event.detail === 0;
      if ((hoverCapable && !fromKeyboard) || !item.classList.contains('is-open')) {
        open();
      } else {
        close();
      }
    });

    if (hoverCapable) {
      item.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        open();
      });
      item.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(close, 160);
      });
    }

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) close();
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.has-dropdown')) closeAll();
  });

  /* Mobile panel */
  const toggleMobile = (force) => {
    if (!mobileMenu || !hamburger) return;
    const isOpen = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('is-open');
    /* The panel starts just below the header, wherever the top bar has scrolled to. */
    if (isOpen) mobileMenu.style.setProperty('--menu-top', `${Math.max(0, nav.getBoundingClientRect().bottom)}px`);
    mobileMenu.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.querySelectorAll('main, .footer, .topbar, .whatsapp-float, .back-to-top, .action-bar').forEach((el) => {
      el.inert = isOpen;
    });
  };

  hamburger?.addEventListener('click', () => toggleMobile());
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMobile(false)));
  nav.querySelector('.brand')?.addEventListener('click', () => toggleMobile(false));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openItem = dropdownItems.find((item) => item.classList.contains('is-open'));
    const focusWasInMenu = openItem?.contains(document.activeElement);
    closeAll();
    if (focusWasInMenu) openItem.querySelector('.nav__link')?.focus();
    if (mobileMenu?.classList.contains('is-open')) {
      toggleMobile(false);
      hamburger?.focus();
    }
  });

  /* Close every menu before the page enters the back/forward cache. */
  window.addEventListener('pagehide', () => {
    closeAll();
    toggleMobile(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && mobileMenu?.classList.contains('is-open')) toggleMobile(false);
  });
})();

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Restore the visitor's color preference and keep the control in sync.
  function initTheme() {
    const button = document.getElementById('theme-toggle');
    const icon = button.querySelector('.theme-toggle__icon');
    const saved = localStorage.getItem('nicole-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    function applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      icon.textContent = theme === 'dark' ? '☀' : '☾';
    }

    applyTheme(saved === 'dark' || saved === 'light' ? saved : preferred);
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('nicole-theme', next);
    });
  }

  // Open and close the mobile menu, including keyboard dismissal.
  function initNavigation() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = links.querySelectorAll('a[href^="#"]');
    if (!('IntersectionObserver' in window)) return;
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Reveal content and fill skills only when they enter the viewport.
  function initReveal() {
    const revealItems = document.querySelectorAll('.reveal');
    const skills = document.querySelectorAll('[data-skill]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      skills.forEach(skill => skill.classList.add('is-filled'));
      return;
    }
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-filled');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    skills.forEach(skill => skillObserver.observe(skill));
  }

  // Filter showcased projects while preserving accessible button state.
  function initProjectFilter() {
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.project-card[data-category]');
    const empty = document.getElementById('projects-empty');
    buttons.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.filter;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let visibleCount = 0;
      cards.forEach(card => {
        const matches = category === 'all' || card.dataset.category.split(' ').includes(category);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      empty.hidden = visibleCount > 0;
    }));
  }

  // Show initials whenever the optional portrait file is unavailable.
  function initProfileImage() {
    const image = document.getElementById('profile-image');
    const showInitials = () => image.classList.add('is-missing');
    image.addEventListener('error', showInitials);
    if (image.complete && image.naturalWidth === 0) showInitials();
  }

  // Update the reading indicator and return-to-top control with one passive listener.
  function initScrollUi() {
    const progress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    let ticking = false;
    function update() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
      backToTop.classList.toggle('is-visible', window.scrollY > 550);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Remove the short loading cover when the document is ready.
  function initLoader() {
    const loader = document.getElementById('loader');
    const hide = () => {
      loader.classList.add('is-hidden');
      window.setTimeout(() => loader.remove(), reducedMotion ? 0 : 500);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
  }

  initTheme();
  initNavigation();
  initReveal();
  initProjectFilter();
  initProfileImage();
  initScrollUi();
  initLoader();
  document.getElementById('year').textContent = new Date().getFullYear();
})();

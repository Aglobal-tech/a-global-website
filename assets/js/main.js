// American Open University Nigeria (A-Global) — static site behavior
// Reimplements the interactive pieces of the original React/Vite app:
// mobile nav toggle, home-page hero carousel, and the Fees & Aid FAQ accordion.
(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  function initMobileNav() {
    var toggle = document.querySelector('header button[aria-label="Toggle menu"]');
    var nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var isHidden = nav.classList.contains('hidden');
      if (isHidden) {
        nav.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        nav.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Home page hero carousel ---------- */
  var SLIDES = [
    {
      id: 'campus-exterior',
      image: 'assets/images/slide-1.jpg',
      imagePosition: 'center',
      headline: 'Education for the Future of Work.',
      text: 'Welcome to American Open University, where we provide skills-based, technology-driven education that prepares you to thrive in the global interconnected economy.',
      ctaLabel: 'Explore our programs',
      ctaHref: 'academics.html',
      ctaExternal: false
    },
    {
      id: 'student-community',
      image: 'assets/images/slide-222.jpg',
      imagePosition: 'center 40%',
      headline: 'Beyond a Degree, Earn Respect.',
      text: 'Achieve a prestigious, highly respected credential that sets you apart.',
      ctaLabel: 'Explore our programs',
      ctaHref: 'academics.html',
      ctaExternal: false
    },
    {
      id: 'technology-lab',
      image: 'assets/images/slide-3-graduate.jpg',
      imagePosition: '60% center',
      headline: 'Graduate with Dual Certifications.',
      text: 'Gain a competitive edge with dual certifications backed by industry leaders like Google and Cisco.',
      ctaLabel: 'Apply to A-Global',
      ctaHref: 'https://portal.aouniversity.edu.ng',
      ctaExternal: true
    }
  ];

  function initHeroCarousel() {
    var section = document.querySelector('section[aria-roledescription="carousel"]');
    if (!section) return;

    var img = section.querySelector('img');
    var h1 = section.querySelector('h1');
    var p = section.querySelector('p');
    var cta = section.querySelector('a.group, a[href="academics.html"], a[href="https://portal.aouniversity.edu.ng"]');
    var tabs = Array.prototype.slice.call(section.querySelectorAll('[role="tab"]'));
    var prevBtn = section.querySelector('button[aria-label="Previous slide"]');
    var nextBtn = section.querySelector('button[aria-label="Next slide"]');

    if (!img || !h1 || !p || tabs.length === 0) return;

    var current = 1; // matches the captured DOM state (slide 2 active)
    var timer = null;

    function render(index) {
      var slide = SLIDES[index];
      img.src = slide.image;
      if (slide.imagePosition) {
        img.style.objectPosition = slide.imagePosition;
      }
      h1.textContent = slide.headline;
      p.textContent = slide.text;
      if (cta) {
        cta.textContent = '';
        var span = document.createElement('span');
        span.textContent = slide.ctaLabel;
        cta.appendChild(span);
        cta.href = slide.ctaHref;
        if (slide.ctaExternal) {
          cta.setAttribute('target', '_blank');
          cta.setAttribute('rel', 'noreferrer');
        } else {
          cta.removeAttribute('target');
          cta.removeAttribute('rel');
        }
      }
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.classList.toggle('w-10', active);
        tab.classList.toggle('bg-accent', active);
        tab.classList.toggle('w-2', !active);
        tab.classList.toggle('bg-primary-foreground/50', !active);
      });
      current = index;
    }

    function goTo(index) {
      var n = SLIDES.length;
      var next = ((index % n) + n) % n;
      render(next);
      resetTimer();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { goTo(i); });
    });
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    resetTimer();
  }

  /* ---------- Navbar "About" / "Academics" dropdown menus ---------- */
  function initNavDropdowns() {
    var wrappers = Array.prototype.slice.call(document.querySelectorAll('header nav > div.relative'));
    if (!wrappers.length) return;

    function panelOf(w) { return w.querySelector(':scope > div.nav-dropdown'); }
    function triggerOf(w) { return w.querySelector(':scope > a'); }
    function iconOf(w) { var t = triggerOf(w); return t ? t.querySelector('svg') : null; }

    function setWrapperState(wrapper, isOpen) {
      var p = panelOf(wrapper), t = triggerOf(wrapper), icon = iconOf(wrapper);
      if (p) p.classList.toggle('hidden', !isOpen);
      if (t) t.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (icon) icon.classList.toggle('rotate-180', isOpen);
      if (!isOpen && p) {
        // Collapse any nested flyout (e.g. Undergraduate Programs -> colleges)
        // so it doesn't reappear pre-opened next time this panel is shown.
        Array.prototype.slice.call(p.querySelectorAll(':scope > .nav-subwrap')).forEach(function (sub) {
          var subPanel = sub.querySelector(':scope > .nav-subdropdown');
          var subTrigger = sub.querySelector(':scope > a');
          if (subPanel) subPanel.classList.add('hidden');
          if (subTrigger) subTrigger.setAttribute('aria-expanded', 'false');
        });
      }
    }

    function closeAll(except) {
      wrappers.forEach(function (w) {
        if (w !== except) setWrapperState(w, false);
      });
    }

    wrappers.forEach(function (wrapper) {
      var trigger = triggerOf(wrapper);
      var panel = panelOf(wrapper);
      if (!trigger || !panel) return;
      var closeTimer = null;

      function open() {
        clearTimeout(closeTimer);
        closeAll(wrapper);
        setWrapperState(wrapper, true);
      }
      function close() {
        setWrapperState(wrapper, false);
      }
      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 200);
      }

      wrapper.addEventListener('mouseenter', open);
      wrapper.addEventListener('mouseleave', scheduleClose);
      wrapper.addEventListener('focusin', open);
      wrapper.addEventListener('focusout', function (e) {
        if (!wrapper.contains(e.relatedTarget)) close();
      });
      trigger.addEventListener('click', function (e) {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (!isOpen) {
          // First click/tap reveals the menu instead of navigating away;
          // a second click on an already-open trigger follows the link.
          e.preventDefault();
          open();
        }
      });
    });

    document.addEventListener('click', function (e) {
      wrappers.forEach(function (wrapper) {
        if (!wrapper.contains(e.target)) setWrapperState(wrapper, false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll(null);
    });
  }

  /* ---------- Nested flyout submenus (e.g. Academics -> Undergraduate Programs -> colleges) ---------- */
  // These sit beside their parent dropdown item (to the right) rather than
  // stacking inline, opening on hover/focus and on a first click/tap.
  function initNavFlyouts() {
    var wrappers = Array.prototype.slice.call(document.querySelectorAll('.nav-subwrap'));
    if (!wrappers.length) return;

    wrappers.forEach(function (wrapper) {
      var trigger = wrapper.querySelector(':scope > a');
      var panel = wrapper.querySelector(':scope > .nav-subdropdown');
      if (!trigger || !panel) return;
      var closeTimer = null;

      function open() {
        clearTimeout(closeTimer);
        panel.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
      }
      function close() {
        panel.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
      }
      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 200);
      }

      wrapper.addEventListener('mouseenter', open);
      wrapper.addEventListener('mouseleave', scheduleClose);
      wrapper.addEventListener('focusin', open);
      wrapper.addEventListener('focusout', function (e) {
        if (!wrapper.contains(e.relatedTarget)) close();
      });
      trigger.addEventListener('click', function (e) {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (!isOpen) {
          // First click/tap reveals the submenu instead of navigating away;
          // a second click on an already-open trigger follows the link.
          e.preventDefault();
          e.stopPropagation();
          open();
        }
      });
    });

    document.addEventListener('click', function (e) {
      wrappers.forEach(function (wrapper) {
        if (!wrapper.contains(e.target)) {
          var trigger = wrapper.querySelector(':scope > a');
          var panel = wrapper.querySelector(':scope > .nav-subdropdown');
          if (panel) panel.classList.add('hidden');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---------- Click-to-expand cards (faculty / leadership / program pages) ---------- */
  // Accordion behaviour: opening a card collapses any other card that's
  // currently open in the same grid, so at most one card is expanded at a
  // time (matching a normal expand/collapse list rather than letting every
  // clicked card pile up open).
  function initExpandableCards() {
    var cards = document.querySelectorAll('[role="button"][aria-expanded]');
    var entries = [];

    cards.forEach(function (card) {
      var panel = null;
      for (var i = 0; i < card.children.length; i++) {
        var c = card.children[i];
        if (c.classList.contains('overflow-hidden') && c.classList.contains('bg-card')) { panel = c; break; }
      }
      if (!panel) return;
      var icon = card.querySelector('svg.lucide-arrow-right, svg.lucide-chevron-down');
      var rotateEl = icon;
      var rotateClass = 'rotate-90';
      if (icon && icon.classList.contains('lucide-chevron-down')) {
        rotateClass = 'rotate-180';
        var iconWrap = icon.closest('.transition-transform');
        if (iconWrap && iconWrap !== icon) rotateEl = iconWrap;
      }
      var group = card.closest('.grid') || document.body;
      panel.style.transition = 'height 0.35s ease, opacity 0.3s ease';

      function setExpanded(willOpen) {
        card.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (rotateEl) rotateEl.classList.toggle(rotateClass, willOpen);
        if (willOpen) {
          var target = panel.scrollHeight;
          panel.style.height = target + 'px';
          panel.style.opacity = '1';
          var onEnd = function (e) {
            if (e.target !== panel || e.propertyName !== 'height') return;
            if (card.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
            panel.removeEventListener('transitionend', onEnd);
          };
          panel.addEventListener('transitionend', onEnd);
        } else {
          var current = panel.getBoundingClientRect().height;
          panel.style.height = current + 'px';
          void panel.offsetHeight; // force reflow so the collapse transitions
          requestAnimationFrame(function () {
            panel.style.height = '0px';
            panel.style.opacity = '0';
          });
        }
      }

      var entry = { card: card, group: group, setExpanded: setExpanded };
      entries.push(entry);

      function toggle() {
        var willOpen = card.getAttribute('aria-expanded') !== 'true';
        if (willOpen) {
          entries.forEach(function (other) {
            if (other !== entry && other.group === group && other.card.getAttribute('aria-expanded') === 'true') {
              other.setExpanded(false);
            }
          });
        }
        setExpanded(willOpen);
      }

      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return; // let the LinkedIn link navigate normally
        toggle();
      });
      card.addEventListener('keydown', function (e) {
        if (e.target !== card) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ---------- Fees & Aid FAQ accordion ---------- */
  function initFaqAccordion() {
    var faqSection = document.getElementById('faq');
    if (!faqSection) return;
    var triggers = faqSection.querySelectorAll('button[id^="radix-"]');
    if (!triggers.length) return;
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var btnId = btn.getAttribute('id');
        var panel = btnId ? faqSection.querySelector('[aria-labelledby="' + btnId + '"]') : null;
        var expanded = btn.getAttribute('aria-expanded') === 'true' || btn.getAttribute('data-state') === 'open';
        var willOpen = !expanded;

        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        btn.setAttribute('data-state', willOpen ? 'open' : 'closed');

        if (panel) {
          panel.setAttribute('data-state', willOpen ? 'open' : 'closed');
          if (willOpen) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', '');
          }
        }

        var icon = btn.querySelector('svg');
        if (icon) {
          icon.style.transform = willOpen ? 'rotate(180deg)' : '';
        }
      });
    });
  }

  /* ---------- Forms with no backend: prevent navigation, show inline note ---------- */
  function initNoOpForms() {
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initHeroCarousel();
    initNavDropdowns();
    initNavFlyouts();
    initExpandableCards();
    initFaqAccordion();
    initNoOpForms();
  });
})();

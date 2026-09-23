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

  /* ---------- Program detail accordions (B.Sc. colleges + Master's) ---------- */
  // Reusable component. Any element with data-program="<id>" becomes an
  // expandable program card whose details are rendered from
  // window.AGLOBAL_PROGRAMS (assets/js/programs-data.js).
  //  - A card that already has its header/handbook markup just gets its
  //    details panel filled in.
  //  - An empty <div data-program="id"></div> is rendered in full from data,
  //    so new programs can be added without writing any card markup.
  // Only one program per list is open at a time; the handbook link sits
  // outside the toggle button so it never opens/closes the card.
  var ICON_CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down size-4" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';
  var ICON_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
  var ICON_DOWNLOAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download size-4" aria-hidden="true"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>';

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function checkList(items, listClass) {
    if (!items || !items.length) return '';
    return '<ul class="' + listClass + '">' + items.map(function (item) {
      var body = (item && typeof item === 'object')
        ? '<span><strong class="font-semibold text-primary">' + esc(item.title) + '</strong>' +
          (item.text ? '<span class="program-card__sub"> ' + esc(item.text) + '</span>' : '') + '</span>'
        : '<span>' + esc(item) + '</span>';
      return '<li class="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">' + ICON_CHECK + body + '</li>';
    }).join('') + '</ul>';
  }

  function section(title, inner, extraClass) {
    if (!inner) return '';
    return '<div class="program-card__section ' + (extraClass || '') + '"><h4 class="eyebrow text-primary">' + esc(title) + '</h4>' + inner + '</div>';
  }

  function renderProgramDetails(p) {
    var html = '<div class="border-t border-border p-7">';

    if (p.facts && p.facts.length) {
      html += '<dl class="program-card__facts grid gap-4 ' + (p.facts.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3') + '">' + p.facts.map(function (f) {
        return '<div class="rounded-2xl bg-mist p-4"><dt class="text-[0.65rem] font-black uppercase tracking-widest text-primary/60">' +
          esc(f.label) + '</dt><dd class="mt-1 text-sm font-semibold text-primary">' + esc(f.value) + '</dd></div>';
      }).join('') + '</dl>';
    }

    if (p.overview) {
      html += section('Program overview', '<p class="mt-4 text-sm leading-relaxed text-muted-foreground">' + esc(p.overview) + '</p>', 'mt-8');
    }

    var studyHtml = section('What you will study', checkList(p.study, 'mt-4 space-y-2.5'));
    var careerInner = checkList(p.careers, 'mt-4 space-y-2.5');
    if (p.industries) {
      careerInner += '<p class="mt-4 text-xs leading-relaxed text-muted-foreground"><span class="font-bold text-primary">Industries:</span> ' + esc(p.industries) + '</p>';
    }
    var careerHtml = section('Career outcomes', careerInner);
    if (studyHtml || careerHtml) {
      html += '<div class="mt-8 grid gap-8 border-t border-border pt-6 sm:grid-cols-2">' + studyHtml + careerHtml + '</div>';
    }

    if (p.specializations && p.specializations.length) {
      html += section(p.specializationsLabel || 'Specializations',
        '<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">' + p.specializations.map(function (sp) {
          return '<div class="rounded-2xl border border-border p-5"><p class="text-sm font-bold text-primary">' + esc(sp.name) + '</p>' +
            (sp.text ? '<p class="mt-2 text-sm leading-relaxed text-muted-foreground">' + esc(sp.text) + '</p>' : '') + '</div>';
        }).join('') + '</div>', 'mt-8 border-t border-border pt-6');
    }

    html += section('Admission requirements', checkList(p.admission, 'mt-4 grid gap-2.5 sm:grid-cols-2'), 'mt-8 border-t border-border pt-6');

    var certHtml = section('Professional certifications', checkList(p.certifications, 'mt-4 space-y-2.5'));
    var pracHtml = section('Practical learning', checkList(p.practical, 'mt-4 space-y-2.5'));
    if (certHtml || pracHtml) {
      html += '<div class="mt-8 grid gap-8 border-t border-border pt-6 sm:grid-cols-2">' + certHtml + pracHtml + '</div>';
    }

    return html + '</div>';
  }

  function renderProgramCard(el, id, p) {
    var root = window.AGLOBAL_SITE_ROOT || '';
    var hb = p.handbook || {};
    var eyebrow = p.level === 'bsc' ? '<span class="eyebrow text-accent">B.Sc.</span>' : '';
    el.className = (el.className ? el.className + ' ' : '') + 'card-lift overflow-hidden rounded-3xl border border-border bg-card program-card';
    el.innerHTML =
      '<button type="button" aria-expanded="false" aria-controls="program-details-' + esc(id) + '" class="program-card__toggle flex w-full cursor-pointer items-start gap-4 p-7 text-left">' +
        '<div class="min-w-0 flex-1">' + eyebrow +
          '<h3 class="' + (eyebrow ? 'mt-2 ' : '') + 'text-lg font-bold text-primary">' + esc(p.name) + '</h3>' +
          '<p class="mt-3 text-sm leading-relaxed text-muted-foreground">' + esc(p.shortDescription) + '</p>' +
        '</div>' +
        '<span class="grid size-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-transform duration-300 ">' + ICON_CHEVRON + '</span>' +
      '</button>' +
      '<div id="program-details-' + esc(id) + '" class="program-card__details overflow-hidden" data-program-details role="region" aria-label="' + esc(p.name) + ' program details" style="height: 0px; opacity: 0;"></div>' +
      (hb.url ?
      '<div class="program-card__handbook border-t border-border p-7"><div class="flex flex-col items-start gap-2">' +
        '<a href="' + esc(root + hb.url) + '" download="' + esc(hb.fileName || '') + '" class="surface-copper group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-copper transition-transform duration-300 hover:-translate-y-1">' + ICON_DOWNLOAD + 'Download Program Handbook</a>' +
        '<p class="text-xs text-muted-foreground">' + esc(hb.note || ('PDF · ' + p.name + ' program brochure and handbook.')) + '</p>' +
      '</div></div>' : '');
  }

  function initProgramAccordions() {
    var data = window.AGLOBAL_PROGRAMS || {};
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-program]'));
    if (!cards.length) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var entries = [];

    cards.forEach(function (card) {
      var id = card.getAttribute('data-program');
      var p = data[id];
      var btn = card.querySelector('.program-card__toggle') || card.querySelector(':scope > button[aria-expanded]');

      if (!btn) {
        if (!p) return;
        renderProgramCard(card, id, p);
        btn = card.querySelector('.program-card__toggle');
      }

      var panel = card.querySelector('[data-program-details]');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'program-details-' + id;
        panel.className = 'program-card__details overflow-hidden';
        panel.setAttribute('data-program-details', '');
        panel.style.height = '0px';
        panel.style.opacity = '0';
        btn.insertAdjacentElement('afterend', panel);
        btn.setAttribute('aria-controls', panel.id);
      }
      if (!p) {
        // No data yet for this program: leave the card as a static summary.
        btn.removeAttribute('aria-expanded');
        btn.classList.remove('cursor-pointer');
        var chev = btn.querySelector('.transition-transform');
        if (chev) chev.style.display = 'none';
        return;
      }

      panel.innerHTML = renderProgramDetails(p);
      panel.hidden = true;

      var chevWrap = btn.querySelector('svg.lucide-chevron-down');
      chevWrap = chevWrap ? (chevWrap.closest('.transition-transform') || chevWrap) : null;
      var group = card.closest('[data-program-list]') || card.closest('.grid') || document.body;

      function setExpanded(open, instant) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        card.classList.toggle('is-open', open);
        if (chevWrap) {
          chevWrap.classList.toggle('rotate-180', open);
          chevWrap.classList.toggle('bg-mist', open);
        }
        if (panel._onEnd) { panel.removeEventListener('transitionend', panel._onEnd); panel._onEnd = null; }

        if (instant || reduceMotion) {
          panel.hidden = !open;
          panel.style.height = open ? 'auto' : '0px';
          panel.style.opacity = open ? '1' : '0';
          return;
        }

        if (open) {
          panel.hidden = false;
          panel.style.height = '0px';
          void panel.offsetHeight;
          panel.style.height = panel.scrollHeight + 'px';
          panel.style.opacity = '1';
          panel._onEnd = function (e) {
            if (e.target !== panel || e.propertyName !== 'height') return;
            panel.style.height = 'auto';
            panel.removeEventListener('transitionend', panel._onEnd);
            panel._onEnd = null;
          };
        } else {
          panel.style.height = panel.getBoundingClientRect().height + 'px';
          void panel.offsetHeight;
          panel.style.height = '0px';
          panel.style.opacity = '0';
          panel._onEnd = function (e) {
            if (e.target !== panel || e.propertyName !== 'height') return;
            if (btn.getAttribute('aria-expanded') !== 'true') panel.hidden = true;
            panel.removeEventListener('transitionend', panel._onEnd);
            panel._onEnd = null;
          };
        }
        panel.addEventListener('transitionend', panel._onEnd);
      }

      var entry = { card: card, group: group, btn: btn, setExpanded: setExpanded };
      entries.push(entry);
      setExpanded(false, true);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';
        if (willOpen) {
          entries.forEach(function (other) {
            if (other !== entry && other.group === group && other.btn.getAttribute('aria-expanded') === 'true') {
              other.setExpanded(false, true); // close instantly so the page doesn't jump mid-animation
            }
          });
        }
        setExpanded(willOpen);
        if (willOpen) {
          // Keep the opened card's header in view if closing another card shifted the layout.
          var top = card.getBoundingClientRect().top;
          if (top < 80) {
            window.scrollTo({ top: window.pageYOffset + top - 120, behavior: reduceMotion ? 'auto' : 'smooth' });
          }
        }
      });

      // Handbook links live outside the toggle; stop bubbling anyway so no
      // ancestor click handler can ever treat a download as a toggle.
      Array.prototype.forEach.call(card.querySelectorAll('.program-card__handbook a'), function (a) {
        a.addEventListener('click', function (e) { e.stopPropagation(); });
      });
    });

    // Open a program directly from a link such as technology.html#program-data-science
    var hash = (window.location.hash || '').replace(/^#program-/, '');
    if (hash) {
      entries.forEach(function (en) {
        if (en.card.getAttribute('data-program') === hash) {
          en.setExpanded(true, true);
          setTimeout(function () { en.card.scrollIntoView({ block: 'start' }); }, 50);
        }
      });
    }
  }

  /* ---------- Fees & Aid FAQ accordion ---------- */
  // Single-open accordion: opening a question closes whichever question was
  // open before it. Clicking an open question closes it.
  function initFaqAccordion() {
    var faqSection = document.getElementById('faq');
    if (!faqSection) return;
    var triggers = Array.prototype.slice.call(faqSection.querySelectorAll('button[id^="radix-"]'));
    if (!triggers.length) return;

    function isOpen(btn) {
      return btn.getAttribute('aria-expanded') === 'true' || btn.getAttribute('data-state') === 'open';
    }

    function setState(btn, open) {
      var state = open ? 'open' : 'closed';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('data-state', state);

      // Keep the item wrapper and heading in sync (Radix data-state markup).
      var heading = btn.closest('h3');
      if (heading) heading.setAttribute('data-state', state);
      var item = heading ? heading.parentElement : null;
      if (item && item !== faqSection) item.setAttribute('data-state', state);

      var btnId = btn.getAttribute('id');
      var panel = btnId ? faqSection.querySelector('[aria-labelledby="' + btnId + '"]') : null;
      if (panel) {
        panel.setAttribute('data-state', state);
        if (open) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', '');
      }

      var icon = btn.querySelector('svg');
      if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var willOpen = !isOpen(btn);
        if (willOpen) {
          triggers.forEach(function (other) {
            if (other !== btn && isOpen(other)) setState(other, false);
          });
        }
        setState(btn, willOpen);
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
    initProgramAccordions();
    initFaqAccordion();
    initNoOpForms();
  });
})();

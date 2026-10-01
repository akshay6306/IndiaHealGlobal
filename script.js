/* ============================================================
   HEALIN INDIA – script.js
   Interactive behaviours: nav, filters, tabs, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------
     1. Sticky Header – add shadow on scroll
  ------------------------------------------------ */
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ------------------------------------------------
     2. Mobile Navigation Toggle
  ------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate bars
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });


  /* ------------------------------------------------
     3. Treatment Package Filters
  ------------------------------------------------ */
  const pkgFilterBtns = document.querySelectorAll('.filter-btn');
  const pkgCards      = document.querySelectorAll('.pkg-card');

  pkgFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      pkgFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pkgCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ------------------------------------------------
     4. Hospital City Filters
  ------------------------------------------------ */
  const hospFilterBtns = document.querySelectorAll('.filter-btn-hosp');
  const hospCards      = document.querySelectorAll('.hosp-card');

  hospFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hospFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const city = btn.dataset.city;

      hospCards.forEach(card => {
        const cardCity = card.dataset.city;
        if (city === 'all' || cardCity === city) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ------------------------------------------------
     5. Recovery Stay Tabs
  ------------------------------------------------ */
  const recTabs   = document.querySelectorAll('.rec-tab');
  const recPanels = document.querySelectorAll('.rec-panel');

  recTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update tabs
      recTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      const hospital = tab.dataset.hospital;
      recPanels.forEach(panel => {
        if (panel.id === `rec-${hospital}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* ------------------------------------------------
     6. Contact Form Submission (simulated)
  ------------------------------------------------ */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple client-side validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (field.type === 'checkbox') {
          if (!field.checked) {
            valid = false;
            field.closest('.form-group').style.outline = '2px solid #e63946';
          }
        } else if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e63946';
        }
      });

      if (!valid) {
        // Shake animation
        form.style.animation = 'shake 0.4s ease';
        setTimeout(() => { form.style.animation = ''; }, 400);
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        Sending…
      `;

      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1800);
    });
  }


  /* ------------------------------------------------
     7. Smooth Scroll for Anchor Links
  ------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ------------------------------------------------
     8. Intersection Observer – Animate on scroll
  ------------------------------------------------ */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation targets
  document.querySelectorAll(
    '.pkg-card, .hosp-card, .why-card, .testi-card, .accomm-card, .journey-step'
  ).forEach((el, index) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    observer.observe(el);
  });

  // CSS class to trigger animation
  const style = document.createElement('style');
  style.textContent = `
    .animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);


  /* ------------------------------------------------
     9. WhatsApp Float – hide on form section
  ------------------------------------------------ */
  const waFloat = document.getElementById('whatsapp-float');
  const contactSection = document.getElementById('contact');

  if (waFloat && contactSection) {
    const waObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          waFloat.style.opacity = '0';
          waFloat.style.pointerEvents = 'none';
        } else {
          waFloat.style.opacity = '1';
          waFloat.style.pointerEvents = 'auto';
        }
      });
    }, { threshold: 0.3 });

    waObserver.observe(contactSection);
  }


  /* ------------------------------------------------
     10. Sticky Bottom Bar – hide when footer visible
  ------------------------------------------------ */
  const stickyBar   = document.getElementById('sticky-bottom');
  const siteFooter  = document.querySelector('.site-footer');

  if (stickyBar && siteFooter) {
    const sbbObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyBar.style.transform = 'translateY(100%)';
        } else {
          stickyBar.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sbbObserver.observe(siteFooter);

    // Initial state
    stickyBar.style.transition = 'transform 0.3s ease';
  }


  /* ------------------------------------------------
     11. Active Nav Highlight on Scroll
  ------------------------------------------------ */
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.main-nav a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  // Style for active nav
  const navStyle = document.createElement('style');
  navStyle.textContent = `.main-nav a.active-nav { color: var(--primary); background: var(--primary-light); }`;
  document.head.appendChild(navStyle);


  /* ------------------------------------------------
     12. Price Counter Animation (hero stats)
  ------------------------------------------------ */
  function animateCounter(el, target, suffix) {
    let start = 0;
    const step = target / 60;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(el => {
          const text = el.textContent;
          if (text.includes('50,000')) animateCounter(el, 50000, '+');
          if (text.includes('200'))    animateCounter(el, 200, '+');
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});

/* ============================================================
   HEALIN INDIA – script.js
   Interactive behaviours: nav, filters, tabs, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------
     0. Hero Background Image Slider (4s Carousel)
  ------------------------------------------------ */
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4000);
  }

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


  /* ------------------------------------------------
     13. AI Helper Agent Interactivity
  ------------------------------------------------ */
  const aiToggle    = document.getElementById('ai-agent-toggle');
  const aiWindow    = document.getElementById('ai-chat-window');
  const aiClose     = document.getElementById('ai-close-btn');
  const aiForm      = document.getElementById('ai-chat-form');
  const aiInput     = document.getElementById('ai-chat-input');
  const aiMessages  = document.getElementById('ai-chat-messages');

  if (aiToggle && aiWindow && aiClose && aiForm) {
    aiToggle.addEventListener('click', () => {
      aiWindow.classList.toggle('active');
      if (aiWindow.classList.contains('active')) {
        aiInput.focus();
      }
    });

    aiClose.addEventListener('click', () => {
      aiWindow.classList.remove('active');
    });

    // Quick prompt buttons
    document.querySelectorAll('.qp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const queryKey = btn.dataset.query;
        let queryText = btn.textContent;
        handleAiQuery(queryKey, queryText);
      });
    });

    aiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = aiInput.value.trim();
      if (!text) return;
      aiInput.value = '';
      handleUserTextQuery(text);
    });
  }

  function appendAiMessage(sender, textHTML) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;
    msgDiv.innerHTML = textHTML;
    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function handleAiQuery(key, userText) {
    appendAiMessage('user', userText);

    let reply = '';
    if (key === 'packages') {
      reply = `💰 <strong>Popular Treatment Packages:</strong><br/>
      • <strong>Cardiac Bypass (CABG):</strong> From $5,500 (Save 94%)<br/>
      • <strong>Robotic Knee Replacement:</strong> From $4,500 (Save 90%)<br/>
      • <strong>IVF with ICSI:</strong> From $3,500 (Save 77%)<br/>
      • <strong>Liver Transplant:</strong> From $50,000 (Save 90%)<br/>
      • <strong>Proton Beam Therapy:</strong> From $15,000<br/>
      <a href="#packages" onclick="document.getElementById('ai-chat-window').classList.remove('active')">👉 Click here to view all 8 Packages</a>`;
    } else if (key === 'hospitals') {
      reply = `🏥 <strong>Top Centers of Excellence:</strong><br/>
      • <strong>Medanta Gurugram:</strong> Cardiac &amp; 1,500+ Liver Transplants<br/>
      • <strong>Fortis Escorts Delhi:</strong> Cardiac pioneer<br/>
      • <strong>Asian Heart Mumbai:</strong> 99%+ Bypass success rate<br/>
      • <strong>Tata Memorial Mumbai:</strong> Asia's largest Cancer Center<br/>
      • <strong>Apollo Proton Chennai:</strong> 1st Proton Therapy center in South Asia<br/>
      <a href="#hospitals" onclick="document.getElementById('ai-chat-window').classList.remove('active')">👉 View all 10 Accredited Hospitals</a>`;
    } else if (key === 'visa') {
      reply = `🛂 <strong>Medical Visa &amp; e-FRRO Extension:</strong><br/>
      India offers 1-year e-Medical Visas (e-MV) for 160+ countries.<br/>
      If you need an extension in India, apply 15–30 days prior on the official e-FRRO portal.<br/>
      <a href="https://indianfrro.gov.in" target="_blank" style="font-weight:bold;color:#0a6ebd">👉 Extend Visa on official e-FRRO portal</a>`;
    } else if (key === 'ayush') {
      reply = `🌿 <strong>AYUSH &amp; Alternative Healing:</strong><br/>
      • Ayurveda &amp; Panchakarma<br/>
      • Sowa-Rigpa (Tibetan Medicine)<br/>
      • Marma Therapy &amp; Siddha<br/>
      • World-Class Resorts: Somatheeram, Kalari Kovilakom, Six Senses Vana, SwaSwara, Ashiyana Goa (with nearby patient hostels).<br/>
      <a href="#ayush" onclick="document.getElementById('ai-chat-window').classList.remove('active')">👉 Explore AYUSH Centers</a>`;
    } else if (key === 'solitude') {
      reply = `🏔️ <strong>Solitude &amp; Recuperation Retreats:</strong><br/>
      • Tirthan Valley (Himachal) – Forest Bathing<br/>
      • Munsyari (Uttarakhand, 7,200 ft) – Mountain Peace<br/>
      • Galgibaga Beach (Goa 4.7★) – Turtle Nesting Silence<br/>
      • Thottada Beach (Kerala 4.6★) – Backwaters<br/>
      <a href="#solitude" onclick="document.getElementById('ai-chat-window').classList.remove('active')">👉 View Quiet Retreats</a>`;
    }

    setTimeout(() => appendAiMessage('bot', reply), 400);
  }

  function handleUserTextQuery(query) {
    appendAiMessage('user', query);
    const q = query.toLowerCase();

    let reply = `I'd be happy to help you with that! 😊<br/>`;

    if (q.includes('visa') || q.includes('extend') || q.includes('frro')) {
      reply += `For <strong>Medical Visa extensions</strong>, apply 15–30 days before expiration at <a href="https://indianfrro.gov.in" target="_blank">indianfrro.gov.in</a>.<br/>We also issue free hospital invitation letters!`;
    } else if (q.includes('cost') || q.includes('price') || q.includes('bypass') || q.includes('knee') || q.includes('ivf') || q.includes('transplant')) {
      reply += `Treatments in India save 65%–95% vs US/UK costs.<br/>• CABG Bypass: $5,500<br/>• Knee Replacement: $4,500<br/>• IVF: $3,500<br/>• Liver Transplant: $50,000.<br/><a href="#packages">Check full pricing grid →</a>`;
    } else if (q.includes('hospital') || q.includes('doctor') || q.includes('medanta') || q.includes('apollo') || q.includes('tata')) {
      reply += `India has 1.3M+ qualified doctors and top JCI/NABH hospitals like Medanta, Fortis, Tata Memorial, Apollo, and Max.<br/><a href="#hospitals">Explore Directory →</a>`;
    } else if (q.includes('ayurveda') || q.includes('ayush') || q.includes('panchakarma') || q.includes('hostel')) {
      reply += `Explore Panchakarma, Marma therapy, and top resorts (Somatheeram, Kalari Kovilakom, SwaSwara) with nearby patient hostels.<br/><a href="#ayush">View AYUSH Section →</a>`;
    } else if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('number')) {
      reply += `📞 24/7 International Helpline &amp; WhatsApp: <strong>+91 99356 05883</strong>.<br/><a href="https://wa.me/919935605883" target="_blank">Chat directly on WhatsApp →</a>`;
    } else {
      reply += `You can get a free estimate and treatment plan by filling our contact form or chatting directly with our team on WhatsApp.<br/>📞 Helpline: <strong>+91 99356 05883</strong><br/><a href="#contact">Fill Free Enquiry Form →</a>`;
    }

    setTimeout(() => appendAiMessage('bot', reply), 400);
  }

});


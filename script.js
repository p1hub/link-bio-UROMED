/* ============================================
   UROMED – Netflix-Style Link Bio
   Interactivity & Enhancements
   ============================================ */

(function () {
  'use strict';

  // ── Header scroll effect ──────────────────────────────────────
  const header = document.querySelector('.header');

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Ripple effect on card click ───────────────────────────────
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('pointerdown', function (e) {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.classList.add('ripple');
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ── Avatar fallback ───────────────────────────────────────────
  const avatarImg = document.querySelector('.hero__avatar img');
  const avatarWrapper = document.querySelector('.hero__avatar');

  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarWrapper.classList.add('avatar--fallback');
    });
  }

  // ── Intersection Observer for card reveal ─────────────────────
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.row, .card').forEach((el) => {
      observer.observe(el);
    });
  }

  // ── WhatsApp link builder (optional) ─────────────────────────
  // Uncomment and fill in the number to enable dynamic WhatsApp link
  // const whatsappLink = document.querySelector('a[href^="https://wa.me"]');
  // if (whatsappLink) {
  //   const phone = '5511999999999'; // Replace with actual number
  //   const message = encodeURIComponent('Olá! Vim pelo Instagram e gostaria de mais informações.');
  //   whatsappLink.href = `https://wa.me/${phone}?text=${message}`;
  // }

})();

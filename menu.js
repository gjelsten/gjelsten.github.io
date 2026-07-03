// Modern Navigation Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const pageNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-menu a[href$=".html"]');
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  function isStillsPage() {
    const path = window.location.pathname;
    return path.includes('stills');
  }

  function setPageNavActive() {
    const onStills = isStillsPage();

    pageNavLinks.forEach(function(link) {
      const href = link.getAttribute('href') || '';
      const isPhotographer = href.includes('stills');
      link.classList.toggle('active', onStills ? isPhotographer : !isPhotographer);
    });

    mobileNavLinks.forEach(function(link) {
      const href = link.getAttribute('href') || '';
      const isPhotographer = href.includes('stills');
      link.classList.toggle('active', onStills ? isPhotographer : !isPhotographer);
    });
  }

  function toggleMobileMenu() {
    if (navToggle && mobileMenu) {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  document.addEventListener('click', function(event) {
    if (navToggle && mobileMenu &&
        !navToggle.contains(event.target) &&
        !mobileMenu.contains(event.target)) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navToggle && mobileMenu && mobileMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navToggle && mobileMenu) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  setPageNavActive();
});

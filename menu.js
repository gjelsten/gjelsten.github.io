// Modern Navigation Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
  
  // Function to toggle mobile menu
  function toggleMobileMenu() {
    if (navToggle && mobileMenu) {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
  
  // Mobile menu toggle (main hamburger)
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navToggle && mobileMenu && 
        !navToggle.contains(event.target) && 
        !mobileMenu.contains(event.target)) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close mobile menu with escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navToggle && mobileMenu && mobileMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navToggle && mobileMenu) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Smooth scrolling for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id], div[id]');
  
  function highlightActiveLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Throttled scroll event for performance
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        highlightActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', updateOnScroll);
  
  // Initialize active link on page load
  highlightActiveLink();
});

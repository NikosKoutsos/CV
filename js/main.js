// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  
  // Check if user has previously selected dark mode
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
  }
  
  // Theme switch event listener
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-active');
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      nav.classList.remove('active');
      document.body.classList.remove('mobile-menu-active');
    }
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.classList.remove('mobile-menu-active');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for animations
  const animateElements = () => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Unobserve after animation has been triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--item-index', index);
      observer.observe(item);
    });
    
    // Observe education items
    document.querySelectorAll('.education-item').forEach((item, index) => {
      item.style.setProperty('--item-index', index);
      observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.setProperty('--item-index', index);
      observer.observe(card);
    });
    
    // Animate skill bars when they come into view
    document.querySelectorAll('.skill-level').forEach(level => {
      const width = level.style.width;
      level.style.width = '0';
      level.style.setProperty('--width', width);
      observer.observe(level);
    });
  };
  
  // Call animation setup
  animateElements();
});
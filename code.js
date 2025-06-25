document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-level');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      if (isElementInViewport(bar)) {
        bar.style.width = level + '%';
      }
    });
  }
  
  // Animate stats counters
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(number => {
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // Animation duration in ms
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        number.textContent = Math.floor(current);
      }, 16);
    });
  }
  
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Run animations when elements come into view
  function handleScroll() {
    animateSkillBars();
    
    document.querySelectorAll('.stat-item').forEach(item => {
      if (isElementInViewport(item)) {
        animateStats();
        window.removeEventListener('scroll', handleScroll);
      }
    });
  }
  
  // Initial check on page load
  handleScroll();
  
  // Check on scroll
  window.addEventListener('scroll', handleScroll);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
  
  // Project card hover effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
     card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  });
});
});

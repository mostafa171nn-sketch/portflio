// Fixed Background - Only in Hero Section (No Parallax)
let scrollY = 0;

function updateParallax() {
  scrollY = window.scrollY;
  const heroSection = document.querySelector('.hero');
  const backgroundImage = document.querySelector('.hero .background-image');
  const overlay = document.querySelector('.hero .overlay');
  
  if (backgroundImage && heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    // Show background only when in Hero section
    if (scrollY < heroHeight) {
      // Background stays fixed - no parallax
      backgroundImage.style.transform = 'translateY(0px)';
      backgroundImage.style.opacity = '0.5';
      if (overlay) overlay.style.opacity = '1';
    } else {
      // Hide background when scrolled past Hero
      backgroundImage.style.opacity = '0';
      if (overlay) overlay.style.opacity = '0';
    }
  }
}

window.addEventListener('scroll', updateParallax);
// Initialize on load
updateParallax();

// Navigation Scroll Effect
const navigation = document.getElementById('navigation');

function handleNavigationScroll() {
  if (window.scrollY > 50) {
    navigation.classList.add('scrolled');
  } else {
    navigation.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavigationScroll);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you can add your form submission logic
    // For now, just show an alert
    alert('شكراً لتواصلك ' + name + '! سأرد عليك قريباً.');
    
    // Reset form
    contactForm.reset();
  });
}

// Scroll Animation for Elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-mode', currentTheme === 'light');
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', function() {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  const newTheme = isLightMode ? 'light' : 'dark';
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const dropdownMenu = document.getElementById('dropdownMenu');

hamburger.addEventListener('click', function() {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking on a link
dropdownMenu.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    dropdownMenu.style.display = 'none';
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!navigation.contains(e.target)) {
    dropdownMenu.style.display = 'none';
  }
});


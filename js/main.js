// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavMenu = document.querySelector('.mobile-nav-menu');
const header = document.querySelector('.header');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Mobile navigation toggle
mobileNavToggle.addEventListener('click', () => {
  mobileNavMenu.classList.toggle('active');
  const isOpen = mobileNavMenu.classList.contains('active');
  mobileNavToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNavMenu.classList.remove('active');
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.padding = '10px 0';
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '15px 0';
    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-menu a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (currentPage.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if ((currentPage === '/' || currentPage.includes('index.html')) && (linkPath === '/' || linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature-card, .project-card, .service-card, .process-step, .gallery-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .project-card, .service-card, .process-step, .gallery-item');
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Trigger once on load
  animateOnScroll();
  
  // Trigger on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Form validation for the contact form (if present on the page)
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      removeError(nameInput);
    }
    
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      removeError(emailInput);
    }
    
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required');
      isValid = false;
    } else {
      removeError(subjectInput);
    }
    
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      removeError(messageInput);
    }
    
    if (isValid) {
      // In a real application, you would send the form data to the server here
      // For this demo, we'll just show a success message
      contactForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>Message Sent!</h3>
          <p>Thank you for contacting us. We'll get back to you soon.</p>
        </div>
      `;
    }
  });
}

// Helper functions for form validation
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(errorElement);
  }
  
  input.classList.add('error');
}

function removeError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    formGroup.removeChild(errorElement);
  }
  
  input.classList.remove('error');
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
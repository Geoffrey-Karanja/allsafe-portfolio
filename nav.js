// Create a new file: nav.js
document.addEventListener('DOMContentLoaded', () => {
  // Load navbar into each page
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      initNavbar();
    })
    .catch(err => console.error('Error loading navbar:', err));
  
  function initNavbar() {
    // Mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('active')) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  }
});
// WhiteFiber About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initDropdowns();
    initMobileMenu();
    initScrollEffects();
    initButtonAnimations();
});

// Dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Handle hover for desktop
        dropdown.addEventListener('mouseenter', () => {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        });
        
        // Handle click for mobile/touch devices
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                    if (otherMenu) {
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                        otherMenu.style.transform = 'translateY(-10px)';
                    }
                }
            });
            
            // Toggle current dropdown
            const isOpen = menu.style.opacity === '1';
            if (isOpen) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            } else {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }
            });
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    let isOpen = false;
    
    mobileToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        // Toggle menu visibility
        if (isOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'white';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = 'var(--shadow-hover)';
            navMenu.style.borderRadius = '0 0 0.5rem 0.5rem';
            navMenu.style.gap = '1rem';
            navMenu.style.zIndex = '100';
        } else {
            navMenu.style.display = 'none';
        }
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (isOpen) {
                if (index === 0) {
                    span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    span.style.opacity = '0';
                } else if (index === 2) {
                    span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && isOpen) {
            isOpen = false;
            navMenu.style.display = 'none';
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isOpen) {
            isOpen = false;
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.backgroundColor = '';
            navMenu.style.flexDirection = '';
            navMenu.style.padding = '';
            navMenu.style.boxShadow = '';
            navMenu.style.borderRadius = '';
            navMenu.style.gap = '';
            navMenu.style.zIndex = '';
            
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.value-card, .team-member, .tech-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Button animations and interactions
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling (if forms are added later)
function handleFormSubmission(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#10B981';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
                this.reset();
            }, 3000);
        }, 1000);
    });
}

// Initialize forms if they exist
document.querySelectorAll('form').forEach(handleFormSubmission);

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You could send error reports to your analytics service here
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
});

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation for dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for modal/dropdown
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        }
    });
}

// Initialize accessibility features
initAccessibility();
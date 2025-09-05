
// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const desktopMenu = document.querySelector('.desktop-menu');

if (mobileMenuBtn && desktopMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    desktopMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('open'); // optional animation ke liye
  });
}
// popup
  document.querySelectorAll(".read-more").forEach(btn => {
      btn.addEventListener("click", () => {
        let modalId = btn.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "block";
      });
    });
    document.querySelectorAll(".close").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        closeBtn.closest(".modal").style.display = "none";
      });
    });
    window.addEventListener("click", (e) => {
      if(e.target.classList.contains("modal")){
        e.target.style.display = "none";
      }
    });
// popup

// Navigation dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown menus
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        let timeout;
        
        item.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';      s
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'h';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const desktopMenu = document.querySelector('.desktop-menu');
    
    if (mobileMenuBtn && desktopMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle mobile menu (you can enhance this based on your needs)
            console.log('Mobile menu clicked');
        });
    }

    // Smooth scroll for anchor links
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

    // Add scroll effect to navigation
    let lastScrollY = window.scrollY;
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navigation.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navigation.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add intersection observer for animations
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

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .cloud-feature, .solution-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.banner-btn, .contact-btn, .primary-btn, .outline-btn, .cta-btn, .feature-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add your button click logic here
            console.log('Button clicked:', button.textContent);
            
            // Example: You can add analytics tracking, form submissions, etc.
            // For now, we'll just prevent default for demo purposes
            if (!button.getAttribute('href')) {
                e.preventDefault();
            }
        });
    });

    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });


});

// Main JavaScript for Boikanyo Domestic Solution Website

class WebsiteApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPageTransitions();
        this.setupScrollAnimations();
        this.setupMobileMenu();
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                this.navigateToPage(targetPage);
                
                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    // Page Transition
    navigateToPage(pageId) {
        const pages = document.querySelectorAll('.page');
        const targetPage = document.getElementById(pageId);
        
        if (!targetPage) return;
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        setTimeout(() => {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Trigger animations for new page
            this.triggerPageAnimations(targetPage);
        }, 300);
    }

    // Trigger animations for page elements
    triggerPageAnimations(page) {
        const animatedElements = page.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
        
        animatedElements.forEach((element, index) => {
            // Reset animation
            element.style.animation = 'none';
            
            // Trigger reflow
            void element.offsetWidth;
            
            // Reapply animation with delay
            const animationClass = Array.from(element.classList).find(cls => 
                cls.includes('fade-in') || cls.includes('slide-in')
            );
            
            if (animationClass) {
                const delay = element.classList.contains('delay-1') ? 200 :
                            element.classList.contains('delay-2') ? 400 :
                            element.classList.contains('delay-3') ? 600 : 0;
                
                setTimeout(() => {
                    element.style.animation = '';
                }, delay);
            }
        });
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= 
                (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('animated');
        };
        
        const hideScrollElement = (element) => {
            element.classList.remove('animated');
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.2)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };
        
        // Initial check
        handleScrollAnimation();
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScrollAnimation();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Setup Page Transitions
    setupPageTransitions() {
        // Initial page animations
        setTimeout(() => {
            this.triggerPageAnimations(document.getElementById('home'));
        }, 500);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteApp();
});

// Add some utility functions
window.utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format phone number
    formatPhoneNumber: (phone) => {
        return phone.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
    }
};
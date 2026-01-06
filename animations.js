// Additional Animation Functionality
class AnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverAnimations();
        this.setupFloatingElements();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add delay based on data attribute
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with scroll-animate class
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    setupHoverAnimations() {
        // Add hover effects to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.cta-button, .submit-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter
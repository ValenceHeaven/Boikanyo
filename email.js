// EmailJS Integration for Contact Form
class EmailService {
    constructor() {
        this.serviceID = 'service_ahcvug8';
        this.templateID = 'template_b0hf0mo';
        this.publicKey = 'l8vT2XMDW1ivbvhGd';
        this.init();
    }

    init() {
        // Initialize EmailJS
        emailjs.init(this.publicKey);
        this.setupContactForm();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        const submitButton = contactForm?.querySelector('.submit-button');
        const formMessage = document.getElementById('form-message');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm, submitButton, formMessage);
            });
        }
    }

    async handleFormSubmit(form, submitButton, messageElement) {
        // Show loading state
        this.setButtonLoading(submitButton, true);

        try {
            // Get form data
            const formData = new FormData(form);
            const templateParams = {
                from_name: formData.get('full_name'),
                from_email: formData.get('email'),
                phone_number: formData.get('phone'),
                message: formData.get('message'),
                to_email: 'annahmakhubela6@gmail.com'
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                this.serviceID,
                this.templateID,
                templateParams
            );

            // Show success message
            this.showFormMessage(messageElement, 'Your message has been sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
            console.log('Email sent successfully:', response);

        } catch (error) {
            // Show error message
            this.showFormMessage(messageElement, 'Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            console.error('Email sending failed:', error);
        } finally {
            // Hide loading state
            this.setButtonLoading(submitButton, false);
        }
    }

    setButtonLoading(button, isLoading) {
        if (!button) return;

        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showFormMessage(messageElement, message, type) {
        if (!messageElement) return;

        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize Email Service when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmailService();
});
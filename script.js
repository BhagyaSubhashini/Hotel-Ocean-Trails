document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    const navLinks = document.getElementById('navLinks');
    window.showMenu = () => {
        navLinks.style.right = '0';
    };
    window.hideMenu = () => {
        navLinks.style.right = '-200px';
    };

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Package Booking Modal
    const bookingModal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('modalPackageDetails');
    const closeBookingModal = document.querySelector('#bookingModal .close');
    
    if (bookingModal && modalContent && closeBookingModal) {
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', () => {
                const packageName = button.getAttribute('data-package');
                const packageDetails = button.parentElement.querySelector('p').innerHTML;
                modalContent.innerHTML = `<strong>${packageName} Package</strong><br>${packageDetails}`;
                bookingModal.style.display = 'block';
            });
        });

        closeBookingModal.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    }

    // Image Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox && lightboxImg && lightboxTitle && closeLightbox) {
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxTitle.textContent = img.getAttribute('data-title');
                lightbox.style.display = 'flex';
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const formSubmissionModal = document.getElementById('formSubmissionModal');
    const formSubmissionMessage = document.getElementById('formSubmissionMessage');
    const closeFormModal = formSubmissionModal ? formSubmissionModal.querySelector('.close') : null;

    if (contactForm && formMessage && formSubmissionModal && formSubmissionMessage && closeFormModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const message = {
                name: formData.get('name'),
                email: formData.get('email'),
                city: formData.get('city'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            // Store in localStorage
            let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(message);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            // Show inline message
            formMessage.textContent = `Thank you, ${message.name}! Your message has been received.`;
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 3000);
            // Show confirmation modal
            formSubmissionMessage.textContent = `Thank you, ${message.name}! Your message has been received.`;
            formSubmissionModal.style.display = 'block';
            contactForm.reset();
        });

        closeFormModal.addEventListener('click', () => {
            formSubmissionModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === formSubmissionModal) {
                formSubmissionModal.style.display = 'none';
            }
        });
    }
});
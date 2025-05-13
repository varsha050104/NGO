// Navigation menu toggle for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Navigation
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
};

// Simple testimonial slider
const testimonialSlider = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');

    if (testimonials.length > 0) {
        let currentSlide = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Function to show a specific slide
        const showSlide = (n) => {
            testimonials[currentSlide].style.display = 'none';
            currentSlide = (n + testimonials.length) % testimonials.length;
            testimonials[currentSlide].style.display = 'block';
        };

        // Event listeners for next and previous buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }
    }
};

// Add animation to elements when they come into view
const scrollAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections, steps, stats, and cards
    document.querySelectorAll('section, .step, .stat, .request-card').forEach(element => {
        observer.observe(element);
    });
};

// Form validation for the login and registration pages
const formValidation = () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Here you would typically send the data to your backend
            // For now, let's simulate a successful login
            showAlert('Login successful! Redirecting...', 'success');

            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.querySelector('input[name="role"]:checked')?.value;

            if (!name || !email || !password || !confirmPassword || !role) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }

            // Here you would typically send the data to your backend
            // For now, let's simulate a successful registration
            showAlert('Registration successful! Redirecting to login...', 'success');

            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
};

// Utility function to show alerts
const showAlert = (message, type) => {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alert.remove();

        // Remove container if empty
        if (alertContainer.children.length === 0) {
            alertContainer.remove();
        }
    }, 3000);
};

// Create alert container if it doesn't exist
const createAlertContainer = () => {
    const container = document.createElement('div');
    container.className = 'alert-container';
    document.body.appendChild(container);
    return container;
};

// Get URL parameters (for the registration page to pre-select role)
const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');

    if (role && (role === 'donor' || role === 'seeker')) {
        const roleRadio = document.querySelector(`input[name="role"][value="${role}"]`);
        if (roleRadio) {
            roleRadio.checked = true;
        }
    }
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    testimonialSlider();
    scrollAnimation();
    formValidation();
    getUrlParams();
});
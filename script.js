// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const pricingToggle = document.getElementById('pricing-toggle');
const contactForm = document.getElementById('contact-form');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('login-password');
const loginOptions = document.getElementById('login-options');
const emailLoginForm = document.getElementById('email-login-form');
const googleLoginOption = document.getElementById('google-login-option');
const emailLoginOption = document.getElementById('email-login-option');
const backToOptions = document.getElementById('back-to-options');
const particleToggle = document.getElementById('particle-toggle');
const particleCanvas = document.getElementById('particle-bg');
const marqueeTrack = document.getElementById('marquee-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Sticky Navigation
function handleScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Pricing toggle functionality
function initPricingToggle() {
    const amountElements = document.querySelectorAll('.amount');
    const periodElements = document.querySelectorAll('.period');
    
    pricingToggle.addEventListener('change', () => {
        const isYearly = pricingToggle.checked;
        
        amountElements.forEach(element => {
            const monthlyPrice = element.getAttribute('data-monthly');
            const yearlyPrice = element.getAttribute('data-yearly');
            
            if (isYearly) {
                element.textContent = yearlyPrice;
                element.parentElement.querySelector('.period').textContent = '/month';
            } else {
                element.textContent = monthlyPrice;
                element.parentElement.querySelector('.period').textContent = '/month';
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    if (!contactForm) return;
    
    // Add floating label effect
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add typing animation
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.style.animation = 'none';
                input.offsetHeight; // Trigger reflow
                input.style.animation = 'typingEffect 0.3s ease';
            }
        });
    });
    
    // Add form submission animation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Add submission animation
        const submitBtn = contactForm.querySelector('.btn-primary');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with delay
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
            
            // Add success animation
            submitBtn.style.animation = 'successPulse 0.6s ease';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 600);
        }, 1500);
    });
}

// Login Modal functionality
function initLoginModal() {
    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        showLoginOptions(); // Reset to options view
    });
    
    // Close modal
    closeLogin.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking backdrop
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });
    
    // Google login option
    googleLoginOption.addEventListener('click', () => {
        showNotification('Redirecting to Google login...', 'info');
        // Simulate Google OAuth redirect
        setTimeout(() => {
            showNotification('Google login successful!', 'success');
            closeLoginModal();
        }, 2000);
    });
    
    // Email login option
    emailLoginOption.addEventListener('click', () => {
        showEmailLoginForm();
    });
    
    // Back to options
    backToOptions.addEventListener('click', () => {
        showLoginOptions();
    });
    
    // Password toggle
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = passwordToggle.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Simple validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate login
        showNotification('Login successful! Welcome back.', 'success');
        closeLoginModal();
        loginForm.reset();
        showLoginOptions(); // Reset to options view
    });
}

function showLoginOptions() {
    loginOptions.style.display = 'flex';
    emailLoginForm.style.display = 'none';
}

function showEmailLoginForm() {
    loginOptions.style.display = 'none';
    emailLoginForm.style.display = 'block';
}

function closeLoginModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    showLoginOptions(); // Reset to options view
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .team-member, .value-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .testimonial-card,
        .pricing-card,
        .team-member,
        .value-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in,
        .testimonial-card.animate-in,
        .pricing-card.animate-in,
        .team-member.animate-in,
        .value-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        .testimonial-card:nth-child(4) { transition-delay: 0.4s; }
        .testimonial-card:nth-child(5) { transition-delay: 0.5s; }
        .testimonial-card:nth-child(6) { transition-delay: 0.6s; }
        
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Add animation styles
    addAnimationStyles();
    
    // Initialize all functionality
    initSmoothScrolling();
    initPricingToggle();
    initContactForm();
    initLoginModal();
    initParticleSystem();
    initTestimonialsMarquee();
    initTeamHoverEffects();
    initAnimations();
    initParallax();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Initialize scroll position for active nav link
    handleScroll();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Team member hover effects with dynamic shapes
function initTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const img = member.querySelector('img');
        
        member.addEventListener('mouseenter', (e) => {
            createDynamicShapes(member, e);
        });
        
        member.addEventListener('mousemove', (e) => {
            updateShapePositions(member, e);
        });
        
        member.addEventListener('mouseleave', () => {
            removeDynamicShapes(member);
        });
    });
}

function createDynamicShapes(member, event) {
    // Remove existing shapes
    removeDynamicShapes(member);
    
    // Create multiple random shapes
    const shapes = ['circle', 'triangle', 'square', 'star', 'hexagon'];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
    
    for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 60 + 20;
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        
        shape.className = 'dynamic-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${randomSize}px;
            height: ${randomSize}px;
            background: ${randomColor};
            border-radius: ${randomShape === 'circle' ? '50%' : randomShape === 'triangle' ? '0' : '10px'};
            left: ${event.clientX + randomX}px;
            top: ${event.clientY + randomY}px;
            opacity: 0.7;
            pointer-events: none;
            z-index: 1000;
            transition: all 0.3s ease;
            animation: floatShape 3s ease-in-out infinite;
        `;
        
        if (randomShape === 'triangle') {
            shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (randomShape === 'star') {
            shape.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        } else if (randomShape === 'hexagon') {
            shape.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        }
        
        member.appendChild(shape);
    }
}

function updateShapePositions(member, event) {
    const shapes = member.querySelectorAll('.dynamic-shape');
    shapes.forEach((shape, index) => {
        const offsetX = (index - 1) * 40;
        const offsetY = (index - 1) * 30;
        
        shape.style.left = `${event.clientX + offsetX}px`;
        shape.style.top = `${event.clientY + offsetY}px`;
    });
}

function removeDynamicShapes(member) {
    const shapes = member.querySelectorAll('.dynamic-shape');
    shapes.forEach(shape => {
        shape.style.opacity = '0';
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        }, 300);
    });
}

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseVelocity = { x: 0, y: 0 };
        
        this.colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
            '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
            '#ff6348', '#2ed573', '#1e90ff', '#ff4757', '#3742fa'
        ];
        
        this.resizeCanvas();
        this.bindEvents();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.mouseVelocity.x = this.mouseX - this.lastMouseX;
            this.mouseVelocity.y = this.mouseY - this.lastMouseY;
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            
            if (this.isActive) {
                this.createParticles();
            }
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            
            if (this.isActive) {
                this.createParticles();
            }
        });
    }
    
    createParticles() {
        const speed = Math.sqrt(this.mouseVelocity.x ** 2 + this.mouseVelocity.y ** 2);
        const particleCount = Math.min(Math.floor(speed / 2), 8);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: this.mouseX + (Math.random() - 0.5) * 20,
                y: this.mouseY + (Math.random() - 0.5) * 20,
                vx: this.mouseVelocity.x * 0.1 + (Math.random() - 0.5) * 2,
                vy: this.mouseVelocity.y * 0.1 + (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                life: 1,
                decay: Math.random() * 0.02 + 0.01
            };
            
            this.particles.push(particle);
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add some gravity and air resistance
            particle.vy += 0.05;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Update life
            particle.life -= particle.decay;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set blend mode for glow effect
        this.ctx.globalCompositeOperation = 'screen';
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * particle.life;
            
            // Create gradient for glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        // Reset blend mode
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    animate() {
        if (this.isActive) {
            this.updateParticles();
            this.drawParticles();
        }
        requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isActive = true;
        this.animate();
    }
    
    stop() {
        this.isActive = false;
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize particle system
let particleSystem;

function initParticleSystem() {
    particleSystem = new ParticleSystem(particleCanvas);
    
    // Toggle particle effect
    particleToggle.addEventListener('click', () => {
        if (particleSystem.isActive) {
            particleSystem.stop();
            particleToggle.classList.remove('active');
            showNotification('Particle effect disabled', 'info');
        } else {
            particleSystem.start();
            particleToggle.classList.add('active');
            showNotification('Particle effect enabled', 'success');
        }
    });
    
    // Start with particles enabled by default
    particleSystem.start();
    particleToggle.classList.add('active');
}

// Testimonials Marquee functionality
function initTestimonialsMarquee() {
    let currentPosition = 0;
    const cardWidth = 350 + 32; // card width + gap
    const totalCards = 6;
    const maxPosition = -(totalCards - 3) * cardWidth; // Show 3 cards at a time
    
    function updateNavigation() {
        prevBtn.disabled = currentPosition >= 0;
        nextBtn.disabled = currentPosition <= maxPosition;
    }
    
    function slideTo(position) {
        currentPosition = Math.max(maxPosition, Math.min(0, position));
        marqueeTrack.style.transform = `translateX(${currentPosition}px)`;
        updateNavigation();
    }
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        slideTo(currentPosition + cardWidth);
    });
    
    nextBtn.addEventListener('click', () => {
        slideTo(currentPosition - cardWidth);
    });
    
    // Touch/swipe functionality
    let isDragging = false;
    let startX = 0;
    let startPosition = 0;
    
    marqueeTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startPosition = currentPosition;
        marqueeTrack.style.cursor = 'grabbing';
        marqueeTrack.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const newPosition = startPosition + deltaX;
        marqueeTrack.style.transform = `translateX(${newPosition}px)`;
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        marqueeTrack.style.cursor = 'grab';
        marqueeTrack.style.transition = 'transform 0.5s ease';
        
        const deltaX = event.clientX - startX;
        if (Math.abs(deltaX) > 50) {
            // Snap to next/previous card
            if (deltaX > 0) {
                slideTo(currentPosition + cardWidth);
            } else {
                slideTo(currentPosition - cardWidth);
            }
        } else {
            // Snap back to current position
            slideTo(currentPosition);
        }
    });
    
    // Touch events for mobile
    marqueeTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startPosition = currentPosition;
        marqueeTrack.style.transition = 'none';
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const deltaX = e.touches[0].clientX - startX;
        const newPosition = startPosition + deltaX;
        marqueeTrack.style.transform = `translateX(${newPosition}px)`;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        marqueeTrack.style.transition = 'transform 0.5s ease';
        
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                slideTo(currentPosition + cardWidth);
            } else {
                slideTo(currentPosition - cardWidth);
            }
        } else {
            slideTo(currentPosition);
        }
    });
    
    // Auto-play when section is visible
    const testimonialsSection = document.getElementById('testimonials');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start auto-play after a delay
                setTimeout(() => {
                    marqueeTrack.classList.add('auto-play');
                }, 2000);
            } else {
                marqueeTrack.classList.remove('auto-play');
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(testimonialsSection);
    
    // Initialize navigation state
    updateNavigation();
}

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loading.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle); 

// Loader
// Fade out loader
window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loader-wrapper");
      loader.style.opacity = "0";
      document.body.classList.add("loaded");
      setTimeout(() => loader.style.display = "none", 500);
    }, 5000);
  });
  
  // Ripple background effect
  const ripple = document.querySelector('.ripple-background');
  document.addEventListener('mousemove', e => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    ripple.style.setProperty('--x', x);
    ripple.style.setProperty('--y', y);
  });
  
